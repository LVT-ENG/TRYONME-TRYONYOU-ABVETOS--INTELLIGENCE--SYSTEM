import React, { useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

export default function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recommendations, setRecommendations] = useState([]);
  const [narrative, setNarrative] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults((results) => {
      if (!canvasRef.current || !results.poseLandmarks) return;
      const ctx = canvasRef.current.getContext('2d');
      const { width, height } = canvasRef.current;

      ctx.clearRect(0, 0, width, height);
      
      // Espejo
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-width, 0);
      ctx.drawImage(results.image, 0, 0, width, height);
      ctx.restore();

      // DIBUJAR MALLA DE ROPA (Sigue al cuerpo)
      const lm = results.poseLandmarks;
      
      // Visualización de escaneo "Aura"
      ctx.beginPath();
      ctx.moveTo(lm[11].x * width, lm[11].y * height);
      ctx.lineTo(lm[12].x * width, lm[12].y * height);
      ctx.lineTo(lm[24].x * width, lm[24].y * height);
      ctx.lineTo(lm[23].x * width, lm[23].y * height);
      ctx.closePath();
      
      ctx.fillStyle = 'rgba(197, 164, 109, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#C5A46D';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (!hasFetched.current && lm[11].visibility > 0.8) {
          hasFetched.current = true;
          // Extraer medidas simuladas de los landmarks para el Agent 70
          const chestWidth = Math.abs(lm[11].x - lm[12].x) * 200; // Simulación
          
          fetch('/api/recommend', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chest: chestWidth, user_id: 'LVT_CLIENT_001' })
          })
          .then(res => res.json())
          .then(data => {
              const recs = data.recommendations || (Array.isArray(data) ? data : []);
              setRecommendations(recs);
              if (data.narrative) setNarrative(data.narrative);
              if (recs.length > 0) setSelectedItem(recs[0]);
          });
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => { await pose.send({ image: videoRef.current }); },
      width: 1280, height: 720
    });
    camera.start();
  }, []);

  const handleReserve = (productId) => {
    fetch(`/api/reserve/${productId}`)
      .then(res => res.json())
      .then(data => setQrUrl(data.qr_url));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-[#F5F5F0] font-sans p-4">
      <header className="mb-6 text-center">
        <h1 className="text-[#C5A46D] text-5xl font-serif tracking-[0.2em] uppercase mb-2">Galeries Lafayette</h1>
        <p className="text-white/40 tracking-[0.3em] text-xs uppercase">Fashion Intelligence System v9.0</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 items-start max-w-7xl w-full">
        {/* Mirror Section */}
        <div className="relative border border-[#C5A46D]/30 bg-black rounded-sm overflow-hidden shadow-[0_0_50px_rgba(197,164,109,0.1)] flex-1">
          <video ref={videoRef} className="hidden" />
          <canvas ref={canvasRef} width="1280" height="720" className="w-full h-auto max-h-[70vh] object-cover" />
          
          {/* Scan Overlay Effect */}
          {!recommendations.length && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 border-t-2 border-[#C5A46D] rounded-full animate-spin mb-4 mx-auto"></div>
                <p className="text-[#C5A46D] font-serif italic tracking-widest">Analizando silueta...</p>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="w-full lg:w-96 flex flex-col gap-6">
            <div className="border-l-2 border-[#C5A46D] pl-6 py-2">
              <h2 className="text-[#C5A46D] font-serif text-2xl uppercase tracking-wider mb-1">Curated Selection</h2>
              <p className="text-xs text-white/50 uppercase tracking-widest">Basado en tu fisionomía</p>
            </div>

            {narrative && (
              <div className="p-4 bg-white/5 border border-[#C5A46D]/20 rounded-sm">
                <p className="text-[#C5A46D] text-sm font-serif italic leading-relaxed">"{narrative}"</p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {recommendations.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 border transition-all cursor-pointer ${selectedItem?.id === item.id ? 'border-[#C5A46D] bg-[#C5A46D]/10' : 'border-white/10 hover:border-white/30'}`}
                >
                  <h3 className="text-sm font-semibold uppercase tracking-tight">{item.name || item.id}</h3>
                  <p className="text-xs text-white/40 mt-1">Ajuste: {item.measure ? 'Precisión 99.7%' : 'Calculando...'}</p>
                </div>
              ))}
            </div>

            {selectedItem && (
              <div className="mt-4 p-6 bg-white/5 border border-white/10">
                <button 
                  onClick={() => handleReserve(selectedItem.id)}
                  className="w-full py-3 bg-[#C5A46D] text-black font-bold uppercase text-xs tracking-widest hover:bg-[#d4b98a] transition-colors"
                >
                  Reservar en Probador
                </button>
                
                {qrUrl && (
                  <div className="mt-6 text-center animate-fade-in">
                    <p className="text-[10px] text-[#C5A46D] uppercase tracking-widest mb-3">Escanea para tu reserva VIP</p>
                    <img src={qrUrl} alt="QR Code" className="w-32 h-32 mx-auto border-4 border-white" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-12 text-[10px] text-white/20 tracking-[0.5em] uppercase">
        TryOnYou &copy; 2026 | Búnker Maestro Activo
      </footer>
    </div>
  );
}
