<script setup>
import { RouterLink } from 'vue-router'
import logoSvg from '../assets/logo.svg'

const lastUpdated = 'December 17, 2025'
</script>

<template>
<div class="min-h-screen bg-godoty-bg">
    <!-- Header -->
    <header class="border-b border-godoty-border bg-godoty-panel/50 backdrop-blur-xl">
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
            <h1 class="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p class="text-godoty-muted">Last updated: {{ lastUpdated }}</p>
        </div>
        
        <div class="prose prose-invert max-w-none space-y-8">
            <!-- Introduction -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p class="text-godoty-muted leading-relaxed">
                    Welcome to Godoty ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and 
                    use of the Godoty desktop application, website at godoty.app, and related services (collectively, the "Service"). 
                    By creating an account or using the Service, you agree to be bound by these Terms.
                </p>
                <p class="text-godoty-muted leading-relaxed mt-4">
                    Godoty is an AI-powered assistant designed to help developers working with the Godot game engine. 
                    The Service provides code generation, debugging assistance, planning tools, and project analysis capabilities.
                </p>
            </section>
            
            <!-- Eligibility -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">2. Eligibility</h2>
                <p class="text-godoty-muted leading-relaxed">
                    You must be at least 13 years old to use the Service. If you are under 18, you must have permission 
                    from a parent or guardian. By using Godoty, you represent that you meet these requirements.
                </p>
            </section>
            
            <!-- Account Registration -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">3. Account Registration</h2>
                <p class="text-godoty-muted leading-relaxed">
                    To access certain features, you must create an account using:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godoty-muted space-y-2">
                    <li>Email and password, or</li>
                    <li>OAuth authentication via Google or GitHub</li>
                </ul>
                <p class="text-godoty-muted leading-relaxed mt-4">
                    You are responsible for maintaining the security of your account credentials and for all activities 
                    that occur under your account. You must immediately notify us of any unauthorized use of your account.
                </p>
            </section>
            
            <!-- Credits and Payment -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">4. Credits and Payment</h2>
                <p class="text-godoty-muted leading-relaxed">
                    Godoty uses a credit-based system to access AI features:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godoty-muted space-y-2">
                    <li>Credits are purchased through our payment processor, Stripe</li>
                    <li>Credits do not expire and remain in your account until used</li>
                    <li>All purchases are final and non-refundable, except as required by law</li>
                    <li>We reserve the right to modify credit pricing at any time with reasonable notice</li>
                    <li>Credits are non-transferable between accounts</li>
                </ul>
            </section>
            
            <!-- Acceptable Use -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">5. Acceptable Use</h2>
                <p class="text-godoty-muted leading-relaxed">
                    You agree not to use the Service to:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godoty-muted space-y-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Generate malicious code, malware, or content intended to harm others</li>
                    <li>Infringe upon intellectual property rights of third parties</li>
                    <li>Attempt to reverse engineer, decompile, or exploit the Service</li>
                    <li>Share account credentials or allow unauthorized access</li>
                    <li>Abuse, harass, or harm other users or our staff</li>
                    <li>Circumvent usage limits or credit systems</li>
                    <li>Use the Service to train competing AI models</li>
                </ul>
            </section>
            
            <!-- Intellectual Property -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                <p class="text-godoty-muted leading-relaxed">
                    <strong class="text-white">Your Content:</strong> You retain ownership of any code, projects, or content 
                    you provide to the Service. By using Godoty, you grant us a limited license to process this content 
                    solely to provide the Service to you.
                </p>
                <p class="text-godoty-muted leading-relaxed mt-4">
                    <strong class="text-white">AI-Generated Content:</strong> Code and suggestions generated by Godoty are 
                    provided for your use. You are responsible for reviewing and testing any AI-generated code before 
                    incorporating it into your projects.
                </p>
                <p class="text-godoty-muted leading-relaxed mt-4">
                    <strong class="text-white">Our Property:</strong> The Godoty name, logo, software, and all related 
                    intellectual property remain our exclusive property.
                </p>
            </section>
            
            <!-- Third-Party Services -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
                <p class="text-godoty-muted leading-relaxed">
                    The Service integrates with third-party providers including:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godoty-muted space-y-2">
                    <li><strong class="text-white">Supabase:</strong> Authentication and database services</li>
                    <li><strong class="text-white">Stripe:</strong> Payment processing</li>
                    <li><strong class="text-white">AI Providers:</strong> Large language model services (OpenAI, Anthropic, etc.)</li>
                </ul>
                <p class="text-godoty-muted leading-relaxed mt-4">
                    Your use of these services is subject to their respective terms and privacy policies.
                </p>
            </section>
            
            <!-- Disclaimer of Warranties -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">8. Disclaimer of Warranties</h2>
                <p class="text-godoty-muted leading-relaxed">
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                    EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godoty-muted space-y-2">
                    <li>The Service will be uninterrupted, secure, or error-free</li>
                    <li>AI-generated code will be accurate, complete, or fit for any particular purpose</li>
                    <li>The Service will meet your specific requirements</li>
                </ul>
                <p class="text-godoty-muted leading-relaxed mt-4">
                    You acknowledge that AI-generated content may contain errors and should always be reviewed 
                    before use in production environments.
                </p>
            </section>
            
            <!-- Limitation of Liability -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                <p class="text-godoty-muted leading-relaxed">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                    SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, 
                    DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE.
                </p>
                <p class="text-godoty-muted leading-relaxed mt-4">
                    Our total liability for any claims arising from your use of the Service shall not exceed 
                    the amount you paid to us in the twelve (12) months preceding the claim.
                </p>
            </section>
            
            <!-- Termination -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">10. Termination</h2>
                <p class="text-godoty-muted leading-relaxed">
                    We may suspend or terminate your account if you violate these Terms or for any other reason 
                    at our discretion. Upon termination:
                </p>
                <ul class="list-disc pl-6 mt-4 text-godoty-muted space-y-2">
                    <li>Your access to the Service will be revoked</li>
                    <li>Any unused credits will be forfeited</li>
                    <li>We may delete your account data in accordance with our Privacy Policy</li>
                </ul>
                <p class="text-godoty-muted leading-relaxed mt-4">
                    You may terminate your account at any time by contacting us.
                </p>
            </section>
            
            <!-- Changes to Terms -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
                <p class="text-godoty-muted leading-relaxed">
                    We may update these Terms from time to time. We will notify you of significant changes via 
                    email or by posting a notice on the Service. Your continued use of the Service after such 
                    changes constitutes acceptance of the updated Terms.
                </p>
            </section>
            
            <!-- Governing Law -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
                <p class="text-godoty-muted leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of the 
                    United States, without regard to its conflict of law provisions.
                </p>
            </section>
            
            <!-- Contact -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
                <p class="text-godoty-muted leading-relaxed">
                    If you have any questions about these Terms, please contact us at:
                </p>
                <p class="text-godoty-blue mt-4">support@godoty.app</p>
            </section>
        </div>
        
        <!-- Back Link -->
        <div class="mt-16 pt-8 border-t border-godoty-border">
            <router-link to="/" class="text-godoty-muted hover:text-godoty-blue transition-colors inline-flex items-center gap-2">
                <i class="ph ph-arrow-left"></i>
                Back to Home
            </router-link>
        </div>
    </main>
</div>
</template>
