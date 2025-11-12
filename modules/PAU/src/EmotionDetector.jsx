import React, { useState, useEffect } from 'react'

const EmotionDetector = ({ onEmotionDetected }) => {
  const [emotion, setEmotion] = useState('neutral')
  
  useEffect(() => {
    // Simulate emotion detection
    const emotions = ['joy', 'confidence', 'calm', 'energy', 'elegance']
    const interval = setInterval(() => {
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
      setEmotion(randomEmotion)
      if (onEmotionDetected) onEmotionDetected(randomEmotion)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [onEmotionDetected])
  
  return (
    <div className="pau-emotion-detector">
      <p>Detected Emotion: {emotion}</p>
    </div>
  )
}

export default EmotionDetector
