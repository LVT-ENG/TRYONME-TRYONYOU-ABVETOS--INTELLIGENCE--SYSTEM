import React from 'react';
import { motion } from 'framer-motion';

const PauMascot = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 left-4 z-50 pointer-events-none"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-tryonyou-gold/20 rounded-full blur-xl group-hover:bg-tryonyou-gold/40 transition-all duration-500" />
        <div className="relative w-16 h-16 glass rounded-full flex items-center justify-center border border-tryonyou-gold/50 shadow-lg overflow-hidden">
          <span className="text-3xl filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">🦚</span>
        </div>

        {/* Tooltip / Status */}
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
          <div className="glass px-3 py-1 rounded-lg text-xs font-semibold text-tryonyou-gold border border-tryonyou-gold/30 whitespace-nowrap">
            Pau Online
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PauMascot;
