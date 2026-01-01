import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const looks = [
  {
    id: 'look1',
    name: 'Artisan Colorful Jacket',
    brand: 'Lafayette Exclusive',
    price: 1890,
    fit: 94,
    shoulder: 95,
    chest: 88,
    waist: 92,
    length: 90,
    description: 'Chaqueta multicolor con motivo cubista, ideal para un look audaz.',
    image: '/images/look1.png',
  },
  {
    id: 'look2',
    name: 'Heritage Brown Suit',
    brand: 'Lafayette Exclusive',
    price: 2450,
    fit: 98,
    shoulder: 99,
    chest: 97,
    waist: 98,
    length: 96,
    description: 'Traje marrón de lana virgen con camisa burdeos, elegancia atemporal.',
    image: '/images/look2.jpeg',
  },
  {
    id: 'look3',
    name: 'Noir Couture Dress',
    brand: 'Lafayette Exclusive',
    price: 3200,
    fit: 96,
    shoulder: 97,
    chest: 95,
    waist: 96,
    length: 94,
    description: 'Vestido negro de alta costura con guantes rojos, sofisticación pura.',
    image: '/images/placeholder_dress.png', // Placeholder
  },
  {
    id: 'look4',
    name: 'Graphic White Biker',
    brand: 'Lafayette Exclusive',
    price: 1650,
    fit: 92,
    shoulder: 93,
    chest: 90,
    waist: 91,
    length: 88,
    description: 'Chaqueta blanca de motorista con diseño geométrico, estilo moderno.',
    image: '/images/placeholder_biker.png', // Placeholder
  },
]

const LookImageDisplay = ({ selectedLook, isTransitioning }) => {
  const selectedLookData = looks.find(l => l.id === selectedLook)

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={selectedLook}
          src={selectedLookData.image}
          alt={selectedLookData.name}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Fit Score Overlay */}
      <motion.div
        key={`score-${selectedLook}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-yellow-500/50 shadow-lg"
      >
        <div className="text-xs text-white/60 uppercase tracking-widest">Fit Score</div>
        <div className="text-3xl font-extrabold text-yellow-400">{selectedLookData.fit}%</div>
      </motion.div>

      {/* Look Summary Overlay */}
      <motion.div
        key={`summary-${selectedLook}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-3"
      >
        <div className="text-xs text-white/60 uppercase tracking-widest mb-1">{selectedLookData.brand}</div>
        <div className="text-lg font-semibold text-white">{selectedLookData.name}</div>
        <div className="text-sm text-white/70 mt-1">{selectedLookData.description}</div>
      </motion.div>

      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const Demo = () => {
  const [selectedLook, setSelectedLook] = useState(looks[0].id)
  const [selectedSize, setSelectedSize] = useState('M')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  const selectedLookData = looks.find(l => l.id === selectedLook)

  const handleLookChange = (lookId) => {
    if (lookId !== selectedLook) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedLook(lookId)
        setTimeout(() => setIsTransitioning(false), 400)
      }, 300)
    }
  }

  const getFitLabel = (value) => {
    if (value >= 95) return { text: 'Perfecto', color: 'text-green-400' }
    if (value >= 90) return { text: 'Excelente', color: 'text-blue-400' }
    if (value >= 85) return { text: 'Bueno', color: 'text-yellow-400' }
    return { text: 'Ajustar', color: 'text-orange-400' }
  }

  const getBarColor = (value) => {
    if (value >= 95) return 'bg-green-500'
    if (value >= 90) return 'bg-blue-500'
    if (value >= 85) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  const FitBar = ({ label, value }) => (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between text-xs mb-1">
        <span className="text-white/60">{label}</span>
        <span className={getFitLabel(value).color}>
          {getFitLabel(value).text}
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full ${getBarColor(value)} rounded-full`}
        />
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-12 pb-12">
      {/* Header - Branding for Lafayette */}
      <header className="py-4 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-widest">TRYONYOU</h1>
          <div className="text-sm text-gray-400">x LAFAYETTE PARIS</div>
        </div>
      </header>

      {/* Main Demo Area */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Panel - Look Selection */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">Selección de Looks</h2>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {looks.map((look) => (
                  <motion.button
                    key={look.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLookChange(look.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      selectedLook === look.id
                        ? 'bg-blue-600/30 border-2 border-blue-500 shadow-xl'
                        : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <img
                        src={look.image}
                        alt={look.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4 border border-gray-600"
                      />
                      <div>
                        <div className="font-semibold text-white">{look.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{look.description}</div>
                        <div className="text-sm text-yellow-400 font-bold mt-1">${look.price.toLocaleString('en-US')}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Center - Image Display */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-[3/4] bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <LookImageDisplay selectedLook={selectedLook} isTransitioning={isTransitioning} />
              </div>

              {/* Size selector */}
              <div className="mt-8 w-full max-w-md">
                <h3 className="text-sm font-medium text-white/60 mb-3 text-center">Talla Recomendada: <span className="text-xl font-bold text-blue-400">{selectedSize}</span></h3>
                <div className="flex gap-2 justify-center">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-700 text-white/70 hover:bg-gray-600'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Fit Analysis */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">Análisis de Ajuste Detallado</h2>
              
              <motion.div 
                key={`analysis-${selectedLook}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl space-y-4"
              >
                <h3 className="font-bold text-lg text-white mb-4">{selectedLookData.name}</h3>
                
                <FitBar label="Hombros (Shoulder)" value={selectedLookData.shoulder} />
                <FitBar label="Pecho (Chest)" value={selectedLookData.chest} />
                <FitBar label="Cintura (Waist)" value={selectedLookData.waist} />
                <FitBar label="Largo (Length)" value={selectedLookData.length} />

                <div className="pt-4 border-t border-gray-700 mt-4">
                  <h4 className="text-sm font-semibold text-white/80 mb-2">Recomendación de Estilo</h4>
                  <p className="text-gray-400 text-sm">
                    Este look ofrece un ajuste **{getFitLabel(selectedLookData.fit).text}** con un enfoque en la silueta. La tecnología TRYONYOU asegura que cada dimensión se alinee con su perfil corporal.
                  </p>
                </div>
              </motion.div>

              {/* Call to Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-3"
              >
                <button
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-white transition-colors shadow-lg uppercase tracking-wider"
                >
                  Añadir al Carrito - ${selectedLookData.price.toLocaleString('en-US')}
                </button>
                <button
                  className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white transition-colors uppercase tracking-wider"
                >
                  Reservar para Prueba en Tienda
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-center text-gray-400">
          <div>
            <span className="text-3xl text-green-500">✓</span>
            <p className="text-sm mt-1">Devoluciones Gratuitas</p>
          </div>
          <div>
            <span className="text-3xl text-green-500">✓</span>
            <p className="text-sm mt-1">Garantía de Talla TRYONYOU</p>
          </div>
          <div>
            <span className="text-3xl text-green-500">✓</span>
            <p className="text-sm mt-1">Asesoramiento Experto</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Demo
