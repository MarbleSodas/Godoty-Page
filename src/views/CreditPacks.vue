<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import logoSvg from '../assets/logo.svg'

const route = useRoute()
const { user, credits, loading, signInWithOAuth, signInWithEmail, signUpWithEmail, signInWithMagicLink, signOut, purchaseCredits } = useAuth()

const purchaseLoading = ref(null)
const showAuthModal = ref(false)
const authMode = ref('login')
const authLoading = ref(false)
const authError = ref(null)
const pendingPurchase = ref(null)

// Form fields
const email = ref('')
const password = ref('')
const termsAccepted = ref(false)

// Credit packages matching Stripe products
const creditPackages = [
    {
        id: 'starter',
        name: 'Starter Pack',
        price: 5,
        credits: 5,
        priceId: 'price_1SeUdXExVVDh2wU3LoTcnc6A',
        features: ['5 Credits', 'Basic Support', 'No Expiry'],
        popular: false
    },
    {
        id: 'pro',
        name: 'Pro Pack',
        price: 10,
        credits: 11,
        priceId: 'price_1SeUduExVVDh2wU3h4yLDftJ',
        features: ['11 Credits', 'Priority Support', 'No Expiry', '10% Bonus'],
        popular: true,
        badge: '$11 Value!'
    },
    {
        id: 'premium',
        name: 'Premium Pack',
        price: 20,
        credits: 23,
        priceId: 'price_1SeUeGExVVDh2wU3jdPd1Oil',
        features: ['23 Credits', 'Priority Support', 'No Expiry', '15% Bonus'],
        popular: false,
        badge: 'Best Value!'
    }
]

// Check for deep-link pack selection
const preselectedPack = computed(() => {
    const packParam = route.query.pack
    if (packParam) {
        return creditPackages.find(p => p.id === packParam)
    }
    return null
})

const openAuthModal = (mode = 'login') => {
    authMode.value = mode
    authError.value = null
    showAuthModal.value = true
}

const closeAuthModal = () => {
    showAuthModal.value = false
    email.value = ''
    password.value = ''
    authError.value = null
}

const handleOAuthLogin = async (provider) => {
    authLoading.value = true
    authError.value = null
    try {
        await signInWithOAuth(provider)
    } catch (err) {
        authError.value = err.message
    } finally {
        authLoading.value = false
    }
}

const handleEmailAuth = async () => {
    if (!email.value) {
        authError.value = 'Email is required'
        return
    }
    
    authLoading.value = true
    authError.value = null
    
    try {
        if (authMode.value === 'magic') {
            await signInWithMagicLink(email.value)
            authError.value = null
            alert('Check your email for the magic link!')
            closeAuthModal()
        } else if (authMode.value === 'signup') {
            if (!password.value || password.value.length < 6) {
                authError.value = 'Password must be at least 6 characters'
                return
            }
            if (!termsAccepted.value) {
                authError.value = 'You must agree to the Terms of Service and Privacy Policy'
                return
            }
            await signUpWithEmail(email.value, password.value)
            alert('Check your email to confirm your account!')
            closeAuthModal()
        } else {
            if (!password.value) {
                authError.value = 'Password is required'
                return
            }
            await signInWithEmail(email.value, password.value)
            closeAuthModal()
            // Auto-purchase if there was a pending purchase
            if (pendingPurchase.value) {
                await handlePurchase(pendingPurchase.value)
                pendingPurchase.value = null
            }
        }
    } catch (err) {
        authError.value = err.message
    } finally {
        authLoading.value = false
    }
}

const handlePurchase = async (priceId) => {
    if (!user.value) {
        pendingPurchase.value = priceId
        openAuthModal('login')
        return
    }
    
    purchaseLoading.value = priceId
    try {
        await purchaseCredits(priceId)
    } catch (err) {
        alert(err.message)
    } finally {
        purchaseLoading.value = null
    }
}

// Auto-trigger purchase if deep-linked with pack and user is logged in
onMounted(() => {
    if (preselectedPack.value && user.value) {
        handlePurchase(preselectedPack.value.priceId)
    }
})
</script>

<template>
<div class="min-h-screen bg-godoty-bg">
    <!-- Header -->
    <header class="border-b border-godoty-border bg-godoty-panel/50 backdrop-blur-xl">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <router-link to="/" class="flex items-center gap-3">
                <img :src="logoSvg" alt="Godoty Logo" class="w-8 h-8" />
                <span class="font-bold text-xl tracking-tight text-white">Godoty</span>
            </router-link>
            
            <div class="flex items-center gap-4">
                <template v-if="!loading">
                    <template v-if="user">
                        <!-- Credit Balance -->
                        <div class="flex items-center gap-2 px-3 py-1.5 bg-godoty-surface rounded-lg border border-godoty-border">
                            <i class="ph ph-coins text-godoty-yellow"></i>
                            <span class="font-semibold text-white">{{ credits.toFixed(2) }}</span>
                        </div>
                        <button 
                            @click="signOut"
                            class="text-godoty-muted hover:text-white transition-colors text-sm"
                        >
                            Sign Out
                        </button>
                    </template>
                    <template v-else>
                        <button 
                            @click="openAuthModal('login')"
                            class="text-godoty-muted hover:text-white transition-colors text-sm"
                        >
                            Sign In
                        </button>
                    </template>
                </template>
            </div>
        </div>
    </header>
    
    <!-- Main Content -->
    <main class="max-w-5xl mx-auto px-6 py-16">
        <!-- Hero Section -->
        <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
                Purchase Credits
            </h1>
            <p class="text-xl text-godoty-muted max-w-2xl mx-auto">
                Credits power Godoty's AI assistant. Choose a pack that fits your needs.
            </p>
            
            <!-- Current Balance (if logged in) -->
            <div v-if="user && !loading" class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-godoty-surface rounded-full border border-godoty-border">
                <i class="ph ph-coins text-godoty-yellow"></i>
                <span class="text-godoty-muted">Current Balance:</span>
                <span class="font-bold text-white">{{ credits.toFixed(2) }} credits</span>
            </div>
        </div>
        
        <!-- Preselected Pack Notice -->
        <div v-if="preselectedPack && !user" class="mb-8 p-4 bg-godoty-blue/10 border border-godoty-blue/30 rounded-xl text-center">
            <p class="text-godoty-blue">
                <i class="ph ph-info mr-2"></i>
                Sign in to purchase the <strong>{{ preselectedPack.name }}</strong>
            </p>
        </div>
        
        <!-- Credit Packages Grid -->
        <div class="grid md:grid-cols-3 gap-6">
            <div 
                v-for="pack in creditPackages" 
                :key="pack.id"
                class="relative bg-godoty-panel border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                :class="[
                    pack.popular 
                        ? 'border-godoty-blue shadow-xl shadow-godoty-blue/10' 
                        : 'border-godoty-border hover:border-godoty-blue/50',
                    preselectedPack?.id === pack.id ? 'ring-2 ring-godoty-blue' : ''
                ]"
            >
                <!-- Popular Badge -->
                <div 
                    v-if="pack.popular" 
                    class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-godoty-blue text-white text-xs font-bold rounded-full"
                >
                    MOST POPULAR
                </div>
                
                <!-- Value Badge -->
                <div 
                    v-if="pack.badge" 
                    class="absolute -top-2 -right-2 px-2 py-1 bg-godoty-green text-white text-xs font-bold rounded-lg transform rotate-12"
                >
                    {{ pack.badge }}
                </div>
                
                <!-- Pack Header -->
                <div class="text-center mb-6">
                    <h3 class="text-xl font-bold text-white mb-2">{{ pack.name }}</h3>
                    <div class="flex items-baseline justify-center gap-1">
                        <span class="text-4xl font-bold text-white">${{ pack.price }}</span>
                    </div>
                    <p class="text-godoty-muted mt-2">{{ pack.credits }} credits</p>
                </div>
                
                <!-- Features -->
                <ul class="space-y-3 mb-6">
                    <li v-for="feature in pack.features" :key="feature" class="flex items-center gap-2 text-godoty-muted">
                        <i class="ph ph-check-circle text-godoty-green"></i>
                        {{ feature }}
                    </li>
                </ul>
                
                <!-- Purchase Button -->
                <button 
                    @click="handlePurchase(pack.priceId)"
                    :disabled="purchaseLoading === pack.priceId"
                    class="w-full py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    :class="pack.popular 
                        ? 'bg-godoty-blue hover:bg-godoty-blueDim text-white shadow-lg shadow-godoty-blue/20' 
                        : 'bg-godoty-surface border border-godoty-border hover:border-godoty-blue text-white'"
                >
                    <span v-if="purchaseLoading === pack.priceId" class="flex items-center justify-center gap-2">
                        <i class="ph ph-spinner animate-spin"></i>
                        Processing...
                    </span>
                    <span v-else>
                        {{ user ? 'Purchase' : 'Sign In to Purchase' }}
                    </span>
                </button>
            </div>
        </div>
        
        <!-- Info Section -->
        <div class="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div>
                <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-godoty-blue/20 flex items-center justify-center">
                    <i class="ph ph-lightning text-2xl text-godoty-blue"></i>
                </div>
                <h3 class="font-semibold text-white mb-2">Instant Delivery</h3>
                <p class="text-sm text-godoty-muted">Credits are added to your account immediately after purchase.</p>
            </div>
            <div>
                <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-godoty-green/20 flex items-center justify-center">
                    <i class="ph ph-infinity text-2xl text-godoty-green"></i>
                </div>
                <h3 class="font-semibold text-white mb-2">No Expiry</h3>
                <p class="text-sm text-godoty-muted">Your credits never expire. Use them whenever you need.</p>
            </div>
            <div>
                <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-godoty-yellow/20 flex items-center justify-center">
                    <i class="ph ph-shield-check text-2xl text-godoty-yellow"></i>
                </div>
                <h3 class="font-semibold text-white mb-2">Secure Payment</h3>
                <p class="text-sm text-godoty-muted">Powered by Stripe for safe and secure transactions.</p>
            </div>
        </div>
        
        <!-- Back Link -->
        <div class="mt-12 text-center">
            <router-link to="/" class="text-godoty-muted hover:text-godoty-blue transition-colors">
                <i class="ph ph-arrow-left mr-2"></i>
                Back to Home
            </router-link>
        </div>
    </main>
    
    <!-- Auth Modal -->
    <Teleport to="body">
        <div v-if="showAuthModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeAuthModal"></div>
            
            <!-- Modal -->
            <div class="relative w-full max-w-md bg-godoty-panel border border-godoty-border rounded-2xl p-8 shadow-2xl">
                <button 
                    @click="closeAuthModal"
                    class="absolute top-4 right-4 text-godoty-muted hover:text-white transition-colors"
                >
                    <i class="ph ph-x text-xl"></i>
                </button>
                
                <h2 class="text-2xl font-bold text-white mb-2">
                    {{ authMode === 'signup' ? 'Create Account' : authMode === 'magic' ? 'Magic Link' : 'Welcome Back' }}
                </h2>
                <p class="text-godoty-muted mb-6">
                    {{ authMode === 'signup' ? 'Sign up to purchase credits' : authMode === 'magic' ? 'Sign in with email link' : 'Sign in to your account' }}
                </p>
                
                <!-- Error Message -->
                <div v-if="authError" class="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {{ authError }}
                </div>
                
                <!-- OAuth Buttons -->
                <div class="space-y-3 mb-6">
                    <button 
                        @click="handleOAuthLogin('google')"
                        :disabled="authLoading"
                        class="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-800 rounded-xl font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Continue with Google
                    </button>
                    <button 
                        @click="handleOAuthLogin('github')"
                        :disabled="authLoading"
                        class="w-full flex items-center justify-center gap-3 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                        <i class="ph ph-github-logo text-xl"></i>
                        Continue with GitHub
                    </button>
                </div>
                
                <div class="relative mb-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-godoty-border"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-godoty-panel text-godoty-muted">or continue with email</span>
                    </div>
                </div>
                
                <!-- Email Form -->
                <form @submit.prevent="handleEmailAuth" class="space-y-4">
                    <div>
                        <input 
                            v-model="email"
                            type="email" 
                            placeholder="Email address"
                            class="w-full px-4 py-3 bg-godoty-surface border border-godoty-border rounded-xl text-white placeholder-godoty-muted focus:outline-none focus:border-godoty-blue transition-colors"
                        />
                    </div>
                    <div v-if="authMode !== 'magic'">
                        <input 
                            v-model="password"
                            type="password" 
                            placeholder="Password"
                            class="w-full px-4 py-3 bg-godoty-surface border border-godoty-border rounded-xl text-white placeholder-godoty-muted focus:outline-none focus:border-godoty-blue transition-colors"
                        />
                    </div>
                    
                    <!-- Terms Checkbox (Signup Only) -->
                    <div v-if="authMode === 'signup'" class="flex items-start gap-3">
                        <input 
                            id="terms-checkbox-credits"
                            v-model="termsAccepted"
                            type="checkbox"
                            class="mt-1 w-4 h-4 rounded border-godoty-border bg-godoty-surface text-godoty-blue focus:ring-godoty-blue focus:ring-offset-0 cursor-pointer"
                        />
                        <label for="terms-checkbox-credits" class="text-sm text-godoty-muted cursor-pointer">
                            I agree to the 
                            <router-link to="/terms" class="text-godoty-blue hover:underline" @click.stop>Terms of Service</router-link>
                            and 
                            <router-link to="/privacy" class="text-godoty-blue hover:underline" @click.stop>Privacy Policy</router-link>
                        </label>
                    </div>
                    
                    <button 
                        type="submit"
                        :disabled="authLoading || (authMode === 'signup' && !termsAccepted)"
                        class="w-full py-3 bg-godoty-blue hover:bg-godoty-blueDim text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span v-if="authLoading" class="flex items-center justify-center gap-2">
                            <i class="ph ph-spinner animate-spin"></i>
                            Loading...
                        </span>
                        <span v-else>
                            {{ authMode === 'signup' ? 'Sign Up' : authMode === 'magic' ? 'Send Magic Link' : 'Sign In' }}
                        </span>
                    </button>
                </form>
                
                <!-- Mode Toggles -->
                <div class="mt-6 text-center text-sm text-godoty-muted">
                    <template v-if="authMode === 'login'">
                        <button @click="authMode = 'magic'" class="text-godoty-blue hover:underline">Use magic link instead</button>
                        <span class="mx-2">•</span>
                        <button @click="authMode = 'signup'" class="text-godoty-blue hover:underline">Create account</button>
                    </template>
                    <template v-else-if="authMode === 'signup'">
                        Already have an account? <button @click="authMode = 'login'" class="text-godoty-blue hover:underline">Sign in</button>
                    </template>
                    <template v-else>
                        <button @click="authMode = 'login'" class="text-godoty-blue hover:underline">Use password instead</button>
                    </template>
                </div>
            </div>
        </div>
    </Teleport>
</div>
</template>
