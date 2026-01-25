import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagicMirror from '../components/MagicMirror';

export default function PilotSystem() {
  const [view, setView] = useState('landing'); 
  const [occasion, setOccasion] = useState('event');
  const [preference, setPreference] = useState('regular');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const gold = '#D3B26A';

  // Mock measurements for the "Zero Size" experience
  const mockMeasurements = {
    height: 170,
    chest: 90,
    waist: 75,
    hip: 100,
    shoulder_width: 42,
    arm_length: 60,
    leg_length: 85,
    torso_length: 50,
    weight: 60
  };

  const handleAnalysis = async () => {
    setLoading(true);
    try {
      // Jules V7: Backend Handshake with Security Token
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-divineo-token': 'Divineo_Lafayette_Secure_70_2026_Alpha'
        },
        body: JSON.stringify({
          height: mockMeasurements.height,
          weight: mockMeasurements.weight,
          event: occasion,
          landmarks: null // Optional, handled by MagicMirror internally for visual but not sent here yet
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setRecommendation({
        garment_name: data.product_name,
        fit_score: 99.8, // Static for this pilot phase or derived if backend sent it
        explanation: data.jules_narrative,
        material: data.fabric_analysis
      });
      setView('result');
    } catch (error) {
      console.error("Analysis failed:", error);
      // Fallback for demo if API fails (Network error, etc)
      setRecommendation({
        garment_name: "Divineo Signature Blazer",
        fit_score: 99.8,
        explanation: "System Offline. Using Backup Protocol. Perfect structural match.",
        material: "Silk Blend"
      });
      setView('result');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notranslate" style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'serif', textAlign: 'center', overflowX: 'hidden', position: 'relative' }}>

      {/* BACKGROUND: MAGIC MIRROR (Active from Scanner onwards) */}
      {view !== 'landing' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <MagicMirror mode={view === 'result' ? 'result' : 'scan'} />
        </div>
      )}

      {/* FOREGROUND: UI */}
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">

          {/* 1. LANDING */}
          {view === 'landing' && (
            <motion.div key="v1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ pointerEvents: 'auto', width: '100%' }}>
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

          {/* 2. SCANNER CORPORAL (Overlay) */}
          {view === 'scanner' && (
            <motion.div key="v2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ pointerEvents: 'auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '280px', height: '550px', border: `2px solid ${gold}`, borderRadius: '140px 140px 0 0', position: 'relative', overflow: 'hidden' }}>
                <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ width: '100%', height: '3px', background: gold, boxShadow: `0 0 20px ${gold}`, position: 'absolute' }}
                />
                <p style={{ marginTop: '200px', opacity: 0.8, textShadow: '0 2px 4px #000' }}>[CAPTURE BIOMÉTRIQUE...]</p>
              </div>
              <h2 style={{ color: gold, marginTop: '20px', letterSpacing: '5px', textShadow: '0 2px 10px #000' }}>SCAN EN COURS...</h2>
              <button onClick={() => setView('form')} style={{ marginTop: '20px', border: `1px solid ${gold}`, background: 'rgba(0,0,0,0.5)', color: gold, padding: '10px 30px', cursor: 'pointer', backdropFilter: 'blur(5px)' }}>SUIVANT</button>
            </motion.div>
          )}

          {/* 3. CONTEXTUAL INPUTS (Zero Size) */}
          {view === 'form' && (
            <motion.div key="v3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ pointerEvents: 'auto', width: '100%', paddingTop: '15vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ color: gold, letterSpacing: '3px', textShadow: '0 2px 10px #000' }}>VOTRE STYLE</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px', margin: '40px auto' }}>

                {/* Occasion Selector */}
                <div style={{ background: 'rgba(0,0,0,0.7)', padding: '20px', border: '1px solid #333' }}>
                  <label style={{ display: 'block', marginBottom: '10px', color: gold }}>OCCASION</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    style={{ width: '100%', background: 'none', border: '1px solid #555', padding: '10px', color: '#fff' }}
                  >
                    <option value="event">Gala / Soirée</option>
                    <option value="work">Business / Pro</option>
                    <option value="casual">Quotidien / Chic</option>
                    <option value="ceremony">Cérémonie</option>
                  </select>
                </div>

                {/* Preference Selector */}
                <div style={{ background: 'rgba(0,0,0,0.7)', padding: '20px', border: '1px solid #333' }}>
                  <label style={{ display: 'block', marginBottom: '10px', color: gold }}>PRÉFÉRENCE</label>
                  <select
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    style={{ width: '100%', background: 'none', border: '1px solid #555', padding: '10px', color: '#fff' }}
                  >
                    <option value="slim">Ajusté (Fitted)</option>
                    <option value="regular">Confortable (Regular)</option>
                    <option value="relaxed">Fluide (Relaxed)</option>
                  </select>
                </div>

                <button onClick={handleAnalysis} disabled={loading} style={{ background: gold, color: '#000', padding: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                  {loading ? 'ANALYSE...' : 'DÉCOUVRIR MA SÉLECTION'}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* 4. RESULT (Magic Mirror + Overlay) */}
        {view === 'result' && recommendation && (
            <motion.div key="v4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ pointerEvents: 'auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '40px' }}>

              <div style={{ margin: '0 auto', width: '90%', maxWidth: '400px', background: 'rgba(5,5,5,0.8)', borderTop: `4px solid ${gold}`, padding: '20px', backdropFilter: 'blur(10px)' }}>
                <div style={{ color: gold, fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '10px' }}>CURATED SELECTION</div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>{recommendation.garment_name || "Signature Piece"}</h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '15px 0', borderTop: '1px solid #333', borderBottom: '1px solid #333', padding: '10px 0' }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>VIRTUAL FIT</div>
                    <div style={{ color: gold, fontSize: '1.2rem', fontWeight: 'bold' }}>PERFECT</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                     <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>MATERIAL</div>
                     <div>{recommendation.material || "Premium Fabric"}</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', opacity: 0.8, fontStyle: 'italic' }}>
                  "{recommendation.explanation || "Selected for your unique biometrics."}"
                </p>

                <button onClick={() => setView('landing')} style={{ background: 'none', border: '1px solid #555', color: '#fff', padding: '10px 20px', marginTop: '15px', fontSize: '0.8rem', cursor: 'pointer' }}>NOUVEAU SCAN</button>
              </div>

            </motion.div>
          )}

      </div>

      <footer style={{ position: 'fixed', bottom: '15px', width: '100%', fontSize: '10px', opacity: 0.5, zIndex: 20 }}>
        PATENT PCT/EP2025/067317 | LVT-ENG © 2026
      </footer>
    </div>
  );
}
