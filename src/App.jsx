import React, { useState, useEffect, useRef } from 'react';

const catalog = [
  { name: "LAFAYETTE RAW DENIM", color: "rgba(0, 40, 80, 0.3)" },
  { name: "ABVETOS TITANIUM WEAVE", color: "rgba(60, 60, 60, 0.4)" },
  { name: "ULTIMATUM CARBON FIBER", color: "rgba(20, 20, 20, 0.5)" }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [data, setData] = useState("0.000");
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; });
    
    const interval = setInterval(() => {
      setData((Math.random() * 100).toFixed(3));
    }, 100);
    return () => clearInterval(interval);
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
      
      {/* HUD CONTAINER */}
      <div style={{ position: "relative", width: "90%", maxWidth: "400px", aspectRatio: "3/4", border: "1px solid #222", borderRadius: "2px", overflow: "hidden" }}>
        <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.2) brightness(0.8)" }} />
        
        {/* TEXTURE OVERLAY */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: catalog[index].color, mixBlendMode: "overlay" }} />
        
        {/* SIDE DATA STREAM */}
        <div style={{ position: "absolute", top: 20, left: 10, fontSize: "8px", color: "#f59e0b", opacity: 0.8 }}>
          <p>LAT: 40.7128</p>
          <p>LNG: 74.0060</p>
          <p>RES: 1080p</p>
          <p>VAL: {data}</p>
        </div>

        <div style={{ position: "absolute", top: 20, right: 10, fontSize: "8px", color: "#f59e0b", textAlign: "right", opacity: 0.8 }}>
          <p>SYS: RUNNING</p>
          <p>NET: SECURE</p>
          <p>AUTH: LV-0{index + 1}</p>
        </div>
        
        {/* SCANNING LINE */}
        <div style={{ position: "absolute", width: "100%", height: "1px", background: "#f59e0b", boxShadow: "0 0 10px #f59e0b", animation: "scan 4s linear infinite", top: 0 }} />

        {/* HUD CORNERS */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "20px solid transparent", borderImage: "linear-gradient(to bottom right, #f59e0b, transparent 20%, transparent 80%, #f59e0b) 1" }} />
      </div>

      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <p style={{ fontSize: "10px", letterSpacing: "5px", color: "#f59e0b", animation: "pulse 2s infinite" }}>
          {isAnalyzing ? ">>> ANALYZING BIOMETRICS <<<" : "ULTIMATUM PILOT READY"}
        </p>
        <h2 style={{ fontSize: "18px", letterSpacing: "4px", margin: "10px 0" }}>{catalog[index].name}</h2>
        
        <button onClick={handleNext} style={{ marginTop: "20px", padding: "12px 35px", background: "#f59e0b", border: "none", color: "#000", cursor: "pointer", fontSize: "11px", fontWeight: "bold", letterSpacing: "2px" }}>
          {isAnalyzing ? "CALIBRATING..." : "INITIATE SCAN"}
        </button>
      </div>

      <style>{`
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes pulse { 0% { opacity: 0.3; } 50% { opacity: 1; } 100% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}
