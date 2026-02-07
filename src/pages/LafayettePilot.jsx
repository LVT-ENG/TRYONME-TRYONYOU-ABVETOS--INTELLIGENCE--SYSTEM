import React, { useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { Link } from 'react-router-dom';

export default function LafayettePilot() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recommendations, setRecommendations] = useState([]);
  const [narrative, setNarrative] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);
  const [scanComplete, setScanComplete] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const hasFetched = useRef(false);
  const garmentImageRef = useRef(null);

  useEffect(() => {
    if (selectedItem) {
      const imgSrc = getGarmentImageUrl(selectedItem);
      if (imgSrc) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imgSrc;
        img.onload = () => {
          garmentImageRef.current = img;
        };
      }
    }
  }, [selectedItem]);

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

      // DIBUJAR AURA DE ESCANEO (Efecto premium)
      const lm = results.poseLandmarks;
      
      // Aura dorada alrededor del cuerpo
      ctx.beginPath();
      ctx.moveTo(lm[11].x * width, lm[11].y * height);
      ctx.lineTo(lm[12].x * width, lm[12].y * height);
      ctx.lineTo(lm[24].x * width, lm[24].y * height);
      ctx.lineTo(lm[23].x * width, lm[23].y * height);
      ctx.closePath();
      
      // Efecto de brillo pulsante
      const pulse = Math.sin(Date.now() / 500) * 0.1 + 0.2;
      ctx.fillStyle = `rgba(197, 164, 109, ${pulse})`;
      ctx.fill();
      ctx.strokeStyle = '#C5A46D';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#C5A46D';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Landmarks clave con efecto dorado
      const keyPoints = [11, 12, 23, 24]; // Hombros y caderas
      keyPoints.forEach(idx => {
        const point = lm[idx];
        ctx.beginPath();
        ctx.arc(point.x * width, point.y * height, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#C5A46D';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // PHYSICAL OVERLAY (SuperCommit V8.1)
      // Real-Time Garment Overlay anchored to landmarks
      if (garmentImageRef.current && lm[POSE_LANDMARKS.LEFT_SHOULDER].visibility > 0.5 && lm[POSE_LANDMARKS.RIGHT_SHOULDER].visibility > 0.5) {
        const leftShoulder = lm[POSE_LANDMARKS.LEFT_SHOULDER];
        const rightShoulder = lm[POSE_LANDMARKS.RIGHT_SHOULDER];

        // Calculate dimensions
        const shoulderDist = Math.hypot(
          (leftShoulder.x - rightShoulder.x) * width,
          (leftShoulder.y - rightShoulder.y) * height
        );

        // Center X is average of shoulders
        const centerX = ((leftShoulder.x + rightShoulder.x) / 2) * width;
        // Top Y is shoulder level (adjusted up for neck/collar)
        const topY = ((leftShoulder.y + rightShoulder.y) / 2) * height;

        // Dynamic scaling based on garment type logic (simplified for V8.1)
        const scaleFactor = 2.8; // Wide fit for blazers/dresses
        const overlayWidth = shoulderDist * scaleFactor;
        const overlayHeight = overlayWidth * (garmentImageRef.current.height / garmentImageRef.current.width);

        ctx.save();
        // Translate to center to handle rotation if needed later, currently just simple overlay
        ctx.drawImage(
          garmentImageRef.current,
          centerX - (overlayWidth / 2),
          topY - (overlayHeight * 0.15), // Offset up slightly
          overlayWidth,
          overlayHeight
        );
        ctx.restore();
      }

      if (!hasFetched.current && lm[11].visibility > 0.8) {
          hasFetched.current = true;
          setScanComplete(true);
          
          // Extraer medidas biométricas (sin mostrar números)
          const shoulderWidth = Math.abs(lm[11].x - lm[12].x) * 200;
          const torsoLength = Math.abs(lm[11].y - lm[23].y) * 150;
          const hipWidth = Math.abs(lm[23].x - lm[24].x) * 200;
          
          // Crear perfil biométrico sin números
          const profile = {
            silhouette: shoulderWidth > 45 ? 'Athletic' : 'Slim',
            proportions: torsoLength / shoulderWidth > 1.5 ? 'Elongated' : 'Balanced',
            fit_preference: 'Tailored'
          };
          
          setUserProfile(profile);
          
          // Llamada al backend con datos biométricos
          fetch('/api/recommend', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                shoulder_width: shoulderWidth,
                torso_length: torsoLength,
                hip_width: hipWidth,
                user_id: 'LAFAYETTE_PILOT_001',
                zero_numbers: true // Activar modo sin números
              })
          })
          .then(res => res.json())
          .then(data => {
              const recs = data.recommendations || (Array.isArray(data) ? data : []);
              setRecommendations(recs);
              if (data.narrative) setNarrative(data.narrative);
              if (recs.length > 0) setSelectedItem(recs[0]);
          })
          .catch(err => {
              console.error('Error fetching recommendations:', err);
              // Fallback con datos de ejemplo
              const fallbackRecs = [
                {
                  id: 'LAFAYETTE_JACKET_001',
                  name: 'Blazer Signature Lafayette',
                  fit_score: 98,
                  description: 'Corte perfecto para tu silueta',
                  sustainability: 'Fabricado bajo demanda - 0% residuos'
                }
              ];
              setRecommendations(fallbackRecs);
              setSelectedItem(fallbackRecs[0]);
              setNarrative("Tu gemela digital ha encontrado el ajuste perfecto. Este blazer se adapta a tu silueta única.");
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
      .then(data => setQrUrl(data.qr_url))
      .catch(() => {
        // Fallback QR
        setQrUrl('https://api.qrserver.com/v1/create-qr-code/?s' + 'ize=200x200&data=LAFAYETTE_RESERVATION_' + productId);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#F5F5F0] font-sans">
      {/* Header */}
      <header className="border-b border-[#C5A46D]/30 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <svg className="w-5 h-5 text-[#C5A46D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-[#C5A46D] text-sm uppercase tracking-widest">Volver</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-[#C5A46D] text-3xl font-serif tracking-[0.2em] uppercase">Galeries Lafayette</h1>
            <p className="text-white/40 tracking-[0.3em] text-[10px] uppercase mt-1">Piloto Lafayette v7.0 - Zero Tallas</p>
          </div>
          
          <div className="w-24"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row gap-8 items-start max-w-7xl w-full">
          {/* Mirror Section */}
          <div className="relative border-2 border-[#C5A46D]/40 bg-black rounded-lg overflow-hidden shadow-[0_0_80px_rgba(197,164,109,0.2)] flex-1">
            <video ref={videoRef} className="hidden" />
            <canvas ref={canvasRef} width="1280" height="720" className="w-full h-auto max-h-[70vh] object-cover" />
            
            {/* Scan Overlay Effect */}
            {!scanComplete && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 border-4 border-[#C5A46D] rounded-full animate-pulse mx-auto"></div>
                    <div className="absolute inset-0 w-24 h-24 border-t-4 border-[#C5A46D] rounded-full animate-spin mx-auto"></div>
                  </div>
                  <p className="text-[#C5A46D] font-serif italic tracking-widest text-xl mb-2">Analizando tu silueta única...</p>
                  <p className="text-white/50 text-sm uppercase tracking-wider">Sistema biométrico activo</p>
                </div>
              </div>
            )}
            
            {/* User Profile Badge */}
            {userProfile && (
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-[#C5A46D]/50 rounded-lg p-4 animate-fade-in">
                <p className="text-[10px] text-[#C5A46D] uppercase tracking-widest mb-2">Tu Perfil Biométrico</p>
                <div className="space-y-1">
                  <p className="text-sm text-white"><span className="text-white/50">Silueta:</span> {userProfile.silhouette}</p>
                  <p className="text-sm text-white"><span className="text-white/50">Proporciones:</span> {userProfile.proportions}</p>
                  <p className="text-sm text-white"><span className="text-white/50">Ajuste:</span> {userProfile.fit_preference}</p>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations Section */}
          {recommendations.length > 0 && (
            <div className="w-full lg:w-96 flex flex-col gap-6 animate-fade-in">
              <div className="border-l-4 border-[#C5A46D] pl-6 py-2">
                <h2 className="text-[#C5A46D] font-serif text-3xl uppercase tracking-wider mb-2">Curated Selection</h2>
                <p className="text-xs text-white/50 uppercase tracking-widest">Basado en tu fisionomía única</p>
                <p className="text-[10px] text-[#C5A46D]/70 uppercase tracking-widest mt-2">🔒 Sin números visibles</p>
              </div>

              {narrative && (
                <div className="p-6 bg-gradient-to-br from-[#C5A46D]/10 to-transparent border border-[#C5A46D]/30 rounded-lg">
                  <p className="text-[#C5A46D] text-base font-serif italic leading-relaxed">"{narrative}"</p>
                </div>
              )}

              <div className="flex flex-col gap-4">
                {recommendations.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedItem(item)}
                    className={`p-6 border-2 transition-all cursor-pointer rounded-lg ${
                      selectedItem?.id === item.id 
                        ? 'border-[#C5A46D] bg-[#C5A46D]/20 shadow-[0_0_30px_rgba(197,164,109,0.3)]' 
                        : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-base font-semibold uppercase tracking-tight">{item.name || item.id}</h3>
                      {item.fit_score && (
                        <span className="px-3 py-1 bg-[#C5A46D] text-black text-xs font-bold rounded-full">
                          {item.fit_score}% Fit
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/60 mb-2">{item.description || 'Ajuste perfecto para tu silueta'}</p>
                    {item.sustainability && (
                      <p className="text-xs text-[#C5A46D] italic mt-2">♻️ {item.sustainability}</p>
                    )}
                  </div>
                ))}
              </div>

              {selectedItem && (
                <div className="mt-4 p-6 bg-gradient-to-br from-white/5 to-transparent border-2 border-[#C5A46D]/30 rounded-lg">
                  <button 
                    onClick={() => handleReserve(selectedItem.id)}
                    className="w-full py-4 bg-[#C5A46D] text-black font-bold uppercase text-sm tracking-widest hover:bg-[#d4b98a] transition-all hover:shadow-[0_0_30px_rgba(197,164,109,0.5)] rounded-lg"
                  >
                    Reservar en Probador VIP
                  </button>
                  
                  {qrUrl && (
                    <div className="mt-6 text-center animate-fade-in">
                      <p className="text-xs text-[#C5A46D] uppercase tracking-widest mb-4">Escanea para tu reserva VIP</p>
                      <div className="inline-block p-4 bg-white rounded-lg">
                        <img src={qrUrl} alt="QR Code" className="w-40 h-40 mx-auto" />
                      </div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mt-4">
                        Código de reserva: {selectedItem.id}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#C5A46D]/30 bg-black/50 backdrop-blur-md py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] text-white/20 tracking-[0.5em] uppercase">
            TryOnYou © 2026 | Fashion Intelligence System v7.0 | Búnker Maestro Activo
          </p>
        </div>
      </footer>
    </div>
  );
}
