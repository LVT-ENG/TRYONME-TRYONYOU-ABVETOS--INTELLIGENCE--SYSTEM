/**
 * AVBET Advanced Sandbox
 * Biometric payment system with WebAuthn verification, voice/ocular challenges
 * and Stripe integration for secure payments
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const biometricRoutes = require('./routes/biometric');
const paymentRoutes = require('./routes/payments');
const challengeRoutes = require('./routes/challenges');
const { initializeDatabase } = require('./utils/database');

const app = express();
const PORT = process.env.PORT || 3003;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://js.stripe.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.stripe.com"],
      frameSrc: ["'self'", "https://js.stripe.com"],
      workerSrc: ["'self'", "blob:"]
    }
  }
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting for biometric operations
const biometricLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 biometric operations per windowMs
  message: 'Too many biometric verification attempts, please try again later.'
});

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 payment attempts per windowMs
  message: 'Too many payment attempts, please try again later.'
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'AVBET Advanced Sandbox',
    version: '1.0.0',
    features: {
      webauthn: true,
      voiceChallenge: true,
      ocularChallenge: true,
      stripeIntegration: true
    }
  });
});

// Main sandbox page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Apply rate limiting to specific routes
app.use('/api/biometric', biometricLimiter, biometricRoutes);
app.use('/api/payments', paymentLimiter, paymentRoutes);
app.use('/api/challenges', biometricLimiter, challengeRoutes);

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    name: 'AVBET Advanced Sandbox API',
    version: '1.0.0',
    description: 'Biometric payment verification system with WebAuthn, voice, and ocular challenges',
    endpoints: {
      biometric: {
        '/api/biometric/register/begin': 'POST - Start WebAuthn registration',
        '/api/biometric/register/complete': 'POST - Complete WebAuthn registration',
        '/api/biometric/authenticate/begin': 'POST - Start WebAuthn authentication',
        '/api/biometric/authenticate/complete': 'POST - Complete WebAuthn authentication'
      },
      challenges: {
        '/api/challenges/voice/start': 'POST - Start voice challenge',
        '/api/challenges/voice/verify': 'POST - Verify voice challenge',
        '/api/challenges/ocular/start': 'POST - Start ocular challenge',
        '/api/challenges/ocular/verify': 'POST - Verify ocular challenge'
      },
      payments: {
        '/api/payments/create-intent': 'POST - Create Stripe payment intent',
        '/api/payments/verify-biometric': 'POST - Verify biometric before payment',
        '/api/payments/process': 'POST - Process biometric-verified payment',
        '/api/payments/history': 'GET - Get payment history'
      }
    },
    testCards: {
      success: '4242424242424242',
      decline: '4000000000000002',
      requiresAuthentication: '4000002500003155'
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('AVBET Sandbox Error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong with biometric processing'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'AVBET sandbox endpoint not found'
  });
});

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    console.log('✅ AVBET Database initialized');
    
    app.listen(PORT, () => {
      console.log(`🚀 AVBET Advanced Sandbox running on port ${PORT}`);
      console.log(`🔐 Biometric testing: http://localhost:${PORT}`);
      console.log(`📖 API docs: http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    console.error('❌ Failed to start AVBET sandbox:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;