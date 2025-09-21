import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRecommendations } from '../hooks/useApi.js';
import { useAuth } from '../utils/auth.js';

const TURQUESA_PASTEL = "#7DD9DC";
const BLANCO_PASTEL = "#F4F6F7";
const PLATA_MATE = "#D5DADD";
const GRAFITO_GRIS = "#4B4F52";

export default function RecommendationsDemo() {
  const [userId, setUserId] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  const { recommendations, loading, error, retry } = useRecommendations(userId);
  const { isAuthenticated, user, login, logout } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const result = await login(loginData);
    if (result.success) {
      setShowLogin(false);
      setLoginData({ email: '', password: '' });
    }
  };

  const handleTestRecommendations = () => {
    // Simulate testing with different user IDs that might cause different errors
    const testIds = ['user123', 'invalid_user', 'timeout_user'];
    const randomId = testIds[Math.floor(Math.random() * testIds.length)];
    setUserId(randomId);
  };

  return (
    <section id="recommendations" className="py-16 px-6" style={{ backgroundColor: PLATA_MATE }}>
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8"
          style={{ color: TURQUESA_PASTEL }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Sistema de Recomendaciones con Manejo de Errores
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Authentication Section */}
          <motion.div
            className="rounded-2xl p-6 shadow-lg"
            style={{ backgroundColor: BLANCO_PASTEL }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: GRAFITO_GRIS }}>
              Autenticación con Manejo de Errores
            </h3>
            
            {!isAuthenticated ? (
              <>
                {!showLogin ? (
                  <div className="text-center">
                    <p className="mb-4" style={{ color: GRAFITO_GRIS, opacity: 0.7 }}>
                      Debes iniciar sesión para acceder a las recomendaciones personalizadas.
                    </p>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="px-6 py-2 rounded-lg text-white font-medium"
                      style={{ 
                        background: `linear-gradient(145deg, ${TURQUESA_PASTEL}, #6cc6c9)`,
                        boxShadow: '0 4px 12px rgba(125, 217, 220, 0.4)'
                      }}
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: GRAFITO_GRIS }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 rounded border border-gray-300"
                        placeholder="demo@tryonu.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: GRAFITO_GRIS }}>
                        Contraseña
                      </label>
                      <input
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full px-3 py-2 rounded border border-gray-300"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded text-white text-sm"
                        style={{ backgroundColor: TURQUESA_PASTEL }}
                      >
                        Entrar
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLogin(false)}
                        className="px-4 py-2 rounded text-sm"
                        style={{ backgroundColor: PLATA_MATE, color: GRAFITO_GRIS }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium" style={{ color: GRAFITO_GRIS }}>
                      Bienvenido, {user?.name || 'Usuario'}
                    </p>
                    <p className="text-sm" style={{ color: GRAFITO_GRIS, opacity: 0.7 }}>
                      {user?.email || 'usuario@demo.com'}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="px-3 py-1 rounded text-sm"
                    style={{ backgroundColor: PLATA_MATE, color: GRAFITO_GRIS }}
                  >
                    Cerrar Sesión
                  </button>
                </div>
                <div className="p-3 rounded" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                  ✓ Autenticado correctamente. Token válido y gestionado automáticamente.
                </div>
              </div>
            )}
          </motion.div>

          {/* Recommendations Section */}
          <motion.div
            className="rounded-2xl p-6 shadow-lg"
            style={{ backgroundColor: BLANCO_PASTEL }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: GRAFITO_GRIS }}>
              API de Recomendaciones con Timeout
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: GRAFITO_GRIS }}>
                  ID de Usuario (Demo)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="flex-1 px-3 py-2 rounded border border-gray-300"
                    placeholder="Ingresa un ID de usuario"
                  />
                  <button
                    onClick={handleTestRecommendations}
                    className="px-4 py-2 rounded text-white text-sm"
                    style={{ backgroundColor: TURQUESA_PASTEL }}
                  >
                    Test Auto
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center p-4">
                  <svg className="animate-spin h-5 w-5 mr-3" style={{ color: TURQUESA_PASTEL }} viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span style={{ color: GRAFITO_GRIS }}>Cargando recomendaciones...</span>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="p-3 rounded" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <strong>Error:</strong> {error}
                    </div>
                    <button
                      onClick={retry}
                      className="ml-2 px-2 py-1 rounded text-xs text-white"
                      style={{ backgroundColor: '#dc3545' }}
                    >
                      Reintentar
                    </button>
                  </div>
                </div>
              )}

              {/* Success State */}
              {!loading && !error && recommendations.length > 0 && (
                <div className="p-3 rounded" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                  <strong>✓ Éxito:</strong> Se cargaron {recommendations.length} recomendaciones con timeout de 20s y retry automático.
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && recommendations.length === 0 && userId && (
                <div className="p-3 rounded" style={{ backgroundColor: '#fff3cd', color: '#856404' }}>
                  <strong>⚠ Info:</strong> No se encontraron recomendaciones para este usuario.
                </div>
              )}

              {/* Demo Info */}
              <div className="mt-4 p-3 rounded text-xs" style={{ backgroundColor: PLATA_MATE, color: GRAFITO_GRIS }}>
                <strong>Demo:</strong> Esta sección demuestra el manejo de timeouts (20s), reintentos automáticos y manejo de errores de autenticación (token inválido = logout automático).
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}