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
        'tryonyou-black': '#0A0A0A',
        'tryonyou-smoke': '#1A1A1A',
        'tryonyou-metallic': '#5A5A5A',
        'tryonyou-silver': '#A0A0A0',
        'tryonyou-gold': '#D4AF37',
        'tryonyou-blue': '#00A8E8',
        'amparo-light': '#00D9FF',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        display: ['Arial', 'sans-serif'], // Fallback for display font
      }
    },
  },
  plugins: [],
}
