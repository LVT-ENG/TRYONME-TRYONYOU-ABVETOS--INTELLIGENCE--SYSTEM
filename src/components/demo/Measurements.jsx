import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Ruler } from 'lucide-react'

const Measurements = ({ data, onNext, onBack, canGoBack }) => {
  const [formData, setFormData] = useState({
    height: data?.measurements?.height || '',
    shoulders: data?.measurements?.shoulders || '',
    armLength: data?.measurements?.armLength || '',
    bust: data?.measurements?.bust || '',
    waist: data?.measurements?.waist || '',
    hips: data?.measurements?.hips || '',
    torso: data?.measurements?.torso || '',
    legs: data?.measurements?.legs || '',
    inseam: data?.measurements?.inseam || '',
    shoeSize: data?.measurements?.shoeSize || '',
    footWidth: data?.measurements?.footWidth || '',
  })

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // At least height and a few key measurements should be required
    if (formData.height && formData.waist && formData.bust) {
      onNext(formData)
    }
  }

  const isComplete = formData.height && formData.waist && formData.bust

  const measurementFields = [
    { id: 'height', label: 'Height (cm)', required: true },
    { id: 'shoulders', label: 'Shoulder Width (cm)', required: false },
    { id: 'armLength', label: 'Arm Length (cm)', required: false },
    { id: 'bust', label: 'Bust / Chest (cm)', required: true },
    { id: 'waist', label: 'Waist (cm)', required: true },
    { id: 'hips', label: 'Hips (cm)', required: false },
    { id: 'torso', label: 'Torso Length (cm)', required: false },
    { id: 'legs', label: 'Leg Length (cm)', required: false },
    { id: 'inseam', label: 'Inseam (cm)', required: false },
    { id: 'shoeSize', label: 'Shoe Size (EU)', required: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h2 className="heading-md mb-2 gradient-text">Your Measurements</h2>
      <p className="text-white/60 mb-6">Enter your body measurements for accurate fitting</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {measurementFields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Ruler size={14} className="text-tryonyou-blue" />
                {field.label}
                {field.required && <span className="text-red-400">*</span>}
              </label>
              <input
                type="number"
                value={formData[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-tryonyou-blue bg-transparent text-white placeholder-white/40"
                placeholder="0"
                required={field.required}
                min="0"
                step="0.1"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Foot Width</label>
          <select
            value={formData.footWidth}
            onChange={(e) => handleChange('footWidth', e.target.value)}
            className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-tryonyou-blue bg-transparent text-white"
          >
            <option value="">Select...</option>
            <option value="narrow" className="bg-tryonyou-black">Narrow</option>
            <option value="regular" className="bg-tryonyou-black">Regular</option>
            <option value="wide" className="bg-tryonyou-black">Wide</option>
          </select>
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
            Generate Avatar
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default Measurements

