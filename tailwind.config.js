/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'tryon-beige': '#F5F5DC',      // 60% Base
        'tryon-white': '#FFFFFF',      // 30% Pureza
        'tryon-gold': '#D3B26A',       // 10% Acento Lujo
        'tryon-anthracite': '#2F4F4F', // Letra y contraste
        'tryonyou-black': '#000000',   // Fix para el error de Vercel
      },
      fontFamily: {
        'luxury': ['Cinzel', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
