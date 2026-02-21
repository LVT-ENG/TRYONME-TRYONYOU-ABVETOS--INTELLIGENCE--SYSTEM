import React, { useState } from 'react';
import BusinessModal from './BusinessModal';
import { motion } from 'framer-motion';

const AbvetCheckout: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  return (
    <section className="w-full py-20 bg-[#1A1C20] border-t border-[#333]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-[#C5A46D] text-sm tracking-[0.3em] uppercase mb-4">Abvet Checkout</h2>
          <h3 className="text-3xl md:text-4xl font-serif text-[#F0F0F0]">Experiencia Sin Fricción</h3>
        </div>

        <div className="bg-[#141619] border border-[#333] p-8 md:p-12 relative overflow-hidden">
          {/* Progress Bar */}
          <div className="flex justify-between mb-12 relative z-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${step >= i ? 'bg-[#C5A46D] text-[#141619]' : 'bg-[#333] text-gray-500'}`}>
                  {i}
                </div>
                <span className={`text-xs mt-2 uppercase tracking-wider ${step >= i ? 'text-[#C5A46D]' : 'text-gray-600'}`}>
                  {i === 1 ? 'Scan' : i === 2 ? 'Select' : 'Go'}
                </span>
              </div>
            ))}
            <div className="absolute top-4 left-0 w-full h-[1px] bg-[#333] -z-10"></div>
            <div 
              className="absolute top-4 left-0 h-[1px] bg-[#C5A46D] -z-10 transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>

          {/* Content Area */}
          <div className="min-h-[300px] flex items-center justify-center">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 border-2 border-[#C5A46D] rounded-full p-1 relative">
                  <img src="/images/pau-agent.png" alt="Pau Agent" className="w-full h-full rounded-full object-cover" />
                  <div className="absolute -bottom-2 -right-2 bg-[#C5A46D] text-[#141619] text-xs font-bold px-2 py-1 rounded-full">PAU</div>
                </div>
                <h4 className="text-xl text-[#F0F0F0] mb-2">Identidad Biométrica</h4>
                <p className="text-gray-400 text-sm max-w-md mx-auto">Tu perfil único ya está cargado. No necesitas tarjetas ni formularios.</p>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="grid grid-cols-2 gap-4 mb-6 max-w-xs mx-auto">
                  <div className="bg-[#25282E] p-4 border border-[#C5A46D]">
                    <div className="h-20 bg-[#141619] mb-2"></div>
                    <div className="h-2 w-12 bg-[#C5A46D]"></div>
                  </div>
                  <div className="bg-[#25282E] p-4 border border-[#333] opacity-50">
                    <div className="h-20 bg-[#141619] mb-2"></div>
                    <div className="h-2 w-12 bg-[#333]"></div>
                  </div>
                </div>
                <h4 className="text-xl text-[#F0F0F0] mb-2">Selección Inteligente</h4>
                <p className="text-gray-400 text-sm max-w-md mx-auto">Confirma tu selección. El sistema optimiza el envío automáticamente.</p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-[#C5A46D] rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#141619]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h4 className="text-xl text-[#F0F0F0] mb-2">Listo</h4>
                <p className="text-gray-400 text-sm max-w-md mx-auto">Tu pedido está en camino. Gracias por elegir la excelencia.</p>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => {
                if (step === 3) {
                  setShowBusinessModal(true);
                } else {
                  setStep(prev => prev + 1);
                }
              }}
              className="px-12 py-3 bg-[#C5A46D] text-[#141619] font-bold uppercase tracking-widest hover:bg-[#D4B47D] transition-colors duration-300"
            >
              {step === 3 ? 'Finalizar & Partner' : 'Continuar'}
            </button>
          </div>
        </div>
      </div>
      <BusinessModal isOpen={showBusinessModal} onClose={() => setShowBusinessModal(false)} />
    </section>
  );
};

export default AbvetCheckout;
