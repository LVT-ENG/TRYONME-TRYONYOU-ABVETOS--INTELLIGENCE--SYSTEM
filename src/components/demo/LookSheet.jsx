import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Tag, Users, Calendar } from 'lucide-react'
import texts from '../../data/texts.json'

const LookSheet = ({ lookData }) => {
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
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Tag size={20} className="text-tryonyou-blue" />
          {texts.look_sheet.garment_composition}
        </h3>
        <ul className="space-y-3">
          {look.garments.map((garment, i) => (
            <li key={i} className="flex items-start justify-between glass p-3 rounded-lg">
              <div>
                <span className="font-semibold">{garment.name}:</span>
                <span className="text-white/70 ml-2">{garment.composition}</span>
              </div>
              <span className="px-2 py-1 rounded-full bg-tryonyou-blue/20 text-tryonyou-blue text-xs font-medium whitespace-nowrap ml-2">
                {garment.tag}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended For */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Users size={20} className="text-tryonyou-blue" />
          {texts.look_sheet.recommended_for}
        </h3>
        <ul className="space-y-2 glass p-4 rounded-lg">
          <li className="flex items-center gap-2">
            <span className="text-2xl">{look.recommended.bodyType.split(' ')[0]}</span>
            <span>Body Type: <strong>{look.recommended.bodyType}</strong></span>
          </li>
          <li>Skin Tone: <strong>{look.recommended.skinTone}</strong></li>
          <li className="flex items-center gap-2">
            <Calendar size={16} className="text-tryonyou-blue" />
            <span>Event: <strong>{look.recommended.event}</strong></span>
          </li>
          <li>Season: <strong>{look.recommended.season}</strong></li>
        </ul>
      </div>

      {/* Emotional Tags */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-tryonyou-blue" />
          {texts.look_sheet.emotional_tags}
        </h3>
        <div className="flex flex-wrap gap-2">
          {look.emotionalTags.map((tag, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-colors"
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

