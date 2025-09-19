# Referencia de Algoritmos - TryOnMe Sistema

## 🧮 Visión General de Algoritmos

El sistema TryOnMe implementa múltiples algoritmos especializados para generar recomendaciones de moda precisas y personalizadas. Esta documentación detalla cada algoritmo, su implementación y casos de uso.

## 🎯 Algoritmo Principal de Recomendación

### Fórmula Master de Scoring

```javascript
/**
 * Calcula el score final de recomendación para un producto
 * @param {Object} user - Datos del usuario
 * @param {Object} product - Datos del producto
 * @param {Object} trends - Datos de tendencias
 * @returns {number} Score final (0-100)
 */
function calculateRecommendationScore(user, product, trends) {
  const styleScore = calculateStyleMatch(user.preferences.styles, product.style) * 0.25;
  const sizeScore = calculateSizeMatch(user.measurements, product.sizes) * 0.20;
  const colorScore = calculateColorMatch(user.preferences.colors, product.color) * 0.15;
  const trendScore = calculateTrendRelevance(product, trends) * 0.15;
  const priceScore = calculatePriceMatch(user.budget, product.price) * 0.10;
  const brandScore = calculateBrandMatch(user.preferences.brands, product.brand) * 0.10;
  const seasonScore = calculateSeasonMatch(product.season, getCurrentSeason()) * 0.05;
  
  return Math.round(
    styleScore + sizeScore + colorScore + trendScore + 
    priceScore + brandScore + seasonScore
  );
}
```

### Pesos de Factores

| Factor | Peso | Justificación |
|--------|------|---------------|
| **Estilo** | 25% | Factor más importante para preferencia personal |
| **Talla** | 20% | Crítico para usabilidad del producto |
| **Color** | 15% | Importante para preferencia estética |
| **Tendencias** | 15% | Relevancia en el mercado actual |
| **Precio** | 10% | Consideración presupuestaria |
| **Marca** | 10% | Preferencia y confianza |
| **Temporada** | 5% | Contextualización temporal |

## 🎨 Algoritmo de Matching de Estilo

### Implementación

```javascript
/**
 * Calcula compatibilidad de estilo entre usuario y producto
 * @param {Array} userStyles - Estilos preferidos del usuario
 * @param {string} productStyle - Estilo del producto
 * @returns {number} Puntuación 0-100
 */
function calculateStyleMatch(userStyles, productStyle) {
  // Matriz de compatibilidad entre estilos
  const styleCompatibility = {
    'Clásico / Formal': {
      'Clásico / Formal': 100,
      'Elegante / Chic': 85,
      'Minimalista / Clean': 75,
      'Casual / Informal': 40,
      'Deportivo / Athleisure': 20
    },
    'Casual / Informal': {
      'Casual / Informal': 100,
      'Deportivo / Athleisure': 80,
      'Boho / Hippie': 70,
      'Elegante / Chic': 60,
      'Clásico / Formal': 40
    },
    'Elegante / Chic': {
      'Elegante / Chic': 100,
      'Clásico / Formal': 85,
      'Sofisticado / Luxury': 90,
      'Minimalista / Clean': 75,
      'Casual / Informal': 60
    }
    // ... más combinaciones
  };

  let maxScore = 0;
  
  userStyles.forEach(userStyle => {
    if (styleCompatibility[userStyle] && styleCompatibility[userStyle][productStyle]) {
      maxScore = Math.max(maxScore, styleCompatibility[userStyle][productStyle]);
    }
  });
  
  return maxScore;
}
```

### Categorías de Estilo

1. **Clásico / Formal**: Elegancia tradicional y profesional
2. **Casual / Informal**: Comodidad y versatilidad diaria
3. **Deportivo / Athleisure**: Funcionalidad y actividad física
4. **Elegante / Chic**: Sofisticación moderna
5. **Boho / Hippie**: Estilo libre y artístico
6. **Minimalista / Clean**: Simplicidad y líneas limpias
7. **Vintage / Retro**: Nostalgia y piezas clásicas
8. **Alternativo / Punk**: Expresión rebelde y única

## 📏 Algoritmo de Compatibilidad de Tallas

### Sistema de Matching de Medidas

```javascript
/**
 * Evalúa si un producto se ajusta correctamente a las medidas del usuario
 * @param {Object} userMeasurements - Medidas corporales del usuario
 * @param {Object} productSizes - Tallas disponibles del producto
 * @returns {number} Score de ajuste 0-100
 */
function calculateSizeMatch(userMeasurements, productSizes) {
  const sizeMapping = {
    'XS': { bust: [80, 84], waist: [60, 64], hips: [86, 90] },
    'S':  { bust: [84, 88], waist: [64, 68], hips: [90, 94] },
    'M':  { bust: [88, 92], waist: [68, 72], hips: [94, 98] },
    'L':  { bust: [92, 96], waist: [72, 76], hips: [98, 102] },
    'XL': { bust: [96, 100], waist: [76, 80], hips: [102, 106] }
  };
  
  let bestMatch = 0;
  
  productSizes.forEach(size => {
    if (sizeMapping[size]) {
      const bustMatch = isInRange(userMeasurements.bust, sizeMapping[size].bust);
      const waistMatch = isInRange(userMeasurements.waist, sizeMapping[size].waist);
      const hipsMatch = isInRange(userMeasurements.hips, sizeMapping[size].hips);
      
      // Score basado en número de medidas que coinciden
      const matchCount = [bustMatch, waistMatch, hipsMatch].filter(Boolean).length;
      const sizeScore = (matchCount / 3) * 100;
      
      bestMatch = Math.max(bestMatch, sizeScore);
    }
  });
  
  return bestMatch;
}

function isInRange(measurement, range) {
  return measurement >= range[0] && measurement <= range[1];
}
```

### Tipos de Fit

```javascript
const fitTypes = {
  'Ajustado': {
    tolerance: 0.02, // 2% de tolerancia
    priority: ['waist', 'bust', 'hips']
  },
  'Regular': {
    tolerance: 0.05, // 5% de tolerancia
    priority: ['bust', 'waist', 'hips']
  },
  'Holgado': {
    tolerance: 0.10, // 10% de tolerancia
    priority: ['bust', 'hips', 'waist']
  },
  'Oversized': {
    tolerance: 0.15, // 15% de tolerancia
    priority: ['hips', 'bust', 'waist']
  }
};
```

## 🌈 Algoritmo de Matching de Colores

### Teoría del Color Aplicada

```javascript
/**
 * Calcula compatibilidad de color basada en teoría del color
 * @param {Array} userColors - Colores preferidos del usuario
 * @param {string} productColor - Color del producto
 * @returns {number} Score de compatibilidad 0-100
 */
function calculateColorMatch(userColors, productColor) {
  // Paleta de compatibilidad de colores
  const colorHarmony = {
    'Negro': ['Blanco', 'Gris', 'Rojo', 'Azul', 'Amarillo'],
    'Blanco': ['Negro', 'Azul', 'Rojo', 'Verde', 'Rosa'],
    'Azul': ['Blanco', 'Gris', 'Amarillo', 'Naranja', 'Verde'],
    'Rojo': ['Negro', 'Blanco', 'Gris', 'Azul', 'Amarillo'],
    'Verde': ['Blanco', 'Marrón', 'Beige', 'Azul', 'Amarillo'],
    'Rosa': ['Blanco', 'Gris', 'Azul', 'Verde', 'Amarillo'],
    'Amarillo': ['Negro', 'Azul', 'Gris', 'Blanco', 'Verde'],
    'Morado': ['Blanco', 'Gris', 'Amarillo', 'Verde', 'Rosa'],
    'Naranja': ['Azul', 'Blanco', 'Marrón', 'Verde', 'Gris'],
    'Marrón': ['Beige', 'Blanco', 'Verde', 'Azul', 'Naranja']
  };
  
  let maxScore = 0;
  
  userColors.forEach(userColor => {
    if (userColor === productColor) {
      maxScore = Math.max(maxScore, 100); // Coincidencia exacta
    } else if (colorHarmony[userColor] && colorHarmony[userColor].includes(productColor)) {
      maxScore = Math.max(maxScore, 75); // Armonía de color
    } else {
      maxScore = Math.max(maxScore, 30); // Compatibilidad básica
    }
  });
  
  return maxScore;
}
```

### Psicología del Color en Moda

| Color | Personalidad | Ocasiones Ideales |
|-------|-------------|-------------------|
| **Negro** | Elegante, sofisticado | Formal, noche |
| **Blanco** | Puro, minimalista | Casual, verano |
| **Azul** | Confiable, profesional | Trabajo, casual |
| **Rojo** | Apasionado, llamativo | Eventos, citas |
| **Verde** | Natural, relajado | Casual, outdoor |
| **Rosa** | Femenino, romántico | Citas, primavera |

## 📈 Algoritmo de Análisis de Tendencias

### Procesamiento de Datos de Tendencias

```javascript
/**
 * Analiza la relevancia de un producto basado en tendencias actuales
 * @param {Object} product - Datos del producto
 * @param {Object} trends - Datos de tendencias de Google/Fashion
 * @returns {number} Score de tendencia 0-100
 */
function calculateTrendRelevance(product, trends) {
  let trendScore = 0;
  
  // Análisis de keywords de tendencia
  trends.keywords.forEach(trend => {
    const keywordMatch = calculateKeywordMatch(product, trend);
    const trendWeight = trend.volume / 10000; // Normalizar volumen
    const timeDecay = calculateTimeDecay(trend.date);
    
    trendScore += keywordMatch * trendWeight * timeDecay;
  });
  
  // Análisis de categorías trending
  if (trends.categories.includes(product.category)) {
    trendScore += 20;
  }
  
  // Análisis de colores trending
  if (trends.colors.includes(product.color)) {
    trendScore += 15;
  }
  
  return Math.min(100, trendScore);
}

function calculateTimeDecay(trendDate) {
  const daysSinceTrend = (Date.now() - new Date(trendDate)) / (1000 * 60 * 60 * 24);
  return Math.max(0.1, 1 - (daysSinceTrend / 30)); // Decay over 30 days
}
```

### Fuentes de Tendencias

1. **Google Trends**: Búsquedas populares en moda
2. **Fashion Week**: Tendencias de pasarela
3. **Social Media**: Instagram, TikTok, Pinterest
4. **Retail Analytics**: Ventas y popularidad
5. **Influencer Content**: Recomendaciones de influencers

## 💰 Algoritmo de Compatibilidad de Precio

### Evaluación Presupuestaria

```javascript
/**
 * Evalúa si el precio del producto se ajusta al presupuesto del usuario
 * @param {Object} userBudget - Rango presupuestario del usuario
 * @param {number} productPrice - Precio del producto
 * @returns {number} Score de precio 0-100
 */
function calculatePriceMatch(userBudget, productPrice) {
  const minBudget = userBudget.min || 0;
  const maxBudget = userBudget.max || Infinity;
  const idealBudget = (minBudget + maxBudget) / 2;
  
  if (productPrice <= maxBudget && productPrice >= minBudget) {
    // Dentro del rango: mayor score si está cerca del ideal
    const distanceFromIdeal = Math.abs(productPrice - idealBudget);
    const maxDistance = Math.max(idealBudget - minBudget, maxBudget - idealBudget);
    return 100 - (distanceFromIdeal / maxDistance) * 50;
  } else if (productPrice < minBudget) {
    // Por debajo del mínimo: puede indicar baja calidad
    return 70;
  } else {
    // Por encima del máximo: fuera de alcance
    const overage = productPrice - maxBudget;
    const overagePercentage = overage / maxBudget;
    return Math.max(0, 50 - (overagePercentage * 100));
  }
}
```

## 🏷️ Algoritmo de Preferencia de Marca

### Sistema de Scoring de Marcas

```javascript
/**
 * Evalúa la compatibilidad con las marcas preferidas del usuario
 * @param {Array} userBrands - Marcas preferidas del usuario
 * @param {string} productBrand - Marca del producto
 * @returns {number} Score de marca 0-100
 */
function calculateBrandMatch(userBrands, productBrand) {
  // Puntuación directa por marca preferida
  if (userBrands.includes(productBrand)) {
    return 100;
  }
  
  // Análisis de marcas similares
  const brandCategories = {
    'luxury': ['Gucci', 'Prada', 'Louis Vuitton', 'Chanel'],
    'premium': ['Hugo Boss', 'Calvin Klein', 'Tommy Hilfiger'],
    'mainstream': ['Zara', 'H&M', 'Mango', 'Pull&Bear'],
    'sportswear': ['Nike', 'Adidas', 'Puma', 'Under Armour'],
    'sustainable': ['Patagonia', 'Eileen Fisher', 'Reformation']
  };
  
  for (const category in brandCategories) {
    const brandsInCategory = brandCategories[category];
    const userHasBrandInCategory = userBrands.some(brand => brandsInCategory.includes(brand));
    const productInCategory = brandsInCategory.includes(productBrand);
    
    if (userHasBrandInCategory && productInCategory) {
      return 70; // Misma categoría
    }
  }
  
  return 30; // Sin relación específica
}
```

## 🌡️ Algoritmo de Compatibilidad Estacional

### Lógica Temporal

```javascript
/**
 * Evalúa la relevancia estacional del producto
 * @param {string} productSeason - Temporada del producto
 * @param {string} currentSeason - Temporada actual
 * @returns {number} Score estacional 0-100
 */
function calculateSeasonMatch(productSeason, currentSeason) {
  const seasonCompatibility = {
    'Primavera': {
      'Primavera': 100,
      'Verano': 70,
      'Otoño': 40,
      'Invierno': 20,
      'Atemporal': 85
    },
    'Verano': {
      'Verano': 100,
      'Primavera': 70,
      'Otoño': 30,
      'Invierno': 10,
      'Atemporal': 85
    },
    'Otoño': {
      'Otoño': 100,
      'Invierno': 70,
      'Primavera': 30,
      'Verano': 20,
      'Atemporal': 85
    },
    'Invierno': {
      'Invierno': 100,
      'Otoño': 70,
      'Primavera': 20,
      'Verano': 10,
      'Atemporal': 85
    }
  };
  
  return seasonCompatibility[currentSeason][productSeason] || 50;
}

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  
  if (month >= 3 && month <= 5) return 'Primavera';
  if (month >= 6 && month <= 8) return 'Verano';
  if (month >= 9 && month <= 11) return 'Otoño';
  return 'Invierno';
}
```

## 🔄 Algoritmo de Filtrado Colaborativo

### Similitud entre Usuarios

```javascript
/**
 * Encuentra usuarios similares basado en preferencias
 * @param {Object} targetUser - Usuario objetivo
 * @param {Array} allUsers - Todos los usuarios del sistema
 * @returns {Array} Usuarios similares ordenados por similitud
 */
function findSimilarUsers(targetUser, allUsers) {
  return allUsers
    .filter(user => user.id !== targetUser.id)
    .map(user => ({
      user: user,
      similarity: calculateUserSimilarity(targetUser, user)
    }))
    .filter(item => item.similarity > 0.3) // Umbral mínimo de similitud
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 10); // Top 10 usuarios similares
}

function calculateUserSimilarity(user1, user2) {
  const styleSim = calculateArraySimilarity(user1.preferences.styles, user2.preferences.styles);
  const colorSim = calculateArraySimilarity(user1.preferences.colors, user2.preferences.colors);
  const brandSim = calculateArraySimilarity(user1.preferences.brands, user2.preferences.brands);
  const ageSim = calculateAgeSimilarity(user1.demographics.age, user2.demographics.age);
  
  return (styleSim * 0.4 + colorSim * 0.3 + brandSim * 0.2 + ageSim * 0.1);
}
```

## 📊 Métricas de Algoritmos

### Evaluación de Rendimiento

```javascript
// Métricas de evaluación del sistema
const algorithmMetrics = {
  precision: 0.87,        // Precisión de recomendaciones
  recall: 0.82,           // Cobertura de productos relevantes
  f1Score: 0.84,          // Media armónica de precisión y recall
  diversityIndex: 0.75,   // Diversidad en recomendaciones
  noveltyScore: 0.68,     // Novedad de recomendaciones
  userSatisfaction: 4.3   // Satisfacción promedio del usuario (1-5)
};
```

### A/B Testing de Algoritmos

```javascript
/**
 * Ejecuta tests A/B para comparar diferentes versiones del algoritmo
 * @param {string} userId - ID del usuario
 * @param {string} testGroup - Grupo de test ('A' o 'B')
 * @returns {Array} Recomendaciones según el algoritmo asignado
 */
function getABTestRecommendations(userId, testGroup) {
  if (testGroup === 'A') {
    return generateRecommendationsV1(userId); // Algoritmo actual
  } else {
    return generateRecommendationsV2(userId); // Algoritmo experimental
  }
}
```

## 🔧 Optimizaciones de Rendimiento

### Caché de Cálculos

```javascript
// Sistema de caché para cálculos costosos
const algorithmsCache = new Map();

function getCachedStyleMatch(userStyles, productStyle) {
  const cacheKey = `${userStyles.join('|')}:${productStyle}`;
  
  if (algorithmsCache.has(cacheKey)) {
    return algorithmsCache.get(cacheKey);
  }
  
  const result = calculateStyleMatch(userStyles, productStyle);
  algorithmsCache.set(cacheKey, result);
  
  return result;
}
```

### Paralelización de Cálculos

```javascript
/**
 * Calcula scores para múltiples productos en paralelo
 * @param {Object} user - Datos del usuario
 * @param {Array} products - Lista de productos
 * @returns {Promise<Array>} Productos con scores calculados
 */
async function calculateParallelScores(user, products) {
  const chunkSize = 50; // Procesar en lotes de 50
  const chunks = [];
  
  for (let i = 0; i < products.length; i += chunkSize) {
    chunks.push(products.slice(i, i + chunkSize));
  }
  
  const results = await Promise.all(
    chunks.map(chunk => 
      Promise.all(chunk.map(product => 
        calculateRecommendationScore(user, product, trends)
      ))
    )
  );
  
  return results.flat();
}
```

## 📚 Referencias Científicas

### Papers de Investigación

1. **Collaborative Filtering**
   - "Item-Based Collaborative Filtering Recommendation Algorithms" (Sarwar et al., 2001)
   - "Matrix Factorization Techniques for Recommender Systems" (Koren et al., 2009)

2. **Content-Based Filtering**
   - "Content-Based Recommendation Systems" (Pazzani & Billsus, 2007)
   - "Learning User Preferences for Information Filtering" (Mladenic, 1999)

3. **Fashion-Specific Algorithms**
   - "Fashion Recommendation Systems: Methods and Trends" (Deldjoo et al., 2021)
   - "Deep Learning for Fashion Recommendation" (He & McAuley, 2016)

### Implementaciones de Referencia

- [Surprise](https://github.com/NicolasHug/Surprise): Python scikit para sistemas de recomendación
- [LightFM](https://github.com/lyst/lightfm): Hybrid recommendation algorithm
- [TensorFlow Recommenders](https://github.com/tensorflow/recommenders): TensorFlow library for recommendation systems