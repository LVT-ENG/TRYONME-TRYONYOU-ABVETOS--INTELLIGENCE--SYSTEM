import React, { useState, useEffect } from 'react';

export default function PAUAvatar() {
  const [greeting, setGreeting] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const paulQuotes = [
    "Welcome to TRYONYOU! I'm PAU, your style companion.",
    "Ready to explore the future of fashion?",
    "Let's find your perfect look together!",
    "Fashion is an expression of who you are.",
    "Style is eternal, trends are temporary.",
    "Every outfit tells a story. What's yours?",
  ];

  useEffect(() => {
    const randomQuote = paulQuotes[Math.floor(Math.random() * paulQuotes.length)];
    setGreeting(randomQuote);
    
    // Animate on mount
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNewGreeting = () => {
    setIsAnimating(true);
    const newQuote = paulQuotes[Math.floor(Math.random() * paulQuotes.length)];
    setGreeting(newQuote);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <div>
            <h1>PAU - Personal Avatar Unit</h1>
            <p style={{ color: 'var(--color-gray-500)' }}>Your AI Style Companion</p>
          </div>
          <div className="status status-active">ACTIVE</div>
        </div>

        {/* Main Avatar Display */}
        <div 
          className="card" 
          style={{ 
            textAlign: 'center', 
            padding: 'var(--spacing-3xl)',
            background: 'linear-gradient(180deg, var(--color-gray-800) 0%, var(--color-anthracite) 100%)',
          }}
        >
          {/* Peacock Avatar */}
          <div 
            style={{
              width: '200px',
              height: '200px',
              margin: '0 auto var(--spacing-xl)',
              borderRadius: '50%',
              background: 'var(--gradient-peacock)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '6rem',
              boxShadow: isAnimating ? 'var(--shadow-glow)' : 'var(--shadow-lg)',
              transition: 'all var(--transition-base)',
              transform: isAnimating ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            🦚
          </div>

          {/* Greeting Bubble */}
          <div 
            style={{
              maxWidth: '500px',
              margin: '0 auto',
              padding: 'var(--spacing-xl)',
              background: 'var(--color-dark)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-gold)',
              position: 'relative',
              opacity: isAnimating ? 0.7 : 1,
              transition: 'opacity var(--transition-fast)',
            }}
          >
            <p style={{ fontSize: '1.25rem', margin: 0 }}>{greeting}</p>
          </div>

          <button 
            className="btn btn-secondary" 
            onClick={handleNewGreeting}
            style={{ marginTop: 'var(--spacing-xl)' }}
          >
            New Greeting
          </button>
        </div>

        {/* PAU Features */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: 'var(--spacing-2xl)' }}>
          <div className="module-card">
            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>💬</div>
            <h3 className="module-title">Style Conversations</h3>
            <p className="module-description">Chat with PAU about fashion, trends, and personal style advice.</p>
          </div>
          <div className="module-card">
            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>👔</div>
            <h3 className="module-title">Outfit Suggestions</h3>
            <p className="module-description">Get personalized outfit recommendations based on your preferences.</p>
          </div>
          <div className="module-card">
            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>📅</div>
            <h3 className="module-title">Occasion Planning</h3>
            <p className="module-description">Plan outfits for upcoming events and occasions.</p>
          </div>
          <div className="module-card">
            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>🎯</div>
            <h3 className="module-title">Style Goals</h3>
            <p className="module-description">Set and track your personal style evolution goals.</p>
          </div>
        </div>

        {/* Storyline */}
        <div className="card" style={{ marginTop: 'var(--spacing-2xl)' }}>
          <h3>The Story of PAU</h3>
          <p style={{ color: 'var(--color-gray-500)', lineHeight: 1.8 }}>
            PAU (Personal Avatar Unit) is your AI-powered style companion, inspired by the elegant peacock - 
            a symbol of beauty, confidence, and self-expression. Just as a peacock displays its magnificent 
            feathers with pride, PAU helps you discover and showcase your unique personal style.
          </p>
          <p style={{ color: 'var(--color-gray-500)', lineHeight: 1.8 }}>
            Powered by ABVETOS intelligence, PAU learns your preferences, understands your lifestyle, 
            and provides personalized fashion guidance that evolves with you. Whether you're building 
            a capsule wardrobe or preparing for a special occasion, PAU is here to help you look and 
            feel your best.
          </p>
        </div>
      </div>
    </div>
  );
}
