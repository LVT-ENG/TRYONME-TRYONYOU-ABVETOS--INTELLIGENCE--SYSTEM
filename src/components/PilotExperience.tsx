import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import MemoizedWebcam from './MemoizedWebcam';
import BusinessModal from './BusinessModal';
import ScanningOverlay from './ScanningOverlay';
import BiometricStatus from './BiometricStatus';
import ScanControls from './ScanControls';
import { LAFAYETTE_INVENTORY } from '../data/pilot_inventory';

const PilotExperience = () => {
  const [step, setStep] = useState<'scan' | 'result'>('scan');
  // scanningProgress logic moved to ScanningOverlay to prevent re-renders
  const webcamRef = useRef<Webcam>(null);
  
  // Recommendation State
  const [recommendation, setRecommendation] = useState(LAFAYETTE_INVENTORY[0]);
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  // --- RECOMMENDATION ENGINE ---
  const handleRecommendation = (rec: typeof LAFAYETTE_INVENTORY[0]) => {
    setRecommendation(rec);
    setStep('result');
  };

  return (
    <div className="bg-[#141619] min-h-screen text-[#F0F0F0] overflow-x-hidden font-sans">
      
      {/* Biometric Engine Status */}
      <BiometricStatus />
      
      {/* LUXURY HEADER */}
      <header className="floating-logo">
        <div className="luxury-logo">TRYONYOU</div>
        <nav className="mt-6 flex justify-center space-x-12">
          <span className={`nav-link ${step === 'scan' ? 'text-[#C5A46D]' : ''}`}>Studio</span>
          <span className={`nav-link ${step === 'result' ? 'text-[#C5A46D]' : ''}`}>Wardrobe</span>
          <span className="nav-link">Checkout</span>
        </nav>
      </header>

      <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
        
        {/* SECTION 1: STUDIO (SCAN & INPUTS) */}
        {step === 'scan' && (
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
                {/* Scan Overlay */}
                <ScanningOverlay />
              </div>

              {/* RIGHT: TEXT & INPUTS */}
              <ScanControls onRecommendationSelected={handleRecommendation} />

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
              </div>

              {/* RIGHT: HUMAN MESSAGE */}
              <div className="order-1 lg:order-2 space-y-8 animate-fadeIn">
                <h3 className="text-[#C5A46D] text-[10px] tracking-[0.4em] uppercase">Personalized Recommendation</h3>
                <p className="text-4xl font-serif text-white uppercase leading-tight">
                  "{recommendation.name}"
                </p>
                <p className="text-xl text-white font-light italic tracking-wide leading-relaxed max-w-md border-l-2 border-[#C5A46D] pl-6">
                  "{recommendation.human_message}"
                </p>
                <p className="text-gray-500 text-xs uppercase tracking-widest pt-4">
                  ID: {recommendation.id} · Cut: {recommendation.cut}
                </p>
                
                <div className="pt-8 flex gap-4">
                  <button className="px-8 py-3 bg-[#C5A46D] text-black text-[10px] uppercase tracking-[0.2em]">
                    Shop Now
                  </button>
                  <button 
                    onClick={() => setStep('scan')}
                    className="px-8 py-3 border border-white/20 text-white text-[10px] uppercase tracking-[0.2em]"
                  >
                    Restart
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
