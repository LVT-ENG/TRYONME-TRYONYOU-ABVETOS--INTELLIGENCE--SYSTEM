import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target, Sparkles, User, ShoppingBag, Shield, Zap, TrendingUp, ArrowRight, Download, Play } from 'lucide-react'
import texts from '../data/texts.json'

const LafayetteDemo = () => {
  const demoHighlights = [
    { icon: Target, text: 'Ultra-precise virtual fitting with millimetric alignment', color: 'text-amber-400' },
    { icon: User, text: 'Photorealistic 3D avatar generation', color: 'text-blue-400' },
    { icon: Sparkles, text: 'AI-powered style recommendations via Pau', color: 'text-purple-400' },
    { icon: ShoppingBag, text: 'Smart Wardrobe integration', color: 'text-rose-400' },
    { icon: Shield, text: 'Biometric payment with ABVET', color: 'text-green-400' },
    { icon: Zap, text: 'Real-time garment visualization', color: 'text-yellow-400' },
  ]

  const technologies = [
    { name: 'PAU', description: 'Emotional style recommender', icon: Sparkles },
    { name: 'CAP', description: 'Cognitive avatar personalization', icon: User },
    { name: 'FTT', description: 'Fit tracking technology', icon: Target },
    { name: 'ABVET', description: 'Dual-biometric payment (Iris + Voice)', icon: Shield },
    { name: 'DSX', description: 'Deploy orchestration system', icon: Zap },
  ]

  const businessModels = [
    { name: 'B2C', description: 'Direct consumer virtual fitting platform', color: 'from-blue-500 to-cyan-500' },
    { name: 'B2B', description: 'White-label solution for boutiques and brands', color: 'from-purple-500 to-pink-500' },
    { name: 'SaaS', description: 'Embeddable widgets for e-commerce sites', color: 'from-amber-500 to-orange-500' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-950 via-yellow-900/50 to-tryonyou-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-yellow-500/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles size={18} className="text-amber-400" />
              <span className="text-amber-300 font-semibold">Exclusive Demo</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              Lafayette Exclusive Demo
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Premium virtual fitting experience for Lafayette partners and investors
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Highlights */}
      <section className="section-container bg-tryonyou-smoke/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-lg mb-8 gradient-text text-center">
            🎯 Demo Highlights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${highlight.color.includes('amber') ? 'from-amber-500/20 to-amber-600/20' : highlight.color.includes('blue') ? 'from-blue-500/20 to-blue-600/20' : highlight.color.includes('purple') ? 'from-purple-500/20 to-purple-600/20' : highlight.color.includes('rose') ? 'from-rose-500/20 to-rose-600/20' : highlight.color.includes('green') ? 'from-green-500/20 to-green-600/20' : 'from-yellow-500/20 to-yellow-600/20'} flex items-center justify-center flex-shrink-0`}>
                    <highlight.icon size={24} className={highlight.color} />
                  </div>
                  <p className="text-white/80 leading-relaxed">{highlight.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* For Station F & Investors */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
            <h2 className="heading-md mb-6 gradient-text text-center">
              🏢 For Station F & Investors
            </h2>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              This demo showcases the complete TRYONYOU ecosystem, including our patent-pending 
              technologies and ABVETOS intelligence layer.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-amber-300">
                Key Technologies:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-xl p-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <tech.icon size={20} className="text-amber-400" />
                      <h4 className="font-bold text-white">{tech.name}</h4>
                    </div>
                    <p className="text-sm text-white/60">{tech.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Business Model */}
      <section className="section-container bg-tryonyou-smoke/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-lg mb-8 gradient-text text-center">
            📊 Business Model
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {businessModels.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="card text-center hover:scale-[1.02] transition-all"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${model.color} flex items-center justify-center mx-auto mb-4`}>
                  <TrendingUp size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
                <p className="text-white/60">{model.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="card bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-orange-500/10 border-amber-500/30 py-12 px-8">
            <h2 className="heading-lg mb-6 gradient-text">
              Ready to Experience TRYONYOU?
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/my-avatar" className="btn-primary text-lg px-8 py-4 group">
                <Play size={20} className="mr-2" />
                Start Demo Journey
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="btn-metallic text-lg px-8 py-4 group">
                <Download size={20} className="mr-2" />
                Download Pitch Deck
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default LafayetteDemo

