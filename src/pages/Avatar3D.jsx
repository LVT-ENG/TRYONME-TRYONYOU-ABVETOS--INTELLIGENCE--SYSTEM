import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Avatar3DCanvas from '../components/Avatar3DCanvas'
import { useApp } from '../context/AppContext'
import './Avatar3D.css'

const SKIN_COLORS = [
  { id: 'fair', color: '#ffe5d9', label: 'Fair' },
  { id: 'light', color: '#f5d0c5', label: 'Light' },
  { id: 'medium', color: '#d4a574', label: 'Medium' },
  { id: 'tan', color: '#c68642', label: 'Tan' },
  { id: 'brown', color: '#8d5524', label: 'Brown' },
  { id: 'dark', color: '#4a2c2a', label: 'Dark' },
]

const OUTFIT_PRESETS = [
  { id: 'casual', label: 'Casual', top: '#2d3748', bottom: '#1a202c', shoes: '#0a0a0a' },
  { id: 'formal', label: 'Formal', top: '#1a1a2e', bottom: '#16213e', shoes: '#1a1a1a' },
  { id: 'sporty', label: 'Sporty', top: '#4ade80', bottom: '#1f2937', shoes: '#f5f5f5' },
  { id: 'bold', label: 'Bold', top: '#dc2626', bottom: '#1a1a1a', shoes: '#0a0a0a' },
  { id: 'pastel', label: 'Pastel', top: '#fda4af', bottom: '#e5e5e5', shoes: '#f5f5f5' },
]

export default function Avatar3D() {
  const navigate = useNavigate()
  const { user, avatar, updateAvatar } = useApp()
  const [customizations, setCustomizations] = useState({
    skin: avatar.customizations.skin,
    outfit: OUTFIT_PRESETS[0],
  })

  const handleSkinChange = (color) => {
    setCustomizations((prev) => ({ ...prev, skin: color }))
    updateAvatar({ skin: color })
  }

  const handleOutfitChange = (preset) => {
    setCustomizations((prev) => ({ ...prev, outfit: preset }))
    updateAvatar({ outfit: preset })
  }

  const handleContinue = () => {
    navigate('/wardrobe')
  }

  return (
    <div className="avatar-page">
      <div className="avatar-layout">
        {/* 3D Canvas Section */}
        <motion.div
          className="avatar-canvas-section"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Avatar3DCanvas 
            customizations={customizations}
            className="avatar-preview"
          />
          <div className="avatar-info">
            <p>🖱️ Drag to rotate • Scroll to zoom</p>
          </div>
        </motion.div>

        {/* Customization Panel */}
        <motion.div
          className="avatar-controls"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="controls-header">
            <h1>Your Avatar</h1>
            <p>Personalize your 3D representation</p>
            {user.bodyShape && (
              <span className="energy-badge">
                {user.bodyShape.emoji} {user.bodyShape.label} Energy
              </span>
            )}
          </div>

          {/* Skin Color */}
          <div className="control-group">
            <h3>Skin Tone</h3>
            <div className="color-options">
              {SKIN_COLORS.map((skin) => (
                <button
                  key={skin.id}
                  className={`color-swatch ${customizations.skin === skin.color ? 'active' : ''}`}
                  style={{ background: skin.color }}
                  onClick={() => handleSkinChange(skin.color)}
                  title={skin.label}
                />
              ))}
            </div>
          </div>

          {/* Outfit Preset */}
          <div className="control-group">
            <h3>Outfit Style</h3>
            <div className="outfit-options">
              {OUTFIT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  className={`outfit-btn ${customizations.outfit?.id === preset.id ? 'active' : ''}`}
                  onClick={() => handleOutfitChange(preset)}
                >
                  <div className="outfit-preview">
                    <span style={{ background: preset.top }}></span>
                    <span style={{ background: preset.bottom }}></span>
                    <span style={{ background: preset.shoes }}></span>
                  </div>
                  <span className="outfit-label">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="avatar-actions">
            <button className="btn btn-gold" onClick={handleContinue}>
              Continue to Wardrobe
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/showroom')}>
              Explore Showroom
            </button>
          </div>

          <p className="peacock-whisper">
            🦚 "Your avatar is a canvas. Let's paint your story."
          </p>
        </motion.div>
      </div>
    </div>
  )
}

