import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- IMPORTACIÓN DE COMPONENTES ---
// Aseguramos que los componentes críticos estén conectados
import VirtualMirror from './components/VirtualTryOn';
import SmartWardrobe from './modules/SmartWardrobe';

// --- COMPONENTE LANDING (Placeholder temporal si no tienes uno) ---
const Home = () => (
  <div className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
    <h1 className="text-5xl font-serif text-green-500 mb-8">DIVINEO</h1>
    <p className="text-xl mb-12 tracking-widest uppercase">Lafayette Pilot Experience</p>
    <div className="flex gap-8">
      <Link to="/demo" className="px-8 py-4 border border-green-500 hover:bg-green-500 hover:text-black transition-all uppercase tracking-widest">
        Iniciar Experiencia (Espejo)
      </Link>
      <Link to="/wardrobe" className="px-8 py-4 border border-gray-500 hover:border-white transition-all uppercase tracking-widest">
        Ver Armario Digital
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container font-sans text-gray-900">
        
        {/* --- BARRA DE NAVEGACIÓN (Solo visible en DEV/PILOTO para moverse rápido) --- */}
        <nav className="fixed top-0 w-full flex justify-between px-6 py-4 z-50 mix-blend-difference text-white opacity-50 hover:opacity-100 transition-opacity">
          <Link to="/" className="font-bold tracking-widest">TRYONYOU</Link>
          <div className="space-x-4 text-xs">
            <Link to="/demo">DEMO</Link>
            <Link to="/wardrobe">WARDROBE</Link>
          </div>
        </nav>

        {/* --- RUTAS DEL SISTEMA --- */}
        <Routes>
          {/* Ruta Principal: La Entrada */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta del Piloto: El Espejo Mágico (Cámara) */}
          <Route path="/demo" element={<VirtualMirror />} />
          
          {/* Ruta del Activo: El Armario (Donde vive el Token/Vestido) */}
          {/* AQUÍ SE ARREGLA EL BUG DE VISIBILIDAD */}
          <Route path="/wardrobe" element={<SmartWardrobe />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;