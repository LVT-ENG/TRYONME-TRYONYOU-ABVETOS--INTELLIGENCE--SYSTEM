import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContextualInputs = ({ onContextComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ occasion: '', sensation: '' });

  const handleSelection = (key, value) => {
    const newData = { ...data, [key]: value };
    setData(newData);

    if (step === 1) {
      // Pequeño delay para que se sienta conversacional
      setTimeout(() => setStep(2), 400); 
    } else {
      setTimeout(() => onContextComplete(newData), 400);
    }
  };

  const occasions = [
    { value: 'casual', label: 'Casual Day' },
    { value: 'work', label: 'Work' },
    { value: 'formal', label: 'Formal Event' },
    { value: 'party', label: 'Party/Night Out' },
    { value: 'sport', label: 'Sport/Active' },
    { value: 'date', label: 'Date Night' },
  ];

  const sensations = [
    { value: 'confident', label: 'Confident' },
    { value: 'elegant', label: 'Elegant' },
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'bold', label: 'Bold' },
    { value: 'sophisticated', label: 'Sophisticated' },
    { value: 'relaxed', label: 'Relaxed' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center mb-8 gradient-text">
              What's the occasion?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {occasions.map((occasion) => (
                <SelectionButton
                  key={occasion.value}
                  label={occasion.label}
                  onClick={() => handleSelection('occasion', occasion.value)}
                  selected={data.occasion === occasion.value}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center mb-8 gradient-text">
              How do you want to feel?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {sensations.map((sensation) => (
                <SelectionButton
                  key={sensation.value}
                  label={sensation.label}
                  onClick={() => handleSelection('sensation', sensation.value)}
                  selected={data.sensation === sensation.value}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Manus: Si puedes mejorar el CSS de estos botones para que parezcan cristal, adelante.
const SelectionButton = ({ label, onClick, selected }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={`
      relative overflow-hidden px-6 py-4 rounded-xl font-medium
      transition-all duration-300 text-white
      ${selected 
        ? 'bg-gradient-to-br from-white/20 to-white/10 border-2 border-gold shadow-lg shadow-gold/30' 
        : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
      }
      backdrop-blur-lg
    `}
  >
    {/* Glass reflection effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
    
    {/* Shimmer effect on hover */}
    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
      <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer" />
    </div>
    
    {/* Text */}
    <span className="relative z-10 block text-center">{label}</span>
    
    {/* Selected indicator */}
    {selected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold shadow-lg shadow-gold/50"
      />
    )}
  </motion.button>
);

export default ContextualInputs;
