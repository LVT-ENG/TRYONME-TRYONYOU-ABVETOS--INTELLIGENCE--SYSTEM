import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Award } from 'lucide-react';

const Claims = () => {
  const claims = [
    {
      id: 1,
      title: "System for Emotional Fashion Intelligence",
      description: "A computer-implemented method integrating biometric data with emotional AI for personalized fashion recommendations",
      status: "Verified",
      category: "Core System"
    },
    {
      id: 2,
      title: "3D Avatar with Biometric Mapping",
      description: "Method for generating three-dimensional digital avatars from multi-point biometric measurements",
      status: "Verified",
      category: "Avatar Technology"
    },
    {
      id: 3,
      title: "Drape-Aware Physics Simulation",
      description: "Real-time fabric physics simulation system for accurate fit prediction and visualization",
      status: "Verified",
      category: "Physics Engine"
    },
    {
      id: 4,
      title: "Biometric Payment Authentication",
      description: "Multi-factor biometric verification system for secure payment processing",
      status: "Verified",
      category: "Security"
    },
    {
      id: 5,
      title: "Automated Pattern Generation (CAP)",
      description: "Computer-aided production system for real-time garment pattern generation from biometric data",
      status: "Verified",
      category: "Manufacturing"
    },
    {
      id: 6,
      title: "AI Agent Orchestration",
      description: "Distributed multi-agent system for coordinated fashion intelligence operations",
      status: "Verified",
      category: "AI Architecture"
    },
    {
      id: 7,
      title: "Emotional Recommendation Engine",
      description: "Machine learning system for mood-based fashion recommendations using emotional analysis",
      status: "Verified",
      category: "AI Recommendation"
    },
    {
      id: 8,
      title: "Zero-Return Fit Guarantee",
      description: "Predictive fit accuracy system minimizing e-commerce fashion returns through advanced measurement",
      status: "Verified",
      category: "Business Method"
    }
  ];

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
            PATENT CLAIMS
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
            Intellectual Property Protection for Emotional Fashion Intelligence System
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center">
              <FileText size={16} className="mr-2" />
              <span>PCT/EP2025/067317</span>
            </div>
            <div className="flex items-center">
              <Award size={16} className="mr-2" />
              <span>Small Entity Declaration</span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-6 rounded-xl text-center"
          >
            <ShieldCheck className="mx-auto mb-3 text-[#D4AF37]" size={32} />
            <div className="text-3xl font-light text-white mb-2">8</div>
            <p className="text-gray-400">Core Claims</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel p-6 rounded-xl text-center"
          >
            <Award className="mx-auto mb-3 text-[#D4AF37]" size={32} />
            <div className="text-3xl font-light text-white mb-2">53</div>
            <p className="text-gray-400">AI Agents</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel p-6 rounded-xl text-center"
          >
            <FileText className="mx-auto mb-3 text-[#D4AF37]" size={32} />
            <div className="text-3xl font-light text-white mb-2">PCT</div>
            <p className="text-gray-400">International</p>
          </motion.div>
        </div>

        {/* Claims List */}
        <div className="space-y-4">
          {claims.map((claim, index) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="glass-panel p-6 rounded-xl hover:bg-[rgba(212,175,55,0.05)] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-[#D4AF37] font-mono text-sm mr-3">Claim {claim.id}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                      {claim.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-light text-white mb-2">{claim.title}</h3>
                  <p className="text-sm text-gray-400">{claim.description}</p>
                </div>
                <div className="ml-6">
                  <span className="flex items-center text-[#00A8E8] text-sm">
                    <ShieldCheck size={16} className="mr-1" />
                    {claim.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-12 glass-panel p-8 rounded-2xl text-center"
        >
          <h3 className="text-xl font-light tracking-wider text-white mb-4">
            Patent Pending - International Protection
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto mb-4">
            TRYONYOU's Emotional Fashion Intelligence System is protected under PCT patent application 
            PCT/EP2025/067317, covering innovative methods for biometric fashion recommendations, 
            AI-driven fit prediction, and automated production systems.
          </p>
          <p className="text-sm text-gray-500">
            © 2025 TRYONYOU | All Rights Reserved | Small Entity Declaration Filed
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Claims;
