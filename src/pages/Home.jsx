import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shirt, User, ShoppingBag, Wand2, MessageCircle, Play, Check, Star, FileText } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { getImagePath } from '../utils/assets'
import texts from '../data/texts.json'

const Home = () => {
  const { isDark } = useTheme()
  
  const features = [
    {
      icon: Sparkles,
      title: texts.home.features.virtual_tryon.title,
      description: texts.home.features.virtual_tryon.description,
      color: 'from-tryonyou-gold to-gold-dark',
      link: '/demo'
    },
    {
      icon: User,
      title: texts.home.features.avatar_3d.title,
      description: texts.home.features.avatar_3d.description,
      color: 'from-anthracite to-anthracite-dark',
      link: '/my-avatar'
    },
    {
      icon: Wand2,
      title: texts.home.features.intelligent_system.title,
      description: texts.home.features.intelligent_system.description,
      color: 'from-tryonyou-gold to-gold-dark',
      link: '/intelligent-system'
    },
    {
      icon: Shirt,
      title: texts.home.features.smart_wardrobe.title,
      description: texts.home.features.smart_wardrobe.description,
      color: 'from-anthracite to-anthracite-dark',
      link: '/wardrobe'
    },
    {
      icon: ShoppingBag,
      title: texts.home.features.brand_selection.title,
      description: texts.home.features.brand_selection.description,
      color: 'from-tryonyou-gold to-gold-dark',
      link: '/brands'
    },
    {
      icon: Sparkles,
      title: texts.home.features.showroom.title,
      description: texts.home.features.showroom.description,
      color: 'from-anthracite to-anthracite-dark',
      link: '/showroom'
    },
    {
      icon: FileText,
      title: texts.home.features.look_sheet.title,
      description: texts.home.features.look_sheet.description,
      color: 'from-tryonyou-gold to-gold-dark',
      link: '/look'
    },
  ]

  const stats = [
    { value: '75%', label: 'Fewer Returns' },
    { value: '10K+', label: 'Happy Users' },
    { value: '50+', label: 'Partner Brands' },
    { value: '98%', label: 'Satisfaction' },
  ]

  return (
    <div className="min-h-screen page-bg transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Hero Image Background - Futuristic Showroom */}
        <div className="absolute inset-0 z-0">
          <img 
            src={getImagePath('bg.jpeg')} 
            alt={texts.hero.tagline}
            className={`object-cover w-full h-full ${isDark ? 'opacity-40' : 'opacity-30'}`}
            onError={(e) => { e.target.style.display = 'none' }}
          />
          {/* Overlay for premium look */}
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-b from-tryonyou-black/80 via-tryonyou-black/60 to-tryonyou-black' 
              : 'bg-gradient-to-b from-white/60 via-white/40 to-[#FAFAFA]'
          }`}></div>
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
                className={`inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full shadow-soft border ${
                  isDark 
                    ? 'bg-white/10 border-tryonyou-gold/50' 
                    : 'bg-white border-tryonyou-gold/30'
                }`}
              >
                <Sparkles size={18} className="text-tryonyou-gold" />
                <span className="font-semibold text-tryonyou-gold">AI-Powered Virtual Try-On</span>
              </motion.div>

              {/* Title */}
              <h1 className="mb-6 heading-xl">
                <span className="gradient-text">{texts.hero.title}</span>
              </h1>

              {/* Subtitle */}
              <p className={`max-w-3xl mx-auto mb-4 text-xl leading-relaxed md:text-2xl ${
                isDark ? 'text-white/80' : 'text-anthracite/80'
              }`}>
                {texts.hero.subtitle}
              </p>
              
              {/* Description */}
              <p className={`max-w-3xl mx-auto mb-8 text-lg leading-relaxed ${
                isDark ? 'text-white/60' : 'text-anthracite/60'
              }`}>
                {texts.hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link to="/demo" className="px-8 py-4 text-lg btn-gold group">
                  {texts.welcome.start_button || "Start your look"}
                  <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1 inline" />
                </Link>
                <Link to="/my-avatar" className="flex items-center gap-2 px-8 py-4 text-lg btn-metallic">
                  <Play size={20} />
                  {texts.hero.cta}
                </Link>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-4 md:grid-cols-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="card p-4 text-center"
                  >
                    <div className="text-3xl font-bold gradient-text-gold">{stat.value}</div>
                    <div className={`text-sm ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>{stat.label}</div>
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
          className="absolute -translate-x-1/2 bottom-8 left-1/2"
        >
          <div className={`flex items-start justify-center w-6 h-10 p-2 border-2 rounded-full ${
            isDark ? 'border-white/30' : 'border-anthracite/30'
          }`}>
            <div className={`w-1 h-2 rounded-full ${isDark ? 'bg-white/50' : 'bg-anthracite/50'}`} />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-container bg-section-alt">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 heading-lg gradient-text">
            Everything You Need
          </h2>
          <p className={`max-w-2xl mx-auto text-xl ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>
            {texts.clients.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <h3 className={`mb-2 text-xl font-bold transition-colors group-hover:text-tryonyou-gold ${
                    isDark ? 'text-white' : 'text-anthracite'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>{feature.description}</p>
                  <Link to={feature.link} className="inline-flex items-center gap-1 text-sm transition-colors text-tryonyou-gold hover:text-gold-dark">
                    {feature.title.includes('Try-On') ? texts.home.features.virtual_tryon.link_text : 
                     feature.title.includes('Avatar') ? texts.home.features.avatar_3d.link_text :
                     feature.title.includes('Intelligent') ? texts.home.features.intelligent_system.link_text :
                     feature.title.includes('Wardrobe') ? texts.home.features.smart_wardrobe.link_text :
                     feature.title.includes('Brand') ? texts.home.features.brand_selection.link_text :
                     feature.title.includes('Look Sheet') ? texts.home.features.look_sheet.link_text :
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
      <section className={`section-container ${isDark ? 'bg-tryonyou-gold/5' : 'bg-gradient-to-br from-tryonyou-gold/10 to-gold-light/5'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="mb-6 heading-lg gradient-text">
            {texts.home.lafayette_demo.title}
          </h2>
          <Link to="/lafayette-demo" className="px-8 py-4 text-lg btn-gold">
            {texts.home.lafayette_demo.link_text}
          </Link>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="section-container bg-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 heading-lg gradient-text">
            {texts.howitworks.title}
          </h2>
          <p className={`text-xl ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>
            {texts.howitworks.steps.length} simple steps to your perfect outfit
          </p>
        </motion.div>

        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-4">
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
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-tryonyou-gold to-gold-dark shadow-lg">
                <item.icon size={36} className="text-white" />
              </div>
              <div className={`absolute top-0 text-6xl font-bold -translate-x-1/2 -translate-y-2 left-1/2 font-display ${
                isDark ? 'text-white/5' : 'text-anthracite/5'
              }`}>
                {item.step}
              </div>
              <h3 className={`mb-2 text-xl font-bold ${isDark ? 'text-white' : 'text-anthracite'}`}>{item.title}</h3>
              <p className={isDark ? 'text-white/60' : 'text-anthracite/60'}>{item.description}</p>
              
              {index < 3 && (
                <div className={`hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 ${
                  isDark ? 'bg-gradient-to-r from-tryonyou-blue/50 to-transparent' : 'bg-gradient-to-r from-tryonyou-gold/50 to-transparent'
                }`} />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={`section-container ${isDark ? 'bg-white/5' : 'bg-gradient-to-br from-anthracite/5 to-gray-100'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="mb-12 heading-lg gradient-text">
            Loved by Thousands
          </h2>
          
          <div className="card border-tryonyou-gold/20">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-tryonyou-gold fill-tryonyou-gold" />
              ))}
            </div>
            <blockquote className={`mb-6 text-xl italic md:text-2xl ${isDark ? 'text-white/90' : 'text-anthracite/90'}`}>
              "Finally, an app that actually understands my body type. No more returns, 
              no more guessing. TryOnYou changed how I shop online!"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 text-xl rounded-full bg-gradient-to-br from-tryonyou-gold to-gold-dark">
                👩
              </div>
              <div className="text-left">
                <div className={`font-bold ${isDark ? 'text-white' : 'text-anthracite'}`}>María García</div>
                <div className={`text-sm ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>Fashion Enthusiast</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="section-container bg-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className={`px-8 py-12 card border-tryonyou-gold/30 ${
            isDark 
              ? 'bg-gradient-to-br from-tryonyou-gold/10 via-transparent to-tryonyou-blue/10' 
              : 'bg-gradient-to-br from-tryonyou-gold/10 via-white to-anthracite/5'
          }`}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-6"
            >
              <img src="/logo.png" alt="TRYONYOU Peacock" className="h-20 w-auto mx-auto" />
            </motion.div>
            <h2 className="mb-4 heading-lg gradient-text">
              Ready to Transform Your Style?
            </h2>
            <p className={`mb-8 text-xl ${isDark ? 'text-white/70' : 'text-anthracite/70'}`}>
              Join thousands of satisfied users and discover your perfect look today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/my-avatar" className="px-8 py-4 text-lg btn-gold">
                Start Free Now
                <ArrowRight className="inline ml-2" size={20} />
              </Link>
              <Link to="/ask-peacock" className="btn-peacock px-6 py-3 gap-2">
                <img src="/peak.png" alt="Peacock" className="h-8 w-auto" />
                <span className="text-anthracite font-semibold">Talk to Peacock</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
