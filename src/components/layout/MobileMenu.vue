<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  user: {
    type: Object,
    default: null
  },
  credits: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['close', 'open-auth', 'sign-out'])

const closeMenu = () => {
  emit('close')
}

const handleSignOut = () => {
  emit('sign-out')
  closeMenu()
}

const openAuth = (mode) => {
  emit('open-auth', mode)
  closeMenu()
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div 
        v-if="isOpen"
        class="fixed inset-0 bg-godot-dark z-[60] flex flex-col pt-24 px-6 md:hidden overflow-y-auto"
      >
        <!-- Close Button -->
        <button 
          class="absolute top-4 right-6 p-2 text-white hover:text-godot-blue transition-colors"
          @click="closeMenu"
        >
          <i class="ph ph-x text-2xl"></i>
        </button>

        <div class="flex flex-col gap-6 text-lg font-medium text-godot-muted">
          <a 
            href="#features" 
            @click="closeMenu"
            class="py-2 border-b border-godot-border hover:text-white transition-colors"
          >
            Features
          </a>
          <a 
            href="#pricing" 
            @click="closeMenu"
            class="py-2 border-b border-godot-border hover:text-white transition-colors"
          >
            Pricing
          </a>
          
          <div class="mt-4 flex flex-col gap-4">
            <!-- Logged Out -->
            <template v-if="!user">
              <button 
                @click="openAuth('login')"
                class="w-full py-3 bg-godot-blue text-white rounded-xl font-semibold shadow-lg shadow-godot-blue/20 hover:bg-godot-blue-hover transition-colors"
              >
                Sign In
              </button>
              <button 
                @click="openAuth('signup')"
                class="w-full py-3 bg-godot-surface border border-godot-border text-white rounded-xl font-semibold hover:border-godot-blue transition-colors"
              >
                Create Account
              </button>
            </template>
            
            <!-- Logged In -->
            <template v-else>
              <div class="flex items-center gap-3 py-4 border-b border-godot-border">
                <div class="w-10 h-10 rounded-full bg-godot-blue flex items-center justify-center text-white font-bold">
                  {{ user.email?.charAt(0).toUpperCase() }}
                </div>
                <div class="overflow-hidden">
                  <p class="text-white font-medium truncate">{{ user.email }}</p>
                  <p class="text-godot-muted text-sm flex items-center gap-1">
                    <i class="ph ph-coins text-godot-blue"></i>
                    {{ credits.toFixed(2) }} credits
                  </p>
                </div>
              </div>

              <a 
                href="#pricing"
                @click="closeMenu"
                class="w-full py-3 text-left hover:text-white transition-colors flex items-center gap-2"
              >
                <i class="ph ph-plus-circle"></i>
                Buy Credits
              </a>
              
              <button 
                @click="handleSignOut"
                class="w-full py-3 text-left text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
              >
                <i class="ph ph-sign-out"></i>
                Sign Out
              </button>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
