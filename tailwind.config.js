/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Unified Godot-inspired color palette (matching desktop app)
                godot: {
                    blue: '#478cbf',       // Primary accent (Godot blue)
                    'blue-hover': '#5aa3d6', // Blue hover state
                    dark: '#202531',       // Main background
                    darker: '#1a1e29',     // Sidebar/deeper elements
                    surface: '#2d3546',    // Cards/input backgrounds
                    border: '#3b4458',     // Borders
                    text: '#e0e0e0',       // Primary text
                    muted: '#9ca3af',      // Secondary text/icons
                    accent: '#478cbf',     // Alias for primary action
                    green: '#22c55e',      // Success green
                    yellow: '#eab308',     // Warning/coins
                    red: '#ef4444',        // Error/danger
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Consolas', 'monospace'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' },
                },
                fadeInUp: {
                    'from': { opacity: '0', transform: 'translateY(10px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
