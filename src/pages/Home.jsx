import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const s = {
    hero: { position: 'relative', height: '100vh', width: '100vw', backgroundColor: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'serif' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: 1, filter: 'grayscale(100%)' },
    overlay: { position: 'relative', zIndex: 10, textAlign: 'center', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    btn: { background: '#fff', color: '#000', border: 'none', padding: '20px 50px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '4px', cursor: 'pointer', marginTop: '30px', textTransform: 'uppercase' },
    link: { color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.7rem', marginTop: '20px', display: 'inline-block', cursor: 'pointer', letterSpacing: '2px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '2px' }
  };
  return (
    <div style={s.hero}>
      <video autoPlay loop muted playsInline style={s.video}><source src="/assets/hero/hero_main.mp4" type="video/mp4" /></video>
      <div style={s.overlay}>
        <div style={{fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '20px', opacity: 0.8, color: '#4285F4'}}>POWERED BY GOOGLE PLATFORM</div>
        <h1 style={{fontSize:'4rem', margin:0, letterSpacing: '5px'}}>GALERIES LAFAYETTE</h1>
        <h2 style={{fontSize:'2rem', fontWeight:'200', fontStyle:'italic', marginTop:'10px'}}>L'Intelligence Sur Mesure</h2>

        <button style={s.btn} onClick={() => navigate('/demo')}>Lancer l'Expérience</button>

        <button onClick={() => navigate('/google-news')} style={s.link}>
          See Platform News
        </button>
      </div>
      <footer style={{position:'absolute', bottom:20, width:'100%', textAlign:'center', fontSize:'10px', opacity:0.5, letterSpacing:'2px'}}>
        PROTÉGÉ PAR BREVET PCT/EP2025/067317 | LVT-ENG © 2026
      </footer>
    </div>
  );
}
