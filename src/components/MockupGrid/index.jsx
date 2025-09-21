import React, { useState, useEffect } from 'react';

export default function MockupGrid() {
  const [mockups, setMockups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de mockups desde backend
    const loadMockups = async () => {
      try {
        // Generar 36 mockups placeholder
        const mockupData = Array.from({ length: 36 }, (_, i) => ({
          id: i + 1,
          name: `Mockup ${i + 1}`,
          image: `https://via.placeholder.com/300x400/7DD9DC/FFFFFF?text=Mockup+${i + 1}`,
          style: ['Casual', 'Formal', 'Deportivo', 'Elegante'][i % 4],
          color: ['Turquesa', 'Blanco', 'Grafito', 'Negro'][i % 4]
        }));
        
        // Simular delay de carga
        setTimeout(() => {
          setMockups(mockupData);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error cargando mockups:', error);
        setLoading(false);
      }
    };

    loadMockups();
  }, []);

  if (loading) {
    return (
      <section className="mockup-grid futuristic" style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #F4F6F7 0%, #D5DADD 100%)',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #D5DADD',
          borderTop: '4px solid #7DD9DC',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }}></div>
        <p style={{ color: '#4B4F52', fontSize: '1.2rem' }}>
          Generando mockups personalizados...
        </p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="mockup-grid futuristic" style={{
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, #F4F6F7 0%, #D5DADD 100%)'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '3rem',
        background: 'linear-gradient(45deg, #7DD9DC, #6cc6c9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Mockups Generados por TRYONYOU
      </h2>

      <div className="grid holographic-glow" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {mockups.map((mockup, index) => (
          <div
            key={mockup.id}
            style={{
              background: 'rgba(244, 246, 247, 0.95)',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(125, 217, 220, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(125, 217, 220, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s`
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px) scale(1.02)';
              e.target.style.boxShadow = '0 12px 40px rgba(125, 217, 220, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 32px rgba(125, 217, 220, 0.2)';
            }}
          >
            <div style={{
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src={mockup.image} 
                alt={mockup.name}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              />
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'linear-gradient(45deg, #7DD9DC, #6cc6c9)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '15px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {mockup.style}
              </div>
            </div>
            
            <div style={{ padding: '1rem' }}>
              <h3 style={{
                margin: '0 0 0.5rem 0',
                color: '#4B4F52',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                {mockup.name}
              </h3>
              <p style={{
                margin: 0,
                color: '#4B4F52',
                opacity: 0.7,
                fontSize: '0.9rem'
              }}>
                Color: {mockup.color}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}