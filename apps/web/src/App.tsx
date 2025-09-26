import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#0B0D10', color: '#EEF0F3', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ padding: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h1 style={{ color: '#D3B26A', margin: 0 }}>TRYONYOU – ABVETOS Intelligence System</h1>
      </header>
      <main style={{ padding: '2rem' }}>
        <h2 style={{ color: '#D3B26A' }}>Welcome to the Future of Fashion</h2>
        <p>This is the official repository for the TRYONYOU–ABVETOS Intelligence System, a revolutionary platform that will transform the fashion industry. Our patented technology provides a hyper-realistic virtual try-on experience, personalized recommendations, and a sustainable approach to fashion.</p>
        <p>This project is currently under active development. Stay tuned for more updates.</p>
      </main>
      <footer style={{ padding: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
        <p>&copy; 2025 TRYONYOU. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

