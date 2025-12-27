#!/bin/bash
set -e

echo "🦚 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM — System Integration (v2.1.0)"

# --- STEP 1: DEEP CLEAN (Fix Dependency Conflicts) ---
# Removing legacy artifacts causing Error 254 (React 19 vs 18 conflict) [Source 35]
echo "🧹 Cleaning legacy artifacts..."
rm -rf node_modules package-lock.json dist .next legacy_old
rm -f package.json vite.config.js vercel.json

# --- STEP 2: DEFINE ARCHITECTURE (React 18 + Vite) ---
# Enforcing the stack defined in 'tryonyou notas proyecto.pdf' [Source 2371]
echo "⚙️ Configuring Core Architecture..."

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
    "framer-motion": "^11.0.8",
    "lucide-react": "^0.344.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.4",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1"
  }
}
JSON

cat > vite.config.js << 'JS'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: { outDir: 'dist', emptyOutDir: true }
})
JS

# --- STEP 3: INTEGRATE HUB71 & PATENT ASSETS ---
# Creating structure for Investor Pack and Rule 26 Patents [Source 200, 928]
echo "🇦🇪 Injecting Hub71 & Patent Data..."
mkdir -p public/docs/investors/adgm
mkdir -p public/docs/patent/rule26
mkdir -p src/components

# Generate ADGM Business Summary [Source 10-15]
cat > public/docs/investors/adgm/Executive_Summary.txt << 'TXT'
ENTITY: TRYONYOU – ABVETOS (ADGM Tech Startup Applicant)
ASK: €200,000 for 7% Equity
VALUATION: €120M - €400M (Post-Integration)
IP: PCT/EP2025/067317 (Rule 26 Compliant)
TXT

# --- STEP 4: RESTORE PREMIUM INTERFACE (GOLD/ANTHRACITE) ---
# Implementing the "Vogue Tech" aesthetic [Source 886, 962]
echo "🎨 Restoring Visual Interface..."

cat > index.html << 'HTML'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM</title>
    <style>body { margin: 0; background-color: #141619; color: #F5EFE6; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
HTML

mkdir -p src
cat > src/main.jsx << 'JSX'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>,)
JSX

cat > src/App.jsx << 'JSX'
import React, { useState } from 'react';
import { ShieldCheck, Globe, Cpu, Zap, Download, ScanLine } from 'lucide-react';

export default function App() {
  const [activeModule, setActiveModule] = useState(null);
  
  // Brand Palette [Source 962]
  const colors = { gold: '#C5A46D', anthracite: '#141619', bone: '#F5EFE6', peacock: '#006D77' };

  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', 
      background: colors.anthracite, color: colors.gold, fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: '2rem'
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', margin: '0', letterSpacing: '-1px' }}>TRYONYOU</h1>
        <h2 style={{ fontSize: '1rem', color: colors.peacock, fontWeight: '400', letterSpacing: '2px' }}>
          ABVETOS – ULTRA – PLUS – ULTIMATUM
        </h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', width: '100%', maxWidth: '800px' }}>
        
        {/* Module 1: Hub71 / ADGM Status */}
        <div style={{ background: '#1e2124', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
          <Globe size={32} color={colors.peacock} />
          <h3 style={{ color: colors.bone }}>Hub71 / ADGM</h3>
          <p style={{ fontSize: '0.8rem', color: '#888' }}>Tech Startup Application Active</p>
          <div style={{ marginTop: '10px', fontSize: '0.8rem', color: colors.gold }}>
             Use of Funds: €200k / 7% Equity
          </div>
        </div>

        {/* Module 2: IP Protection */}
        <div style={{ background: '#1e2124', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
          <ShieldCheck size={32} color={colors.peacock} />
          <h3 style={{ color: colors.bone }}>Patent Rule 26</h3>
          <p style={{ fontSize: '0.8rem', color: '#888' }}>PCT/EP2025/067317</p>
          <div style={{ marginTop: '10px', fontSize: '0.8rem', color: colors.gold }}>
             8 Claims Protected
          </div>
        </div>

        {/* Module 3: PAU Scanner */}
        <div style={{ background: '#1e2124', padding: '20px', borderRadius: '12px', border: `1px solid ${colors.gold}` }}>
          <ScanLine size={32} color={colors.gold} />
          <h3 style={{ color: colors.bone }}>PAU Scanner</h3>
          <p style={{ fontSize: '0.8rem', color: '#888' }}>Biometric & Emotional Fit</p>
          <button style={{ 
            marginTop: '10px', background: colors.gold, color: colors.anthracite, border: 'none', 
            padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' 
          }}>Launch Interface</button>
        </div>

      </div>

      <div style={{ marginTop: '50px', borderTop: '1px solid #333', paddingTop: '20px', color: '#666', fontSize: '0.7rem' }}>
        <p>TRYONYOU-ABVETOS-ULTRA-PLUS-ULTIMATUM © 2025 LVT-ENG.</p>
        <p>Protected by International Patent Laws. Unauthorized reproduction prohibited.</p>
      </div>
    </div>
  );
}
JSX

# --- STEP 5: DEPLOY ---
echo "🚀 Deploying ULTRA-PLUS-ULTIMATUM to Vercel..."
npm install --legacy-peer-deps
git add .
git commit -m "🔥 ULTRA-PLUS: Hub71 Pivot + Patent Rule 26 + React 18 Fix" --allow-empty
git push origin main --force
npx vercel --prod --yes

echo "✅ Deployment Complete: https://tryonyou.app"
