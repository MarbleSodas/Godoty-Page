<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/')
}

const goToPricing = () => {
    router.push('/#pricing')
}
</script>

<template>
<div class="min-h-screen flex items-center justify-center bg-godoty-bg">
    <div class="max-w-md w-full mx-4">
        <div class="bg-godoty-panel border border-godoty-border rounded-2xl p-8 text-center space-y-6">
            <!-- Cancel Icon -->
            <div class="flex justify-center">
                <div class="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <i class="ph ph-warning-circle text-5xl text-yellow-500"></i>
                </div>
            </div>
            
            <!-- Cancel Message -->
            <div>
                <h1 class="text-2xl font-bold text-white mb-2">Payment Cancelled</h1>
                <p class="text-godoty-muted">Your payment was cancelled. No charges were made to your account.</p>
            </div>
            
            <!-- Info Box -->
            <div class="bg-godoty-surface rounded-xl p-4 border border-godoty-border text-left">
                <div class="flex items-start gap-3">
                    <i class="ph ph-info text-godoty-blue text-xl shrink-0 mt-0.5"></i>
                    <div class="text-sm text-godoty-muted">
                        <p class="mb-2">If you experienced any issues during checkout, please try again or contact our support team.</p>
                        <p>Your cart and selections are still available.</p>
                    </div>
                </div>
            </div>
            
            <!-- Actions -->
            <div class="space-y-3 pt-4">
                <button 
                    @click="goToPricing"
                    class="w-full py-3 bg-godoty-blue hover:bg-godoty-blueDim text-white font-semibold rounded-xl transition-colors"
                >
                    Try Again
                </button>
                <button 
                    @click="goHome"
                    class="w-full py-3 bg-godoty-surface border border-godoty-border hover:border-godoty-blue text-white rounded-xl transition-colors"
                >
                    Return Home
                </button>
            </div>
            
            <!-- Support Link -->
            <p class="text-xs text-godoty-muted">
                Need help? <a href="#" class="text-godoty-blue hover:underline">Contact Support</a>
            </p>
        </div>
    </div>
</div>
</template>
