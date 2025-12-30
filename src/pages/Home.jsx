import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shirt, User, ShoppingBag, Wand2, Play, Star, Scan } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Scan,
      title: 'Smart Scanner',
      description: 'Get your precise body measurements in seconds using just your camera.',
      color: 'from-cyan-500 to-blue-500',
      link: '/demo'
    },
    {
      icon: User,
      title: 'My Avatar',
      description: 'Create your digital twin with precise measurements for perfect fits.',
      color: 'from-violet-500 to-purple-500',
      link: '/my-avatar'
    },
    {
      icon: Shirt,
      title: 'Virtual Wardrobe',
      description: 'Try on clothes virtually before you buy. No more guessing.',
      color: 'from-blue-500 to-cyan-500',
      link: '/wardrobe'
    },
    {
      icon: Sparkles,
      title: 'Showroom',
      description: 'Discover curated looks matched to your style and mood.',
      color: 'from-amber-500 to-orange-500',
      link: '/showroom'
    },
    {
      icon: Wand2,
      title: 'Glow-Up',
      description: 'Get AI-powered style recommendations for your transformation.',
      color: 'from-fuchsia-500 to-pink-500',
      link: '/glow-up'
    },
    {
      icon: ShoppingBag,
      title: 'Brands',
      description: 'Shop from top brands with confidence in your size.',
      color: 'from-rose-500 to-pink-500',
      link: '/brands'
    },
  ]

  const claims = [
    "Fewer Returns",
    "Perfect Fit",
    "Fabric Physics",
    "AI Powered"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-showroom">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-tryonyou-blue/20 rounded-full blur-[150px] animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amparo-light/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-tryonyou-gold/10 rounded-full blur-[100px] animate-pulse" />
          </div>
        </div>

        <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 mx-auto lg:mx-0"
              >
                <Sparkles size={18} className="text-tryonyou-gold" />
                <span className="text-tryonyou-gold font-semibold">Live Pilot Demo</span>
              </motion.div>

              {/* Title */}
              <h1 className="heading-xl mb-6 leading-tight">
                <span className="gradient-text">The End of Returns.</span>
                <br />
                <span className="text-white">The Perfect Fit.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience the first AI that matches clothing to your <span className="text-tryonyou-blue font-semibold">real measurements</span> and <span className="text-tryonyou-blue font-semibold">fabric physics</span>.
              </p>

              {/* Carousel Claims */}
              <div className="h-8 mb-8 overflow-hidden relative">
                 <motion.div
                    animate={{ y: [0, -32, -64, -96, 0] }}
                    transition={{ duration: 10, repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1], ease: "linear" }}
                    className="flex flex-col items-center lg:items-start"
                 >
                    {claims.map((claim, i) => (
                        <span key={i} className="h-8 text-xl font-mono text-tryonyou-gold/80 block">{claim}</span>
                    ))}
                    <span className="h-8 text-xl font-mono text-tryonyou-gold/80 block">{claims[0]}</span>
                 </motion.div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
                <Link to="/demo" className="btn-primary text-lg px-8 py-4 group shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] transition-shadow">
                  Enter Pilot Demo
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#how-it-works" className="btn-glass text-lg px-8 py-4 flex items-center gap-2">
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>

          {/* Visual Side (Mascot Interaction Placeholder) */}
          <div className="relative hidden lg:flex justify-center items-center">
             <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative w-[400px] h-[600px] bg-black/40 rounded-[2rem] border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl"
             >
                {/* Simulated Mirror UI */}
                <div className="absolute top-4 left-0 right-0 text-center text-white/50 text-xs font-mono">SMART MIRROR OS v1.0</div>

                {/* Placeholder for "Chica frente a espejo" */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <User size={120} className="text-white/20" />
                   <p className="absolute bottom-20 text-white/40">Waiting for user...</p>
                </div>

                {/* Pau Mascot Trigger */}
                <motion.div
                   className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-tr from-tryonyou-blue to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg z-20"
                   whileTap={{ scale: 0.9 }}
                   animate={{ boxShadow: ["0 0 0 0 rgba(124, 58, 237, 0.4)", "0 0 0 20px rgba(124, 58, 237, 0)"] }}
                   transition={{ duration: 2, repeat: Infinity }}
                >
                   <Sparkles className="text-white" size={24} />
                </motion.div>
             </motion.div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4 gradient-text">
            Real Science, Real Fit
          </h2>
          <p className="text-xl text-white/60">
            No cartoons. No guessing. Just precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { step: '1', title: 'Smart Scan', description: 'Our AI analyzes your unique biometric profile via camera.', icon: Scan },
            { step: '2', title: 'Fabric Matching', description: 'We calculate elasticity & drape against your measurements.', icon: Shirt },
            { step: '3', title: 'True Recommendation', description: 'See the exact garment that fits YOUR body.', icon: Star },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative text-center p-6 glass rounded-2xl border border-white/5 hover:border-tryonyou-blue/30 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-tryonyou-blue to-tryonyou-darkblue flex items-center justify-center mx-auto mb-6 glow-blue">
                <item.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/60">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home
