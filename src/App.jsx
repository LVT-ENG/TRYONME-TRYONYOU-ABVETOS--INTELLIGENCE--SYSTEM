import React, { useState, useEffect, useRef } from 'react';

const catalog = [
  { name: "LAFAYETTE TECH", color: "rgba(0, 80, 255, 0.3)", fabric: "POLY-TECH", tech: "UV-SHIELD" },
  { name: "ULTIMATUM RED", color: "rgba(255, 0, 0, 0.25)", fabric: "NYLON-X", tech: "THERMO-REG" },
  { name: "ABVETOS NOIR", color: "rgba(0, 0, 0, 0.5)", fabric: "CARBON-FIBER", tech: "AERO-DRY" }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(err => console.error("Camera error:", err));
    }
  }, []);

  const handleNext = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % catalog.length);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'monospace', position: 'fixed', top: 0, left: 0 }}>
      
      <div style={{ position: 'relative', width: '320px', height: '520px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 0 50px rgba(0,0,0,0.8)', backgroundColor: '#111' }}>
        <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        
        {/* Fabric Overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: catalog[index].color, mixBlendMode: 'multiply', pointerEvents: 'none' }} />
        
        {/* Scanner Line */}
        <div style={{ position: 'absolute', width: '100%', height: '2px', background: '#ff0000', boxShadow: '0 0 15px red', animation: 'scan 2.5s linear infinite', top: 0 }} />
        
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '10px', color: '#0f0', textShadow: '0 0 5px #0f0' }}>
          SYSTEM_STATUS: ACTIVE<br/>MATCH_CONFIDENCE: 98.4%
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '18px', color: '#f59e0b', margin: '0', letterSpacing: '3px' }}>{catalog[index].name}</h2>
        <p style={{ fontSize: '11px', color: '#888', marginTop: '8px' }}>{catalog[index].fabric} | {catalog[index].tech}</p>
        
        <button onClick={handleNext} style={{ marginTop: '25px', background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '15px 40px', borderRadius: '50px', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', transition: 'all 0.3s' }}>
          {isAnalyzing ? "ANALYZING BIOMETRICS..." : "CHANGE TEXTURE →"}
        </button>
      </div>

      <style>{" @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } } "}</style>
    </div>
  );
}
