import React, { useState, useRef } from 'react';
import MagicMirror from '../components/MagicMirror';

export default function LafayettePilot() {
  const [step, setStep] = useState('landing');
  const [result, setResult] = useState(null);
  const landmarksRef = useRef(null);

  const onLandmarksDetected = (landmarks) => {
    landmarksRef.current = landmarks;
  };

  const handleScan = async (biometryData) => {
    try {
      const response = await fetch('/miroir-secret/api/v1/internal/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Divineo-Token': import.meta.env.VITE_DIVINEO_TOKEN
        },
        body: JSON.stringify(biometryData)
      });

      if (!response.ok) {
          console.error("Error from Divineo Engine:", response.status);
          alert("Erreur de communication avec le cerveau numérique (403/500).");
          return;
      }

      const data = await response.json();
      setResult(data);
      setStep('result');
    } catch (err) {
      console.error("Scan failed:", err);
      alert("Erreur réseau: Impossible de contacter le miroir secret.");
    }
  };

  const onScanButtonClick = () => {
      // Use Ref to avoid re-renders, but ensure we have data.
      if (!landmarksRef.current) {
          alert("Veuillez patienter, détection de la silhouette en cours...");
          return;
      }

      // Construct payload
      const payload = {
          h: 175, // Default/Mock as per instructions to not ask user numbers
          w: 65,
          e: "Gala",
          m: landmarksRef.current
      };

      handleScan(payload);
  };

  return (
    <div style={{ backgroundColor: '#001A33', color: '#D4AF37', minHeight: '100vh', fontFamily: 'serif' }}>
      {step === 'landing' && (
        <div onClick={() => setStep('scan')} style={{ cursor: 'pointer', textAlign: 'center', paddingTop: '20vh' }}>
          <h1 style={{ letterSpacing: '8px' }}>GALERIES LAFAYETTE</h1>
          <p>EXPERIENCE DIVINEO BY JULES</p>
          <div style={{ marginTop: '50px', border: '1px solid #D4AF37', display: 'inline-block', padding: '20px' }}>
             [ VÍDEO PAU: CHASQUIDO ]
          </div>
          <p style={{ marginTop: '30px' }}>CLIQUEZ POUR COMMENCER</p>
        </div>
      )}

      {step === 'scan' && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>MIROIR BIOMÉTRIQUE ACTIF</h2>
          <div style={{ width: '100%', height: '500px', background: '#000', borderRadius: '20px', border: '2px solid #D4AF37', overflow: 'hidden', position: 'relative', margin: '0 auto', maxWidth: '800px' }}>
             <MagicMirror mode="scan" onLandmarksDetected={onLandmarksDetected} />
          </div>
          <button
            onClick={onScanButtonClick}
            style={{ marginTop: '30px', background: '#D4AF37', color: '#001A33', padding: '15px 30px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2em' }}>
            OBTENIR MA COUPE PARFAITE
          </button>
        </div>
      )}

      {step === 'result' && result && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>{result.status}</h2>
            <div style={{ padding: '20px', border: '1px solid #D4AF37', margin: '20px auto', maxWidth: '600px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <h3>{result.product_name}</h3>
                <p style={{ fontStyle: 'italic', fontSize: '1.2em' }}>"{result.jules_narrative}"</p>
            </div>
             <div style={{ width: '100%', height: '500px', background: '#000', borderRadius: '20px', border: '2px solid #D4AF37', overflow: 'hidden', position: 'relative', margin: '0 auto', maxWidth: '800px' }}>
                {/* Re-render MagicMirror in result mode to show overlay if needed */}
                <MagicMirror mode="result" />
            </div>
            <button
                onClick={() => setStep('scan')}
                style={{ marginTop: '30px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '10px 20px', cursor: 'pointer' }}>
                NOUVEAU SCAN
            </button>
        </div>
      )}
    </div>
  );
}
