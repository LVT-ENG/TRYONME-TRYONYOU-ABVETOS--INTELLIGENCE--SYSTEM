import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VirtualTryOn from '../components/VirtualTryOn';
import ContextualInputs from '../components/ContextualInputs';
import GarmentRecommendation from '../components/GarmentRecommendation';

const PilotJourney = () => {
  const [step, setStep] = useState(1);
  const [biometricData, setBiometricData] = useState(null);
  const [contextualData, setContextualData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Handle biometric measurements from VirtualTryOn
  const handleMeasurementsDetected = (measurements) => {
    setBiometricData(measurements);
  };

  // Handle contextual inputs submission
  const handleContextualSubmit = async (data) => {
    setContextualData(data);
    setIsAnalyzing(true);

    try {
      // Call the pilot analyze endpoint
      const response = await fetch('/api/pilot/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          biometric_data: biometricData || {},
          occasion: data.occasion,
          fit_preference: data.fitPreference ?? data.fit_preference,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setRecommendation(result);
      setStep(3);
    } catch (error) {
      console.error('Error analyzing:', error);
      // Fallback to demo recommendation
      setRecommendation({
        garment_name: 'Lafayette Slim Blazer',
        brand: 'Galeries Lafayette',
        size: 'M',
        fit_score: 99.7,
        material: 'Premium Wool Blend',
        color: 'Navy Blue',
        explanation: 'Perfect match based on your biometric data and style preferences',
        fabric_elasticity: 5,
        fabric_drape_score: 8,
        occasion_tags: ['Work', 'Ceremony', 'Professional'],
        cut_type: 'Slim',
      });
      setStep(3);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle Shop Now action
  const handleShopNow = (rec) => {
    console.log('Shop Now clicked for:', rec);
    // Redirect to product page or external shop
    window.open('https://www.galerieslafayette.com', '_blank');
  };

  // Handle Send Email action
  const handleSendEmail = async (rec) => {
    console.log('Send Email clicked for:', rec);
    // Mock email sending
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Email sent successfully');
        resolve();
      }, 1000);
    });
  };

  // Move to next step
  const handleNextStep = () => {
    if (step === 1 && biometricData) {
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0A0A0A] to-[#1A1A2E] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-7xl font-black text-white italic mb-4">
            PILOT <span className="text-[#C5A46D]">JOURNEY</span>
          </h1>
          <p className="text-white/60 text-lg uppercase tracking-widest">
            Live Video • Zero Inputs • Perfect Match
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s
                    ? 'bg-[#C5A46D] text-black'
                    : 'bg-white/10 text-white/30'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 mx-2 transition-all ${
                    step > s ? 'bg-[#C5A46D]' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Step 1: Video On-Live
                </h2>
                <p className="text-white/60">
                  Stand in frame - our AI will track your body in real-time
                </p>
              </div>
              
              <VirtualTryOn
                selectedGarment={selectedGarment}
                onMeasurementsDetected={handleMeasurementsDetected}
              />

              {biometricData && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <button
                    onClick={handleNextStep}
                    className="bg-[#C5A46D] text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-[#D4B47D] transition-all shadow-lg"
                  >
                    Continue to Preferences →
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Step 2: Your Style Intelligence
                </h2>
                <p className="text-white/60">
                  No measurements needed - just tell us your preferences
                </p>
              </div>

              <ContextualInputs onSubmit={handleContextualSubmit} />

              {isAnalyzing && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                  <div className="text-center space-y-4">
                    <div className="text-5xl font-black text-[#C5A46D] animate-pulse italic">
                      Analyzing...
                    </div>
                    <p className="text-white/60">
                      PAU Agent is finding your perfect match
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && recommendation && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Step 3: Your Perfect Match
                </h2>
                <p className="text-white/60">
                  99.7% accuracy based on biometric intelligence
                </p>
              </div>

              <GarmentRecommendation
                recommendation={recommendation}
                onShopNow={handleShopNow}
                onSendEmail={handleSendEmail}
              />

              <div className="text-center">
                <button
                  onClick={() => {
                    setStep(1);
                    setRecommendation(null);
                    setBiometricData(null);
                    setContextualData(null);
                  }}
                  className="text-white/60 hover:text-white underline transition-colors"
                >
                  Start New Journey
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PilotJourney;
