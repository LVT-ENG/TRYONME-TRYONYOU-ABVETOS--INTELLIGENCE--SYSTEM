import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Info } from 'lucide-react';

const VirtualTryOn = ({ userContext }) => {
  // TODO: This garment data will come from the backend (Divineo Red Dress)
  // Currently hardcoded as "Perfect Match"
  const garment = {
    name: "Robe Divineo Rouge",
    matchScore: 98.5,
    fabricId: "SILK-ELAST-04"
  };

  // Function to get match score label and color
  const getMatchLabel = (score) => {
    if (score >= 95) return { text: 'Perfect Match', color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500', progressColor: 'bg-green-500' };
    if (score >= 90) return { text: 'Excellent Match', color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500', progressColor: 'bg-green-500' };
    if (score >= 85) return { text: 'Great Match', color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500', progressColor: 'bg-blue-500' };
    if (score >= 80) return { text: 'Good Match', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500', progressColor: 'bg-yellow-500' };
    return { text: 'Fair Match', color: 'text-orange-400', bgColor: 'bg-orange-500/20', borderColor: 'border-orange-500', progressColor: 'bg-orange-500' };
  };

  const matchLabel = getMatchLabel(garment.matchScore);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center">
            <Sparkles size={24} className="text-ink" />
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text">Virtual Try-On</h2>
            <p className="text-sm text-white/60">AI-Powered Garment Analysis</p>
          </div>
        </div>

        {/* Garment Information */}
        <div className="space-y-4">
          {/* Garment Name */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/60 mb-1">Selected Garment</div>
                <div className="text-xl font-semibold text-white">{garment.name}</div>
              </div>
              <div className="text-3xl">👗</div>
            </div>
          </div>

          {/* Match Score */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`${matchLabel.bgColor} rounded-xl p-6 border-2 ${matchLabel.borderColor}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Check size={24} className={matchLabel.color} />
                <span className="font-semibold text-white">Fit Analysis</span>
              </div>
              <div className={`px-3 py-1 rounded-full glass ${matchLabel.color} text-sm font-bold`}>
                {matchLabel.text}
              </div>
            </div>

            {/* Score Display */}
            <div className="flex items-end gap-2">
              <div className={`text-5xl font-bold ${matchLabel.color}`}>
                {garment.matchScore}
              </div>
              <div className="text-2xl text-white/60 mb-2">/ 100</div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${garment.matchScore}%` }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className={`h-full ${matchLabel.progressColor} rounded-full`}
              />
            </div>
          </motion.div>

          {/* Fabric Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl p-4 border border-gold/30"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                <Info size={20} className="text-gold" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-white/60 mb-1">Fabric Composition</div>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-lg font-bold text-gold">{garment.fabricId}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">Premium</div>
                </div>
                <div className="text-sm text-white/70 mt-2">
                  High-quality silk-elastane blend for optimal comfort and fit
                </div>
              </div>
            </div>
          </motion.div>

          {/* User Context Info (if available) */}
          {userContext && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div className="text-xs text-white/60 mb-2">User Profile</div>
              <div className="text-sm text-white/80">
                Analysis based on your body measurements and style preferences
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-4 bg-gradient-to-r from-gold to-gold/80 rounded-xl font-semibold text-ink hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Sparkles size={20} />
          Try On This Garment
        </motion.button>
      </motion.div>
    </div>
  );
};

export default VirtualTryOn;
