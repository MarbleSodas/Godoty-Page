<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import AuthModal from '../components/common/AuthModal.vue'

const { user, credits, loading, signInWithOAuth, signInWithEmail, signUpWithEmail, signInWithMagicLink, signOut, purchaseCredits } = useAuth()

const mobileMenuOpen = ref(false)
const showAuthModal = ref(false)
const authMode = ref('login')
const authLoading = ref(false)
const authError = ref(null)
const purchaseLoading = ref(null)
const downloadLoading = ref(false)
const activeOS = ref('windows')

const creditPackages = [
  { id: 'starter', name: 'Starter Pack', price: 5, credits: 5, priceId: 'price_1SeUdXExVVDh2wU3LoTcnc6A', features: ['5 Credits', 'Basic Support', 'No Expiry'], popular: false },
  { id: 'pro', name: 'Pro Pack', price: 10, credits: 11, priceId: 'price_1SeUduExVVDh2wU3h4yLDftJ', features: ['11 Credits', 'Priority Support', 'No Expiry', '10% Bonus'], popular: true, badge: '$11 Value!' },
  { id: 'premium', name: 'Premium Pack', price: 20, credits: 23, priceId: 'price_1SeUeGExVVDh2wU3jdPd1Oil', features: ['23 Credits', 'Priority Support', 'No Expiry', '15% Bonus'], popular: false, badge: 'Best Value!' }
]

const detectOS = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  if (userAgent.indexOf("mac") != -1) activeOS.value = 'mac'
  else if (userAgent.indexOf("linux") != -1) activeOS.value = 'linux'
  else activeOS.value = 'windows'
}

const scrollToDownload = () => {
  const el = document.getElementById('download')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToFeatures = () => {
  const el = document.getElementById('features')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
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
    authMode.value = 'login'
    showAuthModal.value = true
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

onMounted(() => {
  detectOS()
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

    <main class="flex-1">
      <section class="relative pt-32 pb-20 px-6 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-godot-blue/5 rounded-full blur-[120px]"></div>
        </div>
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-godot-surface border border-godot-border text-xs font-medium text-godot-blue mb-8 animate-fade-in-up">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-godot-blue opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-godot-blue"></span>
            </span>
            Compatible with Godot 4.5
          </div>

          <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 animate-fade-in-up" style="animation-delay: 0.1s;">
            Your Intelligent <br class="hidden md:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-godot-blue to-cyan-400">Godot Companion</span>
          </h1>

          <p class="text-lg md:text-xl text-godot-muted mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style="animation-delay: 0.2s;">
            Generate plans, debug scripts, and track your project history without leaving your workflow. The AI copilot designed specifically for GDScript.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style="animation-delay: 0.3s;">
            <button @click="scrollToDownload" class="w-full sm:w-auto px-8 py-3.5 bg-godot-blue hover:bg-godot-blue-hover text-white font-semibold rounded-xl transition-all shadow-lg shadow-godot-blue/20 flex items-center justify-center gap-2">
              <i class="ph ph-download-simple text-xl"></i>
              Download Beta
            </button>
            <button @click="scrollToFeatures" class="w-full sm:w-auto px-8 py-3.5 bg-godot-surface border border-godot-border hover:border-godot-blue/50 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2">
              <i class="ph ph-info text-xl"></i>
              Learn More
            </button>
          </div>

          <div class="flex items-center justify-center gap-8 mt-12 text-sm text-godot-muted animate-fade-in-up" style="animation-delay: 0.4s;">
            <div class="flex items-center gap-2">
              <i class="ph ph-check text-godot-green"></i>
              <span>Context Aware</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="ph ph-check text-godot-green"></i>
              <span>Privacy Focused</span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="py-24 bg-godot-surface/30 border-y border-godot-border">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-white mb-4">Built for Godot Developers</h2>
            <p class="text-godot-muted">Everything you need to accelerate your game development cycle.</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="p-6 rounded-2xl bg-godot-dark border border-godot-border hover:border-godot-blue/50 hover:bg-godot-surface/30 transition-all duration-300 group">
              <div class="w-12 h-12 rounded-lg bg-godot-surface flex items-center justify-center text-godot-blue mb-4 group-hover:scale-110 transition-transform">
                <i class="ph ph-brain text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Smart Planning</h3>
              <p class="text-godot-muted text-sm leading-relaxed">
                Godoty generates detailed execution plans, analyzing your project structure before suggesting changes.
              </p>
            </div>

            <div class="p-6 rounded-2xl bg-godot-dark border border-godot-border hover:border-godot-blue/50 hover:bg-godot-surface/30 transition-all duration-300 group">
              <div class="w-12 h-12 rounded-lg bg-godot-surface flex items-center justify-center text-godot-blue mb-4 group-hover:scale-110 transition-transform">
                <i class="ph ph-code text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Context Aware</h3>
              <p class="text-godot-muted text-sm leading-relaxed">
                It reads your .gd files and scene structures to provide relevant, bug-free code snippets.
              </p>
            </div>

            <div class="p-6 rounded-2xl bg-godot-dark border border-godot-border hover:border-godot-blue/50 hover:bg-godot-surface/30 transition-all duration-300 group">
              <div class="w-12 h-12 rounded-lg bg-godot-surface flex items-center justify-center text-godot-blue mb-4 group-hover:scale-110 transition-transform">
                <i class="ph ph-bug text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Auto-Debugging</h3>
              <p class="text-godot-muted text-sm leading-relaxed">
                Encountered an error? Godoty analyzes the stack trace and suggests fixes instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" class="py-24">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-white mb-4">Credit Packages</h2>
            <p class="text-godot-muted">Purchase credits to power your AI-assisted development.</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div 
              v-for="pkg in creditPackages" 
              :key="pkg.id"
              class="relative p-8 rounded-2xl bg-godot-surface/50 border transition-all flex flex-col"
              :class="pkg.popular ? 'border-godot-blue shadow-2xl shadow-godot-blue/10 scale-105 z-10' : 'border-godot-border hover:border-godot-blue/30'"
            >
              <div v-if="pkg.badge" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-godot-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {{ pkg.badge }}
              </div>
              
              <div class="text-center mb-6">
                <div class="font-medium mb-2" :class="pkg.popular ? 'text-godot-blue' : 'text-godot-muted'">{{ pkg.name }}</div>
                <div class="text-4xl font-bold text-white mb-1">${{ pkg.price }}</div>
                <div class="text-sm text-godot-muted">{{ pkg.credits }} Credits</div>
              </div>

              <ul class="space-y-3 mb-8 flex-1">
                <li v-for="feature in pkg.features" :key="feature" class="flex items-center gap-3 text-sm text-godot-muted">
                  <i class="ph ph-check text-godot-green"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <button 
                @click="handlePurchase(pkg.priceId)"
                :disabled="purchaseLoading !== null"
                class="w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                :class="pkg.popular ? 'bg-godot-blue hover:bg-godot-blue-hover text-white shadow-lg shadow-godot-blue/20' : 'bg-godot-dark border border-godot-border hover:bg-godot-blue hover:border-transparent text-white'"
              >
                <i v-if="purchaseLoading === pkg.priceId" class="ph ph-spinner animate-spin"></i>
                {{ purchaseLoading === pkg.priceId ? 'Processing...' : (user ? 'Purchase' : 'Sign in') }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="download" class="py-24 bg-godot-surface/30 border-t border-godot-border">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold text-white mb-6">Start Building Faster</h2>
          <p class="text-godot-muted mb-12">Available for Windows, macOS, and Linux. Free for open source projects.</p>

          <div class="grid md:grid-cols-3 gap-6">
            <button disabled class="group p-6 rounded-xl border border-godot-border bg-godot-dark opacity-50 cursor-not-allowed flex flex-col items-center gap-4">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h11.377v11.372H0zM12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zM12.623 12.623H24V24H12.623z"/></svg>
              <div>
                <div class="font-bold text-white">Windows</div>
                <div class="text-xs text-godot-muted mt-1">Coming Soon</div>
              </div>
            </button>

            <a 
              href="/builds/Godoty-Mac.zip" 
              download 
              @click="handleDownload"
              class="group p-6 rounded-xl border border-godot-border bg-godot-dark hover:border-godot-blue transition-all flex flex-col items-center gap-4 cursor-pointer relative overflow-hidden"
              :class="{'ring-2 ring-godot-blue border-transparent': activeOS === 'mac'}"
            >
              <div class="absolute inset-0 bg-godot-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <svg class="w-10 h-10 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
              <div class="relative z-10">
                <div class="font-bold text-white">macOS</div>
                <div class="text-xs text-godot-muted mt-1">Universal (Intel/M1)</div>
              </div>
              <div class="w-full py-2 rounded bg-godot-surface text-sm font-medium text-godot-blue group-hover:bg-godot-blue group-hover:text-white transition-colors flex items-center justify-center gap-2 relative z-10">
                <i v-if="downloadLoading" class="ph ph-spinner animate-spin"></i>
                {{ downloadLoading ? 'Starting...' : 'Download' }}
              </div>
            </a>

            <button disabled class="group p-6 rounded-xl border border-godot-border bg-godot-dark opacity-50 cursor-not-allowed flex flex-col items-center gap-4">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.24c.086.048.175.1.261.166.089.066.175.132.252.202.079.066.152.139.223.219l.004.004c.15.174.264.384.329.601a.908.908 0 01.034.267v.02c-.006.27-.059.489-.158.653-.1.163-.25.281-.45.353-.2.072-.44.111-.715.116-.279.005-.595-.038-.946-.13-.352-.091-.735-.224-1.15-.399z"/></svg>
              <div>
                <div class="font-bold text-white">Linux</div>
                <div class="text-xs text-godot-muted mt-1">Coming Soon</div>
              </div>
            </button>
          </div>

          <p class="mt-8 text-xs text-godot-muted">
            v0.1.0 Beta • 
            <router-link to="/terms" class="hover:text-godot-blue transition-colors">Terms</router-link> • 
            <router-link to="/privacy" class="hover:text-godot-blue transition-colors">Privacy</router-link>
          </p>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
