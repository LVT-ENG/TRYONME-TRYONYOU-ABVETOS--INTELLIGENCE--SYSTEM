import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Filter, Heart, ShoppingBag, Eye, ArrowRight, Star, Zap, Sun, Moon, Briefcase, PartyPopper, Plane } from 'lucide-react'

const Showroom = () => {
  const [activeOccasion, setActiveOccasion] = useState('all')
  const [activeMood, setActiveMood] = useState('all')
  const [likedLooks, setLikedLooks] = useState([])

  const occasions = [
    { id: 'all', name: 'Todos', icon: Sparkles },
    { id: 'work', name: 'Trabajo', icon: Briefcase },
    { id: 'casual', name: 'Casual', icon: Sun },
    { id: 'night', name: 'Noche', icon: Moon },
    { id: 'party', name: 'Fiesta', icon: PartyPopper },
    { id: 'travel', name: 'Viaje', icon: Plane },
  ]

  const moods = [
    { id: 'all', name: 'Todos', emoji: '✨' },
    { id: 'confident', name: 'Seguro/a', emoji: '💪' },
    { id: 'relaxed', name: 'Relajado/a', emoji: '😌' },
    { id: 'romantic', name: 'Romántico/a', emoji: '💕' },
    { id: 'bold', name: 'Atrevido/a', emoji: '🔥' },
    { id: 'minimal', name: 'Minimalista', emoji: '⬜' },
  ]

  const looks = [
    {
      id: 1,
      name: 'Power Meeting',
      occasion: 'work',
      mood: 'confident',
      items: ['Blazer negro estructurado', 'Camisa blanca satinada', 'Pantalón de vestir'],
      colors: ['#1a1a1a', '#ffffff', '#2d3436'],
      rating: 4.9,
      views: 2340,
      match: 96,
    },
    {
      id: 2,
      name: 'Weekend Vibes',
      occasion: 'casual',
      mood: 'relaxed',
      items: ['Suéter oversize camel', 'Jeans boyfriend', 'Sneakers blancos'],
      colors: ['#D4A574', '#6B8E9F', '#F5F5F5'],
      rating: 4.8,
      views: 3120,
      match: 94,
    },
    {
      id: 3,
      name: 'Date Night',
      occasion: 'night',
      mood: 'romantic',
      items: ['Vestido slip dress', 'Blazer satinado', 'Tacones strappy'],
      colors: ['#8B5A7D', '#2C2C2C', '#C9A86C'],
      rating: 4.9,
      views: 4560,
      match: 92,
    },
    {
      id: 4,
      name: 'Festival Ready',
      occasion: 'party',
      mood: 'bold',
      items: ['Top lentejuelas', 'Pantalón cargo', 'Botas platform'],
      colors: ['#FFD700', '#2F4F4F', '#1C1C1C'],
      rating: 4.7,
      views: 2890,
      match: 88,
    },
    {
      id: 5,
      name: 'City Explorer',
      occasion: 'travel',
      mood: 'relaxed',
      items: ['Trench coat', 'Jersey cuello alto', 'Pantalón wide leg'],
      colors: ['#C4A77D', '#2C3E50', '#BDC3C7'],
      rating: 4.8,
      views: 1980,
      match: 91,
    },
    {
      id: 6,
      name: 'Clean Slate',
      occasion: 'work',
      mood: 'minimal',
      items: ['Camisa popelín', 'Pantalón recto', 'Mocasines'],
      colors: ['#FFFFFF', '#1a1a1a', '#8B7355'],
      rating: 4.9,
      views: 3450,
      match: 95,
    },
    {
      id: 7,
      name: 'Summer Sunset',
      occasion: 'casual',
      mood: 'romantic',
      items: ['Vestido midi floral', 'Sandalias trenzadas', 'Bolso rafia'],
      colors: ['#FFB6C1', '#F5DEB3', '#DEB887'],
      rating: 4.8,
      views: 5230,
      match: 89,
    },
    {
      id: 8,
      name: 'Street Cred',
      occasion: 'casual',
      mood: 'bold',
      items: ['Hoodie oversized', 'Joggers cargo', 'Air Force 1'],
      colors: ['#2C2C2C', '#4A5568', '#FFFFFF'],
      rating: 4.7,
      views: 4120,
      match: 93,
    },
  ]

  const filteredLooks = looks.filter(look => {
    const matchesOccasion = activeOccasion === 'all' || look.occasion === activeOccasion
    const matchesMood = activeMood === 'all' || look.mood === activeMood
    return matchesOccasion && matchesMood
  })

  const toggleLike = (id) => {
    setLikedLooks(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-950 via-orange-900/50 to-tryonyou-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles size={18} className="text-amber-400" />
              <span className="text-amber-300 font-semibold">Escaparate Inteligente</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              Showroom
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Looks listos para usar, seleccionados por nuestra IA según estilo, ocasión y estado de ánimo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-tryonyou-smoke/30 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Occasion Filter */}
            <div>
              <div className="text-sm text-white/60 mb-2 flex items-center gap-2">
                <Filter size={14} />
                Ocasión
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {occasions.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setActiveOccasion(occ.id)}
                    className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                      activeOccasion === occ.id
                        ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                        : 'glass text-white/70 hover:text-white'
                    }`}
                  >
                    <occ.icon size={16} />
                    {occ.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Filter */}
            <div>
              <div className="text-sm text-white/60 mb-2">Estado de ánimo</div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setActiveMood(mood.id)}
                    className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                      activeMood === mood.id
                        ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                        : 'glass text-white/70 hover:text-white'
                    }`}
                  >
                    <span>{mood.emoji}</span>
                    {mood.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Looks Grid */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">
                {filteredLooks.length} looks encontrados
              </h2>
              <p className="text-white/60">Personalizados para ti</p>
            </div>
            
            {likedLooks.length > 0 && (
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <Heart size={18} className="text-rose-500 fill-rose-500" />
                <span className="font-semibold">{likedLooks.length} favoritos</span>
              </div>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredLooks.map((look, index) => (
                <motion.div
                  key={look.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="card h-full hover:scale-[1.02] transition-all duration-300 flex flex-col">
                    {/* Color Preview */}
                    <div className="relative mb-4">
                      <div className="flex h-40 rounded-xl overflow-hidden">
                        {look.colors.map((color, i) => (
                          <div
                            key={i}
                            className="flex-1 transition-all group-hover:flex-[1.2]"
                            style={{ 
                              backgroundColor: color,
                              transitionDelay: `${i * 50}ms`
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Match Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                        <Zap size={12} className="text-amber-400" />
                        <span className="text-amber-400 text-xs font-bold">{look.match}% match</span>
                      </div>
                      
                      {/* Actions */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => toggleLike(look.id)}
                          className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                            likedLooks.includes(look.id)
                              ? 'bg-rose-500/80 text-white'
                              : 'bg-black/40 text-white/80 hover:bg-black/60'
                          }`}
                        >
                          <Heart size={16} className={likedLooks.includes(look.id) ? 'fill-white' : ''} />
                        </button>
                      </div>
                      
                      {/* View Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                        <button className="btn-primary text-sm">
                          <Eye size={16} className="mr-2" />
                          Ver look
                        </button>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold group-hover:text-amber-400 transition-colors">
                          {look.name}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star size={14} className="fill-yellow-400" />
                          <span className="text-sm">{look.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1 mb-4 flex-1">
                        {look.items.map((item, i) => (
                          <div key={i} className="flex items-center text-sm text-white/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2" />
                            {item}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-4 text-xs text-white/50">
                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {look.views.toLocaleString()}
                          </span>
                          <span className="capitalize">{occasions.find(o => o.id === look.occasion)?.name}</span>
                        </div>
                        <button className="text-amber-400 hover:text-amber-300 transition-colors">
                          <ShoppingBag size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredLooks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Sparkles size={64} className="text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No hay looks para esta combinación</h3>
              <p className="text-white/60 mb-6">Prueba cambiando los filtros</p>
              <button 
                onClick={() => { setActiveOccasion('all'); setActiveMood('all'); }}
                className="btn-metallic"
              >
                Ver todos los looks
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="section-container bg-gradient-to-br from-amber-900/30 to-orange-900/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-lg mb-6 gradient-text">
            ¿Quieres looks personalizados?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Crea tu avatar y recibe recomendaciones perfectas para tu estilo
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/my-avatar" className="btn-primary text-lg px-8 py-4">
              Crear mi Avatar
              <ArrowRight className="inline ml-2" size={20} />
            </a>
            <a href="/wardrobe" className="btn-metallic text-lg px-8 py-4">
              Ver mi Armario
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Showroom

