import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const videoRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const catalog = [
    { name: "LAFAYETTE UNIFORMS", fabric: "GALAXY TECH", tech: "WATER REPELLENT", color: "rgba(0, 70, 255, 0.25)" },
    { name: "LAFAYETTE SPORTS", fabric: "POWER-UP", tech: "UV PROTECTION", color: "rgba(255, 0, 50, 0.15)" },
    { name: "LAFAYETTE DECO", fabric: "BOUCLE", tech: "HIGH DURABILITY", color: "rgba(255, 200, 0, 0.1)" }
  ];

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
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'monospace', position: 'fixed', top: 0, left: 0, overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', top: '30px', textAlign: 'center', zIndex: 10 }}>
        <h1 style={{ letterSpacing: '8px', fontSize: '14px', color: '#fff' }}>LAFAYETTE ULTIMATUM</h1>
        <div style={{ width: '100px', height: '1px', background: '#f59e0b', margin: '10px auto' }} />
      </div>

      <div style={{ position: 'relative', width: '300px', height: '500px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', overflow: 'hidden', backgroundColor: '#111', boxShadow: '0 0 40px rgba(0,0,0,1)' }}>
        <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        
        {/* Fabric Layer */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: catalog[index].color, mixBlendMode: 'multiply', transition: 'all 0.5s' }} />
        
        {/* Scanner Line */}
        <div style={{ position: 'absolute', width: '100%', height: '2px', background: '#ff0000', boxShadow: '0 0 15px #ff0000', animation: 'scan 3s infinite linear', top: 0 }} />
        
        {/* Biometrics HUD */}
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '9px', color: '#0f0', textShadow: '0 0 5px #0f0' }}>
          ID: LVT-SYNC-99<br/>
          BODY_MATCH: 98.4%<br/>
          STATUS: {isAnalyzing ? "ANALYZING..." : "STABLE"}
        </div>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center', zIndex: 10 }}>
        <h2 style={{ fontSize: '16px', color: '#f59e0b', margin: '0', letterSpacing: '2px' }}>{catalog[index].name}</h2>
        <p style={{ fontSize: '10px', color: '#888', margin: '5px 0' }}>{catalog[index].fabric} | {catalog[index].tech}</p>
        
        <button onClick={handleNext} style={{ marginTop: '20px', background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '12px 35px', borderRadius: '50px', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px' }}>
          {isAnalyzing ? "CALIBRATING..." : "NEXT TEXTURE →"}
        </button>
      </div>

      <style>{" @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } } "}</style>
    </div>
  );
}
