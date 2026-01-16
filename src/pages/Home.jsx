import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PilotSystem() {
  const [view, setView] = useState('landing'); 
  const gold = '#D3B26A';

  return (
    <div className="notranslate" style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'serif', textAlign: 'center', overflowX: 'hidden' }}>
      <AnimatePresence mode="wait">
        
        {/* 1. LANDING: PAU & ESPEJO (EL CHASQUIDO) */}
        {view === 'landing' && (
          <motion.div key="v1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <nav style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setView('scanner')} style={{ background: gold, color: '#000', border: 'none', padding: '10px 30px', fontWeight: 'bold', cursor: 'pointer' }}>ACCÉDER À LA DEMO</button>
            </nav>
            <div style={{ padding: '5vh 0' }}>
              <h1 style={{ letterSpacing: '12px', fontSize: '3rem', fontWeight: '200' }}>GALERIES LAFAYETTE</h1>
              <div style={{ margin: '40px auto', width: '320px', height: '480px', border: '1px solid #222', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: gold, padding: '20px' }}>[VÍDEO PAU: CHASQUIDO Y CAMBIO DE MODELO EN EL ESPEJO]</p>
              </div>
              <div style={{ background: '#111', padding: '25px', marginTop: '20px' }}>
                <p style={{ letterSpacing: '4px', fontSize: '0.9rem', opacity: 0.8 }}>BIOMÉTRIE • ÉLASTICITÉ • ZÉRO TAILLE</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. SCANNER CORPORAL */}
        {view === 'scanner' && (
          <motion.div key="v2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '280px', height: '480px', border: `2px solid ${gold}`, borderRadius: '140px 140px 0 0', position: 'relative', overflow: 'hidden' }}>
              <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ width: '100%', height: '3px', background: gold, boxShadow: `0 0 20px ${gold}`, position: 'absolute' }} 
              />
              <p style={{ marginTop: '200px', opacity: 0.3 }}>[CAPTURE BIOMÉTRIQUE...]</p>
            </div>
            <h2 style={{ color: gold, marginTop: '40px', letterSpacing: '5px' }}>SCAN EN COURS...</h2>
            <button onClick={() => setView('form')} style={{ marginTop: '20px', border: `1px solid ${gold}`, background: 'none', color: gold, padding: '10px 30px', cursor: 'pointer' }}>SUIVANT</button>
          </motion.div>
        )}

        {/* 3. QUESTIONNAIRE: TALLA, PESO, EVENTO */}
        {view === 'form' && (
          <motion.div key="v3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ paddingTop: '15vh' }}>
            <h2 style={{ color: gold, letterSpacing: '3px' }}>CONFIGURER JULES V7</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '350px', margin: '40px auto' }}>
              <input type="number" placeholder="Taille (cm)" style={{ background: 'none', border: '1px solid #333', padding: '20px', color: '#fff' }} />
              <input type="number" placeholder="Poids (kg)" style={{ background: 'none', border: '1px solid #333', padding: '20px', color: '#fff' }} />
              <select style={{ background: 'none', border: '1px solid #333', padding: '20px', color: '#fff' }}>
                <option>Occasion : Gala de Prestige</option>
                <option>Occasion : Business</option>
              </select>
              <button onClick={() => setView('result')} style={{ background: gold, color: '#000', padding: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>COMPARER AVEC LA BASE DE DONNÉES</button>
            </div>
          </motion.div>
        )}

        {/* 4/5/6. RESULTADO FINAL: ESPEJO INTELIGENTE CON LA PRENDA ADAPTADA */}
        {view === 'result' && (
          <motion.div key="v4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ paddingTop: '5vh' }}>
            <h2 style={{ color: gold, letterSpacing: '4px' }}>RÉSULTAT DU MIROIR INTELLIGENT</h2>
            <div style={{ position: 'relative', width: '320px', height: '550px', border: `1px solid ${gold}`, margin: '20px auto', borderRadius: '160px 160px 0 0', overflow: 'hidden', background: '#111' }}>
              {/* Imagen del cuerpo escaneado con la prenda proyectada encima */}
              <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ color: gold, fontSize: '0.8rem', marginBottom: '200px', opacity: 0.5 }}>[SILHOUETTE ADAPTÉE À LA PIÈCE]</div>
                <div style={{ position: 'absolute', bottom: '40px', background: 'rgba(0,0,0,0.8)', padding: '20px', width: '100%' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem' }}>ROBE DE SOIRÉE LAFAYETTE</h3>
                  <p style={{ color: gold, fontSize: '0.9rem', margin: '5px 0' }}>Ajustement : 99.8%</p>
                  <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>Analyse Jules V7 : Élasticité et chute optimales</p>
                </div>
              </div>
            </div>
            <button onClick={() => setView('landing')} style={{ background: 'none', border: 'none', color: '#fff', opacity: 0.3, textDecoration: 'underline', cursor: 'pointer', marginBottom: '40px' }}>REFAIRE UN SCAN</button>
          </motion.div>
        )}

      </AnimatePresence>
      <footer style={{ position: 'fixed', bottom: '15px', width: '100%', fontSize: '10px', opacity: 0.2 }}>
        PATENT PCT/EP2025/067317 | LVT-ENG © 2026
      </footer>
    </div>
  );
}
// Force Clear Cache viernes, 16 de enero de 2026, 16:13:24 CET
