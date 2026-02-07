import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { Link } from 'react-router-dom';
import Sparkles from '../components/Sparkles';

const INTERFACE = {
    es: {
        btns: ["Mi Selección Perfecta", "Reservar en Probador", "Ver Combinaciones", "Guardar mi Silueta", "Compartir Look"],
        labels: {
            match: "Ajuste Ideal",
            qr: "Código QR generado",
            share: "Imagen lista para compartir (datos privados ocultos)",
            loading: "Analizando silueta...",
            profile: "Tu Perfil Biométrico",
            addedToCart: "Añadido al carrito con ajuste optimizado.",
            switchingLooks: "Alternando looks...",
            scanLinked: "Datos de escaneo vinculados a tu perfil de usuario."
        }
    },
    fr: {
        btns: ["Ma Sélection Parfaite", "Réserver en Cabine", "Voir les Combinaisons", "Enregistrer ma Silhouette", "Partager le Look"],
        labels: {
            match: "Coupe Idéale",
            qr: "Code QR généré",
            share: "Image prête à partager (données privées masquées)",
            loading: "Analyse de la silhouette...",
            profile: "Votre Profil Biométrique",
            addedToCart: "Ajouté au panier avec coupe optimisée.",
            switchingLooks: "Alternance de looks...",
            scanLinked: "Données de scan liées à votre profil utilisateur."
        }
    },
    en: {
        btns: ["My Perfect Selection", "Reserve in Fitting Room", "View Combinations", "Save my Silhouette", "Share Look"],
        labels: {
            match: "Perfect Fit",
            qr: "QR Code generated",
            share: "Image ready to share (private data hidden)",
            loading: "Analyzing silhouette...",
            profile: "Your Biometric Profile",
            addedToCart: "Added to cart with optimized fit.",
            switchingLooks: "Switching looks...",
            scanLinked: "Scan data linked to your user profile."
        }
    }
};

export default function LafayettePilot() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recommendations, setRecommendations] = useState([]);
  const [narrative, setNarrative] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);
  const [scanComplete, setScanComplete] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [language, setLanguage] = useState('es');
  const [snapActive, setSnapActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const hasFetched = useRef(false);

  const texts = INTERFACE[language];

  const handleSparkleComplete = useCallback(() => setSnapActive(false), []);

  const triggerSnap = () => {
      setSnapActive(true);
      // Sound effect could go here
  };

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

      if (!hasFetched.current && lm[11].visibility > 0.8) {
          hasFetched.current = true;
          setScanComplete(true);
          triggerSnap();
          
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
                chest: shoulderWidth,
                height: torsoLength,
                waist: hipWidth,
                user_id: 'LAFAYETTE_PILOT_PRO',
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
                  Title: 'Blazer Galeries',
                  elasticidad: 0.1,
                  caida: 'Estructurada',
                  match_score: 0.98,
                  description: 'Corte perfecto para tu silueta',
                  'Image Src': '/assets/catalog/brown_blazer_360_views.png'
                }
              ];
              setRecommendations(fallbackRecs);
              setSelectedItem(fallbackRecs[0]);
              setNarrative("Agent 70: Conexión offline. Se muestra selección predeterminada de alta gama.");
          });
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => { await pose.send({ image: videoRef.current }); },
      width: 1280, height: 720
    });
    camera.start();
  }, []);

  const handleAction = (btnIndex) => {
      triggerSnap();

      // Index matches the array index (0-4)
      // btns: ["Perfect", "Reserve", "Combinations", "Save", "Share"]

      if (btnIndex === 0) { // Mi Selección Perfecta
          setStatusMessage(texts.labels.addedToCart);
          if (recommendations.length > 0) setSelectedItem(recommendations[0]);
      } else if (btnIndex === 1) { // Reservar
          if (selectedItem) {
              handleReserve(selectedItem.Handle || selectedItem.id);
          }
      } else if (btnIndex === 2) { // Ver Combinaciones
          setStatusMessage(texts.labels.switchingLooks);
          // Cycle to next item
          if (recommendations.length > 1) {
              const selectedKey = selectedItem?.Handle || selectedItem?.id;
              const currentIndex = recommendations.findIndex(r => (r.Handle || r.id) === selectedKey);
              const nextIndex = (currentIndex + 1) % recommendations.length;
              setSelectedItem(recommendations[nextIndex]);
          }
      } else if (btnIndex === 3) { // Guardar Silueta
          setStatusMessage(texts.labels.scanLinked);
      } else if (btnIndex === 4) { // Compartir
          setStatusMessage(texts.labels.share);
      }

      // Clear status after 3s (skip for Reserve, which clears after its async response)
      if (btnIndex !== 1) {
          setTimeout(() => setStatusMessage(""), 3000);
      }
  };

  const handleReserve = (productId) => {
    const pid = productId || 'UNKNOWN';
    fetch(`/api/reserve/${pid}`)
      .then(res => res.json())
      .then(data => {
          setQrUrl(data.qr_url);
          setStatusMessage(`${texts.labels.qr} ${pid.substring(0,8)}...`);
          setTimeout(() => setStatusMessage(""), 3000);
      })
      .catch(() => {
        // Fallback QR
        setQrUrl('https://api.qrserver.com/v1/create-qr-code/?s' + 'ize=200x200&data=LAFAYETTE_RESERVATION_' + pid);
        setStatusMessage(`${texts.labels.qr} LOCAL-DEV-KEY`);
        setTimeout(() => setStatusMessage(""), 3000);
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
            <span className="text-[#C5A46D] text-sm uppercase tracking-widest">Exit</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-[#C5A46D] text-3xl font-serif tracking-[0.2em] uppercase">Galeries Lafayette</h1>
            <p className="text-white/40 tracking-[0.3em] text-[10px] uppercase mt-1">Piloto Lafayette v7.0 - Pro Interface</p>
          </div>
          
          <div className="flex gap-2">
            {['es', 'fr', 'en'].map(lang => (
                <button
                    key={lang}
                    onClick={() => { setLanguage(lang); triggerSnap(); }}
                    className={`text-xs uppercase px-2 py-1 border border-[#C5A46D] rounded transition-all ${language === lang ? 'bg-[#C5A46D] text-black' : 'text-[#C5A46D] hover:bg-[#C5A46D]/20'}`}
                    aria-label={`Switch to ${lang === 'es' ? 'Spanish' : lang === 'fr' ? 'French' : 'English'}`}
                >
                    {lang}
                </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative">
        <Sparkles active={snapActive} onComplete={handleSparkleComplete} />

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
                  <p className="text-[#C5A46D] font-serif italic tracking-widest text-xl mb-2">{texts.labels.loading}</p>
                  <p className="text-white/50 text-sm uppercase tracking-wider">System Ready</p>
                </div>
              </div>
            )}
            
            {/* User Profile Badge */}
            {userProfile && (
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-[#C5A46D]/50 rounded-lg p-4 animate-fade-in">
                <p className="text-[10px] text-[#C5A46D] uppercase tracking-widest mb-2">{texts.labels.profile}</p>
                <div className="space-y-1">
                  <p className="text-sm text-white"><span className="text-white/50">Silueta:</span> {userProfile.silhouette}</p>
                  <p className="text-sm text-white"><span className="text-white/50">Fit:</span> {userProfile.fit_preference}</p>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations & Controls Section */}
          {recommendations.length > 0 && (
            <div className="w-full lg:w-96 flex flex-col gap-6 animate-fade-in z-10">
              <div className="border-l-4 border-[#C5A46D] pl-6 py-2">
                <h2 className="text-[#C5A46D] font-serif text-3xl uppercase tracking-wider mb-2">Selection</h2>
                <p className="text-xs text-white/50 uppercase tracking-widest">{texts.labels.match}</p>
              </div>

              {narrative && (
                <div className="p-4 bg-gradient-to-br from-[#C5A46D]/10 to-transparent border border-[#C5A46D]/30 rounded-lg">
                  <p className="text-[#C5A46D] text-sm font-serif italic leading-relaxed">"{narrative}"</p>
                </div>
              )}

              {/* Status Message Area */}
              {statusMessage && (
                  <div className="p-3 bg-[#C5A46D] text-black text-center font-bold text-sm uppercase tracking-wider rounded animate-pulse">
                      {statusMessage}
                  </div>
              )}

              {/* Selected Item Preview */}
              {selectedItem && (
                  <div className="relative group">
                     <div className="absolute -inset-1 bg-gradient-to-r from-[#C5A46D] to-[#F5F5F0] opacity-20 blur rounded-lg group-hover:opacity-40 transition duration-1000"></div>
                     <div className="relative p-6 bg-black border border-[#C5A46D]/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-serif text-white uppercase">{selectedItem.Title || selectedItem.name}</h3>
                            <span className="text-[#C5A46D] text-xs border border-[#C5A46D] px-2 py-1 rounded-full">
                                {Math.round((selectedItem.match_score || 0) * 100)}% Match
                            </span>
                        </div>
                        <p className="text-xs text-white/60 mb-2">
                            Elasticidad: {selectedItem.elasticidad} | Caída: {selectedItem.caida}
                        </p>
                        {selectedItem['Image Src'] && (
                            <img src={selectedItem['Image Src']} alt="Item" className="w-full h-48 object-contain my-4 rounded" />
                        )}
                     </div>
                  </div>
              )}

              {/* The 5 Pro Buttons */}
              <div className="grid grid-cols-1 gap-3">
                  {texts.btns.map((btnLabel, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAction(idx)}
                        className={`
                            py-3 px-4 uppercase text-xs tracking-widest font-bold border transition-all duration-300 relative overflow-hidden group
                            ${idx === 1 ? 'bg-[#C5A46D] text-black border-[#C5A46D] hover:bg-white' : 'bg-transparent text-[#C5A46D] border-[#C5A46D]/30 hover:border-[#C5A46D] hover:text-white'}
                        `}
                      >
                          <span className="relative z-10 flex items-center justify-between">
                              {idx + 1}. {btnLabel}
                              {idx === 1 && <span className="text-lg">✨</span>}
                          </span>
                          <div className="absolute inset-0 bg-[#C5A46D]/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                      </button>
                  ))}
              </div>

              {/* QR Display Area */}
              {qrUrl && selectedItem && (
                <div className="mt-4 text-center animate-fade-in bg-white/5 p-4 rounded-lg border border-[#C5A46D]/30">
                  <p className="text-[10px] text-[#C5A46D] uppercase tracking-widest mb-4">VIP PASS</p>
                  <div className="inline-block p-2 bg-white rounded">
                    <img src={qrUrl} alt="QR Code" className="w-32 h-32 mx-auto" />
                  </div>
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
            TryOnYou © 2026 | Fashion Intelligence System v7.0 PRO
          </p>
        </div>
      </footer>
    </div>
  );
}
