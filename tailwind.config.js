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
        'tryonyou-smoke': '#1a1a1a',
        'tryonyou-metallic': '#555555',
        'tryonyou-silver': '#888888',
        'tryonyou-gold': '#C5A46D',
        'tryonyou-blue': '#00A8E8',
        'amparo-light': '#33C9FF',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        display: ['serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
