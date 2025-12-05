import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WARDROBE_CATEGORIES, WARDROBE_ITEMS, BRANDS } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import { useApp } from '../context/AppContext'
import Avatar3DCanvas from '../components/Avatar3DCanvas'
import './Wardrobe.css'

export default function Wardrobe() {
  const { user, avatar, saveLook } = useApp()
  const [activeCategory, setActiveCategory] = useState('clothes')
  const [selectedItems, setSelectedItems] = useState({})
  const [showAiPanel, setShowAiPanel] = useState(false)

  const items = WARDROBE_ITEMS[activeCategory] || []

  const handleItemSelect = (item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [activeCategory]: prev[activeCategory]?.id === item.id ? null : item,
    }))
  }

  const handleSaveLook = () => {
    saveLook({
      items: Object.values(selectedItems).filter(Boolean),
      createdAt: new Date().toISOString(),
    })
    alert('Look saved! ✨')
  }

  const handleAiStyle = () => {
    setShowAiPanel(true)
    // Simulate AI recommendation
    setTimeout(() => {
      setSelectedItems({
        clothes: WARDROBE_ITEMS.clothes[0],
        shoes: WARDROBE_ITEMS.shoes[0],
        accessories: WARDROBE_ITEMS.accessories[0],
      })
    }, 1000)
  }

  const getBrandName = (brandId) => {
    const brand = BRANDS.find((b) => b.id === brandId)
    return brand?.name || 'Unknown'
  }

  return (
    <div className="wardrobe-page">
      {/* Sidebar */}
      <aside className="wardrobe-sidebar">
        <div className="sidebar-header">
          <h2>Categories</h2>
        </div>
        <nav className="category-nav">
          {WARDROBE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-label">{cat.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-divider" />
        <button className="ai-style-btn" onClick={handleAiStyle}>
          <span>🎯</span>
          <span>Style me (AI)</span>
        </button>
        <div className="sidebar-footer">
          <p>Selected: {Object.values(selectedItems).filter(Boolean).length} items</p>
          <button 
            className="btn btn-gold save-btn" 
            onClick={handleSaveLook}
            disabled={Object.values(selectedItems).filter(Boolean).length === 0}
          >
            Save Look
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="wardrobe-main">
        <motion.div
          className="wardrobe-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Virtual Wardrobe</h1>
          <p>Mix and match to create your perfect look</p>
        </motion.div>

        <div className="wardrobe-content">
          {/* Avatar Preview */}
          <div className="avatar-section">
            <div className="avatar-preview-container">
              <Avatar3DCanvas 
                customizations={avatar.customizations}
                className="wardrobe-avatar"
              />
            </div>
            <div className="selected-items-preview">
              <h4>Current Selection</h4>
              <div className="selection-tags">
                {Object.entries(selectedItems).map(([category, item]) => (
                  item && (
                    <span key={category} className="selection-tag">
                      {item.name}
                    </span>
                  )
                ))}
                {Object.values(selectedItems).filter(Boolean).length === 0 && (
                  <span className="empty-selection">No items selected</span>
                )}
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="items-section">
            <h3 className="items-title">
              {WARDROBE_CATEGORIES.find((c) => c.id === activeCategory)?.emoji}{' '}
              {WARDROBE_CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </h3>
            <motion.div 
              className="items-grid"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
            >
              <AnimatePresence mode="wait">
                {items.map((item) => (
                  <motion.button
                    key={item.id}
                    className={`item-card ${selectedItems[activeCategory]?.id === item.id ? 'selected' : ''}`}
                    onClick={() => handleItemSelect(item)}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                  >
                    <div className="item-image">
                      <span className="item-placeholder">
                        {WARDROBE_CATEGORIES.find((c) => c.id === activeCategory)?.emoji}
                      </span>
                    </div>
                    <div className="item-info">
                      <h4 className="item-name">{item.name}</h4>
                      {item.brand && (
                        <p className="item-brand">{getBrandName(item.brand)}</p>
                      )}
                      {item.price > 0 && (
                        <p className="item-price">{formatPrice(item.price)}</p>
                      )}
                    </div>
                    {selectedItems[activeCategory]?.id === item.id && (
                      <span className="selected-check">✓</span>
                    )}
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      {/* AI Panel */}
      <AnimatePresence>
        {showAiPanel && (
          <motion.div
            className="ai-panel-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAiPanel(false)}
          >
            <motion.div
              className="ai-panel"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ai-panel-header">
                <span className="peacock-icon">🦚</span>
                <h3>The Peacock Recommends</h3>
              </div>
              <p className="ai-message">
                "I've curated a look based on your energy and preferences. 
                Bold structure with subtle elegance — just right for you."
              </p>
              <button className="btn btn-primary" onClick={() => setShowAiPanel(false)}>
                Apply Recommendation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

