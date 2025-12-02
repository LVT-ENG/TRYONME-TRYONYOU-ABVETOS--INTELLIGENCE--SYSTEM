import React from 'react';
import Footer from '../components/Footer';

const stats = [
  { number: '€50M+', label: 'Market Opportunity' },
  { number: '3M+', label: 'Potential Users' },
  { number: '40%', label: 'Return Reduction' },
  { number: '5x', label: 'Engagement Increase' }
];

const features = [
  {
    title: 'AI-Powered Virtual Try-On',
    description: 'Advanced machine learning algorithms create hyper-realistic outfit visualizations on any body type.',
    icon: '🤖'
  },
  {
    title: 'Smart Wardrobe Management',
    description: 'Intelligent organization and outfit suggestions based on personal style and occasions.',
    icon: '👗'
  },
  {
    title: 'Sustainability Focus',
    description: 'Reduce fashion waste by making informed purchasing decisions with virtual fitting.',
    icon: '🌱'
  },
  {
    title: 'Emotional Fashion AI',
    description: 'Style recommendations that adapt to mood, weather, and social context.',
    icon: '💫'
  }
];

const teamHighlights = [
  'Tech veterans with 15+ years combined experience',
  'Fashion industry partnerships established',
  'Station F ecosystem member',
  'Pre-seed funding secured'
];

export default function StationFPage() {
  return (
    <main style={{ paddingTop: '60px' }}>
      {/* Hero Section */}
      <section className="station-f-hero">
        <div className="container">
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '3rem', 
              alignItems: 'center',
              minHeight: '60vh'
            }}
          >
            <div>
              <p 
                style={{ 
                  color: '#c9a227', 
                  fontSize: '0.9rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  marginBottom: '1rem' 
                }}
              >
                Station F Investment Deck
              </p>
              <h1 style={{ color: '#f5f2eb', fontSize: '3rem', marginBottom: '1.5rem' }}>
                <span style={{ color: '#c9a227' }}>TRYONYOU</span>
                <br />
                The Future of Fashion Tech
              </h1>
              <p style={{ color: '#f5f2eb', opacity: 0.9, fontSize: '1.2rem', lineHeight: 1.6 }}>
                Revolutionary AI-powered virtual try-on platform transforming how people discover and purchase fashion.
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button className="btn btn-primary">View Full Deck</button>
                <button className="btn btn-outline">Contact Us</button>
              </div>
            </div>
            <div 
              style={{ 
                background: 'rgba(201, 162, 39, 0.1)', 
                borderRadius: '24px', 
                padding: '3rem',
                border: '1px solid rgba(201, 162, 39, 0.3)'
              }}
            >
              <div className="stat-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="section bg-bone">
        <div className="container">
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '3rem' 
            }}
          >
            <div className="investor-block">
              <h3>The Problem</h3>
              <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                  📦 30-40% of online fashion purchases are returned
                </li>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                  🌍 Returns generate 5 billion pounds of waste annually
                </li>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                  💰 $550 billion lost by retailers to returns
                </li>
                <li style={{ padding: '0.75rem 0' }}>
                  😔 Customers frustrated with fit uncertainty
                </li>
              </ul>
            </div>
            <div className="investor-block">
              <h3>Our Solution</h3>
              <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                  ✅ AI virtual try-on with 95% accuracy
                </li>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                  ✅ Reduces returns by up to 40%
                </li>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                  ✅ Increases conversion rates by 3-5x
                </li>
                <li style={{ padding: '0.75rem 0' }}>
                  ✅ Sustainable fashion through informed choices
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Technology Highlights</h2>
            <p>Cutting-edge AI powering the next generation of fashion retail</p>
          </div>
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '2rem',
              marginTop: '2rem'
            }}
          >
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="investor-block" 
                style={{ marginBottom: 0 }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ color: '#4a4a4a' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Traction */}
      <section 
        className="section" 
        style={{ background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)' }}
      >
        <div className="container">
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '3rem',
              alignItems: 'center'
            }}
          >
            <div>
              <h2 style={{ color: '#f5f2eb', marginBottom: '1.5rem' }}>
                Why <span style={{ color: '#c9a227' }}>TRYONYOU</span>?
              </h2>
              <ul style={{ listStyle: 'none' }}>
                {teamHighlights.map((highlight, index) => (
                  <li 
                    key={index} 
                    style={{ 
                      color: '#f5f2eb', 
                      padding: '0.75rem 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <span style={{ color: '#c9a227' }}>✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <div 
              style={{ 
                background: 'rgba(201, 162, 39, 0.1)', 
                borderRadius: '24px', 
                padding: '2rem',
                border: '1px solid rgba(201, 162, 39, 0.3)',
                textAlign: 'center'
              }}
            >
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>Investment Opportunity</h3>
              <p style={{ color: '#f5f2eb', marginBottom: '2rem' }}>
                Seed round now open for strategic partners
              </p>
              <button className="btn btn-primary">Schedule Meeting</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section bg-bone" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>Ready to Discuss?</h2>
          <p style={{ color: '#4a4a4a', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            We're looking for visionary investors to join us in revolutionizing the fashion industry.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary">Request Pitch Deck</button>
            <button className="btn btn-outline" style={{ borderColor: '#2d2d2d', color: '#2d2d2d' }}>
              Contact Team
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
