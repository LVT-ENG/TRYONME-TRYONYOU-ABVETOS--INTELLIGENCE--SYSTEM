import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const Result = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const measurements = location.state?.measurements || {}

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true)
        
        // Call the matching endpoint
        const response = await fetch('/api/matching', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            height: measurements.height || 170,
            weight: measurements.weight || 70,
            chest: measurements.chest || 96,
            waist: measurements.waist || 86,
            hips: measurements.hips || 100,
            shoulder_width: measurements.shoulder_width || 42,
            arm_length: measurements.arm_length || 62,
            leg_length: measurements.leg_length || 84,
            torso_length: measurements.torso_length || 66,
            occasion: measurements.occasion || null,
            category: measurements.category || null,
            size_preference: measurements.size_preference || 'M',
          }),
        })

        const data = await response.json()
        
        if (data.success) {
          setResult(data)
        } else {
          setError(data.error || 'Failed to find a matching garment')
        }
      } catch (err) {
        setError(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [measurements])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-gray-600 border-t-blue-600 rounded-full mx-auto mb-6"
          />
          <p className="text-xl text-gray-300">Finding your perfect fit...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20">
        <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-widest">TRYONYOU</h1>
            <div className="text-sm text-gray-400">Results</div>
          </div>
        </header>

        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-900/20 border border-red-500 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Error</h2>
              <p className="text-gray-300 mb-8">{error}</p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20 flex items-center justify-center">
        <p className="text-xl text-gray-300">No results found</p>
      </div>
    )
  }

  const garment = result.best_garment
  const fitScore = result.fit_score
  const explanation = result.explanation
  const details = result.details || {}

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-widest">TRYONYOU</h1>
          <div className="text-sm text-gray-400">Your Perfect Fit</div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            
            {/* Left: Garment Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">👗</div>
                <p className="text-gray-400">{garment.name}</p>
                <p className="text-sm text-gray-500 mt-2">{garment.brand}</p>
              </div>
            </motion.div>

            {/* Right: Result Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Fit Score */}
              <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-xl p-8 border border-green-500/30">
                <h2 className="text-4xl font-bold mb-2">This is the best fit for you</h2>
                <div className="text-6xl font-bold text-green-400 mb-4">{fitScore}%</div>
                <p className="text-gray-300">Perfect Match Score</p>
              </div>

              {/* Garment Info */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold mb-2">{garment.name}</h3>
                <p className="text-gray-400 mb-4">{garment.brand}</p>
                <p className="text-gray-300 mb-4">{garment.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-400">${garment.price.toLocaleString('en-US')}</span>
                  <span className="text-sm bg-blue-600/30 px-3 py-1 rounded-full">{garment.category.toUpperCase()}</span>
                </div>
              </div>

              {/* Why It Fits */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4">Why This Fit</h3>
                <p className="text-gray-300 leading-relaxed">{explanation}</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/')}
                  className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-colors uppercase tracking-wider"
                >
                  Start Over
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors shadow-lg uppercase tracking-wider"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Detailed Measurements Analysis */}
          {details.measurement_details && details.measurement_details.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-6">Detailed Fit Analysis</h3>
              
              <div className="space-y-6">
                {details.measurement_details.map((measurement, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{measurement.measurement}</span>
                      <span className={`text-sm font-bold ${
                        measurement.fit_quality === 'Perfect' ? 'text-green-400' :
                        measurement.fit_quality === 'Excellent' ? 'text-green-400' :
                        measurement.fit_quality === 'Good' ? 'text-blue-400' :
                        measurement.fit_quality === 'Fair' ? 'text-yellow-400' :
                        'text-orange-400'
                      }`}>
                        {measurement.fit_quality}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Your: {measurement.user_value}cm</span>
                      <span>Garment: {measurement.garment_value}cm</span>
                      <span>Deviation: {measurement.deviation.toFixed(1)}cm</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(measurement.fit_score, 100)}%` }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className={`h-full ${
                          measurement.fit_score >= 95 ? 'bg-green-500' :
                          measurement.fit_score >= 90 ? 'bg-green-500' :
                          measurement.fit_score >= 75 ? 'bg-blue-500' :
                          measurement.fit_score >= 60 ? 'bg-yellow-500' :
                          'bg-orange-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                  Fabric elasticity: <span className="text-blue-400 font-semibold">{details.fabric_elasticity}%</span> | 
                  Drape score: <span className="text-blue-400 font-semibold">{details.fabric_drape}/10</span> | 
                  Tolerance: <span className="text-blue-400 font-semibold">{details.tolerance.toFixed(1)}cm</span>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 text-center text-gray-500 mt-12">
        <p>TRYONYOU Pilot | Fashion Tech for Perfect Fit | No Returns. No Guessing. Just Fit.</p>
      </footer>
    </div>
  )
}

export default Result
