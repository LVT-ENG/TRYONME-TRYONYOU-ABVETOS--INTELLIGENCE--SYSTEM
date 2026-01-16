import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTENT = {
  fr: { title: "Galeries Lafayette", subtitle: "L'Intelligence Sur Mesure", btn: "ACCÉDER À LA DEMO" },
  en: { title: "Galeries Lafayette", subtitle: "Intelligence Tailored for You", btn: "START EXPERIENCE" },
  es: { title: "Galeries Lafayette", subtitle: "Inteligencia a Medida", btn: "ACCEDER A LA DEMO" }
};

const GOLD = '#D3B26A';

const STYLES = {
  container: { backgroundColor: '#050505', color: '#fff', minHeight: '100vh', textAlign: 'center', fontFamily: 'serif', position: 'relative', overflow: 'hidden' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px 50px', position: 'absolute', width: '100%', zIndex: 50, boxSizing: 'border-box' },
  logo: { height: '25px', filter: 'brightness(1.2)' },
  langContainer: { fontSize: '0.7rem', letterSpacing: '2px' },
  langItem: { margin: '0 10px', cursor: 'pointer', transition: '0.3s' },
  landingContainer: { paddingTop: '15vh' },
  h1: { letterSpacing: '15px', fontSize: '2.8rem', textTransform: 'uppercase', margin: '0 0 10px 0', fontWeight: '300' },
  subtitle: { fontStyle: 'italic', color: GOLD, fontSize: '1.3rem', marginBottom: '40px', fontWeight: '100' },
  videoContainer: { margin: '0 auto 40px', width: '300px', height: '450px', border: '1px solid #1a1a1a', background: '#000', borderRadius: '150px 150px 0 0', overflow: 'hidden', boxShadow: `0 0 40px ${GOLD}15` },
  video: { width: '100%', height: '100%', objectFit: 'cover' },
  videoOverlay: { paddingTop: '200px', color: GOLD, fontSize: '0.7rem' },
  button: { background: '#fff', color: '#000', border: 'none', padding: '20px 60px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '5px', transition: '0.4s' },
  scannerContainer: { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  scannerBox: { position: 'relative', width: '280px', height: '480px', border: `1px solid ${GOLD}`, borderRadius: '140px 140px 0 0', overflow: 'hidden' },
  scannerPattern: { position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'url(/assets/branding/pattern.png)' },
  scannerLine: { width: '100%', height: '2px', background: GOLD, position: 'absolute', boxShadow: `0 0 30px ${GOLD}`, zIndex: 10 },
  scannerMascot: { width: '100px', marginTop: '150px', opacity: 0.2, filter: 'grayscale(1)' },
  scannerTitle: { color: GOLD, marginTop: '40px', letterSpacing: '8px', fontWeight: '200', textTransform: 'uppercase' },
  cancelBtn: { background: 'none', border: 'none', color: '#fff', opacity: 0.3, marginTop: '20px', cursor: 'pointer', fontSize: '0.7rem' },
  footer: { position: 'fixed', bottom: '25px', width: '100%', fontSize: '10px', opacity: 0.4, letterSpacing: '3px', fontWeight: '100' }
};

const LanguageSelector = memo(({ currentLang, setLang }) => (
  <div style={STYLES.langContainer}>
    {['fr', 'en', 'es'].map(l => (
      <span
        key={l}
        onClick={() => setLang(l)}
        style={{
          ...STYLES.langItem,
          color: currentLang === l ? GOLD : '#444'
        }}
      >
        {l.toUpperCase()}
      </span>
    ))}
  </div>
));

export default function Home() {
  const [lang, setLang] = useState('fr');
  const [view, setView] = useState('landing');

  return (
    <div className="notranslate" style={STYLES.container}>
      
      {/* HEADER: LOGOS INTEGRADOS */}
      <header style={STYLES.header}>
        <img src="/assets/branding/tryonyou_logo.png" alt="TRYONYOU" style={STYLES.logo} onError={(e) => e.target.style.display='none'} />
        <LanguageSelector currentLang={lang} setLang={setLang} />
      </header>

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div key="v1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={STYLES.landingContainer}>
            
            {/* LOGO CLIENTE & TITULAR */}
            <h1 style={STYLES.h1}>
              {CONTENT[lang].title}
            </h1>
            <p style={STYLES.subtitle}>
              {CONTENT[lang].subtitle}
            </p>
            
            {/* MULTIMEDIA: EL CHASQUIDO DE PAU (VIDEO) */}
            <div style={STYLES.videoContainer}>
               <video autoPlay loop muted playsInline style={STYLES.video}>
                 <source src="/assets/videos/pau_snap.mp4" type="video/mp4" />
                 <div style={STYLES.videoOverlay}>[ JULES V7 ENGINE ACTIVE ]</div>
               </video>
            </div>

            <button onClick={() => setView('scanner')} style={STYLES.button}>
              {CONTENT[lang].btn}
            </button>

          </motion.div>
        ) : (
          <motion.div key="v2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={STYLES.scannerContainer}>
            
            {/* SCANNER CON IDENTIDAD VISUAL */}
            <div style={STYLES.scannerBox}>
              <div style={STYLES.scannerPattern}></div>
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={STYLES.scannerLine}
              />
              <img src="/assets/branding/pau_mascot.png" style={STYLES.scannerMascot} alt="" />
            </div>
            
            <h2 style={STYLES.scannerTitle}>
              {lang === 'fr' ? 'Analyse Biométrique' : lang === 'es' ? 'Análisis Biométrico' : 'Biometric Analysis'}
            </h2>
            <button onClick={() => setView('landing')} style={STYLES.cancelBtn}>ANNULER</button>

          </motion.div>
        )}
      </AnimatePresence>

      {/* PIE DE PÁGINA LEGAL */}
      <footer style={STYLES.footer}>
        BREVET PCT/EP2025/067317 PROTECTED | LVT-ENG © 2026
      </footer>
    </div>
  );
}
