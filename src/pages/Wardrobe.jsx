import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shirt, ShoppingBag, Heart, Filter, Search, Grid, List, Plus, X, Sparkles, Eye, ArrowRight } from 'lucide-react'
import { getImageWithFallback } from '../utils/assets'
import Avatar3D from '../components/Avatar3D'
import texts from '../data/texts.json'

const Wardrobe = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedItems, setSavedItems] = useState([])
  const [showTryOnModal, setShowTryOnModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const categories = [
    { id: 'all', name: 'All', icon: Grid, count: 48 },
    { id: 'clothes', name: texts.wardrobe.categories.clothes, icon: Shirt, count: 15 },
    { id: 'shoes', name: texts.wardrobe.categories.shoes, icon: Shirt, count: 12 },
    { id: 'accessories', name: texts.wardrobe.categories.accessories, icon: Shirt, count: 8 },
    { id: 'makeup', name: texts.wardrobe.categories.makeup, icon: Shirt, count: 6 },
    { id: 'hair', name: texts.wardrobe.categories.hair, icon: Shirt, count: 7 },
  ]
  
  const wardrobeCategories = [
    { icon: "👕", label: texts.wardrobe.categories.clothes.split(' ')[1] },
    { icon: "👟", label: texts.wardrobe.categories.shoes.split(' ')[1] },
    { icon: "💍", label: texts.wardrobe.categories.accessories.split(' ')[1] },
    { icon: "💄", label: texts.wardrobe.categories.makeup.split(' ')[1] },
    { icon: "💇", label: texts.wardrobe.categories.hair.split(' ')[1] },
  ]
  
  const handleStyleMe = () => {
    alert("Let The Peacock guide your style...");
  }

  const clothes = [
    { id: 1, name: 'Silk Blouse', category: 'tops', price: 89, color: '#F5DEB3', brand: 'ZARA', size: 'M', match: 96, image: 'silk-blouse.jpg' },
    { id: 2, name: 'High-Waist Jeans', category: 'bottoms', price: 69, color: '#4682B4', brand: 'Levi\'s', size: '28', match: 94, image: 'jeans.jpg' },
    { id: 3, name: 'Midi Dress', category: 'dresses', price: 129, color: '#8B5A7D', brand: 'Mango', size: 'S', match: 92, image: 'midi-dress.jpg' },
    { id: 4, name: 'Wool Blazer', category: 'outerwear', price: 199, color: '#2C2C2C', brand: 'COS', size: 'M', match: 98, image: 'blazer.jpg' },
    { id: 5, name: 'Cashmere Sweater', category: 'tops', price: 149, color: '#D4A574', brand: 'Massimo Dutti', size: 'M', match: 95, image: 'sweater.jpg' },
    { id: 6, name: 'Leather Belt', category: 'accessories', price: 45, color: '#8B4513', brand: 'Gucci', size: 'One Size', match: 100, image: 'belt.jpg' },
    { id: 7, name: 'Pleated Skirt', category: 'bottoms', price: 79, color: '#1a1a1a', brand: 'H&M', size: 'S', match: 91, image: 'skirt.jpg' },
    { id: 8, name: 'Cotton T-Shirt', category: 'tops', price: 29, color: '#FFFFFF', brand: 'Uniqlo', size: 'M', match: 97, image: 'tshirt.jpg' },
    { id: 9, name: 'Trench Coat', category: 'outerwear', price: 249, color: '#C4A77D', brand: 'Burberry', size: 'M', match: 93, image: 'trench.jpg' },
    { id: 10, name: 'Evening Dress', category: 'dresses', price: 299, color: '#800020', brand: 'Reformation', size: 'S', match: 89, image: 'dress.jpg' },
    { id: 11, name: 'Wide Leg Pants', category: 'bottoms', price: 89, color: '#BDC3C7', brand: 'Arket', size: '38', match: 94, image: 'pants.jpg' },
    { id: 12, name: 'Gold Necklace', category: 'accessories', price: 159, color: '#D4AF37', brand: 'Mejuri', size: 'One Size', match: 100, image: 'necklace.jpg' },
  ]

  const filteredClothes = clothes.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleSaved = (id) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleTryOn = (item) => {
    setSelectedItem(item)
    setShowTryOnModal(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-cyan-900/50 to-tryonyou-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Shirt size={18} className="text-blue-400" />
              <span className="text-blue-300 font-semibold">Your Digital Closet</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              {texts.wardrobe.title}
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Your digital closet to try on clothes virtually and find your perfect fit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="py-6 bg-tryonyou-smoke/50 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Search clothes, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-tryonyou-blue bg-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? 'bg-tryonyou-blue text-white'
                      : 'glass text-white/70 hover:text-white'
                  }`}
                >
                  {cat.name}
                  <span className="text-xs opacity-60">({cat.count})</span>
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-tryonyou-blue' : 'glass'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-tryonyou-blue' : 'glass'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Saved Items Count */}
      {savedItems.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="glass rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart size={20} className="text-rose-500 fill-rose-500" />
              <span>{savedItems.length} items saved to your collection</span>
            </div>
            <button className="btn-primary text-sm py-2">
              View Collection
            </button>
          </div>
        </div>
      )}

      {/* Clothes Grid */}
      <section className="section-container">
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}
          >
            {filteredClothes.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className={`group ${viewMode === 'list' ? 'flex gap-6' : ''}`}
              >
                <div className={`card hover:scale-[1.02] transition-all duration-300 ${viewMode === 'list' ? 'flex gap-6 w-full' : ''}`}>
                  {/* Image/Color Preview */}
                  <div className={`relative ${viewMode === 'list' ? 'w-40 flex-shrink-0' : 'mb-4'}`}>
                    <div 
                      className={`rounded-xl overflow-hidden flex items-center justify-center ${viewMode === 'list' ? 'h-full' : 'h-48'}`}
                      style={{ backgroundColor: item.color }}
                    >
                      {item.image ? (
                        <img 
                          src={getImageWithFallback(item.image, 'wardrobe')} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center" style={{ display: item.image ? 'none' : 'flex' }}>
                        <Shirt size={48} className="text-white/30" />
                      </div>
                    </div>
                    
                    {/* Match Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                      <Sparkles size={12} className="text-tryonyou-gold" />
                      <span className="text-tryonyou-gold text-xs font-bold">{item.match}% match</span>
                    </div>

                    {/* Actions */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => toggleSaved(item.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                          savedItems.includes(item.id)
                            ? 'bg-rose-500/80 text-white'
                            : 'bg-black/40 text-white/80 hover:bg-black/60'
                        }`}
                      >
                        <Heart size={16} className={savedItems.includes(item.id) ? 'fill-white' : ''} />
                      </button>
                    </div>

                    {/* Try On Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                      <button 
                        onClick={() => handleTryOn(item)}
                        className="btn-primary text-sm"
                      >
                        <Eye size={16} className="mr-2" />
                        Try On
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold group-hover:text-tryonyou-blue transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-white/60">{item.brand}</p>
                      </div>
                      <span className="text-lg font-bold text-tryonyou-gold">${item.price}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span>Size: {item.size}</span>
                      <span className="capitalize">{categories.find(c => c.id === item.category)?.name}</span>
                    </div>

                    {viewMode === 'list' && (
                      <div className="flex gap-2 mt-4">
                        <button 
                          onClick={() => handleTryOn(item)}
                          className="btn-primary text-sm py-2"
                        >
                          Try On
                        </button>
                        <button className="glass px-4 py-2 rounded-lg text-sm hover:bg-white/10">
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredClothes.length === 0 && (
          <div className="text-center py-16">
            <Shirt size={64} className="text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No items found</h3>
            <p className="text-white/60 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="btn-metallic"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
      
      {/* Peacock Image Reference (from old_code) */}
      <div className="fixed bottom-4 right-4 z-40 opacity-30 hover:opacity-60 transition-opacity">
        <img
          src={texts.wardrobe.peacock_image}
          alt={texts.wardrobe.peacock_text}
          title={texts.wardrobe.peacock_text}
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      {/* CTA Section */}
      <section className="section-container bg-gradient-to-br from-blue-900/30 to-cyan-900/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-lg mb-6 gradient-text">
            Want personalized recommendations?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Create your avatar for perfect fit predictions and style suggestions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/my-avatar" className="btn-primary text-lg px-8 py-4">
              Create My Avatar
              <ArrowRight className="inline ml-2" size={20} />
            </a>
            <a href="/showroom" className="btn-metallic text-lg px-8 py-4">
              Explore Showroom
            </a>
          </div>
        </motion.div>
      </section>

      {/* Try On Modal */}
      <AnimatePresence>
        {showTryOnModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTryOnModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
                  <p className="text-white/60">{selectedItem.brand}</p>
                </div>
                <button 
                  onClick={() => setShowTryOnModal(false)}
                  className="p-2 glass rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 3D Avatar Try-On View */}
                <div className="space-y-4">
                  <div className="aspect-square rounded-xl overflow-hidden relative bg-gradient-to-br from-gray-800 to-gray-900">
                    <Avatar3D 
                      customizations={{
                        outfit: {
                          top: selectedItem.category === 'tops' || selectedItem.category === 'dresses' ? selectedItem.color : '#1a1a1a',
                          bottom: selectedItem.category === 'bottoms' || selectedItem.category === 'dresses' ? selectedItem.color : '#2d2d2d',
                          shoes: selectedItem.category === 'accessories' ? selectedItem.color : '#0a0a0a',
                        }
                      }}
                      modelPath="/models/avatar.glb"
                      showControls={true}
                      height="100%"
                    />
                  </div>
                  
                  {/* Item Image */}
                  <div 
                    className="aspect-square rounded-xl overflow-hidden relative"
                    style={{ backgroundColor: selectedItem.color }}
                  >
                    {selectedItem.image ? (
                      <img 
                        src={getImageWithFallback(selectedItem.image, 'wardrobe')} 
                        alt={selectedItem.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center" style={{ display: selectedItem.image ? 'none' : 'flex' }}>
                      <Shirt size={64} className="text-white/30" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Fit Analysis</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-2 rounded-full bg-white/10">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-tryonyou-blue to-amparo-light"
                          style={{ width: `${selectedItem.match}%` }}
                        />
                      </div>
                      <span className="text-tryonyou-blue font-bold">{selectedItem.match}%</span>
                    </div>
                    <p className="text-sm text-white/60">Perfect match for your body type!</p>
                  </div>

                  <div className="glass rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Size</span>
                        <span>{selectedItem.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Price</span>
                        <span className="text-tryonyou-gold font-bold">${selectedItem.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Category</span>
                        <span className="capitalize">{selectedItem.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="btn-primary flex-1">
                      <ShoppingBag size={18} className="mr-2" />
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => toggleSaved(selectedItem.id)}
                      className={`p-3 rounded-lg ${savedItems.includes(selectedItem.id) ? 'bg-rose-500' : 'glass'}`}
                    >
                      <Heart size={20} className={savedItems.includes(selectedItem.id) ? 'fill-white' : ''} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Wardrobe
