import React from 'react';

export default function SmartWardrobe() {
  const features = [
    { icon: '👔', title: 'AI Styling', description: 'Get personalized outfit recommendations based on your preferences and occasions' },
    { icon: '📊', title: 'Wardrobe Analytics', description: 'Track your clothing usage and identify gaps in your wardrobe' },
    { icon: '🎨', title: 'Color Matching', description: 'Smart color coordination for perfect outfit combinations' },
    { icon: '☀️', title: 'Weather Sync', description: 'Weather-appropriate outfit suggestions' },
  ];

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>Smart Wardrobe</h1>
        <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto var(--spacing-2xl)' }}>
          Your AI-powered personal stylist. Organize, analyze, and optimize your wardrobe with intelligent recommendations.
        </p>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {features.map((feature, index) => (
            <div key={index} className="module-card">
              <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>{feature.icon}</div>
              <h3 className="module-title">{feature.title}</h3>
              <p className="module-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 'var(--spacing-2xl)', textAlign: 'center' }}>
          <h3>Ready to Transform Your Wardrobe?</h3>
          <p>Connect with the ABVETOS intelligence system for personalized styling.</p>
          <button className="btn btn-primary" style={{ marginTop: 'var(--spacing-md)' }}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}