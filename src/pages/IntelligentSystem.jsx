import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PEACOCK_RESPONSES } from '../utils/constants'
import { getRandomItem, delay } from '../utils/helpers'
import './IntelligentSystem.css'

const QUICK_PROMPTS = [
  "What should I wear to a dinner date?",
  "How do I elevate my casual style?",
  "What colors suit my energy?",
  "Suggest a bold statement look",
]

export default function IntelligentSystem() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'peacock',
      text: "Welcome, darling. I am The Peacock — your personal style oracle. Tell me where you're going, and I'll tell you what to wear.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = async (userMessage) => {
    // Simulate AI thinking
    await delay(1000 + Math.random() * 1500)

    // Context-aware responses
    const lowerMsg = userMessage.toLowerCase()
    let response = ''

    if (lowerMsg.includes('date') || lowerMsg.includes('dinner') || lowerMsg.includes('romantic')) {
      response = "Ah, romance in the air! I see you in something flowing yet structured — perhaps the Cubist Flow Jacket paired with high-rise pants. Keep the accessories minimal but statement-making. Gold hoops and a bold red lip will speak volumes without saying a word."
    } else if (lowerMsg.includes('casual') || lowerMsg.includes('everyday') || lowerMsg.includes('relax')) {
      response = "Effortless elegance is an art. Try a silk geometric blouse with tailored denim — yes, elevated casual exists. Add a minimalist watch and let your natural glow do the rest. Comfort doesn't mean compromise."
    } else if (lowerMsg.includes('color') || lowerMsg.includes('palette')) {
      response = "Colors are frequencies, and you need ones that resonate with your energy. Based on your aura, I sense you thrive in deep earth tones — warm ochre, forest green, rich burgundy. But don't shy from gold accents; they're your power color."
    } else if (lowerMsg.includes('bold') || lowerMsg.includes('statement') || lowerMsg.includes('impact')) {
      response = "You want to make an entrance? The Urban Edge coat from North Studio, structured and commanding. Pair it with the Editorial Bold Red lip and geometric gold accessories. Walk in like you own the room — because you do."
    } else if (lowerMsg.includes('work') || lowerMsg.includes('office') || lowerMsg.includes('professional')) {
      response = "Power dressing isn't about conformity — it's about confident expression. I recommend the Heritage Classic set: sharp tailoring with subtle texture. A statement watch and minimal jewelry. You'll command respect and inspire curiosity."
    } else if (lowerMsg.includes('party') || lowerMsg.includes('event') || lowerMsg.includes('night')) {
      response = "A night to remember demands a look to match. The Velvet Dreams collection calls to you — rich textures, dramatic silhouettes. Add the Gold Hoops and let your makeup tell a story. Full radiance, maximum impact."
    } else {
      response = getRandomItem(PEACOCK_RESPONSES)
    }

    return response
  }

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage = {
      id: Date.now(),
      from: 'user',
      text: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    const response = await generateResponse(userMessage.text)

    const peacockMessage = {
      id: Date.now() + 1,
      from: 'peacock',
      text: response,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, peacockMessage])
    setIsTyping(false)
  }

  const handleQuickPrompt = (prompt) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="ai-system-page">
      <div className="ai-container">
        {/* Header */}
        <motion.div
          className="ai-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="peacock-avatar">
            <span>🦚</span>
          </div>
          <div className="header-info">
            <h1>Ask The Peacock</h1>
            <p>Your Personal Style Oracle</p>
          </div>
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span>Online</span>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="messages-container">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`message ${msg.from}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {msg.from === 'peacock' && (
                  <div className="message-avatar">🦚</div>
                )}
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  <span className="message-time">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              className="message peacock typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="message-avatar">🦚</div>
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="quick-prompts">
          {QUICK_PROMPTS.map((prompt, index) => (
            <button
              key={index}
              className="quick-prompt-btn"
              onClick={() => handleQuickPrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your style, outfits, colors..."
            disabled={isTyping}
          />
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

