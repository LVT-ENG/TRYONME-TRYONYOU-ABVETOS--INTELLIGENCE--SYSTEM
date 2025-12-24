import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Configuración de Assets (Imágenes)
const ASSETS = {
  hero: "/assets/montana_pantalones.png",
  logo: "/assets/logo_tryonyou.png",
  trigger: "/assets/pau_blanco_chasquido.png",
  looks: [
    "/assets/look1.png",
    "/assets/look2.png",
    "/assets/look3.png"
  ]
};

export default function App() {
  const [look, setLook] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSnap = () => {
    setLoading(true);
    // Simula el "pensamiento" de la IA
    setTimeout(() => {
      setLook((prev) => (prev + 1) % ASSETS.looks.length);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#c5a059] selection:text-black">
      {/* NAV */}
      <nav className="flex justify-between items-center p-6 border-b border-white/10">
        <img src={ASSETS.logo} alt="TryOnYou" className="h-10 opacity-90" />
        <div className="flex items-center gap-2 text-[#00ff88] text-xs font-bold tracking-widest">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff88]"></span>
          </span>
          SYSTEM ONLINE
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative text-center py-16 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extralight mb-4 tracking-tight"
        >
          Lafayette <span className="text-[#c5a059] font-serif italic">Virtual Collection</span>
        </motion.h1>
        <p className="text-white/60 text-sm tracking-widest uppercase mb-12">Powered by Gemini Pro Vision</p>
        
        <div className="relative max-w-4xl mx-auto rounded-[30px] overflow-hidden border border-white/10 shadow-2xl shadow-[#c5a059]/10">
           {/* IMAGEN PRINCIPAL (Fondo) */}
           <img src={ASSETS.hero} className="w-full opacity-40 blur-sm absolute inset-0 h-full object-cover" alt="Ambiente" />
           
           <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 md:p-16 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent">
              
              {/* IZQUIERDA: EL CONTROL (PAU) */}
              <div className="flex flex-col items-center justify-center space-y-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSnap}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-[#c5a059] blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <img src={ASSETS.trigger} alt="Activar PAU" className="w-48 md:w-64 drop-shadow-2xl relative z-10" />
                  <p className="mt-4 text-[#c5a059] text-sm font-bold tracking-widest border-b border-[#c5a059] pb-1 inline-block">
                    {loading ? "ANALYZING..." : "TAP PAU TO TRY ON"}
                  </p>
                </motion.button>
              </div>

              {/* DERECHA: EL ESPEJO MÁGICO */}
              <div className="relative aspect-[3/4] bg-black/50 rounded-2xl border-2 border-[#c5a059]/50 overflow-hidden shadow-[0_0_50px_rgba(197,160,89,0.2)]">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={look}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    src={ASSETS.looks[look]} 
                    className="w-full h-full object-cover"
                    alt="Look Virtual"
                  />
                </AnimatePresence>
                
                {/* Overlay de Datos */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                   <div className="flex justify-between items-end">
                      <div>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest">Outfit ID</p>
                        <p className="text-white text-lg font-mono">LFT-{2024 + look}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#00ff88] text-xs font-bold">● MATCH 98%</p>
                      </div>
                   </div>
                </div>
              </div>

           </div>
        </div>
      </header>
    </div>
  );
}
