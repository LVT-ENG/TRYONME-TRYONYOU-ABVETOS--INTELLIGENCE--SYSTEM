import React, { useState } from 'react';
import { LAFAYETTE_INVENTORY } from '../data/pilot_inventory';

interface ScanControlsProps {
  onRecommendationSelected: (recommendation: typeof LAFAYETTE_INVENTORY[0]) => void;
}

const ScanControls: React.FC<ScanControlsProps> = ({ onRecommendationSelected }) => {
  const [occasion, setOccasion] = useState('');
  const [feeling, setFeeling] = useState('');

  const handleFinishScan = () => {
    if (occasion && feeling) {
      // Logic: Filter by Intention AND Feeling (Cut)
      const match = LAFAYETTE_INVENTORY.find(item =>
        item.intention.includes(occasion.toLowerCase()) &&
        item.cut.toLowerCase() === feeling.toLowerCase()
      );

      // Fallback logic if no exact match
      const fallback = LAFAYETTE_INVENTORY.find(item =>
        item.cut.toLowerCase() === feeling.toLowerCase()
      );

      const recommendation = match || fallback || LAFAYETTE_INVENTORY[0];
      onRecommendationSelected(recommendation);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <div>
        <h2 className="text-[#C5A46D] text-xs tracking-[0.3em] uppercase mb-4">Silent Precision</h2>
        <p className="text-3xl font-light tracking-tight leading-tight text-white">
          "Precision is calibrated with real store data."
        </p>
      </div>

      {/* Voice/Text Inputs */}
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
          onClick={handleFinishScan}
          disabled={!occasion || !feeling}
          className="w-full py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#C5A46D] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reveal Recommendation
        </button>
      </div>
    </div>
  );
};

export default ScanControls;
