
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { UserCheck, ChevronRight, Loader2, Sparkles, Brain, CheckCircle2, Edit2, Save } from 'lucide-react';
import PAU from '../modules/PAU';
import { analyzeFit } from '../lib/matchingEngine';
import api from '../services/api';

// Proportional Body Schematic Component (SVG)
const BodySchematic = ({ measurements }) => {
  // Simple scalable vector body
  return (
    <div className="relative h-96 w-full flex items-center justify-center">
      <svg viewBox="0 0 200 400" className="h-full w-auto drop-shadow-[0_0_15px_rgba(211,178,106,0.3)]">
        {/* Abstract Head */}
        <circle cx="100" cy="50" r="25" stroke="#D3B26A" strokeWidth="2" fill="none" />
        {/* Torso */}
        <path d="M75 80 L125 80 L115 200 L85 200 Z" stroke="#D3B26A" strokeWidth="2" fill="none" />
        {/* Arms */}
        <line x1="75" y1="85" x2="40" y2="180" stroke="#D3B26A" strokeWidth="2" />
        <line x1="125" y1="85" x2="160" y2="180" stroke="#D3B26A" strokeWidth="2" />
        {/* Legs */}
        <line x1="85" y1="200" x2="70" y2="350" stroke="#D3B26A" strokeWidth="2" />
        <line x1="115" y1="200" x2="130" y2="350" stroke="#D3B26A" strokeWidth="2" />

        {/* Measurement Indicators */}
        <line x1="75" y1="80" x2="125" y2="80" stroke="#00ff00" strokeWidth="1" strokeDasharray="4 2" />
        <text x="135" y="85" fill="#00ff00" fontSize="10" className="font-mono">Shoulder: {measurements?.shoulder_width}cm</text>

        <line x1="80" y1="120" x2="120" y2="120" stroke="#00ff00" strokeWidth="1" strokeDasharray="4 2" />
        <text x="130" y="125" fill="#00ff00" fontSize="10" className="font-mono">Chest: {measurements?.chest}cm</text>

        <line x1="82" y1="160" x2="118" y2="160" stroke="#00ff00" strokeWidth="1" strokeDasharray="4 2" />
        <text x="5" y="165" fill="#00ff00" fontSize="10" className="font-mono text-right">Waist: {measurements?.waist}cm</text>
      </svg>
      <div className="absolute bottom-0 text-center w-full">
         <span className="text-abvetos-gold text-xs font-mono uppercase tracking-widest">Digital Twin Schematic</span>
      </div>
    </div>
  );
};

const ResultsView = ({ digitalTwin, setView, onReset, updateMeasurements }) => {
  const [step, setStep] = useState('verifying'); // verifying | analyzing
  const [editedMeasurements, setEditedMeasurements] = useState({});
  const [bestMatch, setBestMatch] = useState(null);
  const [matchAnalysis, setMatchAnalysis] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Initialize edited measurements with digital twin data
  useEffect(() => {
    if (digitalTwin?.measurements) {
      setEditedMeasurements(digitalTwin.measurements);
    }
  }, [digitalTwin]);

  // Fetch recommendations and run analysis when entering 'analyzing' step
  useEffect(() => {
    if (step === 'analyzing') {
      const runAnalysis = async () => {
        setLoadingAnalysis(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing
          const recommendations = await api.getRecommendations(digitalTwin.user_id);
          const topPick = recommendations[0]; // Assuming first is best for now
          setBestMatch(topPick);

          const analysis = analyzeFit(digitalTwin.measurements, topPick);
          setMatchAnalysis(analysis);
        } catch (error) {
          console.error("Analysis failed", error);
        } finally {
          setLoadingAnalysis(false);
        }
      };
      runAnalysis();
    }
  }, [step, digitalTwin]);

  const handleInputChange = (key, value) => {
    setEditedMeasurements(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleConfirm = async () => {
    try {
      await updateMeasurements(editedMeasurements);
      setStep('analyzing');
    } catch (error) {
      console.error("Failed to update measurements", error);
    }
  };

  if (step === 'verifying') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
        <div className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-abvetos-gold/30 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-abvetos-gold uppercase italic mb-2">Verify Data</h2>
            <p className="text-gray-400">Please confirm your biometric scan data for precision fitting.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(editedMeasurements).map(([key, value]) => {
              if (key === 'build') return null; // Skip non-numeric for now
              return (
                <div key={key} className="space-y-2">
                  <label className="text-xs uppercase font-bold text-abvetos-steel tracking-wider block">{key.replace('_', ' ')}</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleInputChange(key, parseInt(e.target.value))}
                      className="w-full bg-black/50 border border-abvetos-gold/20 rounded-lg p-3 text-abvetos-bone font-mono focus:border-abvetos-gold focus:outline-none transition-colors"
                    />
                    <span className="absolute right-3 top-3 text-xs text-gray-500">cm</span>
                  </div>
                </div>
              );
            })}
          </div>

          <Button onClick={handleConfirm} size="lg" className="w-full bg-abvetos-gold text-black font-black text-xl hover:bg-yellow-400 py-6 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(211,178,106,0.3)]">
            <CheckCircle2 size={24} />
            CONFIRM & ANALYZE
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 animate-in slide-in-from-bottom duration-500 pb-24">
      <div className="w-full max-w-6xl space-y-8 my-8">

        {/* Header */}
        <div className="flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase italic text-abvetos-gold">Biometric Analysis</h2>
            <p className="text-gray-400 font-mono text-sm">ID: {digitalTwin?.user_id} • Status: VERIFIED</p>
          </div>
          <Button onClick={() => setStep('verifying')} variant="outline" className="border-abvetos-gold/30 text-abvetos-gold hover:bg-abvetos-gold/10">
            <Edit2 size={16} className="mr-2" /> Edit Data
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Column 1: Body Schematic */}
          <div className="lg:col-span-1 bg-gradient-to-b from-gray-900/50 to-black/50 border border-abvetos-gold/10 rounded-3xl p-6 flex flex-col items-center justify-center">
             <h3 className="text-xl font-bold text-white mb-4 w-full flex items-center gap-2">
               <UserCheck className="text-abvetos-gold"/> Structural Map
             </h3>
             <BodySchematic measurements={digitalTwin?.measurements} />
             <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                <div className="text-center p-2 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase">Height</div>
                  <div className="text-xl font-mono text-white">{digitalTwin?.measurements?.height}cm</div>
                </div>
                <div className="text-center p-2 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase">Weight</div>
                  <div className="text-xl font-mono text-white">{digitalTwin?.measurements?.weight}kg</div>
                </div>
             </div>
          </div>

          {/* Column 2 & 3: Analysis & Recommendation */}
          <div className="lg:col-span-2 space-y-6">

            {/* Matching Engine Output */}
            <div className="bg-abvetos-anthracite/40 border border-abvetos-gold/20 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles size={120} />
              </div>

              <h3 className="text-2xl font-black italic text-white mb-6 flex items-center gap-3">
                <Brain className="text-purple-400" />
                MATCHING ENGINE v2.1
              </h3>

              {loadingAnalysis ? (
                 <div className="flex flex-col items-center justify-center h-48 space-y-4">
                   <Loader2 className="animate-spin text-abvetos-gold" size={48} />
                   <p className="text-abvetos-gold/80 animate-pulse font-mono">Running physics simulation...</p>
                 </div>
              ) : bestMatch && matchAnalysis ? (
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <img
                    src={bestMatch.image}
                    alt={bestMatch.name}
                    className="w-48 h-64 object-cover rounded-2xl shadow-lg border border-white/10"
                  />
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-abvetos-gold font-bold uppercase tracking-wider text-sm mb-1">Top Recommendation</div>
                        <h4 className="text-3xl font-black text-white leading-none">{bestMatch.name}</h4>
                      </div>
                      <div className="bg-green-500/20 text-green-400 border border-green-500/50 px-4 py-2 rounded-full font-black text-xl">
                        {matchAnalysis.score}% FIT
                      </div>
                    </div>

                    <div className="bg-black/40 p-4 rounded-xl border-l-4 border-abvetos-gold">
                      <p className="text-gray-300 italic">
                        "{matchAnalysis.explanation}"
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between border-b border-white/10 pb-1">
                        <span className="text-gray-500">Fabric</span>
                        <span className="text-white">{bestMatch.fabric?.composition}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-1">
                        <span className="text-gray-500">Elasticity</span>
                        <span className="text-white">{bestMatch.fabric?.elasticity}%</span>
                      </div>
                    </div>

                    <Button onClick={() => setView('catalog')} className="w-full mt-4 bg-white text-black hover:bg-gray-200 font-bold">
                      View In Catalog <ChevronRight size={16} className="ml-2"/>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-red-400">Analysis Error. Please rescanning.</div>
              )}
            </div>

            {/* Detailed Measurements Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               {['arm_length', 'leg_length', 'torso_length', 'hips'].map(metric => (
                 <div key={metric} className="bg-gray-900/30 border border-white/5 p-4 rounded-2xl">
                   <div className="text-gray-500 text-xs uppercase font-bold mb-1">{metric.replace('_', ' ')}</div>
                   <div className="text-2xl font-mono text-white">{digitalTwin?.measurements?.[metric]}cm</div>
                 </div>
               ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
