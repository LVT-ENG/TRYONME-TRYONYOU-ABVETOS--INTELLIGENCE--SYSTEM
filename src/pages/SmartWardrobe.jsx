import React, { useState } from 'react';

const wardrobeItems = [
  { id: 1, name: 'Designer Blazer', category: 'Outerwear', color: 'Navy', size: 'M', status: 'available', sustainability: 95 },
  { id: 2, name: 'Silk Dress', category: 'Dresses', color: 'Emerald', size: 'S', status: 'in-use', sustainability: 88 },
  { id: 3, name: 'Tailored Trousers', category: 'Bottoms', color: 'Charcoal', size: 'L', status: 'available', sustainability: 92 },
  { id: 4, name: 'Cashmere Sweater', category: 'Tops', color: 'Ivory', size: 'M', status: 'cleaning', sustainability: 85 },
  { id: 5, name: 'Leather Boots', category: 'Footwear', color: 'Brown', size: '42', status: 'available', sustainability: 78 },
  { id: 6, name: 'Statement Necklace', category: 'Accessories', color: 'Gold', size: 'One Size', status: 'available', sustainability: 90 }
];

const recommendations = [
  { outfit: 'Business Meeting', items: ['Designer Blazer', 'Tailored Trousers'], confidence: 95 },
  { outfit: 'Evening Event', items: ['Silk Dress', 'Statement Necklace'], confidence: 92 },
  { outfit: 'Casual Friday', items: ['Cashmere Sweater', 'Tailored Trousers'], confidence: 88 }
];

export default function SmartWardrobe() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'Outerwear', 'Dresses', 'Bottoms', 'Tops', 'Footwear', 'Accessories'];

  const filteredItems = selectedCategory === 'all' 
    ? wardrobeItems 
    : wardrobeItems.filter(item => item.category === selectedCategory);

  return (
    <div className="page wardrobe-page">
      <section className="page-hero">
        <div className="container">
          <div className="page-badge">👔 AI-Powered Fashion</div>
          <h1>Smart Wardrobe</h1>
          <p className="page-subtitle">
            Intelligent Fashion Management powered by ABVETOS
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* AI Recommendations */}
          <div className="recommendations-section">
            <h2>🎯 AI Outfit Recommendations</h2>
            <div className="recommendations-grid">
              {recommendations.map((rec, i) => (
                <div key={i} className="recommendation-card">
                  <div className="rec-header">
                    <h3>{rec.outfit}</h3>
                    <span className="confidence">{rec.confidence}% match</span>
                  </div>
                  <div className="rec-items">
                    {rec.items.map((item, j) => (
                      <span key={j} className="rec-item">{item}</span>
                    ))}
                  </div>
                  <button className="btn btn-primary btn-sm">Try This Look</button>
                </div>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <h2>📂 Your Wardrobe</h2>
            <div className="category-filter">
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'all' ? 'All Items' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Wardrobe Grid */}
          <div className="wardrobe-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="wardrobe-item">
                <div className="item-preview">
                  <span className="item-emoji">👔</span>
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="item-meta">
                    <span className="item-category">{item.category}</span>
                    <span className={`item-status status-${item.status === 'available' ? 'active' : 'pending'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="item-specs">
                    <span>Color: {item.color}</span>
                    <span>Size: {item.size}</span>
                  </div>
                  <div className="sustainability">
                    <span className="sustainability-label">Sustainability Score</span>
                    <div className="sustainability-bar">
                      <div 
                        className="sustainability-fill" 
                        style={{ width: `${item.sustainability}%` }}
                      ></div>
                    </div>
                    <span className="sustainability-value">{item.sustainability}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Dashboard */}
          <div className="stats-section">
            <h2>📊 Wardrobe Analytics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">👕</span>
                <span className="stat-number">48</span>
                <span className="stat-label">Total Items</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🌿</span>
                <span className="stat-number">87%</span>
                <span className="stat-label">Sustainability</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🔄</span>
                <span className="stat-number">156</span>
                <span className="stat-label">Outfit Combinations</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">⭐</span>
                <span className="stat-number">12</span>
                <span className="stat-label">Favorites</span>
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
        
        .recommendations-section,
        .filter-section,
        .stats-section {
          margin-bottom: var(--spacing-lg);
        }
        
        .recommendations-section h2,
        .filter-section h2,
        .stats-section h2 {
          margin-bottom: var(--spacing-md);
        }
        
        .recommendations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
        }
        
        .recommendation-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
        }
        
        .rec-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }
        
        .rec-header h3 {
          font-size: 1rem;
        }
        
        .confidence {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
        }
        
        .rec-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: var(--spacing-sm);
        }
        
        .rec-item {
          background: rgba(0, 206, 209, 0.1);
          color: var(--accent-peacock);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
        }
        
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
        
        .category-filter {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: var(--spacing-md);
        }
        
        .filter-btn {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
          border-color: var(--accent-peacock);
          color: var(--accent-peacock);
          background: rgba(0, 206, 209, 0.1);
        }
        
        .wardrobe-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
        }
        
        .wardrobe-item {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .wardrobe-item:hover {
          border-color: var(--accent-peacock);
          transform: translateY(-4px);
        }
        
        .item-preview {
          height: 120px;
          background: rgba(0, 206, 209, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .item-emoji {
          font-size: 3rem;
        }
        
        .item-details {
          padding: var(--spacing-md);
        }
        
        .item-details h3 {
          font-size: 1rem;
          margin-bottom: var(--spacing-xs);
        }
        
        .item-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-xs);
        }
        
        .item-category {
          font-size: 0.75rem;
          color: var(--accent-gold);
        }
        
        .item-status {
          font-size: 0.625rem;
          padding: 0.125rem 0.5rem;
          border-radius: var(--radius-full);
        }
        
        .item-specs {
          display: flex;
          gap: var(--spacing-sm);
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-sm);
        }
        
        .sustainability {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .sustainability-label {
          font-size: 0.625rem;
          color: var(--text-secondary);
        }
        
        .sustainability-bar {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .sustainability-fill {
          height: 100%;
          background: var(--accent-peacock);
          transition: width 0.3s ease;
        }
        
        .sustainability-value {
          font-size: 0.75rem;
          color: var(--accent-peacock);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-md);
        }
        
        .stat-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          text-align: center;
        }
        
        .stat-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: var(--spacing-xs);
        }
        
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-peacock);
          display: block;
        }
        
        .stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        
        @media (max-width: 1024px) {
          .recommendations-grid,
          .wardrobe-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .recommendations-grid,
          .wardrobe-grid,
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
