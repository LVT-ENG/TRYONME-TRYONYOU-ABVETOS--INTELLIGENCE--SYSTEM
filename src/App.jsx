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
        .catch(err => console.error("Error:", err));
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
    <div style={{ backgroundColor: '#000', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'fixed', top: 0, left: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '90%', maxWidth: '350px', height: '70vh', borderRadius: '20px', overflow: 'hidden', border: '1px solid #333' }}>
        <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: catalog[index].color, mixBlendMode: 'multiply' }} />
        <div style={{ position: 'absolute', width: '100%', height: '2px', background: '#ff0000', boxShadow: '0 0 10px red', animation: 'scan 2.5s linear infinite', top: 0 }} />
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ color: '#f59e0b', fontSize: '14px', letterSpacing: '2px' }}>{catalog[index].name}</p>
        <button onClick={next} style={{ marginTop: '15px', padding: '12px 25px', background: 'transparent', border: '1px solid #fff', color: '#fff', borderRadius: '50px', cursor: 'pointer' }}>
          {isAnalyzing ? "ANALYZING..." : "CHANGE FABRIC"}
        </button>
      </div>
      <style>{"@keyframes scan { 0% { top: 0; } 100% { top: 100%; } }"}</style>
    </div>
  );
}
