import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Sparkles, Globe, Mic, Camera, Heart, Zap, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react'
import texts from '../data/texts.json'
import { useTheme } from '../context/ThemeContext'
import { getImageWithFallback } from '../utils/assets'

const AskPeacock = () => {
  const { isDark } = useTheme()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'peacock',
      content: texts.peacock.welcome,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const suggestedQuestions = [
    { icon: '👗', text: 'What should I wear for a date?' },
    { icon: '🎨', text: 'What colors suit me?' },
    { icon: '👔', text: 'Help me with my office look' },
    { icon: '✨', text: 'How can I refresh my style?' },
  ]
  
  const getDefaultResponse = () => texts.peacock.response_example

  const peacockResponses = [
    {
      triggers: ['date', 'romantic', 'dinner', 'evening'],
      response: '💕 A date! How exciting. I recommend something that makes you feel confident but comfortable. A midi dress in a warm tone or well-fitted jeans with a silk blouse would be perfect. The most important thing is that you feel like yourself. Can you tell me more about the location?',
    },
    {
      triggers: ['color', 'colors', 'palette', 'tone'],
      response: '🎨 Colors are my specialty! To find your perfect palette, I need to know you better. Generally, if your skin has a warm undertone, earth tones, golds, and oranges will flatter you. If it\'s cool, try blues, grays, and silvers. Do you know your undertone?',
    },
    {
      triggers: ['office', 'work', 'formal', 'professional'],
      response: '👔 Office style can be very elegant without being boring. I suggest investing in timeless pieces: a good blazer, straight-cut pants, and quality shirts. Add personality with accessories. What\'s your workplace dress code?',
    },
    {
      triggers: ['refresh', 'change', 'new', 'style', 'upgrade'],
      response: '✨ I love when someone wants to refresh their style! The first step is identifying what doesn\'t work for you and why. Then, we explore new silhouettes, colors, and textures. Is there something specific about your current style you\'d like to change?',
    },
    {
      triggers: ['hello', 'hey', 'hi', 'greetings'],
      response: '🦚 Hello! It\'s a pleasure to meet you. I\'m here to help you with everything related to your personal style. From choosing an outfit to redesigning your entire wardrobe. What would you like to explore today?',
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    for (const response of peacockResponses) {
      if (response.triggers.some(trigger => lowerMessage.includes(trigger))) {
        return response.response
      }
    }
    
    return getDefaultResponse()
  }

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const peacockMessage = {
        id: messages.length + 2,
        type: 'peacock',
        content: generateResponse(text),
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, peacockMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 page-bg">
      {/* Hero Section - Compact */}
      <section className="relative pt-24 pb-8 overflow-hidden hero-chat">
        <div className="absolute inset-0">
          <img 
            src={getImageWithFallback('peacock-bg.jpeg', 'avatar')} 
            alt="Ask Peacock"
            className={`object-cover object-top w-full h-full ${isDark ? 'opacity-30' : 'opacity-20'}`}
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-b from-tryonyou-black/80 via-tryonyou-black/60 to-tryonyou-black' 
              : 'bg-gradient-to-b from-white/60 via-white/40 to-[#FAFAFA]'
          }`}></div>
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] bg-blue-500/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 text-center section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass">
              <MessageCircle size={18} className={isDark ? 'text-cyan-400' : 'text-cyan-500'} />
              <span className={`font-semibold ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>AI Style Assistant</span>
            </div>
            
            <h1 className="mb-6 heading-xl gradient-text">
              {texts.peacock.title}
            </h1>
            
            <p className={`text-xl max-w-3xl mx-auto mb-8 ${isDark ? 'text-white/80' : 'text-anthracite/80'}`}>
              {texts.peacock.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Container */}
      <section className="flex flex-col flex-1 w-full max-w-4xl px-4 py-6 mx-auto">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[400px]">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'peacock' && (
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500">
                    <span className="text-lg">🦚</span>
                  </div>
                )}
                
                <div className={`max-w-[80%] ${
                  message.type === 'user'
                    ? 'bg-tryonyou-blue/30 rounded-2xl rounded-tr-sm'
                    : 'glass rounded-2xl rounded-tl-sm'
                } px-4 py-3`}>
                  <p className={`whitespace-pre-wrap ${isDark ? 'text-white/90' : 'text-anthracite/90'}`}>{message.content}</p>
                  
                  {message.type === 'peacock' && (
                    <div className={`flex items-center gap-2 mt-2 pt-2 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                      <button className="p-1 transition-colors rounded hover:bg-white/10">
                        <ThumbsUp size={14} className={isDark ? 'text-white/40' : 'text-anthracite/40'} />
                      </button>
                      <button className="p-1 transition-colors rounded hover:bg-white/10">
                        <ThumbsDown size={14} className={isDark ? 'text-white/40' : 'text-anthracite/40'} />
                      </button>
                      <button className="p-1 ml-auto transition-colors rounded hover:bg-white/10">
                        <RefreshCw size={14} className={isDark ? 'text-white/40' : 'text-anthracite/40'} />
                      </button>
                    </div>
                  )}
                </div>
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
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500">
                <span className="text-lg">🦚</span>
              </div>
              <div className="px-4 py-3 rounded-tl-sm glass rounded-2xl">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-cyan-400"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-cyan-400"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-cyan-400"
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className={`text-sm mb-2 ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>Suggested questions:</div>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleSendMessage(q.text)}
                  className="flex items-center gap-2 px-4 py-2 text-sm transition-colors rounded-full glass hover:bg-white/10"
                >
                  <span>{q.icon}</span>
                  {q.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input Area */}
        <div className="p-3 glass rounded-2xl">
          <div className="flex items-end gap-3">
            <div className="flex gap-2">
              <button className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-anthracite/60 hover:text-anthracite'}`}>
                <Camera size={20} />
              </button>
              <button className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-anthracite/60 hover:text-anthracite'}`}>
                <Mic size={20} />
              </button>
            </div>
            
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={texts.peacock.placeholder}
              rows={1}
              className={`flex-1 bg-transparent resize-none focus:outline-none py-2 ${isDark ? 'text-white placeholder-white/40' : 'text-anthracite placeholder-anthracite/40'}`}
            />
            
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className={`p-3 rounded-xl transition-all ${
                inputValue.trim()
                  ? 'bg-tryonyou-blue hover:bg-amparo-light'
                  : 'bg-white/10 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className={`py-6 ${isDark ? 'bg-tryonyou-smoke/30' : 'bg-gray-100'}`}>
        <div className="max-w-4xl px-4 mx-auto">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[{ icon: Globe, label: 'Global Knowledge', color: 'text-cyan-400' },
              { icon: Sparkles, label: 'Advanced AI', color: 'text-purple-400' },
              { icon: Heart, label: 'Personalized', color: 'text-rose-400' },
              { icon: Zap, label: 'Instant Responses', color: 'text-amber-400' },
            ].map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-2 text-sm ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}
              >
                <feature.icon size={16} className={feature.color} />
                {feature.label}
              </motion.div>
            ))}}
          </div>
        </div>
      </section>

      {/* Peacock Info */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="flex items-center justify-center flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500"
              >
                <span className="text-5xl">🦚</span>
              </motion.div>
              
              <div className="text-center md:text-left">
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-anthracite'}`}>About Peacock</h3>
                <p className={`leading-relaxed ${isDark ? 'text-white/70' : 'text-anthracite/70'}`}>
                  Peacock is your AI fashion assistant that combines knowledge of global trends with a 
                  personalized approach to your style. He has "traveled" to all the fashion capitals of 
                  the world to bring you the best of each culture and style.
                </p>
              </div>
            </div>
            
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              {[
                { label: 'Styles Known', value: '50+' },
                { label: 'Satisfaction', value: '98%' },
                { label: 'Daily Queries', value: '10K+' },
                { label: 'Languages', value: '12' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className={`text-xs ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default AskPeacock

