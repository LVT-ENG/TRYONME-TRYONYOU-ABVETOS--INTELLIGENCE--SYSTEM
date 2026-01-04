import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Smile, Frown, Meh, Zap, TrendingUp, Activity } from 'lucide-react'
import { AgentPAU } from '../agents'

// Biometric simulation constants
const MIN_HEART_RATE = 60
const HEART_RATE_RANGE = 40
const MIN_SKIN_TEMP = 36
const TEMP_RANGE = 1.5

/**
 * PAU Assistant Component (Agent 001)
 * Refined emotional recommender interface
 * Provides outfit recommendations based on emotional state and biometrics
 */
const PAU_Assistant = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [biometrics, setBiometrics] = useState({
    heartRate: 72,
    skinTemp: 36.5,
    stressLevel: 'low'
  })
  const isMountedRef = useRef(true)

  // Available emotions for selection
  const emotions = [
    { 
      id: 'happy', 
      label: 'Happy', 
      icon: Smile, 
      color: 'from-yellow-500 to-amber-500',
      description: 'Feeling joyful and energetic'
    },
    { 
      id: 'confident', 
      label: 'Confident', 
      icon: Zap, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Ready to take on the world'
    },
    { 
      id: 'romantic', 
      label: 'Romantic', 
      icon: Heart, 
      color: 'from-rose-500 to-pink-500',
      description: 'In the mood for love'
    },
    { 
      id: 'relaxed', 
      label: 'Relaxed', 
      icon: Meh, 
      color: 'from-green-500 to-emerald-500',
      description: 'Calm and comfortable'
    },
    { 
      id: 'professional', 
      label: 'Professional', 
      icon: TrendingUp, 
      color: 'from-purple-500 to-indigo-500',
      description: 'Business-ready mindset'
    },
    { 
      id: 'adventurous', 
      label: 'Adventurous', 
      icon: Sparkles, 
      color: 'from-orange-500 to-red-500',
      description: 'Bold and daring'
    }
  ]

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const handleEmotionSelect = async (emotion) => {
    setSelectedEmotion(emotion)
    setIsProcessing(true)
    setRecommendation(null)

    try {
      // Simulate biometric reading
      const simulatedBiometrics = {
        heartRate: Math.floor(MIN_HEART_RATE + Math.random() * HEART_RATE_RANGE),
        skinTemp: (MIN_SKIN_TEMP + Math.random() * TEMP_RANGE).toFixed(1),
        stressLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
      }
      setBiometrics(simulatedBiometrics)

      // Call Agent PAU for recommendation
      const result = await AgentPAU.recommend(emotion.id, simulatedBiometrics)
      
      // Simulate processing time for better UX
      setTimeout(() => {
        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setRecommendation({
            outfitId: result,
            emotion: emotion.label,
            confidence: Math.floor(85 + Math.random() * 15),
            description: getRecommendationDescription(emotion.id),
            items: getRecommendedItems(emotion.id)
          })
          setIsProcessing(false)
        }
      }, 1500)
    } catch (error) {
      console.error('PAU recommendation error:', error)
      if (isMountedRef.current) {
        setIsProcessing(false)
      }
    }
  }

  const getRecommendationDescription = (emotionId) => {
    const descriptions = {
      happy: 'Vibrant colors and flowing fabrics to match your joyful energy',
      confident: 'Structured pieces with bold lines that command attention',
      romantic: 'Soft silhouettes in warm tones perfect for intimate moments',
      relaxed: 'Comfortable, breathable fabrics in calming neutral tones',
      professional: 'Sharp tailoring with classic cuts for business excellence',
      adventurous: 'Statement pieces with unique textures and bold patterns'
    }
    return descriptions[emotionId] || 'Curated selection based on your emotional state'
  }

  const getRecommendedItems = (emotionId) => {
    const items = {
      happy: ['Flowy sundress', 'Bright accessories', 'Comfortable sneakers'],
      confident: ['Tailored blazer', 'High-waist trousers', 'Statement heels'],
      romantic: ['Silk blouse', 'Midi skirt', 'Delicate jewelry'],
      relaxed: ['Soft sweater', 'Joggers', 'Slip-on shoes'],
      professional: ['Classic suit', 'Button-down shirt', 'Leather shoes'],
      adventurous: ['Bold jacket', 'Patterned pants', 'Unique accessories']
    }
    return items[emotionId] || ['Curated outfit', 'Matching accessories', 'Perfect shoes']
  }

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow-purple">
            <Heart className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text">PAU Assistant</h2>
            <p className="text-white/60 text-sm">Agent 001 - Emotional Recommender</p>
          </div>
        </div>
        <p className="text-white/70 text-sm">
          Select your current emotional state and I'll recommend the perfect outfit for you
        </p>
      </motion.div>

      {/* Emotion Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {emotions.map((emotion, index) => {
          const IconComponent = emotion.icon
          const isSelected = selectedEmotion?.id === emotion.id
          
          return (
            <motion.button
              key={emotion.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleEmotionSelect(emotion)}
              disabled={isProcessing}
              className={`glass p-4 rounded-xl transition-all hover:scale-105 ${
                isSelected 
                  ? 'ring-2 ring-white/50 bg-white/10' 
                  : 'hover:bg-white/5'
              } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${emotion.color} flex items-center justify-center mb-3 mx-auto`}>
                <IconComponent className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-1">{emotion.label}</h3>
              <p className="text-xs text-white/60">{emotion.description}</p>
            </motion.button>
          )
        })}
      </div>

      {/* Processing State */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-xl p-6 mb-6"
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Activity className="text-purple-400" size={32} />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Analyzing Your Emotional State...</h3>
                <p className="text-sm text-white/60">
                  Processing biometrics and matching with outfit database
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>Heart Rate: {biometrics.heartRate} bpm</span>
                    <span>Skin Temp: {biometrics.skinTemp}°C</span>
                    <span>Stress: {biometrics.stressLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommendation Result */}
      <AnimatePresence>
        {recommendation && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-xl p-6 border border-purple-500/30"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Perfect Match Found!</h3>
                  <p className="text-sm text-white/60">For your {recommendation.emotion} mood</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold gradient-text">{recommendation.confidence}%</div>
                <div className="text-xs text-white/50">Confidence</div>
              </div>
            </div>

            <p className="text-white/80 mb-4">{recommendation.description}</p>

            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-semibold text-white/70">Recommended Items:</h4>
              {recommendation.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Outfit ID: {recommendation.outfitId}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Footer */}
      {!isProcessing && !recommendation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-white/40">
            PAU uses advanced emotional AI to match your feelings with the perfect outfit
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default PAU_Assistant
