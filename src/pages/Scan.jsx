import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const Scan = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [scanning, setScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  const measurements = location.state?.measurements || {}

  const handleStartScan = () => {
    setScanning(true)
    setScanProgress(0)

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setScanning(false)
          // Navigate to voice confirmation
          setTimeout(() => {
            navigate('/voice', { state: { measurements } })
          }, 1000)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-widest">TRYONYOU</h1>
          <div className="text-sm text-gray-400">Body Scan</div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Instructions */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold mb-6">Body Scan Setup</h2>
              
              <div className="space-y-4 mb-8">
                <h3 className="font-bold text-lg">Preparation</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">1</span>
                    <span>Wear fitted clothing that shows your body shape (tight shirt and pants recommended)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">2</span>
                    <span>Stand in a well-lit area with your phone 2 meters away</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">3</span>
                    <span>Position yourself vertically in the frame (head to toe)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">4</span>
                    <span>Keep your arms at your sides and stand naturally</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4 mb-8">
                <p className="text-blue-300">
                  Our AI will capture your body proportions using computer vision. 
                  No video is stored—only your measurements are saved.
                </p>
              </div>
            </div>

            {/* Camera Placeholder */}
            <div className="relative h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl flex items-center justify-center">
              {!scanning ? (
                <div className="text-center">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-gray-400 mb-2">Camera Placeholder</p>
                  <p className="text-sm text-gray-500">In production, this would show your phone camera feed</p>
                </div>
              ) : (
                <div className="text-center w-full h-full flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-32 h-32 border-4 border-blue-500 rounded-full mb-6"
                  />
                  <p className="text-xl text-gray-300">Scanning...</p>
                  <p className="text-sm text-gray-500 mt-2">{Math.round(scanProgress)}%</p>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {scanning && (
              <div className="space-y-2">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center">Processing body measurements...</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/pilot')}
                className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-colors uppercase tracking-wider"
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartScan}
                disabled={scanning}
                className={`flex-1 py-4 rounded-lg font-bold text-white transition-colors shadow-lg uppercase tracking-wider ${
                  scanning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {scanning ? 'Scanning...' : 'Start Scan'}
              </motion.button>
            </div>

            {/* Info Box */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-sm text-gray-400">
              <p className="mb-2">
                <span className="font-bold text-white">Note:</span> This is a pilot interface. 
                In production, MediaPipe will provide real-time body pose detection and measurement capture.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Scan
