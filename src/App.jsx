import React, { useState } from "react";
import { motion } from "framer-motion";
import BodyMeasurement from "./components/BodyMeasurement";

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
  const [showMeasurement, setShowMeasurement] = useState(false);
  const [userMeasurements, setUserMeasurements] = useState(null);

  const handleMeasurementComplete = (measurements) => {
    setUserMeasurements(measurements);
    setShowMeasurement(false);
  };

  if (showMeasurement) {
    return <BodyMeasurement onMeasurementComplete={handleMeasurementComplete} />;
  }

  return (
    <div className="font-sans bg-white text-gray-900">
      <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-white to-gray-100">
        <motion.h1
          className="text-5xl font-bold mb-4"
          style={{ color: PEACOCK }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          TryonU Luxury Digital Workflow Experience
        </motion.h1>
        <motion.p
          className="text-lg max-w-2xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Vive el futuro de la moda digital. Colecciones interactivas,
          pruebas virtuales y experiencias inmersivas.
        </motion.p>

        {/* Add measurement system button */}
        <motion.button
          onClick={() => setShowMeasurement(true)}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-[#0F5E68] to-[#1a7a85] text-white rounded-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          🔬 Sistema de Medición Corporal con Avatar Pau
        </motion.button>

        {userMeasurements && (
          <motion.div
            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="font-semibold text-green-800 mb-2">✅ Medidas Completadas</h3>
            <div className="text-sm text-green-700">
              <p>Altura: {userMeasurements.altura_cm} cm</p>
              <p>Precisión: ±{userMeasurements.precision_mm} mm</p>
              <p>Avatar Pau configurado</p>
            </div>
          </motion.div>
        )}
      </section>
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-10" style={{ color: PEACOCK }}>
          Colección Exclusiva
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
