/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-green': '#1B4D3E',
        'gold': '#C9A227',
        'cream': '#F5F0E6',
        'deep-gold': '#8B6914',
        'dark-green': '#0F2E26',
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'pill': '36px',
        'outlined': '22.5px',
      },
      animation: {
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-out': 'fadeOut 0.4s ease-in forwards',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 162, 39, 0.4)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(201, 162, 39, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
