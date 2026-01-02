import { motion } from 'framer-motion';
import { Package, Cpu, Zap } from 'lucide-react';

const CAP = () => {
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
            AUTOMATED PRODUCTION
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Computer-Aided Production system for real-time pattern generation and manufacturing
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel p-8 rounded-2xl mb-8"
        >
          <div className="flex items-center mb-6">
            <Package className="text-[#D4AF37] mr-3" size={28} />
            <h2 className="text-2xl font-light tracking-wider text-white">Pattern Generation & Manufacturing Status</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Panel - Status */}
            <div className="space-y-4">
              <div className="bg-black/30 rounded-xl p-6">
                <h3 className="text-[#D4AF37] text-lg mb-4">Production Pipeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Pattern Generation</span>
                    <span className="text-[#00A8E8]">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Fabric Selection</span>
                    <span className="text-[#00A8E8]">Ready</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cut Optimization</span>
                    <span className="text-[#00A8E8]">Optimized</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Quality Control</span>
                    <span className="text-[#00A8E8]">Verified</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-6">
                <h3 className="text-[#D4AF37] text-lg mb-4">Current Orders</h3>
                <div className="text-center">
                  <div className="text-4xl font-light text-white mb-2">24</div>
                  <p className="text-gray-400">In Production Queue</p>
                </div>
              </div>
            </div>

            {/* Right Panel - Visualization */}
            <div className="bg-black/30 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🏭</div>
                  <h3 className="text-xl font-light text-white mb-2">Smart Factory</h3>
                  <p className="text-gray-400">AI-Driven Manufacturing</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-2xl text-[#D4AF37] mb-1">97%</div>
                    <div className="text-xs text-gray-400">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-[#D4AF37] mb-1">4.2h</div>
                    <div className="text-xs text-gray-400">Avg Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-[#D4AF37] mb-1">99.8%</div>
                    <div className="text-xs text-gray-400">Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel p-6 rounded-xl text-center"
          >
            <Cpu className="mx-auto mb-3 text-[#D4AF37]" size={32} />
            <h3 className="text-lg font-light tracking-wider text-white mb-2">AI Pattern Design</h3>
            <p className="text-sm text-gray-400">Automated pattern generation from biometric data</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-panel p-6 rounded-xl text-center"
          >
            <Zap className="mx-auto mb-3 text-[#D4AF37]" size={32} />
            <h3 className="text-lg font-light tracking-wider text-white mb-2">Real-Time Production</h3>
            <p className="text-sm text-gray-400">On-demand manufacturing with zero waste</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-panel p-6 rounded-xl text-center"
          >
            <Package className="mx-auto mb-3 text-[#D4AF37]" size={32} />
            <h3 className="text-lg font-light tracking-wider text-white mb-2">Smart Logistics</h3>
            <p className="text-sm text-gray-400">Automated fulfillment and tracking</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CAP;
