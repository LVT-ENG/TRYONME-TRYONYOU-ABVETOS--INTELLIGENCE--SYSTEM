/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tryonyou: {
          blue: '#00A8E8',
          darkblue: '#003459',
          metallic: '#8B92A0',
          gold: '#D4AF37',
          silver: '#C0C0C0',
          black: '#0A0A0A',
          smoke: '#1A1A2E',
        },
        amparo: {
          light: '#00D9FF',
          dark: '#0077B6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'showroom': "linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #003459 100%)",
        'metallic': "linear-gradient(135deg, #8B92A0 0%, #C0C0C0 100%)",
        'peacock': "radial-gradient(circle, #00A8E8 0%, #003459 50%, #0A0A0A 100%)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00A8E8, 0 0 10px #00A8E8' },
          '100%': { boxShadow: '0 0 20px #00A8E8, 0 0 30px #00A8E8, 0 0 40px #00A8E8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
