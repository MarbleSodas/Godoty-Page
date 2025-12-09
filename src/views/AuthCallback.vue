<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const status = ref('Processing authentication...')
const error = ref(null)

onMounted(async () => {
    try {
        // Handle the OAuth callback
        const { data, error: authError } = await supabase.auth.getSession()
        
        if (authError) {
            error.value = authError.message
            status.value = 'Authentication failed'
            return
        }

        if (data.session) {
            status.value = 'Authentication successful! Redirecting...'
            // Small delay to show success message
            setTimeout(() => {
                router.push('/')
            }, 1000)
        } else {
            // No session yet, might be processing
            status.value = 'Verifying authentication...'
            
            // Listen for auth state change
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    status.value = 'Authentication successful! Redirecting...'
                    subscription.unsubscribe()
                    setTimeout(() => {
                        router.push('/')
                    }, 1000)
                }
            })
            
            // Timeout fallback
            setTimeout(() => {
                if (!error.value) {
                    router.push('/')
                }
            }, 5000)
        }
    } catch (err) {
        error.value = err.message
        status.value = 'An unexpected error occurred'
    }
})
</script>

<template>
<div class="min-h-screen flex items-center justify-center bg-godoty-bg">
    <div class="text-center space-y-6 p-8">
        <!-- Loading Spinner -->
        <div v-if="!error" class="flex justify-center">
            <svg class="animate-spin h-12 w-12 text-godoty-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
        
        <!-- Error Icon -->
        <div v-else class="flex justify-center">
            <div class="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <i class="ph ph-x-circle text-4xl text-red-500"></i>
            </div>
        </div>
        
        <!-- Status Message -->
        <h2 class="text-xl font-semibold text-white">{{ status }}</h2>
        
        <!-- Error Message -->
        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
        
        <!-- Back to Home Link -->
        <router-link 
            v-if="error" 
            to="/" 
            class="inline-block mt-4 px-6 py-2 bg-godoty-surface border border-godoty-border hover:border-godoty-blue text-white rounded-lg transition-colors"
        >
            Back to Home
        </router-link>
    </div>
</div>
</template>
