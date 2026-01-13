import React from 'react';
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  const s = {
    hero: { position: 'relative', height: '100vh', width: '100vw', backgroundColor: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: 1, filter: 'grayscale(100%)' },
    overlay: { position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', fontFamily: 'serif', padding: '20px' },
    nav: { position: 'absolute', top: 0, width: '100%', display: 'flex', justifyContent: 'space-between', padding: '40px 60px', zIndex: 100, boxSizing: 'border-box', letterSpacing: '4px' },
    btn: { background: '#fff', color: '#000', border: 'none', padding: '20px 50px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '4px', cursor: 'pointer', marginTop: '30px', textTransform: 'uppercase' },
    footer: { position: 'absolute', bottom: 30, width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 60px', fontSize: '10px', color: '#666', zIndex: 10, boxSizing: 'border-box', letterSpacing: '2px' }
  };

  return (
    <div style={s.hero}>
      <nav style={s.nav}>
        <div style={{fontWeight:'bold'}}>GALERIES LAFAYETTE</div>
        <div style={{fontSize:'10px'}}>HAUTE COUTURE BIOMÉTRIQUE</div>
      </nav>

      <video autoPlay loop muted playsInline style={s.video}>
        <source src="/assets/hero/hero_main.mp4" type="video/mp4" />
      </video>

      <div style={s.overlay}>
        <h1 style={{fontSize:'clamp(3rem, 8vw, 5rem)', fontWeight:'200', margin:0}}>L'Intelligence</h1>
        <h1 style={{fontSize:'clamp(3rem, 8vw, 5rem)', fontWeight:'200', fontStyle:'italic', marginTop:'-10px'}}>Sur Mesure</h1>
        <p style={{opacity:0.7, maxWidth:'500px', margin:'20px auto', lineHeight:'1.6'}}>Découvrez la perfection biométrique. Sans chiffres, sans tailles, juste votre silhouette magnifiée.</p>
        <button style={s.btn} onClick={() => setLocation('/demo')}>Lancer l'Expérience</button>
      </div>

      <footer style={s.footer}>
        <div>LVT-ENG / TRYONYOU © 2026</div>
        <div>BREVET PCT/EP2025/067317</div>
      </footer>
    </div>
  );
}
