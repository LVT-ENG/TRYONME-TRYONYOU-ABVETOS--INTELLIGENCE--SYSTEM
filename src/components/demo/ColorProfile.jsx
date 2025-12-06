import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Palette, Camera } from 'lucide-react'

const ColorProfile = ({ data, onNext, onBack, canGoBack }) => {
  const [formData, setFormData] = useState({
    skinTone: data?.colorProfile?.skinTone || '',
    hairColor: data?.colorProfile?.hairColor || '',
    eyeColor: data?.colorProfile?.eyeColor || '',
    selfie: null,
  })

  const skinTones = [
    { value: 'fair', label: 'Fair' },
    { value: 'light', label: 'Light' },
    { value: 'medium', label: 'Medium' },
    { value: 'tan', label: 'Tan' },
    { value: 'dark', label: 'Dark' },
  ]

  const hairColors = [
    { value: 'blonde', label: 'Blonde' },
    { value: 'brown', label: 'Brown' },
    { value: 'black', label: 'Black' },
    { value: 'red', label: 'Red' },
    { value: 'grey', label: 'Grey / White' },
  ]

  const eyeColors = [
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'hazel', label: 'Hazel' },
    { value: 'brown', label: 'Brown' },
    { value: 'black', label: 'Black' },
  ]

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, selfie: file })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.skinTone && formData.hairColor && formData.eyeColor) {
      onNext(formData)
    }
  }

  const isComplete = formData.skinTone && formData.hairColor && formData.eyeColor

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h2 className="heading-md mb-2 gradient-text">Your Color Profile</h2>
      <p className="text-white/60 mb-6">Help us understand your coloring</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Palette size={16} className="text-tryonyou-blue" />
            Skin Tone
          </label>
          <select
            value={formData.skinTone}
            onChange={(e) => setFormData({ ...formData, skinTone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-tryonyou-blue bg-transparent text-white"
            required
          >
            <option value="">Select...</option>
            {skinTones.map((tone) => (
              <option key={tone.value} value={tone.value} className="bg-tryonyou-black">
                {tone.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Hair Color</label>
          <select
            value={formData.hairColor}
            onChange={(e) => setFormData({ ...formData, hairColor: e.target.value })}
            className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-tryonyou-blue bg-transparent text-white"
            required
          >
            <option value="">Select...</option>
            {hairColors.map((color) => (
              <option key={color.value} value={color.value} className="bg-tryonyou-black">
                {color.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Eye Color</label>
          <select
            value={formData.eyeColor}
            onChange={(e) => setFormData({ ...formData, eyeColor: e.target.value })}
            className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-tryonyou-blue bg-transparent text-white"
            required
          >
            <option value="">Select...</option>
            {eyeColors.map((color) => (
              <option key={color.value} value={color.value} className="bg-tryonyou-black">
                {color.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Camera size={16} className="text-tryonyou-blue" />
            Upload Selfie (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-tryonyou-blue bg-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-tryonyou-blue file:text-white hover:file:bg-amparo-light"
          />
          {formData.selfie && (
            <p className="text-sm text-green-400 mt-2">✓ {formData.selfie.name}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          {canGoBack && (
            <button
              type="button"
              onClick={onBack}
              className="btn-metallic flex-1 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={!isComplete}
            className={`flex-1 btn-primary flex items-center justify-center gap-2 ${
              !isComplete ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default ColorProfile

