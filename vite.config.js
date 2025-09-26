import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'apps/web',
  server: {
    port: 5173
  },
  build: {
    outDir: '../../dist/apps/web',
    emptyOutDir: true
  }
})
