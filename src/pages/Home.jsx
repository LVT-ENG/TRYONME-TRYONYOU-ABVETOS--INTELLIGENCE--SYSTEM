import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [view, setView] = useState('landing'); // landing -> scanner -> result

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', textAlign: 'center', fontFamily: 'serif' }}>
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 style={{ letterSpacing: '10px', paddingTop: '10vh' }}>GALERIES LAFAYETTE</h1>
            <p style={{ fontStyle: 'italic', color: '#D3B26A' }}>L'Intelligence Sur Mesure</p>
            <div style={{ margin: '40px auto', width: '300px', height: '400px', border: '1px solid #222', background: '#111' }}>
              <p style={{ paddingTop: '180px', color: '#D3B26A' }}>[VÍDEO PAU: CHASQUIDO]</p>
            </div>
            <button onClick={() => setView('scanner')} style={{ background: '#fff', color: '#000', padding: '15px 40px', cursor: 'pointer', fontWeight: 'bold' }}>
              LANCER LA DEMO
            </button>
          </motion.div>
        ) : (
          <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ paddingTop: '10vh', letterSpacing: '5px' }}>ANALYSE BIOMÉTRIQUE V7</h2>
            <div style={{ width: '250px', height: '400px', border: '2px solid #D3B26A', margin: '20px auto', borderRadius: '120px 120px 0 0', overflow: 'hidden' }}>
              <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity }}
                          style={{ width: '100%', height: '2px', background: '#D3B26A', position: 'relative' }} />
            </div>
            <p>Calcul de l'élasticité et chute du tissu...</p>
          </motion.div>
        )}
      </AnimatePresence>
      <footer style={{ position: 'fixed', bottom: '20px', width: '100%', fontSize: '10px', opacity: 0.3 }}>
        PATENT PCT/EP2025/067317 | LVT-ENG © 2026
      </footer>
    </div>
  );
}
