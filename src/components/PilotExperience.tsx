import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import MemoizedWebcam from './MemoizedWebcam';
import BusinessModal from './BusinessModal';
import ScanningOverlay from './ScanningOverlay';
import BiometricStatus from './BiometricStatus';

// --- LAFAYETTE INVENTORY INTEGRATION ---
const LAFAYETTE_INVENTORY = [
  {
    id: "GL-9928",
    name: "Structured Blazer",
    type: "Blazer",
    cut: "Fitted", // Maps to 'Fitted' feeling
    elasticity: "Low",
    drape: "Firm",
    intention: ["work", "event"],
    body_range: "Defined Shoulders",
    human_message: "This blazer respects your natural structure, ideal for an elegant presence.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"
  },
  {
    id: "GL-4412",
    name: "Fluid Midi Dress",
    type: "Midi Dress",
    cut: "Fluid", // Maps to 'Fluid' feeling
    elasticity: "Medium",
    drape: "High",
    intention: ["casual", "daily"],
    body_range: "Free Movement",
    human_message: "The drape of this fabric accompanies your walk without restrictions.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop"
  },
  {
    id: "GL-Relaxed",
    name: "Relaxed City Coat",
    type: "Coat",
    cut: "Relaxed", // Maps to 'Relaxed' feeling
    elasticity: "High",
    drape: "Soft",
    intention: ["daily", "work"],
    body_range: "Comfort First",
    human_message: "Effortless elegance that moves with your daily rhythm.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop"
  }
];

const PilotExperience = () => {
  const [step, setStep] = useState<'input' | 'scanning' | 'result'>('input');
  const webcamRef = useRef<Webcam>(null);
  
  // Inputs
  const [occasion, setOccasion] = useState('');
  const [feeling, setFeeling] = useState('');
  
  // Recommendation State
  const [recommendation, setRecommendation] = useState(LAFAYETTE_INVENTORY[0]);
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  // --- TRANSITION LOGIC ---
  const handleStartScan = () => {
    if (occasion && feeling) {
       setStep('scanning');
    }
  };

  useEffect(() => {
    if (step === 'scanning') {
      const timer = setTimeout(() => {
        // Logic: Filter by Intention AND Feeling (Cut)
        const match = LAFAYETTE_INVENTORY.find(item =>
          item.intention.includes(occasion.toLowerCase()) &&
          item.cut.toLowerCase() === feeling.toLowerCase()
        );

        // Fallback logic if no exact match
        const fallback = LAFAYETTE_INVENTORY.find(item =>
          item.cut.toLowerCase() === feeling.toLowerCase()
        );

        setRecommendation(match || fallback || LAFAYETTE_INVENTORY[0]);
        setStep('result');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [step, occasion, feeling]);

  return (
    <div className="bg-[#141619] min-h-screen text-[#F0F0F0] overflow-x-hidden font-sans">
      
      {/* Biometric Engine Status */}
      <BiometricStatus />
      
      {/* LUXURY HEADER */}
      <header className="floating-logo">
        <div className="luxury-logo">TRYONYOU</div>
        <nav className="mt-6 flex justify-center space-x-12">
          <span className={`nav-link ${step === 'input' || step === 'scanning' ? 'text-[#C5A46D]' : ''}`}>Studio</span>
          <span className={`nav-link ${step === 'result' ? 'text-[#C5A46D]' : ''}`}>Wardrobe</span>
          <span className="nav-link">Checkout</span>
        </nav>
      </header>

      <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
        
        {/* SECTION 1: STUDIO (SCAN & INPUTS) */}
        {(step === 'input' || step === 'scanning') && (
          <section className="main-stage snap-start">
            <div className="visual-content-split">
              
              {/* LEFT: VISUAL (Webcam/Scan) */}
              <div className="photo-container border border-white/10">
                <MemoizedWebcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover opacity-80"
                />
                {/* Scan Overlay - Only visible during scanning */}
                {step === 'scanning' && <ScanningOverlay />}
              </div>

              {/* RIGHT: TEXT & INPUTS */}
              <div className="space-y-10 animate-fadeIn">
                <div>
                  <h2 className="text-[#C5A46D] text-xs tracking-[0.3em] uppercase mb-4">Silent Precision</h2>
                  <p className="text-3xl font-light tracking-tight leading-tight text-white">
                    {step === 'scanning' ? "Analyse biométrique en cours..." : "Precision is calibrated with real store data."}
                  </p>
                </div>

                {/* Voice/Text Inputs - Hidden during scanning */}
                {step === 'input' && (
                  <div className="space-y-8 pt-8 border-t border-white/5">
                    <div className="space-y-4">
                      <label className="text-gray-500 text-[10px] uppercase tracking-widest">Occasion</label>
                      <div className="flex gap-3">
                        {['Work', 'Event', 'Daily'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => setOccasion(opt)}
                            className={`px-6 py-3 border ${occasion === opt ? 'bg-[#C5A46D] text-black border-[#C5A46D]' : 'border-white/20 text-gray-400'} text-[10px] uppercase tracking-wider transition-all`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-gray-500 text-[10px] uppercase tracking-widest">Feeling</label>
                      <div className="flex gap-3">
                        {['Fitted', 'Fluid', 'Relaxed'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => setFeeling(opt)}
                            className={`px-6 py-3 border ${feeling === opt ? 'bg-[#C5A46D] text-black border-[#C5A46D]' : 'border-white/20 text-gray-400'} text-[10px] uppercase tracking-wider transition-all`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleStartScan}
                      disabled={!occasion || !feeling}
                      className="w-full py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#C5A46D] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Lancer l'Analyse
                    </button>
                  </div>
                )}
              </div>

            </div>
          </section>
        )}

        {/* SECTION 2: WARDROBE (RESULT) */}
        {step === 'result' && (
          <section className="main-stage snap-start bg-[#0b0c0e]">
            <div className="visual-content-split">
              
              {/* LEFT: RESULT IMAGE */}
              <div className="photo-container order-2 lg:order-1">
                <img 
                  src={recommendation.image} 
                  className="photo-fill" 
                  alt={recommendation.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-transparent"></div>

                {/* MATCH BADGE */}
                 <div className="absolute top-10 left-10 bg-[#D3B26A] text-black px-4 py-2 text-[10px] uppercase tracking-widest font-bold">
                  Match 99.7%
                </div>
              </div>

              {/* RIGHT: HUMAN MESSAGE - STANDARDIZED FRENCH */}
              <div className="order-1 lg:order-2 space-y-8 animate-fadeIn">
                <h3 className="text-[#C5A46D] text-[10px] tracking-[0.4em] uppercase">Recommandation Personnalisée</h3>
                <p className="text-4xl font-serif text-white uppercase leading-tight">
                  "Robe de Soirée Soie"
                </p>
                <p className="text-xl text-white font-light italic tracking-wide leading-relaxed max-w-md border-l-2 border-[#C5A46D] pl-6">
                  "Tissu avec 12% d'élasticité qui épouse vos hanches sans serrer."
                </p>
                
                <div className="pt-8 flex gap-4">
                  <button className="px-8 py-3 bg-[#C5A46D] text-black text-[10px] uppercase tracking-[0.2em]">
                    Réserver en cabine
                  </button>
                  <button 
                    onClick={() => setStep('input')}
                    className="px-8 py-3 border border-white/20 text-white text-[10px] uppercase tracking-[0.2em]"
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={() => setShowBusinessModal(true)}
                    className="px-8 py-3 border border-[#C5A46D] text-[#C5A46D] text-[10px] uppercase tracking-[0.2em] hover:bg-[#C5A46D] hover:text-black transition-all"
                  >
                    Partner
                  </button>
                </div>
              </div>

            </div>
          </section>
        )}

      </main>
      
      {/* Business Modal Integration */}
      {showBusinessModal && (
        <BusinessModal onClose={() => setShowBusinessModal(false)} />
      )}
    </div>
  );
};

export default PilotExperience;
