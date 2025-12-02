import React from 'react';

const outfitBlocks = [
  { id: 1, title: 'Summer Elegance', type: 'Casual Chic' },
  { id: 2, title: 'Urban Professional', type: 'Business Wear' },
  { id: 3, title: 'Evening Glamour', type: 'Formal Attire' },
  { id: 4, title: 'Weekend Vibes', type: 'Casual Comfort' }
];

export default function DemoPage() {
  const handleTryOutfit = (outfitTitle) => {
    alert(`Try-on experience for "${outfitTitle}" coming soon!`);
  };

  const handleStartExperience = () => {
    alert('Interactive try-on experience coming soon!');
  };

  return (
    <div className="demo-page">
      <section className="demo-hero" aria-label="Demo page hero">
        <h1>Fashion Demo Experience</h1>
        <p>Try on outfits virtually with TRYONYOU technology</p>
      </section>

      <section className="outfit-showcase" aria-label="Featured outfits">
        <h2>Featured Outfits</h2>
        <div className="outfit-grid">
          {outfitBlocks.map((outfit) => (
            <div key={outfit.id} className="outfit-card">
              <div className="outfit-image">
                <div className="placeholder-image">👔</div>
              </div>
              <div className="outfit-info">
                <h3>{outfit.title}</h3>
                <p>{outfit.type}</p>
                <button 
                  className="btn-secondary" 
                  onClick={() => handleTryOutfit(outfit.title)}
                  aria-label={`Try ${outfit.title} outfit`}
                >
                  Try Outfit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="animation-section" aria-label="Interactive animation">
        <h2>See The Magic</h2>
        <div className="animation-container">
          <div className="animation-placeholder">
            <p>Interactive Try-On Animation</p>
            <button 
              className="btn-primary" 
              onClick={handleStartExperience}
              aria-label="Start interactive try-on experience"
            >
              Start Experience
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
