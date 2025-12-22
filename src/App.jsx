import React, { useEffect, useRef, useState } from 'react';

function App() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("INITIALIZING BIOMETRICS...");

  useEffect(() => {
    let activeStream = null;
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user" } 
        });
        activeStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStatus("ULTIMATUM V2.5: SCANNING ACTIVE");
        }
      } catch (err) {
        setStatus("ERROR: CAMERA SENSOR BLOCKED");
      }
    }
    startCamera();
    return () => {
      if (activeStream) activeStream.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'black', width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 150px rgba(255, 191, 0, 0.2)', pointerEvents: 'none', zIndex: 10 }} />
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(120%)', opacity: 0.6 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1.5px', backgroundColor: '#FFBF00', boxShadow: '0 0 15px #FFBF00', animation: 'scan 4s linear infinite', zIndex: 20 }} />
      <div style={{ position: 'absolute', bottom: '40px', textAlign: 'center', zIndex: 30, width: '100%' }}>
        <p style={{ color: '#FFBF00', fontFamily: 'monospace', letterSpacing: '4px', fontSize: '11px', margin: 0 }}>{status}</p>
        <div style={{ width: '200px', height: '1px', backgroundColor: '#FFBF00', margin: '10px auto', opacity: 0.5 }} />
        <p style={{ color: 'white', fontFamily: 'sans-serif', fontWeight: 'lighter', fontSize: '9px', letterSpacing: '2px' }}>TRY ON ME // LAFAYETTE EDITION</p>
      </div>
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}

export default App;
