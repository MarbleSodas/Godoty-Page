<script setup>
import logoSvg from '../../assets/logo.svg'
</script>

<template>
  <footer class="border-t border-godot-border bg-gradient-to-b from-godot-dark to-godot-darker py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-3">
        <img :src="logoSvg" alt="Godoty Logo" class="w-6 h-6" />
        <span class="text-sm font-semibold text-white">Godoty</span>
      </div>
      
      <!-- Legal Links -->
      <div class="flex items-center gap-6 text-sm text-godot-muted">
        <router-link to="/terms" class="hover:text-godot-blue transition-colors">Terms of Service</router-link>
        <router-link to="/privacy" class="hover:text-godot-blue transition-colors">Privacy Policy</router-link>
      </div>
      
      <div class="text-xs text-godot-muted">
        &copy; 2026 Godoty AI. All rights reserved.
      </div>
    </div>
  </footer>
</template>
