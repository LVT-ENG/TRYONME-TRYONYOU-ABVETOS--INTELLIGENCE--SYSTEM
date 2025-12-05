import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import Avatar3DCanvas from '../components/Avatar3DCanvas'
import './Recommendation.css'

const GLOW_STAGES = [
  { id: 'base', name: 'Natural Base', icon: '🌙', description: 'Your authentic self' },
  { id: 'glow', name: 'Glow Enhancement', icon: '✨', description: 'Subtle radiance' },
  { id: 'full', name: 'Full Radiance', icon: '☀️', description: 'Maximum impact' },
]

const STYLE_RECOMMENDATIONS = [
  {
    id: 'elegant',
    name: 'Elegant Evening',
    items: ['Cubist Flow Jacket', 'High-Rise Pants', 'Gold Hoops', 'Bold Red Lip'],
    vibe: 'Sophisticated and commanding',
  },
  {
    id: 'casual',
    name: 'Casual Luxe',
    items: ['Silk Blouse', 'Tailored Jeans', 'Minimalist Watch', 'Nude Glow'],
    vibe: 'Effortlessly refined',
  },
  {
    id: 'bold',
    name: 'Statement Maker',
    items: ['Structured Coat', 'Texture Pants', 'Statement Earrings', 'Editorial Look'],
    vibe: 'Unapologetically bold',
  },
]

export default function Recommendation() {
  const navigate = useNavigate()
  const { user, avatar } = useApp()
  const [currentStage, setCurrentStage] = useState(0)
  const [selectedRecommendation, setSelectedRecommendation] = useState(null)
  const [showTransition, setShowTransition] = useState(false)

  const handleApplyGlow = () => {
    if (currentStage < GLOW_STAGES.length - 1) {
      setShowTransition(true)
      setTimeout(() => {
        setCurrentStage((prev) => prev + 1)
        setShowTransition(false)
      }, 800)
    }
  }

  const handleSelectRecommendation = (rec) => {
    setSelectedRecommendation(rec)
  }

  const handleSaveLook = () => {
    navigate('/wardrobe')
  }

  return (
    <div className="recommendation-page">
      <div className="container">
        <motion.div
          className="recommendation-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Your Glow-Up</h1>
          <p className="rec-subtitle">
            Transform your look with AI-powered recommendations
          </p>
        </motion.div>

        <div className="recommendation-content">
          {/* Before/After Preview */}
          <motion.div
            className="glow-preview"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="preview-cards">
              <div className="preview-card before">
                <h4>Before</h4>
                <div className="preview-avatar">
                  <Avatar3DCanvas 
                    customizations={avatar.customizations}
                    showControls={false}
                    className="mini-avatar"
                  />
                </div>
                <p>Natural base</p>
              </div>
              
              <motion.div 
                className={`preview-card after stage-${currentStage}`}
                animate={{
                  boxShadow: currentStage === 2 
                    ? '0 0 40px rgba(255, 0, 128, 0.4)'
                    : currentStage === 1
                    ? '0 0 20px rgba(255, 0, 128, 0.2)'
                    : 'none'
                }}
              >
                <h4>After</h4>
                <div className="preview-avatar">
                  <Avatar3DCanvas 
                    customizations={avatar.customizations}
                    showControls={false}
                    className="mini-avatar"
                  />
                  <AnimatePresence>
                    {showTransition && (
                      <motion.div
                        className="glow-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
                <p>{GLOW_STAGES[currentStage].name}</p>
              </motion.div>
            </div>

            {/* Glow Stage Selector */}
            <div className="glow-stages">
              <h4>Glow Level</h4>
              <div className="stage-buttons">
                {GLOW_STAGES.map((stage, index) => (
                  <button
                    key={stage.id}
                    className={`stage-btn ${index === currentStage ? 'active' : ''} ${index <= currentStage ? 'unlocked' : ''}`}
                    onClick={() => index <= currentStage && setCurrentStage(index)}
                  >
                    <span className="stage-icon">{stage.icon}</span>
                    <span className="stage-name">{stage.name}</span>
                  </button>
                ))}
              </div>
              <button 
                className="btn btn-gold apply-glow-btn"
                onClick={handleApplyGlow}
                disabled={currentStage >= GLOW_STAGES.length - 1}
              >
                {currentStage >= GLOW_STAGES.length - 1 ? 'Maximum Glow Achieved' : 'Apply Glow ✨'}
              </button>
            </div>
          </motion.div>

          {/* Style Recommendations */}
          <motion.div
            className="style-recommendations"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Recommended Looks</h3>
            <p className="rec-hint">Based on your {user.bodyShape?.label || 'unique'} energy</p>

            <div className="rec-cards">
              {STYLE_RECOMMENDATIONS.map((rec, index) => (
                <motion.button
                  key={rec.id}
                  className={`rec-card ${selectedRecommendation?.id === rec.id ? 'selected' : ''}`}
                  onClick={() => handleSelectRecommendation(rec)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="rec-header">
                    <h4>{rec.name}</h4>
                    {selectedRecommendation?.id === rec.id && (
                      <span className="selected-badge">Selected</span>
                    )}
                  </div>
                  <ul className="rec-items">
                    {rec.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className="rec-vibe">"{rec.vibe}"</p>
                </motion.button>
              ))}
            </div>

            {/* Final Look Preview */}
            {selectedRecommendation && (
              <motion.div
                className="final-look"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4>Your Final Look</h4>
                <div className="look-details">
                  <div className="look-items">
                    {selectedRecommendation.items.map((item, i) => (
                      <span key={i} className="look-item">{item}</span>
                    ))}
                  </div>
                  <div className="look-actions">
                    <button className="btn btn-primary" onClick={handleSaveLook}>
                      Apply to Wardrobe
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/showroom')}>
                      Explore More
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="peacock-advice">
              <span>🦚</span>
              <p>"Now that you feel it… LIVE 'IT. Welcome to TRYONYOU."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

