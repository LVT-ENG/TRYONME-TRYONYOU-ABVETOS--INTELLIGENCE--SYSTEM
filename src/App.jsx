import React, { useState, useEffect, useRef } from 'react';

const catalog = [
  { name: "LAFAYETTE RAW DENIM", color: "rgba(0, 40, 80, 0.4)" },
  { name: "ABVETOS TITANIUM WEAVE", color: "rgba(60, 60, 60, 0.4)" },
  { name: "ULTIMATUM CARBON FIBER", color: "rgba(20, 20, 20, 0.5)" }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; });
  }, []);

  const handleNext = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % catalog.length);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: "#000", height: "100vh", color: "#fff", fontFamily: "monospace", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      
      {/* CAMERA CONTAINER WITH BIOMETRIC FRAME */}
      <div style={{ position: "relative", width: "90%", maxWidth: "400px", aspectRatio: "3/4", border: "1px solid #333", borderRadius: "10px", overflow: "hidden", boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)" }}>
        <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        
        {/* TEXTURE OVERLAY */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: catalog[index].color, mixBlendMode: "overlay", pointerEvents: "none" }} />
        
        {/* SCANNING LINE */}
        <div style={{ position: "absolute", width: "100%", height: "2px", background: "#f59e0b", boxShadow: "0 0 15px #f59e0b", animation: "scan 3s linear infinite", top: 0 }} />

        {/* CORNER BRACKETS (UI DECORATION) */}
        <div style={{ position: "absolute", top: 10, left: 10, width: 20, height: 20, borderTop: "2px solid #f59e0b", borderLeft: "2px solid #f59e0b" }} />
        <div style={{ position: "absolute", bottom: 10, right: 10, width: 20, height: 20, borderBottom: "2px solid #f59e0b", borderRight: "2px solid #f59e0b" }} />
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <p style={{ fontSize: "10px", letterSpacing: "5px", color: "#f59e0b", marginBottom: "5px", animation: "pulse 2s infinite" }}>SYSTEM STATUS: ACTIVE</p>
        <h2 style={{ fontSize: "20px", letterSpacing: "3px", margin: "0" }}>{catalog[index].name}</h2>
        
        <button onClick={handleNext} style={{ marginTop: "30px", padding: "15px 50px", background: "transparent", border: "1px solid #f59e0b", color: "#f59e0b", cursor: "pointer", fontSize: "11px", fontWeight: "bold", borderRadius: "2px" }}>
          {isAnalyzing ? "RE-CALIBRATING..." : "SCAN NEXT"}
        </button>
      </div>

      <style>{`
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}
