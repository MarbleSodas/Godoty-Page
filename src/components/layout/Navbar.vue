<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logoSvg from '../../assets/logo.svg'

const props = defineProps({
  user: {
    type: Object,
    default: null
  },
  credits: {
    type: Number,
    default: 0
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['open-auth', 'sign-out', 'toggle-mobile-menu'])

const scrolled = ref(false)
const showUserMenu = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const toggleUserMenu = (event) => {
  event.stopPropagation()
  showUserMenu.value = !showUserMenu.value
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const handleSignOut = () => {
  closeUserMenu()
  emit('sign-out')
}

const handleClickOutside = (event) => {
  if (showUserMenu.value && !event.target.closest('.user-menu-container')) {
    closeUserMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav 
    class="fixed w-full top-0 z-50 transition-all duration-300 border-b border-transparent"
    :class="{'glass-panel border-godot-border': scrolled}"
  >
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3 relative z-50">
        <img :src="logoSvg" alt="Godoty Logo" class="w-8 h-8" />
        <span class="font-bold text-xl tracking-tight text-white">Godoty</span>
      </router-link>
      
      <div class="hidden md:flex items-center gap-4 text-sm font-medium text-godot-muted">
        <a href="#features" class="px-4 py-2 hover:text-godot-blue hover:bg-godot-surface/50 rounded-lg transition-all">Features</a>
        <a href="#pricing" class="px-4 py-2 hover:text-godot-blue hover:bg-godot-surface/50 rounded-lg transition-all">Pricing</a>
        
        <template v-if="!loading">
          <template v-if="!user">
            <button 
              @click="emit('open-auth')"
              class="px-5 py-2 bg-godot-blue hover:bg-godot-blue-hover text-white rounded-lg transition-all shadow-lg shadow-godot-blue/20"
            >
              Sign In
            </button>
          </template>
          
          <template v-else>
            <div class="relative user-menu-container">
              <button 
                @click="toggleUserMenu"
                class="flex items-center gap-3 h-10 pl-3 pr-2 bg-godot-surface rounded-xl border border-godot-border hover:border-godot-blue transition-colors"
              >
                <div class="flex items-center gap-1.5 pr-3 border-r border-godot-border/50">
                  <i class="ph ph-coins text-godot-blue text-sm"></i>
                  <span class="text-godot-blue font-mono font-medium text-sm">{{ credits.toFixed(2) }}</span>
                </div>
                
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-gradient-to-br from-godot-blue to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                    {{ user.email?.charAt(0).toUpperCase() }}
                  </div>
                  <i class="ph ph-caret-down text-godot-muted text-xs transition-transform" :class="{'rotate-180': showUserMenu}"></i>
                </div>
              </button>
              
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0 -translate-y-1"
                enter-to-class="transform scale-100 opacity-100 translate-y-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div 
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-72 bg-godot-darker border border-godot-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
                >
                  <div class="px-4 py-3 bg-godot-surface/50">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-godot-blue to-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {{ user.email?.charAt(0).toUpperCase() }}
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-white font-medium truncate text-sm">{{ user.email }}</p>
                        <p class="text-godot-blue text-xs font-mono flex items-center gap-1">
                          <i class="ph ph-coins"></i>
                          {{ credits.toFixed(2) }} credits
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-2">
                    <a 
                      href="#pricing"
                      @click="closeUserMenu"
                      class="flex items-center gap-3 px-3 py-2.5 text-sm text-godot-muted hover:text-white hover:bg-godot-surface rounded-lg transition-colors"
                    >
                      <i class="ph ph-plus-circle text-lg"></i>
                      Buy More Credits
                    </a>
                    <hr class="my-2 border-godot-border/50" />
                    <button 
                      @click="handleSignOut"
                      class="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <i class="ph ph-sign-out text-lg"></i>
                      Sign Out
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </template>
        </template>
        
        <template v-else>
          <div class="flex items-center gap-2">
            <div class="w-20 h-8 bg-godot-surface rounded-lg animate-pulse"></div>
            <div class="w-8 h-8 bg-godot-surface rounded-full animate-pulse"></div>
          </div>
        </template>
      </div>
      
      <button 
        class="md:hidden text-white relative z-50 p-2"
        @click="emit('toggle-mobile-menu', true)"
      >
        <i class="ph ph-list text-2xl"></i>
      </button>
    </div>
  </nav>
</template>
