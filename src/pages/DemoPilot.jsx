import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BodyScan from '../components/BodyScan';
import ContextualInputs from '../components/ContextualInputs';
import GarmentRecommendation from '../components/GarmentRecommendation';

const DemoPilot = () => {
  const [currentStep, setCurrentStep] = useState('intro'); // intro, scan, inputs, recommendation
  const [scanData, setScanData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const handleStartDemo = () => {
    setCurrentStep('scan');
  };

  const handleScanComplete = (measurements) => {
    setScanData(measurements);
    setCurrentStep('inputs');
  };

  const handleInputsComplete = (profile) => {
    setUserProfile(profile);
    setCurrentStep('recommendation');
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    setScanData(null);
    setUserProfile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <AnimatePresence mode="wait">
        {/* Intro Screen */}
        {currentStep === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-8"
          >
            <div className="max-w-3xl text-center space-y-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-6xl font-light text-white tracking-wide">
                  Welcome to the Experience
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed">
                  Discover the garment that perfectly adapts to you.
                  <br />
                  No sizes. No numbers. Just your best version.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <button
                  onClick={handleStartDemo}
                  className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium text-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50 hover:scale-105"
                >
                  Start Experience
                </button>

                <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Private & Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Under 2 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>No personal data stored</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-8"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    P
                  </div>
                  <p className="text-slate-300">
                    I'll guide you through the experience
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Body Scan Step */}
        {currentStep === 'scan' && (
          <motion.div
            key="scan"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <BodyScan onScanComplete={handleScanComplete} />
          </motion.div>
        )}

        {/* Contextual Inputs Step */}
        {currentStep === 'inputs' && (
          <motion.div
            key="inputs"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <ContextualInputs 
              onComplete={handleInputsComplete}
              measurements={scanData}
            />
          </motion.div>
        )}

        {/* Recommendation Step */}
        {currentStep === 'recommendation' && (
          <motion.div
            key="recommendation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
          >
            <GarmentRecommendation userProfile={userProfile} />
            
            {/* Restart button */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-slate-800/90 backdrop-blur-sm text-white rounded-full hover:bg-slate-700 transition-colors border border-slate-700 text-sm"
              >
                Try Another Experience
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator (except on intro) */}
      {currentStep !== 'intro' && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-6 py-3 bg-slate-900/90 backdrop-blur-sm rounded-full border border-slate-700">
            <div className={`w-2 h-2 rounded-full transition-colors ${currentStep === 'scan' ? 'bg-cyan-500' : 'bg-slate-600'}`} />
            <div className={`w-2 h-2 rounded-full transition-colors ${currentStep === 'inputs' ? 'bg-cyan-500' : 'bg-slate-600'}`} />
            <div className={`w-2 h-2 rounded-full transition-colors ${currentStep === 'recommendation' ? 'bg-cyan-500' : 'bg-slate-600'}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoPilot;
