# Guía de Integración - TryOnMe Sistema Completo

## 🔗 Visión General de Integración

Esta guía explica cómo integrar todos los componentes del sistema TryOnMe para crear una experiencia unificada.

## 🏗️ Arquitectura de Integración

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND WEB                            │
│                     (React + Vite)                             │
└─────────────────────┬───────────────────────────────────────────┘
                      │ API Calls
┌─────────────────────▼───────────────────────────────────────────┐
│                    API GATEWAY                                 │
│                 (Routing & Auth)                               │
├─────────────────────┬───────────────────┬───────────────────────┤
│                     │                   │                       │
▼                     ▼                   ▼                       ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────┐
│ Google Apps     │ │ Contact API     │ │ External APIs   │ │ Cache   │
│ Script Motor    │ │ (PHP Mailer)    │ │ (Fashion Data)  │ │ Layer   │
│                 │ │                 │ │                 │ │         │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────┘
│                   │                   │
▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Google Sheets   │ │ Email Service   │ │ External DBs    │
│ (Data Store)    │ │ (SMTP)          │ │ (Fashion APIs)  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

---

## 🚀 Frontend - Google Apps Script Integration

### 1. Configuración de Web App

#### En Google Apps Script

```javascript
// motor.gs - Funciones expuestas como Web App
function doGet(e) {
  const action = e.parameter.action;
  const params = e.parameter;
  
  try {
    switch(action) {
      case 'getRecommendations':
        return handleGetRecommendations(params);
      case 'addUser':
        return handleAddUser(params);
      case 'getUserData':
        return handleGetUserData(params);
      default:
        return createResponse({error: 'Action not found'}, 400);
    }
  } catch (error) {
    return createResponse({error: error.message}, 500);
  }
}

function doPost(e) {
  const postData = JSON.parse(e.postData.contents);
  const action = postData.action;
  
  try {
    switch(action) {
      case 'addUser':
        return handleAddUser(postData);
      case 'updateUser':
        return handleUpdateUser(postData);
      case 'addMeasurements':
        return handleAddMeasurements(postData);
      default:
        return createResponse({error: 'Action not found'}, 400);
    }
  } catch (error) {
    return createResponse({error: error.message}, 500);
  }
}

function createResponse(data, statusCode = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handlers específicos
function handleGetRecommendations(params) {
  const userId = params.userId;
  
  if (!userId) {
    return createResponse({error: 'userId is required'}, 400);
  }
  
  const recommendations = getRecommendationsForUser(userId);
  return createResponse({
    success: true,
    data: recommendations
  });
}

function handleAddUser(postData) {
  const userData = postData.userData;
  
  // Validar datos
  const validation = validateUser(userData);
  if (!validation.isValid) {
    return createResponse({
      error: 'Validation failed',
      details: validation.errors
    }, 400);
  }
  
  // Añadir usuario
  const userId = addUserToSheet(userData);
  
  return createResponse({
    success: true,
    userId: userId,
    message: 'Usuario creado exitosamente'
  });
}
```

#### Deploy como Web App

```bash
# En Google Apps Script CLI
clasp deploy --description "API endpoints for TryOnMe"

# O desde el editor web:
# 1. Deploy > New deployment
# 2. Type: Web app
# 3. Execute as: Me
# 4. Who has access: Anyone
```

### 2. Cliente API Frontend

```javascript
// src/utils/gasApi.js
class GoogleAppsScriptAPI {
  constructor(webAppUrl) {
    this.baseUrl = webAppUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GAS API request failed:', error);
      throw error;
    }
  }

  // Métodos específicos
  async getRecommendations(userId) {
    return this.request(`?action=getRecommendations&userId=${userId}`);
  }

  async addUser(userData) {
    return this.request('', {
      method: 'POST',
      body: JSON.stringify({
        action: 'addUser',
        userData: userData
      }),
    });
  }

  async updateUser(userId, userData) {
    return this.request('', {
      method: 'POST',
      body: JSON.stringify({
        action: 'updateUser',
        userId: userId,
        userData: userData
      }),
    });
  }

  async addMeasurements(userId, measurements) {
    return this.request('', {
      method: 'POST',
      body: JSON.stringify({
        action: 'addMeasurements',
        userId: userId,
        measurements: measurements
      }),
    });
  }
}

// Instancia global
export const gasApi = new GoogleAppsScriptAPI(
  import.meta.env.VITE_GOOGLE_SCRIPT_URL
);
```

### 3. Uso en Componentes React

```jsx
// components/RecommendationsList.jsx
import React, { useState, useEffect } from 'react';
import { gasApi } from '../utils/gasApi';

export default function RecommendationsList({ userId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const response = await gasApi.getRecommendations(userId);
        
        if (response.success) {
          setRecommendations(response.data);
        } else {
          setError(response.error);
        }
      } catch (err) {
        setError('Error al cargar recomendaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchRecommendations();
    }
  }, [userId]);

  if (loading) return <div className="loading">Cargando recomendaciones...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="recommendations-grid">
      {recommendations.map(rec => (
        <RecommendationCard key={rec.id} recommendation={rec} />
      ))}
    </div>
  );
}
```

---

## 📧 Integración Sistema de Contacto

### 1. API PHP Mejorada

```php
<?php
// mailer.php - Version mejorada
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

class ContactAPI {
    private $errors = [];
    
    public function handleRequest() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return $this->error('Método no permitido', 405);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$this->validateInput($input)) {
            return $this->error('Datos inválidos', 400);
        }
        
        return $this->sendEmail($input);
    }
    
    private function validateInput($input) {
        if (empty($input['name']) || strlen($input['name']) < 2) {
            $this->errors[] = 'Nombre debe tener al menos 2 caracteres';
        }
        
        if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            $this->errors[] = 'Email inválido';
        }
        
        if (empty($input['message']) || strlen($input['message']) < 10) {
            $this->errors[] = 'Mensaje debe tener al menos 10 caracteres';
        }
        
        // Rate limiting simple
        if ($this->checkRateLimit($input['email'])) {
            $this->errors[] = 'Demasiados intentos. Espera 5 minutos.';
        }
        
        return empty($this->errors);
    }
    
    private function checkRateLimit($email) {
        $rateLimitFile = __DIR__ . '/rate_limit.json';
        $now = time();
        $limits = [];
        
        if (file_exists($rateLimitFile)) {
            $limits = json_decode(file_get_contents($rateLimitFile), true) ?: [];
        }
        
        // Limpiar entradas antiguas
        $limits = array_filter($limits, function($timestamp) use ($now) {
            return ($now - $timestamp) < 300; // 5 minutos
        });
        
        // Verificar límite (máximo 3 emails por 5 minutos)
        $emailCount = count(array_filter($limits, function($data) use ($email) {
            return $data['email'] === $email;
        }));
        
        if ($emailCount >= 3) {
            return true;
        }
        
        // Registrar intento
        $limits[] = ['email' => $email, 'timestamp' => $now];
        file_put_contents($rateLimitFile, json_encode($limits));
        
        return false;
    }
    
    private function sendEmail($data) {
        $to = CONTACT_EMAIL;
        $subject = "Nuevo contacto desde TryOnMe - " . $data['name'];
        
        $message = "
        <html>
        <head>
            <title>Nuevo contacto TryOnMe</title>
        </head>
        <body>
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> " . htmlspecialchars($data['name']) . "</p>
            <p><strong>Email:</strong> " . htmlspecialchars($data['email']) . "</p>
            <p><strong>Mensaje:</strong></p>
            <p>" . nl2br(htmlspecialchars($data['message'])) . "</p>
            <hr>
            <p><small>Enviado desde: " . $_SERVER['HTTP_REFERER'] . "</small></p>
            <p><small>IP: " . $_SERVER['REMOTE_ADDR'] . "</small></p>
            <p><small>Fecha: " . date('Y-m-d H:i:s') . "</small></p>
        </body>
        </html>
        ";
        
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: " . FROM_EMAIL . "\r\n";
        $headers .= "Reply-To: " . $data['email'] . "\r\n";
        
        if (mail($to, $subject, $message, $headers)) {
            // Log exitoso
            error_log("Contact form sent successfully from: " . $data['email']);
            
            return $this->success('Mensaje enviado correctamente');
        } else {
            error_log("Failed to send contact form from: " . $data['email']);
            return $this->error('Error al enviar mensaje', 500);
        }
    }
    
    private function success($message) {
        http_response_code(200);
        return json_encode([
            'success' => true,
            'message' => $message
        ]);
    }
    
    private function error($message, $code = 400) {
        http_response_code($code);
        return json_encode([
            'success' => false,
            'message' => $message,
            'errors' => $this->errors
        ]);
    }
}

// Ejecutar API
$api = new ContactAPI();
echo $api->handleRequest();
?>
```

### 2. Cliente de Contacto Frontend

```javascript
// src/utils/contactApi.js
export class ContactAPI {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async sendMessage(contactData) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Error al enviar mensaje');
      }

      return result;
    } catch (error) {
      console.error('Contact API error:', error);
      throw error;
    }
  }
}

export const contactApi = new ContactAPI(
  import.meta.env.VITE_CONTACT_API_URL || '/mailer.php'
);
```

---

## 🔄 Estado Global y Caching

### 1. Context API para Estado Global

```jsx
// src/context/AppContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  recommendations: [],
  loading: false,
  error: null,
  cache: new Map(),
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CACHE_DATA':
      const newCache = new Map(state.cache);
      newCache.set(action.key, {
        data: action.data,
        timestamp: Date.now(),
        ttl: action.ttl || 300000 // 5 minutos por defecto
      });
      return { ...state, cache: newCache };
    case 'CLEAR_CACHE':
      return { ...state, cache: new Map() };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Cache utilities
  const getCachedData = (key) => {
    const cached = state.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < cached.ttl) {
      return cached.data;
    }
    return null;
  };

  const setCachedData = (key, data, ttl) => {
    dispatch({ type: 'CACHE_DATA', key, data, ttl });
  };

  const contextValue = {
    state,
    dispatch,
    getCachedData,
    setCachedData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
```

### 2. Custom Hooks para Integración

```jsx
// src/hooks/useRecommendations.js
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { gasApi } from '../utils/gasApi';

export function useRecommendations(userId) {
  const { getCachedData, setCachedData } = useApp();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!userId) return;

      const cacheKey = `recommendations_${userId}`;
      const cached = getCachedData(cacheKey);
      
      if (cached) {
        setRecommendations(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await gasApi.getRecommendations(userId);
        
        if (response.success) {
          setRecommendations(response.data);
          setCachedData(cacheKey, response.data, 600000); // 10 minutos
        } else {
          setError(response.error);
        }
      } catch (err) {
        setError('Error al cargar recomendaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [userId, getCachedData, setCachedData]);

  const refreshRecommendations = () => {
    const cacheKey = `recommendations_${userId}`;
    // Limpiar cache específico
    setCachedData(cacheKey, null, 0);
    // Trigger re-fetch
    fetchRecommendations();
  };

  return {
    recommendations,
    loading,
    error,
    refreshRecommendations,
  };
}
```

---

## 📊 Integración con APIs Externas

### 1. Adapter Pattern para APIs

```javascript
// src/adapters/FashionApiAdapter.js
export class FashionApiAdapter {
  constructor() {
    this.providers = {
      shopify: new ShopifyAdapter(),
      zalando: new ZalandoAdapter(),
      asos: new AsosAdapter(),
    };
  }

  async getProducts(query, provider = 'all') {
    if (provider !== 'all' && this.providers[provider]) {
      return await this.providers[provider].getProducts(query);
    }

    // Obtener de todos los proveedores
    const promises = Object.values(this.providers).map(
      provider => provider.getProducts(query).catch(err => {
        console.warn(`Provider failed: ${err.message}`);
        return [];
      })
    );

    const results = await Promise.allSettled(promises);
    
    return results
      .filter(result => result.status === 'fulfilled')
      .flatMap(result => result.value);
  }
}

class ShopifyAdapter {
  async getProducts(query) {
    const response = await fetch(`/api/shopify/products?q=${query}`);
    const data = await response.json();
    
    // Normalizar formato
    return data.products.map(product => ({
      id: product.id,
      name: product.title,
      price: product.variants[0]?.price,
      image: product.images[0]?.src,
      source: 'shopify',
      url: product.handle,
    }));
  }
}

class ZalandoAdapter {
  async getProducts(query) {
    // Implementación específica para Zalando API
    // ...
  }
}

class AsosAdapter {
  async getProducts(query) {
    // Implementación específica para ASOS API
    // ...
  }
}
```

### 2. Data Normalization

```javascript
// src/utils/dataMapper.js
export class DataMapper {
  static normalizeRecommendation(rawData, source) {
    const baseStructure = {
      id: null,
      name: '',
      price: null,
      currency: 'EUR',
      image: '',
      category: '',
      brand: '',
      colors: [],
      sizes: [],
      score: 0,
      source: source,
      url: '',
      description: '',
    };

    switch (source) {
      case 'gas':
        return this.mapGasRecommendation(rawData, baseStructure);
      case 'shopify':
        return this.mapShopifyProduct(rawData, baseStructure);
      case 'zalando':
        return this.mapZalandoProduct(rawData, baseStructure);
      default:
        return { ...baseStructure, ...rawData };
    }
  }

  static mapGasRecommendation(gasData, base) {
    return {
      ...base,
      id: gasData.Producto_ID,
      name: gasData.Nombre,
      price: gasData.Precio,
      image: gasData.URL_Imagen,
      category: gasData.Tipo_Prenda,
      colors: [gasData.Color],
      score: gasData.Score,
      source: gasData.Fuente,
    };
  }

  static mapShopifyProduct(shopifyData, base) {
    return {
      ...base,
      id: shopifyData.id,
      name: shopifyData.title,
      price: parseFloat(shopifyData.variants[0]?.price || 0),
      image: shopifyData.images[0]?.src,
      category: shopifyData.product_type,
      brand: shopifyData.vendor,
      colors: shopifyData.variants.map(v => v.option1).filter(Boolean),
      sizes: shopifyData.variants.map(v => v.option2).filter(Boolean),
      url: shopifyData.handle,
      description: shopifyData.body_html,
    };
  }
}
```

---

## 🔄 Sincronización de Datos

### 1. Webhook System

```javascript
// src/services/WebhookService.js
export class WebhookService {
  constructor() {
    this.endpoints = new Map();
    this.retryQueue = [];
  }

  register(event, endpoint, options = {}) {
    if (!this.endpoints.has(event)) {
      this.endpoints.set(event, []);
    }
    
    this.endpoints.get(event).push({
      url: endpoint,
      method: options.method || 'POST',
      headers: options.headers || {},
      retries: options.retries || 3,
      timeout: options.timeout || 5000,
    });
  }

  async trigger(event, data) {
    const endpoints = this.endpoints.get(event) || [];
    
    const promises = endpoints.map(endpoint => 
      this.sendWebhook(endpoint, { event, data, timestamp: Date.now() })
    );

    return Promise.allSettled(promises);
  }

  async sendWebhook(endpoint, payload) {
    try {
      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
          ...endpoint.headers,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(endpoint.timeout),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Webhook failed for ${endpoint.url}:`, error);
      
      // Añadir a cola de reintentos
      this.retryQueue.push({
        endpoint,
        payload,
        attempts: 0,
        maxAttempts: endpoint.retries,
      });
      
      throw error;
    }
  }

  // Procesar cola de reintentos
  async processRetryQueue() {
    const batch = this.retryQueue.splice(0, 10); // Procesar 10 a la vez
    
    for (const item of batch) {
      if (item.attempts < item.maxAttempts) {
        try {
          await this.sendWebhook(item.endpoint, item.payload);
        } catch (error) {
          item.attempts++;
          if (item.attempts < item.maxAttempts) {
            // Volver a añadir a la cola con backoff exponencial
            setTimeout(() => {
              this.retryQueue.push(item);
            }, Math.pow(2, item.attempts) * 1000);
          }
        }
      }
    }
  }
}

// Instancia global
export const webhookService = new WebhookService();

// Configurar webhooks
webhookService.register('user.created', '/api/webhooks/user-created');
webhookService.register('recommendation.generated', '/api/webhooks/recommendation');
```

### 2. Real-time Updates

```javascript
// src/services/RealtimeService.js
export class RealtimeService {
  constructor() {
    this.connections = new Set();
    this.subscribers = new Map();
  }

  subscribe(channel, callback) {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, new Set());
    }
    
    this.subscribers.get(channel).add(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers.get(channel)?.delete(callback);
    };
  }

  publish(channel, data) {
    const callbacks = this.subscribers.get(channel) || new Set();
    
    callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Realtime callback error:', error);
      }
    });
  }

  // Server-Sent Events implementation
  connectSSE(url) {
    const eventSource = new EventSource(url);
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.publish(data.channel, data.payload);
      } catch (error) {
        console.error('SSE message parse error:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
    };

    this.connections.add(eventSource);
    return eventSource;
  }

  // WebSocket implementation
  connectWebSocket(url) {
    const ws = new WebSocket(url);
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.publish(data.channel, data.payload);
      } catch (error) {
        console.error('WebSocket message parse error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.connections.add(ws);
    return ws;
  }

  disconnect() {
    this.connections.forEach(connection => {
      if (connection instanceof EventSource) {
        connection.close();
      } else if (connection instanceof WebSocket) {
        connection.close();
      }
    });
    
    this.connections.clear();
    this.subscribers.clear();
  }
}

// Usage in React component
export function useRealtime(channel) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const unsubscribe = realtimeService.subscribe(channel, setData);
    return unsubscribe;
  }, [channel]);
  
  return data;
}
```

---

## 🧪 Testing de Integración

### 1. API Integration Tests

```javascript
// tests/integration/api.test.js
import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { gasApi } from '../src/utils/gasApi';
import { contactApi } from '../src/utils/contactApi';

describe('API Integration Tests', () => {
  beforeAll(async () => {
    // Setup test environment
  });

  afterAll(async () => {
    // Cleanup
  });

  describe('Google Apps Script API', () => {
    test('should add user and get recommendations', async () => {
      const testUser = {
        nombre: 'Test User',
        email: 'test@example.com',
        sexo: 'Masculino',
        edad: 25,
        estiloFavorito: 'Casual',
      };

      // Add user
      const addResponse = await gasApi.addUser(testUser);
      expect(addResponse.success).toBe(true);
      expect(addResponse.userId).toBeDefined();

      // Get recommendations
      const recResponse = await gasApi.getRecommendations(addResponse.userId);
      expect(recResponse.success).toBe(true);
      expect(Array.isArray(recResponse.data)).toBe(true);
    });

    test('should handle validation errors', async () => {
      const invalidUser = {
        nombre: '', // Invalid empty name
        email: 'invalid-email', // Invalid email format
      };

      await expect(gasApi.addUser(invalidUser)).rejects.toThrow();
    });
  });

  describe('Contact API', () => {
    test('should send contact message', async () => {
      const contactData = {
        name: 'Test Contact',
        email: 'contact@example.com',
        message: 'This is a test message for integration testing.',
      };

      const response = await contactApi.sendMessage(contactData);
      expect(response.success).toBe(true);
      expect(response.message).toContain('enviado');
    });

    test('should rate limit excessive requests', async () => {
      const contactData = {
        name: 'Spammer',
        email: 'spam@example.com',
        message: 'Spam message',
      };

      // Send multiple requests
      const promises = Array(5).fill().map(() => 
        contactApi.sendMessage(contactData)
      );

      const results = await Promise.allSettled(promises);
      
      // Some should succeed, some should fail due to rate limiting
      const failed = results.filter(r => r.status === 'rejected');
      expect(failed.length).toBeGreaterThan(0);
    });
  });
});
```

### 2. End-to-End Integration Tests

```javascript
// tests/e2e/userFlow.spec.js
import { test, expect } from '@playwright/test';

test.describe('Complete User Flow', () => {
  test('user registration and recommendation flow', async ({ page }) => {
    // Navigate to app
    await page.goto('/');
    
    // Fill user form
    await page.fill('[data-testid="user-name"]', 'E2E Test User');
    await page.fill('[data-testid="user-email"]', 'e2e@test.com');
    await page.selectOption('[data-testid="user-gender"]', 'Femenino');
    await page.fill('[data-testid="user-age"]', '25');
    
    // Submit form
    await page.click('[data-testid="submit-user"]');
    
    // Wait for success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    
    // Navigate to recommendations
    await page.click('[data-testid="view-recommendations"]');
    
    // Wait for recommendations to load
    await expect(page.locator('[data-testid="recommendation-card"]')).toHaveCount.toBeGreaterThan(0);
    
    // Verify recommendation data
    const firstRecommendation = page.locator('[data-testid="recommendation-card"]').first();
    await expect(firstRecommendation.locator('[data-testid="product-name"]')).toBeVisible();
    await expect(firstRecommendation.locator('[data-testid="product-score"]')).toBeVisible();
  });

  test('contact form integration', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill contact form
    await page.fill('[data-testid="contact-name"]', 'E2E Contact Test');
    await page.fill('[data-testid="contact-email"]', 'contact-e2e@test.com');
    await page.fill('[data-testid="contact-message"]', 'This is an end-to-end test message.');
    
    // Submit
    await page.click('[data-testid="submit-contact"]');
    
    // Verify success
    await expect(page.locator('[data-testid="contact-success"]')).toBeVisible();
  });
});
```

---

## 📊 Monitoreo de Integración

### 1. Health Check System

```javascript
// src/utils/healthCheck.js
export class HealthCheckService {
  constructor() {
    this.checks = new Map();
    this.results = new Map();
  }

  register(name, checkFunction, options = {}) {
    this.checks.set(name, {
      fn: checkFunction,
      timeout: options.timeout || 5000,
      critical: options.critical || false,
      interval: options.interval || 60000, // 1 minute
    });
  }

  async runCheck(name) {
    const check = this.checks.get(name);
    if (!check) return null;

    const start = Date.now();
    
    try {
      const promise = check.fn();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), check.timeout)
      );

      const result = await Promise.race([promise, timeoutPromise]);
      const duration = Date.now() - start;

      const checkResult = {
        name,
        status: 'healthy',
        duration,
        timestamp: new Date().toISOString(),
        result,
      };

      this.results.set(name, checkResult);
      return checkResult;
    } catch (error) {
      const duration = Date.now() - start;
      const checkResult = {
        name,
        status: 'unhealthy',
        duration,
        timestamp: new Date().toISOString(),
        error: error.message,
        critical: check.critical,
      };

      this.results.set(name, checkResult);
      return checkResult;
    }
  }

  async runAllChecks() {
    const checkNames = Array.from(this.checks.keys());
    const promises = checkNames.map(name => this.runCheck(name));
    
    const results = await Promise.allSettled(promises);
    
    const summary = {
      timestamp: new Date().toISOString(),
      overall: 'healthy',
      checks: Object.fromEntries(this.results),
    };

    // Determine overall health
    const hasUnhealthy = Array.from(this.results.values()).some(
      result => result.status === 'unhealthy'
    );
    
    const hasCriticalFailures = Array.from(this.results.values()).some(
      result => result.status === 'unhealthy' && result.critical
    );

    if (hasCriticalFailures) {
      summary.overall = 'critical';
    } else if (hasUnhealthy) {
      summary.overall = 'degraded';
    }

    return summary;
  }

  startPeriodicChecks() {
    this.checks.forEach((check, name) => {
      setInterval(() => {
        this.runCheck(name);
      }, check.interval);
    });
  }
}

// Configure health checks
export const healthCheck = new HealthCheckService();

// Register checks
healthCheck.register('gas-api', async () => {
  const response = await gasApi.request('?action=ping');
  return response.success;
}, { critical: true, timeout: 10000 });

healthCheck.register('contact-api', async () => {
  const response = await fetch('/mailer.php', { method: 'OPTIONS' });
  return response.ok;
}, { critical: false });

healthCheck.register('external-apis', async () => {
  // Check fashion APIs availability
  const checks = await Promise.allSettled([
    fetch('/api/shopify/health'),
    fetch('/api/zalando/health'),
  ]);
  
  return checks.some(result => result.status === 'fulfilled');
}, { critical: false });
```

### 2. Performance Monitoring

```javascript
// src/utils/performanceMonitor.js
export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = [];
  }

  startMonitoring() {
    // Monitor API calls
    this.monitorApiCalls();
    
    // Monitor Core Web Vitals
    this.monitorWebVitals();
    
    // Monitor resource loading
    this.monitorResources();
  }

  monitorApiCalls() {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const url = args[0];
      const start = performance.now();
      
      try {
        const response = await originalFetch(...args);
        const duration = performance.now() - start;
        
        this.recordMetric('api_call', {
          url,
          method: args[1]?.method || 'GET',
          status: response.status,
          duration,
          success: response.ok,
        });
        
        return response;
      } catch (error) {
        const duration = performance.now() - start;
        
        this.recordMetric('api_call', {
          url,
          method: args[1]?.method || 'GET',
          duration,
          success: false,
          error: error.message,
        });
        
        throw error;
      }
    };
  }

  monitorWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.recordMetric('lcp', {
          value: entry.startTime,
          timestamp: Date.now(),
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.recordMetric('fid', {
          value: entry.processingStart - entry.startTime,
          timestamp: Date.now(),
        });
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          this.recordMetric('cls', {
            value: entry.value,
            timestamp: Date.now(),
          });
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  recordMetric(name, data) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const metrics = this.metrics.get(name);
    metrics.push({
      ...data,
      timestamp: data.timestamp || Date.now(),
    });
    
    // Keep only last 100 entries
    if (metrics.length > 100) {
      metrics.shift();
    }
    
    // Send to analytics if configured
    this.sendToAnalytics(name, data);
  }

  sendToAnalytics(metric, data) {
    // Send to Google Analytics, DataDog, etc.
    if (window.gtag) {
      window.gtag('event', metric, {
        custom_parameter_1: data.value,
        custom_parameter_2: data.duration,
      });
    }
  }

  getMetrics(name) {
    return this.metrics.get(name) || [];
  }

  getAverageMetric(name, timeWindow = 300000) { // 5 minutes
    const metrics = this.getMetrics(name);
    const now = Date.now();
    
    const recentMetrics = metrics.filter(
      metric => (now - metric.timestamp) < timeWindow
    );
    
    if (recentMetrics.length === 0) return null;
    
    const sum = recentMetrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / recentMetrics.length;
  }
}

export const performanceMonitor = new PerformanceMonitor();
```

---

## 📚 Documentación de APIs

Ver documentación específica en:
- [API Reference](./api-reference.md) - Documentación completa de APIs
- [Frontend Guide](./frontend-guide.md) - Integración frontend
- [Troubleshooting](./troubleshooting.md) - Solución de problemas de integración
- [Development Setup](./development-setup.md) - Configuración del entorno