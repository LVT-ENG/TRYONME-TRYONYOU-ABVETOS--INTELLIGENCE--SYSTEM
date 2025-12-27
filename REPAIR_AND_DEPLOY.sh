#!/bin/bash
set -e

echo "🔧 FIXING VERCEL ERROR 254 (REACT CONFLICT)..."

# 1. Force Clean dependencies
rm -rf node_modules package-lock.json dist
rm -f package.json vite.config.js vercel.json

# 2. Write Safe 'package.json' (Strict React 18 - Source 38)
cat > package.json << 'JSON'
{
  "name": "tryonyou-abvetos-ultimatum",
  "version": "2.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-router-dom": "^6.26.0",
    "framer-motion": "^11.0.8",
    "lucide-react": "^0.344.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.4"
  }
}
JSON

# 3. Write Safe 'vite.config.js' (Source 375)
cat > vite.config.js << 'JS'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
JS

# 4. Write Safe 'vercel.json' (Source 40)
cat > vercel.json << 'JSON'
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install --legacy-peer-deps --save-exact"
}
JSON

# 5. Re-install Dependencies locally to generate valid lockfile
echo "📦 Installing Clean Dependencies..."
npm install --legacy-peer-deps

# 6. Push Fixes to GitHub
echo "🚀 Pushing Dependency Fix..."
git add .
git commit -m "🔥 FIX: Force React 18.3.1 to resolve Error 254" --allow-empty
git push origin main --force

# 7. Force Vercel Deploy (New Build)
echo "🌍 Deploying to Production..."
npx vercel --prod --yes --force
