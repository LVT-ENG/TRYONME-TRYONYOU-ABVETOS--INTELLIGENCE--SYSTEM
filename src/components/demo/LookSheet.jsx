import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Tag, Users, Calendar } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import texts from '../../data/texts.json'

const LookSheet = ({ lookData }) => {
  const { isDark } = useTheme()
  const defaultLook = {
    name: 'Cubist Flow Edition',
    garments: [
      { name: 'Jacket', composition: '65% organic cotton, 30% recycled polyester, 5% elastane', tag: 'Comfort Fit' },
      { name: 'Pants', composition: '50% lyocell, 30% linen, 20% viscose', tag: 'Breathe Easy' },
      { name: 'Shoes', composition: 'Vegan leather, rubber sole', tag: 'Sustainable' },
      { name: 'Accessories', composition: 'Gold-plated brass', tag: 'Handmade' },
    ],
    recommended: {
      bodyType: '🍈 Melon',
      skinTone: 'Medium to Dark',
      event: 'Art Opening, Intimate Dinner',
      season: 'Spring – Autumn',
    },
    emotionalTags: ['🌿 Grounded', '🎭 Elegant Drama', '🌀 Subtle Power'],
  }

  const look = lookData || defaultLook

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-3xl mx-auto"
    >
      <h2 className="heading-md mb-2 gradient-text">
        {texts.look_sheet.title}: {look.name}
      </h2>

      {/* Garment Composition */}
      <div className="mb-6">
        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-anthracite'}`}>
          <Tag size={20} className={isDark ? 'text-tryonyou-blue' : 'text-tryonyou-gold'} />
          {texts.look_sheet.garment_composition}
        </h3>
        <ul className="space-y-3">
          {look.garments.map((garment, i) => (
            <li key={i} className={`flex items-start justify-between glass p-3 rounded-lg ${isDark ? '' : 'bg-gray-50'}`}>
              <div>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-anthracite'}`}>{garment.name}:</span>
                <span className={`ml-2 ${isDark ? 'text-white/70' : 'text-anthracite/70'}`}>{garment.composition}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
                isDark ? 'bg-tryonyou-blue/20 text-tryonyou-blue' : 'bg-tryonyou-gold/20 text-tryonyou-gold'
              }`}>
                {garment.tag}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended For */}
      <div className="mb-6">
        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-anthracite'}`}>
          <Users size={20} className={isDark ? 'text-tryonyou-blue' : 'text-tryonyou-gold'} />
          {texts.look_sheet.recommended_for}
        </h3>
        <ul className={`space-y-2 glass p-4 rounded-lg ${isDark ? '' : 'bg-gray-50'}`}>
          <li className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-anthracite'}`}>
            <span className="text-2xl">{look.recommended.bodyType.split(' ')[0]}</span>
            <span>Body Type: <strong>{look.recommended.bodyType}</strong></span>
          </li>
          <li className={isDark ? 'text-white' : 'text-anthracite'}>Skin Tone: <strong>{look.recommended.skinTone}</strong></li>
          <li className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-anthracite'}`}>
            <Calendar size={16} className={isDark ? 'text-tryonyou-blue' : 'text-tryonyou-gold'} />
            <span>Event: <strong>{look.recommended.event}</strong></span>
          </li>
          <li className={isDark ? 'text-white' : 'text-anthracite'}>Season: <strong>{look.recommended.season}</strong></li>
        </ul>
      </div>

      {/* Emotional Tags */}
      <div>
        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-anthracite'}`}>
          <Sparkles size={20} className={isDark ? 'text-tryonyou-blue' : 'text-tryonyou-gold'} />
          {texts.look_sheet.emotional_tags}
        </h3>
        <div className="flex flex-wrap gap-2">
          {look.emotionalTags.map((tag, i) => (
            <span
              key={i}
              className={`px-4 py-2 rounded-full glass text-sm transition-colors ${
                isDark 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-anthracite hover:bg-gray-100'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default LookSheet

