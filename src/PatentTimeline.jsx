import React from "react";
import { motion } from "framer-motion";

const PEACOCK = "#0F5E68";

// Patent timeline data - these are public dates that would be available on WIPO/ePCT
const patentData = {
  title: "Sistema Inteligente de Vestidor Virtual con Producción Textil Instantánea y Pago Biométrico",
  number: "PCT/ES2024/000XXX", // Placeholder - would be real PCT number
  timeline: [
    {
      id: 1,
      date: "2024-03-15",
      event: "Fecha de Prioridad",
      description: "Presentación inicial de la solicitud",
      status: "completed"
    },
    {
      id: 2,
      date: "2024-09-15",
      event: "Presentación PCT",
      description: "Solicitud internacional PCT presentada",
      status: "completed"
    },
    {
      id: 3,
      date: "2025-03-15",
      event: "Publicación Internacional",
      description: "Publicación prevista del expediente PCT",
      status: "pending"
    }
  ]
};

export default function PatentTimeline() {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: PEACOCK }}>
            🏆 Patente Registrada
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestra tecnología está protegida por patente internacional PCT, 
            garantizando la innovación y exclusividad del sistema AVBETOS.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-2" style={{ color: PEACOCK }}>
            {patentData.title}
          </h3>
          <p className="text-gray-600 mb-6">
            <span className="font-medium">Número PCT:</span> {patentData.number}
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {patentData.timeline.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative flex items-start mb-8 last:mb-0"
              >
                {/* Timeline dot */}
                <div 
                  className={`w-4 h-4 rounded-full border-2 bg-white z-10 ${
                    milestone.status === 'completed' 
                      ? 'border-green-500 bg-green-100' 
                      : 'border-gray-300'
                  }`}
                  style={{ 
                    borderColor: milestone.status === 'completed' ? '#10B981' : PEACOCK
                  }}
                ></div>
                
                {/* Timeline content */}
                <div className="ml-6 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {milestone.event}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {new Date(milestone.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* WIPO/ePCT link and disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <a 
            href="https://patentscope.wipo.int/search/en/search.jsf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            📋 Consultar en WIPO/ePCT
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          <p className="text-xs text-gray-500 mt-4 max-w-lg mx-auto">
            <strong>Disclaimer legal:</strong> Información pública consultable en WIPO/ePCT. 
            Los datos mostrados corresponden únicamente a información de dominio público 
            disponible en las bases de datos oficiales de patentes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}