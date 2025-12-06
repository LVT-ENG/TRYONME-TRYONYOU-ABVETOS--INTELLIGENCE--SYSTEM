import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Filter, Heart, ShoppingBag, Eye, ArrowRight, Star, Zap, Sun, Moon, Briefcase, PartyPopper, Plane, X, FileText } from 'lucide-react'
import { getImageWithFallback } from '../utils/assets'
import LookSheet from '../components/demo/LookSheet'
import texts from '../data/texts.json'

const Showroom = () => {
  const [activeOccasion, setActiveOccasion] = useState('all')
  const [activeMood, setActiveMood] = useState('all')
  const [likedLooks, setLikedLooks] = useState([])
  const [selectedLook, setSelectedLook] = useState(null)
  const [showLookSheet, setShowLookSheet] = useState(false)

  const occasions = [
    { id: 'all', name: 'All', icon: Sparkles },
    { id: 'work', name: 'Work', icon: Briefcase },
    { id: 'casual', name: 'Casual', icon: Sun },
    { id: 'night', name: 'Night', icon: Moon },
    { id: 'party', name: 'Party', icon: PartyPopper },
    { id: 'travel', name: 'Travel', icon: Plane },
  ]

  const moods = [
    { id: 'all', name: 'All', emoji: '✨' },
    { id: 'confident', name: 'Confident', emoji: '💪' },
    { id: 'relaxed', name: 'Relaxed', emoji: '😌' },
    { id: 'romantic', name: 'Romantic', emoji: '💕' },
    { id: 'bold', name: 'Bold', emoji: '🔥' },
    { id: 'minimal', name: 'Minimalist', emoji: '⬜' },
  ]

  const looks = [
    {
      id: 1,
      name: texts.showroom.looks.casual_elegance.name,
      occasion: 'casual',
      mood: 'relaxed',
      items: texts.showroom.looks.casual_elegance.items,
      colors: ['#ffffff', '#4682B4', '#F5F5F5'],
      rating: 4.9,
      views: 2340,
      match: 96,
      image: 'showroom-power-meeting.jpg',
    },
    {
      id: 2,
      name: texts.showroom.looks.business_professional.name,
      occasion: 'work',
      mood: 'confident',
      items: texts.showroom.looks.business_professional.items,
      colors: ['#1a1a1a', '#ffffff', '#2d3436'],
      rating: 4.8,
      views: 1980,
      match: 94,
      image: 'showroom-business.jpg',
    },
    {
      id: 3,
      name: texts.showroom.looks.evening_glamour.name,
      occasion: 'night',
      mood: 'romantic',
      items: texts.showroom.looks.evening_glamour.items,
      colors: ['#1a1a1a', '#C9A86C', '#8B5A7D'],
      rating: 4.9,
      views: 4560,
      match: 92,
      image: 'showroom-evening.jpg',
    },
    {
      id: 4,
      name: 'Festival Ready',
      occasion: 'party',
      mood: 'bold',
      items: ['Sequins top', 'Cargo pants', 'Platform boots'],
      colors: ['#FFD700', '#2F4F4F', '#1C1C1C'],
      rating: 4.7,
      views: 2890,
      match: 88,
      image: 'showroom-festival.jpg',
    },
    {
      id: 5,
      name: 'City Explorer',
      occasion: 'travel',
      mood: 'relaxed',
      items: ['Trench coat', 'Turtleneck sweater', 'Wide leg pants'],
      colors: ['#C4A77D', '#2C3E50', '#BDC3C7'],
      rating: 4.8,
      views: 1980,
      match: 91,
      image: 'showroom-city-explorer.jpg',
    },
    {
      id: 6,
      name: 'Clean Slate',
      occasion: 'work',
      mood: 'minimal',
      items: ['Poplin shirt', 'Straight pants', 'Loafers'],
      colors: ['#FFFFFF', '#1a1a1a', '#8B7355'],
      rating: 4.9,
      views: 3450,
      match: 95,
      image: 'showroom-clean-slate.jpg',
    },
    {
      id: 7,
      name: 'Summer Sunset',
      occasion: 'casual',
      mood: 'romantic',
      items: ['Floral midi dress', 'Braided sandals', 'Raffia bag'],
      colors: ['#FFB6C1', '#F5DEB3', '#DEB887'],
      rating: 4.8,
      views: 5230,
      match: 89,
      image: 'showroom-summer-sunset.jpg',
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
      image: 'showroom-street-cred.jpg',
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
              <span className="text-amber-300 font-semibold">Smart Showroom</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              {texts.showroom.title}
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              {texts.showroom.promo.description}
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
                Occasion
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
              <div className="text-sm text-white/60 mb-2">Mood</div>
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
                {filteredLooks.length} looks found
              </h2>
              <p className="text-white/60">Personalized for you</p>
            </div>
            
            {likedLooks.length > 0 && (
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <Heart size={18} className="text-rose-500 fill-rose-500" />
                <span className="font-semibold">{likedLooks.length} favorites</span>
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
                    {/* Image Preview */}
                    <div className="relative mb-4">
                      <div className="h-64 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 relative">
                        {look.image ? (
                          <img 
                            src={getImageWithFallback(look.image, 'wardrobe')} 
                            alt={look.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        {/* Fallback: Color Swatches */}
                        <div className="absolute inset-0 flex" style={{ display: look.image ? 'none' : 'flex' }}>
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
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl gap-2">
                        <button 
                          onClick={() => {
                            setSelectedLook(look)
                            setShowLookSheet(true)
                          }}
                          className="btn-primary text-sm"
                        >
                          <Eye size={16} className="mr-2" />
                          View Look
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedLook(look)
                            setShowLookSheet(true)
                          }}
                          className="glass px-3 py-2 rounded-lg text-sm hover:bg-white/10"
                        >
                          <FileText size={16} />
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
              <h3 className="text-xl font-bold mb-2">No looks found for this combination</h3>
              <p className="text-white/60 mb-6">Try changing the filters</p>
              <button 
                onClick={() => { setActiveOccasion('all'); setActiveMood('all'); }}
                className="btn-metallic"
              >
                View All Looks
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
            Want personalized looks?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Create your avatar and receive perfect recommendations for your style
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/my-avatar" className="btn-primary text-lg px-8 py-4">
              Create My Avatar
              <ArrowRight className="inline ml-2" size={20} />
            </a>
            <a href="/wardrobe" className="btn-metallic text-lg px-8 py-4">
              View My Wardrobe
            </a>
          </div>
        </motion.div>
      </section>

      {/* Look Sheet Modal */}
      <AnimatePresence>
        {showLookSheet && selectedLook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLookSheet(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedLook.name}</h2>
                <button 
                  onClick={() => setShowLookSheet(false)}
                  className="p-2 glass rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
              <LookSheet 
                lookData={{
                  name: selectedLook.name,
                  garments: selectedLook.items.map((item, i) => ({
                    name: item.split(':')[0] || item,
                    composition: item.split(':')[1]?.trim() || 'Premium quality',
                    tag: selectedLook.occasion === 'work' ? 'Professional' : selectedLook.occasion === 'party' ? 'Bold' : 'Comfort Fit'
                  })),
                  recommended: {
                    bodyType: '🍈 Melon',
                    skinTone: 'Medium to Dark',
                    event: occasions.find(o => o.id === selectedLook.occasion)?.name || 'Any',
                    season: 'All Seasons',
                  },
                  emotionalTags: [
                    moods.find(m => m.id === selectedLook.mood)?.emoji + ' ' + moods.find(m => m.id === selectedLook.mood)?.name || '✨ Confident'
                  ],
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Showroom

