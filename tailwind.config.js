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
                    dark: '#141b26',       // Main background
                    darker: '#0d1117',     // Sidebar/deeper elements
                    surface: '#1c263b',    // Cards/input backgrounds
                    border: '#3b4c6e',     // Borders
                    text: '#e0e6f0',       // Primary text
                    muted: '#94a0b8',      // Secondary text/icons
                    accent: '#478cbf',     // Alias for primary action
                    green: '#45e295',      // Success green
                    yellow: '#ffdd66',     // Warning/coins
                    red: '#ff7085',        // Error/danger
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
