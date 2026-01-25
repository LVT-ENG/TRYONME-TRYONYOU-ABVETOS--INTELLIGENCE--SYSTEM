import React, { useState } from 'react';

export default function LafayettePilot() {
  const [step, setStep] = useState('landing');
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      // Use the token from environment variables
      const token = import.meta.env.REACT_APP_DIVINEO_TOKEN;

      // Mock Biometric Data (Zero Size Protocol)
      const payload = {
        h: 170.0,
        w: 60.0,
        e: "gala",
        m: [
          { x: 0.5, y: 0.2, z: -0.15 }, // Mock Landmark 1
          { x: 0.52, y: 0.22, z: -0.14 }, // Mock Landmark 2
          { x: 0.54, y: 0.22, z: -0.14 }, // Mock Landmark 3
          { x: 0.56, y: 0.22, z: -0.14 }, // Mock Landmark 4
          { x: 0.48, y: 0.22, z: -0.14 }  // Mock Landmark 5
        ]
      };

      const response = await fetch('/api/v1/internal/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Divineo-Token': token || ''
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Error: ${response.status} ${errText}`);
      }

      const data = await response.json();
      alert(`SÉLECTION DIVINEO:\n\nModèle: ${data.match}\nPhysique: ${data.physics}\n\n${data.narrative}`);

    } catch (error) {
      console.error(error);
      alert('Erreur de calcul biométrique: ' + error.message + '\n\nEnsure env vars are set.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#001A33', color: '#D4AF37', minHeight: '100vh', fontFamily: 'serif', textAlign: 'center' }}>
      {/* HEADER DE LUJO */}
      <header style={{ padding: '40px 0', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <h1 style={{ letterSpacing: '8px', margin: 0 }}>GALERIES LAFAYETTE</h1>
        <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>DIVINEO EXPERIENCE • PARIS</p>
      </header>

      {step === 'landing' ? (
        <main style={{ padding: '10vh 20px' }}>
          <div onClick={() => setStep('scan')} style={{ cursor: 'pointer' }}>
            <div style={{ margin: '0 auto', width: '300px', height: '400px', border: '1px solid #D4AF37', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <p style={{ position: 'absolute', top: '10px' }}>[ VIDEO PAU SNAP ]</p>
               <span style={{ fontSize: '3rem' }}>✨</span>
            </div>
            <h2 style={{ marginTop: '40px', fontWeight: '300' }}>RÉVÉLEZ VOTRE SILHOUETTE</h2>
            <p style={{ color: 'rgba(212, 175, 55, 0.7)' }}>Cliquez pour activer le miroir biométrique</p>
          </div>
        </main>
      ) : (
        <main style={{ padding: '40px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ width: '100%', height: '60vh', background: '#000', borderRadius: '150px 150px 0 0', border: '2px solid #D4AF37', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <div className="pulse" style={{ width: '100px', height: '100px', border: '2px solid #D4AF37', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                  <p style={{ marginTop: '20px', letterSpacing: '2px' }}>
                    {loading ? 'CALCUL DU FIT...' : 'ANALYSE EN COURS...'}
                  </p>
               </div>
            </div>
            <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '30px', border: '2px solid #D4AF37', borderTop: 'none' }}>
               <button
                 onClick={handleCalculate}
                 disabled={loading}
                 style={{ background: '#D4AF37', color: '#001A33', border: 'none', padding: '15px 40px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', width: '100%', opacity: loading ? 0.7 : 1 }}>
                 {loading ? 'TRAITEMENT...' : 'DÉCOUVRIR MA SÉLECTION PERSONNALISÉE'}
               </button>
            </div>
          </div>
        </main>
      )}

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
