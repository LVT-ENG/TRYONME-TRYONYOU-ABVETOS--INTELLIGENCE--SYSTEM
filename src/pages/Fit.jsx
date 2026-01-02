import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ruler, Activity } from 'lucide-react';
import { AgentRouter } from '../agents';
import Avatar3D from '../components/Avatar3D';

const Fit = () => {
  useEffect(() => {
    // Agent Interaction for Fit Score
    AgentRouter.route('FIT_SCORE', { garmentId: '123', biometrics: {} })
      .then((score) => console.log('Fit Score:', score));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-light tracking-[0.2em] text-[#D4AF37] mb-4">
            FIT INTELLIGENCE
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Advanced biometric measurement and physics simulation for perfect fit prediction
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 3D Avatar Module */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-8 rounded-2xl"
          >
            <div className="flex items-center mb-4">
              <Ruler className="text-[#D4AF37] mr-3" size={24} />
              <h2 className="text-2xl font-light tracking-wider text-white">3D Avatar Module</h2>
            </div>
            <p className="text-gray-400 mb-6">Agent 014: Biometric Body Mapping</p>
            <div className="h-96 flex items-center justify-center bg-black/30 rounded-xl">
              <Avatar3D />
            </div>
          </motion.div>

          {/* Physics Engine */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel p-8 rounded-2xl"
          >
            <div className="flex items-center mb-4">
              <Activity className="text-[#D4AF37] mr-3" size={24} />
              <h2 className="text-2xl font-light tracking-wider text-white">Physics Engine</h2>
            </div>
            <p className="text-gray-400 mb-6">Agent 015: Drape-Aware Simulation</p>
            <div className="h-96 flex items-center justify-center bg-black/30 rounded-xl">
              <div className="text-center">
                <div className="text-6xl font-light text-[#D4AF37] mb-4">98.5%</div>
                <p className="text-gray-400">Fit Score Accuracy</p>
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Fabric Drape</span>
                    <span className="text-[#00A8E8]">Optimal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Movement Freedom</span>
                    <span className="text-[#00A8E8]">Excellent</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Comfort Index</span>
                    <span className="text-[#00A8E8]">Superior</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-panel p-6 rounded-xl text-center"
          >
            <div className="text-3xl mb-3">📏</div>
            <h3 className="text-lg font-light tracking-wider text-white mb-2">Precision Measurement</h3>
            <p className="text-sm text-gray-400">Sub-millimeter accuracy</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="glass-panel p-6 rounded-xl text-center"
          >
            <div className="text-3xl mb-3">🧵</div>
            <h3 className="text-lg font-light tracking-wider text-white mb-2">Fabric Simulation</h3>
            <p className="text-sm text-gray-400">Real-time physics</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass-panel p-6 rounded-xl text-center"
          >
            <div className="text-3xl mb-3">✨</div>
            <h3 className="text-lg font-light tracking-wider text-white mb-2">Perfect Match</h3>
            <p className="text-sm text-gray-400">AI-powered recommendations</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Fit;
