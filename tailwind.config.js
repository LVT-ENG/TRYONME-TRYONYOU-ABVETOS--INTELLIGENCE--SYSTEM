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
        'peacock-blue': '#002EEF', // Azul Eléctrico vibrante
        'peacock-gold': '#D4AF37', // Oro Metálico (Gold Custom)
        'deep-void': '#050505',    // Negro profundo para contraste
        // TryOnYou brand colors
        'tryonyou-blue': '#002EEF',
        'tryonyou-gold': '#D4AF37',
        'tryonyou-black': '#050505',
        'tryonyou-smoke': '#1a1a1a',
        'tryonyou-metallic': '#C0C0C0',
        'tryonyou-silver': '#E8E8E8',
        'tryonyou-darkblue': '#001a8f',
        'amparo-light': '#0040FF',
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #002EEF 0%, #D4AF37 100%)',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
