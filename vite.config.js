import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Define aliases for cleaner import paths, aligned with best practices.
  resolve: {
    alias: {
      "@": path.resolve(new URL('.', import.meta.url).pathname, "./src"),
    },
  },

  // Configure the development server.
  server: {
    // Proxy API requests to the backend server during development.
    // This avoids CORS issues when the frontend and backend are on different ports.
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // Assuming the Flask backend runs on port 5000
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Build configuration.
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
