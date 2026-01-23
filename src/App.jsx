import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';

// --- Assets Logic (Using the rescued assets) ---
const ASSETS = {
  pau: '/assets/branding/pau_tuxedo_agent.png',
  hero: '/assets/ui/lafayette_hero_banner.png',
  redDress: '/assets/catalog/red_dress_minimal.png',
  trench: '/assets/catalog/burberry_trench.png',
  scanOverlay: '/assets/ui/biometric_scan_ui.png'
};

export default function PilotJourney() {
  const [step, setStep] = useState(1); // 1: Landing, 2: Scanner, 3: Context, 4: Result
  const [occasion, setOccasion] = useState(null);
  const [feeling, setFeeling] = useState(null);
  const webcamRef = useRef(null);

  const gold = '#D3B26A';
  const black = '#050505';

  const nextStep = () => setStep(s => s + 1);

  // Auto-advance scanner after 5 seconds
  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => nextStep(), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-serif overflow-hidden relative">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: LANDING ("La Revelación") */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen text-center p-6"
          >
            <div className="mb-8">
              <h2 className="text-xs tracking-[0.4em] text-gray-400 mb-2">GALERIES LAFAYETTE</h2>
              <h1 className="text-5xl font-light tracking-tighter text-white">
                PAU LE PAON
              </h1>
            </div>

            {/* Pau Image or Placeholder */}
            <div className="w-64 h-64 mb-8 rounded-full overflow-hidden border border-[#D3B26A]/30 relative bg-[#111]">
               <img
                 src={ASSETS.pau}
                 onError={(e) => e.target.style.display='none'}
                 alt="Pau Agent"
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#D3B26A] opacity-20 text-xs">
                 [AGENT 001]
               </div>
            </div>

            <p className="text-[#D3B26A] tracking-[0.2em] text-sm mb-12">
              ZÉRO TAILLE · ZÉRO CHIFFRE
            </p>

            <button
              onClick={nextStep}
              className="px-12 py-4 bg-gradient-to-r from-[#D3B26A] to-[#E5C96B] text-black font-bold tracking-widest text-xs hover:scale-105 transition-transform duration-500"
            >
              DEMO
            </button>
          </motion.div>
        )}

        {/* STEP 2: SCANNER ("Virtual Mirror") */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative h-screen w-full flex items-center justify-center bg-black"
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            {/* Overlay UI */}
            <div className="absolute inset-0 border-[20px] border-[#050505] pointer-events-none z-10"></div>

            {/* Scan Line Animation */}
            <motion.div
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-[2px] bg-[#D3B26A] shadow-[0_0_20px_#D3B26A] z-20"
            />

            <div className="absolute bottom-20 text-center z-30">
              <p className="text-[#D3B26A] tracking-[0.3em] text-xs animate-pulse">
                ANALYSING BIOMETRICS...
              </p>
            </div>
          </motion.div>
        )}

        {/* STEP 3: INPUT ("La Preferencia") */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-screen p-8 max-w-md mx-auto"
          >
            <h2 className="text-2xl text-[#D3B26A] mb-12 tracking-widest font-light">CONTEXTE</h2>

            <div className="space-y-8 w-full">
              <div>
                <label className="block text-xs text-gray-500 mb-4 tracking-widest uppercase">Occasion</label>
                <div className="grid grid-cols-2 gap-4">
                  {['EVENT', 'DAILY'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setOccasion(opt)}
                      className={`p-4 border text-xs tracking-widest transition-all ${occasion === opt ? 'border-[#D3B26A] text-[#D3B26A] bg-[#D3B26A]/10' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-4 tracking-widest uppercase">Feeling</label>
                <div className="grid grid-cols-2 gap-4">
                  {['FITTED', 'RELAXED'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setFeeling(opt)}
                      className={`p-4 border text-xs tracking-widest transition-all ${feeling === opt ? 'border-[#D3B26A] text-[#D3B26A] bg-[#D3B26A]/10' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={!occasion || !feeling}
              className={`mt-16 px-12 py-4 font-bold tracking-widest text-xs transition-all ${(!occasion || !feeling) ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-[#D3B26A] to-[#E5C96B] text-black hover:scale-105'}`}
            >
              RÉVÉLER
            </button>
          </motion.div>
        )}

        {/* STEP 4: RESULT ("El Espejo Inteligente") */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="relative h-screen w-full bg-black overflow-hidden"
          >
            {/* Background Feed (Simulated Mirror) */}
            <Webcam
              audio={false}
              ref={webcamRef}
              className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
            />

            {/* The Product Overlay (Virtual Try-On Placeholder) */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <motion.img
                initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src={ASSETS.redDress}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src="https://via.placeholder.com/400x600/330000/D3B26A?text=Divineo+Red+Dress";
                }}
                alt="Divineo Red Dress"
                className="max-h-[80vh] w-auto drop-shadow-[0_0_50px_rgba(211,178,106,0.2)]"
              />
            </div>

            {/* UI Overlay */}
            <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
               <div className="max-w-md mx-auto text-center">
                 <h3 className="text-2xl text-white font-light mb-2 tracking-widest">ROBE DIVINEO</h3>
                 <div className="flex justify-center items-center gap-2 text-[#D3B26A] text-xs tracking-[0.2em] mb-4">
                   <span className="w-2 h-2 bg-[#D3B26A] rounded-full animate-pulse"></span>
                   AJUSTEMENT: PARFAIT
                 </div>

                 <div className="flex gap-4 justify-center">
                   <button onClick={() => setStep(1)} className="text-gray-500 hover:text-white text-[10px] tracking-widest underline">RESTART</button>
                 </div>
               </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
