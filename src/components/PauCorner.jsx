import React from 'react';

const paulQuotes = [
  "I haven't loved yet. But I'm still dressing for the day I do.",
  "Try this jacket. It says what you're not ready to.",
  "That hem's running from your ankle. Let's fix it.",
  "Wear it. Dance it. Don't just walk it.",
  "I made this look for you. Yes, for you."
];

export default function PauCorner() {
  const [quote, setQuote] = React.useState('');
  const [showQuote, setShowQuote] = React.useState(false);

  React.useEffect(() => {
    setQuote(paulQuotes[Math.floor(Math.random() * paulQuotes.length)]);
  }, []);

  const handleClick = () => {
    setQuote(paulQuotes[Math.floor(Math.random() * paulQuotes.length)]);
    setShowQuote(true);
    setTimeout(() => setShowQuote(false), 3000);
  };

  return (
    <div className="pau-corner" onClick={handleClick} title="Click for fashion wisdom">
      <div className="pau-image animate-pulse">🦚</div>
      {showQuote && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          right: 0,
          background: 'linear-gradient(135deg, #0d6f5e, #1a8f7d)',
          color: 'white',
          padding: '1rem',
          borderRadius: '12px',
          marginBottom: '10px',
          width: '250px',
          fontSize: '0.9rem',
          boxShadow: '0 4px 20px rgba(0, 196, 167, 0.3)',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          "{quote}"
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            right: '35px',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #1a8f7d'
          }} />
        </div>
      )}
    </div>
  );
}
