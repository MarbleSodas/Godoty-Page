/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                godoty: {
                    bg: '#0f1115',       // Deepest background
                    panel: '#181b21',    // Panel/Sidebar background
                    surface: '#22262e',  // Card surface
                    border: '#2f343e',   // Border color
                    blue: '#4a9eff',     // Primary Accent (Light Blue from logo)
                    blueDim: '#357abd',  // Hover state
                    text: '#e0e0e0',     // Primary text
                    muted: '#9ca3af',    // Secondary text
                    green: '#2ea043',    // Success green (from screenshot button)
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    },
    plugins: [],
}
