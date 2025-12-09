import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, Heart, Zap, Sun, Moon, Briefcase, PartyPopper } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const IntelligentSystem = () => {
  const { isDark } = useTheme()
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
    <div className="min-h-screen page-bg transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-12 hero-intelligent overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-500/15 rounded-full blur-[90px] animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-full blur-xl opacity-60 animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-2xl border-2 border-white/20">
                  <span className="text-5xl drop-shadow-lg">🦚</span>
                </div>
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 tracking-tight">
              Pau — Emotional Recommender
            </h1>
            
            <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-white/80' : 'text-anthracite/70'}`}>
              AI assistant that recommends outfits based on emotional state, personal style, and daily context
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Container */}
      <section className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="card mb-6 shadow-2xl border-2 border-purple-500/20">
          {/* Messages */}
          <div className="min-h-[450px] max-h-[550px] overflow-y-auto space-y-5 mb-6 pr-2">
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
                    <motion.div 
                      className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center mr-3 flex-shrink-0 shadow-lg border-2 border-white/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-xl">🦚</span>
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className={`max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-2xl rounded-tr-sm border border-purple-400/30 shadow-lg'
                        : 'glass rounded-2xl rounded-tl-sm shadow-md border-2 border-purple-500/10'
                    } px-5 py-3.5`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <p className={`whitespace-pre-wrap leading-relaxed ${isDark ? 'text-white/95' : 'text-anthracite/95'}`}>{message.text}</p>
                  </motion.div>
                  
                  {message.sender === 'user' && (
                    <motion.div 
                      className="w-11 h-11 rounded-full bg-gradient-to-br from-tryonyou-blue/50 to-tryonyou-darkblue/50 flex items-center justify-center ml-3 flex-shrink-0 shadow-lg border-2 border-white/20"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-xl">👤</span>
                    </motion.div>
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
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-lg border-2 border-white/20">
                  <span className="text-xl">🦚</span>
                </div>
                <div className="glass rounded-2xl rounded-tl-sm px-5 py-4 shadow-md border-2 border-purple-500/10">
                  <div className="flex gap-1.5">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2.5 h-2.5 rounded-full bg-purple-500"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2.5 h-2.5 rounded-full bg-pink-500"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2.5 h-2.5 rounded-full bg-rose-500"
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
              className="mb-6"
            >
              <div className={`text-sm font-medium mb-3 ${isDark ? 'text-white/70' : 'text-anthracite/70'}`}>💭 Try saying:</div>
              <div className="flex flex-wrap gap-2.5">
                {suggestedPrompts.map((prompt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setInput(prompt.text)
                      setTimeout(handleSend, 100)
                    }}
                    className="glass px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-200 flex items-center gap-2.5 border border-purple-500/20 shadow-md hover:shadow-lg"
                  >
                    <prompt.icon size={18} className="text-purple-500" />
                    <span className={isDark ? 'text-white/90' : 'text-anthracite/90'}>{prompt.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div className="glass rounded-2xl p-4 border-2 border-purple-500/20 shadow-lg hover:border-purple-500/40 transition-all duration-300">
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell Pau how you're feeling..."
                rows={1}
                className={`flex-1 bg-transparent resize-none focus:outline-none py-2.5 text-base ${isDark ? 'text-white placeholder-white/50' : 'text-anthracite placeholder-anthracite/50'}`}
              />
              
              <motion.button
                onClick={handleSend}
                disabled={!input.trim()}
                whileHover={{ scale: input.trim() ? 1.05 : 1 }}
                whileTap={{ scale: input.trim() ? 0.95 : 1 }}
                className={`p-3.5 rounded-xl transition-all duration-300 shadow-lg ${
                  input.trim()
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl'
                    : 'bg-white/10 cursor-not-allowed opacity-50'
                }`}
              >
                <Send size={22} className="text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-rose-500/15 border-2 border-purple-500/30 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Sparkles size={20} className="text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-anthracite'}`}>Pau understands:</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[{ icon: '🎭', text: 'Your emotional state', gradient: 'from-purple-500 to-pink-500' },
              { icon: '👗', text: 'Your personal style preferences', gradient: 'from-pink-500 to-rose-500' },
              { icon: '📅', text: 'Daily context and occasions', gradient: 'from-blue-500 to-purple-500' },
              { icon: '✨', text: 'TRYONYOU elegance rules', gradient: 'from-rose-500 to-purple-500' },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-4 p-4 rounded-xl glass border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                whileHover={{ scale: 1.02, x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <span className={`font-medium ${isDark ? 'text-white/90' : 'text-anthracite/90'}`}>{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default IntelligentSystem

