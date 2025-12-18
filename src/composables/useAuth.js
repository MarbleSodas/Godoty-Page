import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '../lib/supabase'

// Local storage keys
const VIRTUAL_KEY_STORAGE_KEY = 'godoty_virtual_key'

// Shared state across components
const user = ref(null)
const credits = ref(0)
const loading = ref(true)
const error = ref(null)
const litellmKey = ref(null)
const litellmKeyLoading = ref(false)

/**
 * Get cached virtual key from local storage
 */
function getCachedVirtualKey() {
    try {
        const cached = localStorage.getItem(VIRTUAL_KEY_STORAGE_KEY)
        if (!cached) return null

        const keyInfo = JSON.parse(cached)

        // Check if key has expired (with 1 hour buffer)
        const expiresAt = new Date(keyInfo.expiresAt)
        const bufferTime = 60 * 60 * 1000 // 1 hour in milliseconds
        if (expiresAt.getTime() - bufferTime < Date.now()) {
            // Key is expired or about to expire
            localStorage.removeItem(VIRTUAL_KEY_STORAGE_KEY)
            return null
        }

        return keyInfo
    } catch {
        localStorage.removeItem(VIRTUAL_KEY_STORAGE_KEY)
        return null
    }
}

/**
 * Cache virtual key to local storage
 */
function cacheVirtualKey(keyInfo) {
    try {
        localStorage.setItem(VIRTUAL_KEY_STORAGE_KEY, JSON.stringify(keyInfo))
    } catch (e) {
        console.error('Failed to cache virtual key:', e)
    }
}

/**
 * Clear cached virtual key
 */
function clearVirtualKey() {
    localStorage.removeItem(VIRTUAL_KEY_STORAGE_KEY)
}

let profileSubscription = null

export function useAuth() {
    const initAuth = async () => {
        loading.value = true

        // Get initial session
        const { data: { session } } = await supabase.auth.getSession()
        user.value = session?.user ?? null

        if (user.value) {
            await fetchCredits()
            subscribeToCredits()
        }

        loading.value = false

        // Listen for auth changes
        supabase.auth.onAuthStateChange(async (event, session) => {
            user.value = session?.user ?? null

            if (session?.user) {
                await fetchCredits()
                subscribeToCredits()
            } else {
                credits.value = 0
                unsubscribeFromCredits()
            }
        })
    }

    const fetchCredits = async () => {
        if (!user.value) return

        // Credits are now fetched from LiteLLM via edge function
        // Try to get from cached virtual key first
        const cached = getCachedVirtualKey()
        if (cached && cached.remainingBudget !== undefined) {
            credits.value = parseFloat(cached.remainingBudget)
            return
        }

        // If no cached key, credits will be updated when generateLitellmKey is called
        // Query secure view (user_credit_balance) - RLS ensures only own data is returned
        const { data, error: fetchError } = await supabase
            .from('user_credit_balance')
            .select('max_budget, spend, remaining_balance')
            .maybeSingle()

        if (fetchError) {
            // Fallback to LiteLLM_UserTable if view doesn't exist yet
            if (fetchError.code === '42P01') { // relation does not exist
                console.warn('user_credit_balance view not found, using LiteLLM_UserTable fallback')
                const { data: fallbackData, error: fallbackError } = await supabase
                    .from('LiteLLM_UserTable')
                    .select('max_budget, spend')
                    .eq('user_id', user.value.id)
                    .maybeSingle()

                if (!fallbackError && fallbackData) {
                    const maxBudget = parseFloat(fallbackData.max_budget || 0)
                    const spend = parseFloat(fallbackData.spend || 0)
                    credits.value = Math.max(0, maxBudget - spend)
                }
                return
            }
            console.error('Error fetching credits:', fetchError)
            return
        }

        if (data) {
            // Use pre-computed remaining_balance from secure view
            credits.value = parseFloat(data.remaining_balance || 0)
        }
    }

    const subscribeToCredits = () => {
        if (!user.value || profileSubscription) return

        // Subscribe to LiteLLM_UserTable changes (RLS restricts to own data)
        // Note: Realtime works on base tables, not views, so we still subscribe to LiteLLM_UserTable
        profileSubscription = supabase
            .channel('user-credits')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'LiteLLM_UserTable',
                    filter: `user_id=eq.${user.value.id}`
                },
                async (payload) => {
                    // Calculate credit_balance from max_budget - spend
                    if (payload.new) {
                        const maxBudget = parseFloat(payload.new.max_budget || 0)
                        const spend = parseFloat(payload.new.spend || 0)
                        credits.value = Math.max(0, maxBudget - spend)
                    }
                    // No fallback needed - realtime always provides payload.new for updates
                }
            )
            .subscribe()
    }

    const unsubscribeFromCredits = () => {
        if (profileSubscription) {
            supabase.removeChannel(profileSubscription)
            profileSubscription = null
        }
    }

    // OAuth sign in
    const signInWithOAuth = async (provider) => {
        error.value = null
        const { error: authError } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })

        if (authError) {
            error.value = authError.message
            throw authError
        }
    }

    // Email/password sign in
    const signInWithEmail = async (email, password) => {
        error.value = null
        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (authError) {
            error.value = authError.message
            throw authError
        }

        return data
    }

    // Email/password sign up
    const signUpWithEmail = async (email, password) => {
        error.value = null
        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        })

        if (authError) {
            error.value = authError.message
            throw authError
        }

        return data
    }

    // Magic link
    const signInWithMagicLink = async (email) => {
        error.value = null
        const { error: authError } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        })

        if (authError) {
            error.value = authError.message
            throw authError
        }
    }

    // Sign out
    const signOut = async () => {
        error.value = null
        const { error: authError } = await supabase.auth.signOut()

        if (authError) {
            error.value = authError.message
            throw authError
        }

        user.value = null
        credits.value = 0
        litellmKey.value = null
        clearVirtualKey()
        unsubscribeFromCredits()
    }

    // Generate or retrieve LiteLLM API key
    // Uses local caching - one key per account
    const generateLitellmKey = async (forceRefresh = false) => {
        if (!user.value) {
            throw new Error('Must be logged in to generate API key')
        }

        // Check local cache first (unless forcing refresh)
        if (!forceRefresh) {
            const cached = getCachedVirtualKey()
            if (cached) {
                litellmKey.value = cached
                if (cached.remainingBudget !== undefined) {
                    credits.value = parseFloat(cached.remainingBudget)
                }
                return cached
            }
        }

        litellmKeyLoading.value = true
        error.value = null

        try {
            const { data: { session } } = await supabase.auth.getSession()

            const response = await fetch('https://kbnaymejrngxhpigwphh.supabase.co/functions/v1/generate-litellm-key', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to generate API key')
            }

            // Cache the key locally
            cacheVirtualKey(result)
            litellmKey.value = result
            
            // Update credits from LiteLLM response
            if (result.remainingBudget !== undefined) {
                credits.value = parseFloat(result.remainingBudget)
            }

            return result
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            litellmKeyLoading.value = false
        }
    }

    // Purchase credits via Stripe checkout
    const purchaseCredits = async (priceId) => {
        if (!user.value) {
            throw new Error('Must be logged in to purchase credits')
        }

        const { data: { session } } = await supabase.auth.getSession()

        const response = await fetch('https://kbnaymejrngxhpigwphh.supabase.co/functions/v1/stripe-checkout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price_id: priceId })
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.error || 'Failed to create checkout session')
        }

        // Redirect to Stripe checkout
        window.location.href = result.url
    }

    return {
        user,
        credits,
        loading,
        error,
        litellmKey,
        litellmKeyLoading,
        initAuth,
        fetchCredits,
        generateLitellmKey,
        signInWithOAuth,
        signInWithEmail,
        signUpWithEmail,
        signInWithMagicLink,
        signOut,
        purchaseCredits
    }
}
