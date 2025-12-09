import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '../lib/supabase'

// Shared state across components
const user = ref(null)
const credits = ref(0)
const loading = ref(true)
const error = ref(null)

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

        const { data, error: fetchError } = await supabase
            .from('profiles')
            .select('credits')
            .eq('id', user.value.id)
            .single()

        if (fetchError) {
            console.error('Error fetching credits:', fetchError)
            return
        }

        credits.value = parseFloat(data?.credits || 0)
    }

    const subscribeToCredits = () => {
        if (!user.value || profileSubscription) return

        profileSubscription = supabase
            .channel('profile-credits')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'profiles',
                    filter: `id=eq.${user.value.id}`
                },
                (payload) => {
                    credits.value = parseFloat(payload.new.credits || 0)
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
        unsubscribeFromCredits()
    }

    // Purchase credits via Stripe checkout
    const purchaseCredits = async (priceId) => {
        if (!user.value) {
            throw new Error('Must be logged in to purchase credits')
        }

        const { data: { session } } = await supabase.auth.getSession()

        const response = await fetch('https://skwlndaqqkxushqkhlgg.supabase.co/functions/v1/stripe-checkout', {
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
        initAuth,
        fetchCredits,
        signInWithOAuth,
        signInWithEmail,
        signUpWithEmail,
        signInWithMagicLink,
        signOut,
        purchaseCredits
    }
}
