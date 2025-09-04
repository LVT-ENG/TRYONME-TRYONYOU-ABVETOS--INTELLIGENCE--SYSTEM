import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon, SparklesIcon, ShoppingBagIcon, CreditCardIcon } from "@heroicons/react/24/outline";

const PEACOCK = "#0F5E68";
const GOLD = "#D4AF37";

const products = [
  { id: 1, name: "Luxury Jacket", price: "€1200", img: "/FC44B386-51DE-43B5-9291-8FB7CB6F8EFB.png", category: "luxury" },
  { id: 2, name: "Digital Dress", price: "€980", img: "/A_digital_illustration_of_a_stylized_female_peahen.png", category: "digital" },
  { id: 3, name: "Virtual Blazer", price: "€1500", img: "/A_digital_illustration_in_a_semi-realistic,_cartoo.png", category: "luxury" },
  { id: 4, name: "AI Sneakers", price: "€680", img: "/IMG_6696.png", category: "casual" },
  { id: 5, name: "LVT Coat", price: "€2200", img: "/A_digital_illustration_showcases_an_anthropomorphi.png", category: "luxury" },
  { id: 6, name: "TRYON Suit", price: "€1850", img: "/A_traditional_2D_digital_illustration_features_an_.png", category: "formal" },
  { id: 7, name: "Avatar Collection", price: "€1200", img: "/FEB5DC33-90E4-4A17-B4E9-9C23D58873BE.PNG", category: "avatar" },
  { id: 8, name: "Premium Look", price: "€2800", img: "/IMG_84C06F04-07BD-4155-9A2B-D2FC9FDC591C.jpeg", category: "premium" },
  { id: 9, name: "Figure Special", price: "€1400", img: "/figure1.png", category: "special" }
];

const slogans = [
  "El futuro de la moda está aquí",
  "Inteligencia artificial que viste tu personalidad",
  "AVBETOS - Redefining Fashion Tech",
  "Tu armario inteligente te espera",
  "Pagos biométricos seguros con ADBET"
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [armarioView, setArmarioView] = useState('inteligente');
  const infiniteScrollRef = useRef(null);

  // Infinite scroll animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Avatar Pau component
  const AvatarPau = () => (
    <motion.div
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer z-40 shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
    >
      <SparklesIcon className="w-8 h-8 text-white" />
    </motion.div>
  );

  // Payment modal component
  const PaymentModal = () => (
    <motion.div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-xl"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={() => setShowPayment(false)}
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: PEACOCK }}>
          Pago Biométrico ADBET
        </h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold mb-2">🟢 Stripe Sandbox (Activo)</h4>
            <p className="text-sm text-gray-600">Modo de prueba habilitado</p>
          </div>
          <div className="border rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold mb-2">👁️ Verificación Iris</h4>
            <p className="text-sm text-gray-600">Escáner biométrico simulado</p>
          </div>
          <div className="border rounded-lg p-4 bg-green-50">
            <h4 className="font-semibold mb-2">🎙️ Verificación Voz</h4>
            <p className="text-sm text-gray-600">Reconocimiento vocal activo</p>
          </div>
          <motion.button
            className="w-full py-3 rounded-xl text-white font-semibold"
            style={{ backgroundColor: PEACOCK }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              alert("¡Pago procesado con ADBET! 🎉");
              setShowPayment(false);
            }}
          >
            Procesar Pago Biométrico
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video_portada.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Animated Overlay Slogans */}
        <motion.div
          className="relative z-10 text-white"
          key={currentSlogan}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            TRYONYOU
          </h1>
          <p className="text-2xl mb-6 text-yellow-300">
            {slogans[currentSlogan]}
          </p>
        </motion.div>
        
        <motion.button
          className="relative z-10 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-2xl"
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}
        >
          Explorar Colección
        </motion.button>
      </section>

      {/* Infinite Scroll Collection */}
      <section id="collection" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          style={{ color: PEACOCK }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Colección Inteligente
        </motion.h2>
        
        <div className="overflow-hidden">
          <motion.div
            ref={infiniteScrollRef}
            className="flex space-x-8 px-6"
            animate={{ x: [-20, -2000] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...products, ...products].map((product, index) => (
              <motion.div
                key={`${product.id}-${index}`}
                className="flex-shrink-0 w-80 bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer"
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelected(product)}
              >
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x500/0F5E68/white?text=TRYONYOU";
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold" style={{ color: GOLD }}>{product.price}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {product.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Armario Inteligente Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            style={{ color: PEACOCK }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Armario Inteligente
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">IA que conoce tu estilo</h3>
              <p className="text-gray-600 mb-6">
                Nuestro sistema aprende de tus preferencias, analiza tu figura y
                sugiere combinaciones perfectas. Con tecnología AVBETOS, cada
                recomendación es única para ti.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <SparklesIcon className="w-6 h-6 text-purple-500" />
                  <span>Análisis 3D de tu figura</span>
                </div>
                <div className="flex items-center space-x-3">
                  <HeartIcon className="w-6 h-6 text-red-500" />
                  <span>Recomendaciones emocionales PAU</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShoppingBagIcon className="w-6 h-6 text-green-500" />
                  <span>Gestión automática de devoluciones</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-4">Estado del Armario</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Prendas analizadas:</span>
                  <span className="font-bold">127</span>
                </div>
                <div className="flex justify-between">
                  <span>Combinaciones sugeridas:</span>
                  <span className="font-bold">34</span>
                </div>
                <div className="flex justify-between">
                  <span>Eficiencia de ajuste:</span>
                  <span className="font-bold text-green-600">98.5%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Armario Solidario Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            style={{ color: PEACOCK }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Armario Solidario
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-2xl p-6 text-center shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Donación Automática</h3>
              <p className="text-gray-600">
                Las prendas que no uses se redistribuyen automáticamente a familias necesitadas.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-2xl p-6 text-center shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Moda Sostenible</h3>
              <p className="text-gray-600">
                Reducimos el desperdicio textil mediante IA que optimiza el uso de cada prenda.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-2xl p-6 text-center shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCardIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Impacto Medible</h3>
              <p className="text-gray-600">
                Cada donación genera créditos que se aplican automáticamente a tus próximas compras.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 inline-block shadow-xl">
              <h4 className="text-2xl font-bold mb-4" style={{ color: PEACOCK }}>
                Impacto Global Actual
              </h4>
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">2,847</div>
                  <div className="text-sm text-gray-600">Prendas donadas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-gray-600">Familias ayudadas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">89%</div>
                  <div className="text-sm text-gray-600">Reducción desperdicio</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold mb-8"
            style={{ color: PEACOCK }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            AVBETOS Intelligence System
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Sistema integral patentado que combina IA emocional, pagos biométricos ADBET,
            y tecnología de avatar 3D para revolucionar la experiencia de compra digital.
            Conectado con Fashion Trend Tracker (FTT) para tendencias en tiempo real.
          </motion.p>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full p-8 relative shadow-xl m-6"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
              <img 
                src={selected.img} 
                alt={selected.name} 
                className="w-full h-80 object-cover rounded-lg mb-6"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x400/0F5E68/white?text=TRYONYOU";
                }}
              />
              <h3 className="text-3xl font-bold mb-2">{selected.name}</h3>
              <p className="text-2xl font-bold mb-4" style={{ color: GOLD }}>{selected.price}</p>
              <p className="text-gray-600 mb-6">
                Prenda diseñada con tecnología AVBETOS. Cada pieza se ajusta perfectamente
                a tu figura gracias a nuestro sistema de análisis 3D y recomendaciones emocionales PAU.
              </p>
              <div className="flex space-x-4">
                <motion.button
                  className="flex-1 py-3 rounded-xl text-white font-semibold"
                  style={{ backgroundColor: PEACOCK }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    alert("¡Añadido al Armario Inteligente! 🎉");
                    setSelected(null);
                  }}
                >
                  Añadir al Armario Inteligente
                </motion.button>
                <motion.button
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelected(null);
                    setShowPayment(true);
                  }}
                >
                  Pago ADBET
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && <PaymentModal />}
      </AnimatePresence>

      {/* Avatar Pau */}
      <AvatarPau />
    </div>
  );
}
