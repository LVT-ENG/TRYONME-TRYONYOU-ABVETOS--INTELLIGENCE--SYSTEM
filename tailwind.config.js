/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'turquesa-pastel': '#7DD9DC',
        'blanco-pastel': '#F4F6F7',
        'plata-mate': '#D5DADD',
        'grafito-gris': '#4B4F52',
        'negro-suave': '#2B2B2B',
      }
    },
  },
  plugins: [],
}