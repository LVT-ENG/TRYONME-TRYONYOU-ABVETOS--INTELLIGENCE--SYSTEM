/**
 * TRYONYOU - ABVETOS Intelligence System
 * Patent: PCT/EP2025/067317
 * Version: 2.1.0 "ULTIMATUM"
 * 
 * Revolutionary biometric commerce platform combining AR try-on,
 * emotional AI, and just-in-time production.
 */

import { useState, Suspense, lazy } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

import Landing from './Landing';
const ScannerView = lazy(() => import('./components/ScannerView'));
const ResultsView = lazy(() => import('./components/ResultsView'));
const InputView = lazy(() => import('./components/InputView'));
// Bolt Optimization: Lazy load LanguageTranslator (named export)
const LanguageTranslator = lazy(() => import('./components/LanguageTranslator').then(module => ({ default: module.LanguageTranslator })));
import { useCamera } from './hooks/useCamera';
import { useBiometrics } from './hooks/useBiometrics';
import { findBestFit } from './lib/matchingEngine';

export default function App() {
  const [view, setView] = useState('landing');
  const [, setUserPreferences] = useState(null);
  const [matchedGarment, setMatchedGarment] = useState(null);
  const camera = useCamera();
  const { digitalTwin, isProcessing, processBiometry, resetTwin, updateMeasurements } = useBiometrics();

  const handleStartCamera = async () => {
    try {
      setView('scanner');
      await camera.startCamera('user');
    } catch (error) {
      alert(error.message);
      setView('landing');
    }
  };

  const handleProcessBiometry = async () => {
    try {
      const imageData = camera.captureFrame();
      camera.stopCamera();
      await processBiometry(imageData);
      setView('input'); // Flow Change: Scanner -> Input
    } catch (error) {
      alert(error.message || "Scan failed.");
      setView('landing');
    }
  };

  const handleInputComplete = (data) => {
    // Merge new data (weight, height override)
    updateMeasurements({
      height: data.height,
      weight: data.weight
    });

    const prefs = { occasion: data.occasion, fitPreference: data.fitPreference };
    setUserPreferences(prefs);

    // Run Matching Engine
    // Note: In a real app, this would use the updated digitalTwin state,
    // but React state updates are async, so we use the data directly here + current twin
    const currentMeasurements = { ...digitalTwin?.measurements, height: data.height };
    const bestFit = findBestFit(currentMeasurements, prefs);

    setMatchedGarment(bestFit);
    setView('results');
  };

  const handleReset = () => {
    camera.stopCamera();
    resetTwin();
    setView('landing');
  };

  const renderContent = () => {
    switch (view) {
      case 'scanner':
        return (
          <ScannerView 
            videoRef={camera.videoRef} 
            isAnalyzing={isProcessing} 
            processBiometry={handleProcessBiometry}
            onCancel={handleReset}
          />
        );
      case 'input':
        return (
          <InputView
             initialMeasurements={digitalTwin?.measurements}
             onComplete={handleInputComplete}
          />
        );
      case 'results':
        return (
          <ResultsView
            digitalTwin={digitalTwin} 
            matchedGarment={matchedGarment}
            onReset={handleReset}
            setView={setView}
          />
        );
      default:
        return <Landing startCamera={handleStartCamera} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {view !== 'landing' && (
        <header className="p-6 flex justify-between items-center border-b border-white/10 bg-black/50 backdrop-blur-xl fixed w-full z-50">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <Sparkles className="text-abvetos-gold" size={20} />
            <span className="font-black tracking-tighter text-xl">TRYONYOU</span>
          </div>
          <div className="flex items-center gap-4">
            <Suspense fallback={<div className="w-4 h-4 rounded-full bg-abvetos-gold/20 animate-pulse" />}>
              <LanguageTranslator />
            </Suspense>
            <span className="text-[10px] text-gray-500 font-mono hidden md:block">PILOT MODE: ENABLED</span>
          </div>
        </header>
      )}

      <main className={view !== 'landing' ? "pt-24" : ""}>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-abvetos-gold" size={48} />
          </div>
        }>
          {renderContent()}
        </Suspense>
      </main>
    </div>
  );
}
