import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContextualInputs = ({ onSubmit }) => {
  const [occasion, setOccasion] = useState('');
  const [fitPreference, setFitPreference] = useState('');

  const occasions = [
    { value: 'work', label: 'Work / Professional', icon: '💼' },
    { value: 'event', label: 'Special Event', icon: '🎉' },
    { value: 'casual', label: 'Casual / Daily', icon: '👕' },
    { value: 'ceremony', label: 'Ceremony / Formal', icon: '🎩' },
  ];

  const fitPreferences = [
    { value: 'slim', label: 'Slim Fit', description: 'Close to body, modern silhouette' },
    { value: 'regular', label: 'Regular Fit', description: 'Comfortable, classic fit' },
    { value: 'relaxed', label: 'Relaxed Fit', description: 'Loose, comfortable style' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (occasion && fitPreference) {
      onSubmit({ occasion, fitPreference });
    }
  };

  const isFormValid = occasion && fitPreference;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Tell Us Your Style</h2>
          <p className="text-white/60">
            No measurements needed - just your preferences
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Occasion Selection */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-white">
              What's the occasion?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {occasions.map((occ) => (
                <motion.button
                  key={occ.value}
                  type="button"
                  onClick={() => setOccasion(occ.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    occasion === occ.value
                      ? 'border-[#C5A46D] bg-[#C5A46D]/20'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{occ.icon}</span>
                    <div className="text-left">
                      <p className="text-white font-semibold">{occ.label}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Fit Preference Selection */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-white">
              How do you like your fit?
            </label>
            <div className="grid grid-cols-1 gap-4">
              {fitPreferences.map((fit) => (
                <motion.button
                  key={fit.value}
                  type="button"
                  onClick={() => setFitPreference(fit.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    fitPreference === fit.value
                      ? 'border-[#C5A46D] bg-[#C5A46D]/20'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="text-left">
                    <p className="text-white font-bold text-lg">{fit.label}</p>
                    <p className="text-white/60 text-sm mt-1">{fit.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`w-full py-6 rounded-2xl font-bold text-xl transition-all ${
              isFormValid
                ? 'bg-[#C5A46D] text-black hover:bg-[#D4B47D] cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {isFormValid ? 'Find My Perfect Match' : 'Please Select Both Options'}
          </motion.button>
        </form>

        {/* Info Note */}
        <div className="text-center text-white/40 text-sm">
          <p>✨ Our AI uses body tracking instead of manual measurements</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContextualInputs;
