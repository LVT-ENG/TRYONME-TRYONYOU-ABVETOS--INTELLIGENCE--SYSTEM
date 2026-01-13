/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tryonyou-black': '#0A0A0A',
        'tryonyou-smoke': '#1A1A1A',
        'tryonyou-metallic': '#333333',
        'tryonyou-silver': '#CCCCCC',
        'tryonyou-gold': '#C5A46D',
        'tryonyou-blue': '#00A8E8',
        'amparo-light': '#00D9FF',
        gold: '#C5A46D',
        ink: '#050505',
        panel: '#0a0a0a',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        display: ['Poppins', 'sans-serif'], // Assuming Poppins is used for display
        sans: ['Inter', 'sans-serif'],    // Assuming Inter is default sans
      }
    },
  },
  plugins: [],
}
