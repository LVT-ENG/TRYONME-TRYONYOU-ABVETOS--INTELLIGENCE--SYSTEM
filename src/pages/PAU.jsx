import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const paulQuotes = [
  "I haven't loved yet. But I'm still dressing for the day I do.",
  "Try this jacket. It says what you're not ready to.",
  "That hem's running from your ankle. Let's fix it.",
  "Wear it. Dance it. Don't just walk it.",
  "I made this look for you. Yes, for you.",
  "Fashion is not about clothes. It's about becoming.",
  "Every outfit tells a story. What's yours today?",
  "Style is the answer. Who cares what the question was?"
];

const assistantCapabilities = [
  { icon: '👔', title: 'Style Advice', description: 'Personalized fashion recommendations' },
  { icon: '🎨', title: 'Color Matching', description: 'AI-powered color coordination' },
  { icon: '📅', title: 'Occasion Planning', description: 'Perfect outfits for any event' },
  { icon: '🛒', title: 'Shopping Guide', description: 'Smart purchase suggestions' },
  { icon: '🌿', title: 'Sustainability Tips', description: 'Eco-friendly fashion choices' },
  { icon: '✨', title: 'Trend Alerts', description: 'Real-time fashion updates' }
];

export default function PAU() {
  const [currentQuote, setCurrentQuote] = useState(paulQuotes[0]);
  const [chatMessages, setChatMessages] = useState([
    { from: 'pau', message: "Hello! I'm PAU, your Personal AI fashion assistant. How can I help you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(paulQuotes[Math.floor(Math.random() * paulQuotes.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages(prev => [...prev, { from: 'user', message: inputMessage }]);
    
    // Simulate PAU response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        from: 'pau', 
        message: "Great question! Let me analyze your style preferences... Based on your wardrobe and current trends, I recommend exploring more sustainable fabrics like organic cotton and recycled materials. Would you like me to suggest some specific pieces?" 
      }]);
    }, 1000);
    
    setInputMessage('');
  };

  return (
    <div className="page pau-page">
      <section className="page-hero">
        <div className="container">
          <div className="page-badge">🦚 AI Fashion Guide</div>
          <h1>PAU Assistant</h1>
          <p className="page-subtitle">
            Your Personal AI fashion companion
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* PAU Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-container">
              <div className="avatar-image">
                <span className="peacock-emoji">🦚</span>
              </div>
              <div className="avatar-info">
                <h2>Meet PAU</h2>
                <p className="avatar-name">Personal AI Unified Assistant</p>
                <div className="quote-box">
                  <span className="quote-icon">"</span>
                  <p className="quote-text">{currentQuote}</p>
                </div>
                <div className="avatar-status">
                  <span className="status status-active">
                    <span className="status-dot"></span>
                    Online & Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="capabilities-section">
            <h2>✨ What PAU Can Do</h2>
            <div className="capabilities-grid">
              {assistantCapabilities.map((cap, i) => (
                <div key={i} className="capability-card">
                  <span className="capability-icon">{cap.icon}</span>
                  <h3>{cap.title}</h3>
                  <p>{cap.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="chat-section">
            <h2>💬 Chat with PAU</h2>
            <div className="chat-container">
              <div className="chat-messages">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`chat-message ${msg.from}`}>
                    {msg.from === 'pau' && <span className="chat-avatar">🦚</span>}
                    <div className="message-bubble">
                      {msg.message}
                    </div>
                    {msg.from === 'user' && <span className="chat-avatar">👤</span>}
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input 
                  type="text" 
                  placeholder="Ask PAU anything about fashion..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button className="btn btn-primary" onClick={sendMessage}>Send</button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="actions-section">
            <h2>🚀 Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/smart-wardrobe" className="action-card">
                <span className="action-icon">👔</span>
                <h3>Manage Wardrobe</h3>
                <p>View and organize your items</p>
              </Link>
              <Link to="/cap" className="action-card">
                <span className="action-icon">🎯</span>
                <h3>Generate Content</h3>
                <p>Create fashion content with CAP</p>
              </Link>
              <Link to="/solidarity-wardrobe" className="action-card">
                <span className="action-icon">🤝</span>
                <h3>Join Community</h3>
                <p>Share with Solidarity Wardrobe</p>
              </Link>
              <Link to="/abvetos-factory" className="action-card">
                <span className="action-icon">🏭</span>
                <h3>ABVETOS Factory</h3>
                <p>Access the intelligence system</p>
              </Link>
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
        
        .avatar-section,
        .capabilities-section,
        .chat-section,
        .actions-section {
          margin-bottom: var(--spacing-xl);
        }
        
        .capabilities-section h2,
        .chat-section h2,
        .actions-section h2 {
          margin-bottom: var(--spacing-md);
        }
        
        .avatar-container {
          display: flex;
          gap: var(--spacing-lg);
          align-items: center;
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
        }
        
        .avatar-image {
          width: 200px;
          height: 200px;
          background: var(--gradient-peacock);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .peacock-emoji {
          font-size: 6rem;
        }
        
        .avatar-info h2 {
          margin-bottom: var(--spacing-xs);
        }
        
        .avatar-name {
          color: var(--accent-gold);
          margin-bottom: var(--spacing-md);
        }
        
        .quote-box {
          background: rgba(0, 206, 209, 0.1);
          border-left: 3px solid var(--accent-peacock);
          padding: var(--spacing-sm) var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
        
        .quote-icon {
          font-size: 2rem;
          color: var(--accent-peacock);
          line-height: 1;
        }
        
        .quote-text {
          font-style: italic;
          color: var(--text-primary);
        }
        
        .capabilities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
        }
        
        .capability-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .capability-card:hover {
          border-color: var(--accent-peacock);
          transform: translateY(-4px);
        }
        
        .capability-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: var(--spacing-sm);
        }
        
        .capability-card h3 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        
        .capability-card p {
          font-size: 0.75rem;
        }
        
        .chat-container {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        
        .chat-messages {
          height: 300px;
          overflow-y: auto;
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }
        
        .chat-message {
          display: flex;
          gap: var(--spacing-sm);
          align-items: flex-start;
        }
        
        .chat-message.user {
          flex-direction: row-reverse;
        }
        
        .chat-avatar {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .message-bubble {
          max-width: 70%;
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
        }
        
        .chat-message.pau .message-bubble {
          background: rgba(0, 206, 209, 0.1);
          border: 1px solid rgba(0, 206, 209, 0.2);
        }
        
        .chat-message.user .message-bubble {
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.3);
        }
        
        .chat-input {
          display: flex;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .chat-input input {
          flex: 1;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          color: var(--text-primary);
          font-size: 0.875rem;
        }
        
        .chat-input input:focus {
          outline: none;
          border-color: var(--accent-peacock);
        }
        
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-md);
        }
        
        .action-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          text-align: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .action-card:hover {
          border-color: var(--accent-peacock);
          transform: translateY(-4px);
          box-shadow: var(--shadow-glow);
        }
        
        .action-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: var(--spacing-sm);
        }
        
        .action-card h3 {
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        
        .action-card p {
          font-size: 0.75rem;
        }
        
        @media (max-width: 1024px) {
          .avatar-container {
            flex-direction: column;
            text-align: center;
          }
          
          .capabilities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .capabilities-grid,
          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
