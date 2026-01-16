import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PilotSystem() {
  const [view, setView] = useState('landing'); 
  const gold = '#D3B26A';

  return (
    <div className="notranslate" style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'serif', textAlign: 'center', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div key="v1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingTop: '10vh' }}>
            <h1 style={{ letterSpacing: '12px', fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: '200', textTransform: 'uppercase' }}>Galeries Lafayette</h1>
            <p style={{ fontStyle: 'italic', color: gold, fontSize: '1.2rem', marginTop: '10px' }}>L'Intelligence Sur Mesure</p>
            <div style={{ margin: '40px auto', width: '280px', height: '420px', border: '1px solid #1a1a1a', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '140px 140px 0 0' }}>
               <p style={{ color: gold, fontSize: '0.7rem', opacity: 0.5 }}>JULES V7 : SYSTÈME BIOMÉTRIQUE ACTIF</p>
            </div>
            <button onClick={() => setView('scanner')} style={{ background: '#fff', color: '#000', border: 'none', padding: '18px 50px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '4px', transition: '0.3s' }}>
              LANCER L'EXPÉRIENCE
            </button>
          </motion.div>
        ) : (
          <motion.div key="v2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '260px', height: '460px', border: `2px solid ${gold}`, borderRadius: '130px 130px 0 0', position: 'relative', overflow: 'hidden' }}>
              <motion.div animate={{ top: ['5%', '95%', '5%'] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: '100%', height: '3px', background: gold, boxShadow: `0 0 25px ${gold}`, position: 'absolute' }} />
            </div>
            <h2 style={{ color: gold, marginTop: '40px', letterSpacing: '6px', fontWeight: '200' }}>ANALYSE EN COURS...</h2>
            <button onClick={() => setView('landing')} style={{ background: 'none', border: `1px solid ${gold}`, color: gold, padding: '8px 20px', cursor: 'pointer', fontSize: '0.7rem', marginTop: '20px' }}>ANNULER</button>
          </motion.div>
        )}
      </AnimatePresence>
      <footer style={{ position: 'fixed', bottom: '20px', width: '100%', fontSize: '10px', opacity: 0.3, letterSpacing: '2px' }}>
        PROTÉGÉ PAR BREVET PCT/EP2025/067317 | LVT-ENG © 2026
      </footer>
    </div>
  );
}
