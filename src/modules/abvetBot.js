/**
 * TRYONYOU - ABVET Bot Module
 * Conversational AI assistant for TRYONYOU platform
 * Integrates with PAU for emotionally-aware interactions
 */

export class ABVETBot {
  constructor(config = {}) {
    this.name = config.name || 'ABVET';
    this.personality = config.personality || 'friendly';
    this.language = config.language || 'en';
    this.emotionalAwareness = config.emotionalAwareness !== false;
    this.conversationHistory = [];
  }

  /**
   * Initialize ABVET Bot
   */
  async init() {
    console.log('🤖 Initializing ABVET Bot...');
    
    this.conversationHistory = [];
    
    console.log(`✅ ABVET Bot initialized (${this.personality} mode)`);
    return this;
  }

  /**
   * Process user message and generate response
   * @param {string} message - User message
   * @param {Object} emotionalContext - Current emotional state from PAU
   */
  async processMessage(message, emotionalContext = null) {
    console.log(`💬 Processing message: "${message}"`);

    // Add to conversation history
    this.conversationHistory.push({
      role: 'user',
      content: message,
      emotion: emotionalContext?.emotion,
      timestamp: new Date().toISOString()
    });

    // Generate response based on message and emotional context
    const response = await this.generateResponse(message, emotionalContext);

    // Add response to history
    this.conversationHistory.push({
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    });

    return response;
  }

  /**
   * Generate bot response
   * @param {string} message - User message
   * @param {Object} emotionalContext - Emotional state
   */
  async generateResponse(message, emotionalContext) {
    const lowerMessage = message.toLowerCase();

    // Detect intent
    let response = '';

    // Greeting
    if (lowerMessage.match(/^(hi|hello|hey|hola)/i)) {
      response = this.getGreeting(emotionalContext);
    }
    // Help request
    else if (lowerMessage.includes('help') || lowerMessage.includes('ayuda')) {
      response = this.getHelpMessage();
    }
    // Size recommendation
    else if (lowerMessage.includes('size') || lowerMessage.includes('talla')) {
      response = "I can help you find the perfect size! Could you share your measurements? 📏";
    }
    // Style recommendation
    else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      response = this.getStyleRecommendation(emotionalContext);
    }
    // Price/payment
    else if (lowerMessage.includes('price') || lowerMessage.includes('pay') || lowerMessage.includes('precio')) {
      response = "Let me show you our pricing options. We support biometric payment with ABVET! 💳";
    }
    // Emotional response
    else if (emotionalContext && this.emotionalAwareness) {
      response = this.getEmotionalResponse(message, emotionalContext);
    }
    // Default
    else {
      response = this.getDefaultResponse();
    }

    console.log(`🤖 Bot response: "${response}"`);
    return response;
  }

  /**
   * Get greeting based on emotional state
   */
  getGreeting(emotionalContext) {
    const greetings = {
      celebration: "Hello! You seem excited! 🎉 How can I help you celebrate today?",
      joy: "Hi there! You're radiating positive energy! ✨ What are you looking for?",
      neutral: "Hello! Welcome to TRYONYOU. How can I assist you today? 👋",
      default: "Hi! I'm ABVET, your fashion AI assistant. How can I help? 🤖"
    };

    const emotion = emotionalContext?.emotion || 'default';
    return greetings[emotion] || greetings.default;
  }

  /**
   * Get help message
   */
  getHelpMessage() {
    return `I can help you with:
    
🎯 Finding the perfect outfit
📏 Size recommendations
💳 Payment options
🎨 Style suggestions
❤️ Emotional fashion matching

What would you like to explore?`;
  }

  /**
   * Get style recommendation based on emotion
   */
  getStyleRecommendation(emotionalContext) {
    const emotion = emotionalContext?.emotion;

    const recommendations = {
      celebration: "For your celebratory mood, I recommend our bold Corset-Kimono Fusion collection! ✨",
      joy: "You're feeling great! How about exploring our vibrant and energetic pieces? 🌟",
      neutral: "Let me suggest some versatile pieces that match any mood. Would you like to see them? 👗",
      default: "I'd love to recommend something! Tell me about the occasion or your mood today. 🎨"
    };

    return recommendations[emotion] || recommendations.default;
  }

  /**
   * Generate emotionally-aware response
   */
  getEmotionalResponse(message, emotionalContext) {
    const emotion = emotionalContext.emotion;
    const confidence = emotionalContext.confidence;

    if (confidence < 0.5) {
      return "I'm here to help you find what you're looking for. Tell me more! 😊";
    }

    // High-confidence emotional responses
    if (emotion === 'celebration') {
      return "I can sense your excitement! Let's find something amazing to match your energy! 🎉";
    } else if (emotion === 'joy') {
      return "Your positive vibes are contagious! Let me show you pieces that will enhance your mood! ✨";
    }

    return "I'm listening. How can I make your TRYONYOU experience special? 💫";
  }

  /**
   * Get default response
   */
  getDefaultResponse() {
    const responses = [
      "That's interesting! Tell me more about what you're looking for. 🤔",
      "I'm here to help! Could you give me more details? 💡",
      "Let me assist you with that. What specific aspect interests you? 🎯"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Get conversation history
   */
  getHistory() {
    return this.conversationHistory;
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = [];
    console.log('🗑️ Conversation history cleared');
  }

  /**
   * Update bot settings
   */
  updateSettings(settings) {
    if (settings.personality) this.personality = settings.personality;
    if (settings.language) this.language = settings.language;
    if (settings.emotionalAwareness !== undefined) {
      this.emotionalAwareness = settings.emotionalAwareness;
    }

    console.log('⚙️ Bot settings updated');
  }
}

export default ABVETBot;
