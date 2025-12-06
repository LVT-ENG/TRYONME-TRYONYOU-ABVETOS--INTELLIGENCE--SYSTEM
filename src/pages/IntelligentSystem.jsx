import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, Heart, Zap, Sun, Moon, Briefcase, PartyPopper } from 'lucide-react'

const IntelligentSystem = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'pau', text: "Hello! I'm Pau, your emotional style recommender. How are you feeling today?" },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your mood, I recommend a comfortable yet elegant outfit. Let me show you some options...",
        "I understand. For that feeling, I suggest something that makes you feel confident and at ease.",
        "That sounds wonderful! I have the perfect look in mind for you today.",
        "Let's find something that matches your energy. How about we explore some options together?",
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'pau',
          text: randomResponse,
        },
      ])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggestedPrompts = [
    { icon: Sun, text: "I'm feeling confident today" },
    { icon: Heart, text: "I need a romantic outfit" },
    { icon: Briefcase, text: "I have an important meeting" },
    { icon: PartyPopper, text: "I'm going to a party" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-8 bg-gradient-to-br from-purple-950 via-pink-900/50 to-tryonyou-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] bg-pink-500/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center glow-blue">
                <span className="text-4xl">🦚</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Pau — Emotional Recommender
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              AI assistant that recommends outfits based on emotional state, personal style, and daily context
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Container */}
      <section className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <div className="card mb-4">
          {/* Messages */}
          <div className="min-h-[400px] max-h-[500px] overflow-y-auto space-y-4 mb-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'pau' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-lg">🦚</span>
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-purple-500/30 rounded-2xl rounded-tr-sm'
                      : 'glass rounded-2xl rounded-tl-sm'
                  } px-4 py-3`}>
                    <p className="text-white/90 whitespace-pre-wrap">{message.text}</p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-tryonyou-blue/30 flex items-center justify-center ml-3 flex-shrink-0">
                      <span className="text-lg">👤</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-lg">🦚</span>
                </div>
                <div className="glass rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 rounded-full bg-purple-400"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-purple-400"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-purple-400"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <div className="text-sm text-white/60 mb-2">Try saying:</div>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => {
                      setInput(prompt.text)
                      setTimeout(() => handleSend(), 100)
                    }}
                    className="glass px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <prompt.icon size={16} />
                    {prompt.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div className="glass rounded-2xl p-3">
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell Pau how you're feeling..."
                rows={1}
                className="flex-1 bg-transparent resize-none focus:outline-none text-white placeholder-white/40 py-2"
              />
              
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`p-3 rounded-xl transition-all ${
                  input.trim()
                    ? 'bg-purple-500 hover:bg-pink-500'
                    : 'bg-white/10 cursor-not-allowed'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30"
        >
          <h3 className="text-xl font-bold mb-4">Pau understands:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🎭', text: 'Your emotional state' },
              { icon: '👗', text: 'Your personal style preferences' },
              { icon: '📅', text: 'Daily context and occasions' },
              { icon: '✨', text: 'TRYONYOU elegance rules' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-white/80">{feature.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default IntelligentSystem

