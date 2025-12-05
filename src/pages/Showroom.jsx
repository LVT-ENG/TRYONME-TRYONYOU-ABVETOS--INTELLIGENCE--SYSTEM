import { useState } from 'react'
import { motion } from 'framer-motion'
import { BRANDS, WARDROBE_ITEMS } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import './Showroom.css'

const COLLECTIONS = [
  { id: 'spring24', name: 'Spring 2024', season: '🌸' },
  { id: 'summer24', name: 'Summer 2024', season: '☀️' },
  { id: 'fall24', name: 'Fall 2024', season: '🍂' },
  { id: 'limited', name: 'Limited Edition', season: '💎' },
]

// Generate showroom items
const SHOWROOM_ITEMS = [
  { id: 'sr1', name: 'Cubist Flow Collection', brand: 'liveit', collection: 'spring24', price: 1299, featured: true },
  { id: 'sr2', name: 'Urban Edge Series', brand: 'northstudio', collection: 'spring24', price: 899 },
  { id: 'sr3', name: 'Heritage Classic Set', brand: 'heritage', collection: 'limited', price: 2499, featured: true },
  { id: 'sr4', name: 'Summer Breeze Ensemble', brand: 'everline', collection: 'summer24', price: 749 },
  { id: 'sr5', name: 'NeoForm Tech Wear', brand: 'neoform', collection: 'fall24', price: 1099 },
  { id: 'sr6', name: 'Velvet Dreams Collection', brand: 'velvet', collection: 'limited', price: 1899 },
  { id: 'sr7', name: 'Golden Hour Set', brand: 'liveit', collection: 'summer24', price: 999, featured: true },
  { id: 'sr8', name: 'Minimalist Core', brand: 'northstudio', collection: 'fall24', price: 649 },
]

export default function Showroom() {
  const [activeCollection, setActiveCollection] = useState('all')
  const [activeBrand, setActiveBrand] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const filteredItems = SHOWROOM_ITEMS.filter((item) => {
    const matchesCollection = activeCollection === 'all' || item.collection === activeCollection
    const matchesBrand = activeBrand === 'all' || item.brand === activeBrand
    return matchesCollection && matchesBrand
  })

  const getBrandInfo = (brandId) => BRANDS.find((b) => b.id === brandId)
  const getCollectionInfo = (collectionId) => COLLECTIONS.find((c) => c.id === collectionId)

  return (
    <div className="showroom-page">
      <div className="container">
        {/* Header */}
        <motion.div
          className="showroom-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>The Showroom</h1>
          <p className="showroom-subtitle">
            Explore curated collections from the world's most innovative brands
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="showroom-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="filter-group">
            <label>Collection</label>
            <div className="filter-options">
              <button
                className={`filter-btn ${activeCollection === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCollection('all')}
              >
                All
              </button>
              {COLLECTIONS.map((col) => (
                <button
                  key={col.id}
                  className={`filter-btn ${activeCollection === col.id ? 'active' : ''}`}
                  onClick={() => setActiveCollection(col.id)}
                >
                  {col.season} {col.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Brand</label>
            <div className="filter-options">
              <button
                className={`filter-btn ${activeBrand === 'all' ? 'active' : ''}`}
                onClick={() => setActiveBrand('all')}
              >
                All Brands
              </button>
              {BRANDS.slice(0, 4).map((brand) => (
                <button
                  key={brand.id}
                  className={`filter-btn ${activeBrand === brand.id ? 'active' : ''}`}
                  onClick={() => setActiveBrand(brand.id)}
                >
                  {brand.emoji} {brand.name}
                </button>
              ))}
            </div>
          </div>

          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ▦
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ☰
            </button>
          </div>
        </motion.div>

        {/* Featured Banner */}
        <motion.div
          className="featured-banner"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="featured-content">
            <span className="featured-label">✨ Featured Collection</span>
            <h2>LIVE 'IT × The Peacock</h2>
            <p>A collaboration that redefines modern elegance with AI-driven design</p>
            <button className="btn btn-gold">Explore Collection</button>
          </div>
          <div className="featured-visual">
            <div className="featured-orb"></div>
          </div>
        </motion.div>

        {/* Items Grid */}
        <motion.div
          className={`showroom-grid ${viewMode}`}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
        >
          {filteredItems.map((item) => {
            const brand = getBrandInfo(item.brand)
            const collection = getCollectionInfo(item.collection)
            return (
              <motion.div
                key={item.id}
                className={`showroom-item ${item.featured ? 'featured' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8 }}
              >
                {item.featured && <span className="item-badge">Featured</span>}
                <div 
                  className="item-visual"
                  style={{ '--brand-color': brand?.color || '#333' }}
                >
                  <span className="brand-emoji">{brand?.emoji}</span>
                </div>
                <div className="item-details">
                  <span className="item-collection">
                    {collection?.season} {collection?.name}
                  </span>
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-brand">{brand?.name}</p>
                  <div className="item-footer">
                    <span className="item-price">{formatPrice(item.price)}</span>
                    <button className="quick-view-btn">View</button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="empty-state">
            <p>No items match your filters. Try adjusting your selection.</p>
          </div>
        )}

        {/* Peacock Quote */}
        <motion.div
          className="showroom-quote"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <blockquote>
            <span>🦚</span>
            <p>"Fashion is the armor to survive the reality of everyday life."</p>
          </blockquote>
        </motion.div>
      </div>
    </div>
  )
}

