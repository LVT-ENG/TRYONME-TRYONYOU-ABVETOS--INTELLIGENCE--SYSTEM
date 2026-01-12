import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- IMPORTACIÓN DE COMPONENTES ---
import Home from './pages/Home';
import GoogleNews from './pages/GoogleNews';
import VirtualMirror from './components/VirtualTryOn';
import SmartWardrobe from './modules/SmartWardrobe';
import Investors from './pages/Investors';

// Fallback loader
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-[#1A1A1A] text-[#D3B26A]">
    <div className="animate-pulse text-xl font-serif tracking-widest">LOADING DIVINEO...</div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container font-sans text-gray-900 bg-[#1A1A1A] min-h-screen">
        
        {/* --- BARRA DE NAVEGACIÓN DE DESARROLLO (Opcional, útil para moverse rápido) --- */}
        {/*
        <nav className="fixed top-0 w-full flex justify-between px-6 py-4 z-50 mix-blend-difference text-white opacity-30 hover:opacity-100 transition-opacity pointer-events-none">
          <Link to="/" className="font-bold tracking-widest pointer-events-auto">DEV</Link>
          <div className="space-x-4 text-xs pointer-events-auto">
            <Link to="/demo">DEMO</Link>
            <Link to="/wardrobe">WARDROBE</Link>
          </div>
        </nav>
        */}

        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Ruta Principal: La Entrada (Production Home) */}
            <Route path="/" element={<Home />} />

            {/* Page for Google Platform News */}
            <Route path="/google-news" element={<GoogleNews />} />

            {/* Ruta del Piloto: El Espejo Mágico (Cámara) */}
            <Route path="/demo" element={<VirtualMirror />} />

            {/* Ruta del Activo: El Armario (Donde vive el Token/Vestido) */}
            <Route path="/wardrobe" element={<SmartWardrobe />} />

            {/* Investors Route */}
            <Route path="/investors" element={<Investors />} />
          </Routes>
        </Suspense>
        
      </div>
    </Router>
  );
}

export default App;
