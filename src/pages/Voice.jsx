import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const Voice = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState({})
  const [listening, setListening] = useState(false)

  const measurements = location.state?.measurements || {}

  const questions = [
    {
      id: 'height_confirm',
      question: 'How tall are you?',
      type: 'number',
      placeholder: 'e.g., 170',
      unit: 'cm',
      field: 'height'
    },
    {
      id: 'weight_confirm',
      question: 'How much do you weigh?',
      type: 'number',
      placeholder: 'e.g., 70',
      unit: 'kg',
      field: 'weight'
    },
    {
      id: 'occasion',
      question: 'What is the occasion?',
      type: 'select',
      options: [
        { value: 'work', label: 'Work' },
        { value: 'casual', label: 'Casual' },
        { value: 'formal', label: 'Formal' },
        { value: 'event', label: 'Event' },
        { value: 'ceremony', label: 'Ceremony' },
      ],
      field: 'occasion'
    },
    {
      id: 'fit_preference',
      question: 'What is your fit preference?',
      type: 'select',
      options: [
        { value: 'slim', label: 'Slim Fit' },
        { value: 'regular', label: 'Regular Fit' },
        { value: 'relaxed', label: 'Relaxed Fit' },
      ],
      field: 'fit_preference'
    },
  ]

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  const handleVoiceInput = () => {
    setListening(true)
    // Simulate voice input
    setTimeout(() => {
      setListening(false)
      // In production, this would use Web Speech API
    }, 2000)
  }

  const handleTextInput = (value) => {
    setResponses({
      ...responses,
      [currentQ.id]: value
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Navigate to result with all data
      const finalMeasurements = {
        ...measurements,
        height: responses.height_confirm || measurements.height,
        weight: responses.weight_confirm || measurements.weight,
        occasion: responses.occasion || measurements.occasion,
        fit_preference: responses.fit_preference || 'regular',
      }
      navigate('/result', { state: { measurements: finalMeasurements } })
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      navigate('/scan', { state: { measurements } })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-widest">TRYONYOU</h1>
          <div className="text-sm text-gray-400">Confirm Details</div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {questions.map((q, index) => (
                <div key={q.id} className="flex items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      index <= currentQuestion
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </motion.div>
                  {index < questions.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${index < currentQuestion ? 'bg-blue-600' : 'bg-gray-700'}`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 text-center">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8"
          >
            <h2 className="text-3xl font-bold mb-8">{currentQ.question}</h2>

            {/* Voice Input Option */}
            <div className="mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVoiceInput}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors mb-4 flex items-center justify-center gap-2"
              >
                {listening ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-4 h-4 bg-red-500 rounded-full"
                    />
                    Listening...
                  </>
                ) : (
                  <>
                    🎤 Use Voice
                  </>
                )}
              </motion.button>
              <p className="text-sm text-gray-400 text-center">or enter manually below</p>
            </div>

            {/* Text Input */}
            {currentQ.type === 'number' && (
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder={currentQ.placeholder}
                    value={responses[currentQ.id] || ''}
                    onChange={(e) => handleTextInput(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <span className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-400">
                    {currentQ.unit}
                  </span>
                </div>
              </div>
            )}

            {currentQ.type === 'select' && (
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTextInput(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-left font-semibold ${
                      responses[currentQ.id] === option.value
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                        : 'bg-gray-700 border-gray-600 text-white hover:border-gray-500'
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBack}
              className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-colors uppercase tracking-wider"
            >
              Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors shadow-lg uppercase tracking-wider"
            >
              {isLastQuestion ? 'Find My Fit' : 'Next'}
            </motion.button>
          </div>

          {/* Info */}
          <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700 text-sm text-gray-400">
            <p>
              <span className="font-bold text-white">Voice Input:</span> In production, 
              you can speak your answers naturally. Text input is always available as a fallback.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Voice
