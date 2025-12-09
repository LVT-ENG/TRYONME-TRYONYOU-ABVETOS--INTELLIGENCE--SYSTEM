import React, { useState } from 'react'

export default function PauAssistant() {
  const [messages, setMessages] = useState([
    { type: 'assistant', text: 'Hello! I\'m Pau, your personal fashion assistant. How can I help you style your wardrobe today?' }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages([...messages, { type: 'user', text: inputValue }])
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        text: 'That\'s a great choice! Let me help you create the perfect outfit...' 
      }])
    }, 1000)
    
    setInputValue('')
  }

  return (
    <section className="pau-assistant-section">
      <div className="container">
        <div className="pau-header">
          <img src="/logo_pau_white.png" alt="Pau Assistant" className="pau-logo" />
          <h2 className="section-title">Meet Pau - Your AI Fashion Assistant</h2>
          <p className="section-subtitle">Get personalized styling advice powered by AI</p>
        </div>

        <div className="chat-container">
          <div className="messages-area">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.type === 'assistant' && (
                  <img src="/logo_tryonyou_symbol.png" alt="Pau" className="message-avatar" />
                )}
                <div className="message-bubble">
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="input-area">
            <input 
              type="text" 
              placeholder="Ask Pau for styling advice..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="send-button">
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
