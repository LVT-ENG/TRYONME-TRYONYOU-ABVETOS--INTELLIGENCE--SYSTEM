import React, { useState, useEffect, useRef } from 'react';
import MagicMirror from '../components/MagicMirror';
import ActionOverlay from '../components/ActionOverlay';
import { motion, AnimatePresence } from 'framer-motion';

// Mock API response fallback
const MOCK_API_RESPONSE = {
  verdict: {
    trend_context: "Detectado patrón floral, tendencia #4 en Google",
    jules_narrative: "La seda fluye honrando la verticalidad.",
    item_name: "Robe de Soirée Lafayette"
  }
};

export default function LafayettePilot() {
  const [step, setStep] = useState('landing');
  const [mirrorMode, setMirrorMode] = useState('scan'); // scan, pau_transition, result
  const [overlayText, setOverlayText] = useState('');
  const [showBuyButton, setShowBuyButton] = useState(false);
  const [pauVideoPlaying, setPauVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  // Sequence Controller
  const startJourney = async () => {
    setStep('mirror');
    setOverlayText('Iniciando Escaneo...');

    // Fire-and-forget call to backend to trigger Agent 12 Logs
    triggerBackendAgent();

    // Phase 1: Scan & Analysis (Simulated)
    setTimeout(() => setOverlayText('Detectando Puntos Biométricos...'), 1500);

    setTimeout(() => {
        setOverlayText('Analizando Top 20 Google Trends...');
        // We rely on the simulated timing for the UI flow to ensure smoothness
    }, 3000);

    setTimeout(() => {
        setOverlayText('Estilo Identificado: ELEGANCIA FLUIDA');
        triggerPauMoment();
    }, 5000);
  };

  const triggerBackendAgent = async () => {
    try {
        // Create a dummy 1x1 pixel image to wake up the backend Agent
        const pixel = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
        const res = await fetch(pixel);
        const blob = await res.blob();
        const file = new File([blob], "agent_wake.png", { type: "image/png" });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("event_context", "Pilot Start");

        // Non-blocking call
        fetch('/api/v1/master-scan', {
            method: 'POST',
            body: formData
        }).then(r => r.json()).then(data => {
            console.log("Agent 12 Response:", data);
        }).catch(err => console.log("Agent 12 offline (using local brain)", err));
    } catch (e) {
        console.log("Error preparing backend trigger", e);
    }
  };

  const triggerPauMoment = () => {
    setMirrorMode('pau_transition');
    setPauVideoPlaying(true);
    setOverlayText('');

    if (videoRef.current) {
        videoRef.current.play().catch(e => {
            console.log("Auto-play failed (browser policy), forcing fallback", e);
            // Fallback if video fails to play (e.g. file missing or permissions)
            handleSnap();
        });
    } else {
        // No video element (fallback mode)
        setTimeout(handleSnap, 1000);
    }
  };

  const handleSnap = () => {
    // THE SNAP MOMENT
    setMirrorMode('result');
    setPauVideoPlaying(false);

    // Update UI with Result
    setOverlayText(MOCK_API_RESPONSE.verdict.trend_context); // "Detectado patrón floral..."
    setShowBuyButton(true);
  };

  const handleVideoTimeUpdate = () => {
    // Sync with "Snap" moment in video (e.g., at 2.5 seconds)
    if (videoRef.current && videoRef.current.currentTime > 2.0 && mirrorMode !== 'result') {
        handleSnap();
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-serif text-[#D4AF37]">
      {/* BACKGROUND MAGIC MIRROR (Always rendered to keep camera ready) */}
      {step === 'mirror' && (
          <div className="absolute inset-0 z-0">
            <MagicMirror
                mode={mirrorMode}
                overlayText={overlayText}
            />
          </div>
      )}

      {/* LANDING SCREEN */}
      {step === 'landing' && (
        <div
            onClick={startJourney}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#001A33] cursor-pointer"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl tracking-[8px] mb-4">GALERIES LAFAYETTE</h1>
            <p className="text-xl tracking-widest text-white/80">EXPERIENCE DIVINEO BY JULES</p>

            <div className="mt-12 p-8 border border-[#D4AF37] rounded-full hover:bg-[#D4AF37]/10 transition-colors">
               <span className="text-2xl">CLIQUEZ POUR COMMENCER</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* PAU VIDEO OVERLAY */}
      <AnimatePresence>
        {mirrorMode === 'pau_transition' && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
                {/* Placeholder logic for video */}
                <video
                    ref={videoRef}
                    src="/assets/videos/pau-snap.mp4" // Assuming path
                    className="w-full h-full object-cover opacity-80 mix-blend-screen"
                    onTimeUpdate={handleVideoTimeUpdate}
                    onEnded={handleSnap}
                    onError={(e) => {
                        console.log("Video missing, skipping");
                        e.target.style.display = 'none';
                        setTimeout(handleSnap, 500); // Fast forward
                    }}
                    playsInline
                    muted // Muted needed for autoplay usually
                />

                {/* Visual fallback if video doesn't load visually but logic runs */}
                <div className="absolute text-6xl font-bold text-white drop-shadow-[0_0_10px_#D4AF37] animate-pulse">
                    ✨
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* ACTION OVERLAY (Buy Button) */}
      <ActionOverlay isVisible={showBuyButton} />

      {/* TEXT OVERLAY (HTML layer for sharper text than canvas if needed, but we used canvas) */}
      {/* We are using canvas overlay in MagicMirror, but we can add a persistent UI header here */}
      {step === 'mirror' && (
          <div className="absolute top-10 left-0 right-0 z-30 text-center pointer-events-none">
              <h2 className="text-xl md:text-2xl text-white/50 tracking-widest">
                  {mirrorMode === 'scan' ? 'ANALYSE BIOMÉTRIQUE' : mirrorMode === 'result' ? 'TOTAL LOOK CONFIRMÉ' : ''}
              </h2>
          </div>
      )}
    </div>
  );
}
