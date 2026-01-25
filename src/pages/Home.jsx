import React, { useState } from 'react';

export default function LafayettePilot() {
  const [step, setStep] = useState('landing');

  return (
    <div style={{ backgroundColor: '#001A33', color: '#D4AF37', minHeight: '100vh', fontFamily: 'serif' }}>
      {step === 'landing' ? (
        <div onClick={() => setStep('scan')} style={{ cursor: 'pointer', textAlign: 'center', paddingTop: '20vh' }}>
          <h1 style={{ letterSpacing: '8px' }}>GALERIES LAFAYETTE</h1>
          <p>EXPERIENCE DIVINEO BY JULES</p>
          <div style={{ marginTop: '50px', border: '1px solid #D4AF37', display: 'inline-block', padding: '20px' }}>
             [ VÍDEO PAU: CHASQUIDO ]
          </div>
          <p style={{ marginTop: '30px' }}>CLIQUEZ POUR COMMENCER</p>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>MIROIR BIOMÉTRIQUE ACTIF</h2>
          <div style={{ width: '100%', height: '400px', background: '#000', borderRadius: '100px', border: '2px solid #D4AF37' }}>
             {/* Aquí se cargará la cámara local */}
             <p style={{ paddingTop: '180px' }}>FLUX VIDÉO EN DIRECT...</p>
          </div>
          <button style={{ marginTop: '30px', background: '#D4AF37', color: '#001A33', padding: '15px 30px', border: 'none' }}>
            OBTENIR MA COUPE PARFAITE
          </button>
        </div>
      )}
    </div>
  );
}
