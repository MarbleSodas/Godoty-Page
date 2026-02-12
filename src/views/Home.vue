<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'

const mobileMenuOpen = ref(false)
const downloadLoading = ref(false)
const activeOS = ref('windows')

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
      @toggle-mobile-menu="mobileMenuOpen = $event"
    />

    <MobileMenu
      :is-open="mobileMenuOpen"
      @close="mobileMenuOpen = false"
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
            Compatible with Godot 4.6
          </div>

          <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 animate-fade-in-up" style="animation-delay: 0.1s;">
            Your Intelligent <br class="hidden md:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-godot-blue to-cyan-400">Godot Companion</span>
          </h1>

          <p class="text-lg md:text-xl text-godot-muted mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style="animation-delay: 0.2s;">
            The AI-integrated desktop application that bridges the gap between AI assistants and the Godot Engine. Automation, debugging, and documentation at your fingertips.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style="animation-delay: 0.3s;">
            <a href="https://goodfaithgames.itch.io/godoty" target="_blank" class="w-full sm:w-auto px-8 py-3.5 bg-godot-blue hover:bg-godot-blue-hover text-white font-semibold rounded-xl transition-all shadow-lg shadow-godot-blue/20 flex items-center justify-center gap-2">
              <i class="ph ph-download-simple text-xl"></i>
              Download on Itch.io
            </a>
            <button @click="scrollToFeatures" class="w-full sm:w-auto px-8 py-3.5 bg-godot-surface border border-godot-border hover:border-godot-blue/50 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2">
              <i class="ph ph-info text-xl"></i>
              Learn More
            </button>
          </div>

          <div class="flex items-center justify-center gap-8 mt-12 text-sm text-godot-muted animate-fade-in-up" style="animation-delay: 0.4s;">
            <div class="flex items-center gap-2">
              <i class="ph ph-check text-godot-green"></i>
              <span>MCP Integrated</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="ph ph-check text-godot-green"></i>
              <span>Headless Operations</span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="py-24 bg-godot-surface/30 border-y border-godot-border">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-white mb-4">Godot AI Automation</h2>
            <p class="text-godot-muted">Seamlessly bridge your AI assistant with the Godot Engine.</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="p-6 rounded-2xl bg-godot-dark border border-godot-border hover:border-godot-blue/50 hover:bg-godot-surface/30 transition-all duration-300 group">
              <div class="w-12 h-12 rounded-lg bg-godot-surface flex items-center justify-center text-godot-blue mb-4 group-hover:scale-110 transition-transform">
                <i class="ph ph-cpu text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">MCP Integration</h3>
              <p class="text-godot-muted text-sm leading-relaxed">
                Connect LLMs directly to Godot via Model Context Protocol. Search documentation and manipulate projects headlessly.
              </p>
            </div>

            <div class="p-6 rounded-2xl bg-godot-dark border border-godot-border hover:border-godot-blue/50 hover:bg-godot-surface/30 transition-all duration-300 group">
              <div class="w-12 h-12 rounded-lg bg-godot-surface flex items-center justify-center text-godot-blue mb-4 group-hover:scale-110 transition-transform">
                <i class="ph ph-monitor text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Real-time Debugging</h3>
              <p class="text-godot-muted text-sm leading-relaxed">
                Capture viewport screenshots and debug output directly from running projects for instant visual AI analysis.
              </p>
            </div>

            <div class="p-6 rounded-2xl bg-godot-dark border border-godot-border hover:border-godot-blue/50 hover:bg-godot-surface/30 transition-all duration-300 group">
              <div class="w-12 h-12 rounded-lg bg-godot-surface flex items-center justify-center text-godot-blue mb-4 group-hover:scale-110 transition-transform">
                <i class="ph ph-books text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Deep Search</h3>
              <p class="text-godot-muted text-sm leading-relaxed">
                High-performance indexed search for the entire Godot 4.x Class Reference, including methods and signals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="download" class="py-24 bg-godot-surface/30 border-t border-godot-border">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold text-white mb-6">Available on Itch.io</h2>
          <p class="text-godot-muted mb-12">Available for Windows, macOS, and Linux.</p>
          
          <div class="flex justify-center">
            <a 
              href="https://goodfaithgames.itch.io/godoty" 
              target="_blank"
              class="group p-12 rounded-2xl border-2 border-godot-border bg-godot-dark hover:border-godot-blue transition-all flex flex-col items-center gap-6 cursor-pointer relative overflow-hidden"
            >
              <div class="absolute inset-0 bg-godot-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <i class="ph ph-storefront text-6xl text-godot-blue relative z-10"></i>
              <div class="relative z-10">
                <div class="text-2xl font-bold text-white">Visit Itch.io Page</div>
                <div class="text-godot-muted mt-2">Get the latest builds and updates</div>
              </div>
            </a>
          </div>

          <p class="mt-12 text-xs text-godot-muted">
            <router-link to="/terms" class="hover:text-godot-blue transition-colors">Terms</router-link> • 
            <router-link to="/privacy" class="hover:text-godot-blue transition-colors">Privacy</router-link>
          </p>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
