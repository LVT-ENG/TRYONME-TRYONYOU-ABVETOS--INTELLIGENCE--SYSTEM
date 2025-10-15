import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'docs',
          dest: ''
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    // Optimización de chunks para mejor rendimiento
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor principal: React y React DOM
          'vendor-react': ['react', 'react-dom'],
          // Router separado para lazy loading
          'vendor-router': ['react-router-dom'],
        },
        // Nombres de archivos con hash para cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Optimización de tamaño
    chunkSizeWarningLimit: 1000,
    // Compresión y optimización
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb - inline small assets
  },
  server: {
    port: 3000,
    open: true
  },
  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },
  // Preload de fuentes e imágenes críticas
  preview: {
    port: 3000
  }
})

