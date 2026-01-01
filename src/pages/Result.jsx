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
        // Updated path to point to the Python backend on /api/match/best
        const response = await fetch('/api/match/best', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Added height as required by the Python backend
            height: measurements.height || 170,
            chest: measurements.chest || 96,
            waist: measurements.waist || 86,
            hips: measurements.hips || 100,
            // Only send fields required by the backend Pydantic model
          }),
        })

        const data = await response.json()
        
        // Adapt Python response to frontend state structure if needed
        if (data.garment_id) {
          setResult(data)
        } else {
          setError('Failed to find a matching garment')
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

  if (!result || result.garment_id === "NONE") {
     return (
       <div className="min-h-screen bg-gray-900 text-white pt-20 flex items-center justify-center flex-col">
         <p className="text-xl text-gray-300 mb-4">{result?.explanation || "No suitable garment found."}</p>
         <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-colors"
          >
            Try Again
          </button>
       </div>
     )
  }

  // Use dynamic fields from API
  const garmentName = result.garment_name;
  const fitScore = result.match_score.toFixed(1);
  const explanation = result.explanation;
  const fitStatus = result.fit_status;

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
                <p className="text-gray-400">{garmentName}</p>
                <p className="text-sm text-gray-500 mt-2">{fitStatus}</p>
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
                <h3 className="text-2xl font-bold mb-2">{garmentName}</h3>
                <p className="text-gray-300 mb-4">{explanation}</p>
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
