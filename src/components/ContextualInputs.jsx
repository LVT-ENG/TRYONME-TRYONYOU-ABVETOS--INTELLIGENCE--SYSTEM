import { useState } from 'react';
import { motion } from 'framer-motion';

const ContextualInputs = ({ onComplete, measurements }) => {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    occasion: null,
    fitPreference: null,
    height: '',
    weight: ''
  });

  const occasions = [
    { id: 'work', label: 'Work', icon: '💼', description: 'Professional settings' },
    { id: 'event', label: 'Event', icon: '✨', description: 'Special occasions' },
    { id: 'daily', label: 'Daily', icon: '☀️', description: 'Everyday wear' },
    { id: 'casual', label: 'Casual', icon: '👕', description: 'Relaxed style' }
  ];

  const fitPreferences = [
    { id: 'comfortable', label: 'Comfortable', icon: '🌊', description: 'Relaxed and free' },
    { id: 'fitted', label: 'Fitted', icon: '📐', description: 'Tailored and structured' },
    { id: 'fluid', label: 'Fluid', icon: '💫', description: 'Flowing and elegant' }
  ];

  const handleOccasionSelect = (occasion) => {
    setInputs(prev => ({ ...prev, occasion }));
    setTimeout(() => setStep(2), 300);
  };

  const handleFitSelect = (fitPreference) => {
    setInputs(prev => ({ ...prev, fitPreference }));
    setTimeout(() => setStep(3), 300);
  };

  const handleComplete = () => {
    onComplete({
      ...inputs,
      measurements
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Step 1: Occasion */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-light text-white tracking-wide">
                What's the occasion?
              </h2>
              <p className="text-slate-400 text-lg">
                Help us find the perfect fit for your moment
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {occasions.map((occasion) => (
                <button
                  key={occasion.id}
                  onClick={() => handleOccasionSelect(occasion.id)}
                  className="group relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center space-y-3">
                    <div className="text-4xl">{occasion.icon}</div>
                    <div className="text-white font-medium">{occasion.label}</div>
                    <div className="text-slate-400 text-sm">{occasion.description}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-300" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Fit Preference */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-light text-white tracking-wide">
                How do you like to feel?
              </h2>
              <p className="text-slate-400 text-lg">
                Your comfort defines your style
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fitPreferences.map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => handleFitSelect(pref.id)}
                  className="group relative p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center space-y-4">
                    <div className="text-5xl">{pref.icon}</div>
                    <div className="text-white font-medium text-xl">{pref.label}</div>
                    <div className="text-slate-400">{pref.description}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-300" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Optional measurements */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-light text-white tracking-wide">
                Almost there...
              </h2>
              <p className="text-slate-400 text-lg">
                Optional: Confirm your approximate measurements
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <label className="text-slate-300 text-sm">Height (cm) - Optional</label>
                <input
                  type="number"
                  value={inputs.height}
                  onChange={(e) => setInputs(prev => ({ ...prev, height: e.target.value }))}
                  placeholder="e.g., 175"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 text-sm">Weight (kg) - Optional</label>
                <input
                  type="number"
                  value={inputs.weight}
                  onChange={(e) => setInputs(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder="e.g., 70"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>

              <button
                onClick={handleComplete}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                Find My Perfect Fit
              </button>

              <button
                onClick={handleComplete}
                className="w-full px-8 py-3 text-slate-400 hover:text-white transition-colors text-sm"
              >
                Skip and continue
              </button>
            </div>
          </motion.div>
        )}

        {/* Progress indicator */}
        <div className="mt-12 flex justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-cyan-500 w-8' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContextualInputs;
