<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  initialMode: {
    type: String,
    default: 'login',
    validator: (value) => ['login', 'signup', 'magic'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'oauth-login', 'email-auth'])

const mode = ref(props.initialMode)
const email = ref('')
const password = ref('')
const termsAccepted = ref(false)

// Reset state when modal opens or mode changes
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    mode.value = props.initialMode
    email.value = ''
    password.value = ''
    termsAccepted.value = false
  }
})

watch(() => props.initialMode, (newMode) => {
  mode.value = newMode
})

const closeModal = () => {
  emit('update:modelValue', false)
}

const handleSubmit = () => {
  emit('email-auth', {
    email: email.value,
    password: password.value,
    mode: mode.value,
    termsAccepted: termsAccepted.value
  })
}

const handleOAuth = (provider) => {
  emit('oauth-login', provider)
}
</script>

<template>
  <Teleport to="body">
    <div 
      v-if="modelValue" 
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/70 backdrop-blur-sm"
        @click="closeModal"
      ></div>
      
      <!-- Modal -->
      <div class="relative w-full max-w-md bg-godot-darker border border-godot-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-godot-border flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">
            {{ mode === 'signup' ? 'Create Account' : mode === 'magic' ? 'Magic Link' : 'Welcome Back' }}
          </h2>
          <button @click="closeModal" class="text-godot-muted hover:text-white transition-colors">
            <i class="ph ph-x text-xl"></i>
          </button>
        </div>
        
        <!-- Body -->
        <div class="p-6 space-y-6">
          <!-- OAuth Buttons -->
          <div class="space-y-3">
            <button 
              @click="handleOAuth('google')"
              :disabled="loading"
              class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            
            <button 
              @click="handleOAuth('github')"
              :disabled="loading"
              class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <i class="ph ph-github-logo text-xl"></i>
              Continue with GitHub
            </button>
          </div>
          
          <!-- Divider -->
          <div class="flex items-center gap-4">
            <div class="flex-1 h-px bg-godot-border"></div>
            <span class="text-godot-muted text-sm">or</span>
            <div class="flex-1 h-px bg-godot-border"></div>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm text-godot-muted mb-2">Email</label>
              <input 
                v-model="email"
                type="email"
                placeholder="you@example.com"
                class="input"
              />
            </div>
            
            <div v-if="mode !== 'magic'">
              <label class="block text-sm text-godot-muted mb-2">Password</label>
              <input 
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="input"
              />
            </div>
            
            <!-- Terms Checkbox (Signup Only) -->
            <div v-if="mode === 'signup'" class="flex items-start gap-3">
              <input 
                id="terms-checkbox"
                v-model="termsAccepted"
                type="checkbox"
                class="mt-1 w-4 h-4 rounded border-godot-border bg-godot-surface text-godot-blue focus:ring-godot-blue focus:ring-offset-0 cursor-pointer"
              />
              <label for="terms-checkbox" class="text-sm text-godot-muted cursor-pointer">
                I agree to the 
                <router-link to="/terms" class="text-godot-blue hover:underline">Terms of Service</router-link>
                and 
                <router-link to="/privacy" class="text-godot-blue hover:underline">Privacy Policy</router-link>
              </label>
            </div>
            
            <!-- Error Message -->
            <p v-if="error" class="text-godot-red text-sm">{{ error }}</p>
            
            <button 
              type="submit"
              :disabled="loading || (mode === 'signup' && !termsAccepted)"
              class="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <i v-if="loading" class="ph ph-spinner animate-spin text-xl"></i>
              {{ mode === 'signup' ? 'Create Account' : mode === 'magic' ? 'Send Magic Link' : 'Sign In' }}
            </button>
          </form>
          
          <!-- Mode Switcher -->
          <div class="text-center text-sm text-godot-muted">
            <template v-if="mode === 'login'">
              Don't have an account? 
              <button @click="mode = 'signup'" class="text-godot-blue hover:underline">Sign up</button>
              <span class="mx-2">•</span>
              <button @click="mode = 'magic'" class="text-godot-blue hover:underline">Use Magic Link</button>
            </template>
            <template v-else-if="mode === 'signup'">
              Already have an account? 
              <button @click="mode = 'login'" class="text-godot-blue hover:underline">Sign in</button>
            </template>
            <template v-else>
              <button @click="mode = 'login'" class="text-godot-blue hover:underline">Back to Sign In</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
