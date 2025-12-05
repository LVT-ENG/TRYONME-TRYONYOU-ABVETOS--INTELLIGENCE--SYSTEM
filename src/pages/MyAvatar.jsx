import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Camera, Ruler, Palette, Sparkles, Check, ArrowRight, ChevronRight, Scan, Wand2 } from 'lucide-react'

const MyAvatar = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [avatarData, setAvatarData] = useState({
    bodyType: '',
    height: '',
    skinTone: '',
    hairColor: '',
    style: ''
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
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
      
      case 1:
        return (
          <div className="space-y-8 max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Your Measurements</h3>
              <p className="text-white/60">This helps us find your perfect size</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Height (cm)</label>
                <input
                  type="number"
                  placeholder="170"
                  value={avatarData.height}
                  onChange={(e) => setAvatarData({ ...avatarData, height: e.target.value })}
                  className="w-full px-4 py-4 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-tryonyou-blue bg-transparent text-xl text-center"
                />
              </div>
              
              <div className="card bg-gradient-to-br from-violet-500/10 to-purple-500/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <Scan size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">3D Scan</h4>
                    <p className="text-sm text-white/60">Precise measurements with your camera</p>
                  </div>
                </div>
                <button className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Camera size={20} />
                  Start Scan
                </button>
              </div>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Your Appearance</h3>
              <p className="text-white/60">Customize your avatar details</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Palette size={18} />
                  Skin Tone
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {skinTones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setAvatarData({ ...avatarData, skinTone: tone.id })}
                      className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                        avatarData.skinTone === tone.id
                          ? 'ring-2 ring-tryonyou-blue scale-105'
                          : 'glass hover:scale-102'
                      }`}
                    >
                      <div 
                        className="w-12 h-12 rounded-full shadow-inner"
                        style={{ backgroundColor: tone.color }}
                      />
                      <span className="text-xs">{tone.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles size={18} />
                  Hair Color
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {hairColors.map((hair) => (
                    <button
                      key={hair.id}
                      onClick={() => setAvatarData({ ...avatarData, hairColor: hair.id })}
                      className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                        avatarData.hairColor === hair.id
                          ? 'ring-2 ring-tryonyou-blue scale-105'
                          : 'glass hover:scale-102'
                      }`}
                    >
                      <div 
                        className="w-12 h-12 rounded-full shadow-inner"
                        style={{ background: hair.color }}
                      />
                      <span className="text-xs">{hair.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Your Personal Style</h3>
              <p className="text-white/60">This helps us recommend perfect outfits for you</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {styles.map((style) => (
                <motion.button
                  key={style.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAvatarData({ ...avatarData, style: style.id })}
                  className={`p-6 rounded-2xl text-center transition-all ${
                    avatarData.style === style.id
                      ? 'bg-tryonyou-blue/30 border-2 border-tryonyou-blue'
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  <div className="text-4xl mb-3">{style.icon}</div>
                  <div className="font-semibold mb-1">{style.name}</div>
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-950 via-purple-900/50 to-tryonyou-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <User size={18} className="text-violet-400" />
              <span className="text-violet-300 font-semibold">Your Digital Twin</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              My Avatar
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Create your personalized avatar to try on clothes virtually with perfect precision
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-tryonyou-smoke/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex flex-col items-center gap-2 transition-all ${
                    currentStep >= step.id ? 'opacity-100' : 'opacity-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep === step.id
                      ? 'bg-tryonyou-blue glow-blue'
                      : currentStep > step.id
                      ? 'bg-green-500'
                      : 'glass'
                  }`}>
                    {currentStep > step.id ? (
                      <Check size={24} />
                    ) : (
                      <step.icon size={24} />
                    )}
                  </div>
                  <span className="text-xs font-medium hidden md:block">{step.title}</span>
                </motion.button>
                
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    currentStep > index ? 'bg-tryonyou-blue' : 'bg-white/10'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avatar Preview */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="card sticky top-24">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Wand2 size={20} className="text-tryonyou-blue" />
                  Preview
                </h3>
                
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-center"
                  >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                      <User size={64} className="text-white/80" />
                    </div>
                    <p className="text-white/60 text-sm">Your avatar will appear here</p>
                  </motion.div>
                  
                  {/* Decorative elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <div className="absolute top-8 right-8 w-1 h-1 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-12 left-8 w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  {avatarData.bodyType && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Body:</span>
                      <span className="capitalize">{bodyTypes.find(b => b.id === avatarData.bodyType)?.name}</span>
                    </div>
                  )}
                  {avatarData.height && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Height:</span>
                      <span>{avatarData.height} cm</span>
                    </div>
                  )}
                  {avatarData.style && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Style:</span>
                      <span className="capitalize">{styles.find(s => s.id === avatarData.style)?.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Step Content */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-12">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                    currentStep === 0
                      ? 'opacity-50 cursor-not-allowed glass'
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  <ChevronRight size={20} className="rotate-180" />
                  Previous
                </button>
                
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="btn-primary flex items-center gap-2"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button className="btn-primary flex items-center gap-2">
                    <Sparkles size={20} />
                    Create Avatar
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MyAvatar

