# AVBETOS Core System Documentation

## 🎯 Introducción

El sistema AVBETOS (Advanced Virtual Biometric Try-On System) es el núcleo de inteligencia del sistema TryOnMe/TryOnYou. Este documento describe la arquitectura, componentes y funcionamiento del motor de recomendaciones.

## 🏗️ Arquitectura del Sistema

### Componentes Principales

#### 1. Motor de Recomendaciones
- **Ubicación**: `google-apps-script/motor.gs`
- **Función principal**: `initTryOnMe()`
- **Propósito**: Generar recomendaciones personalizadas basadas en preferencias de usuario

#### 2. Sistema de Validación
- **Ubicación**: `google-apps-script/helpers.gs`
- **Funciones clave**: `validateUser()`, `validateSystem()`
- **Propósito**: Validar integridad de datos y entrada de usuarios

#### 3. Utilidades del Sistema
- **Ubicación**: `google-apps-script/utils.gs`
- **Funciones**: Mantenimiento, reportes, limpieza de datos
- **Propósito**: Operaciones de soporte y administración

## 📊 Modelo de Datos

### Estructura de Usuario
```javascript
{
  id: "string",           // Identificador único
  nombre: "string",       // Nombre completo
  email: "string",        // Email válido
  sexo: "string",         // "Masculino", "Femenino", "Otro"
  edad: number,           // 18-100
  estilo_favorito: "string", // Referencia a Lists.Estilos
  preferencias: {
    colores: ["string"],     // Array de colores preferidos
    tipos_prenda: ["string"], // Tipos de prendas favoritas
    ajuste: "string",        // "Ajustado", "Regular", "Holgado"
    clima: "string"          // "Cálido", "Frío", "Templado"
  }
}
```

### Estructura de Recomendación
```javascript
{
  usuario_id: "string",      // Referencia al usuario
  producto_id: "string",     // ID único del producto
  nombre: "string",          // Nombre del producto
  score: number,             // Puntuación 0-100
  fuente: "string",          // "AI", "Trending", "Manual"
  url_imagen: "string",      // URL de la imagen del producto
  metadatos: {
    categoria: "string",     // Categoría del producto
    marca: "string",         // Marca del producto
    precio: number,          // Precio aproximado
    disponibilidad: boolean  // Si está disponible
  }
}
```

## 🧠 Algoritmo de Recomendaciones

### Proceso de Cálculo

#### 1. Análisis de Perfil de Usuario
```javascript
/**
 * Analiza el perfil del usuario para extraer preferencias
 * @param {Object} userProfile - Perfil del usuario
 * @returns {Object} Análisis de preferencias ponderado
 */
function analyzeUserProfile(userProfile) {
  return {
    style_weight: calculateStylePreference(userProfile.estilo_favorito),
    color_affinity: analyzeColorPreferences(userProfile.preferencias.colores),
    fit_preference: mapFitPreference(userProfile.preferencias.ajuste),
    climate_factor: getClimateFactor(userProfile.preferencias.clima)
  };
}
```

#### 2. Cálculo de Score de Compatibilidad
```javascript
/**
 * Calcula la compatibilidad entre usuario y producto
 * @param {Object} userAnalysis - Análisis del usuario
 * @param {Object} productData - Datos del producto
 * @param {Object} trendData - Datos de tendencias
 * @returns {number} Score de 0-100
 */
function calculateCompatibilityScore(userAnalysis, productData, trendData) {
  let score = 0;
  
  // Compatibilidad de estilo (40% del score)
  score += userAnalysis.style_weight * productData.style_match * 0.4;
  
  // Preferencia de color (25% del score)
  score += userAnalysis.color_affinity * productData.color_match * 0.25;
  
  // Factor de tendencia (20% del score)
  score += trendData.trend_score * 0.2;
  
  // Preferencia de ajuste (15% del score)
  score += userAnalysis.fit_preference * productData.fit_compatibility * 0.15;
  
  return Math.round(score);
}
```

#### 3. Ranking y Filtrado
- **Top 20 productos** por score para cada usuario
- **Filtrado por disponibilidad** y stock
- **Diversificación** para evitar recomendaciones repetitivas

### Factores de Ponderación

| Factor | Peso | Descripción |
|--------|------|-------------|
| Estilo Personal | 40% | Compatibilidad con estilo favorito del usuario |
| Preferencias de Color | 25% | Afinidad con colores preferidos |
| Tendencias Actuales | 20% | Factor de popularidad y tendencias |
| Preferencias de Ajuste | 15% | Compatibilidad con preferencias de talla/ajuste |

## 🔧 Configuración del Sistema

### Variables de Configuración

#### Límites del Sistema
```javascript
const SYSTEM_LIMITS = {
  MAX_USERS: 50000,                    // Máximo número de usuarios
  MAX_RECOMMENDATIONS_PER_USER: 20,    // Recomendaciones por usuario
  MAX_EXECUTION_TIME: 300000,          // 5 minutos en ms
  BATCH_SIZE: 100                      // Tamaño de lote para procesamiento
};
```

#### Parámetros del Algoritmo
```javascript
const ALGORITHM_PARAMS = {
  STYLE_WEIGHT: 0.4,        // Peso del factor estilo
  COLOR_WEIGHT: 0.25,       // Peso del factor color
  TREND_WEIGHT: 0.2,        // Peso del factor tendencia
  FIT_WEIGHT: 0.15,         // Peso del factor ajuste
  MIN_SCORE_THRESHOLD: 60   // Score mínimo para recomendación
};
```

### Catálogos de Validación

Los catálogos se definen en la pestaña "Lists" de la hoja de cálculo:

#### Estilos Válidos
- Casual
- Formal
- Deportivo
- Bohemio
- Minimalista
- Vintage
- Urbano
- Elegante

#### Colores Disponibles
- Rojo, Azul, Verde, Amarillo, Naranja
- Negro, Blanco, Gris, Marrón, Beige
- Rosa, Morado, Turquesa, Coral, Dorado

#### Tipos de Prenda
- Camiseta, Camisa, Pantalón, Falda, Vestido
- Chaqueta, Abrigo, Suéter, Blusa, Short
- Zapatos, Botas, Sandalias, Accesorios

## 🚀 Uso del Sistema

### Inicialización
```javascript
// 1. Ejecutar función principal
initTryOnMe();

// 2. Validar sistema
const validation = validateSystem();
console.log(validation);

// 3. Poblar datos de prueba (opcional)
populateTestData();
```

### Flujo de Recomendaciones
1. **Entrada de Usuario**: Datos personales y preferencias
2. **Validación**: Verificación de integridad de datos
3. **Análisis**: Procesamiento del perfil de usuario
4. **Matching**: Comparación con catálogo de productos
5. **Scoring**: Cálculo de compatibilidad
6. **Ranking**: Ordenamiento por score
7. **Salida**: Top 20 recomendaciones

## 📈 Métricas y Monitoreo

### Métricas del Sistema
- **Tiempo de procesamiento** por usuario
- **Calidad de recomendaciones** (score promedio)
- **Tasa de cobertura** (usuarios con recomendaciones)
- **Diversidad** de recomendaciones

### Indicadores de Salud
```javascript
function getSystemHealth() {
  return {
    status: "healthy|warning|critical",
    users_count: number,
    recommendations_count: number,
    last_update: Date,
    data_quality_score: number,
    execution_time_avg: number
  };
}
```

## 🔒 Seguridad y Privacidad

### Protección de Datos
- **Almacenamiento local**: Datos en Google Drive del usuario
- **Sin compartición**: Información personal no se comparte
- **GDPR Compliance**: Cumplimiento con normativas europeas
- **Consentimiento**: Usuarios autorizan el procesamiento

### Control de Acceso
- **Autenticación Google**: Integración con cuentas Google
- **Permisos granulares**: Control de acceso por usuario
- **Auditoría**: Registro de accesos y modificaciones

## 🛠️ Mantenimiento

### Tareas de Mantenimiento
```javascript
// Limpiar datos antiguos
cleanupOldData();

// Optimizar estructuras
optimizeDataStructures();

// Generar reportes
generateSystemReport();

// Validar integridad
validateSystem();
```

### Troubleshooting

#### Problemas Comunes
1. **Timeout de ejecución**: Reducir tamaño de lote
2. **Memoria insuficiente**: Optimizar estructuras de datos
3. **Datos corruptos**: Ejecutar validación y limpieza

Ver [Guía de Troubleshooting](./troubleshooting.md) para soluciones detalladas.

## 📚 Referencias

- [API Reference](./api-reference.md)
- [Guía de Desarrollo](./development-setup.md)
- [Algoritmos de Recomendación](./algorithms.md)
- [Guía de Contribución](./contributing.md)

---

**Versión**: 1.0.0  
**Última actualización**: Septiembre 2024  
**Mantenido por**: Equipo LVT-ENG