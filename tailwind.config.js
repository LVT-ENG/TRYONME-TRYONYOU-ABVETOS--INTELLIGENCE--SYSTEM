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
        'tryonyou-black': '#000000',
        'tryonyou-blue': '#00A8E8',
        'tryonyou-darkblue': '#003459',
        'tryonyou-metallic': '#A0A0A0', // Placeholder
        'tryonyou-silver': '#C0C0C0',   // Placeholder
        'tryonyou-gold': '#D4AF37',     // Placeholder
        'tryonyou-smoke': '#1A1A1A',    // Placeholder
        'amparo-light': '#00D9FF',      // Placeholder
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        display: ['serif'], // Placeholder
      }
    },
  },
  plugins: [],
}
