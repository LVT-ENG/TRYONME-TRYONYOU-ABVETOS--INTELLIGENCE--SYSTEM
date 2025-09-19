# Algoritmos de Recomendación - TryOnMe/TryOnYou

## 🧮 Introducción

Este documento describe los algoritmos y metodologías utilizadas en el sistema de recomendaciones AVBETOS para generar sugerencias personalizadas de moda y estilo.

## 🎯 Objetivo del Sistema

Generar recomendaciones de productos de moda altamente personalizadas que:
- Reflejen las preferencias individuales del usuario
- Consideren tendencias actuales del mercado
- Optimicen la compatibilidad estética y funcional
- Maximicen la satisfacción y conversión

## 🔬 Metodología General

### Enfoque Híbrido
El sistema combina múltiples técnicas de recomendación:

1. **Filtrado Basado en Contenido**: Análisis de características del producto
2. **Filtrado Colaborativo**: Patrones de usuarios similares
3. **Análisis de Tendencias**: Integración de datos de popularidad
4. **Personalización Contextual**: Factores situacionales del usuario

## 📊 Algoritmo Principal de Scoring

### Fórmula de Compatibilidad

```
Score = (Style_Weight × Style_Match) + 
        (Color_Weight × Color_Affinity) + 
        (Trend_Weight × Trend_Score) + 
        (Fit_Weight × Fit_Compatibility) + 
        (Context_Weight × Context_Relevance)
```

### Distribución de Pesos

| Componente | Peso Default | Rango Ajustable | Descripción |
|------------|--------------|-----------------|-------------|
| Style_Match | 40% | 30-50% | Compatibilidad de estilo personal |
| Color_Affinity | 25% | 15-35% | Preferencias de color |
| Trend_Score | 20% | 10-30% | Factor de tendencia actual |
| Fit_Compatibility | 15% | 10-25% | Compatibilidad de ajuste/talla |
| Context_Relevance | 0% | 0-20% | Relevancia contextual (futuro) |

## 🎨 Algoritmo de Compatibilidad de Estilo

### Matriz de Estilos

```javascript
const STYLE_MATRIX = {
  'Casual': {
    'Casual': 1.0,
    'Deportivo': 0.8,
    'Urbano': 0.7,
    'Minimalista': 0.6,
    'Bohemio': 0.4,
    'Formal': 0.2,
    'Elegante': 0.2,
    'Vintage': 0.3
  },
  'Formal': {
    'Formal': 1.0,
    'Elegante': 0.9,
    'Minimalista': 0.7,
    'Urbano': 0.3,
    'Casual': 0.2,
    'Deportivo': 0.1,
    'Bohemio': 0.2,
    'Vintage': 0.4
  },
  // ... más estilos
};
```

### Cálculo de Style_Match

```javascript
function calculateStyleMatch(userStyle, productStyle) {
  // Compatibilidad directa desde matriz
  let baseMatch = STYLE_MATRIX[userStyle][productStyle] || 0;
  
  // Aplicar factores de diversificación
  let diversityBonus = calculateDiversityBonus(userStyle, productStyle);
  
  // Score final con bonificación por diversidad
  return Math.min(1.0, baseMatch + diversityBonus);
}

function calculateDiversityBonus(userStyle, productStyle) {
  // Bonificación pequeña para estilos complementarios
  const DIVERSITY_BONUS = 0.1;
  const complementaryStyles = getComplementaryStyles(userStyle);
  
  return complementaryStyles.includes(productStyle) ? DIVERSITY_BONUS : 0;
}
```

## 🌈 Algoritmo de Afinidad de Color

### Teoría del Color Aplicada

#### Paletas de Color Armónicas
```javascript
const COLOR_HARMONIES = {
  'Rojo': {
    complementarios: ['Verde', 'Turquesa'],
    análogos: ['Naranja', 'Rosa', 'Morado'],
    triádicos: ['Azul', 'Amarillo'],
    neutros: ['Negro', 'Blanco', 'Gris', 'Beige']
  },
  // ... más colores
};
```

#### Cálculo de Color_Affinity

```javascript
function calculateColorAffinity(userColors, productColors) {
  let totalAffinity = 0;
  let colorCount = 0;
  
  for (let userColor of userColors) {
    for (let productColor of productColors) {
      totalAffinity += getColorCompatibility(userColor, productColor);
      colorCount++;
    }
  }
  
  return colorCount > 0 ? totalAffinity / colorCount : 0;
}

function getColorCompatibility(color1, color2) {
  // Coincidencia exacta
  if (color1 === color2) return 1.0;
  
  // Colores complementarios
  if (COLOR_HARMONIES[color1].complementarios.includes(color2)) {
    return 0.8;
  }
  
  // Colores análogos
  if (COLOR_HARMONIES[color1].análogos.includes(color2)) {
    return 0.9;
  }
  
  // Colores triádicos
  if (COLOR_HARMONIES[color1].triádicos.includes(color2)) {
    return 0.7;
  }
  
  // Neutros (siempre compatibles)
  if (COLOR_HARMONIES[color1].neutros.includes(color2)) {
    return 0.6;
  }
  
  // Sin compatibilidad específica
  return 0.3;
}
```

## 📈 Algoritmo de Análisis de Tendencias

### Fuentes de Datos de Tendencia

1. **Google Trends API**: Búsquedas relacionadas con moda
2. **Fashion Week Data**: Tendencias de pasarelas
3. **Social Media Analytics**: Hashtags y menciones
4. **Ventas Históricas**: Patrones de compra estacionales

### Cálculo de Trend_Score

```javascript
function calculateTrendScore(productData, currentTrends) {
  let trendScore = 0;
  
  // Factor de popularidad general (30%)
  trendScore += productData.popularity_score * 0.3;
  
  // Tendencias actuales de categoría (40%)
  trendScore += getCategoryTrendScore(productData.category, currentTrends) * 0.4;
  
  // Factor estacional (20%)
  trendScore += getSeasonalRelevance(productData, getCurrentSeason()) * 0.2;
  
  // Factor de novedad (10%)
  trendScore += getNoveltyFactor(productData.launch_date) * 0.1;
  
  return Math.min(1.0, trendScore);
}

function getCategoryTrendScore(category, trends) {
  const categoryTrends = trends.filter(t => t.category === category);
  const avgTrendScore = categoryTrends.reduce((sum, t) => sum + t.score, 0) / categoryTrends.length;
  return avgTrendScore || 0.5; // Default neutro si no hay datos
}
```

## 👕 Algoritmo de Compatibilidad de Ajuste

### Mapping de Preferencias de Ajuste

```javascript
const FIT_COMPATIBILITY_MATRIX = {
  'Ajustado': {
    'Slim Fit': 1.0,
    'Fitted': 0.9,
    'Regular Fit': 0.6,
    'Relaxed Fit': 0.3,
    'Oversized': 0.1
  },
  'Regular': {
    'Regular Fit': 1.0,
    'Fitted': 0.8,
    'Slim Fit': 0.7,
    'Relaxed Fit': 0.8,
    'Oversized': 0.4
  },
  'Holgado': {
    'Oversized': 1.0,
    'Relaxed Fit': 0.9,
    'Regular Fit': 0.7,
    'Fitted': 0.4,
    'Slim Fit': 0.2
  }
};
```

### Cálculo de Fit_Compatibility

```javascript
function calculateFitCompatibility(userFitPreference, productFit) {
  const baseCompatibility = FIT_COMPATIBILITY_MATRIX[userFitPreference][productFit] || 0.5;
  
  // Aplicar factores adicionales
  const seasonalAdjustment = getSeasonalFitAdjustment(productFit);
  const trendAdjustment = getCurrentFitTrend(productFit);
  
  return Math.min(1.0, baseCompatibility + seasonalAdjustment + trendAdjustment);
}
```

## 🔀 Algoritmo de Diversificación

### Objetivos de Diversificación

1. **Diversidad de Categorías**: Evitar monotonía en tipos de prenda
2. **Diversidad de Precios**: Incluir opciones de diferentes rangos
3. **Diversidad de Marcas**: No concentrar en una sola marca
4. **Diversidad Estilística**: Incluir estilos complementarios

### Implementación de Diversificación

```javascript
function diversifyRecommendations(rankedProducts, userProfile) {
  const diversifiedList = [];
  const categoryCount = {};
  const brandCount = {};
  const priceRanges = ['low', 'medium', 'high'];
  const priceRangeCount = { low: 0, medium: 0, high: 0 };
  
  for (let product of rankedProducts) {
    if (shouldIncludeForDiversity(product, categoryCount, brandCount, priceRangeCount)) {
      diversifiedList.push(product);
      
      // Actualizar contadores
      updateDiversityCounters(product, categoryCount, brandCount, priceRangeCount);
      
      if (diversifiedList.length >= 20) break;
    }
  }
  
  return diversifiedList;
}

function shouldIncludeForDiversity(product, categoryCount, brandCount, priceRangeCount) {
  const MAX_PER_CATEGORY = 4;
  const MAX_PER_BRAND = 3;
  const MAX_PER_PRICE_RANGE = 8;
  
  // Verificar límites de diversidad
  if ((categoryCount[product.category] || 0) >= MAX_PER_CATEGORY) return false;
  if ((brandCount[product.brand] || 0) >= MAX_PER_BRAND) return false;
  if ((priceRangeCount[product.priceRange] || 0) >= MAX_PER_PRICE_RANGE) return false;
  
  return true;
}
```

## 🎯 Algoritmo de Personalización Avanzada

### Machine Learning Components (Futuro)

#### Collaborative Filtering
```javascript
function calculateCollaborativeScore(userId, productId, userSimilarityMatrix) {
  let score = 0;
  let similarUserCount = 0;
  
  const similarUsers = userSimilarityMatrix[userId] || {};
  
  for (let similarUserId in similarUsers) {
    const similarity = similarUsers[similarUserId];
    const userRating = getUserProductRating(similarUserId, productId);
    
    if (userRating > 0) {
      score += similarity * userRating;
      similarUserCount++;
    }
  }
  
  return similarUserCount > 0 ? score / similarUserCount : 0;
}
```

#### Content-Based Filtering
```javascript
function calculateContentBasedScore(userProfile, productFeatures) {
  const userFeatureWeights = extractUserFeatureWeights(userProfile);
  let score = 0;
  
  for (let feature in productFeatures) {
    const weight = userFeatureWeights[feature] || 0;
    const value = productFeatures[feature];
    score += weight * value;
  }
  
  return Math.min(1.0, score);
}
```

## 📊 Métricas de Evaluación

### Métricas de Precisión

#### Precision@K
```javascript
function calculatePrecisionAtK(recommendations, actualPurchases, k) {
  const topK = recommendations.slice(0, k);
  const relevantItems = topK.filter(item => actualPurchases.includes(item.id));
  return relevantItems.length / k;
}
```

#### Recall@K
```javascript
function calculateRecallAtK(recommendations, actualPurchases, k) {
  const topK = recommendations.slice(0, k);
  const relevantItems = topK.filter(item => actualPurchases.includes(item.id));
  return actualPurchases.length > 0 ? relevantItems.length / actualPurchases.length : 0;
}
```

### Métricas de Diversidad

#### Intra-List Diversity
```javascript
function calculateIntraListDiversity(recommendations) {
  let totalDistance = 0;
  let pairCount = 0;
  
  for (let i = 0; i < recommendations.length; i++) {
    for (let j = i + 1; j < recommendations.length; j++) {
      totalDistance += calculateItemDistance(recommendations[i], recommendations[j]);
      pairCount++;
    }
  }
  
  return pairCount > 0 ? totalDistance / pairCount : 0;
}
```

## 🚀 Optimizaciones de Performance

### Caching Strategies

#### Cache de Compatibilidad de Usuarios
```javascript
const userCompatibilityCache = new Map();

function getCachedUserCompatibility(userId, productId) {
  const cacheKey = `${userId}-${productId}`;
  return userCompatibilityCache.get(cacheKey);
}

function setCachedUserCompatibility(userId, productId, score) {
  const cacheKey = `${userId}-${productId}`;
  userCompatibilityCache.set(cacheKey, score);
}
```

#### Pre-computación de Tendencias
```javascript
function precomputeTrendScores(products, trends) {
  const trendScoreCache = new Map();
  
  for (let product of products) {
    const trendScore = calculateTrendScore(product, trends);
    trendScoreCache.set(product.id, trendScore);
  }
  
  return trendScoreCache;
}
```

### Batch Processing

```javascript
function processRecommendationsBatch(users, products, batchSize = 100) {
  const results = [];
  
  for (let i = 0; i < users.length; i += batchSize) {
    const userBatch = users.slice(i, i + batchSize);
    const batchResults = userBatch.map(user => 
      generateRecommendationsForUser(user, products)
    );
    results.push(...batchResults);
  }
  
  return results;
}
```

## 🔧 Configuración de Algoritmos

### Parámetros Ajustables

```javascript
const ALGORITHM_CONFIG = {
  // Pesos principales
  weights: {
    style: 0.40,
    color: 0.25,
    trend: 0.20,
    fit: 0.15
  },
  
  // Límites del sistema
  limits: {
    maxRecommendations: 20,
    minScore: 0.6,
    maxPerCategory: 4,
    maxPerBrand: 3
  },
  
  // Factores de diversidad
  diversity: {
    enableCategoryDiversity: true,
    enableBrandDiversity: true,
    enablePriceDiversity: true,
    diversityWeight: 0.1
  },
  
  // Cache y performance
  performance: {
    enableCaching: true,
    cacheExpiryMinutes: 60,
    batchSize: 100,
    maxExecutionTimeMs: 300000
  }
};
```

## 📚 Referencias y Bibliografía

### Papers de Investigación
- "Collaborative Filtering for Implicit Feedback Datasets" - Hu, Koren, Volinsky
- "Matrix Factorization Techniques for Recommender Systems" - Koren, Bell, Volinsky
- "Content-based Recommendation Systems" - Pazzani, Billsus

### Librerías y Frameworks
- Google Apps Script Documentation
- Fashion Color Theory Standards
- Recommendation System Best Practices

### APIs y Fuentes de Datos
- Google Trends API
- Fashion Industry Analytics
- Seasonal Fashion Patterns Database

---

**Versión**: 1.0.0  
**Última actualización**: Septiembre 2024  
**Mantenido por**: Equipo LVT-ENG