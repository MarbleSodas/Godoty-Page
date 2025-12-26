<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const { user, credits, fetchCredits, generateLitellmKey } = useAuth()
const loading = ref(true)
const sessionId = ref(null)

onMounted(async () => {
    // Get session_id from query params
    sessionId.value = route.query.session_id
    
    // Refresh credits from database
    await fetchCredits()
    
    // Also refresh LiteLLM key info to get updated budget
    try {
        await generateLitellmKey()
    } catch (err) {
        console.warn('Failed to refresh LiteLLM key:', err)
    }
    
    loading.value = false
})

const goHome = () => {
    router.push('/')
}
</script>

<template>
<div class="min-h-screen flex items-center justify-center bg-godot-dark">
    <div class="max-w-md w-full mx-4">
        <div class="bg-godot-darker border border-godot-border rounded-2xl p-8 text-center space-y-6">
            <!-- Success Icon -->
            <div class="flex justify-center">
                <div class="w-20 h-20 rounded-full bg-godot-green/20 flex items-center justify-center">
                    <i class="ph ph-check-circle text-5xl text-godot-green"></i>
                </div>
            </div>
            
            <!-- Success Message -->
            <div>
                <h1 class="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
                <p class="text-godot-muted">Thank you for your purchase. Your credits have been added to your account.</p>
            </div>
            
            <!-- Credit Balance -->
            <div v-if="user" class="bg-godot-surface rounded-xl p-4 border border-godot-border">
                <div class="text-sm text-godot-muted mb-1">Your Credit Balance</div>
                <div class="text-3xl font-bold text-godot-blue">
                    <span v-if="loading" class="animate-pulse">...</span>
                    <span v-else>{{ credits.toFixed(2) }}</span>
                </div>
            </div>
            
            <!-- Actions -->
            <div class="space-y-3 pt-4">
                <button 
                    @click="goHome"
                    class="w-full py-3 bg-godot-blue hover:bg-godot-blueDim text-white font-semibold rounded-xl transition-colors"
                >
                    Continue to Godoty
                </button>
                <a 
                    href="#download"
                    @click="goHome"
                    class="block w-full py-3 bg-godot-surface border border-godot-border hover:border-godot-blue text-white rounded-xl transition-colors"
                >
                    Download the App
                </a>
            </div>
            
            <!-- Receipt Note -->
            <p class="text-xs text-godot-muted">
                A receipt has been sent to your email address.
            </p>
        </div>
    </div>
</div>
</template>
