import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./components/ContactForm.jsx";
import RecommendationsDemo from "./components/RecommendationsDemo.jsx";

// New TryOnMe Color Palette
const TURQUESA_PASTEL = "#7DD9DC";
const BLANCO_PASTEL = "#F4F6F7";
const PLATA_MATE = "#D5DADD";
const GRAFITO_GRIS = "#4B4F52";
const NEGRO_SUAVE = "#2B2B2B";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans text-gray-900" style={{ backgroundColor: BLANCO_PASTEL, color: GRAFITO_GRIS }}>
      {/* Mobile Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <motion.h2 
            className="text-xl font-bold"
            style={{ color: TURQUESA_PASTEL }}
          >
            TryonU
          </motion.h2>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg"
            style={{ backgroundColor: TURQUESA_PASTEL }}
            aria-label="Toggle mobile menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="flex flex-col items-center justify-center w-6 h-6"
            >
              <motion.span
                className="w-6 h-0.5 bg-white block"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white block mt-1"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white block mt-1"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 w-80 h-full"
              style={{ backgroundColor: BLANCO_PASTEL }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-6 pt-20">
                <nav className="space-y-6">
                  <motion.a
                    href="#home"
                    className="block text-lg font-medium py-3 px-4 rounded-lg transition-colors"
                    style={{ color: GRAFITO_GRIS }}
                    whileHover={{ backgroundColor: PLATA_MATE }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Inicio
                  </motion.a>
                  <motion.a
                    href="#collection"
                    className="block text-lg font-medium py-3 px-4 rounded-lg transition-colors"
                    style={{ color: GRAFITO_GRIS }}
                    whileHover={{ backgroundColor: PLATA_MATE }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Colección
                  </motion.a>
                  <motion.a
                    href="#tryon"
                    className="block text-lg font-medium py-3 px-4 rounded-lg transition-colors"
                    style={{ color: GRAFITO_GRIS }}
                    whileHover={{ backgroundColor: PLATA_MATE }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    TryOn Virtual
                  </motion.a>
                  <motion.a
                    href="#recommendations"
                    className="block text-lg font-medium py-3 px-4 rounded-lg transition-colors"
                    style={{ color: GRAFITO_GRIS }}
                    whileHover={{ backgroundColor: PLATA_MATE }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Recomendaciones
                  </motion.a>
                  <motion.a
                    href="#contact"
                    className="block text-lg font-medium py-3 px-4 rounded-lg transition-colors"
                    style={{ color: GRAFITO_GRIS }}
                    whileHover={{ backgroundColor: PLATA_MATE }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contacto
                  </motion.a>
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    className="w-full py-3 px-4 rounded-lg text-white font-medium"
                    style={{ 
                      background: `linear-gradient(145deg, ${TURQUESA_PASTEL}, #6cc6c9)`,
                      boxShadow: '0 4px 12px rgba(125, 217, 220, 0.4)'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Acceder al Armario Digital
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="h-screen flex flex-col justify-center items-center text-center pt-16 lg:pt-0" style={{ background: `linear-gradient(to bottom, ${BLANCO_PASTEL}, ${PLATA_MATE})` }}>
        <motion.h1
          className="text-5xl font-bold mb-4"
          style={{ color: TURQUESA_PASTEL }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          TryonU Luxury Digital Workflow Experience
        </motion.h1>
        <motion.p
          className="text-lg max-w-2xl"
          style={{ color: GRAFITO_GRIS }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Vive el futuro de la moda digital. Colecciones interactivas,
          pruebas virtuales y experiencias inmersivas.
        </motion.p>
      </section>
      <section id="collection" className="py-16 px-6" style={{ backgroundColor: PLATA_MATE }}>
        <h2 className="text-3xl font-semibold text-center mb-10" style={{ color: TURQUESA_PASTEL }}>
          Colección Exclusiva
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((p) => (
            <motion.div
              key={p.id}
              className="rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
              style={{ backgroundColor: BLANCO_PASTEL }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(p)}
            >
              <img src={p.img} alt={p.name} className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold" style={{ color: GRAFITO_GRIS }}>{p.name}</h3>
                <p style={{ color: GRAFITO_GRIS, opacity: 0.7 }}>{p.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-20 text-center" style={{ backgroundColor: BLANCO_PASTEL }}>
        <h2 className="text-3xl font-bold mb-6" style={{ color: TURQUESA_PASTEL }}>
          Sobre TryonU
        </h2>
        <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: GRAFITO_GRIS }}>
          TryonU redefine el lujo en la moda digital, fusionando experiencia
          interactiva, sostenibilidad y la tecnología más avanzada.
          Nuestro sistema conecta armarios inteligentes, pagos seguros ADBET
          y actualizaciones en tiempo real con el Fashion Trend Tracker (FTT).
        </p>
      </section>
      
      {/* Recommendations Demo with API timeout and auth error handling */}
      <RecommendationsDemo />
      
      {/* Contact Form with API timeout and error handling */}
      <ContactForm />
      {selected && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="rounded-2xl max-w-lg w-full p-6 relative shadow-lg glass"
            style={{ backgroundColor: BLANCO_PASTEL }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <button
              className="absolute top-3 right-4 hover:text-black"
              style={{ color: GRAFITO_GRIS }}
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <img src={selected.img} alt={selected.name} className="w-full h-80 object-cover rounded-lg" />
            <h3 className="text-2xl font-bold mt-4" style={{ color: GRAFITO_GRIS }}>{selected.name}</h3>
            <p className="text-lg mt-2" style={{ color: GRAFITO_GRIS, opacity: 0.7 }}>{selected.price}</p>
            <button
              className="mt-6 px-6 py-2 rounded-xl text-white"
              style={{ 
                background: `linear-gradient(145deg, ${TURQUESA_PASTEL}, #6cc6c9)`,
                boxShadow: '0 4px 12px rgba(125, 217, 220, 0.4)'
              }}
            >
              Añadir al Armario Inteligente
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
