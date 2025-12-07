import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Globe, Users, Calendar } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const UserProfile = ({ data, onNext, onBack, canGoBack }) => {
  const { isDark } = useTheme()
  const [formData, setFormData] = useState({
    country: data?.profile?.country || '',
    ethnicity: data?.profile?.ethnicity || '',
    age: data?.profile?.age || '',
  })

  const countries = [
    { value: 'france', label: 'France' },
    { value: 'spain', label: 'Spain' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'germany', label: 'Germany' },
    { value: 'italy', label: 'Italy' },
    { value: 'other', label: 'Other' },
  ]

  const ethnicities = [
    { value: 'european', label: 'European' },
    { value: 'african', label: 'African' },
    { value: 'asian', label: 'Asian' },
    { value: 'latin', label: 'Latin American' },
    { value: 'middle-eastern', label: 'Middle Eastern' },
    { value: 'mixed', label: 'Mixed / Other' },
  ]

  const ageRanges = [
    { value: 'kid', label: 'Kid (0-12)' },
    { value: 'teen', label: 'Teen (13-17)' },
    { value: 'adult', label: 'Adult (18-64)' },
    { value: 'senior', label: 'Senior (65+)' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.country && formData.ethnicity && formData.age) {
      onNext(formData)
    }
  }

  const isComplete = formData.country && formData.ethnicity && formData.age

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h2 className="heading-md mb-2 gradient-text">Your Profile</h2>
      <p className={`mb-6 ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>Tell us about yourself</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={`text-sm font-medium mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-anthracite'}`}>
            <Globe size={16} className={isDark ? 'text-tryonyou-blue' : 'text-tryonyou-gold'} />
            Country / Region
          </label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 ${
              isDark 
                ? 'bg-white/5 border-white/10 text-white focus:ring-tryonyou-blue' 
                : 'bg-white border-gray-200 text-anthracite focus:ring-tryonyou-gold'
            }`}
            required
          >
            <option value="">Select...</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value} className={isDark ? 'bg-tryonyou-black' : 'bg-white'}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`text-sm font-medium mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-anthracite'}`}>
            <Users size={16} className={isDark ? 'text-tryonyou-blue' : 'text-tryonyou-gold'} />
            Ethnic Group
          </label>
          <select
            value={formData.ethnicity}
            onChange={(e) => setFormData({ ...formData, ethnicity: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 ${
              isDark 
                ? 'bg-white/5 border-white/10 text-white focus:ring-tryonyou-blue' 
                : 'bg-white border-gray-200 text-anthracite focus:ring-tryonyou-gold'
            }`}
            required
          >
            <option value="">Select...</option>
            {ethnicities.map((ethnicity) => (
              <option key={ethnicity.value} value={ethnicity.value} className={isDark ? 'bg-tryonyou-black' : 'bg-white'}>
                {ethnicity.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`text-sm font-medium mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-anthracite'}`}>
            <Calendar size={16} className={isDark ? 'text-tryonyou-blue' : 'text-tryonyou-gold'} />
            Age Range
          </label>
          <select
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 ${
              isDark 
                ? 'bg-white/5 border-white/10 text-white focus:ring-tryonyou-blue' 
                : 'bg-white border-gray-200 text-anthracite focus:ring-tryonyou-gold'
            }`}
            required
          >
            <option value="">Select...</option>
            {ageRanges.map((age) => (
              <option key={age.value} value={age.value} className={isDark ? 'bg-tryonyou-black' : 'bg-white'}>
                {age.label}
              </option>
            ))}
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
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default UserProfile

