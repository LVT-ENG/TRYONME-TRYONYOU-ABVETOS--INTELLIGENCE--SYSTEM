import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const videoRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const catalog = [
    { name: "Seda Lafayette Premium", color: "rgba(220, 38, 38, 0.3)" },
    { name: "Tech-Stretch Performance", color: "rgba(30, 64, 175, 0.3)" }
  ];

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(err => console.error("Error de cámara:", err));
    }
  }, []);

  const next = () => {
    setIsAnalyzing(true);
    setTimeout(() => { 
      setIndex((prev) => (prev + 1) % catalog.length); 
      setIsAnalyzing(false); 
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#050505', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif', position: 'fixed', top: 0, left: 0 }}>
      
      {/* Contenedor del Escáner */}
      <div style={{ position: 'relative', width: '300px', height: '500px', borderRadius: '30px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
        <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        
        {/* Capa de Color de la Tela */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: catalog[index].color, mixBlendMode: 'multiply', pointerEvents: 'none' }} />
        
        {/* Línea de Escaneo Láser */}
        <div style={{ position: 'absolute', width: '100%', height: '2px', background: '#ff0000', boxShadow: '0 0 15px #ff0000', animation: 'scan 2s linear infinite', left: 0, top: 0, zIndex: 20 }} />
        
        <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '8px', letterSpacing: '2px', color: '#00ff00' }}>[ LIVE_RECOGNITION: ACTIVE ]</div>
      </div>

      {/* Controles e Información */}
      <div style={{ marginTop: '30px', textAlign: 'center', zIndex: 30 }}>
        <h2 style={{ fontSize: '14px', letterSpacing: '4px', color: '#f59e0b' }}>{catalog[index].name}</h2>
        <p style={{ fontSize: '9px', opacity: 0.5, marginBottom: '20px' }}>ULTIMATUM INTELLIGENCE SYSTEM</p>
        
        <button onClick={next} style={{ padding: '15px 30px', borderRadius: '5px', border: '1px solid #f59e0b', backgroundColor: 'transparent', color: '#f59e0b', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px' }}>
          {isAnalyzing ? "ANALYZING BODY..." : "CHANGE TEXTURE →"}
        </button>
      </div>

      <style>{" @keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } } "}</style>
    </div>
  );
}
