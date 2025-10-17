import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { visualizer } from 'rollup-plugin-visualizer'
import viteImagemin from 'vite-plugin-imagemin'

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
    }),
    // Image optimization
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    // Bundle analyzer (only in analyze mode)
    process.env.ANALYZE && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    // Optimización de chunks para mejor rendimiento
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor principal: React y React DOM
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          // Router separado para lazy loading
          if (id.includes('node_modules/react-router-dom')) {
            return 'vendor-router'
          }
          // Componentes lazy-loaded en chunks separados
          if (id.includes('src/components/Problem')) {
            return 'component-problem'
          }
          if (id.includes('src/components/Solution')) {
            return 'component-solution'
          }
          if (id.includes('src/components/Modules')) {
            return 'component-modules'
          }
          if (id.includes('src/components/Patents')) {
            return 'component-patents'
          }
          if (id.includes('src/components/Partners')) {
            return 'component-partners'
          }
          if (id.includes('src/components/PersonalShopper')) {
            return 'component-personal-shopper'
          }
          if (id.includes('src/components/CTA')) {
            return 'component-cta'
          }
          if (id.includes('src/components/PauOverlay')) {
            return 'component-pau-overlay'
          }
        },
        // Nombres de archivos con hash para cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organizar assets por tipo
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name]-[hash].[ext]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash].[ext]`
          }
          if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(ext)) {
            return `assets/media/[name]-[hash].[ext]`
          }
          return `assets/[ext]/[name]-[hash].[ext]`
        }
      }
    },
    // Optimización de tamaño
    chunkSizeWarningLimit: 1000,
    // Compresión y optimización
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb - inline small assets
    // Enable Brotli compression
    reportCompressedSize: true,
    // Mejora de tree-shaking
    target: 'es2015',
    // Optimización de módulos
    modulePreload: {
      polyfill: true
    }
  },
  server: {
    port: 3000,
    open: true,
    // Habilitar compresión en desarrollo
    compression: true
  },
  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: [],
    // Force pre-bundling of dependencies
    force: false
  },
  // Preload de fuentes e imágenes críticas
  preview: {
    port: 3000
  },
  // Optimización de resolución de módulos
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@modules': '/src/modules'
    }
  }
})

