<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../lib/supabase'

const status = ref('Completing authentication...')
const error = ref(null)
const deepLinkUrl = ref(null)
const showManualButton = ref(false)

onMounted(async () => {
    try {
        // Check for tokens in hash fragment (email confirmation, magic link)
        // Supabase email links redirect with tokens in the hash: #access_token=...&refresh_token=...
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const hashAccessToken = hashParams.get('access_token')
        const hashRefreshToken = hashParams.get('refresh_token')
        const hashType = hashParams.get('type') // 'signup', 'recovery', 'magiclink', etc.
        
        // Check for code in query params (OAuth flow)
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const errorParam = urlParams.get('error')
        const errorDescription = urlParams.get('error_description')

        if (errorParam || errorDescription) {
            error.value = errorDescription || errorParam || 'Authentication failed'
            status.value = 'Authentication failed'
            return
        }

        // Handle email confirmation / magic link (tokens in hash fragment)
        if (hashAccessToken && hashRefreshToken) {
            console.log('Email confirmation detected, type:', hashType)
            
            // Verify the session with Supabase first
            status.value = 'Verifying email confirmation...'
            const { data, error: sessionError } = await supabase.auth.setSession({
                access_token: hashAccessToken,
                refresh_token: hashRefreshToken,
            })
            
            if (sessionError) {
                console.log('Session verification failed:', sessionError.message)
                // Even if web verification fails, pass tokens to desktop app
            }
            
            // Pass the tokens to the desktop app
            deepLinkUrl.value = `godoty://auth/callback?access_token=${encodeURIComponent(hashAccessToken)}&refresh_token=${encodeURIComponent(hashRefreshToken)}`
            
            status.value = 'Opening Godoty...'
            attemptDeepLink()
            return
        }
        
        // Handle OAuth code flow
        if (!code) {
            error.value = 'No authorization code or tokens received'
            status.value = 'Authentication failed'
            return
        }

        // Exchange the code for a session on the web side
        // This works because the web page has the code_verifier stored from the OAuth flow
        status.value = 'Exchanging code for session...'
        
        const { data, error: authError } = await supabase.auth.exchangeCodeForSession(code)
        
        if (authError) {
            // If code exchange fails (e.g., PKCE verifier missing), pass the code to the desktop app
            // and let it try (in case the desktop app has the verifier)
            console.log('Web code exchange failed, passing code to desktop app:', authError.message)
            deepLinkUrl.value = `godoty://auth/callback?code=${encodeURIComponent(code)}`
        } else if (data.session) {
            // Successfully got session - pass the tokens to the desktop app
            // The desktop app will use setSession() with these tokens
            const { access_token, refresh_token } = data.session
            deepLinkUrl.value = `godoty://auth/callback?access_token=${encodeURIComponent(access_token)}&refresh_token=${encodeURIComponent(refresh_token)}`
        } else {
            error.value = 'Failed to get session'
            status.value = 'Authentication failed'
            return
        }

        // Try to open the deep link
        status.value = 'Opening Godoty...'
        attemptDeepLink()
    } catch (err) {
        error.value = err.message
        status.value = 'An unexpected error occurred'
    }
})

function attemptDeepLink() {
    if (!deepLinkUrl.value) return

    // Method 1: Try using an iframe (works well on macOS Safari)
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = deepLinkUrl.value
    document.body.appendChild(iframe)

    // Method 2: Also try window.location as backup
    setTimeout(() => {
        window.location.href = deepLinkUrl.value
    }, 100)

    // Show manual button after a delay if we're still on this page
    setTimeout(() => {
        showManualButton.value = true
        status.value = 'Click the button below to open Godoty'
    }, 1500)
}

function openDesktopApp() {
    if (deepLinkUrl.value) {
        // Create an anchor click for better cross-browser support
        const link = document.createElement('a')
        link.href = deepLinkUrl.value
        link.click()
    }
}
</script>

<template>
<div class="min-h-screen flex items-center justify-center bg-godoty-bg">
    <div class="text-center space-y-6 p-8 max-w-md">
        <!-- Loading/Success Icon -->
        <div v-if="!error" class="flex justify-center">
            <div class="w-16 h-16 rounded-full bg-godoty-blue/20 flex items-center justify-center">
                <svg v-if="!showManualButton" class="animate-spin h-8 w-8 text-godoty-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="h-8 w-8 text-godoty-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
        </div>
        
        <!-- Error Icon -->
        <div v-else class="flex justify-center">
            <div class="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg class="h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
        
        <!-- Status Message -->
        <h2 class="text-xl font-semibold text-white">{{ status }}</h2>
        
        <!-- Error Message -->
        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
        
        <!-- Manual Open Button -->
        <button 
            v-if="!error && showManualButton"
            @click="openDesktopApp"
            class="inline-block px-6 py-3 bg-godoty-blue hover:bg-godoty-blue/80 text-white rounded-lg transition-colors font-medium"
        >
            Open Godoty
        </button>
        
        <!-- Deep Link for manual click -->
        <a 
            v-if="!error && showManualButton && deepLinkUrl"
            :href="deepLinkUrl"
            class="block text-godoty-text-secondary text-sm hover:text-godoty-blue transition-colors"
        >
            Or click here to open the app
        </a>
        
        <!-- Help Text -->
        <p v-if="!error" class="text-godoty-text-secondary text-sm">
            Make sure Godoty is installed and running on your computer.
        </p>
        
        <!-- Back to Home Link -->
        <router-link 
            to="/" 
            class="inline-block mt-4 px-6 py-2 bg-godoty-surface border border-godoty-border hover:border-godoty-blue text-white rounded-lg transition-colors"
        >
            Back to Home
        </router-link>
    </div>
</div>
</template>
