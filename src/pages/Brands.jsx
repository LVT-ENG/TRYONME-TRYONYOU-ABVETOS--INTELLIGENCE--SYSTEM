import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BRANDS } from '../utils/constants'
import { useApp } from '../context/AppContext'
import './Brands.css'

export default function Brands() {
  const navigate = useNavigate()
  const { selectBrand, user } = useApp()

  const handleBrandSelect = (brand) => {
    selectBrand(brand)
    navigate('/avatar')
  }

  return (
    <div className="brands-page">
      <div className="container">
        <motion.div
          className="brands-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Choose Your Brand</h1>
          <p className="brands-subtitle">
            Each brand tells a different story. Which one speaks to you?
          </p>
          {user.bodyShape && (
            <p className="user-shape">
              Your energy: <span>{user.bodyShape.emoji} {user.bodyShape.label}</span>
            </p>
          )}
        </motion.div>

        <motion.div 
          className="brands-grid"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {BRANDS.map((brand) => (
            <motion.button
              key={brand.id}
              className={`brand-card ${brand.featured ? 'featured' : ''}`}
              onClick={() => handleBrandSelect(brand)}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: `0 0 30px ${brand.color}40`
              }}
              whileTap={{ scale: 0.98 }}
              style={{ '--brand-color': brand.color }}
            >
              {brand.featured && (
                <span className="featured-badge">✨ Featured</span>
              )}
              <span className="brand-emoji">{brand.emoji}</span>
              <h3 className="brand-name">{brand.name}</h3>
              <p className="brand-tagline">{brand.tagline}</p>
              <div 
                className="brand-accent"
                style={{ background: brand.color }}
              />
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="brands-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="peacock-tip">
            <span>🦚</span>
            "Choose what speaks to you. Style is a whisper, not a shout."
          </p>
        </motion.div>
      </div>
    </div>
  )
}

