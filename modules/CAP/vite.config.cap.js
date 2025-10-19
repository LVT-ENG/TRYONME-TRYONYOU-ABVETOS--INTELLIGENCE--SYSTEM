// ===========================================================
// CAP MODULE — Creation & Production System
// Build Configuration with Minimal Compression (for local test)
// TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
// ===========================================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  
  build: {
    outDir: path.resolve(__dirname, './dist-cap'),
    sourcemap: true,
    minify: false, // NO minification for local testing
    target: 'esnext',
    
    lib: {
      entry: path.resolve(__dirname, './index.js'),
      name: 'CAP',
      formats: ['es', 'umd'],
      fileName: (format) => `cap.${format}.js`
    },
    
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'chunks/[name].js', // No hash for easier debugging
        entryFileNames: '[name].js',
        // Preserve formatting for readability
        compact: false,
        indent: '  '
      }
    },
    
    // Minimal compression settings
    cssCodeSplit: false,
    cssMinify: false, // NO CSS minification
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1000, // Higher limit for uncompressed
    
    // Preserve comments and formatting
    terserOptions: {
      compress: false,
      mangle: false,
      format: {
        comments: 'all',
        beautify: true
      }
    }
  },
  
  define: {
    __MODULE__: JSON.stringify('CAP'),
    __VERSION__: JSON.stringify('1.0.0'),
    __BUILD_TYPE__: JSON.stringify('local-test'),
    __COMPRESSION__: JSON.stringify('minimal')
  },
  
  resolve: {
    alias: {
      '@cap': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../../src/shared')
    }
  }
})

