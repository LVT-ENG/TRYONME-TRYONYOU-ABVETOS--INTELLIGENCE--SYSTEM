import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SmartWardrobe from '../modules/SmartWardrobe'

const Home = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [activeClaimIndex, setActiveClaimIndex] = useState(0)

  const superClaims = [
    "Avatar 3D Paramétrico + calibración automática",
    "Comparador Objetivo: Métricas de fit-score, strain y contacto real",
    "Simulación Física Textil: Propiedades reales de caída y peso",
    "PAU Recommender: Gustos + Emociones + Tendencias (FTT)",
    "CAP (Creative Auto-Production): Generación automática de patrón/print",
    "Pago Dual ABVET: Seguridad biométrica (Iris + Voz + Liveness)",
    "Orquestación JIT: Trazabilidad end-to-end desde la fábrica",
    "Sistema Embebible: Actualización en tiempo real vía Git"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-[#141619] text-[#EEF0F3] overflow-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#141619]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-widest text-[#D3B26A]">TRYONYOU</h1>
          <div className="text-sm text-gray-400 hidden md:block">Fashion Tech for Perfect Fit</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Google Platform Badges */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30">
                   <span className="text-xs font-bold text-blue-300 tracking-wider">POWERED BY GEMINI 3 PRO</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/30">
                   <span className="text-xs font-bold text-emerald-300 tracking-wider">VEO 3.1</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-900/50 to-amber-900/50 border border-orange-500/30">
                   <span className="text-xs font-bold text-orange-300 tracking-wider">CONDUCTOR</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-[#D3B26A]">
                  Future Imprint: <br />
                  <span className="text-white">Where Styles Meet Innovation.</span>
                </h1>
              </motion.div>

              <motion.p variants={itemVariants} className="text-xl text-gray-300 leading-relaxed">
                Discover curated collections powered by our patented generative AI fitting technology.
              </motion.p>

              <motion.div variants={itemVariants} className="flex gap-4">
                <button
                  onClick={() => navigate('/pilot')}
                  className="px-8 py-4 bg-[#D3B26A] hover:bg-[#b09050] rounded-lg font-bold text-[#141619] transition-colors shadow-lg uppercase tracking-wider"
                >
                  Explore Pilot
                </button>
                <button
                  onClick={() => navigate('/investors')}
                  className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-colors uppercase tracking-wider"
                >
                  Investor Dossier
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="text-sm text-gray-400">
                Zero friction. Clear message in less than 5 seconds.
              </motion.div>
            </motion.div>

            {/* Right: Smart Wardrobe Integration (Magic Mirror) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative h-[600px] w-full rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl"
            >
               <SmartWardrobe />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Claims Section */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-16 text-[#D3B26A]"
          >
             Why Our TRYONYOU Is Worth, Justified
          </motion.h2>

          {/* Claims Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {superClaims.map((claim, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] p-6 rounded-xl backdrop-blur-md hover:bg-[rgba(255,255,255,0.1)] transition"
              >
                <div className="text-[#006D77] font-bold mb-2">0{index + 1}</div>
                <p className="text-sm font-medium text-white">{claim}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-y border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-6 text-white"
          >
            Ready for TryOnYou to do it for you?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-300 mb-8"
          >
            Minimal user flow will get you results in seconds.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/pilot')}
            className="px-12 py-5 bg-[#D3B26A] hover:bg-[#b09050] rounded-full font-bold text-[#141619] text-lg transition-all shadow-xl shadow-blue-600/30 uppercase tracking-wider"
          >
            Start Now
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 bg-[#141619] text-center">
        <p className="text-gray-500 text-sm">
          TRYONYOU Pilot © 2024 | Fashion Tech for Perfect Fit <br className="md:hidden"/> No Returns. No Guessing. Just Fit.
        </p>
      </footer>
    </div>
  )
}

export default Home
