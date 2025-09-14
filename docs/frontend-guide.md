# Guía del Frontend - TryOnMe Web Interface

## 🌟 Visión General

La interfaz web de TryOnMe proporciona una experiencia premium para usuarios finales, permitiendo interactuar con el sistema de recomendaciones de moda de manera intuitiva y elegante.

## 🏗️ Arquitectura Frontend

### Tecnologías Principales

- **React 18** - Framework de UI con hooks
- **Vite** - Build tool y servidor de desarrollo rápido
- **CSS3** - Estilos nativos con variables CSS y animaciones
- **JavaScript ES6+** - Sintaxis moderna

### Estructura de Archivos

```
src/
├── components/           # Componentes React reutilizables
│   ├── Header.jsx       # Navegación principal
│   ├── UserForm.jsx     # Formulario de usuario
│   ├── RecommendationCard.jsx
│   └── LoadingSpinner.jsx
├── pages/               # Páginas principales
│   ├── Home.jsx        # Página de inicio
│   ├── TryOn.jsx       # Página TryOn
│   ├── Recommendations.jsx
│   └── Contact.jsx
├── styles/             # Archivos CSS
│   ├── main.css        # Estilos globales
│   ├── components.css  # Estilos de componentes
│   └── animations.css  # Animaciones
├── utils/              # Utilidades JavaScript
│   ├── api.js          # Cliente API
│   ├── validation.js   # Validaciones
│   └── constants.js    # Constantes
├── App.jsx             # Componente principal
└── main.jsx           # Punto de entrada
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
:root {
  /* Colores primarios */
  --primary-color: #007bff;
  --primary-dark: #0056b3;
  --primary-light: #66b3ff;
  
  /* Colores secundarios */
  --secondary-color: #6c757d;
  --accent-color: #ff6b6b;
  
  /* Neutros */
  --white: #ffffff;
  --light-gray: #f8f9fa;
  --gray: #6c757d;
  --dark-gray: #343a40;
  --black: #000000;
  
  /* Estados */
  --success-color: #28a745;
  --warning-color: #ffc107;
  --error-color: #dc3545;
  --info-color: #17a2b8;
}
```

### Tipografía

```css
:root {
  /* Fuentes */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-secondary: 'Playfair Display', serif;
  
  /* Tamaños */
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem;  /* 36px */
}
```

### Espaciado

```css
:root {
  /* Espaciado consistente */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-2xl: 3rem;    /* 48px */
  --spacing-3xl: 4rem;    /* 64px */
}
```

---

## 🧩 Componentes Principales

### Header Component

```jsx
// components/Header.jsx
import React, { useState } from 'react';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="/logo.svg" alt="TryOnMe" />
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="#home" className="nav-link">Inicio</a>
          <a href="#tryon" className="nav-link">TryOn</a>
          <a href="#recommendations" className="nav-link">Recomendaciones</a>
          <a href="#contact" className="nav-link">Contacto</a>
        </nav>
        
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
```

### UserForm Component

```jsx
// components/UserForm.jsx
import React, { useState } from 'react';
import { validateUser } from '../utils/validation.js';

export default function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    sexo: '',
    edad: '',
    estiloFavorito: '',
    colorFavorito: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error al cambiar el valor
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar datos
    const validation = validateUser(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ submit: 'Error al enviar el formulario. Inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre completo</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={errors.nombre ? 'error' : ''}
          required
        />
        {errors.nombre && <span className="error-message">{errors.nombre}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="sexo">Sexo</label>
        <select
          id="sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          className={errors.sexo ? 'error' : ''}
          required
        >
          <option value="">Seleccionar...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.sexo && <span className="error-message">{errors.sexo}</span>}
      </div>

      {errors.submit && <div className="error-message">{errors.submit}</div>}

      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
```

### RecommendationCard Component

```jsx
// components/RecommendationCard.jsx
import React from 'react';

export default function RecommendationCard({ recommendation }) {
  const { nombre, score, fuente, urlImagen, estilo, color, precio } = recommendation;

  const getScoreColor = (score) => {
    if (score >= 90) return 'score-excellent';
    if (score >= 80) return 'score-very-good';
    if (score >= 70) return 'score-good';
    if (score >= 60) return 'score-fair';
    return 'score-poor';
  };

  return (
    <div className="recommendation-card">
      <div className="card-image">
        <img src={urlImagen} alt={nombre} loading="lazy" />
        <div className={`score-badge ${getScoreColor(score)}`}>
          {score}
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{nombre}</h3>
        
        <div className="card-details">
          <span className="detail-item">
            <strong>Estilo:</strong> {estilo}
          </span>
          <span className="detail-item">
            <strong>Color:</strong> {color}
          </span>
          <span className="detail-item">
            <strong>Fuente:</strong> {fuente}
          </span>
        </div>
        
        {precio && (
          <div className="card-price">
            {precio}€
          </div>
        )}
        
        <button className="try-button">
          Probar Virtualmente
        </button>
      </div>
    </div>
  );
}
```

---

## 🎬 Animaciones y Interacciones

### Animaciones CSS

```css
/* animations.css */

/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide in from left */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Pulse animation */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Loading spinner */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Aplicar animaciones */
.fade-in {
  animation: fadeIn 0.6s ease-out;
}

.slide-in-left {
  animation: slideInLeft 0.8s ease-out;
}

.pulse {
  animation: pulse 2s infinite;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}
```

### Transiciones Suaves

```css
/* Transiciones globales */
* {
  transition: all 0.3s ease;
}

/* Hover effects */
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Focus states */
.input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  outline: none;
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
:root {
  /* Breakpoints */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-2xl: 1400px;
}

/* Media queries */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@media (min-width: 576px) {
  .container {
    padding: 0 var(--spacing-lg);
  }
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Mobile-First Approach

```css
/* Estilos base para mobile */
.header {
  padding: var(--spacing-sm);
}

.nav {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-open {
  display: flex;
}

/* Desktop */
@media (min-width: 768px) {
  .header {
    padding: var(--spacing-md) var(--spacing-lg);
  }
  
  .nav {
    display: flex;
    flex-direction: row;
    position: static;
    background: transparent;
    box-shadow: none;
  }
  
  .menu-toggle {
    display: none;
  }
}
```

---

## 🔗 Integración con APIs

### API Client

```javascript
// utils/api.js
class ApiClient {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Métodos de conveniencia
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: data,
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: data,
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Instancia global
export const apiClient = new ApiClient();

// Funciones específicas
export const contactApi = {
  sendMessage: (data) => apiClient.post('/mailer.php', data),
};

export const gasApi = {
  getRecommendations: (userId) => apiClient.get(`/gas/recommendations/${userId}`),
  addUser: (userData) => apiClient.post('/gas/users', userData),
  updateUser: (userId, userData) => apiClient.put(`/gas/users/${userId}`, userData),
};
```

### Error Handling

```javascript
// utils/errorHandling.js
export class ApiError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

export const handleApiError = (error) => {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return 'Datos inválidos. Por favor, revisa la información.';
      case 401:
        return 'No autorizado. Por favor, inicia sesión.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 500:
        return 'Error del servidor. Inténtalo más tarde.';
      default:
        return `Error: ${error.message}`;
    }
  }
  
  if (error.name === 'NetworkError') {
    return 'Error de conexión. Verifica tu internet.';
  }
  
  return 'Ha ocurrido un error inesperado.';
};
```

---

## 🎯 Performance Optimization

### Lazy Loading

```jsx
// Lazy loading de componentes
import React, { lazy, Suspense } from 'react';

const Recommendations = lazy(() => import('./pages/Recommendations'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  return (
    <Suspense fallback={<div className="loading">Cargando...</div>}>
      <Routes>
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}
```

### Image Optimization

```jsx
// Componente de imagen optimizada
import React, { useState } from 'react';

export default function OptimizedImage({ src, alt, className, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`image-container ${className}`}>
      {!isLoaded && !hasError && (
        <div className="image-placeholder">
          <div className="loading-spinner" />
        </div>
      )}
      
      {hasError ? (
        <div className="image-error">
          <span>⚠️ Error al cargar imagen</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
}
```

### Code Splitting

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['./src/utils/api.js', './src/utils/validation.js'],
        },
      },
    },
  },
};
```

---

## 🧪 Testing del Frontend

### Component Testing

```jsx
// tests/components/UserForm.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../components/UserForm';

describe('UserForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders all form fields', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sexo/i)).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/nombre es requerido/i)).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('submits valid form data', async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: 'Juan Pérez' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'juan@email.com' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        nombre: 'Juan Pérez',
        email: 'juan@email.com',
        // ... otros campos
      });
    });
  });
});
```

### E2E Testing

```javascript
// tests/e2e/userFlow.spec.js
import { test, expect } from '@playwright/test';

test('complete user registration flow', async ({ page }) => {
  await page.goto('/');
  
  // Navigate to registration
  await page.click('text=Registrarse');
  
  // Fill form
  await page.fill('[name="nombre"]', 'Test User');
  await page.fill('[name="email"]', 'test@example.com');
  await page.selectOption('[name="sexo"]', 'Masculino');
  
  // Submit form
  await page.click('button[type="submit"]');
  
  // Verify success
  await expect(page.locator('.success-message')).toBeVisible();
});
```

---

## 🔧 Maintenance y Updates

### Dependency Updates

```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar dependencias menores
npm update

# Actualizar dependencias mayores (revisar breaking changes)
npm install package@latest
```

### Performance Monitoring

```javascript
// utils/performance.js
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  };
};

// Uso
const optimizedApiCall = measurePerformance('API Call', apiClient.get);
```

### Accessibility Checklist

- [ ] Alt text en todas las imágenes
- [ ] Labels asociados a inputs
- [ ] Focus states visibles
- [ ] Contraste de colores adecuado
- [ ] Navegación con teclado
- [ ] ARIA labels donde sea necesario
- [ ] Estructura semántica HTML

---

## 📚 Recursos y Referencias

### Documentación Externa
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [MDN Web Docs](https://developer.mozilla.org)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools y Extensions
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Librerías Recomendadas
- [Framer Motion](https://www.framer.com/motion/) - Animaciones avanzadas
- [React Hook Form](https://react-hook-form.com/) - Manejo de formularios
- [React Query](https://tanstack.com/query) - State management para datos server