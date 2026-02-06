import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ignorar errores de TS durante el build
    typescript: {
      ignoreBuildErrors: true,
    },
  },
  esbuild: {
    // Permitir JSX en archivos .js
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
})
