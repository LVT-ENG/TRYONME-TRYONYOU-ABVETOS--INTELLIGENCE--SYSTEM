import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Sparkles, Crown, Camera, Star, ArrowRight, Check, Play, Palette, Scissors, Heart, Zap, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getImageWithFallback } from '../utils/assets'

const GlowUp = () => {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('analyze')
  const [selectedGoal, setSelectedGoal] = useState(null)

  const goals = [
    { id: 'style-upgrade', name: t('glowUp.goals.styleUpgrade'), icon: Sparkles, color: 'from-fuchsia-500 to-pink-500' },
    { id: 'color-harmony', name: t('glowUp.goals.colorHarmony'), icon: Palette, color: 'from-violet-500 to-purple-500' },
    { id: 'body-confidence', name: t('glowUp.goals.bodyConfidence'), icon: Crown, color: 'from-amber-500 to-orange-500' },
    { id: 'hair-advice', name: t('glowUp.goals.hairAdvice'), icon: Scissors, color: 'from-rose-500 to-pink-500' },
    { id: 'signature-look', name: t('glowUp.goals.signatureLook'), icon: Star, color: 'from-cyan-500 to-blue-500' },
    { id: 'seasonal-update', name: t('glowUp.goals.seasonalUpdate'), icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
  ]

  const transformations = [
    {
      id: 1,
      before: t('glowUp.transformations.before'),
      after: t('glowUp.transformations.after'),
      improvement: '+85%',
      timeframe: '2 weeks',
      steps: 12,
      rating: 4.9,
      beforeImage: 'glowup-before-1.jpg',
      afterImage: 'glowup-after-1.jpg',
    },
    {
      id: 2,
      before: 'Limited color palette',
      after: 'Colors that highlight your skin',
      improvement: '+72%',
      timeframe: '1 week',
      steps: 8,
      rating: 4.8,
      beforeImage: 'glowup-before-2.jpg',
      afterImage: 'glowup-after-2.jpg',
    },
    {
      id: 3,
      before: 'Basic combinations',
      after: 'Creative and unique outfits',
      improvement: '+90%',
      timeframe: '3 weeks',
      steps: 15,
      rating: 4.9,
      beforeImage: 'glowup-before-3.jpg',
      afterImage: 'glowup-after-3.jpg',
    },
  ]

  const tips = [
    {
      category: t('glowUp.tips.color.category'),
      title: t('glowUp.tips.color.title'),
      description: t('glowUp.tips.color.description'),
      colors: ['#C4A77D', '#8B7355', '#D4AF37', '#5C4033'],
    },
    {
      category: t('glowUp.tips.style.category'),
      title: t('glowUp.tips.style.title'),
      description: t('glowUp.tips.style.description'),
      icon: '📐',
    },
    {
      category: t('glowUp.tips.accessories.category'),
      title: t('glowUp.tips.accessories.title'),
      description: t('glowUp.tips.accessories.description'),
      icon: '✨',
    },
  ]

  const sections = [
    { id: 'analyze', name: t('glowUp.sections.analyze'), icon: Camera },
    { id: 'discover', name: t('glowUp.sections.discover'), icon: Sparkles },
    { id: 'transform', name: t('glowUp.sections.transform'), icon: Wand2 },
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
              <span className="text-fuchsia-300 font-semibold">Total Transformation</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              Glow-Up
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Discover your best version with personalized style analysis and AI recommendations to transform your image.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary text-lg px-8 py-4 group">
                <Camera size={20} className="mr-2" />
                Start Analysis
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-metallic text-lg px-8 py-4">
                <Play size={20} className="mr-2" />
                View Examples
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
                <h2 className="heading-lg mb-4 gradient-text">What's your goal?</h2>
                <p className="text-white/60">Select what interests you most to improve</p>
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
                  <h3 className="text-xl font-bold mb-2">Upload a Photo</h3>
                  <p className="text-white/60 mb-6">Our AI will analyze your current style and give you personalized recommendations</p>
                  <button className="btn-primary">
                    Select Image
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
                <h2 className="heading-lg mb-4 gradient-text">Your Personalized Analysis</h2>
                <p className="text-white/60">Based on your unique characteristics</p>
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
                <h2 className="heading-lg mb-4 gradient-text">Real Transformations</h2>
                <p className="text-white/60">Get inspired by our community results</p>
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
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4 bg-gradient-to-r from-gray-600 to-fuchsia-500">
                      {/* Before/After Split View */}
                      <div className="absolute inset-0 flex">
                        <div className="w-1/2 relative overflow-hidden">
                          {t.beforeImage ? (
                            <img 
                              src={getImageWithFallback(t.beforeImage, 'before')} 
                              alt="Before"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none'
                              }}
                            />
                          ) : null}
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center">
                              <Zap size={24} className="mx-auto mb-1 text-white/80" />
                              <span className="text-white/90 text-xs font-semibold">Before</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/2 relative overflow-hidden border-l-2 border-fuchsia-500">
                          {t.afterImage ? (
                            <img 
                              src={getImageWithFallback(t.afterImage, 'after')} 
                              alt="After"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none'
                              }}
                            />
                          ) : null}
                          <div className="absolute inset-0 bg-fuchsia-500/20 flex items-center justify-center">
                            <div className="text-center">
                              <Sparkles size={24} className="mx-auto mb-1 text-white" />
                              <span className="text-white text-xs font-semibold">After</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Improvement Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-fuchsia-500 to-pink-500 px-3 py-1 rounded-full">
                        <span className="text-white font-bold text-sm">{t.improvement}</span>
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
                      <span className="text-xs text-white/50">{t.steps} steps</span>
                      <button className="text-fuchsia-400 text-sm font-semibold group-hover:text-fuchsia-300">
                        View Program →
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
            Your Best Version Awaits
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Start your transformation today with personalized AI recommendations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary text-lg px-8 py-4">
              <Wand2 size={20} className="mr-2" />
              Start Glow-Up
            </button>
            <a href="/ask-peacock" className="btn-metallic text-lg px-8 py-4">
              Consult with Peacock
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default GlowUp

