import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shirt, User, ShoppingBag, Wand2, MessageCircle, Play, Check, Star } from 'lucide-react'
import texts from '../data/texts.json'

const Home = () => {
  const features = [
    {
      icon: Sparkles,
      title: texts.home.features.virtual_tryon.title,
      description: texts.home.features.virtual_tryon.description,
      color: 'from-violet-500 to-purple-500',
      link: '/demo'
    },
    {
      icon: User,
      title: texts.home.features.avatar_3d.title,
      description: texts.home.features.avatar_3d.description,
      color: 'from-violet-500 to-purple-500',
      link: '/my-avatar'
    },
    {
      icon: Wand2,
      title: texts.home.features.intelligent_system.title,
      description: texts.home.features.intelligent_system.description,
      color: 'from-violet-500 to-purple-500',
      link: '/intelligent-system'
    },
    {
      icon: Shirt,
      title: texts.home.features.smart_wardrobe.title,
      description: texts.home.features.smart_wardrobe.description,
      color: 'from-violet-500 to-purple-500',
      link: '/wardrobe'
    },
    {
      icon: ShoppingBag,
      title: texts.home.features.brand_selection.title,
      description: texts.home.features.brand_selection.description,
      color: 'from-violet-500 to-purple-500',
      link: '/brands'
    },
    {
      icon: Sparkles,
      title: texts.home.features.showroom.title,
      description: texts.home.features.showroom.description,
      color: 'from-violet-500 to-purple-500',
      link: '/showroom'
    },
  ]

  const stats = [
    { value: '75%', label: 'Fewer Returns' },
    { value: '10K+', label: 'Happy Users' },
    { value: '50+', label: 'Partner Brands' },
    { value: '98%', label: 'Satisfaction' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Image Background (from old_code) */}
        {texts.hero.hero_image && (
          <div className="absolute inset-0 z-0">
            <img 
              src={texts.hero.hero_image} 
              alt={texts.hero.tagline}
              className="w-full h-full object-cover opacity-20"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>
        )}
        {/* Animated Background */}
        <div className="absolute inset-0 bg-showroom">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-tryonyou-blue/20 rounded-full blur-[150px] animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amparo-light/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-tryonyou-gold/10 rounded-full blur-[100px] animate-pulse" />
          </div>
        </div>

        <div className="relative z-10 section-container">
          <div className="max-w-5xl mx-auto text-center">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
              >
                <Sparkles size={18} className="text-tryonyou-gold" />
                <span className="text-tryonyou-gold font-semibold">AI-Powered Virtual Try-On</span>
              </motion.div>

              {/* Title */}
              <h1 className="heading-xl mb-6">
                <span className="gradient-text">{texts.hero.title}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-3xl mx-auto leading-relaxed">
                {texts.hero.subtitle}
              </p>
              
              {/* Description */}
              <p className="text-lg text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
                {texts.hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link to="/demo" className="btn-primary text-lg px-8 py-4 group">
                  {texts.welcome.start_button || "Start your look"}
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/my-avatar" className="btn-metallic text-lg px-8 py-4 flex items-center gap-2">
                  <Play size={20} />
                  {texts.hero.cta}
                </Link>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="glass rounded-xl p-4 text-center"
                  >
                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
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

      {/* Features Section */}
      <section className="section-container bg-tryonyou-smoke/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4 gradient-text">
            Everything You Need
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {texts.clients.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={feature.link} className="block group">
                <div className="card h-full hover:scale-[1.02] transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-tryonyou-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 mb-4">{feature.description}</p>
                  <Link to={feature.link} className="text-sm text-tryonyou-blue hover:text-amparo-light transition-colors inline-flex items-center gap-1">
                    {feature.title.includes('Try-On') ? texts.home.features.virtual_tryon.link_text : 
                     feature.title.includes('Avatar') ? texts.home.features.avatar_3d.link_text :
                     feature.title.includes('Intelligent') ? texts.home.features.intelligent_system.link_text :
                     feature.title.includes('Wardrobe') ? texts.home.features.smart_wardrobe.link_text :
                     feature.title.includes('Brand') ? texts.home.features.brand_selection.link_text :
                     texts.home.features.showroom.link_text}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Lafayette Demo Section */}
      <section className="section-container bg-gradient-to-br from-yellow-900/30 to-amber-900/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-lg mb-6 gradient-text">
            {texts.home.lafayette_demo.title}
          </h2>
          <Link to="/lafayette-demo" className="btn-primary text-lg px-8 py-4">
            {texts.home.lafayette_demo.link_text}
          </Link>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4 gradient-text">
            {texts.howitworks.title}
          </h2>
          <p className="text-xl text-white/60">
            {texts.howitworks.steps.length} simple steps to your perfect outfit
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {texts.howitworks.steps.map((step, index) => {
            const stepNum = parseInt(step.split('.')[0]);
            const stepText = step.substring(step.indexOf('.') + 2);
            let icon = User;
            if (stepNum === 2) icon = Sparkles;
            else if (stepNum === 3) icon = Shirt;
            else if (stepNum === 4) icon = ShoppingBag;
            return { step: stepNum.toString(), title: stepText.split('.')[0] || stepText, description: stepText, icon };
          }).map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-tryonyou-blue to-tryonyou-darkblue flex items-center justify-center mx-auto mb-6 glow-blue">
                <item.icon size={36} className="text-white" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-6xl font-display font-bold text-white/5">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/60">{item.description}</p>
              
              {index < 2 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-tryonyou-blue/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-container bg-gradient-to-br from-tryonyou-blue/10 to-amparo-light/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-lg mb-12 gradient-text">
            Loved by Thousands
          </h2>
          
          <div className="card bg-gradient-to-br from-tryonyou-blue/5 to-purple-500/5">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-white/90 italic mb-6">
              "Finally, an app that actually understands my body type. No more returns, 
              no more guessing. TryOnYou changed how I shop online!"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">
                👩
              </div>
              <div className="text-left">
                <div className="font-bold">María García</div>
                <div className="text-sm text-white/60">Fashion Enthusiast</div>
              </div>
            </div>
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
          <div className="card bg-gradient-to-br from-tryonyou-blue/20 via-purple-500/10 to-pink-500/20 border-tryonyou-blue/30 py-12 px-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🦚
            </motion.div>
            <h2 className="heading-lg mb-4 gradient-text">
              Ready to Transform Your Style?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join thousands of satisfied users and discover your perfect look today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/my-avatar" className="btn-primary text-lg px-8 py-4">
                Start Free Now
                <ArrowRight className="inline ml-2" size={20} />
              </Link>
              <Link to="/ask-peacock" className="btn-metallic text-lg px-8 py-4">
                🦚 Talk to Peacock
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
