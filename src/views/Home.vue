<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import logoSvg from '../assets/logo.svg'

const { user, credits, loading, error, signInWithOAuth, signInWithEmail, signUpWithEmail, signInWithMagicLink, signOut, purchaseCredits } = useAuth()

const scrolled = ref(false)
const activeOS = ref('windows')
const showAuthModal = ref(false)
const showUserMenu = ref(false)
const mobileMenuOpen = ref(false)
const authMode = ref('login') // 'login', 'signup', 'magic'
const authLoading = ref(false)
const authError = ref(null)
const purchaseLoading = ref(null)
const downloadLoading = ref(false)

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

const handleScroll = () => {
    scrolled.value = window.scrollY > 50
}

const scrollToDownload = () => {
    const el = document.getElementById('download')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const detectOS = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (userAgent.indexOf("mac") != -1) activeOS.value = 'mac'
    else if (userAgent.indexOf("linux") != -1) activeOS.value = 'linux'
    else activeOS.value = 'windows'
}

const openAuthModal = (mode = 'login') => {
    authMode.value = mode
    authError.value = null
    showAuthModal.value = true
    showUserMenu.value = false
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
        }
    } catch (err) {
        authError.value = err.message
    } finally {
        authLoading.value = false
    }
}

const handleSignOut = async () => {
    showUserMenu.value = false
    try {
        await signOut()
    } catch (err) {
        console.error('Sign out error:', err)
    }
}

const handlePurchase = async (priceId) => {
    if (!user.value) {
        openAuthModal('login')
        return
    }
    
    purchaseLoading.value = priceId
    try {
        await purchaseCredits(priceId)
    } catch (err) {
        alert(err.message)
        purchaseLoading.value = null
    }
}

const handleDownload = () => {
    downloadLoading.value = true
    setTimeout(() => {
        downloadLoading.value = false
    }, 2000)
}

// Close user menu when clicking outside
const handleClickOutside = (event) => {
    if (showUserMenu.value && !event.target.closest('.user-menu-container')) {
        showUserMenu.value = false
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('click', handleClickOutside)
    detectOS()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
<div class="min-h-screen flex flex-col">
    
    <!-- Navbar -->
    <nav class="fixed w-full top-0 z-50 transition-all duration-300 border-b border-transparent" :class="{'glass-panel border-godoty-border': scrolled || mobileMenuOpen}">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3 relative z-50">
                <img :src="logoSvg" alt="Godoty Logo" class="w-8 h-8" />
                <span class="font-bold text-xl tracking-tight text-white">Godoty</span>
            </div>
            
            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-4 text-sm font-medium text-godoty-muted">
                <a href="#features" class="px-4 py-2 hover:text-godoty-blue hover:bg-godoty-surface/50 rounded-lg transition-all">Features</a>
                <a href="#pricing" class="px-4 py-2 hover:text-godoty-blue hover:bg-godoty-surface/50 rounded-lg transition-all">Pricing</a>
                
                <!-- Auth Buttons / User Menu -->
                <template v-if="!loading">
                    <!-- Logged Out -->
                    <template v-if="!user">
                        <button 
                            @click="openAuthModal('login')"
                            class="px-4 py-2 bg-godoty-blue hover:bg-godoty-blueDim text-white rounded-lg transition-all shadow-lg shadow-godoty-blue/20"
                        >
                            Sign In
                        </button>
                    </template>
                    
                    <!-- Logged In -->
                    <template v-else>
                        <!-- Credit Balance -->
                        <div class="flex items-center gap-2 px-3 py-1.5 bg-godoty-surface rounded-lg border border-godoty-border">
                            <i class="ph ph-coins text-godoty-blue"></i>
                            <span class="text-white font-semibold">{{ credits.toFixed(2) }}</span>
                            <span class="text-godoty-muted text-xs">credits</span>
                        </div>
                        
                        <!-- User Menu -->
                        <div class="relative user-menu-container">
                            <button 
                                @click.stop="showUserMenu = !showUserMenu"
                                class="flex items-center gap-2 px-3 py-1.5 bg-godoty-surface rounded-lg border border-godoty-border hover:border-godoty-blue transition-colors"
                            >
                                <div class="w-6 h-6 rounded-full bg-godoty-blue flex items-center justify-center text-white text-xs font-bold">
                                    {{ user.email?.charAt(0).toUpperCase() }}
                                </div>
                                <i class="ph ph-caret-down text-godoty-muted text-sm"></i>
                            </button>
                            
                            <!-- Dropdown -->
                            <div 
                                v-if="showUserMenu"
                                class="absolute right-0 mt-2 w-64 bg-godoty-panel border border-godoty-border rounded-xl shadow-xl overflow-hidden"
                            >
                                <div class="px-4 py-3 border-b border-godoty-border">
                                    <p class="text-white font-medium truncate">{{ user.email }}</p>
                                    <p class="text-godoty-muted text-xs">Signed in</p>
                                </div>
                                <div class="p-2">
                                    <a 
                                        href="#pricing"
                                        @click="showUserMenu = false"
                                        class="flex items-center gap-3 px-3 py-2 text-sm text-godoty-muted hover:text-white hover:bg-godoty-surface rounded-lg transition-colors"
                                    >
                                        <i class="ph ph-plus-circle"></i>
                                        Buy Credits
                                    </a>
                                    <button 
                                        @click="handleSignOut"
                                        class="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-godoty-surface rounded-lg transition-colors"
                                    >
                                        <i class="ph ph-sign-out"></i>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>
                
                <!-- Loading State -->
                <template v-else>
                    <div class="w-20 h-8 bg-godoty-surface rounded-lg animate-pulse"></div>
                </template>
            </div>
            
            <!-- Mobile Menu Button -->
            <button 
                class="md:hidden text-white relative z-50 p-2"
                @click="mobileMenuOpen = !mobileMenuOpen"
            >
                <i :class="mobileMenuOpen ? 'ph ph-x' : 'ph ph-list'" class="text-2xl"></i>
            </button>
        </div>

        <!-- Mobile Menu Overlay -->
        <Teleport to="body">
            <div 
                v-if="mobileMenuOpen"
                class="fixed inset-0 bg-godoty-bg z-[60] flex flex-col pt-24 px-6 md:hidden overflow-y-auto"
            >
                <!-- Close Button (Added for better UX since it's now full screen/body level) -->
                <button 
                    class="absolute top-4 right-6 p-2 text-white"
                    @click="mobileMenuOpen = false"
                >
                    <i class="ph ph-x text-2xl"></i>
                </button>

                <div class="flex flex-col gap-6 text-lg font-medium text-godoty-muted">
                    <a 
                        href="#features" 
                        @click="mobileMenuOpen = false"
                        class="py-2 border-b border-godoty-border hover:text-white transition-colors"
                    >
                        Features
                    </a>
                    <a 
                        href="#pricing" 
                        @click="mobileMenuOpen = false"
                        class="py-2 border-b border-godoty-border hover:text-white transition-colors"
                    >
                        Pricing
                    </a>
                    
                    <div class="mt-4 flex flex-col gap-4">
                         <template v-if="!loading">
                            <template v-if="!user">
                                <button 
                                    @click="openAuthModal('login'); mobileMenuOpen = false"
                                    class="w-full py-3 bg-godoty-blue text-white rounded-xl font-semibold shadow-lg shadow-godoty-blue/20"
                                >
                                    Sign In
                                </button>
                                 <button 
                                    @click="openAuthModal('signup'); mobileMenuOpen = false"
                                    class="w-full py-3 bg-godoty-surface border border-godoty-border text-white rounded-xl font-semibold"
                                >
                                    Create Account
                                </button>
                            </template>
                            <template v-else>
                                 <div class="flex items-center gap-3 py-4 border-b border-godoty-border">
                                    <div class="w-10 h-10 rounded-full bg-godoty-blue flex items-center justify-center text-white font-bold">
                                        {{ user.email?.charAt(0).toUpperCase() }}
                                    </div>
                                    <div class="overflow-hidden">
                                        <p class="text-white font-medium truncate">{{ user.email }}</p>
                                        <p class="text-godoty-muted text-sm flex items-center gap-1">
                                            <i class="ph ph-coins text-godoty-blue"></i>
                                            {{ credits.toFixed(2) }} credits
                                        </p>
                                    </div>
                                </div>
    
                                 <button 
                                    @click="handlePurchase('starter'); mobileMenuOpen = false" 
                                    class="w-full py-3 text-left hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <i class="ph ph-plus-circle"></i>
                                    Buy Credits
                                 </button>
                                 
                                <button 
                                    @click="handleSignOut(); mobileMenuOpen = false"
                                    class="w-full py-3 text-left text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                                >
                                    <i class="ph ph-sign-out"></i>
                                    Sign Out
                                </button>
                            </template>
                         </template>
                    </div>
                </div>
            </div>
        </Teleport>
    </nav>

    <!-- Auth Modal -->
    <Teleport to="body">
        <div 
            v-if="showAuthModal" 
            class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
            <!-- Backdrop -->
            <div 
                class="absolute inset-0 bg-black/70 backdrop-blur-sm"
                @click="closeAuthModal"
            ></div>
            
            <!-- Modal -->
            <div class="relative w-full max-w-md bg-godoty-panel border border-godoty-border rounded-2xl shadow-2xl overflow-hidden">
                <!-- Header -->
                <div class="px-6 py-4 border-b border-godoty-border flex items-center justify-between">
                    <h2 class="text-xl font-bold text-white">
                        {{ authMode === 'signup' ? 'Create Account' : authMode === 'magic' ? 'Magic Link' : 'Welcome Back' }}
                    </h2>
                    <button @click="closeAuthModal" class="text-godoty-muted hover:text-white transition-colors">
                        <i class="ph ph-x text-xl"></i>
                    </button>
                </div>
                
                <!-- Body -->
                <div class="p-6 space-y-6">
                    <!-- OAuth Buttons -->
                    <div class="space-y-3">
                        <button 
                            @click="handleOAuthLogin('google')"
                            :disabled="authLoading"
                            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                            Continue with Google
                        </button>
                        
                        <button 
                            @click="handleOAuthLogin('github')"
                            :disabled="authLoading"
                            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            Continue with GitHub
                        </button>
                    </div>
                    
                    <!-- Divider -->
                    <div class="flex items-center gap-4">
                        <div class="flex-1 h-px bg-godoty-border"></div>
                        <span class="text-godoty-muted text-sm">or</span>
                        <div class="flex-1 h-px bg-godoty-border"></div>
                    </div>
                    
                    <form @submit.prevent="handleEmailAuth" class="space-y-4">
                        <div>
                            <label class="block text-sm text-godoty-muted mb-2">Email</label>
                            <input 
                                v-model="email"
                                type="email"
                                placeholder="you@example.com"
                                class="w-full px-4 py-3 bg-godoty-surface border border-godoty-border rounded-xl text-white placeholder-godoty-muted focus:outline-none focus:border-godoty-blue transition-colors"
                            />
                        </div>
                        
                        <div v-if="authMode !== 'magic'">
                            <label class="block text-sm text-godoty-muted mb-2">Password</label>
                            <input 
                                v-model="password"
                                type="password"
                                placeholder="••••••••"
                                class="w-full px-4 py-3 bg-godoty-surface border border-godoty-border rounded-xl text-white placeholder-godoty-muted focus:outline-none focus:border-godoty-blue transition-colors"
                            />
                        </div>
                        
                        <!-- Terms Checkbox (Signup Only) -->
                        <div v-if="authMode === 'signup'" class="flex items-start gap-3">
                            <input 
                                id="terms-checkbox"
                                v-model="termsAccepted"
                                type="checkbox"
                                class="mt-1 w-4 h-4 rounded border-godoty-border bg-godoty-surface text-godoty-blue focus:ring-godoty-blue focus:ring-offset-0 cursor-pointer"
                            />
                            <label for="terms-checkbox" class="text-sm text-godoty-muted cursor-pointer">
                                I agree to the 
                                <router-link to="/terms" class="text-godoty-blue hover:underline" @click.stop>Terms of Service</router-link>
                                and 
                                <router-link to="/privacy" class="text-godoty-blue hover:underline" @click.stop>Privacy Policy</router-link>
                            </label>
                        </div>
                        
                        <!-- Error Message -->
                        <p v-if="authError" class="text-red-400 text-sm">{{ authError }}</p>
                        
                        <button 
                            type="submit"
                            :disabled="authLoading || (authMode === 'signup' && !termsAccepted)"
                            class="w-full py-3 bg-godoty-blue hover:bg-godoty-blueDim text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <svg v-if="authLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {{ authMode === 'signup' ? 'Create Account' : authMode === 'magic' ? 'Send Magic Link' : 'Sign In' }}
                        </button>
                    </form>
                    
                    <!-- Mode Switcher -->
                    <div class="text-center text-sm text-godoty-muted">
                        <template v-if="authMode === 'login'">
                            Don't have an account? 
                            <button @click="authMode = 'signup'" class="text-godoty-blue hover:underline">Sign up</button>
                            <span class="mx-2">•</span>
                            <button @click="authMode = 'magic'" class="text-godoty-blue hover:underline">Use Magic Link</button>
                        </template>
                        <template v-else-if="authMode === 'signup'">
                            Already have an account? 
                            <button @click="authMode = 'login'" class="text-godoty-blue hover:underline">Sign in</button>
                        </template>
                        <template v-else>
                            <button @click="authMode = 'login'" class="text-godoty-blue hover:underline">Back to Sign In</button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>

    <!-- Hero Section -->
    <header class="relative pt-24 lg:pt-32 pb-20 overflow-hidden">
        <div class="absolute inset-0 hero-glow z-0"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            
            <!-- Hero Text -->
            <div class="space-y-8 opacity-0 animate-fade-in-up" style="animation-delay: 0.1s;">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-godoty-surface border border-godoty-border text-xs font-medium text-godoty-blue">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-godoty-blue opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-godoty-blue"></span>
                    </span>
                    Compatible with Godot 4.5
                </div>
                
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                    Your Intelligent <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-godoty-blue to-cyan-400">Godot Companion</span>
                </h1>
                
                <p class="text-lg text-godoty-muted max-w-xl">
                    Generate plans, debug scripts, and track your project history without leaving your workflow. The AI copilot designed specifically for GDScript.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <button @click="scrollToDownload" class="px-8 py-3.5 bg-godoty-blue hover:bg-godoty-blueDim text-white font-semibold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-xl shadow-godoty-blue/20 flex items-center justify-center gap-2">
                        <i class="ph ph-download-simple text-xl"></i>
                        Download Beta
                    </button>
                    <button class="px-8 py-3.5 bg-godoty-surface border border-godoty-border hover:border-godoty-blue/50 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2">
                        <i class="ph ph-play-circle text-xl"></i>
                        Watch Demo
                    </button>
                </div>

                <div class="flex items-center gap-6 pt-4 text-sm text-godoty-muted">
                    <div class="flex items-center gap-2">
                        <i class="ph ph-check-circle text-godoty-green"></i>
                        <span>Context Aware</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="ph ph-check-circle text-godoty-green"></i>
                        <span>Privacy Focused</span>
                    </div>
                </div>
            </div>

            <!-- Hero Image / UI Mockup -->
            <div class="relative opacity-0 animate-fade-in-up" style="animation-delay: 0.3s;">
                <!-- Decorative Elements -->
                <div class="absolute -top-10 -right-10 w-64 h-64 bg-godoty-blue/10 rounded-full blur-3xl"></div>
                
                <!-- Window Mockup -->
                <div class="relative rounded-xl overflow-hidden bg-godoty-bg border border-godoty-border shadow-2xl animate-float">
                    <!-- Title Bar -->
                    <div class="h-10 bg-godoty-panel border-b border-godoty-border flex items-center px-4 justify-between">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                        </div>
                        <div class="text-xs text-godoty-muted font-mono">2dplatformer - Godoty</div>
                    </div>
                    
                    <!-- Content Area -->
                    <div class="flex h-[400px]">
                        <!-- Sidebar -->
                        <div class="w-48 bg-godoty-panel border-r border-godoty-border p-4 hidden sm:block">
                            <div class="text-xs font-bold text-godoty-muted uppercase tracking-wider mb-4">History</div>
                            <div class="space-y-2">
                                <div class="p-2 rounded bg-godoty-surface text-xs text-godoty-blue border-l-2 border-godoty-blue">Could you...</div>
                                <div class="p-2 rounded hover:bg-godoty-surface/50 text-xs text-godoty-muted cursor-pointer transition-colors">Testing config...</div>
                                <div class="p-2 rounded hover:bg-godoty-surface/50 text-xs text-godoty-muted cursor-pointer transition-colors">Testing session...</div>
                            </div>
                        </div>
                        
                        <!-- Main Chat -->
                        <div class="flex-1 bg-godoty-bg p-6 font-mono text-sm overflow-hidden relative">
                            <!-- User Query -->
                            <div class="mb-6 flex gap-3">
                                <div class="w-8 h-8 rounded bg-godoty-surface flex items-center justify-center shrink-0 text-godoty-muted">
                                    <i class="ph ph-user"></i>
                                </div>
                                <div class="space-y-1">
                                    <p class="text-godoty-muted text-xs">You</p>
                                    <p>Fix the jump mechanics in Player.gd</p>
                                </div>
                            </div>

                            <!-- Bot Response (Plan Card) -->
                            <div class="mb-6 flex gap-3">
                                <div class="w-8 h-8 rounded bg-godoty-blue flex items-center justify-center shrink-0 text-white">
                                    <i class="ph ph-robot"></i>
                                </div>
                                <div class="flex-1 space-y-3">
                                    <p class="text-godoty-muted text-xs">Godoty</p>
                                    
                                    <div class="rounded-lg border border-godoty-border bg-godoty-surface overflow-hidden">
                                        <div class="bg-godoty-panel px-4 py-2 border-b border-godoty-border flex items-center gap-2">
                                            <i class="ph ph-clipboard-text text-yellow-500"></i>
                                            <span class="font-bold text-white text-xs">Plan Generated</span>
                                        </div>
                                        <div class="p-4 space-y-2 text-xs text-gray-300">
                                            <div class="font-bold text-white"># Goal</div>
                                            <p>Refactor input handling for smoother jumps.</p>
                                            <div class="font-bold text-white mt-2">## Proposed Changes</div>
                                            <ul class="list-disc pl-4 space-y-1 text-gray-400">
                                                <li>Update <span class="text-godoty-blue">Player.gd</span> with modern keycodes</li>
                                                <li>Verify <span class="text-godoty-blue">is_on_floor()</span> logic</li>
                                            </ul>
                                        </div>
                                        <div class="bg-godoty-panel px-4 py-3 border-t border-godoty-border flex justify-end">
                                            <button class="bg-godoty-green hover:bg-opacity-90 text-white text-xs px-3 py-1.5 rounded transition-colors font-medium">
                                                Accept & Execute
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Chat Input Placeholder -->
                            <div class="absolute bottom-4 left-4 right-4 h-12 bg-godoty-surface border border-godoty-border rounded-lg flex items-center px-4 text-godoty-muted">
                                <span class="animate-pulse">|</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Features Grid -->
    <section id="features" class="py-24 bg-godoty-panel relative">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-white mb-4">Built for Godot Developers</h2>
                <p class="text-godoty-muted">Everything you need to accelerate your game development cycle.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="p-6 rounded-2xl bg-godoty-bg border border-godoty-border hover:border-godoty-blue/50 transition-colors group">
                    <div class="w-12 h-12 rounded-lg bg-godoty-surface flex items-center justify-center text-godoty-blue mb-4 group-hover:bg-godoty-blue group-hover:text-white transition-all">
                        <i class="ph ph-brain text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Smart Planning</h3>
                    <p class="text-godoty-muted text-sm leading-relaxed">
                        Godoty doesn't just guess. It generates detailed execution plans, analyzing your project structure before suggesting changes.
                    </p>
                </div>

                <!-- Feature 2 -->
                <div class="p-6 rounded-2xl bg-godoty-bg border border-godoty-border hover:border-godoty-blue/50 transition-colors group">
                    <div class="w-12 h-12 rounded-lg bg-godoty-surface flex items-center justify-center text-godoty-blue mb-4 group-hover:bg-godoty-blue group-hover:text-white transition-all">
                        <i class="ph ph-code text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Context Aware</h3>
                    <p class="text-godoty-muted text-sm leading-relaxed">
                        It reads your <code class="text-xs bg-godoty-surface px-1 py-0.5 rounded text-godoty-blue">.gd</code> files and scene structures to provide relevant, bug-free code snippets.
                    </p>
                </div>

                <!-- Feature 3 -->
                <div class="p-6 rounded-2xl bg-godoty-bg border border-godoty-border hover:border-godoty-blue/50 transition-colors group">
                    <div class="w-12 h-12 rounded-lg bg-godoty-surface flex items-center justify-center text-godoty-blue mb-4 group-hover:bg-godoty-blue group-hover:text-white transition-all">
                        <i class="ph ph-bug text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Auto-Debugging</h3>
                    <p class="text-godoty-muted text-sm leading-relaxed">
                        Encountered an error? Godoty analyzes the stack trace and suggests fixes instantly, reducing downtime.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-24 bg-godoty-bg relative">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-white mb-4">Credit Packages</h2>
                <p class="text-godoty-muted">Purchase credits to power your AI-assisted development. No subscription required.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <!-- Credit Package Cards -->
                <div 
                    v-for="pkg in creditPackages" 
                    :key="pkg.id"
                    class="relative p-8 rounded-2xl bg-godoty-panel border transition-all flex flex-col items-center text-center"
                    :class="pkg.popular ? 'border-2 border-godoty-blue/50 hover:border-godoty-blue shadow-2xl shadow-godoty-blue/10' : 'border-godoty-border hover:border-godoty-blue/50'"
                >
                    <!-- Badge -->
                    <div 
                        v-if="pkg.badge"
                        class="absolute -top-4 bg-gradient-to-r from-godoty-blue to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg"
                    >
                        {{ pkg.badge }}
                    </div>
                    
                    <div :class="pkg.popular ? 'text-godoty-blue' : 'text-godoty-muted'" class="mb-2 font-medium">{{ pkg.name }}</div>
                    <div class="text-4xl font-bold text-white mb-2">${{ pkg.price }}</div>
                    <div class="text-godoty-blue text-lg font-semibold mb-6">{{ pkg.credits }} Credits</div>
                    
                    <ul class="space-y-3 text-sm text-godoty-muted mb-8 w-full">
                        <li v-for="feature in pkg.features" :key="feature" class="flex items-center justify-center gap-2">
                            <i class="ph ph-check text-godoty-green"></i>
                            <span>{{ feature }}</span>
                        </li>
                    </ul>
                    
                    <button 
                        @click="handlePurchase(pkg.priceId)"
                        :disabled="purchaseLoading !== null"
                        class="w-full py-3 rounded-xl transition-all font-semibold mt-auto flex items-center justify-center gap-2"
                        :class="pkg.popular ? 'bg-godoty-blue hover:bg-godoty-blueDim text-white shadow-lg shadow-godoty-blue/20' : 'bg-godoty-surface border border-godoty-border hover:bg-godoty-blue hover:border-transparent text-white'"
                    >
                        <i v-if="purchaseLoading === pkg.priceId" class="ph ph-spinner animate-spin text-xl"></i>
                        {{ purchaseLoading === pkg.priceId ? 'Processing...' : (user ? 'Purchase' : 'Sign in to Purchase') }}
                    </button>
                </div>
            </div>
            
            <!-- Info Note -->
            <p class="text-center text-godoty-muted text-sm mt-8">
                <i class="ph ph-info mr-1"></i>
                Credits never expire. Use them at your own pace.
            </p>
        </div>
    </section>

    <!-- Download Section -->
    <section id="download" class="py-32 relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <div class="w-[800px] h-[800px] bg-godoty-blue/5 rounded-full blur-[100px]"></div>
        </div>

        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 class="text-4xl font-bold text-white mb-6">Start Building Faster Today</h2>
            <p class="text-godoty-muted mb-12">Available for Windows, macOS, and Linux. Free for open source projects.</p>
            
            <div class="grid md:grid-cols-3 gap-6">
                <!-- Windows -->
                <button 
                    disabled
                    class="relative group p-6 rounded-xl border border-godoty-border bg-godoty-surface opacity-50 cursor-not-allowed flex flex-col items-center gap-4"
                >
                    <svg class="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h11.377v11.372H0zM12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zM12.623 12.623H24V24H12.623z"/></svg>
                    <div class="text-center">
                        <div class="font-bold text-white">Windows</div>
                        <div class="text-xs text-godoty-muted mt-1">x64 Installer</div>
                    </div>
                    <div class="w-full mt-2 py-2 rounded bg-godoty-panel text-sm text-godoty-muted cursor-not-allowed">Coming Soon</div>
                </button>

                <!-- Mac -->
                <a 
                    href="/builds/Godoty-Mac.zip"
                    download="Godoty-Mac.zip"
                    @mouseenter="activeOS = 'mac'" 
                    @click="handleDownload"
                    class="relative group p-6 rounded-xl border border-godoty-border bg-godoty-surface hover:border-godoty-blue transition-all flex flex-col items-center gap-4 cursor-pointer"
                    :class="{'ring-2 ring-godoty-blue border-transparent transform -translate-y-2': activeOS === 'mac'}"
                >
                    <svg class="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
                    <div class="text-center">
                        <div class="font-bold text-white">macOS</div>
                        <div class="text-xs text-godoty-muted mt-1">Universal (Intel/M1)</div>
                    </div>
                    <div class="w-full mt-2 py-2 rounded bg-godoty-panel text-sm transition-colors flex items-center justify-center gap-2" :class="downloadLoading ? 'bg-godoty-blue text-white' : 'text-godoty-blue group-hover:bg-godoty-blue group-hover:text-white'">
                        <i v-if="downloadLoading" class="ph ph-spinner animate-spin"></i>
                        {{ downloadLoading ? 'Starting...' : 'Download' }}
                    </div>
                </a>

                <!-- Linux -->
                <button 
                    disabled
                    class="relative group p-6 rounded-xl border border-godoty-border bg-godoty-surface opacity-50 cursor-not-allowed flex flex-col items-center gap-4"
                >
                    <svg class="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z"/></svg>
                    <div class="text-center">
                        <div class="font-bold text-white">Linux</div>
                        <div class="text-xs text-godoty-muted mt-1">.tar.gz AppImage</div>
                    </div>
                    <div class="w-full mt-2 py-2 rounded bg-godoty-panel text-sm text-godoty-muted cursor-not-allowed">Coming Soon</div>
                </button>
            </div>
            
            <p class="mt-12 text-xs text-godoty-muted">
                By downloading, you agree to the <router-link to="/terms" class="text-godoty-blue hover:underline">Terms of Service</router-link> and <router-link to="/privacy" class="text-godoty-blue hover:underline">Privacy Policy</router-link>. <br>
                Current Version: v0.1.0 Beta
            </p>
        </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-godoty-border bg-godoty-panel py-12 mt-auto">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-3">
                 <img :src="logoSvg" alt="Godoty Logo" class="w-6 h-6" />
                <span class="text-sm font-semibold text-white">Godoty</span>
            </div>
            
            <!-- Legal Links -->
            <div class="flex items-center gap-6 text-sm text-godoty-muted">
                <router-link to="/terms" class="hover:text-godoty-blue transition-colors">Terms of Service</router-link>
                <router-link to="/privacy" class="hover:text-godoty-blue transition-colors">Privacy Policy</router-link>
            </div>
            
            <div class="text-xs text-godoty-muted">
                &copy; 2025 Godoty AI. All rights reserved.
            </div>
        </div>
    </footer>
</div>
</template>

<style scoped>
/* Scoped styles if needed, but most is in global style.css */
</style>
