import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// ═══════════════════════════════════════════════════════════════
// TRYONYOU — Routing Principal
// Patent PCT/EP2025/067317 · Ruben Espinar Rodríguez
// Prioridad: Elena Grandini · Galeries Lafayette
// ═══════════════════════════════════════════════════════════════

// Lazy loading para módulos pesados (cámara, 3D, IA)
const Home = lazy(() => import('./pages/Home'))
const LafayettePilot = lazy(() => import('./pages/LafayettePilot'))
const VirtualFitting = lazy(() => import('./pages/VirtualFitting'))

// Loading state elegante
const LoadingFallback = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-t-2 border-[#C5A46D] rounded-full animate-spin mb-4 mx-auto" />
      <p className="text-[#C5A46D] font-serif italic tracking-widest text-sm">Chargement...</p>
    </div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lafayette" element={<LafayettePilot />} />
          <Route path="/pilot" element={<LafayettePilot />} />
          <Route path="/divineo" element={<LafayettePilot />} />
          <Route path="/demo" element={<VirtualFitting />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
