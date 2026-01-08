import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAIRecommendation, lafayetteDB } from '../lib/RecommendationEngine';
import VirtualTryOn from './VirtualTryOn';

const GarmentRecommendation = ({ userProfile }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showingAlternative, setShowingAlternative] = useState(false);
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(true); // Show by default

  useEffect(() => {
    findRecommendation();
  }, []);

  const findRecommendation = async () => {
    setLoading(true);
    
    // Use AI recommendation based on user profile
    const mood = userProfile.occasion || 'daily';
    const bodyType = userProfile.fitPreference || 'comfortable';
    
    const recommended = await getAIRecommendation(mood, bodyType);
    setRecommendation(recommended);
    setLoading(false);
  };

  const showAlternative = () => {
    // Find alternative garment
    const alternatives = lafayetteDB.filter(item => item.id !== recommendation.id);
    const alternative = alternatives[Math.floor(Math.random() * alternatives.length)];
    setRecommendation(alternative);
    setShowingAlternative(true);
    setTimeout(() => setShowingAlternative(false), 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-300 text-lg">Finding your perfect match...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-light text-white tracking-wide mb-3">
            Your Curated Selection
          </h2>
          <p className="text-slate-400 text-lg">
            Tailored specifically for your body and occasion
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Garment visualization */}
          <motion.div
            key={recommendation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden group">
              <img
                src={recommendation.image}
                alt={recommendation.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Elegant aura effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl -z-10 animate-pulse" />
          </motion.div>

          {/* Recommendation details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-light text-white mb-2">
                {recommendation.name}
              </h3>
              <p className="text-cyan-400 text-sm tracking-wider uppercase">
                {recommendation.type}
              </p>
            </div>

            {/* Human message (no numbers) */}
            <div className="p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50">
              <p className="text-slate-300 text-lg leading-relaxed">
                {recommendation.human_message || recommendation.msg}
              </p>
            </div>

            {/* Fabric properties (descriptive, not numerical) */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                <div className="text-2xl mb-2">✨</div>
                <div className="text-slate-400 text-sm">Cut</div>
                <div className="text-white font-medium">{recommendation.cut}</div>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                <div className="text-2xl mb-2">🌊</div>
                <div className="text-slate-400 text-sm">Drape</div>
                <div className="text-white font-medium">{recommendation.drape}</div>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                <div className="text-2xl mb-2">💫</div>
                <div className="text-slate-400 text-sm">Feel</div>
                <div className="text-white font-medium">{recommendation.elasticity}</div>
              </div>
            </div>

            {/* Body range match */}
            <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <div className="text-white font-medium">Perfect for your body</div>
                  <div className="text-slate-400 text-sm">{recommendation.body_range}</div>
                </div>
              </div>
            </div>

            {/* Actions (no prices) */}
            <div className="space-y-3">
              <button
                onClick={() => setShowVirtualTryOn(!showVirtualTryOn)}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
              >
                {showVirtualTryOn ? '📸 Hide Virtual Try-On' : '👗 Try it On (Live Camera)'}
              </button>

              <button
                onClick={showAlternative}
                className="w-full px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
              >
                Show me another option
              </button>
              
              <button
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                This is my choice
              </button>
            </div>

            {/* Occasion match */}
            <div className="text-center text-slate-400 text-sm">
              <span className="inline-flex items-center gap-2">
                Perfect for: 
                <span className="text-cyan-400 font-medium">
                  {recommendation.intention.join(', ')}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Virtual Try-On Modal */}
        {showVirtualTryOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="w-full max-w-4xl h-[90vh] relative">
              <button
                onClick={() => setShowVirtualTryOn(false)}
                className="absolute top-4 right-4 z-10 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                ✕ Close
              </button>
              <VirtualTryOn
                garmentImage={recommendation.image}
                garmentName={recommendation.name}
              />
            </div>
          </motion.div>
        )}

        {/* PAU message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
              P
            </div>
            <p className="text-slate-300">
              This garment brings out your best version
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GarmentRecommendation;
