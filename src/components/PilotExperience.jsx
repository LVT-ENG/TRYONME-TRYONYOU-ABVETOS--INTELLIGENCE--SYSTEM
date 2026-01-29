import React, { useState } from 'react';
import BodyScanner from './BodyScanner';
import InternalForm from './InternalForm';

const PilotExperience = () => {
  const [step, setStep] = useState('SCAN'); // SCAN -> FORM -> MATCH
  const [landmarks, setLandmarks] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const processMatch = (formData) => {
     // Combine landmarks and form data
     const payload = {
         ...formData,
         landmarks: landmarks
     };

     // Call API
     fetch('/api/recommend', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'X-Divineo-Token': import.meta.env.VITE_INTERNAL_SECRET_KEY
         },
         body: JSON.stringify(payload)
     })
     .then(res => res.json())
     .then(data => {
         setRecommendation(data);
         setStep('MATCH');
     })
     .catch(err => console.error("Error fetching recommendation", err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#141619] p-10 font-serif">
      <header className="mb-8 text-center">
        <h1 className="text-[#C5A46D] text-4xl tracking-widest uppercase">Galeries Lafayette</h1>
        <p className="text-white/40 tracking-widest text-sm mt-2">Divineo Experience by Jules</p>
      </header>

      <div className="flex flex-col items-center">
        {/* 1. ESCÁNER VISUAL (Sin interfaz de medidas) */}
        {step === 'SCAN' && (
            <BodyScanner onComplete={(lm) => { setLandmarks(lm); setStep('FORM'); }} />
        )}

        {/* 2. RECOGIDA DE DATOS (Solo para cálculo interno) */}
        {step === 'FORM' && (
            <div className="w-[400px]">
                <InternalForm onSubmit={processMatch} />
            </div>
        )}

        {/* 3. RESULTADO: El Espejo de Pau (Consolidado) */}
        {step === 'MATCH' && recommendation && (
            <div className="relative border-4 border-[#C5A46D] rounded-[100px] overflow-hidden shadow-2xl w-[800px] h-[450px] bg-black">
                <video src="/assets/pau-snap.mp4" autoPlay muted loop className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md p-6 border-t-4 border-[#C5A46D]">
                    <h2 className="text-[#C5A46D] text-2xl mb-2 font-light">{recommendation.product_name}</h2>
                    <p className="text-white/90 italic text-lg leading-relaxed">{recommendation.jules_narrative}</p>
                    {recommendation.fabric_analysis && (
                        <p className="text-white/50 text-xs mt-2 uppercase tracking-wider">{recommendation.fabric_analysis}</p>
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default PilotExperience;
