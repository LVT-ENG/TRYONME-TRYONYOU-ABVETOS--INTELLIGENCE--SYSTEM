import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Sparkles, Crown, Camera, Star, ArrowRight, Check, Play, Palette, Scissors, Heart, Zap, TrendingUp } from 'lucide-react'

const GlowUp = () => {
  const [activeSection, setActiveSection] = useState('analyze')
  const [selectedGoal, setSelectedGoal] = useState(null)

  const goals = [
    { id: 'style-upgrade', name: 'Renovar estilo', icon: Sparkles, color: 'from-fuchsia-500 to-pink-500' },
    { id: 'color-harmony', name: 'Armonía de color', icon: Palette, color: 'from-violet-500 to-purple-500' },
    { id: 'body-confidence', name: 'Resaltar figura', icon: Crown, color: 'from-amber-500 to-orange-500' },
    { id: 'hair-advice', name: 'Consejo capilar', icon: Scissors, color: 'from-rose-500 to-pink-500' },
    { id: 'signature-look', name: 'Look distintivo', icon: Star, color: 'from-cyan-500 to-blue-500' },
    { id: 'seasonal-update', name: 'Actualización temporal', icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
  ]

  const transformations = [
    {
      id: 1,
      before: 'Estilo indefinido',
      after: 'Look sofisticado minimalista',
      improvement: '+85%',
      timeframe: '2 semanas',
      steps: 12,
      rating: 4.9,
    },
    {
      id: 2,
      before: 'Paleta de colores limitada',
      after: 'Colores que resaltan tu piel',
      improvement: '+72%',
      timeframe: '1 semana',
      steps: 8,
      rating: 4.8,
    },
    {
      id: 3,
      before: 'Combinaciones básicas',
      after: 'Outfits creativos y únicos',
      improvement: '+90%',
      timeframe: '3 semanas',
      steps: 15,
      rating: 4.9,
    },
  ]

  const tips = [
    {
      category: 'Color',
      title: 'Tu paleta perfecta',
      description: 'Basado en tu tono de piel y cabello, los colores tierra cálidos resaltan tu belleza natural.',
      colors: ['#C4A77D', '#8B7355', '#D4AF37', '#5C4033'],
    },
    {
      category: 'Estilo',
      title: 'Siluetas favorecedoras',
      description: 'Las líneas limpias y cortes estructurados equilibran tus proporciones perfectamente.',
      icon: '📐',
    },
    {
      category: 'Accesorios',
      title: 'Toques finales',
      description: 'Joyas minimalistas en tonos dorados complementan tu estilo elegante.',
      icon: '✨',
    },
  ]

  const sections = [
    { id: 'analyze', name: 'Analizar', icon: Camera },
    { id: 'discover', name: 'Descubrir', icon: Sparkles },
    { id: 'transform', name: 'Transformar', icon: Wand2 },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-fuchsia-950 via-pink-900/50 to-tryonyou-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse" />
        </div>

        <div className="relative z-10 section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8 flex justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-fuchsia-500 via-pink-500 to-purple-500 flex items-center justify-center glow-blue">
                <Wand2 size={48} className="text-white" />
              </div>
            </motion.div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles size={18} className="text-fuchsia-400" />
              <span className="text-fuchsia-300 font-semibold">Transformación Total</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              Glow-Up
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Descubre tu mejor versión con análisis de estilo personalizado y recomendaciones de IA para transformar tu imagen.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary text-lg px-8 py-4 group">
                <Camera size={20} className="mr-2" />
                Empezar análisis
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-metallic text-lg px-8 py-4">
                <Play size={20} className="mr-2" />
                Ver ejemplos
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Tabs */}
      <section className="py-6 bg-tryonyou-smoke/50 sticky top-20 z-30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center gap-2">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white'
                    : 'glass text-white/70 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <section.icon size={20} />
                {section.name}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="section-indicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 -z-10"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-container">
        <AnimatePresence mode="wait">
          {activeSection === 'analyze' && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4 gradient-text">¿Cuál es tu objetivo?</h2>
                <p className="text-white/60">Selecciona lo que más te interesa mejorar</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {goals.map((goal, index) => (
                  <motion.button
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`card text-left group transition-all ${
                      selectedGoal === goal.id
                        ? 'ring-2 ring-fuchsia-500 bg-fuchsia-500/10'
                        : 'hover:scale-[1.02]'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <goal.icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-fuchsia-400 transition-colors">
                      {goal.name}
                    </h3>
                    
                    {selectedGoal === goal.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-fuchsia-500 flex items-center justify-center"
                      >
                        <Check size={14} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Upload Section */}
              <div className="card max-w-2xl mx-auto bg-gradient-to-br from-fuchsia-500/5 to-pink-500/5 border-fuchsia-500/30">
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-6">
                    <Camera size={40} className="text-fuchsia-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sube una foto</h3>
                  <p className="text-white/60 mb-6">Nuestro IA analizará tu estilo actual y te dará recomendaciones personalizadas</p>
                  <button className="btn-primary">
                    Seleccionar imagen
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4 gradient-text">Tu análisis personalizado</h2>
                <p className="text-white/60">Basado en tus características únicas</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tips.map((tip, index) => (
                  <motion.div
                    key={tip.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="card h-full"
                  >
                    <div className="text-xs text-fuchsia-400 font-semibold mb-2">{tip.category}</div>
                    <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
                    <p className="text-white/60 mb-4">{tip.description}</p>
                    
                    {tip.colors && (
                      <div className="flex gap-2">
                        {tip.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-lg shadow-inner"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {tip.icon && (
                      <div className="text-4xl">{tip.icon}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'transform' && (
            <motion.div
              key="transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4 gradient-text">Transformaciones reales</h2>
                <p className="text-white/60">Inspírate con los resultados de nuestra comunidad</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {transformations.map((t, index) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="card group cursor-pointer hover:scale-[1.02] transition-all"
                  >
                    {/* Before/After Visual */}
                    <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-gradient-to-r from-gray-600 to-fuchsia-500">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Zap size={32} className="mx-auto mb-2 text-white" />
                          <span className="text-white font-bold">{t.improvement}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/60">Antes</span>
                          <span className="text-fuchsia-400">Después</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={14} className="fill-yellow-400" />
                        <span className="text-sm font-medium">{t.rating}</span>
                      </div>
                      <span className="text-xs text-white/50">{t.timeframe}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2" />
                        <span className="text-sm text-white/60">{t.before}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mt-2" />
                        <span className="text-sm text-white">{t.after}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-white/50">{t.steps} pasos</span>
                      <button className="text-fuchsia-400 text-sm font-semibold group-hover:text-fuchsia-300">
                        Ver programa →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CTA Section */}
      <section className="section-container bg-gradient-to-br from-fuchsia-900/30 to-pink-900/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Crown size={48} className="text-fuchsia-400 mx-auto mb-6" />
          <h2 className="heading-lg mb-6 gradient-text">
            Tu mejor versión te espera
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Comienza tu transformación hoy con recomendaciones personalizadas de IA
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary text-lg px-8 py-4">
              <Wand2 size={20} className="mr-2" />
              Empezar Glow-Up
            </button>
            <a href="/ask-peacock" className="btn-metallic text-lg px-8 py-4">
              Consultar con Peacock
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default GlowUp

