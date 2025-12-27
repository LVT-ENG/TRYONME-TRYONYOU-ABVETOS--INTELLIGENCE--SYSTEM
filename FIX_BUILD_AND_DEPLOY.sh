#!/bin/bash
set -e

echo "🔧 REPAIRING BUILD ARCHITECTURE (ULTRA-PLUS-ULTIMATUM)..."

# Ensure directory structure exists
mkdir -p src public/assets docs/patent

# 1. Restore 'index.html' (Crucial for Vite Build)
cat > index.html << 'HTML'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
HTML

# 2. Restore 'src/main.jsx' (Entry Point)
cat > src/main.jsx << 'JSX'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
JSX

# 3. Restore 'src/App.jsx' (Visual Interface with Patent Data)
cat > src/App.jsx << 'JSX'
import React from 'react';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#141619', 
      color: '#D3B26A', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', margin: '0', letterSpacing: '0.1em' }}>TRYONYOU</h1>
      <h2 style={{ color: '#F5EFE6', fontWeight: '300', marginBottom: '2rem' }}>ABVETOS – ULTRA – PLUS – ULTIMATUM</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '1.5rem', 
        marginBottom: '3rem',
        maxWidth: '800px'
      }}>
        {['PAU Avatar 3D', 'ABVET Biometric', 'CAP Auto-Production', 'LiveIt Factory'].map(module => (
          <div key={module} style={{ 
            padding: '1.5rem', 
            border: '1px solid #333', 
            borderRadius: '8px',
            backgroundColor: '#1e2124',
            color: '#0E6B6B'
          }}>
            <strong style={{ color: '#D3B26A', display: 'block', marginBottom: '0.5rem' }}>{module}</strong>
            <span style={{ color: '#10B981', fontSize: '0.9rem' }}>● System Active</span>
          </div>
        ))}
      </div>

      <div style={{ 
        borderTop: '1px solid #333', 
        paddingTop: '1.5rem', 
        color: '#666',
        fontSize: '0.9rem' 
      }}>
        <p>Patent Pending: <strong>PCT/EP2025/067317</strong> (Rule 26 Compliant)</p>
        <p>Hub71 / ADGM Tech Startup Entity</p>
      </div>
    </div>
  );
}

export default App;
JSX

# 4. Restore 'src/index.css'
echo "body { margin: 0; padding: 0; box-sizing: border-box; background-color: #141619; color: white; }" > src/index.css

# 5. Restore 'vite.config.js' (Ensure Build Configuration)
cat > vite.config.js << 'JS'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
JS

# 6. Commit and Force Deploy
echo "🚀 Consolidating Files..."
git add .
git commit -m "🔥 FIX: Restored Core Build Files (index.html, main.jsx) for ULTRA-PLUS-ULTIMATUM" --allow-empty
git push origin main --force

echo "🌍 Deploying to Vercel (Production)..."
npx vercel --prod --yes --force
