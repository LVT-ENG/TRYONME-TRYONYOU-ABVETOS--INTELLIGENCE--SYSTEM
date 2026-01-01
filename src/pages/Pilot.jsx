import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Pilot = () => {
  const navigate = useNavigate()
  const [userMeasurements, setUserMeasurements] = useState({
    height: 170,
    weight: 70,
    chest: 96,
    waist: 86,
    hips: 100,
    shoulder_width: 42,
    arm_length: 62,
    leg_length: 84,
    torso_length: 66,
    occasion: 'work',
    category: null,
    size_preference: 'M',
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFindFit = () => {
    setIsProcessing(true)
    // Simulate processing time
    setTimeout(() => {
      navigate('/result', { state: { measurements: userMeasurements } })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-widest">TRYONYOU</h1>
          <div className="text-sm text-gray-400">MVP Flow</div>
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
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold mb-6">Paso de Medición Corporal MVP</h2>
              
              <p className="text-gray-300 mb-6">
                Para el MVP, introduzca sus medidas. En producción, esto sería capturado por el escaneo corporal.
              </p>

              <div className="space-y-4 mb-8">
                {/* Manual Input Fields */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: 'height', label: 'Altura (cm)', placeholder: '170' },
                    { key: 'weight', label: 'Peso (kg)', placeholder: '70' },
                    { key: 'chest', label: 'Pecho (cm)', placeholder: '96' },
                    { key: 'waist', label: 'Cintura (cm)', placeholder: '86' },
                    { key: 'hips', label: 'Caderas (cm)', placeholder: '100' },
                    { key: 'shoulder_width', label: 'Hombros (cm)', placeholder: '42' },
                    { key: 'arm_length', label: 'Largo Brazo (cm)', placeholder: '62' },
                    { key: 'leg_length', label: 'Largo Pierna (cm)', placeholder: '84' },
                    { key: 'torso_length', label: 'Largo Torso (cm)', placeholder: '66' },
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
                <h3 className="font-bold text-lg">Preferencias (Contexto)</h3>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Ocasión</label>
                  <select
                    value={userMeasurements.occasion || ''}
                    onChange={(e) => setUserMeasurements({
                      ...userMeasurements,
                      occasion: e.target.value || null
                    })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="work">Work</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="event">Event</option>
                    <option value="ceremony">Ceremony</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Preferencia de Talla Base</label>
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFindFit}
              disabled={isProcessing}
              className={`w-full py-4 rounded-lg font-bold text-white transition-colors shadow-lg uppercase tracking-wider ${
                isProcessing
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isProcessing ? 'Procesando...' : 'Encontrar Mi Fit Perfecto'}
            </motion.button>
            
            {isProcessing && (
              <div className="text-center text-sm text-gray-400">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-6 border-2 border-gray-600 border-t-blue-600 rounded-full mx-auto mb-2"
                />
                <p>TryOnYou lo está haciendo por ti...</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Pilot
