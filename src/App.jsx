import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const videoRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const catalog = [
    { name: "LAFAYETTE UNIFORMS", fabric: "GALAXY TECH", tech: "REPELENTE A LÍQUIDOS", color: "rgba(0, 50, 200, 0.3)" },
    { name: "LAFAYETTE SPORTS", fabric: "POWER-UP", tech: "PROTECCIÓN UV", color: "rgba(200, 0, 50, 0.2)" },
    { name: "LAFAYETTE DECO", fabric: "BOUCLE", tech: "ALTA DURABILIDAD", color: "rgba(255, 180, 0, 0.15)" }
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
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'monospace', position: 'fixed', top: 0, left: 0, overflow: 'hidden' }}>
      
      {/* HUD Superior */}
      <div style={{ position: 'absolute', top: '30px', textAlign: 'center', zIndex: 10 }}>
        <h1 style={{ letterSpacing: '6px', fontSize: '12px', margin: 0, opacity: 0.8 }}>TRYONYOU • ABVETOS</h1>
        <p style={{ fontSize: '8px', color: '#f59e0b', marginTop: '5px' }}>ULTIMATUM INTELLIGENCE SYSTEM</p>
      </div>

      {/* Viewport del Escáner */}
      <div style={{ position: 'relative', width: '310px', height: '500px', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.15)', overflow: 'hidden', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }}>
        <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        
        {/* Filtro de Textura Lafayette */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: catalog[index].color, mixBlendMode: 'multiply', transition: 'background-color 0.8s ease' }} />
        
        {/* Animación de Escaneo Láser */}
        <div style={{ position: 'absolute', width: '100%', height: '2px', background: '#ff0000', boxShadow: '0 0 12px #ff0000', animation: 'scan 2.5s infinite linear', top: 0 }} />
        
        {/* Telemetría Biométrica */}
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '9px', color: '#0f0', fontFamily: 'monospace', lineHeight: '1.4' }}>
          BODY_SCAN: ACTIVE<br/>
          FABRIC_MATCH: 98.4%<br/>
          STATUS: {isAnalyzing ? "ANALYZING..." : "STABLE"}
        </div>
      </div>

      {/* Panel de Control */}
      <div style={{ marginTop: '25px', textAlign: 'center', zIndex: 10 }}>
        <h2 style={{ fontSize: '18px', color: '#f59e0b', margin: '0', letterSpacing: '2px' }}>{catalog[index].name}</h2>
        <p style={{ fontSize: '10px', color: '#aaa', margin: '5px 0' }}>{catalog[index].fabric} | {catalog[index].tech}</p>
        
        <button onClick={handleNext} style={{ marginTop: '20px', background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '12px 35px', borderRadius: '50px', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px' }}>
          {isAnalyzing ? "SYNCING..." : "NEXT TEXTURE →"}
        </button>
      </div>

      <style>{" @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } } "}</style>
    </div>
  );
}
