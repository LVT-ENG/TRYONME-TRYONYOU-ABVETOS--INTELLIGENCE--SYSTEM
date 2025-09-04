/**
 * AVBETOS Retailers API
 * External API for retailers to consume AVBETOS intelligence system
 * Allows brands like Levi's, Zara to integrate with TryOnMe/TryOnYou
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Key validation middleware
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKeys = process.env.RETAILER_API_KEYS?.split(',') || ['demo-key-levi', 'demo-key-zara'];
  
  if (!apiKey || !validApiKeys.includes(apiKey)) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Valid API key required'
    });
  }
  
  req.retailer = {
    apiKey,
    name: apiKey.includes('levi') ? 'Levi\'s' : apiKey.includes('zara') ? 'Zara' : 'Unknown'
  };
  next();
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'AVBETOS Retailers API',
    version: '1.0.0'
  });
});

// AVBETOS Avatar 3D API
app.post('/api/retailers/avatar/build', validateApiKey, async (req, res) => {
  try {
    const { measurements, photo, userId } = req.body;
    
    if (!measurements) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Measurements are required'
      });
    }

    // Mock avatar generation process
    const avatarId = `avatar_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate processing time
    setTimeout(() => {
      console.log(`Avatar ${avatarId} generated for ${req.retailer.name}`);
    }, 1000);

    res.json({
      success: true,
      data: {
        avatarId,
        modelUrl: `https://cdn.tryonyou.app/avatars/${avatarId}.glb`,
        measurements: measurements,
        generatedAt: new Date().toISOString(),
        retailer: req.retailer.name
      }
    });
  } catch (error) {
    console.error('Avatar generation error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to generate avatar'
    });
  }
});

// AVBETOS Fit Comparator API
app.post('/api/retailers/fit/compare', validateApiKey, async (req, res) => {
  try {
    const { avatarId, garments } = req.body;
    
    if (!avatarId || !garments || !Array.isArray(garments)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'avatarId and garments array are required'
      });
    }

    // Mock fit comparison algorithm
    const fitResults = garments.map(garment => ({
      garmentId: garment.id,
      fitScore: Math.floor(Math.random() * 30) + 70, // Score between 70-100
      adjustments: {
        waist: Math.random() > 0.5 ? 'perfect' : 'slightly loose',
        length: Math.random() > 0.5 ? 'perfect' : 'needs hemming',
        shoulders: 'perfect'
      },
      recommendation: Math.random() > 0.3 ? 'recommended' : 'consider size adjustment'
    }));

    res.json({
      success: true,
      data: {
        avatarId,
        fitResults: fitResults.sort((a, b) => b.fitScore - a.fitScore),
        processedAt: new Date().toISOString(),
        retailer: req.retailer.name
      }
    });
  } catch (error) {
    console.error('Fit comparison error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to process fit comparison'
    });
  }
});

// AVBETOS PAU Emotional Recommender API
app.post('/api/retailers/recommend/pau', validateApiKey, async (req, res) => {
  try {
    const { avatarId, emotionalState, context, preferences } = req.body;
    
    if (!avatarId) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'avatarId is required'
      });
    }

    // Mock PAU emotional recommendation
    const recommendations = [
      {
        garmentId: 'LEVI_501_ORIGINAL',
        reason: 'Classic denim for confident, timeless appeal',
        emotionalFit: 95,
        styleMatch: 88
      },
      {
        garmentId: 'ZARA_BASIC_TEE',
        reason: 'Versatile piece for relaxed, comfortable mood',
        emotionalFit: 82,
        styleMatch: 91
      }
    ];

    res.json({
      success: true,
      data: {
        avatarId,
        emotionalState: emotionalState || 'neutral',
        recommendations,
        processedAt: new Date().toISOString(),
        retailer: req.retailer.name
      }
    });
  } catch (error) {
    console.error('PAU recommendation error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to generate recommendations'
    });
  }
});

// Mock Creative Auto-Production API
app.post('/api/retailers/cap/generate', validateApiKey, async (req, res) => {
  try {
    const { measurements, preferences, brandPrompt } = req.body;
    
    if (!measurements || !brandPrompt) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Measurements and brandPrompt are required'
      });
    }

    const designId = `design_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    res.json({
      success: true,
      data: {
        designId,
        mockupUrl: `https://cdn.tryonyou.app/mockups/${designId}.png`,
        printFile: `https://cdn.tryonyou.app/prints/${designId}.tiff`,
        pattern: `https://cdn.tryonyou.app/patterns/${designId}.dxf`,
        measurements,
        brandPrompt,
        createdAt: new Date().toISOString(),
        retailer: req.retailer.name
      }
    });
  } catch (error) {
    console.error('CAP generation error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to generate creative design'
    });
  }
});

// Get retailer analytics
app.get('/api/retailers/analytics', validateApiKey, (req, res) => {
  res.json({
    success: true,
    data: {
      retailer: req.retailer.name,
      apiCalls: {
        total: Math.floor(Math.random() * 10000),
        thisMonth: Math.floor(Math.random() * 1000),
        today: Math.floor(Math.random() * 100)
      },
      popularEndpoints: [
        { endpoint: '/avatar/build', calls: Math.floor(Math.random() * 1000) },
        { endpoint: '/fit/compare', calls: Math.floor(Math.random() * 800) },
        { endpoint: '/recommend/pau', calls: Math.floor(Math.random() * 600) }
      ],
      period: new Date().toISOString()
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'API endpoint not found'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 AVBETOS Retailers API running on port ${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/docs`);
  });
}

module.exports = app;