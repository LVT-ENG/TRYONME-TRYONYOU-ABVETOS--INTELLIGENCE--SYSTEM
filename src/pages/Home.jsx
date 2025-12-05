import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BODY_SHAPES } from '../utils/constants'
import { useApp } from '../context/AppContext'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()
  const { updateBodyShape } = useApp()

  const handleShapeSelect = (shape) => {
    updateBodyShape(shape)
    navigate('/brands')
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            LIVE 'IT
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Where beauty lives in movement
          </motion.p>
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <button 
              className="btn btn-gold"
              onClick={() => document.getElementById('shape-section').scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Journey
            </button>
          </motion.div>
        </motion.div>

        <div className="hero-visual">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {[
              { icon: '🤖', title: 'Emotional AI', desc: 'Style that understands you' },
              { icon: '🎨', title: 'Auto-Production', desc: 'From design to delivery' },
              { icon: '💳', title: 'Biometric Payments', desc: 'Secure and seamless' },
              { icon: '📊', title: 'Trend Engine', desc: 'Always ahead of fashion' },
              { icon: '👗', title: 'Smart Wardrobe', desc: 'Your digital closet' },
              { icon: '🤝', title: 'Solidarity', desc: 'Fashion with purpose' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="feature-card"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <span className="feature-icon">{feature.icon}</span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Body Shape Selection */}
      <section className="shape-section" id="shape-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Choose Your Energy</h2>
            <p className="section-subtitle">
              We style based on your energy, not your size.
            </p>
          </motion.div>

          <motion.div 
            className="shapes-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {BODY_SHAPES.map((shape) => (
              <motion.button
                key={shape.id}
                className="shape-card"
                onClick={() => handleShapeSelect(shape)}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="shape-emoji">{shape.emoji}</span>
                <span className="shape-label">{shape.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Peacock Quote */}
      <section className="quote-section">
        <motion.blockquote
          className="peacock-quote"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="quote-icon">🦚</span>
          <p>"Fashion fades, style is eternal. Let's build something timeless."</p>
          <cite>— The Peacock</cite>
        </motion.blockquote>
      </section>
    </div>
  )
}

