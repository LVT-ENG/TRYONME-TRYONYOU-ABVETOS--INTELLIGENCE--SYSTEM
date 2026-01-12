import React, { useState, useRef, useEffect } from 'react';

export default function TryOnYouPilot() {
  const videoRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const catalog = [
    { name: "Seda Lafayette Premium", color: "rgba(220, 38, 38, 0.25)" },
    { name: "Tech-Stretch Performance", color: "rgba(30, 64, 175, 0.25)" }
  ];

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(err => console.error("Error de cámara: ", err));
    }
  }, []);

  const nextOutfit = () => {
    setIsAnalyzing(true);
    setTimeout(() => { 
      setIndex((prev) => (prev + 1) % catalog.length); 
      setIsAnalyzing(false); 
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      {/* 1. VISUALIZADOR JIT */}
      <div style={{ position: 'relative', width: '320px', height: '560px', borderRadius: '45px', overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.2)', boxShadow: '0 0 40px rgba(0,0,0,0.8)' }}>
        <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: catalog[index].color, mixBlendMode: 'multiply', transition: '1s' }} />
        
        {/* INTERFAZ PATENTE ULTIMATUM */}
        <div style={{ position: 'absolute', top: '30px', left: '25px', fontSize: '6px', letterSpacing: '2px', opacity: 0.4 }}>SESSION: LAFAYETTE_READY</div>
        <div style={{ position: 'absolute', inset: '50px', border: '0.5px dashed rgba(0,255,0,0.2)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, #ff4444, transparent)', animation: 'scan 3s linear infinite', left: 0 }} />
      </div>

      {/* 2. PAU_ASSISTANT */}
      <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '1px', height: '35px', background: 'linear-gradient(to bottom, transparent, #f59e0b)' }} />
        <p style={{ fontSize: '7px', color: '#f59e0b', letterSpacing: '6px', marginTop: '10px', fontWeight: 'bold' }}>PAU_ASSISTANT</p>
        <button onClick={nextOutfit} style={{ marginTop: '30px', padding: '16px 45px', borderRadius: '50px', border: '0.5px solid rgba(255,255,255,0.4)', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', cursor: 'pointer', fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase' }}>
          {isAnalyzing ? "Analyzing..." : "Next Outfit →"}
        </button>
      </div>

      <style>{" @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } } "}</style>
    </div>
  );
}
