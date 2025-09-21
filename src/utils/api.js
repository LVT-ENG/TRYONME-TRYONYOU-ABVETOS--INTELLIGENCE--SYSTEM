// API Client with timeout and error handling
class ApiClient {
  constructor(baseUrl = '', defaultTimeout = 10000) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = defaultTimeout;
    this.token = null;
  }

  setAuthToken(token) {
    this.token = token;
  }

  clearAuthToken() {
    this.token = null;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const timeout = options.timeout || this.defaultTimeout;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    if (this.token) {
      config.headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    config.signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        // Handle specific error codes
        if (response.status === 401) {
          this.clearAuthToken();
          throw new ApiError('Invalid or expired token. Please login again.', 401, response);
        }
        
        if (response.status === 408 || response.status === 504) {
          throw new ApiError('Request timeout. Please try again.', response.status, response);
        }

        throw new ApiError(`HTTP error! status: ${response.status}`, response.status, response);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout. Please check your connection and try again.', 408);
      }
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      console.error('API request failed:', error);
      throw new ApiError('Network error. Please check your connection.', 0, null, error);
    }
  }

  // Convenience methods with retry logic
  async get(endpoint, options = {}) {
    return this.requestWithRetry(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.requestWithRetry(endpoint, {
      ...options,
      method: 'POST',
      body: data,
    });
  }

  async put(endpoint, data, options = {}) {
    return this.requestWithRetry(endpoint, {
      ...options,
      method: 'PUT',
      body: data,
    });
  }

  async delete(endpoint, options = {}) {
    return this.requestWithRetry(endpoint, { ...options, method: 'DELETE' });
  }

  // Retry logic for failed requests
  async requestWithRetry(endpoint, options = {}, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.request(endpoint, options);
      } catch (error) {
        lastError = error;
        
        // Don't retry on auth errors or client errors (4xx)
        if (error.status === 401 || (error.status >= 400 && error.status < 500)) {
          throw error;
        }
        
        // Don't retry on last attempt
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }
}

// Custom error class
export class ApiError extends Error {
  constructor(message, status, response, originalError) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
    this.originalError = originalError;
  }
}

// Error handling utility
export const handleApiError = (error) => {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return 'Datos inválidos. Por favor, revisa la información.';
      case 401:
        return 'No autorizado. Por favor, inicia sesión nuevamente.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 408:
        return 'Tiempo de espera agotado. Por favor, inténtalo de nuevo.';
      case 500:
        return 'Error del servidor. Inténtalo más tarde.';
      case 502:
      case 503:
      case 504:
        return 'Servicio temporalmente no disponible. Inténtalo más tarde.';
      default:
        return `Error: ${error.message}`;
    }
  }
  
  if (error.name === 'NetworkError') {
    return 'Error de conexión. Verifica tu internet.';
  }
  
  return 'Ha ocurrido un error inesperado.';
};

// Global API instance
export const apiClient = new ApiClient();

// Specific API functions
export const contactApi = {
  sendMessage: (data) => apiClient.post('/mailer.php', data, { timeout: 15000 }),
};

export const gasApi = {
  getRecommendations: (userId) => apiClient.get(`/gas/recommendations/${userId}`, { timeout: 20000 }),
  addUser: (userData) => apiClient.post('/gas/users', userData, { timeout: 15000 }),
  updateUser: (userId, userData) => apiClient.put(`/gas/users/${userId}`, userData, { timeout: 15000 }),
};

export const authApi = {
  login: (credentials) => apiClient.post('/auth/login', credentials, { timeout: 10000 }),
  refresh: (refreshToken) => apiClient.post('/auth/refresh', { refresh_token: refreshToken }, { timeout: 5000 }),
  logout: () => apiClient.post('/auth/logout', {}, { timeout: 5000 }),
};