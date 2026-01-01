import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [activeClaimIndex, setActiveClaimIndex] = useState(0)

  // FEATURES / CLAIMS (Translated to Spanish)
  const claims = [
    {
      title: "Cero Devoluciones",
      description: "Ajuste perfecto garantizado. Nuestra inteligencia corporal asegura que cada prenda te quede como un guante.",
      icon: "✓"
    },
    {
      title: "Ajuste por Inteligencia Corporal",
      description: "Análisis biométrico por IA que entiende tus proporciones únicas y recomienda prendas adaptadas a ti.",
      icon: "◆"
    },
    {
      title: "Análisis de Tejido y Caída",
      description: "Analizamos la elasticidad y rigidez de la tela para predecir cómo se moverá y sentirá en tu cuerpo.",
      icon: "≈"
    },
    {
      title: "IA + Medición Biométrica",
      description: "Visión artificial avanzada que captura tus medidas con precisión. Sin cintas métricas. Solo tu móvil.",
      icon: "⊙"
    },
  ]

  // HOW IT WORKS STEPS (Translated to Spanish)
  const steps = [
    {
      step: "1",
      title: "Escaneo Corporal",
      description: "Usa la cámara de tu móvil para capturar tus medidas con precisión de IA."
    },
    {
      step: "2",
      title: "Confirma Detalles",
      description: "Responde unas preguntas rápidas sobre tus preferencias y la ocasión."
    },
    {
      step: "3",
      title: "Match Perfecto",
      description: "Recibe la prenda que mejor te sienta, con una explicación detallada del porqué."
    }
  ]

  // ANIMATION VARIANTS
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
          <div className="text-sm text-gray-400 hidden md:block">Tecnología de Moda para el Ajuste Perfecto</div>
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

              <motion.p variants={itemVariants} className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Olvídate de las tallas confusas. Medimos tu cuerpo con IA para que la ropa encaje a la primera.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/pilot')}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-all shadow-lg shadow-blue-900/20 uppercase tracking-wider transform hover:-translate-y-1"
                >
                  Probar ahora
                </button>
                <button
                  onClick={() => navigate('/pilot')}
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-bold text-gray-200 transition-colors uppercase tracking-wider"
                >
                  Saber más
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Cero fricción. Resultados en menos de 5 segundos.
              </motion.div>
            </motion.div>

            {/* Right: Hero Image (Realistic) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative h-[500px] md:h-[600px] bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl group"
            >
              {/* Real Image loaded via URL */}
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1287&auto=format&fit=crop"
                alt="Fashion Model"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

              {/* Animated Floating Badge */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-8 right-8 bg-blue-600/90 backdrop-blur rounded-full p-4 shadow-lg border border-blue-400 z-10"
              >
                <span className="text-3xl">✨</span>
              </motion.div>

              {/* Status Badge */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-8 left-8 bg-black/60 backdrop-blur border border-green-500/50 rounded-lg px-4 py-2 flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="text-xs">
                  <p className="text-gray-300 uppercase tracking-wider text-[10px]">Confidence Score</p>
                  <p className="text-green-400 font-bold">98.5% MATCH</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
