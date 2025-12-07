import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Star, Filter, Search, Heart, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'
import { getImageWithFallback, getLogoPath } from '../utils/assets'
import { useTheme } from '../context/ThemeContext'
import texts from '../data/texts.json'

const Brands = () => {
  const { isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'All', count: 48 },
    { id: 'luxury', name: 'Luxury', count: 12 },
    { id: 'streetwear', name: 'Streetwear', count: 15 },
    { id: 'sustainable', name: 'Sustainable', count: 8 },
    { id: 'sportswear', name: 'Sportswear', count: 10 },
    { id: 'vintage', name: 'Vintage', count: 3 },
  ]

  const brands = [
    { id: 1, name: 'ZARA', category: 'streetwear', logo: 'Z', logoImage: 'zara-logo.png', rating: 4.8, items: 1250, color: '#000000', featured: true },
    { id: 2, name: 'Massimo Dutti', category: 'luxury', logo: 'MD', logoImage: 'massimo-dutti-logo.png', rating: 4.7, items: 890, color: '#1a1a1a', featured: true },
    { id: 3, name: 'Mango', category: 'streetwear', logo: 'M', logoImage: 'mango-logo.png', rating: 4.6, items: 1100, color: '#D4AF37', featured: false },
    { id: 4, name: 'COS', category: 'sustainable', logo: 'C', logoImage: 'cos-logo.png', rating: 4.9, items: 450, color: '#2d3436', featured: true },
    { id: 5, name: 'Nike', category: 'sportswear', logo: 'N', logoImage: 'nike-logo.png', rating: 4.9, items: 2300, color: '#ff6b35', featured: true },
    { id: 6, name: 'Adidas', category: 'sportswear', logo: 'A', logoImage: 'adidas-logo.png', rating: 4.8, items: 2100, color: '#0a0a0a', featured: false },
    { id: 7, name: 'Reformation', category: 'sustainable', logo: 'R', logoImage: 'reformation-logo.png', rating: 4.7, items: 380, color: '#4a6741', featured: true },
    { id: 8, name: 'Gucci', category: 'luxury', logo: 'G', logoImage: 'gucci-logo.png', rating: 4.9, items: 560, color: '#1b5e20', featured: true },
    { id: 9, name: 'Balenciaga', category: 'luxury', logo: 'B', logoImage: 'balenciaga-logo.png', rating: 4.8, items: 340, color: '#000000', featured: false },
    { id: 10, name: 'Patagonia', category: 'sustainable', logo: 'P', logoImage: 'patagonia-logo.png', rating: 4.9, items: 280, color: '#1976d2', featured: true },
    { id: 11, name: 'Stüssy', category: 'streetwear', logo: 'S', logoImage: 'stussy-logo.png', rating: 4.7, items: 420, color: '#212121', featured: false },
    { id: 12, name: 'Loewe', category: 'luxury', logo: 'L', logoImage: 'loewe-logo.png', rating: 4.9, items: 290, color: '#8b4513', featured: true },
  ]

  const filteredBrands = brands.filter(brand => {
    const matchesCategory = activeCategory === 'all' || brand.category === activeCategory
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredBrands = brands.filter(b => b.featured).slice(0, 4)

  return (
    <div className="min-h-screen page-bg">
      {/* Hero Section */}
      <section className="hero-brands relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <ShoppingBag size={18} className={isDark ? 'text-rose-400' : 'text-rose-500'} />
              <span className={`font-semibold ${isDark ? 'text-rose-300' : 'text-rose-600'}`}>Verified Brands</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              {texts.brands.title}
            </h1>
            
            <p className={`text-xl max-w-3xl mx-auto mb-8 ${isDark ? 'text-white/80' : 'text-anthracite/80'}`}>
              {texts.brands.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className={`section-container ${isDark ? 'bg-tryonyou-smoke/30' : 'bg-gray-100/50'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-md gradient-text">Featured Brands</h2>
              <p className={`mt-2 ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>Most popular among our users</p>
            </div>
            <TrendingUp className={isDark ? 'text-tryonyou-blue' : 'text-tryonyou-gold'} size={32} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="card h-full relative overflow-hidden hover:scale-[1.03] transition-all duration-300">
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400 text-sm font-semibold">{brand.rating}</span>
                    </div>
                  </div>
                  
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-xl relative overflow-hidden"
                    style={{ backgroundColor: brand.color }}
                  >
                    {brand.logoImage ? (
                      <img 
                        src={getLogoPath(brand.logoImage)} 
                        alt={brand.name}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white" style={{ display: brand.logoImage ? 'none' : 'flex' }}>
                      {brand.logo}
                    </div>
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${
                    isDark ? 'group-hover:text-tryonyou-blue' : 'group-hover:text-tryonyou-gold'
                  }`}>
                    {brand.name}
                  </h3>
                  
                  <div className={`flex items-center justify-between text-sm ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>
                    <span>{brand.items} products</span>
                    <span className={`capitalize px-2 py-1 rounded-full ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>{brand.category}</span>
                  </div>
                  
                  <button className={`w-full mt-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isDark ? 'glass hover:bg-tryonyou-blue/20' : 'bg-gray-100 hover:bg-tryonyou-gold/20'
                  }`}>
                    <Heart size={16} />
                    View Collection
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* All Brands */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/40' : 'text-anthracite/40'}`} size={20} />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-tryonyou-blue bg-transparent ${
                  isDark ? 'glass' : 'bg-gray-100 border border-gray-200'
                }`}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? isDark ? 'bg-tryonyou-blue text-white' : 'bg-tryonyou-gold text-white'
                      : isDark ? 'glass text-white/70 hover:text-white' : 'bg-gray-100 text-anthracite/70 hover:text-anthracite'
                  }`}
                >
                  {cat.name}
                  <span className="ml-2 text-xs opacity-60">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="card h-full hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg relative overflow-hidden"
                        style={{ backgroundColor: brand.color }}
                      >
                        {brand.logoImage ? (
                          <img 
                            src={getLogoPath(brand.logoImage)} 
                            alt={brand.name}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div className="absolute inset-0 flex items-center justify-center" style={{ display: brand.logoImage ? 'none' : 'flex' }}>
                          {brand.logo}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={14} className="fill-yellow-400" />
                        <span className="text-sm font-medium">{brand.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className={`text-lg font-bold mb-1 transition-colors ${
                      isDark ? 'group-hover:text-tryonyou-blue' : 'group-hover:text-tryonyou-gold'
                    }`}>
                      {brand.name}
                    </h3>
                    
                    <p className={`text-sm mb-4 ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>{brand.items} products available</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-3 py-1 rounded-full capitalize ${
                        isDark ? 'bg-white/5 text-white/60' : 'bg-gray-100 text-anthracite/60'
                      }`}>
                        {categories.find(c => c.id === brand.category)?.name}
                      </span>
                      <ArrowRight size={18} className={`transition-all ${
                        isDark 
                          ? 'text-white/40 group-hover:text-tryonyou-blue group-hover:translate-x-1' 
                          : 'text-anthracite/40 group-hover:text-tryonyou-gold group-hover:translate-x-1'
                      }`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredBrands.length === 0 && (
            <div className={`text-center py-12 ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>
              <p className="text-lg">No brands found matching your criteria</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className={`section-container ${
        isDark ? 'bg-gradient-to-br from-rose-900/30 to-pink-900/20' : 'bg-gradient-to-br from-rose-100/50 to-pink-100/30'
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-lg mb-6 gradient-text">
            {texts.brands.integrate_title}
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-white/80' : 'text-anthracite/80'}`}>
            {texts.brands.integrate_description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:hello@tryonyou.app" className="btn-primary text-lg px-8 py-4">
              {texts.brands.request_demo}
              <ArrowRight className="inline ml-2" size={20} />
            </a>
            <button className="btn-metallic text-lg px-8 py-4">
              {texts.brands.view_docs}
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Brands

