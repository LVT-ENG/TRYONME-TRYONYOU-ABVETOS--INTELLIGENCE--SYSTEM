import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Sparkles, Globe, Mic, Camera, Heart, Zap, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const AskPeacock = () => {
  const { t } = useTranslation()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'peacock',
      content: t('askPeacock.greeting'),
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const suggestedQuestions = [
    { icon: '👗', text: t('askPeacock.suggestedQuestions.date') },
    { icon: '🎨', text: t('askPeacock.suggestedQuestions.colors') },
    { icon: '👔', text: t('askPeacock.suggestedQuestions.office') },
    { icon: '✨', text: t('askPeacock.suggestedQuestions.refresh') },
  ]

  const peacockResponses = [
    {
      triggers: ['date', 'romantic', 'dinner', 'evening'],
      response: t('askPeacock.responses.date'),
    },
    {
      triggers: ['color', 'colors', 'palette', 'tone'],
      response: t('askPeacock.responses.colors'),
    },
    {
      triggers: ['office', 'work', 'formal', 'professional'],
      response: t('askPeacock.responses.office'),
    },
    {
      triggers: ['refresh', 'change', 'new', 'style', 'upgrade'],
      response: t('askPeacock.responses.refresh'),
    },
    {
      triggers: ['hello', 'hey', 'hi', 'greetings'],
      response: t('askPeacock.responses.greeting'),
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
    
    return t('askPeacock.responses.default')
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
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Compact */}
      <section className="relative py-8 bg-gradient-to-br from-cyan-950 via-blue-900/50 to-tryonyou-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] bg-blue-500/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center glow-blue">
                <span className="text-3xl">🦚</span>
              </div>
            </motion.div>
            
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-bold gradient-text">{t('askPeacock.title')}</h1>
              <p className="text-white/60 text-sm flex items-center gap-2">
                <Globe size={14} />
                {t('askPeacock.subtitle')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chat Container */}
      <section className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-lg">🦚</span>
                  </div>
                )}
                
                <div className={`max-w-[80%] ${
                  message.type === 'user'
                    ? 'bg-tryonyou-blue/30 rounded-2xl rounded-tr-sm'
                    : 'glass rounded-2xl rounded-tl-sm'
                } px-4 py-3`}>
                  <p className="text-white/90 whitespace-pre-wrap">{message.content}</p>
                  
                  {message.type === 'peacock' && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                      <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <ThumbsUp size={14} className="text-white/40" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <ThumbsDown size={14} className="text-white/40" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition-colors ml-auto">
                        <RefreshCw size={14} className="text-white/40" />
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-lg">🦚</span>
              </div>
              <div className="glass rounded-2xl rounded-tl-sm px-4 py-3">
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
            <div className="text-sm text-white/60 mb-2">Suggested questions:</div>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleSendMessage(q.text)}
                  className="glass px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <span>{q.icon}</span>
                  {q.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input Area */}
        <div className="glass rounded-2xl p-3">
          <div className="flex items-end gap-3">
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                <Camera size={20} />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                <Mic size={20} />
              </button>
            </div>
            
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('askPeacock.inputPlaceholder')}
              rows={1}
              className="flex-1 bg-transparent resize-none focus:outline-none text-white placeholder-white/40 py-2"
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
      <section className="py-6 bg-tryonyou-smoke/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Globe, label: 'Global Knowledge', color: 'text-cyan-400' },
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
                className="flex items-center gap-2 text-sm text-white/60"
              >
                <feature.icon size={16} className={feature.color} />
                {feature.label}
              </motion.div>
            ))}
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
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0"
              >
                <span className="text-5xl">🦚</span>
              </motion.div>
              
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">About Peacock</h3>
                <p className="text-white/70 leading-relaxed">
                  Peacock is your AI fashion assistant that combines knowledge of global trends with a 
                  personalized approach to your style. He has "traveled" to all the fashion capitals of 
                  the world to bring you the best of each culture and style.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
              {[
                { label: 'Styles Known', value: '50+' },
                { label: 'Satisfaction', value: '98%' },
                { label: 'Daily Queries', value: '10K+' },
                { label: 'Languages', value: '12' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
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

