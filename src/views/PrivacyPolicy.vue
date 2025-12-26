<script setup>
import { RouterLink } from 'vue-router'
import logoSvg from '../assets/logo.svg'

const lastUpdated = 'December 17, 2025'
</script>

<template>
<div class="min-h-screen bg-godot-dark">
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
                
                <h3 class="text-xl font-semibold text-white mt-6 mb-3">2.1 Account Information</h3>
                <p class="text-godot-muted leading-relaxed">
                    When you create an account, we collect:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godot-muted space-y-2">
                    <li>Email address</li>
                    <li>Password (stored securely hashed, never in plain text)</li>
                    <li>OAuth profile information (if signing in via Google or GitHub), including name and profile identifier</li>
                </ul>
                
                <h3 class="text-xl font-semibold text-white mt-6 mb-3">2.2 Payment Information</h3>
                <p class="text-godot-muted leading-relaxed">
                    When you purchase credits, our payment processor Stripe collects:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godot-muted space-y-2">
                    <li>Payment method details (credit card, etc.)</li>
                    <li>Billing address</li>
                    <li>Transaction history</li>
                </ul>
                <p class="text-godot-muted leading-relaxed mt-4">
                    We do not store your full payment card details on our servers. Payment processing is handled 
                    entirely by Stripe in accordance with PCI-DSS standards.
                </p>
                
                <h3 class="text-xl font-semibold text-white mt-6 mb-3">2.3 Project Data</h3>
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
                
                <h3 class="text-xl font-semibold text-white mt-6 mb-3">2.4 Usage Data</h3>
                <p class="text-godot-muted leading-relaxed">
                    We automatically collect:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godot-muted space-y-2">
                    <li>AI token usage and credit consumption</li>
                    <li>Chat session metadata (timestamps, message counts)</li>
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
                    <li>Process your credit purchases and track usage</li>
                    <li>Send AI prompts to language model providers on your behalf</li>
                    <li>Authenticate your account and secure your data</li>
                    <li>Send important service-related communications</li>
                    <li>Respond to your support requests</li>
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
                        <h4 class="font-semibold text-white mb-2">Supabase</h4>
                        <p class="text-godot-muted text-sm">Authentication, database hosting, and edge functions</p>
                        <a href="https://supabase.com/privacy" target="_blank" class="text-godot-blue text-sm hover:underline">Privacy Policy →</a>
                    </div>
                    
                    <div class="p-4 bg-godot-surface rounded-lg border border-godot-border">
                        <h4 class="font-semibold text-white mb-2">Stripe</h4>
                        <p class="text-godot-muted text-sm">Payment processing and billing</p>
                        <a href="https://stripe.com/privacy" target="_blank" class="text-godot-blue text-sm hover:underline">Privacy Policy →</a>
                    </div>
                    
                    <div class="p-4 bg-godot-surface rounded-lg border border-godot-border">
                        <h4 class="font-semibold text-white mb-2">AI Providers (OpenAI, Anthropic)</h4>
                        <p class="text-godot-muted text-sm">Large language model inference for AI features. Your prompts and project context may be sent to these providers.</p>
                        <div class="mt-2 space-x-4">
                            <a href="https://openai.com/privacy/" target="_blank" class="text-godot-blue text-sm hover:underline">OpenAI Privacy →</a>
                            <a href="https://www.anthropic.com/privacy" target="_blank" class="text-godot-blue text-sm hover:underline">Anthropic Privacy →</a>
                        </div>
                    </div>
                </div>
                
                <p class="text-godot-muted leading-relaxed mt-6">
                    We use LiteLLM as a proxy to route requests to AI providers. This allows us to enforce 
                    usage limits and track costs without exposing provider API keys.
                </p>
            </section>
            
            <!-- Data Retention -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
                <p class="text-godot-muted leading-relaxed">
                    We retain your data for the following periods:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godot-muted space-y-2">
                    <li><strong class="text-white">Account data:</strong> Until you delete your account</li>
                    <li><strong class="text-white">Chat history:</strong> Stored locally on your device; we do not retain conversations on our servers</li>
                    <li><strong class="text-white">Transaction records:</strong> 7 years (for legal and tax compliance)</li>
                    <li><strong class="text-white">Usage logs:</strong> 90 days</li>
                </ul>
                <p class="text-godot-muted leading-relaxed mt-4">
                    After account deletion, we will remove your personal data within 30 days, except for data 
                    we are legally required to retain.
                </p>
            </section>
            
            <!-- Data Security -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">6. Data Security</h2>
                <p class="text-godot-muted leading-relaxed">
                    We implement industry-standard security measures including:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godot-muted space-y-2">
                    <li>Encryption of data in transit (TLS/HTTPS)</li>
                    <li>Encryption of sensitive data at rest</li>
                    <li>Secure password hashing (bcrypt)</li>
                    <li>Row-level security in our database</li>
                    <li>Virtual key system to protect API credentials</li>
                </ul>
                <p class="text-godot-muted leading-relaxed mt-4">
                    While we strive to protect your data, no method of transmission or storage is 100% secure. 
                    You acknowledge and accept this inherent risk.
                </p>
            </section>
            
            <!-- Your Rights -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                <p class="text-godot-muted leading-relaxed">
                    Depending on your location, you may have the right to:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godot-muted space-y-2">
                    <li><strong class="text-white">Access:</strong> Request a copy of your personal data</li>
                    <li><strong class="text-white">Rectification:</strong> Correct inaccurate data</li>
                    <li><strong class="text-white">Deletion:</strong> Request deletion of your account and data</li>
                    <li><strong class="text-white">Portability:</strong> Receive your data in a portable format</li>
                    <li><strong class="text-white">Objection:</strong> Object to certain processing of your data</li>
                </ul>
                <p class="text-godot-muted leading-relaxed mt-4">
                    To exercise these rights, contact us at <span class="text-godot-blue">support@godoty.app</span>.
                </p>
            </section>
            
            <!-- Children's Privacy -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
                <p class="text-godot-muted leading-relaxed">
                    The Service is not intended for children under 13 years of age. We do not knowingly collect 
                    personal information from children under 13. If you believe we have collected such information, 
                    please contact us immediately so we can delete it.
                </p>
            </section>
            
            <!-- International Data Transfers -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
                <p class="text-godot-muted leading-relaxed">
                    Your data may be transferred to and processed in countries other than your country of residence. 
                    These countries may have different data protection laws. By using the Service, you consent to 
                    the transfer of your data to the United States and other countries where our service providers operate.
                </p>
            </section>
            
            <!-- Changes to This Policy -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
                <p class="text-godot-muted leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes 
                    by email or by posting a notice in the Service. Your continued use of the Service after such 
                    changes constitutes acceptance of the updated policy.
                </p>
            </section>
            
            <!-- Contact Us -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
                <p class="text-godot-muted leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p class="text-godot-blue mt-4">support@godoty.app</p>
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
