import React from 'react';

export default function PAUPage() {
  return (
    <div className="module-page">
      <div className="module-header">
        <h1>PAU</h1>
        <p>Personal Assistant Universe - Your AI Fashion Companion</p>
      </div>
      
      <div className="pau-container">
        <div 
          className="pau-avatar"
          style={{
            background: 'linear-gradient(135deg, var(--color-peacock-teal), var(--color-gold))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '6rem'
          }}
        >
          🦚
        </div>

        <div className="pau-storyline">
          <h2 style={{ color: 'var(--color-gold)', marginBottom: '1rem', textAlign: 'center' }}>
            Meet PAU
          </h2>
          <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
            PAU (Personal Assistant Universe) is your intelligent fashion companion, 
            designed to understand your unique style preferences and help you discover 
            the perfect looks for every occasion.
          </p>
          <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
            Powered by advanced AI, PAU learns from your choices, adapts to your 
            lifestyle, and connects you with the TRYONYOU ecosystem for a seamless 
            hyper-real fashion experience.
          </p>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            marginTop: '2rem',
            padding: '1rem',
            background: 'var(--color-deep-black)',
            borderRadius: '8px',
            border: '1px solid var(--color-neon-cyan)'
          }}>
            <h3 style={{ color: 'var(--color-neon-cyan)', marginBottom: '0.5rem' }}>PAU Capabilities</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#2ecc71' }}>✓</span>
              <span>Style Analysis & Recommendations</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#2ecc71' }}>✓</span>
              <span>Virtual Try-On Assistance</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#2ecc71' }}>✓</span>
              <span>Wardrobe Management</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#2ecc71' }}>✓</span>
              <span>Trend Insights & Alerts</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#2ecc71' }}>✓</span>
              <span>Shopping Companion</span>
            </div>
          </div>

          <button style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            width: '100%',
            background: 'var(--color-gold)',
            color: 'var(--color-deep-black)',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Start Conversation with PAU
          </button>
        </div>
      </div>
    </div>
  );
}
