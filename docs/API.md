# API Documentation

Documentación completa de la API del sistema TryOnMe / TryOnYou - AVBETOS Intelligence System.

## 🔍 Información General

**Base URL**: `https://tu-dominio.com` _(placeholder, reemplazar por el dominio real de la API)_  
**Versión**: v1.0.0  
**Formato**: JSON  
**Autenticación**: Bearer Token (para endpoints protegidos)

## 📊 Health Check

### GET /health.php

Endpoint de monitoreo que proporciona métricas del sistema en tiempo real.

**Respuesta exitosa (200)**:
```json
{
  "status": "ok|degraded|error",
  "timestamp": "2025-01-15T10:30:00Z",
  "version": "1.0.0",
  "metrics": {
    "error_rate_percent": 0.32,
    "p95_response_time_ms": 157.04,
    "active_users": {
      "current": 45,
      "peak_24h": 128
    },
    "system_load": {
      "1min": 0.45,
      "5min": 0.52,
      "15min": 0.48
    },
    "memory": {
      "used_mb": 245,
      "total_mb": 512,
      "usage_percent": 47.8
    },
    "disk": {
      "used_gb": 8.5,
      "total_gb": 20,
      "usage_percent": 42.5
    },
    "fashion_metrics": {
      "conversion_rate_percent": 7.08,
      "products_viewed_24h": 644,
      "try_on_sessions": 23,
      "avg_session_duration_minutes": 4.2
    }
  },
  "health_checks": {
    "database": "ok",
    "external_apis": "ok",
    "file_system": "ok"
  },
  "critical_issues": []
}
```

**Estados posibles**:
- `ok`: Sistema funcionando correctamente
- `degraded`: Sistema funcionando con advertencias
- `error`: Sistema con errores críticos

## 🔐 Autenticación Biométrica

### POST /enroll

Registra un nuevo usuario en el sistema con datos biométricos.

**Cuerpo de la petición**:
```json
{
  "userId": "user123",
  "personalData": {
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "age": 28,
    "gender": "M"
  },
  "voiceSample": "base64_encoded_audio_data",
  "irisTemplate": "base64_encoded_iris_data",
  "bodyMeasurements": {
    "height": 175,
    "weight": 70,
    "chest": 100,
    "waist": 85,
    "hips": 95
  }
}
```

**Respuesta exitosa (201)**:
```json
{
  "success": true,
  "userId": "user123",
  "enrollmentId": "enroll_abc123",
  "message": "Usuario registrado exitosamente",
  "biometricScore": 0.95
}
```

**Errores comunes**:
- `400`: Datos biométricos inválidos
- `409`: Usuario ya existe
- `422`: Calidad biométrica insuficiente

### POST /verify

Verifica la identidad de un usuario mediante biometría.

**Cuerpo de la petición**:
```json
{
  "userId": "user123",
  "voiceSample": "base64_encoded_audio_data",
  "irisTemplate": "base64_encoded_iris_data"
}
```

**Respuesta exitosa (200)**:
```json
{
  "success": true,
  "verified": true,
  "userId": "user123",
  "confidence": 0.92,
  "sessionToken": "sess_xyz789",
  "expiresAt": "2025-01-15T11:30:00Z"
}
```

**Respuesta de verificación fallida (200)**:
```json
{
  "success": true,
  "verified": false,
  "reason": "biometric_mismatch",
  "confidence": 0.34
}
```

## 💳 Sistema de Pagos

### POST /payments/intent

Crea una intención de pago para una transacción.

**Cuerpo de la petición**:
```json
{
  "amount": 5999,
  "currency": "EUR",
  "userId": "user123",
  "items": [
    {
      "id": "item_001",
      "name": "Camisa Azul",
      "price": 2999,
      "quantity": 1
    },
    {
      "id": "item_002", 
      "name": "Pantalón Negro",
      "price": 3000,
      "quantity": 1
    }
  ],
  "metadata": {
    "recommendation_engine": "avbetos_v1",
    "session_id": "sess_xyz789"
  }
}
```

**Respuesta exitosa (201)**:
```json
{
  "success": true,
  "paymentIntentId": "pi_abc123",
  "clientSecret": "pi_abc123_secret_xyz",
  "amount": 5999,
  "currency": "EUR",
  "status": "requires_payment_method"
}
```

## 👗 Recomendaciones de Moda

### GET /recommendations/:userId

Obtiene recomendaciones personalizadas para un usuario.

**Parámetros de consulta**:
- `limit`: Número de recomendaciones (máximo 50, por defecto 20)
- `category`: Categoría de productos (`tops`, `bottoms`, `dresses`, `accessories`)
- `occasion`: Ocasión (`casual`, `formal`, `sport`, `evening`)

**Respuesta exitosa (200)**:
```json
{
  "success": true,
  "userId": "user123",
  "recommendations": [
    {
      "id": "rec_001",
      "product": {
        "id": "prod_123",
        "name": "Camisa Elegante Azul",
        "brand": "Fashion Brand",
        "price": 2999,
        "currency": "EUR",
        "category": "tops",
        "images": [
          "https://example.com/image1.jpg"
        ]
      },
      "confidence": 0.89,
      "reasons": [
        "Coincide con tu estilo preferido",
        "Talla recomendada: M",
        "Popular entre usuarios similares"
      ],
      "fit_prediction": {
        "size": "M",
        "confidence": 0.92,
        "adjustments": []
      }
    }
  ],
  "metadata": {
    "algorithm_version": "avbetos_v1.2",
    "processing_time_ms": 245,
    "total_products_analyzed": 15000
  }
}
```

### POST /try-on

Simula cómo se vería un producto en el usuario usando IA.

**Cuerpo de la petición**:
```json
{
  "userId": "user123",
  "productId": "prod_123",
  "userPhoto": "base64_encoded_image",
  "preferences": {
    "lighting": "natural",
    "pose": "front",
    "background": "neutral"
  }
}
```

**Respuesta exitosa (200)**:
```json
{
  "success": true,
  "tryOnResult": {
    "imageUrl": "https://example.com/tryon_result.jpg",
    "confidence": 0.87,
    "fit_analysis": {
      "overall_fit": "good",
      "areas_of_concern": [],
      "suggested_size": "M"
    },
    "processing_time_ms": 3400
  }
}
```

## 📧 Sistema de Contacto

### POST /mailer.php

Envía un mensaje de contacto desde el formulario web.

**Cuerpo de la petición**:
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "subject": "Consulta sobre el sistema",
  "message": "Me gustaría obtener más información...",
  "phone": "+34 600 123 456"
}
```

**Respuesta exitosa (200)**:
```json
{
  "success": true,
  "messageId": "msg_abc123",
  "message": "Mensaje enviado correctamente"
}
```

## 🔍 Códigos de Error

### Códigos HTTP Estándar
- `200`: Operación exitosa
- `201`: Recurso creado exitosamente
- `400`: Petición malformada
- `401`: No autenticado
- `403`: Sin permisos
- `404`: Recurso no encontrado
- `409`: Conflicto (ej: usuario ya existe)
- `422`: Datos no procesables
- `429`: Demasiadas peticiones
- `500`: Error interno del servidor
- `503`: Servicio no disponible

### Códigos de Error Personalizados

```json
{
  "error": {
    "code": "BIOMETRIC_QUALITY_LOW",
    "message": "La calidad de los datos biométricos es insuficiente",
    "details": {
      "voice_quality": 0.45,
      "iris_quality": 0.62,
      "minimum_required": 0.75
    },
    "suggestion": "Intente capturar los datos en mejores condiciones"
  }
}
```

**Códigos de error comunes**:
- `BIOMETRIC_QUALITY_LOW`: Calidad biométrica insuficiente
- `USER_NOT_FOUND`: Usuario no encontrado
- `INVALID_BIOMETRIC_DATA`: Datos biométricos inválidos
- `PAYMENT_PROCESSING_ERROR`: Error procesando el pago
- `RECOMMENDATION_ENGINE_ERROR`: Error en el motor de recomendaciones
- `EXTERNAL_API_ERROR`: Error en API externa

## 🚀 Ejemplos de Uso

### Flujo completo de usuario nuevo

```javascript
// 1. Registrar usuario
const enrollResponse = await fetch('/enroll', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    personalData: { name: 'Juan', email: 'juan@example.com' },
    voiceSample: 'base64_audio...',
    irisTemplate: 'base64_iris...',
    bodyMeasurements: { height: 175, weight: 70 }
  })
});

// 2. Verificar identidad
const verifyResponse = await fetch('/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    voiceSample: 'base64_audio...',
    irisTemplate: 'base64_iris...'
  })
});

// 3. Obtener recomendaciones
const recommendations = await fetch('/recommendations/user123?limit=10&category=tops');

// 4. Probar producto virtualmente
const tryOnResponse = await fetch('/try-on', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    productId: 'prod_123',
    userPhoto: 'base64_image...'
  })
});
```

## 📈 Límites de Rate Limiting

- **Health check**: 60 peticiones/minuto
- **Autenticación**: 10 peticiones/minuto por IP
- **Recomendaciones**: 30 peticiones/minuto por usuario
- **Try-on**: 5 peticiones/minuto por usuario (procesamiento intensivo)
- **Pagos**: 20 peticiones/minuto por usuario

## 🔧 Configuración para Desarrolladores

### Variables de Entorno Requeridas

```bash
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tryonme_db
DB_USER=your_user
DB_PASS=your_password

# APIs externas
FASHION_API_KEY=your_fashion_api_key
BIOMETRIC_API_KEY=your_biometric_api_key

# Pagos
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Notificaciones
SENDGRID_API_KEY=your_sendgrid_key
SLACK_WEBHOOK_URL=your_slack_webhook

# Monitoreo
SENTRY_DSN=your_sentry_dsn
```

### Headers Recomendados

```http
Content-Type: application/json
Accept: application/json
User-Agent: TryOnMe-Client/1.0.0
X-Request-ID: unique_request_id
```

---

**Última actualización**: Enero 2025  
**Versión de la API**: v1.0.0