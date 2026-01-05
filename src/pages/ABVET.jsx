import { motion } from 'framer-motion';
import { Eye, Mic, Fingerprint, CreditCard, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ABVET = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSimulation = () => {
    setIsProcessing(true);
    // Simulate biometric check duration
    setTimeout(() => {
        setIsProcessing(false);
        // Successful payment redirects to CAP (Pattern Generation)
        navigate('/cap');
    }, 2000);
  };

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
            BIOMETRIC PAYMENT
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Advanced biometric verification and encrypted transaction system
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Iris Scan */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-12 rounded-2xl cursor-pointer hover:bg-[rgba(212,175,55,0.1)] transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <Eye className="text-[#D4AF37] mb-6" size={64} />
              <h2 className="text-2xl font-light tracking-widest text-white mb-3">IRIS SCAN</h2>
              <p className="text-gray-400 text-center mb-6">
                Multi-spectral iris recognition with liveness detection
              </p>
              <div className="w-full space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-[#00A8E8]">99.9%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Speed</span>
                  <span className="text-[#00A8E8]">&lt; 0.5s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Security Level</span>
                  <span className="text-[#00A8E8]">Military Grade</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Voice Auth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel p-12 rounded-2xl cursor-pointer hover:bg-[rgba(212,175,55,0.1)] transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <Mic className="text-[#D4AF37] mb-6" size={64} />
              <h2 className="text-2xl font-light tracking-widest text-white mb-3">VOICE AUTH</h2>
              <p className="text-gray-400 text-center mb-6">
                Neural voice pattern analysis with anti-spoofing
              </p>
              <div className="w-full space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-[#00A8E8]">98.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Languages</span>
                  <span className="text-[#00A8E8]">120+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Verification</span>
                  <span className="text-[#00A8E8]">Real-time</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fingerprint */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel p-12 rounded-2xl cursor-pointer hover:bg-[rgba(212,175,55,0.1)] transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <Fingerprint className="text-[#D4AF37] mb-6" size={64} />
              <h2 className="text-2xl font-light tracking-widest text-white mb-3">FINGERPRINT</h2>
              <p className="text-gray-400 text-center mb-6">
                Ultrasonic 3D fingerprint scanning technology
              </p>
              <div className="w-full space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-[#00A8E8]">99.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Response</span>
                  <span className="text-[#00A8E8]">&lt; 0.3s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Anti-Spoof</span>
                  <span className="text-[#00A8E8]">Advanced</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Encrypted Transaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-panel p-12 rounded-2xl cursor-pointer hover:bg-[rgba(212,175,55,0.1)] transition-all duration-300 relative overflow-hidden"
            onClick={handlePaymentSimulation}
          >
             {isProcessing && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
                    <Sparkles className="animate-spin text-tryonyou-gold mb-4" size={48} />
                    <span className="text-tryonyou-gold font-bold tracking-widest animate-pulse">VERIFYING BIOMETRICS...</span>
                </div>
            )}

            <div className="flex flex-col items-center">
              <CreditCard className="text-[#D4AF37] mb-6" size={64} />
              <h2 className="text-2xl font-light tracking-widest text-white mb-3">SECURE PAY & GENERATE</h2>
              <p className="text-gray-400 text-center mb-6">
                Click to authenticate and generate your CAP pattern.
              </p>
              <div className="w-full space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Encryption</span>
                  <span className="text-[#00A8E8]">AES-256</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Compliance</span>
                  <span className="text-[#00A8E8]">PCI DSS L1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Fraud Rate</span>
                  <span className="text-[#00A8E8]">&lt; 0.01%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-panel p-8 rounded-2xl text-center"
        >
          <h3 className="text-xl font-light tracking-wider text-white mb-4">
            Multi-Factor Biometric Authentication
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto">
            ABVET (Advanced Biometric Verification & Encrypted Transactions) combines multiple 
            biometric verification methods with military-grade encryption to provide the most 
            secure payment experience in fashion e-commerce.
          </p>
          <div className="flex justify-center items-center mt-6 space-x-8">
            <div className="text-center">
              <div className="text-2xl font-light text-[#D4AF37] mb-1">0</div>
              <div className="text-xs text-gray-400">Fraudulent Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-[#D4AF37] mb-1">&lt;1s</div>
              <div className="text-xs text-gray-400">Average Auth Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-[#D4AF37] mb-1">100%</div>
              <div className="text-xs text-gray-400">Data Protection</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ABVET;
