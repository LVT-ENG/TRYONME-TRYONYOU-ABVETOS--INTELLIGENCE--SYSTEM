import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle, Smartphone, UserCheck, Shirt, Globe } from 'lucide-react'
import texts from '../data/texts.json'

const Home = () => {
  const navigate = useNavigate()
  const [lang, setLang] = useState('en')

  const content = texts[lang] || texts['en']
  const { hero, claims, steps, features_title, features_subtitle, footer } = content

  // Map icon names to components if needed, or static mapping
  const getIcon = (index) => {
    const icons = [
      <CheckCircle className="w-8 h-8 text-green-400" />,
      <UserCheck className="w-8 h-8 text-blue-400" />,
      <Shirt className="w-8 h-8 text-purple-400" />,
      <Smartphone className="w-8 h-8 text-pink-400" />
    ]
    return icons[index] || <CheckCircle className="w-8 h-8 text-gray-400" />
  }

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

  const toggleLang = () => {
    const langs = ['en', 'es', 'fr']
    const currentIndex = langs.indexOf(lang)
    const nextIndex = (currentIndex + 1) % langs.length
    setLang(langs[nextIndex])
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-widest text-white cursor-pointer" onClick={() => navigate('/')}>TRYONYOU</h1>
          <div className="flex items-center gap-4">
             <div className="text-sm text-gray-400 hidden md:block">Fashion Tech for the Perfect Fit</div>
             <button onClick={toggleLang} className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-xs uppercase font-bold border border-gray-700">
               <Globe className="w-3 h-3" />
               {lang}
             </button>
          </div>
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
                  {hero.title}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block mt-2">
                    {hero.title_gradient}
                  </span>
                </h2>
              </motion.div>

              <motion.p variants={itemVariants} className="text-xl text-gray-300 leading-relaxed max-w-lg">
                {hero.description}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/pilot')}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-all shadow-lg shadow-blue-900/20 uppercase tracking-wider transform hover:-translate-y-1"
                >
                  {hero.cta_primary}
                </button>
                <button
                  onClick={() => navigate('/pilot')}
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-bold text-gray-200 transition-colors uppercase tracking-wider"
                >
                  {hero.cta_secondary}
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {hero.badge}
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

      {/* Features/Claims Section */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">{features_title}</h2>
             <p className="text-gray-400 max-w-2xl mx-auto">{features_subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {claims.map((claim, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                  {getIcon(index)}
                </div>
                <h3 className="text-xl font-bold mb-2">{claim.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{claim.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{steps.title}</h2>
              <p className="text-gray-400">{steps.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative bg-gray-900 p-8 rounded-2xl border border-gray-700 text-center"
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-gray-800">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mt-6 mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold tracking-widest text-white mb-4">TRYONYOU</h2>
          <p className="text-gray-500 mb-8">Live it, where beauty moves with you.</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            {footer.links.map((link, i) => (
               <a key={i} href="#!" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">{link}</a>
            ))}
          </div>
          <div className="mt-8 text-xs text-gray-600">
            {footer.rights}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
