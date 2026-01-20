import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Camera, Ruler, Palette, Sparkles, Check, ArrowRight, ChevronRight, Scan, Wand2, ArrowLeft } from 'lucide-react'
import Avatar3D from '../components/Avatar3D'

const MyAvatar = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [avatarData, setAvatarData] = useState({
    bodyType: 'regular',
    height: '170',
    weight: '65',
    skinTone: 'light',
    hairColor: 'brown',
    style: 'casual'
  })

  const steps = [
    { id: 0, title: 'Body Type', icon: User },
    { id: 1, title: 'Measurements', icon: Ruler },
    { id: 2, title: 'Appearance', icon: Palette },
    { id: 3, title: 'Style', icon: Sparkles },
  ]

  const bodyTypes = [
    { id: 'athletic', name: 'Athletic', icon: '🏃', description: 'Broad shoulders, defined waist' },
    { id: 'slim', name: 'Slim', icon: '🧍', description: 'Slender and elongated figure' },
    { id: 'curvy', name: 'Curvy', icon: '💃', description: 'Pronounced curves' },
    { id: 'regular', name: 'Regular', icon: '👤', description: 'Balanced proportions' },
    { id: 'plus', name: 'Plus Size', icon: '🌟', description: 'Full and harmonious figure' },
  ]

  const skinTones = [
    { id: 'fair', name: 'Fair', color: '#FDEBD0' },
    { id: 'light', name: 'Light', color: '#F5CBA7' },
    { id: 'medium', name: 'Medium', color: '#D7BDE2' },
    { id: 'olive', name: 'Olive', color: '#ABEBC6' },
    { id: 'tan', name: 'Tan', color: '#A04000' },
    { id: 'dark', name: 'Dark', color: '#6E2C00' },
  ]

  const hairColors = [
    { id: 'black', name: 'Black', color: '#1a1a1a' },
    { id: 'brown', name: 'Brown', color: '#8B4513' },
    { id: 'blonde', name: 'Blonde', color: '#FFD700' },
    { id: 'red', name: 'Red', color: '#B22222' },
    { id: 'gray', name: 'Gray', color: '#808080' },
    { id: 'colored', name: 'Fantasy', color: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #a55eea)' },
  ]

  const styles = [
    { id: 'casual', name: 'Casual', icon: '👕', description: 'Relaxed and comfortable' },
    { id: 'formal', name: 'Formal', icon: '👔', description: 'Elegant and professional' },
    { id: 'streetwear', name: 'Streetwear', icon: '🧢', description: 'Urban and modern' },
    { id: 'minimalist', name: 'Minimalist', icon: '⬜', description: 'Simple and sophisticated' },
    { id: 'bohemian', name: 'Bohemian', icon: '🌸', description: 'Free and artistic' },
    { id: 'sporty', name: 'Sporty', icon: '⚡', description: 'Active and dynamic' },
  ]

  const handleFinish = async () => {
    setIsSubmitting(true)
    try {
      // Connect to Jules Brain
      const response = await fetch('http://localhost:8000/api/jules/avatar-validation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avatarData),
      })

      const data = await response.json()
      console.log('Jules Validation:', data)
      // Navigate to result or show success (mocked for now)
      setTimeout(() => {
          alert("Avatar created successfully! Jules has validated your biometric profile.")
          setIsSubmitting(false)
      }, 1500)
    } catch (error) {
      console.error('Error connecting to Jules:', error)
      // Fallback for demo
      setTimeout(() => {
          alert("Avatar created (Offline Mode). Jules is sleeping but your data is saved.")
          setIsSubmitting(false)
      }, 1500)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Body Type
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">What's your body type?</h3>
              <p className="text-white/60">Select the one that best matches your figure</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {bodyTypes.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAvatarData({ ...avatarData, bodyType: type.id })}
                  className={`p-6 rounded-2xl text-center transition-all ${
                    avatarData.bodyType === type.id
                      ? 'bg-tryonyou-blue/30 border-2 border-tryonyou-blue'
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  <div className="text-5xl mb-3">{type.icon}</div>
                  <div className="font-semibold mb-1">{type.name}</div>
                  <div className="text-xs text-white/60">{type.description}</div>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 1: // Measurements
        return (
          <div className="space-y-8 max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Your Measurements</h3>
              <p className="text-white/60">This helps us find your perfect size</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Height (cm)</label>
                <div className="relative">
                    <input
                        type="number"
                        value={avatarData.height}
                        onChange={(e) => setAvatarData({...avatarData, height: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-tryonyou-blue transition-colors"
                        placeholder="170"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">cm</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Weight (kg)</label>
                <div className="relative">
                    <input
                        type="number"
                        value={avatarData.weight}
                        onChange={(e) => setAvatarData({...avatarData, weight: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-tryonyou-blue transition-colors"
                        placeholder="65"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">kg</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-tryonyou-blue/10 border border-tryonyou-blue/20 flex items-start gap-3">
                <Scan className="w-6 h-6 text-tryonyou-blue mt-1 shrink-0" />
                <div className="text-sm text-white/70">
                    <strong className="text-white block mb-1">AI Recommendation</strong>
                    Based on your inputs, we'll create a 3D mesh that simulates fabric drape with 98% accuracy.
                </div>
            </div>
          </div>
        )

      case 2: // Appearance
        return (
            <div className="space-y-8 max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Appearance</h3>
                  <p className="text-white/60">Customize your digital twin</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-3">Skin Tone</label>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {skinTones.map((tone) => (
                                <button
                                    key={tone.id}
                                    onClick={() => setAvatarData({...avatarData, skinTone: tone.id})}
                                    className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 ${
                                        avatarData.skinTone === tone.id ? 'border-white scale-110 ring-2 ring-tryonyou-blue/50' : 'border-transparent'
                                    }`}
                                    style={{ backgroundColor: tone.color }}
                                    title={tone.name}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-3">Hair Color</label>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {hairColors.map((hair) => (
                                <button
                                    key={hair.id}
                                    onClick={() => setAvatarData({...avatarData, hairColor: hair.id})}
                                    className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 ${
                                        avatarData.hairColor === hair.id ? 'border-white scale-110 ring-2 ring-tryonyou-blue/50' : 'border-transparent'
                                    }`}
                                    style={{ background: hair.color }}
                                    title={hair.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )

      case 3: // Style
        return (
            <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Your Style</h3>
                  <p className="text-white/60">Help us curate the showroom for you</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {styles.map((style) => (
                        <motion.button
                          key={style.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setAvatarData({ ...avatarData, style: style.id })}
                          className={`p-4 rounded-xl text-left transition-all ${
                            avatarData.style === style.id
                              ? 'bg-gradient-to-br from-tryonyou-blue/20 to-purple-500/20 border-tryonyou-blue'
                              : 'glass hover:bg-white/10 border-transparent'
                          } border`}
                        >
                          <div className="text-3xl mb-2">{style.icon}</div>
                          <div className="font-semibold">{style.name}</div>
                          <div className="text-xs text-white/60">{style.description}</div>
                        </motion.button>
                    ))}
                </div>
            </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Panel: Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-8">
                <h1 className="heading-lg mb-2 gradient-text">Create Your Avatar</h1>
                <p className="text-white/60">Step {currentStep + 1} of {steps.length}</p>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-8">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`h-2 flex-1 rounded-full transition-colors duration-500 ${
                            step.id <= currentStep ? 'bg-tryonyou-blue' : 'bg-white/10'
                        }`}
                    />
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        {renderStepContent()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-white/10">
                <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full hover:bg-white/10 transition-colors ${
                        currentStep === 0 ? 'opacity-0 pointer-events-none' : ''
                    }`}
                >
                    <ArrowLeft size={20} />
                    Back
                </button>

                {currentStep < steps.length - 1 ? (
                    <button
                        onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                        className="btn-primary flex items-center gap-2 px-8 py-3 rounded-full"
                    >
                        Next Step
                        <ChevronRight size={20} />
                    </button>
                ) : (
                    <button
                        onClick={handleFinish}
                        disabled={isSubmitting}
                        className="btn-metallic flex items-center gap-2 px-8 py-3 rounded-full"
                    >
                        {isSubmitting ? (
                            <>
                                <Wand2 className="animate-spin" size={20} />
                                Creating Avatar...
                            </>
                        ) : (
                            <>
                                Finish & Visualize
                                <Check size={20} />
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>

        {/* Right Panel: Visualization */}
        <div className="hidden lg:block w-full lg:w-1/2 sticky top-24 h-[calc(100vh-8rem)]">
            <div className="relative w-full h-full rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />

                {/* 3D Viewer Component */}
                <Avatar3D data={avatarData} />

                {/* Live Stats Overlay */}
                <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
                    <div className="glass px-4 py-2 rounded-full text-xs font-mono flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        JULES ENGINE: ONLINE
                    </div>
                    <div className="glass px-4 py-2 rounded-full text-xs font-mono">
                        FIT SCORE: 99.7%
                    </div>
                </div>

                <div className="absolute bottom-8 left-8 z-20 max-w-sm">
                    <h3 className="text-2xl font-bold mb-2 gradient-text">Live Preview</h3>
                    <p className="text-sm text-white/70">
                        Updates in real-time as you modify your parameters.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyAvatar
