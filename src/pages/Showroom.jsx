import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Filter, Heart, ShoppingBag, Eye, ArrowRight, Star, Zap, Sun, Moon, Briefcase, PartyPopper, Plane, X, FileText } from 'lucide-react'
import { getImageWithFallback, getRandomImagePath } from '../utils/assets'
import { useTheme } from '../context/ThemeContext'
import LookSheet from '../components/demo/LookSheet'
import texts from '../data/texts.json'

const Showroom = () => {
  const { isDark } = useTheme()
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
    <div className="min-h-screen page-bg">
      {/* Hero Section */}
      <section className="hero-showroom relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getImageWithFallback('showroom-bg.jpg', 'wardrobe')} 
            alt="Showroom"
            className={`object-cover w-full h-full ${isDark ? 'opacity-30' : 'opacity-20'}`}
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-b from-tryonyou-black/80 via-tryonyou-black/60 to-tryonyou-black' 
              : 'bg-gradient-to-b from-white/60 via-white/40 to-[#FAFAFA]'
          }`}></div>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 text-center section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass">
              <Sparkles size={18} className={isDark ? 'text-amber-400' : 'text-amber-500'} />
              <span className={`font-semibold ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>Smart Showroom</span>
            </div>
            
            <h1 className="mb-6 heading-xl gradient-text">
              {texts.showroom.title}
            </h1>
            
            <p className={`text-xl max-w-3xl mx-auto mb-8 ${isDark ? 'text-white/80' : 'text-anthracite/80'}`}>
              {texts.showroom.promo.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className={`py-8 sticky top-20 z-30 transition-colors duration-300 ${
        isDark ? 'bg-tryonyou-smoke/30' : 'bg-gray-100'
      }`}>
        <div className="px-4 mx-auto max-w-7xl">
          <div className="flex flex-col gap-4">
            {/* Occasion Filter */}
            <div>
              <div className={`text-sm mb-2 flex items-center gap-2 ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>
                <Filter size={14} />
                Occasion
              </div>
              <div className="flex gap-2 pb-2 overflow-x-auto">
                {occasions.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setActiveOccasion(occ.id)}
                    className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                      activeOccasion === occ.id
                        ? isDark 
                          ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' 
                          : 'bg-amber-500/20 text-amber-700 border border-amber-500/50'
                        : isDark 
                          ? 'glass text-white/70 hover:text-white' 
                          : 'bg-white text-anthracite/70 hover:text-anthracite border border-gray-200'
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
              <div className={`text-sm mb-2 ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>Mood</div>
              <div className="flex gap-2 pb-2 overflow-x-auto">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setActiveMood(mood.id)}
                    className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                      activeMood === mood.id
                        ? isDark 
                          ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' 
                          : 'bg-amber-500/20 text-amber-700 border border-amber-500/50'
                        : isDark 
                          ? 'glass text-white/70 hover:text-white' 
                          : 'bg-white text-anthracite/70 hover:text-anthracite border border-gray-200'
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
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-anthracite'}`}>
                {filteredLooks.length} looks found
              </h2>
              <p className={isDark ? 'text-white/60' : 'text-anthracite/60'}>Personalized for you</p>
            </div>
            
            {likedLooks.length > 0 && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                isDark ? 'glass' : 'bg-white border border-gray-200'
              }`}>
                <Heart size={18} className="text-rose-500 fill-rose-500" />
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-anthracite'}`}>{likedLooks.length} favorites</span>
              </div>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
                      <div className="relative h-64 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
                        {look.image ? (
                          <img 
                            src={getImageWithFallback(look.image, 'wardrobe')} 
                            alt={look.name}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              // Try fallback with random image
                              e.target.src = getRandomImagePath()
                              e.target.onerror = () => {
                                e.target.style.display = 'none'
                                if (e.target.nextSibling) {
                                  e.target.nextSibling.style.display = 'flex'
                                }
                              }
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
                      <div className="absolute flex items-center gap-1 px-2 py-1 rounded-full top-3 left-3 bg-black/60 backdrop-blur-sm">
                        <Zap size={12} className="text-amber-400" />
                        <span className="text-xs font-bold text-amber-400">{look.match}% match</span>
                      </div>
                      
                      {/* Actions */}
                      <div className="absolute flex gap-2 top-3 right-3">
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
                      <div className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity opacity-0 bg-black/60 group-hover:opacity-100 rounded-xl">
                        <button 
                          onClick={() => {
                            setSelectedLook(look)
                            setShowLookSheet(true)
                          }}
                          className="text-sm btn-primary"
                        >
                          <Eye size={16} className="mr-2" />
                          View Look
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedLook(look)
                            setShowLookSheet(true)
                          }}
                          className="px-3 py-2 text-sm rounded-lg glass hover:bg-white/10"
                        >
                          <FileText size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-lg font-bold transition-colors ${
                          isDark ? 'group-hover:text-amber-400' : 'group-hover:text-amber-600'
                        }`}>
                          {look.name}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star size={14} className="fill-yellow-400" />
                          <span className="text-sm">{look.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 mb-4 space-y-1">
                        {look.items.map((item, i) => (
                          <div key={i} className={`flex items-center text-sm ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${isDark ? 'bg-amber-400' : 'bg-amber-500'}`} />
                            {item}
                          </div>
                        ))}
                      </div>
                      
                      <div className={`flex items-center justify-between pt-3 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                        <div className={`flex items-center gap-4 text-xs ${isDark ? 'text-white/50' : 'text-anthracite/50'}`}>
                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {look.views.toLocaleString()}
                          </span>
                          <span className="capitalize">{occasions.find(o => o.id === look.occasion)?.name}</span>
                        </div>
                        <button className={`transition-colors ${isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-500 hover:text-amber-600'}`}>
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
              className="py-16 text-center"
            >
              <Sparkles size={64} className={`mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-anthracite/20'}`} />
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-anthracite'}`}>No looks found for this combination</h3>
              <p className={`mb-6 ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>Try changing the filters</p>
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
      <section className={`section-container ${
        isDark ? 'bg-gradient-to-br from-amber-900/30 to-orange-900/20' : 'bg-gradient-to-br from-amber-100/50 to-orange-100/30'
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="mb-6 heading-lg gradient-text">
            Want personalized looks?
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-white/80' : 'text-anthracite/80'}`}>
            Create your avatar and receive perfect recommendations for your style
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/my-avatar" className="px-8 py-4 text-lg btn-primary">
              Create My Avatar
              <ArrowRight className="inline ml-2" size={20} />
            </a>
            <a href="/wardrobe" className="px-8 py-4 text-lg btn-metallic">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowLookSheet(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-anthracite'}`}>{selectedLook.name}</h2>
                <button 
                  onClick={() => setShowLookSheet(false)}
                  className={`p-2 rounded-lg ${isDark ? 'glass hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}
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

