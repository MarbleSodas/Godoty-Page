<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logoSvg from '../../assets/logo.svg'

const emit = defineEmits(['toggle-mobile-menu'])

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
