import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PEACOCK = "#0F5E68";
const GOLD = "#FFD700";
const LUXURY_PURPLE = "#6B46C1";

const products = [
  { id: 1, name: "Luxury Jacket", price: "€1200", img: "https://via.placeholder.com/400x500" },
  { id: 2, name: "Digital Dress", price: "€980", img: "https://via.placeholder.com/400x500" },
  { id: 3, name: "Virtual Blazer", price: "€1500", img: "https://via.placeholder.com/400x500" },
  { id: 4, name: "AI Sneakers", price: "€680", img: "https://via.placeholder.com/400x500" },
  { id: 5, name: "LVT Coat", price: "€2200", img: "https://via.placeholder.com/400x500" },
  { id: 6, name: "TRYON Suit", price: "€1850", img: "https://via.placeholder.com/400x500" },
  { id: 7, name: "Premium Shirt", price: "€890", img: "https://via.placeholder.com/400x500" },
  { id: 8, name: "Designer Pants", price: "€1150", img: "https://via.placeholder.com/400x500" },
  { id: 9, name: "Luxury Shoes", price: "€2500", img: "https://via.placeholder.com/400x500" },
  { id: 10, name: "Elite Accessories", price: "€750", img: "https://via.placeholder.com/400x500" }
];

const premiumSlogans = [
  "Ajuste Científico Garantizado",
  "Zero Devoluciones, Máximo Lujo",
  "Avatar 3D Pau Te Asesora",
  "AVBETOS Intelligence System",
  "CAP + JT + ADBET",
  "Producción Just-In-Time"
];

const avbetosStatus = {
  avatar3D: true,
  pau: true,
  cap: true,
  adbet: true,
  production: true
};

export default function App() {
  const [selected, setSelected] = useState(null);
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [showPau, setShowPau] = useState(false);

  // Rotating slogans animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % premiumSlogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Infinite scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        setVisibleProducts(prev => Math.min(prev + 4, products.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans bg-white text-gray-900">
      {/* Premium Hero Section with Overlaid Slogans */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                backgroundColor: GOLD
              }}
              animate={{
                y: [-20, -100, -20],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Main Hero Content */}
        <motion.h1
          className="text-6xl font-bold mb-6 text-white z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          TRYONYOU
          <motion.span 
            className="block text-3xl mt-2"
            style={{ color: GOLD }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Premium Digital Experience
          </motion.span>
        </motion.h1>

        {/* Rotating Slogans Overlay */}
        <div className="relative h-20 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlogan}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl font-semibold bg-black/30 px-6 py-3 rounded-full backdrop-blur-sm border border-yellow-400/20" style={{ color: GOLD }}>
                {premiumSlogans[currentSlogan]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AVBETOS Status Indicators */}
        <motion.div 
          className="absolute top-6 right-6 bg-black/40 backdrop-blur-sm rounded-lg p-4 text-white text-sm z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          <h3 className="font-bold mb-2" style={{ color: GOLD }}>AVBETOS Status</h3>
          {Object.entries(avbetosStatus).map(([key, status]) => (
            <div key={key} className="flex items-center justify-between mb-1">
              <span className="capitalize">{key}:</span>
              <div className={`w-3 h-3 rounded-full ml-2 ${status ? 'bg-green-400' : 'bg-red-400'}`} />
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="mt-8 px-8 py-4 bg-gradient-to-r from-gold to-yellow-600 text-black font-bold text-lg rounded-full shadow-lg z-10"
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPau(true)}
        >
          Probar con Avatar PAU
        </motion.button>
      </section>
      {/* Avatar PAU Probador Section */}
      <AnimatePresence>
        {showPau && (
          <motion.section
            className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-20 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold mb-4" style={{ color: PEACOCK }}>
                  Probador Virtual con Avatar PAU
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  PAU (Personal AI User) es tu asistente de imagen personal que comprende tus emociones, 
                  preferencias y ocasiones para recomendarte el look perfecto.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* PAU Avatar Display */}
                <motion.div
                  className="relative"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-2xl">
                    <div className="aspect-square bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                      <motion.div
                        className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center"
                        animate={{ 
                          rotateY: [0, 10, -10, 0],
                          scale: [1, 1.05, 1] 
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <span className="text-white text-4xl font-bold">PAU</span>
                      </motion.div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Avatar PAU Activo</h3>
                      <p className="text-gray-600 text-sm">
                        Estado: Analizando preferencias...
                      </p>
                      <div className="mt-4 flex justify-center space-x-2">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-purple-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* PAU Features */}
                <motion.div
                  className="space-y-6"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="font-bold text-lg mb-3 text-purple-700">Análisis Emocional</h4>
                    <p className="text-gray-600">PAU detecta tu estado de ánimo y contexto para sugerir outfits que reflejen tu personalidad.</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-700">Ajuste 3D Paramétrico</h4>
                    <p className="text-gray-600">Avatar generado con tus medidas exactas para visualización realista de cada prenda.</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-700">Conexión AVBETOS</h4>
                    <p className="text-gray-600">Integrado con el motor AVBETOS para recomendaciones en tiempo real.</p>
                  </div>

                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPau(false)}
                  >
                    Continuar Experiencia
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Shop Grid with Infinite Scroll */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-10" style={{ color: PEACOCK }}>
          Colección Exclusiva
          <motion.span 
            className="block text-sm text-gray-500 mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll para ver más productos
          </motion.span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.slice(0, visibleProducts).map((p, index) => (
            <motion.div
              key={p.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(p)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img src={p.img} alt={p.name} className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-gray-500">{p.price}</p>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                  AVBETOS Compatible
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {visibleProducts < products.length && (
          <motion.div 
            className="text-center mt-12"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-gray-500">Cargando más productos...</div>
          </motion.div>
        )}
      </section>
      {/* Armario Inteligente Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Armario Inteligente
              <motion.span 
                className="block text-lg mt-2"
                style={{ color: GOLD }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Powered by AVBETOS AI
              </motion.span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Tu armario digital que aprende de tus gustos, organiza automáticamente tus prendas 
              y sugiere combinaciones perfectas para cada ocasión.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Organización AI",
                description: "Categorización automática por color, estilo, ocasión y temporada",
                icon: "🧠",
                features: ["Machine Learning", "Auto-categorización", "Predicción de uso"]
              },
              {
                title: "Sugerencias Inteligentes",
                description: "Outfits personalizados basados en clima, evento y estado de ánimo",
                icon: "✨",
                features: ["Weather API", "Calendar Integration", "Mood Detection"]
              },
              {
                title: "Inventario Virtual",
                description: "Seguimiento digital de todas tus prendas con estado y disponibilidad",
                icon: "📊",
                features: ["Real-time Status", "Wear Analytics", "Care Reminders"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-blue-100 mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((feat, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: GOLD }} />
                      {feat}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-gold to-yellow-600 text-black font-bold rounded-full text-lg hover:scale-105 transition-transform">
              Activar Armario Inteligente
            </button>
          </motion.div>
        </div>
      </section>

      {/* Armario Solidario Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Armario Solidario
              <motion.span 
                className="block text-lg text-green-300 mt-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Moda Sostenible y Responsable
              </motion.span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-green-100">
              Dona, intercambia o recicla tus prendas. Cada acción contribuye a un futuro más sostenible 
              mientras ayudas a otros a acceder a moda de calidad.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Donación",
                description: "Dona prendas en buen estado a personas necesitadas",
                icon: "💝",
                impact: "+500 familias ayudadas",
                color: "from-pink-500 to-rose-500"
              },
              {
                title: "Intercambio",
                description: "Intercambia prendas con otros usuarios de la comunidad",
                icon: "🔄",
                impact: "+2000 intercambios",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Reciclaje",
                description: "Transforma prendas en desuso en nuevos materiales",
                icon: "♻️",
                impact: "85% materiales recuperados",
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Upcycling",
                description: "Convierte prendas viejas en diseños únicos y modernos",
                icon: "✨",
                impact: "+300 diseños únicos",
                color: "from-purple-500 to-indigo-500"
              }
            ].map((action, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center text-2xl`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {action.icon}
                </motion.div>
                <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                <p className="text-green-100 text-sm mb-3">{action.description}</p>
                <div className="text-xs text-green-300 font-semibold">{action.impact}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-full text-lg hover:scale-105 transition-transform mr-4">
              Unirse al Armario Solidario
            </button>
            <button className="px-6 py-3 border-2 border-green-400 text-green-400 font-semibold rounded-full hover:bg-green-400 hover:text-green-900 transition-colors">
              Ver Impacto
            </button>
          </motion.div>
        </div>
      </section>
      {/* Enhanced Modal with AVBETOS Integration */}
      {selected && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img src={selected.img} alt={selected.name} className="w-full h-80 object-cover rounded-lg" />
                
                {/* AVBETOS Integration Status */}
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-sm mb-2 text-purple-700">AVBETOS Analysis</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Ajuste Predictivo:</span>
                      <span className="text-green-600 font-semibold">98% Compatible</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avatar 3D Ready:</span>
                      <span className="text-green-600 font-semibold">✓ Activado</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PAU Recommendation:</span>
                      <span className="text-blue-600 font-semibold">Altamente Recomendado</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">{selected.name}</h3>
                <p className="text-2xl text-purple-600 font-bold mb-4">{selected.price}</p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Características Premium</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Talla garantizada por IA</li>
                      <li>• Material sostenible certificado</li>
                      <li>• Diseño exclusivo CAP</li>
                      <li>• Entrega Just-In-Time</li>
                    </ul>
                  </div>
                  
                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl mb-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Probar con Avatar PAU
                  </motion.button>
                  
                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-gold to-yellow-600 text-black font-bold rounded-xl mb-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Añadir al Armario Inteligente
                  </motion.button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2 px-4 border border-green-500 text-green-500 rounded-lg text-sm hover:bg-green-50">
                      Donar Similar
                    </button>
                    <button className="py-2 px-4 border border-blue-500 text-blue-500 rounded-lg text-sm hover:bg-blue-50">
                      Intercambiar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
