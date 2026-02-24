/**
 * BusinessModal.tsx — B2B partnership offer modal.
 *
 * Displays when a brand or retailer clicks "Partner" or "Finalizar & Partner".
 * Presents two integration tiers:
 *   - SaaS Pilot  : Pay-per-try e-commerce plugin (quick start)
 *   - Full License: Complete "Divineo" system for physical retail (patent protected)
 *
 * Props:
 *   isOpen  — controls visibility
 *   onClose — callback to dismiss the modal
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap } from 'lucide-react';

interface BusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BusinessModal: React.FC<BusinessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#141619] border border-[#D4AF37]/30 rounded-2xl max-w-4xl w-full overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col md:flex-row"
      >
        {/* Left Panel: The Problem (Returns) */}
        <div className="md:w-1/3 bg-gradient-to-b from-[#1a1a2e] to-black p-8 border-r border-white/5 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
          <h3 className="text-red-400 text-xs tracking-[4px] uppercase mb-2 font-bold">The Problem</h3>
          <h2 className="text-3xl text-white font-light mb-6">40% Returns</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            Fashion retail loses billions annually due to poor fit and lack of emotional connection.
          </p>
          <div className="mt-auto">
            <div className="text-[#D4AF37] text-4xl font-bold mb-1">-40%</div>
            <div className="text-white/40 text-xs uppercase tracking-widest">Return Rate with TryOnYou</div>
          </div>
        </div>

        {/* Right Panel: The Solution (Business Models) */}
        <div className="md:w-2/3 p-8 bg-[#0a0a0a]">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-[#D4AF37] text-xs tracking-[4px] uppercase mb-2 font-bold">The Solution</h3>
              <h2 className="text-2xl text-white font-light">Choose Your Integration</h2>
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Option 1: SaaS (Rentable) */}
            <div className="border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/50 transition-all group cursor-pointer bg-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-white font-medium tracking-wide">SaaS Pilot</h4>
              </div>
              <p className="text-white/50 text-xs mb-6 h-10">
                Immediate deployment for e-commerce. Pay-per-try model.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-white/70 text-xs">
                  <Check className="w-3 h-3 text-green-500" /> Reduced Returns
                </li>
                <li className="flex items-center gap-2 text-white/70 text-xs">
                  <Check className="w-3 h-3 text-green-500" /> Analytics Dashboard
                </li>
              </ul>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs tracking-widest uppercase rounded-lg transition-colors">
                Start Trial
              </button>
            </div>

            {/* Option 2: License (Advanced) */}
            <div className="border border-[#D4AF37]/30 rounded-xl p-6 hover:border-[#D4AF37] transition-all group cursor-pointer bg-gradient-to-br from-[#D4AF37]/5 to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider">
                Patent Protected
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37] group-hover:text-yellow-200 transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-white font-medium tracking-wide">Full License</h4>
              </div>
              <p className="text-white/50 text-xs mb-6 h-10">
                Complete "Divineo" system integration for physical retail & manufacturing.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-white/70 text-xs">
                  <Check className="w-3 h-3 text-[#D4AF37]" /> Smart Wardrobe Hardware
                </li>
                <li className="flex items-center gap-2 text-white/70 text-xs">
                  <Check className="w-3 h-3 text-[#D4AF37]" /> Emotional AI (PAU)
                </li>
              </ul>
              <button className="w-full py-2 bg-[#D4AF37] hover:bg-[#b5952f] text-black font-bold text-xs tracking-widest uppercase rounded-lg transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Contact Sales
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
             <p className="text-white/30 text-[10px] uppercase tracking-widest">
               Powered by TryOnYou Patent EPCT/2024/098
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessModal;
