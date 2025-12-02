import React from 'react';

export default function StationFPage() {
  return (
    <div className="station-f-page">
      <section className="station-f-hero">
        <h1>TRYONYOU at Station F</h1>
        <p className="subtitle">The Future of Fashion-Tech — For Investors</p>
      </section>

      <div className="station-f-container">
        <div className="presentation-block animate-fadeInUp">
          <h2>🦚 Our Vision</h2>
          <p>
            TRYONYOU is revolutionizing the fashion industry through emotional AI, 
            hyper-realistic virtual try-on technology, and sustainable fashion practices.
          </p>
          <p>
            We combine cutting-edge computer vision with deep understanding of personal style 
            to create the most immersive and personalized shopping experience in the world.
          </p>
        </div>

        <div className="presentation-block animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <h2>🚀 Key Technologies</h2>
          <ul>
            <li><strong>Emotional AI:</strong> Understanding user preferences and mood through interaction patterns</li>
            <li><strong>Auto-Production:</strong> On-demand manufacturing reducing waste by 85%</li>
            <li><strong>Biometric Payments:</strong> Seamless checkout with secure identity verification</li>
            <li><strong>Trend Engine:</strong> Predictive analytics for fashion trends</li>
            <li><strong>Smart Wardrobe:</strong> AI-curated outfit recommendations</li>
            <li><strong>Solidarity Mode:</strong> Sustainable fashion sharing economy</li>
          </ul>
        </div>

        <div className="presentation-block animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h2>📊 Market Opportunity</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">$750B</div>
              <div className="stat-label">Global Fashion E-commerce</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">45%</div>
              <div className="stat-label">Return Rate Reduction</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">3.5x</div>
              <div className="stat-label">Conversion Increase</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">85%</div>
              <div className="stat-label">Waste Reduction</div>
            </div>
          </div>
        </div>

        <div className="presentation-block animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <h2>👥 The Team</h2>
          <p>
            Our team combines expertise from leading fashion houses, AI research labs, 
            and successful tech startups. We're united by a vision of making fashion 
            more personal, sustainable, and accessible.
          </p>
        </div>

        <div className="presentation-block animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <h2>💰 Investment Opportunity</h2>
          <p>
            We're raising our Series A to scale our technology platform and expand 
            into new markets. Join us in reshaping the $3 trillion fashion industry.
          </p>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a 
              href="mailto:invest@tryonyou.com" 
              className="btn btn-primary"
            >
              Contact for Investment Deck
            </a>
          </div>
        </div>

        <div className="presentation-block animate-fadeInUp" style={{ animationDelay: '0.5s', textAlign: 'center' }}>
          <h2>🎯 ABVETOS Intelligence System</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--peacock-accent)' }}>
            Powered by DRS-TRYONYOU v1.0
          </p>
          <p>
            Our proprietary ABVETOS system integrates all our AI technologies into 
            a seamless, intelligent fashion platform that learns and evolves with each user.
          </p>
        </div>
      </div>
    </div>
  );
}
