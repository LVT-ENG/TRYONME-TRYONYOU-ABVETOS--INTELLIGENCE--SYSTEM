// TRYONYOU-ABVETOS Server API
// Servidor mínimo para integración con componentes React
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad y configuración
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Simulación de base de datos en memoria para desarrollo
let avatarDatabase = [];
let recommendationsCache = {
  recommendations: [
    { 
      item: "Camisa entallada", 
      category: "Armario Inteligente", 
      price: "€89",
      sustainability: "A+",
      ftt_score: 95
    },
    { 
      item: "Pantalón sin bolsillos visibles", 
      category: "Básicos", 
      price: "€65",
      sustainability: "B",
      ftt_score: 88
    },
    { 
      item: "Look sostenible", 
      category: "Armario Solidario", 
      price: "€120",
      sustainability: "A++",
      ftt_score: 97
    }
  ],
  ftt_trends: ["Minimalismo", "Sostenibilidad", "Tech-wear", "Neo-futurismo"]
};

// Endpoint para generar avatar 3D
app.post('/api/avatar', (req, res) => {
  try {
    const { size, color, city } = req.body;
    
    // Validación básica
    if (!size || !color || !city) {
      return res.status(400).json({
        success: false,
        error: 'Todos los campos son requeridos: size, color, city'
      });
    }

    // Generar avatar con ID único
    const avatar = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      profile: { size, color, city },
      mockups: Array.from({length: 36}, (_, i) => ({
        id: i + 1,
        filename: `mockup-${i+1}.jpg`,
        style: ['casual', 'formal', 'deportivo', 'elegante'][i % 4],
        color_match: Math.random() > 0.5, // Simulación de coincidencia de color
        size_fit: ['perfect', 'good', 'needs_adjustment'][Math.floor(Math.random() * 3)]
      })),
      recommendations_generated: true,
      ftt_analysis: {
        dominant_style: color.toLowerCase().includes('negro') ? 'elegante' : 'casual',
        sustainability_score: Math.floor(Math.random() * 30) + 70, // 70-100
        trend_alignment: Math.floor(Math.random() * 20) + 80 // 80-100
      }
    };

    // Almacenar en "base de datos"
    avatarDatabase.push(avatar);

    res.json({
      success: true,
      message: 'Avatar 3D generado exitosamente',
      avatar
    });

  } catch (error) {
    console.error('Error generando avatar:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor al generar avatar'
    });
  }
});

// Endpoint para recomendaciones Pau (Fashion Trend Tracker)
app.get('/api/recommendations', (req, res) => {
  try {
    const { userId, style_preference, budget_max } = req.query;

    // Personalizar recomendaciones basadas en parámetros
    let personalizedRecommendations = [...recommendationsCache.recommendations];
    
    if (style_preference === 'formal') {
      personalizedRecommendations = personalizedRecommendations.filter(r => 
        r.category.includes('Inteligente') || r.item.includes('entallada')
      );
    }

    if (budget_max) {
      const maxBudget = parseInt(budget_max);
      personalizedRecommendations = personalizedRecommendations.filter(r => {
        const price = parseInt(r.price.replace('€', ''));
        return price <= maxBudget;
      });
    }

    res.json({
      success: true,
      user_id: userId || 'anonymous',
      recommendations: personalizedRecommendations,
      ftt_trends: recommendationsCache.ftt_trends,
      analysis: {
        total_items: personalizedRecommendations.length,
        avg_sustainability: personalizedRecommendations.reduce((acc, r) => {
          const scoreMap = { 'A++': 100, 'A+': 95, 'A': 90, 'B': 80, 'C': 70 };
          return acc + (scoreMap[r.sustainability] || 75);
        }, 0) / personalizedRecommendations.length,
        generated_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error obteniendo recomendaciones:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor al obtener recomendaciones'
    });
  }
});

// Endpoint para integración ADBET (simulado)
app.post('/api/adbet/purchase', (req, res) => {
  try {
    const { item_id, user_profile, payment_method } = req.body;

    // Simulación de procesamiento de pago ADBET
    const transaction = {
      transaction_id: `ADBET_${Date.now()}`,
      item_id,
      status: 'processing',
      estimated_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días
      adbet_integration: {
        blockchain_verified: true,
        sustainability_impact: 'positive',
        carbon_offset: '2.3kg CO2'
      }
    };

    // Simular tiempo de procesamiento
    setTimeout(() => {
      console.log(`Transacción ADBET completada: ${transaction.transaction_id}`);
    }, 2000);

    res.json({
      success: true,
      message: 'Compra iniciada con ADBET',
      transaction
    });

  } catch (error) {
    console.error('Error en compra ADBET:', error);
    res.status(500).json({
      success: false,
      error: 'Error procesando compra con ADBET'
    });
  }
});

// Endpoint de health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'TRYONYOU-ABVETOS-API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    components: {
      avatar_generator: 'operational',
      pau_recommendations: 'operational',
      adbet_integration: 'operational',
      ftt_tracker: 'operational'
    }
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 TRYONYOU-ABVETOS API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎭 Avatar generator: POST http://localhost:${PORT}/api/avatar`);
  console.log(`👗 Pau recommendations: GET http://localhost:${PORT}/api/recommendations`);
  console.log(`💳 ADBET integration: POST http://localhost:${PORT}/api/adbet/purchase`);
});

module.exports = app;