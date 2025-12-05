import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Sparkles, Globe, Mic, Camera, Heart, Zap, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react'

const AskPeacock = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'peacock',
      content: '¡Hola! Soy Peacock, tu asistente de moda personal. 🦚 Vengo del mundo para ayudarte a descubrir tu estilo perfecto. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const suggestedQuestions = [
    { icon: '👗', text: '¿Qué me pongo para una cita?' },
    { icon: '🎨', text: '¿Qué colores me favorecen?' },
    { icon: '👔', text: 'Ayúdame con mi look de oficina' },
    { icon: '✨', text: '¿Cómo puedo renovar mi estilo?' },
  ]

  const peacockResponses = [
    {
      triggers: ['cita', 'date', 'romántico', 'romántica'],
      response: '💕 ¡Una cita! Qué emocionante. Te recomiendo algo que te haga sentir confianza pero cómoda. Un vestido midi en tono cálido o unos jeans bien cortados con una blusa de seda serían perfectos. Lo más importante es que te sientas tú misma. ¿Me cuentas más sobre el lugar de la cita?',
    },
    {
      triggers: ['color', 'colores', 'paleta', 'tono'],
      response: '🎨 ¡Los colores son mi especialidad! Para encontrar tu paleta perfecta, necesito conocerte mejor. Generalmente, si tu piel tiene subtono cálido, los tonos tierra, dorados y naranjas te favorecerán. Si es frío, prueba con azules, grises y platas. ¿Sabes cuál es tu subtono?',
    },
    {
      triggers: ['oficina', 'trabajo', 'formal', 'profesional'],
      response: '👔 El estilo de oficina puede ser muy elegante sin ser aburrido. Te sugiero invertir en piezas atemporales: un buen blazer, pantalones de corte recto y camisas de calidad. Añade personalidad con accesorios. ¿Cuál es el código de vestimenta de tu trabajo?',
    },
    {
      triggers: ['renovar', 'cambio', 'nuevo', 'estilo'],
      response: '✨ ¡Me encanta cuando alguien quiere renovarse! El primer paso es identificar qué no te funciona y por qué. Luego, exploramos nuevas siluetas, colores y texturas. ¿Hay algo específico de tu estilo actual que quieras cambiar?',
    },
    {
      triggers: ['hola', 'hey', 'buenos', 'buenas'],
      response: '🦚 ¡Hola! Es un placer conocerte. Estoy aquí para ayudarte con todo lo relacionado con tu estilo personal. Desde elegir un outfit hasta rediseñar tu armario completo. ¿Qué te gustaría explorar hoy?',
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
    
    return '🦚 Interesante pregunta. En mi experiencia viajando por el mundo de la moda, he aprendido que cada persona tiene un estilo único que espera ser descubierto. Cuéntame más sobre ti y lo que buscas, y te ayudaré a encontrar las mejores opciones para ti.'
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
              <h1 className="text-2xl md:text-3xl font-bold gradient-text">Ask Peacock</h1>
              <p className="text-white/60 text-sm flex items-center gap-2">
                <Globe size={14} />
                "Vengo del mundo para ayudarte"
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
            <div className="text-sm text-white/60 mb-2">Preguntas sugeridas:</div>
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
              placeholder="Escribe tu pregunta..."
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
              { icon: Globe, label: 'Conocimiento global', color: 'text-cyan-400' },
              { icon: Sparkles, label: 'IA avanzada', color: 'text-purple-400' },
              { icon: Heart, label: 'Personalizado', color: 'text-rose-400' },
              { icon: Zap, label: 'Respuestas instantáneas', color: 'text-amber-400' },
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
                <h3 className="text-2xl font-bold mb-2">Sobre Peacock</h3>
                <p className="text-white/70 leading-relaxed">
                  Peacock es tu asistente de moda con inteligencia artificial que combina conocimientos 
                  de tendencias globales con un enfoque personalizado para tu estilo. Ha "viajado" por 
                  todas las capitales de la moda del mundo para traerte lo mejor de cada cultura y estilo.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
              {[
                { label: 'Estilos conocidos', value: '50+' },
                { label: 'Satisfacción', value: '98%' },
                { label: 'Consultas diarias', value: '10K+' },
                { label: 'Idiomas', value: '12' },
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

