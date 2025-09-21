import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContactForm } from '../hooks/useApi.js';

const TURQUESA_PASTEL = "#7DD9DC";
const BLANCO_PASTEL = "#F4F6F7";
const PLATA_MATE = "#D5DADD";
const GRAFITO_GRIS = "#4B4F52";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { submitForm, isSubmitting, error, success, reset } = useContactForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    const result = await submitForm(formData);
    
    if (result.success) {
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleReset = () => {
    reset();
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 px-6" style={{ backgroundColor: BLANCO_PASTEL }}>
      <div className="max-w-2xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8"
          style={{ color: TURQUESA_PASTEL }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contacto
        </motion.h2>

        <motion.div
          className="rounded-2xl p-8 shadow-lg"
          style={{ backgroundColor: PLATA_MATE }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {success && (
            <motion.div
              className="mb-6 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              ¡Mensaje enviado con éxito! Te contactaremos pronto.
            </motion.div>
          )}

          {error && (
            <motion.div
              className="mb-6 p-4 rounded-lg bg-red-100 border border-red-300 text-red-800"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start">
                <span>{error}</span>
                <button
                  onClick={handleReset}
                  className="ml-2 text-red-600 hover:text-red-800 font-medium"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-2"
                style={{ color: GRAFITO_GRIS }}
              >
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-turquesa-pastel focus:border-transparent transition-colors"
                style={{ backgroundColor: BLANCO_PASTEL }}
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: GRAFITO_GRIS }}
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-turquesa-pastel focus:border-transparent transition-colors"
                style={{ backgroundColor: BLANCO_PASTEL }}
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-medium mb-2"
                style={{ color: GRAFITO_GRIS }}
              >
                Mensaje *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-turquesa-pastel focus:border-transparent transition-colors resize-vertical"
                style={{ backgroundColor: BLANCO_PASTEL }}
                placeholder="Cuéntanos sobre tu interés en TryonU..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: isSubmitting 
                  ? '#9CA3AF' 
                  : `linear-gradient(145deg, ${TURQUESA_PASTEL}, #6cc6c9)`,
                boxShadow: isSubmitting 
                  ? 'none' 
                  : '0 4px 12px rgba(125, 217, 220, 0.4)'
              }}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Enviar Mensaje'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: GRAFITO_GRIS, opacity: 0.7 }}>
              * Campos obligatorios. Respetamos tu privacidad y nunca compartiremos tu información.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}