import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Activity } from 'lucide-react';

import Landing from './Landing';
import ScannerView from './components/ScannerView';
import ResultsView from './components/ResultsView';
import CatalogView from './components/CatalogView';
import Dashboard from './dashboard/Dashboard';
import { useCamera } from './hooks/useCamera';
import { useBiometrics } from './hooks/useBiometrics';

export default function App() {
  const [view, setView] = useState('landing');
  const camera = useCamera();
  const { digitalTwin, isProcessing, processBiometry, resetTwin } = useBiometrics();

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
      setView('results');
    } catch (error) {
      alert(error.message || "No se pudo crear el gemelo digital. Inténtalo de nuevo.");
      setView('landing');
    }
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
      case 'results':
        return (
          <ResultsView 
            digitalTwin={digitalTwin} 
            setView={setView}
            onReset={handleReset}
          />
        );
      case 'catalog':
        return (
          <CatalogView 
            digitalTwin={digitalTwin} 
            setView={setView}
            onBack={() => setView('results')}
          />
        );
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Landing startCamera={handleStartCamera} />;
    }
  };

  return (
    <div className="min-h-screen bg-abvetos-anthracite text-abvetos-bone font-sans italic">
      {view !== 'landing' && view !== 'dashboard' && (
        <header className="p-6 flex justify-between items-center border-b border-abvetos-gold/10 bg-abvetos-anthracite/50 backdrop-blur-xl fixed w-full z-50">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <Sparkles className="text-abvetos-gold" size={20} />
            <span className="font-black tracking-tighter text-xl">TRYONYOU</span>
          </div>
          <div className="flex items-center gap-4">
            <Activity 
              className="text-abvetos-gold cursor-pointer hover:scale-110 transition-transform" 
              size={20}
              onClick={() => setView('dashboard')}
              title="System Dashboard"
            />
            <span className="text-[10px] text-abvetos-steel font-mono hidden md:block">PAT: PCT/EP2025/067317</span>
            <ShieldCheck className="text-green-500" size={20} />
          </div>
        </header>
      )}

      <main className={view !== 'landing' && view !== 'dashboard' ? "pt-24" : ""}>
        {renderContent()}
      </main>
    </div>
  );
}
