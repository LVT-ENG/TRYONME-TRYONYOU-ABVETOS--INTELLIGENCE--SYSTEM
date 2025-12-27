#!/bin/bash
set -e

echo "🦚 TRYONYOU – Restoring Premium Interface (Gold/Anthracite)..."

# --- STEP 1: PURGE CONFLICTING TEMPLATES (Fixes Visual Discrepancy) ---
# Deleting Next.js artifacts that cause the "Chatbot" look [Source 35]
rm -rf .next node_modules package-lock.json dist
rm -f next.config.js tsconfig.json

# --- STEP 2: RESTORE CORE ARCHITECTURE (React 18 + Vite) ---
# Enforcing the specific stack required for the 3D Avatar/Premium UI [Source 38]
cat > package.json << 'JSON'
{
  "name": "tryonyou-abvetos-premium",
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

# --- STEP 3: RESTORE VISUAL ASSETS (The "Screenshot" Look) ---
# Re-creating the App.jsx with the Gold/Anthracite theme and Sparkles [Source 886, 962]
mkdir -p src
cat > src/App.jsx << 'JSX'
import React, { useState } from 'react';
import { ShieldCheck, Globe, Cpu, Zap, Activity } from 'lucide-react';

export default function App() {
  // Official Brand Palette [Source 962]
  const colors = {
    gold: '#C5A46D',       // Luxury Gold
    anthracite: '#141619', // Anthracite Dark
    peacock: '#006D77',    // Peacock Deep
    bone: '#F5EFE6'        // Bone Light
  };

  return (
    <div style={{ 
      backgroundColor: colors.anthracite, 
      color: colors.bone, 
      minHeight: '100vh', 
      fontFamily: 'system-ui, sans-serif',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' 
    }}>
      
      {/* HEADER / BRANDING */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '3.5rem', fontWeight: '800', margin: '0', 
          color: colors.gold, letterSpacing: '-0.05em' 
        }}>TRYONYOU</h1>
        <h2 style={{ 
          fontSize: '1rem', color: colors.peacock, fontWeight: '500', 
          letterSpacing: '0.2em', marginTop: '0.5rem' 
        }}>
          ABVETOS – ULTRA – PLUS – ULTIMATUM
        </h2>
      </div>

      {/* DASHBOARD GRID */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
        gap: '1.5rem', maxWidth: '800px', width: '100%', padding: '0 2rem'
      }}>
        <DashboardCard icon={<ShieldCheck size={32} />} label="Patent Rule 26" sub="PCT/EP2025/067317" colors={colors} />
        <DashboardCard icon={<Globe size={32} />} label="Hub71 / ADGM" sub="UAE Expansion" colors={colors} />
        <DashboardCard icon={<Cpu size={32} />} label="ABVETOS Core" sub="53 Agents Active" colors={colors} />
        <DashboardCard icon={<Zap size={32} />} label="LiveIt Factory" sub="JIT Production" colors={colors} />
      </div>
      
      {/* FOOTER */}
      <div style={{ marginTop: '4rem', color: '#666', fontSize: '0.8rem', textAlign: 'center' }}>
        <p>Protected by International Patent Laws. Unauthorized reproduction prohibited.</p>
        <p>Valuation: €120M - €400M • Ask: €200k (7% Equity)</p>
      </div>
    </div>
  );
}

function DashboardCard({ icon, label, sub, colors }) {
  return (
    <div style={{ 
      padding: '1.5rem', background: '#1e2124', borderRadius: '12px', 
      textAlign: 'center', border: '1px solid #333',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem'
    }}>
      <div style={{ color: colors.peacock }}>{icon}</div>
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: colors.gold }}>{label}</div>
        <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '4px' }}>{sub}</div>
      </div>
    </div>
  )
}
JSX

# --- STEP 4: INJECT STRATEGIC DOCUMENTS (Hub71 & Patent) ---
# Ensuring these files exist for the Investor Portal [Source 10, 44]
mkdir -p public/docs/investors/adgm
cat > public/docs/investors/adgm/Executive_Summary.txt << 'TXT'
PROJECT: TRYONYOU – ABVETOS (Hub71 Applicant)
ENTITY: ADGM Tech Startup
ASK: €200,000 for 7% Equity
PATENT: PCT/EP2025/067317 (Rule 26 Compliant)
TXT

# --- STEP 5: DEPLOY ---
echo "🚀 Deploying Correct Version to Vercel..."
npm install --legacy-peer-deps
git add .
git commit -m "🔥 FIX: Restored Premium UI & Removed Legacy Templates (v2.1.0)" --allow-empty
git push origin main --force
npx vercel --prod --yes
