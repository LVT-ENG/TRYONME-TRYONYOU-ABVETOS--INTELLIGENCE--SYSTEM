import React, { useState, useEffect } from 'react';

export default function PauShop() {
  const [recommendations, setRecommendations] = useState([]);
  const [fttTrends, setFttTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const response = await fetch('/api/recommendations');
        const data = await response.json();
        setRecommendations(data.recommendations || []);
        setFttTrends(data.ftt_trends || []);
      } catch (error) {
        console.error('Error cargando recomendaciones:', error);
        // Fallback data
        setRecommendations([
          { item: "Camisa entallada", category: "Armario Inteligente", price: "€89" },
          { item: "Pantalón sin bolsillos visibles", category: "Básicos", price: "€65" },
          { item: "Look sostenible", category: "Armario Solidario", price: "€120" }
        ]);
        setFttTrends(["Minimalismo", "Sostenibilidad", "Tech-wear"]);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  const handleAdbetPurchase = (item) => {
    console.log('Comprando con ADBET:', item);
    // Aquí se integraría con el sistema de pagos ADBET
    alert(`Redirigiendo a ADBET para comprar: ${item.item}`);
  };

  if (loading) {
    return (
      <section className="pau-shop premium" style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #2B2B2B 0%, #4B4F52 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #D5DADD',
          borderTop: '3px solid #7DD9DC',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '2rem auto'
        }}></div>
        <p>Pau está analizando tu perfil...</p>
      </section>
    );
  }

  return (
    <section className="pau-shop premium" style={{
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, #2B2B2B 0%, #4B4F52 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efectos de fondo holográfico */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(125, 217, 220, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(125, 217, 220, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(125, 217, 220, 0.05) 0%, transparent 50%)
        `,
        animation: 'holographicShift 4s ease-in-out infinite'
      }}></div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #7DD9DC, #F4F6F7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Pau recomienda para ti
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: '1.2rem',
          marginBottom: '3rem',
          color: '#D5DADD',
          opacity: 0.9
        }}>
          Basado en tu avatar 3D, tus gustos y tendencias (FTT).
        </p>

        {/* Tendencias FTT */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h3 style={{ 
            color: '#7DD9DC', 
            marginBottom: '1rem',
            fontSize: '1.3rem'
          }}>
            Tendencias FTT Detectadas:
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            {fttTrends.map((trend, index) => (
              <span
                key={index}
                style={{
                  background: 'linear-gradient(45deg, #7DD9DC, #6cc6c9)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}
              >
                {trend}
              </span>
            ))}
          </div>
        </div>

        {/* Lista de recomendaciones */}
        <div style={{
          background: 'rgba(244, 246, 247, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(125, 217, 220, 0.3)'
        }}>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {recommendations.map((recommendation, index) => (
              <li
                key={index}
                style={{
                  background: 'rgba(244, 246, 247, 0.1)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  border: '1px solid rgba(125, 217, 220, 0.2)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  animation: `slideInLeft 0.6s ease forwards ${index * 0.2}s`
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(125, 217, 220, 0.1)';
                  e.target.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(244, 246, 247, 0.1)';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                <div>
                  <h4 style={{ 
                    margin: '0 0 0.5rem 0',
                    color: '#F4F6F7',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    {recommendation.item}
                  </h4>
                  <p style={{ 
                    margin: 0,
                    color: '#7DD9DC',
                    fontSize: '0.9rem'
                  }}>
                    {recommendation.category}
                  </p>
                  {recommendation.price && (
                    <p style={{ 
                      margin: '0.5rem 0 0 0',
                      color: '#D5DADD',
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}>
                      {recommendation.price}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleAdbetPurchase(recommendation)}
                  style={{
                    background: 'linear-gradient(145deg, #7DD9DC, #6cc6c9)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(125, 217, 220, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px) scale(1.05)';
                    e.target.style.boxShadow = '0 6px 20px rgba(125, 217, 220, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 4px 12px rgba(125, 217, 220, 0.3)';
                  }}
                >
                  Comprar con ADBET
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes holographicShift {
          0%, 100% { opacity: 0.3; transform: translateX(0) translateY(0); }
          25% { opacity: 0.5; transform: translateX(10px) translateY(-5px); }
          50% { opacity: 0.4; transform: translateX(-5px) translateY(10px); }
          75% { opacity: 0.6; transform: translateX(5px) translateY(-10px); }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}