import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Mail, Check, Share2 } from 'lucide-react';

const GarmentRecommendation = ({ recommendation, onShopNow, onSendEmail }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleSendEmail = async () => {
    if (onSendEmail) {
      await onSendEmail(recommendation);
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    }
  };

  const handleShopNow = () => {
    if (onShopNow) {
      onShopNow(recommendation);
    }
  };

  // Default recommendation data if not provided
  const rec = recommendation || {
    garment_name: 'Lafayette Slim Blazer',
    brand: 'Galeries Lafayette',
    size: 'M',
    fit_score: 99.7,
    material: 'Premium Wool Blend',
    color: 'Navy Blue',
    explanation: 'Perfect match based on your biometric data and style preferences',
    fabric_elasticity: 5,
    fabric_drape_score: 8,
    occasion_tags: ['Work', 'Ceremony', 'Professional'],
    cut_type: 'Slim',
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Match Score Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block"
          >
            <div className="relative">
              <div className="text-8xl font-black text-[#C5A46D] italic">
                {rec.fit_score}%
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="bg-green-500 rounded-full p-2">
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
          <h2 className="text-3xl font-bold text-white">Perfect Match Found!</h2>
          <p className="text-white/60 text-lg">
            Based on biometric analysis and AI intelligence
          </p>
        </div>

        {/* Garment Details Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="p-8 space-y-6">
            {/* Garment Info */}
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-black text-white italic">
                {rec.garment_name}
              </h3>
              <p className="text-[#C5A46D] font-semibold text-xl">{rec.brand}</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="px-4 py-2 bg-[#C5A46D] text-black font-bold rounded-full text-lg">
                  Size {rec.size}
                </span>
                <span className="px-4 py-2 bg-white/10 text-white font-semibold rounded-full">
                  {rec.cut_type} Fit
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/20 rounded-xl p-4 text-center">
                <p className="text-white/50 text-xs uppercase mb-1">Material</p>
                <p className="text-white font-semibold text-sm">{rec.material}</p>
              </div>
              <div className="bg-black/20 rounded-xl p-4 text-center">
                <p className="text-white/50 text-xs uppercase mb-1">Color</p>
                <p className="text-white font-semibold text-sm">{rec.color}</p>
              </div>
              <div className="bg-black/20 rounded-xl p-4 text-center">
                <p className="text-white/50 text-xs uppercase mb-1">Elasticity</p>
                <p className="text-white font-semibold text-sm">{rec.fabric_elasticity}%</p>
              </div>
              <div className="bg-black/20 rounded-xl p-4 text-center">
                <p className="text-white/50 text-xs uppercase mb-1">Drape Score</p>
                <p className="text-white font-semibold text-sm">{rec.fabric_drape_score}/10</p>
              </div>
            </div>

            {/* Occasions */}
            <div className="space-y-2">
              <p className="text-white/50 text-sm uppercase">Perfect For:</p>
              <div className="flex flex-wrap gap-2">
                {rec.occasion_tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/10 text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-[#C5A46D]/10 border border-[#C5A46D]/30 rounded-2xl p-6">
              <p className="text-white/80 leading-relaxed italic">
                "{rec.explanation}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Shop Now Button */}
          <motion.button
            onClick={handleShopNow}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 bg-[#C5A46D] text-black font-bold text-lg py-6 rounded-2xl hover:bg-[#D4B47D] transition-all shadow-lg hover:shadow-[#C5A46D]/50"
          >
            <ShoppingBag className="w-6 h-6" />
            Shop Now
          </motion.button>

          {/* Send by Email Button */}
          <motion.button
            onClick={handleSendEmail}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={emailSent}
            className={`flex items-center justify-center gap-3 border-2 font-bold text-lg py-6 rounded-2xl transition-all ${
              emailSent
                ? 'border-green-500 bg-green-500/20 text-green-500'
                : 'border-white/20 bg-white/5 text-white hover:border-white/40'
            }`}
          >
            {emailSent ? (
              <>
                <Check className="w-6 h-6" />
                Email Sent!
              </>
            ) : (
              <>
                <Mail className="w-6 h-6" />
                Send by Email
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Share Options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="text-white/60 hover:text-white text-sm flex items-center gap-2 mx-auto transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share this match
          </button>
          
          <AnimatePresence>
            {showShareOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex items-center justify-center gap-4"
              >
                <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm">
                  Copy Link
                </button>
                <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm">
                  WhatsApp
                </button>
                <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm">
                  Facebook
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer Info */}
        <div className="text-center space-y-2 pt-4">
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Synchronized with Galeries Lafayette inventory</span>
          </div>
          <p className="text-white/30 text-xs">
            Match calculated using PAU Agent • Patent PCT/EP2025/067317
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default GarmentRecommendation;
