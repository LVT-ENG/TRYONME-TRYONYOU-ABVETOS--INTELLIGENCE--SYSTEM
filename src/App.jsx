import React, { useState } from "react";

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

  return (
    <div className="font-sans text-gray-900" style={{ backgroundColor: BLANCO_PASTEL, color: GRAFITO_GRIS }}>
      <section className="h-screen flex flex-col justify-center items-center text-center" style={{ background: `linear-gradient(to bottom, ${BLANCO_PASTEL}, ${PLATA_MATE})` }}>
        <h1
          className="text-5xl font-bold mb-4"
          style={{ color: TURQUESA_PASTEL }}
        >
          TryonU Luxury Digital Workflow Experience
        </h1>
        <p
          className="text-lg max-w-2xl"
          style={{ color: GRAFITO_GRIS }}
        >
          Vive el futuro de la moda digital. Colecciones interactivas,
          pruebas virtuales y experiencias inmersivas.
        </p>
      </section>
      <section className="py-16 px-6" style={{ backgroundColor: PLATA_MATE }}>
        <h2 className="text-3xl font-semibold text-center mb-10" style={{ color: TURQUESA_PASTEL }}>
          Colección Exclusiva
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden transition-transform hover:scale-105"
              style={{ backgroundColor: BLANCO_PASTEL }}
              onClick={() => setSelected(p)}
            >
              <img src={p.img} alt={p.name} className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold" style={{ color: GRAFITO_GRIS }}>{p.name}</h3>
                <p style={{ color: GRAFITO_GRIS, opacity: 0.7 }}>{p.price}</p>
              </div>
            </div>
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
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <div
            className="rounded-2xl max-w-lg w-full p-6 relative shadow-lg"
            style={{ backgroundColor: BLANCO_PASTEL }}
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
          </div>
        </div>
      )}
    </div>
  );
}
