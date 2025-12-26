<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import AuthModal from '../components/common/AuthModal.vue'

const route = useRoute()
const { user, credits, loading, signInWithOAuth, signInWithEmail, signUpWithEmail, signInWithMagicLink, signOut, purchaseCredits } = useAuth()

const mobileMenuOpen = ref(false)
const showAuthModal = ref(false)
const authMode = ref('login')
const authLoading = ref(false)
const authError = ref(null)
const purchaseLoading = ref(null)
const pendingPurchase = ref(null)

const creditPackages = [
    { id: 'starter', name: 'Starter Pack', price: 5, credits: 5, priceId: 'price_1SeUdXExVVDh2wU3LoTcnc6A', features: ['5 Credits', 'Basic Support', 'No Expiry'], popular: false },
    { id: 'pro', name: 'Pro Pack', price: 10, credits: 11, priceId: 'price_1SeUduExVVDh2wU3h4yLDftJ', features: ['11 Credits', 'Priority Support', 'No Expiry', '10% Bonus'], popular: true, badge: '$11 Value!' },
    { id: 'premium', name: 'Premium Pack', price: 20, credits: 23, priceId: 'price_1SeUeGExVVDh2wU3jdPd1Oil', features: ['23 Credits', 'Priority Support', 'No Expiry', '15% Bonus'], popular: false, badge: 'Best Value!' }
]

const preselectedPack = computed(() => {
    const packParam = route.query.pack
    if (packParam) return creditPackages.find(p => p.id === packParam)
    return null
})

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

const handleEmailAuth = async ({ email, password, mode, termsAccepted }) => {
    if (!email) {
        authError.value = 'Email is required'
        return
    }
    
    authLoading.value = true
    authError.value = null
    
    try {
        if (mode === 'magic') {
            await signInWithMagicLink(email)
            alert('Check your email for the magic link!')
            showAuthModal.value = false
        } else if (mode === 'signup') {
            if (!password || password.length < 6) throw new Error('Password must be at least 6 characters')
            if (!termsAccepted) throw new Error('You must accept the terms')
            await signUpWithEmail(email, password)
            alert('Check your email to confirm your account!')
            showAuthModal.value = false
        } else {
            if (!password) throw new Error('Password is required')
            await signInWithEmail(email, password)
            showAuthModal.value = false
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

const handleSignOut = async () => {
    try {
        await signOut()
        mobileMenuOpen.value = false
    } catch (err) {
        console.error('Sign out error:', err)
    }
}

const handlePurchase = async (priceId) => {
    if (!user.value) {
        pendingPurchase.value = priceId
        authMode.value = 'login'
        showAuthModal.value = true
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

onMounted(() => {
    if (preselectedPack.value && user.value) {
        handlePurchase(preselectedPack.value.priceId)
    }
})
</script>

<template>
<div class="min-h-screen flex flex-col bg-godot-dark">
    <Navbar 
        :user="user"
        :credits="credits"
        :loading="loading"
        @open-auth="showAuthModal = true; authMode = 'login'"
        @sign-out="handleSignOut"
        @toggle-mobile-menu="mobileMenuOpen = $event"
    />

    <MobileMenu
        :is-open="mobileMenuOpen"
        :user="user"
        :credits="credits"
        @close="mobileMenuOpen = false"
        @open-auth="authMode = $event; showAuthModal = true"
        @sign-out="handleSignOut"
    />

    <AuthModal
        v-model="showAuthModal"
        :initial-mode="authMode"
        :loading="authLoading"
        :error="authError"
        @oauth-login="handleOAuthLogin"
        @email-auth="handleEmailAuth"
    />

    <main class="flex-1 pt-24">
        <div class="max-w-5xl mx-auto px-6 py-16">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-white mb-4">Purchase Credits</h1>
                <p class="text-lg text-godot-muted max-w-2xl mx-auto">Credits power Godoty's AI assistant. Choose a pack that fits your needs.</p>
                
                <div v-if="user && !loading" class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-godot-surface rounded-full border border-godot-border">
                    <i class="ph ph-coins text-godot-yellow"></i>
                    <span class="text-godot-muted">Current Balance:</span>
                    <span class="font-bold text-white">{{ credits.toFixed(2) }} credits</span>
                </div>
            </div>
            
            <div v-if="preselectedPack && !user" class="mb-8 p-4 bg-godot-blue/10 border border-godot-blue/30 rounded-xl text-center">
                <p class="text-godot-blue">
                    <i class="ph ph-info mr-2"></i>
                    Sign in to purchase the <strong>{{ preselectedPack.name }}</strong>
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-6">
                <div 
                    v-for="pack in creditPackages" 
                    :key="pack.id"
                    class="relative bg-godot-surface/50 border rounded-2xl p-6 transition-all hover:scale-[1.02]"
                    :class="[
                        pack.popular ? 'border-godot-blue shadow-xl shadow-godot-blue/10' : 'border-godot-border hover:border-godot-blue/50',
                        preselectedPack?.id === pack.id ? 'ring-2 ring-godot-blue' : ''
                    ]"
                >
                    <div v-if="pack.popular" class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-godot-blue text-white text-xs font-bold rounded-full">
                        MOST POPULAR
                    </div>
                    
                    <div v-if="pack.badge" class="absolute -top-2 -right-2 px-2 py-1 bg-godot-green text-white text-xs font-bold rounded-lg transform rotate-12">
                        {{ pack.badge }}
                    </div>
                    
                    <div class="text-center mb-6">
                        <h3 class="text-xl font-bold text-white mb-2">{{ pack.name }}</h3>
                        <div class="flex items-baseline justify-center gap-1">
                            <span class="text-4xl font-bold text-white">${{ pack.price }}</span>
                        </div>
                        <p class="text-godot-muted mt-2">{{ pack.credits }} credits</p>
                    </div>
                    
                    <ul class="space-y-3 mb-6">
                        <li v-for="feature in pack.features" :key="feature" class="flex items-center gap-2 text-godot-muted text-sm">
                            <i class="ph ph-check-circle text-godot-green"></i>
                            {{ feature }}
                        </li>
                    </ul>
                    
                    <button 
                        @click="handlePurchase(pack.priceId)"
                        :disabled="purchaseLoading === pack.priceId"
                        class="w-full py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        :class="pack.popular 
                            ? 'bg-godot-blue hover:bg-godot-blue-hover text-white shadow-lg shadow-godot-blue/20' 
                            : 'bg-godot-dark border border-godot-border hover:border-godot-blue text-white'"
                    >
                        <i v-if="purchaseLoading === pack.priceId" class="ph ph-spinner animate-spin"></i>
                        {{ purchaseLoading === pack.priceId ? 'Processing...' : (user ? 'Purchase' : 'Sign In to Purchase') }}
                    </button>
                </div>
            </div>
            
            <div class="mt-16 grid md:grid-cols-3 gap-8 text-center">
                <div>
                    <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-godot-blue/20 flex items-center justify-center">
                        <i class="ph ph-lightning text-2xl text-godot-blue"></i>
                    </div>
                    <h3 class="font-semibold text-white mb-2">Instant Delivery</h3>
                    <p class="text-sm text-godot-muted">Credits are added to your account immediately after purchase.</p>
                </div>
                <div>
                    <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-godot-green/20 flex items-center justify-center">
                        <i class="ph ph-infinity text-2xl text-godot-green"></i>
                    </div>
                    <h3 class="font-semibold text-white mb-2">No Expiry</h3>
                    <p class="text-sm text-godot-muted">Your credits never expire. Use them whenever you need.</p>
                </div>
                <div>
                    <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-godot-yellow/20 flex items-center justify-center">
                        <i class="ph ph-shield-check text-2xl text-godot-yellow"></i>
                    </div>
                    <h3 class="font-semibold text-white mb-2">Secure Payment</h3>
                    <p class="text-sm text-godot-muted">Powered by Stripe for safe and secure transactions.</p>
                </div>
            </div>
            
            <div class="mt-12 text-center">
                <router-link to="/" class="text-godot-muted hover:text-godot-blue transition-colors">
                    <i class="ph ph-arrow-left mr-2"></i>
                    Back to Home
                </router-link>
            </div>
        </div>
    </main>
    
    <Footer />
</div>
</template>
