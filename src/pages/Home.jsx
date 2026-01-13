import React from 'react';
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const s = {
    hero: { position: 'relative', height: '100vh', width: '100vw', backgroundColor: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'serif' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: 1, filter: 'grayscale(100%)' },
    overlay: { position: 'relative', zIndex: 10, textAlign: 'center', padding: '20px' },
    btn: { background: '#fff', color: '#000', border: 'none', padding: '20px 50px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '4px', cursor: 'pointer', marginTop: '30px', textTransform: 'uppercase' }
  };
  return (
    <div style={s.hero}>
      <video autoPlay loop muted playsInline style={s.video}><source src="/assets/hero/hero_main.mp4" type="video/mp4" /></video>
      <div style={s.overlay}>
        <h1 style={{fontSize:'4rem', margin:0, letterSpacing: '5px'}}>GALERIES LAFAYETTE</h1>
        <h2 style={{fontSize:'2rem', fontWeight:'200', fontStyle:'italic', marginTop:'10px'}}>L'Intelligence Sur Mesure</h2>
        <button style={s.btn} onClick={() => setLocation('/demo')}>Lancer l'Expérience</button>
      </div>
      <footer style={{position:'absolute', bottom:20, width:'100%', textAlign:'center', fontSize:'10px', opacity:0.5, letterSpacing:'2px'}}>
        PROTÉGÉ PAR BREVET PCT/EP2025/067317 | LVT-ENG © 2026
      </footer>
    </div>
  );
}
// Force Clear Cache martes, 13 de enero de 2026, 17:40:33 CET
