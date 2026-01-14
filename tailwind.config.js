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
        'tryonyou-blue': '#00A8E8',
        'tryonyou-darkblue': '#003459',
        'tryonyou-gold': '#D4AF37',
        'tryonyou-metallic': '#B8B8B8',
        'tryonyou-silver': '#C0C0C0',
        'amparo-light': '#00D9FF',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        display: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
