/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'tryon-beige': '#F5F5DC',
        'tryon-white': '#FFFFFF',
        'tryon-gold': '#D3B26A',
        'tryon-anthracite': '#2F4F4F',
        'tryonyou-black': '#000000',
        'tryonyou-blue': '#00A8E8',
        'tryonyou-darkblue': '#003459',
        'tryonyou-metallic': '#B0C4DE',
        'tryonyou-silver': '#C0C0C0',
        'tryonyou-gold': '#D4AF37',
        'tryonyou-smoke': '#F5F5F5',
        'amparo-light': '#89CFF0',
      },
      fontFamily: {
        'luxury': ['Cinzel', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
