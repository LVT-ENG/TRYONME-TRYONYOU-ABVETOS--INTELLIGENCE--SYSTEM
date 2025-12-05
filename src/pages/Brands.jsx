import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Star, Filter, Search, Heart, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'

const Brands = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'Todas', count: 48 },
    { id: 'luxury', name: 'Lujo', count: 12 },
    { id: 'streetwear', name: 'Streetwear', count: 15 },
    { id: 'sustainable', name: 'Sostenible', count: 8 },
    { id: 'sportswear', name: 'Deportivo', count: 10 },
    { id: 'vintage', name: 'Vintage', count: 3 },
  ]

  const brands = [
    { id: 1, name: 'ZARA', category: 'streetwear', logo: 'Z', rating: 4.8, items: 1250, color: '#000000', featured: true },
    { id: 2, name: 'Massimo Dutti', category: 'luxury', logo: 'MD', rating: 4.7, items: 890, color: '#1a1a1a', featured: true },
    { id: 3, name: 'Mango', category: 'streetwear', logo: 'M', rating: 4.6, items: 1100, color: '#D4AF37', featured: false },
    { id: 4, name: 'COS', category: 'sustainable', logo: 'C', rating: 4.9, items: 450, color: '#2d3436', featured: true },
    { id: 5, name: 'Nike', category: 'sportswear', logo: 'N', rating: 4.9, items: 2300, color: '#ff6b35', featured: true },
    { id: 6, name: 'Adidas', category: 'sportswear', logo: 'A', rating: 4.8, items: 2100, color: '#0a0a0a', featured: false },
    { id: 7, name: 'Reformation', category: 'sustainable', logo: 'R', rating: 4.7, items: 380, color: '#4a6741', featured: true },
    { id: 8, name: 'Gucci', category: 'luxury', logo: 'G', rating: 4.9, items: 560, color: '#1b5e20', featured: true },
    { id: 9, name: 'Balenciaga', category: 'luxury', logo: 'B', rating: 4.8, items: 340, color: '#000000', featured: false },
    { id: 10, name: 'Patagonia', category: 'sustainable', logo: 'P', rating: 4.9, items: 280, color: '#1976d2', featured: true },
    { id: 11, name: 'Stüssy', category: 'streetwear', logo: 'S', rating: 4.7, items: 420, color: '#212121', featured: false },
    { id: 12, name: 'Loewe', category: 'luxury', logo: 'L', rating: 4.9, items: 290, color: '#8b4513', featured: true },
  ]

  const filteredBrands = brands.filter(brand => {
    const matchesCategory = activeCategory === 'all' || brand.category === activeCategory
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredBrands = brands.filter(b => b.featured).slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-950 via-pink-900/50 to-tryonyou-black">
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
              <ShoppingBag size={18} className="text-rose-400" />
              <span className="text-rose-300 font-semibold">Marcas Verificadas</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              Marcas
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              TryOnYou se conecta con catálogos, colecciones y datos de talla para reducir devoluciones y aumentar la conversión.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="section-container bg-tryonyou-smoke/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-md gradient-text">Marcas Destacadas</h2>
              <p className="text-white/60 mt-2">Las más populares entre nuestros usuarios</p>
            </div>
            <TrendingUp className="text-tryonyou-blue" size={32} />
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
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 text-3xl font-bold text-white shadow-xl"
                    style={{ backgroundColor: brand.color }}
                  >
                    {brand.logo}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-tryonyou-blue transition-colors">
                    {brand.name}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>{brand.items} productos</span>
                    <span className="capitalize px-2 py-1 rounded-full bg-white/5">{brand.category}</span>
                  </div>
                  
                  <button className="w-full mt-4 py-2 rounded-lg glass text-sm font-semibold hover:bg-tryonyou-blue/20 transition-colors flex items-center justify-center gap-2">
                    <Heart size={16} />
                    Ver colección
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Buscar marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-tryonyou-blue bg-transparent"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-tryonyou-blue text-white'
                      : 'glass text-white/70 hover:text-white'
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
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg"
                        style={{ backgroundColor: brand.color }}
                      >
                        {brand.logo}
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={14} className="fill-yellow-400" />
                        <span className="text-sm font-medium">{brand.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-1 group-hover:text-tryonyou-blue transition-colors">
                      {brand.name}
                    </h3>
                    
                    <p className="text-sm text-white/60 mb-4">{brand.items} productos disponibles</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/60 capitalize">
                        {categories.find(c => c.id === brand.category)?.name}
                      </span>
                      <ArrowRight size={18} className="text-white/40 group-hover:text-tryonyou-blue group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredBrands.length === 0 && (
            <div className="text-center py-16">
              <Sparkles size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No se encontraron marcas</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="section-container bg-gradient-to-br from-rose-900/30 to-pink-900/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-lg mb-6 gradient-text">
            ¿Quieres integrar tu marca?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Conecta tu catálogo con TryOnYou y reduce las devoluciones hasta un 75%
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:hello@tryonyou.app" className="btn-primary text-lg px-8 py-4">
              Solicita la demo
              <ArrowRight className="inline ml-2" size={20} />
            </a>
            <button className="btn-metallic text-lg px-8 py-4">
              Ver documentación
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Brands

