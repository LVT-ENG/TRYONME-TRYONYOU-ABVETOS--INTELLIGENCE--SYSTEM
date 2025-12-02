import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const availableItems = [
  { id: 1, name: 'Vintage Denim Jacket', donor: 'Marie L.', condition: 'Excellent', size: 'M', category: 'Outerwear' },
  { id: 2, name: 'Organic Cotton Dress', donor: 'Sophie K.', condition: 'Good', size: 'S', category: 'Dresses' },
  { id: 3, name: 'Recycled Wool Coat', donor: 'Jean P.', condition: 'Very Good', size: 'L', category: 'Outerwear' },
  { id: 4, name: 'Upcycled Silk Blouse', donor: 'Claire R.', condition: 'Excellent', size: 'M', category: 'Tops' },
  { id: 5, name: 'Sustainable Linen Pants', donor: 'Pierre M.', condition: 'Good', size: 'L', category: 'Bottoms' },
  { id: 6, name: 'Handmade Scarf', donor: 'Anna T.', condition: 'New', size: 'One Size', category: 'Accessories' }
];

const impactStats = {
  itemsShared: 1247,
  kgCO2Saved: 3456,
  communityMembers: 892,
  circulationsPerMonth: 156
};

export default function SolidarityWardrobe() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="page solidarity-page">
      <section className="page-hero">
        <div className="container">
          <div className="page-badge">🤝 Community Fashion</div>
          <h1>Solidarity Wardrobe</h1>
          <p className="page-subtitle">
            Share fashion, reduce waste, build community
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Impact Dashboard */}
          <div className="impact-section">
            <h2>🌍 Community Impact</h2>
            <div className="impact-grid">
              <div className="impact-card">
                <span className="impact-icon">👕</span>
                <span className="impact-number">{impactStats.itemsShared.toLocaleString()}</span>
                <span className="impact-label">Items Shared</span>
              </div>
              <div className="impact-card">
                <span className="impact-icon">🌿</span>
                <span className="impact-number">{impactStats.kgCO2Saved.toLocaleString()}</span>
                <span className="impact-label">kg CO₂ Saved</span>
              </div>
              <div className="impact-card">
                <span className="impact-icon">👥</span>
                <span className="impact-number">{impactStats.communityMembers.toLocaleString()}</span>
                <span className="impact-label">Community Members</span>
              </div>
              <div className="impact-card">
                <span className="impact-icon">🔄</span>
                <span className="impact-number">{impactStats.circulationsPerMonth}</span>
                <span className="impact-label">Monthly Circulations</span>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="how-section">
            <h2>🔄 How It Works</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Donate</h3>
                <p>Share items from your Smart Wardrobe with the community</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3>Browse</h3>
                <p>Discover pre-loved fashion pieces from other members</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Request</h3>
                <p>Request items and connect with donors</p>
              </div>
              <div className="step-card">
                <div className="step-number">4</div>
                <h3>Share</h3>
                <p>Keep fashion circulating in the community</p>
              </div>
            </div>
          </div>

          {/* Available Items */}
          <div className="items-section">
            <h2>👗 Available Now</h2>
            <div className="items-grid">
              {availableItems.map(item => (
                <div 
                  key={item.id} 
                  className={`item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="item-image">
                    <span>👔</span>
                  </div>
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-donor">From {item.donor}</p>
                    <div className="item-meta">
                      <span className="item-condition">{item.condition}</span>
                      <span className="item-size">Size: {item.size}</span>
                    </div>
                    <button className="btn btn-secondary btn-sm">Request Item</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <div className="cta-card">
              <h2>Ready to Join?</h2>
              <p>Start sharing and receiving fashion with our community</p>
              <div className="cta-buttons">
                <button className="btn btn-primary">Donate Items</button>
                <Link to="/smart-wardrobe" className="btn btn-secondary">
                  Manage Wardrobe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .page-hero {
          padding: calc(80px + var(--spacing-xl)) 0 var(--spacing-lg);
          background: var(--gradient-metallic);
          text-align: center;
        }
        
        .page-badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: rgba(0, 206, 209, 0.2);
          border: 1px solid var(--accent-peacock);
          border-radius: var(--radius-full);
          color: var(--accent-peacock);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: var(--spacing-md);
        }
        
        .page-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
        }
        
        .impact-section,
        .how-section,
        .items-section,
        .cta-section {
          margin-bottom: var(--spacing-xl);
        }
        
        .impact-section h2,
        .how-section h2,
        .items-section h2 {
          margin-bottom: var(--spacing-md);
        }
        
        .impact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-md);
        }
        
        .impact-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          text-align: center;
        }
        
        .impact-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: var(--spacing-xs);
        }
        
        .impact-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-peacock);
          display: block;
        }
        
        .impact-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-md);
        }
        
        .step-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          text-align: center;
        }
        
        .step-number {
          width: 48px;
          height: 48px;
          background: var(--gradient-peacock);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-dark);
          margin: 0 auto var(--spacing-sm);
        }
        
        .step-card h3 {
          margin-bottom: var(--spacing-xs);
        }
        
        .step-card p {
          font-size: 0.875rem;
        }
        
        .items-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
        }
        
        .item-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .item-card:hover,
        .item-card.selected {
          border-color: var(--accent-peacock);
          transform: translateY(-4px);
        }
        
        .item-image {
          height: 120px;
          background: rgba(0, 206, 209, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
        }
        
        .item-info {
          padding: var(--spacing-md);
        }
        
        .item-info h3 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        
        .item-donor {
          font-size: 0.75rem;
          color: var(--accent-gold);
          margin-bottom: var(--spacing-xs);
        }
        
        .item-meta {
          display: flex;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
        }
        
        .item-condition {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          padding: 0.125rem 0.5rem;
          border-radius: var(--radius-full);
          font-size: 0.625rem;
        }
        
        .item-size {
          color: var(--text-secondary);
          font-size: 0.75rem;
        }
        
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          width: 100%;
        }
        
        .cta-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          text-align: center;
        }
        
        .cta-card h2 {
          margin-bottom: var(--spacing-xs);
        }
        
        .cta-card p {
          margin-bottom: var(--spacing-md);
        }
        
        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: var(--spacing-sm);
        }
        
        @media (max-width: 1024px) {
          .impact-grid,
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .items-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .impact-grid,
          .steps-grid,
          .items-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
