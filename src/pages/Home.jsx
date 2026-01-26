import React, { useState } from 'react';
import MagicMirror from '../components/MagicMirror';

export default function LafayettePilot() {
  const [step, setStep] = useState('landing'); // landing, video, scan
  const [snapTriggered, setSnapTriggered] = useState(false);
  const [language, setLanguage] = useState('FR');

  const TEXTS = {
    FR: {
      title: "GALERIES LAFAYETTE",
      subtitle: "EXPERIENCE DIVINEO BY JULES",
      start: "CLIQUEZ POUR COMMENCER",
      video_placeholder: "PAU SE PRÉPARE...",
      mirror_title: "MIROIR BIOMÉTRIQUE ACTIF",
      button_scan: "OBTENIR MA COUPE PARFAITE"
    },
    ES: {
      title: "GALERIES LAFAYETTE",
      subtitle: "EXPERIENCIA DIVINEO POR JULES",
      start: "HAGA CLIC PARA COMENZAR",
      video_placeholder: "PAU SE ESTÁ PREPARANDO...",
      mirror_title: "ESPEJO BIOMÉTRICO ACTIVO",
      button_scan: "OBTENER MI CORTE PERFECTO"
    }
  };

  const t = TEXTS[language];

  const handleStart = () => {
    setStep('video');
    // Simulate Video Playback and Snap
    setTimeout(() => {
      // THE SNAP HAPPENS HERE (Simulated after 2.5s)
      setSnapTriggered(true);
      setStep('scan');
    }, 2500);
  };

  return (
    <div style={{ backgroundColor: '#001A33', color: '#D4AF37', minHeight: '100vh', fontFamily: 'serif', overflow: 'hidden', position: 'relative' }}>

      {/* Language Toggle */}
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100 }}>
        <button onClick={() => setLanguage('FR')} style={{ background: 'none', border: language === 'FR' ? '1px solid #D4AF37' : 'none', color: '#D4AF37', marginRight: 10, cursor: 'pointer', padding: '5px' }}>FR</button>
        <button onClick={() => setLanguage('ES')} style={{ background: 'none', border: language === 'ES' ? '1px solid #D4AF37' : 'none', color: '#D4AF37', cursor: 'pointer', padding: '5px' }}>ES</button>
      </div>

      {step === 'landing' && (
        <div onClick={handleStart} style={{ cursor: 'pointer', textAlign: 'center', paddingTop: '20vh' }}>
          <h1 style={{ letterSpacing: '8px', fontSize: '3rem', margin: '0 20px' }}>{t.title}</h1>
          <p style={{ letterSpacing: '2px' }}>{t.subtitle}</p>
          <div style={{ marginTop: '50px', border: '1px solid #D4AF37', display: 'inline-block', padding: '40px', width: '300px', background: 'rgba(0,0,0,0.3)' }}>
             <div style={{ fontSize: '40px', marginBottom: '10px' }}>▶</div>
             <p>[ {t.video_placeholder} ]</p>
          </div>
          <p style={{ marginTop: '30px', animation: 'pulse 2s infinite' }}>{t.start}</p>
          <style>{`@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }`}</style>
        </div>
      )}

      {step === 'video' && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
           <h2 style={{ fontSize: '2rem', textAlign: 'center' }}>"Bienvenue chez Lafayette..."</h2>
           <p style={{ fontStyle: 'italic', marginTop: 20, color: '#FFF' }}>* CLACK * (Le Chasquido)</p>
           {/* Visual cue for the snap */}
           <div style={{
             width: '50%', height: '2px', background: '#D4AF37', marginTop: 40,
             animation: 'load 2.5s linear'
           }} />
           <style>{`@keyframes load { from { width: 0% } to { width: 50% } }`}</style>
        </div>
      )}

      {step === 'scan' && (
        <div style={{ height: '100vh', position: 'relative' }}>
          <MagicMirror
            mode="scan"
            snapTriggered={snapTriggered}
            language={language}
            onScanComplete={() => console.log("Scan complete")}
          />
        </div>
      )}
    </div>
  );
}
