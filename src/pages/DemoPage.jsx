import React, { useState } from 'react';

const fashionItems = [
  { id: 1, name: 'Metallic Blazer', category: 'Outerwear', description: 'AI-designed evening blazer with adaptive fit' },
  { id: 2, name: 'Smart Dress', category: 'Dresses', description: 'Temperature-responsive fabric with elegant drape' },
  { id: 3, name: 'Tech Trousers', category: 'Bottoms', description: 'Biometric-sensing pants with comfort optimization' },
  { id: 4, name: 'Peacock Jacket', category: 'Outerwear', description: 'Signature piece with iridescent finish' },
  { id: 5, name: 'Flow Skirt', category: 'Bottoms', description: 'Movement-adapting design for all occasions' },
  { id: 6, name: 'Urban Top', category: 'Tops', description: 'Breathable smart fabric with clean lines' }
];

export default function DemoPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [tryingOn, setTryingOn] = useState(false);

  const handleTryOutfit = (item) => {
    setSelectedItem(item);
    setTryingOn(true);
    setTimeout(() => setTryingOn(false), 2000);
  };

  return (
    <div className="demo-page">
      <section className="demo-hero">
        <h1>Fashion Demo</h1>
        <p style={{ color: 'var(--subtle-text)', fontSize: '1.2rem' }}>
          Experience our AI-powered virtual try-on technology
        </p>
      </section>

      <div className="demo-container">
        <div className="demo-grid">
          {fashionItems.map((item, index) => (
            <div 
              key={item.id} 
              className="fashion-block animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="fashion-block-image">
                <span style={{ fontSize: '4rem' }}>👗</span>
              </div>
              <div className="fashion-block-content">
                <h3>{item.name}</h3>
                <p style={{ color: 'var(--peacock-accent)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  {item.category}
                </p>
                <p>{item.description}</p>
                <button 
                  className="btn btn-primary" 
                  style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                  onClick={() => handleTryOutfit(item)}
                >
                  Try Outfit
                </button>
              </div>
            </div>
          ))}
        </div>

        <section className="try-outfit-section">
          <h2>Virtual Try-On Experience</h2>
          <p style={{ color: 'var(--subtle-text)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Select any fashion item above and experience our revolutionary AI-powered virtual fitting room.
          </p>
          
          {selectedItem && (
            <div 
              className="animate-fadeInUp"
              style={{
                background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
                border: '1px solid var(--peacock-accent)',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '500px',
                margin: '0 auto'
              }}
            >
              <h3 style={{ color: 'var(--peacock-accent)', marginBottom: '1rem' }}>
                {tryingOn ? '✨ Processing...' : '✅ Ready to Wear'}
              </h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{selectedItem.name}</p>
              <p style={{ color: 'var(--subtle-text)' }}>{selectedItem.description}</p>
              {!tryingOn && (
                <p style={{ color: 'var(--peacock-gold)', marginTop: '1rem', fontStyle: 'italic' }}>
                  "Perfect fit detected. This look was made for you!"
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
