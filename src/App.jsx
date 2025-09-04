import React, { useState } from "react";
import { motion } from "framer-motion";

const PEACOCK = "#0F5E68";

const products = [
  { id: 1, name: "Luxury Jacket", price: "€1200", img: "https://via.placeholder.com/400x500" },
  { id: 2, name: "Digital Dress", price: "€980", img: "https://via.placeholder.com/400x500" },
  { id: 3, name: "Virtual Blazer", price: "€1500", img: "https://via.placeholder.com/400x500" },
  { id: 4, name: "AI Sneakers", price: "€680", img: "https://via.placeholder.com/400x500" },
  { id: 5, name: "LVT Coat", price: "€2200", img: "https://via.placeholder.com/400x500" },
  { id: 6, name: "TRYON Suit", price: "€1850", img: "https://via.placeholder.com/400x500" }
];

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="font-sans bg-white text-gray-900">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video_portada.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <div className="relative z-20 text-white">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            TryonU Luxury Digital Workflow Experience
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Vive el futuro de la moda digital. Colecciones interactivas,
            pruebas virtuales y experiencias inmersivas.
          </motion.p>
        </div>
      </section>

      {/* Avatar Pau Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-10" style={{ color: PEACOCK }}>
          Avatar Digital Pau
        </h2>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-6xl text-white">👤</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Avatar Pau</h3>
            <p className="text-gray-600">
              Asistente virtual inteligente para recomendaciones de moda personalizadas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Digital Wardrobes Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-10" style={{ color: PEACOCK }}>
          Armarios Digitales Inteligentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="bg-gray-50 rounded-2xl p-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl mb-4">👔</div>
            <h3 className="text-xl font-bold mb-2">Armario Formal</h3>
            <p className="text-gray-600">Colección de trajes y vestimenta formal</p>
          </motion.div>
          <motion.div
            className="bg-gray-50 rounded-2xl p-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl mb-4">👗</div>
            <h3 className="text-xl font-bold mb-2">Armario Casual</h3>
            <p className="text-gray-600">Ropa cómoda para el día a día</p>
          </motion.div>
          <motion.div
            className="bg-gray-50 rounded-2xl p-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl mb-4">🎩</div>
            <h3 className="text-xl font-bold mb-2">Armario Premium</h3>
            <p className="text-gray-600">Piezas exclusivas y de lujo</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-10" style={{ color: PEACOCK }}>
          Catálogo TryOnYou
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((p) => (
            <motion.div
              key={p.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(p)}
            >
              <img src={p.img} alt={p.name} className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-gray-500">{p.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ color: PEACOCK }}>
          Sobre TryonU
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
          TryonU redefine el lujo en la moda digital, fusionando experiencia
          interactiva, sostenibilidad y la tecnología más avanzada.
          Nuestro sistema conecta armarios inteligentes, pagos seguros ADBET
          y actualizaciones en tiempo real con el Fashion Trend Tracker (FTT).
        </p>
      </section>
      {selected && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-black"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <img src={selected.img} alt={selected.name} className="w-full h-80 object-cover rounded-lg" />
            <h3 className="text-2xl font-bold mt-4">{selected.name}</h3>
            <p className="text-lg text-gray-600 mt-2">{selected.price}</p>
            <button
              className="mt-6 px-6 py-2 rounded-xl text-white"
              style={{ backgroundColor: PEACOCK }}
            >
              Añadir al Armario Inteligente
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
