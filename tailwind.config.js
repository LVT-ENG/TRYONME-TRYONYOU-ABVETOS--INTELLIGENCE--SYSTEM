/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Peacock Blue & Gold Palette
        peacock: {
          50: '#E0F7FF',
          100: '#B8EEFF',
          200: '#8BE4FF',
          300: '#5DD9FF',
          400: '#2ECEFF',
          500: '#00A8E8', // Primary Peacock Blue
          600: '#0088C4',
          700: '#006BA0',
          800: '#004F7C',
          900: '#003459', // Deep Peacock Blue
        },
        gold: {
          50: '#FFF9E6',
          100: '#FFF0C2',
          200: '#FFE699',
          300: '#FFDD70',
          400: '#FFD447',
          500: '#D4AF37', // Primary Gold
          600: '#B8962F',
          700: '#9C7D27',
          800: '#80641F',
          900: '#644B17',
        },
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
        'peacock-gold': "linear-gradient(135deg, #00A8E8 0%, #D4AF37 100%)",
        'luxury-gradient': "linear-gradient(135deg, #003459 0%, #00A8E8 50%, #D4AF37 100%)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'luxury-fade': 'luxuryFade 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(0, 168, 232, 0.3), 0 0 20px rgba(0, 168, 232, 0.2), 0 0 30px rgba(212, 175, 55, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(0, 168, 232, 0.5), 0 0 40px rgba(0, 168, 232, 0.3), 0 0 60px rgba(212, 175, 55, 0.2)' 
          },
        },
        luxuryFade: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

