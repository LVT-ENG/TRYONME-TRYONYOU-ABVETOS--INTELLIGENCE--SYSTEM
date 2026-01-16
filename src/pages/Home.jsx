import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CLAIMS = [
  { t: "Zéro Taille, Juste Vous.", d: "Oubliez les chiffres. Jules V7 se concentre sur l'harmonie unique de votre silhouette." },
  { t: "L'Élasticité Maîtrisée par IA.", d: "Calcul précis de la tension du textile pour un confort absolu et un ajustement sans faille." },
  { t: "Précision Biométrique Certifiée.", d: "Technologie protégée par le brevet PCT/EP2025/067317 garantissant une recommandation exacte." },
  { t: "La Chute Parfaite, Sans Mesures.", d: "Simulation en temps réel du drapé sur votre corps pour une élégance instantanée." },
  { t: "Dignité et Discrétion Totale.", d: "Aucune donnée sensible n'est affichée. Votre morphologie est traitée avec le plus grand respect." }
];

export default function Home() {
  const [view, setView] = useState('landing');
  const [claimIdx, setClaimIdx] = useState(0);
  const gold = '#D3B26A';

  useEffect(() => {
    if (view === 'landing') {
      const timer = setInterval(() => {
        setClaimIdx((prev) => (prev + 1) % CLAIMS.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [view]);

  return (
    <div className="notranslate" style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'serif', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
      <AnimatePresence mode="wait">
        
        {view === 'landing' && (
          <motion.div key="v1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingTop: '5vh' }}>
            <h1 style={{ letterSpacing: '12px', fontSize: '2.5rem', fontWeight: '200', textTransform: 'uppercase' }}>Galeries Lafayette</h1>
            <p style={{ fontStyle: 'italic', color: gold, marginTop: '-10px', fontSize: '1.2rem' }}>L'Intelligence Sur Mesure</p>
            
            <div style={{ margin: '30px auto', width: '280px', height: '420px', border: '1px solid #1a1a1a', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '140px 140px 0 0' }}>
               <p style={{ color: gold, fontSize: '0.7rem', opacity: 0.5 }}>[ VIDÉO PAU : LE DÉCLIC ]</p>
            </div>

            <div style={{ height: '100px', margin: '20px auto', maxWidth: '500px' }}>
              <AnimatePresence mode="wait">
                <motion.div key={claimIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.8 }}>
                  <h3 style={{ color: gold, letterSpacing: '3px', margin: '0 0 10px 0', fontSize: '1rem' }}>{CLAIMS[claimIdx].t}</h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.6, padding: '0 40px', lineHeight: '1.4' }}>{CLAIMS[claimIdx].d}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button onClick={() => setView('scanner')} style={{ background: '#fff', color: '#000', border: 'none', padding: '18px 50px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '4px', marginTop: '10px' }}>
              ACCÉDER À LA DEMO
            </button>
          </motion.div>
        )}

        {view === 'scanner' && (
          <motion.div key="v2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '260px', height: '460px', border: `2px solid ${gold}`, borderRadius: '130px 130px 0 0', position: 'relative', overflow: 'hidden' }}>
              <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ width: '100%', height: '3px', background: gold, boxShadow: `0 0 25px ${gold}`, position: 'absolute' }} />
            </div>
            <h2 style={{ color: gold, marginTop: '40px', letterSpacing: '6px', fontWeight: '200' }}>ANALYSE EN COURS...</h2>
            <button onClick={() => setView('landing')} style={{ marginTop: '20px', background: 'none', border: `1px solid ${gold}`, color: gold, padding: '8px 20px', cursor: 'pointer', fontSize: '0.7rem' }}>ANNULER</button>
          </motion.div>
        )}

      </AnimatePresence>
      <footer style={{ position: 'fixed', bottom: '20px', width: '100%', fontSize: '10px', opacity: 0.3, letterSpacing: '2px' }}>
        BREVET PCT/EP2025/067317 | LVT-ENG © 2026
      </footer>
    </div>
  );
}
