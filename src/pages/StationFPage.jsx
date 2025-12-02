import React from 'react';

export default function StationFPage() {
  const handleContact = () => {
    alert('Contact form coming soon! Email: contact@tryonyou.com');
  };

  return (
    <div className="station-f-page">
      <section className="station-f-hero" aria-label="Station-F hero">
        <h1>TRYONYOU at Station F</h1>
        <p>Paris' Startup Campus Innovation Hub</p>
      </section>

      <section className="investor-section" aria-label="Investment opportunity">
        <h2>Investment Opportunity</h2>
        <div className="investor-grid">
          <div className="investor-card">
            <h3>Market Size</h3>
            <p className="stat">$50B+</p>
            <p>Global Virtual Try-On Market by 2030</p>
          </div>
          <div className="investor-card">
            <h3>Growth Rate</h3>
            <p className="stat">25%</p>
            <p>CAGR in Fashion Tech</p>
          </div>
          <div className="investor-card">
            <h3>Reduction</h3>
            <p className="stat">40%</p>
            <p>Decrease in Return Rates</p>
          </div>
        </div>
      </section>

      <section className="explanation-section" aria-label="How it works">
        <h2>How TRYONYOU Works</h2>
        <div className="explanation-grid">
          <div className="explanation-block">
            <div className="step-number">1</div>
            <h3>AI Body Mapping</h3>
            <p>Our AI precisely maps your body dimensions using just a smartphone photo.</p>
          </div>
          <div className="explanation-block">
            <div className="step-number">2</div>
            <h3>Hyper-Real Rendering</h3>
            <p>Advanced algorithms create photorealistic visualizations of clothing on you.</p>
          </div>
          <div className="explanation-block">
            <div className="step-number">3</div>
            <h3>Smart Recommendations</h3>
            <p>Our Emotional AI learns your style preferences for personalized suggestions.</p>
          </div>
        </div>
      </section>

      <section className="cta-section" aria-label="Call to action">
        <h2>Ready to Transform Fashion?</h2>
        <p>Join us at Station F and be part of the fashion revolution.</p>
        <button 
          className="btn-primary" 
          onClick={handleContact}
          aria-label="Contact TRYONYOU team"
        >
          Contact Us
        </button>
      </section>
    </div>
  );
}
