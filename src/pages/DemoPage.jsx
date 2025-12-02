import React from 'react';
import Footer from '../components/Footer';

const demoOutfits = [
  { id: 1, name: 'Casual Friday', category: 'Casual' },
  { id: 2, name: 'Business Elite', category: 'Formal' },
  { id: 3, name: 'Weekend Vibes', category: 'Casual' },
  { id: 4, name: 'Evening Star', category: 'Formal' },
  { id: 5, name: 'Sport Active', category: 'Athletic' },
  { id: 6, name: 'Bohemian Dream', category: 'Casual' }
];

export default function DemoPage() {
  return (
    <main style={{ paddingTop: '60px' }}>
      {/* Demo Hero */}
      <section 
        className="hero" 
        style={{ 
          minHeight: '50vh',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        }}
      >
        <div className="hero-content">
          <h1 style={{ color: '#c9a227' }}>Virtual Try-On Demo</h1>
          <p style={{ color: '#f5f2eb' }}>
            Experience the future of fashion shopping with our AI-powered virtual fitting room
          </p>
        </div>
      </section>

      {/* Demo Instructions */}
      <section className="section bg-bone">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Three simple steps to your perfect fit</p>
          </div>
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem',
              marginTop: '2rem'
            }}
          >
            <div 
              style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                background: 'white', 
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <div 
                style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem' 
                }}
              >
                📸
              </div>
              <h3>1. Upload Photo</h3>
              <p style={{ color: '#4a4a4a' }}>Take or upload a full-body photo</p>
            </div>
            <div 
              style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                background: 'white', 
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <div 
                style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem' 
                }}
              >
                👗
              </div>
              <h3>2. Select Outfit</h3>
              <p style={{ color: '#4a4a4a' }}>Choose from our curated collection</p>
            </div>
            <div 
              style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                background: 'white', 
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <div 
                style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem' 
                }}
              >
                ✨
              </div>
              <h3>3. See Results</h3>
              <p style={{ color: '#4a4a4a' }}>AI generates your virtual try-on</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Outfits Grid */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Available Outfits</h2>
            <p>Select an outfit to try on virtually</p>
          </div>
          <div className="fashion-grid">
            {demoOutfits.map((outfit) => (
              <article key={outfit.id} className="fashion-card">
                <div className="fashion-card-image">
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      background: `linear-gradient(135deg, #2d2d2d 0%, #4a4a4a 100%)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#c9a227',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ fontSize: '3rem' }}>👔</span>
                    <span 
                      style={{ 
                        fontSize: '0.75rem', 
                        background: 'rgba(201, 162, 39, 0.2)', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '1rem' 
                      }}
                    >
                      {outfit.category}
                    </span>
                  </div>
                </div>
                <div className="fashion-card-content">
                  <h3>{outfit.name}</h3>
                  <p>Virtual try-on ready</p>
                  <div className="fashion-card-action">
                    <button className="btn btn-primary">Try Outfit</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="section" 
        style={{ 
          background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
          textAlign: 'center'
        }}
      >
        <div className="container">
          <h2 style={{ color: '#f5f2eb', marginBottom: '1rem' }}>
            Ready to Transform Your Shopping Experience?
          </h2>
          <p style={{ color: '#f5f2eb', opacity: 0.8, marginBottom: '2rem' }}>
            Join thousands discovering their perfect style with TRYONYOU
          </p>
          <button className="btn btn-primary">Get Started Free</button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
