/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'divineo-anthracite': 'var(--anth)',
        'divineo-gold': 'var(--gold)',
        'divineo-peacock': 'var(--peacock)',
        'divineo-bone': 'var(--bone)',
      },
    },
  },
  plugins: [],
}
