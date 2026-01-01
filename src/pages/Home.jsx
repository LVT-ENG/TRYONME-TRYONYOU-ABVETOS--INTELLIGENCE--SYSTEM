import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [activeClaimIndex, setActiveClaimIndex] = useState(0)

  const claims = [
    {
      title: "Zero Returns",
      description: "Perfect fit guaranteed. No more wrong sizes. Our body intelligence ensures every garment fits you perfectly.",
      icon: "✓"
    },
    {
      title: "Perfect Fit by Body Intelligence",
      description: "AI-powered biometric analysis understands your unique body proportions and recommends garments tailored to you.",
      icon: "◆"
    },
    {
      title: "Fabric Elasticity & Drape-Aware",
      description: "We analyze fabric properties—elasticity, drape, rigidity—to predict how garments will move and feel on your body.",
      icon: "≈"
    },
    {
      title: "AI + Biometric Measurements",
      description: "Advanced computer vision captures your body measurements with precision. No manual tape measures. Just your phone.",
      icon: "⊙"
    },
  ]

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
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-widest text-white">TRYONYOU</h1>
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
              <motion.div variants={itemVariants}>
                <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-white">
                  No vas a hacerte un TryOnYou.
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block mt-2"> 
                    TryOnYou lo hará por ti.
                  </span>
                </h2>
              </motion.div>

              <motion.p variants={itemVariants} className="text-xl text-gray-300 leading-relaxed">
                Medimos tu cuerpo para que la ropa encaje a la primera.
              </motion.p>

              <motion.div variants={itemVariants} className="flex gap-4">
                <button
                  onClick={() => navigate('/pilot')}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors shadow-lg uppercase tracking-wider"
                >
                  Probar Ahora
                </button>
                <button
                  onClick={() => navigate('/investors')}
                  className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-colors uppercase tracking-wider"
                >
                  Inversores
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="text-sm text-gray-400">
                Cero fricción. Mensaje claro en menos de 5 segundos.
              </motion.div>
            </motion.div>

            {/* Right: Hero Image (Realistic Model) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">👤</div>
                  <p className="text-gray-400">ABVET Engine</p>
                  <p className="text-sm text-gray-500 mt-2">Biometric Scanning Active</p>
                </div>
              </div>

              {/* Pau Assistant (Peacock) - Animated */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-8 right-8 bg-blue-600 rounded-full p-4 shadow-lg border-2 border-blue-400"
              >
                <div className="text-4xl">✨</div>
              </motion.div>

              {/* Outfit Change Indicator */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-8 left-8 bg-green-600/20 border border-green-500 rounded-lg px-4 py-2"
              >
                <p className="text-sm text-green-400 font-semibold">AI Analyzing...</p>
              </motion.div>
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
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            Why TRYONYOU?
          </motion.h2>

          {/* Claims Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {claims.map((claim, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveClaimIndex(index)}
                className={`p-8 rounded-xl border-2 transition-all cursor-pointer ${
                  activeClaimIndex === index
                    ? 'bg-blue-600/20 border-blue-500 shadow-lg'
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-4xl mb-4 text-white">{claim.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{claim.title}</h3>
                <p className="text-gray-300 leading-relaxed">{claim.description}</p>
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
            ¿Listo para que TryOnYou lo haga por ti?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-300 mb-8"
          >
            El flujo mínimo de usuario te llevará al resultado en segundos.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/pilot')}
            className="px-12 py-5 bg-blue-600 hover:bg-blue-500 rounded-full font-bold text-white text-lg transition-all shadow-xl shadow-blue-600/30 uppercase tracking-wider"
          >
            Empezar Ahora
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 bg-gray-900 text-center">
        <p className="text-gray-500 text-sm">
          TRYONYOU Pilot © 2024 | Fashion Tech for Perfect Fit <br className="md:hidden"/> No Returns. No Guessing. Just Fit.
        </p>
      </footer>
    </div>
  )
}

export default Home
