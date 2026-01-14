/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C5A46D',
        ink: '#050505',
        panel: '#0a0a0a',
        // TRYONYOU Brand Colors
        'tryonyou-blue': '#00A8E8',
        'tryonyou-darkblue': '#003459',
        'tryonyou-gold': '#D4AF37',
        'tryonyou-metallic': '#8B92A0',
        'tryonyou-silver': '#C0C0C0',
        'tryonyou-black': '#0A0A0A',
        'tryonyou-smoke': '#1A1A2E',
        'amparo-light': '#00D9FF',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
