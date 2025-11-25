// ===========================================================
// PAU MODULE — Emotional Avatar System
// Prebuild Configuration for Vite 7.1.2
// TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
// ===========================================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  
  build: {
    outDir: path.resolve(__dirname, './dist-pau'),
    sourcemap: true,
    minify: 'esbuild',
    target: 'esnext',
    
    lib: {
      entry: path.resolve(__dirname, './index.js'),
      name: 'PAU',
      formats: ['es', 'umd'],
      fileName: (format) => `pau.${format}.js`
    },
    
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: '[name].js'
      }
    },
    
    // Optimización específica para PAU
    cssCodeSplit: false,
    assetsInlineLimit: 0, // No inline assets para módulo
    chunkSizeWarningLimit: 500
  },
  
  define: {
    __MODULE__: JSON.stringify('PAU'),
    __VERSION__: JSON.stringify('1.0.0'),
    __BUILD_TYPE__: JSON.stringify('prebuild')
  },
  
  resolve: {
    alias: {
      '@pau': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../../src/shared')
    }
  }
})

