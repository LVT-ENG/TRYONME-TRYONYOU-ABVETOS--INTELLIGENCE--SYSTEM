import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTENT = {
  fr: { title: "Galeries Lafayette", subtitle: "L'Intelligence Sur Mesure", btn: "ACCÉDER À LA DEMO" },
  en: { title: "Galeries Lafayette", subtitle: "Intelligence Tailored for You", btn: "START EXPERIENCE" },
  es: { title: "Galeries Lafayette", subtitle: "Inteligencia a Medida", btn: "ACCEDER A LA DEMO" }
};

export default function Home() {
  const [lang, setLang] = useState('fr');
  const [view, setView] = useState('landing');
  const gold = '#D3B26A';

  return (
    <div className="notranslate" style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', textAlign: 'center', fontFamily: 'serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* HEADER: LOGOS INTEGRADOS */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px 50px', position: 'absolute', width: '100%', zIndex: 50, boxSizing: 'border-box' }}>
        <img src="/assets/branding/tryonyou_logo.png" alt="TRYONYOU" style={{ height: '25px', filter: 'brightness(1.2)' }} onError={(e) => e.target.style.display='none'} />
        <div style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>
          {['fr', 'en', 'es'].map(l => (
            <span key={l} onClick={() => setLang(l)} style={{ margin: '0 10px', cursor: 'pointer', color: lang === l ? gold : '#444', transition: '0.3s' }}>
              {l.toUpperCase()}
            </span>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div key="v1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingTop: '15vh' }}>
            
            {/* LOGO CLIENTE & TITULAR */}
            <h1 style={{ letterSpacing: '15px', fontSize: '2.8rem', textTransform: 'uppercase', margin: '0 0 10px 0', fontWeight: '300' }}>
              {CONTENT[lang].title}
            </h1>
            <p style={{ fontStyle: 'italic', color: gold, fontSize: '1.3rem', marginBottom: '40px', fontWeight: '100' }}>
              {CONTENT[lang].subtitle}
            </p>
            
            {/* MULTIMEDIA: EL CHASQUIDO DE PAU (VIDEO) */}
            <div style={{ margin: '0 auto 40px', width: '300px', height: '450px', border: '1px solid #1a1a1a', background: '#000', borderRadius: '150px 150px 0 0', overflow: 'hidden', boxShadow: `0 0 40px ${gold}15` }}>
               <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                 <source src="/assets/videos/pau_snap.mp4" type="video/mp4" />
                 <div style={{ paddingTop: '200px', color: gold, fontSize: '0.7rem' }}>[ JULES V7 ENGINE ACTIVE ]</div>
               </video>
            </div>

            <button onClick={() => setView('scanner')} style={{ background: '#fff', color: '#000', border: 'none', padding: '20px 60px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '5px', transition: '0.4s' }}>
              {CONTENT[lang].btn}
            </button>

          </motion.div>
        ) : (
          <motion.div key="v2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* SCANNER CON IDENTIDAD VISUAL */}
            <div style={{ position: 'relative', width: '280px', height: '480px', border: `1px solid ${gold}`, borderRadius: '140px 140px 0 0', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'url(/assets/branding/pattern.png)' }}></div>
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: '100%', height: '2px', background: gold, position: 'absolute', boxShadow: `0 0 30px ${gold}`, zIndex: 10 }} 
              />
              <img src="/assets/branding/pau_mascot.png" style={{ width: '100px', marginTop: '150px', opacity: 0.2, filter: 'grayscale(1)' }} alt="" />
            </div>
            
            <h2 style={{ color: gold, marginTop: '40px', letterSpacing: '8px', fontWeight: '200', textTransform: 'uppercase' }}>
              {lang === 'fr' ? 'Analyse Biométrique' : lang === 'es' ? 'Análisis Biométrico' : 'Biometric Analysis'}
            </h2>
            <button onClick={() => setView('landing')} style={{ background: 'none', border: 'none', color: '#fff', opacity: 0.3, marginTop: '20px', cursor: 'pointer', fontSize: '0.7rem' }}>ANNULER</button>

          </motion.div>
        )}
      </AnimatePresence>

      {/* PIE DE PÁGINA LEGAL */}
      <footer style={{ position: 'fixed', bottom: '25px', width: '100%', fontSize: '10px', opacity: 0.4, letterSpacing: '3px', fontWeight: '100' }}>
        BREVET PCT/EP2025/067317 PROTECTED | LVT-ENG © 2026
      </footer>
    </div>
  );
}
