import React from 'react';

const fashionItems = [
  {
    id: 1,
    title: 'Summer Elegance',
    description: 'Light fabrics meet sophisticated design',
    image: '/assets/tryonyou/fashion-1.webp'
  },
  {
    id: 2,
    title: 'Urban Street',
    description: 'Contemporary street style collection',
    image: '/assets/tryonyou/fashion-2.webp'
  },
  {
    id: 3,
    title: 'Classic Tailoring',
    description: 'Timeless pieces for every occasion',
    image: '/assets/tryonyou/fashion-3.webp'
  },
  {
    id: 4,
    title: 'Evening Glamour',
    description: 'Stunning looks for special moments',
    image: '/assets/tryonyou/fashion-4.webp'
  }
];

export default function FashionGrid() {
  return (
    <section id="explore" className="section bg-bone">
      <div className="container">
        <div className="section-header">
          <h2>Discover Your Style</h2>
          <p>Explore our curated collection and try on any outfit virtually with AI precision</p>
        </div>
        <div className="fashion-grid">
          {fashionItems.map((item) => (
            <article key={item.id} className="fashion-card">
              <div className="fashion-card-image">
                <div 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: `linear-gradient(135deg, #2d2d2d 0%, #4a4a4a 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#c9a227',
                    fontSize: '3rem'
                  }}
                >
                  👗
                </div>
              </div>
              <div className="fashion-card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="fashion-card-action">
                  <button className="btn btn-primary">Try Outfit</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
