<script setup>
import { RouterLink } from 'vue-router'
import logoSvg from '../assets/logo.svg'

const lastUpdated = 'February 12, 2026'
</script>

<template>
<div class="min-h-screen bg-godot-dark text-godot-text">
    <!-- Header -->
    <header class="border-b border-godot-border bg-godot-darker/50 backdrop-blur-xl">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <router-link to="/" class="flex items-center gap-3">
                <img :src="logoSvg" alt="Godoty Logo" class="w-8 h-8" />
                <span class="font-bold text-xl tracking-tight text-white">Godoty</span>
            </router-link>
        </div>
    </header>
    
    <!-- Content -->
    <main class="max-w-4xl mx-auto px-6 py-16">
        <div class="mb-12">
            <h1 class="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p class="text-godot-muted">Last updated: {{ lastUpdated }}</p>
        </div>
        
        <div class="prose prose-invert max-w-none space-y-8">
            <!-- Introduction -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p class="text-godot-muted leading-relaxed">
                    This Privacy Policy describes how Godoty ("we," "our," or "us") collects, uses, and protects 
                    your personal information when you use the Godoty desktop application, website at godoty.app, 
                    and related services (the "Service").
                </p>
                <p class="text-godot-muted leading-relaxed mt-4">
                    By using Godoty, you consent to the data practices described in this policy. If you do not 
                    agree with our practices, please do not use the Service.
                </p>
            </section>
            
            <!-- Information We Collect -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                
                <h3 class="text-xl font-semibold text-white mt-6 mb-3">2.1 Project Data</h3>
                <p class="text-godot-muted leading-relaxed">
                    To provide AI assistance, the Service may access and process:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godot-muted space-y-2">
                    <li>GDScript files and code content from your Godot projects</li>
                    <li>Scene tree structures and node hierarchies</li>
                    <li>Screenshots of your Godot editor (when using perception features)</li>
                    <li>Project file paths and directory structures</li>
                </ul>
                <p class="text-godot-muted leading-relaxed mt-4">
                    <strong class="text-white">Important:</strong> This data is processed locally on your machine 
                    and only sent to AI providers when you actively request assistance. We do not store your 
                    project files on our servers.
                </p>
                
                <h3 class="text-xl font-semibold text-white mt-6 mb-3">2.2 Usage Data</h3>
                <p class="text-godot-muted leading-relaxed">
                    We may automatically collect:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godot-muted space-y-2">
                    <li>Feature usage patterns</li>
                    <li>Error logs and crash reports</li>
                    <li>Device information (operating system, app version)</li>
                </ul>
            </section>
            
            <!-- How We Use Your Information -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                <p class="text-godot-muted leading-relaxed">
                    We use the information we collect to:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godot-muted space-y-2">
                    <li>Provide, maintain, and improve the Service</li>
                    <li>Send AI prompts to language model providers on your behalf</li>
                    <li>Detect and prevent fraud or abuse</li>
                    <li>Comply with legal obligations</li>
                </ul>
            </section>
            
            <!-- Third-Party Services -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
                <p class="text-godot-muted leading-relaxed">
                    We share data with the following third-party service providers:
                </p>
                
                <div class="mt-6 space-y-6">
                    <div class="p-4 bg-godot-surface rounded-lg border border-godot-border">
                        <h4 class="font-semibold text-white mb-2">AI Providers (OpenAI, Anthropic, etc.)</h4>
                        <p class="text-godot-muted text-sm">Large language model inference for AI features. Your prompts and project context may be sent to these providers.</p>
                        <div class="mt-2 space-x-4">
                            <a href="https://openai.com/privacy/" target="_blank" class="text-godot-blue text-sm hover:underline">OpenAI Privacy →</a>
                            <a href="https://www.anthropic.com/privacy" target="_blank" class="text-godot-blue text-sm hover:underline">Anthropic Privacy →</a>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Data Security -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                <p class="text-godot-muted leading-relaxed">
                    We implement industry-standard security measures including:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godot-muted space-y-2">
                    <li>Encryption of data in transit (TLS/HTTPS)</li>
                </ul>
                <p class="text-godot-muted leading-relaxed mt-4">
                    While we strive to protect your data, no method of transmission or storage is 100% secure. 
                    You acknowledge and accept this inherent risk.
                </p>
            </section>
            
            <!-- Children's Privacy -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">6. Children's Privacy</h2>
                <p class="text-godot-muted leading-relaxed">
                    The Service is not intended for children under 13 years of age. We do not knowingly collect 
                    personal information from children under 13.
                </p>
            </section>
            
            <!-- Contact Us -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
                <p class="text-godot-muted leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p class="text-godot-blue mt-4">support@goodfaithgames.com</p>
            </section>
        </div>
        
        <!-- Back Link -->
        <div class="mt-16 pt-8 border-t border-godot-border">
            <router-link to="/" class="text-godot-muted hover:text-godot-blue transition-colors inline-flex items-center gap-2">
                <i class="ph ph-arrow-left"></i>
                Back to Home
            </router-link>
        </div>
    </main>
</div>
</template>
