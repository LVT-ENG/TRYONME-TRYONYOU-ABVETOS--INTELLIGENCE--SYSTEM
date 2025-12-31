import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Pilot = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [userMeasurements, setUserMeasurements] = useState({
    height: null,
    weight: null,
    chest: null,
    waist: null,
    hips: null,
    shoulder_width: null,
    arm_length: null,
    leg_length: null,
    torso_length: null,
    occasion: null,
    category: null,
    size_preference: 'M',
  })

  const handleNavigateToScan = () => {
    navigate('/scan', { state: { measurements: userMeasurements } })
  }

  const handleNavigateToVoice = () => {
    navigate('/voice', { state: { measurements: userMeasurements } })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-widest">TRYONYOU</h1>
          <div className="text-sm text-gray-400">Pilot Entry</div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      step <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {step}
                  </motion.div>
                  {step < 3 && (
                    <div className={`flex-1 h-1 mx-2 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-700'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Body Scan</span>
              <span>Confirm Details</span>
              <span>Results</span>
            </div>
          </div>

          {/* Step 1: Introduction */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <h2 className="text-3xl font-bold mb-4">Welcome to the TRYONYOU Pilot</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  We're about to find your perfect fit using advanced body scanning and AI-powered matching. 
                  The process takes just 3 minutes and requires no login.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4">
                    <div className="text-2xl">1</div>
                    <div>
                      <h3 className="font-bold mb-1">Body Scan</h3>
                      <p className="text-gray-400">Use your phone camera to capture your body measurements</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-2xl">2</div>
                    <div>
                      <h3 className="font-bold mb-1">Confirm Details</h3>
                      <p className="text-gray-400">Answer a few quick questions about your preferences</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-2xl">3</div>
                    <div>
                      <h3 className="font-bold mb-1">Get Results</h3>
                      <p className="text-gray-400">Discover the garment that fits you best</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(2)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors shadow-lg uppercase tracking-wider"
              >
                Start Scanning
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Scan & Confirm */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <h2 className="text-3xl font-bold mb-6">Body Measurements</h2>
                
                <p className="text-gray-300 mb-6">
                  We'll capture your measurements using your phone camera. 
                  For the pilot, you can also enter them manually below.
                </p>

                <div className="space-y-4 mb-8">
                  {/* Manual Input Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'height', label: 'Height (cm)', placeholder: '170' },
                      { key: 'weight', label: 'Weight (kg)', placeholder: '70' },
                      { key: 'chest', label: 'Chest (cm)', placeholder: '96' },
                      { key: 'waist', label: 'Waist (cm)', placeholder: '86' },
                      { key: 'hips', label: 'Hips (cm)', placeholder: '100' },
                      { key: 'shoulder_width', label: 'Shoulder Width (cm)', placeholder: '42' },
                      { key: 'arm_length', label: 'Arm Length (cm)', placeholder: '62' },
                      { key: 'leg_length', label: 'Leg Length (cm)', placeholder: '84' },
                      { key: 'torso_length', label: 'Torso Length (cm)', placeholder: '66' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm text-gray-400 mb-2">{field.label}</label>
                        <input
                          type="number"
                          placeholder={field.placeholder}
                          value={userMeasurements[field.key] || ''}
                          onChange={(e) => setUserMeasurements({
                            ...userMeasurements,
                            [field.key]: e.target.value ? parseFloat(e.target.value) : null
                          })}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="font-bold text-lg">Preferences</h3>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Occasion</label>
                    <select
                      value={userMeasurements.occasion || ''}
                      onChange={(e) => setUserMeasurements({
                        ...userMeasurements,
                        occasion: e.target.value || null
                      })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select an occasion</option>
                      <option value="work">Work</option>
                      <option value="casual">Casual</option>
                      <option value="formal">Formal</option>
                      <option value="event">Event</option>
                      <option value="ceremony">Ceremony</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Size Preference</label>
                    <select
                      value={userMeasurements.size_preference}
                      onChange={(e) => setUserMeasurements({
                        ...userMeasurements,
                        size_preference: e.target.value
                      })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-colors uppercase tracking-wider"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors shadow-lg uppercase tracking-wider"
                >
                  Find My Perfect Fit
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Processing & Results */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
                <h2 className="text-3xl font-bold mb-6">Processing Your Measurements</h2>
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 border-4 border-gray-600 border-t-blue-600 rounded-full mx-auto mb-6"
                />
                
                <p className="text-gray-300 mb-8">
                  Analyzing your body proportions and comparing with our garment database...
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/result', { state: { measurements: userMeasurements } })}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors shadow-lg uppercase tracking-wider"
                >
                  View Results
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Pilot
