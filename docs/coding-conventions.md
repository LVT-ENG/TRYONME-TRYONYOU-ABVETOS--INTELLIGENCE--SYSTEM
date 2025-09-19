# Convenciones de Código - TryOnMe Sistema

## 🎯 Visión General

Este documento establece las convenciones de código unificadas para todo el proyecto TryOnMe/TryOnYou - AVBETOS Intelligence System, asegurando consistencia, legibilidad y mantenibilidad del código.

## 📝 Conventional Commits

### Formato de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional]
```

#### Tipos Válidos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Solo cambios en documentación
- `style`: Cambios que no afectan funcionalidad (espacios, formato, etc.)
- `refactor`: Refactoring que no añade features ni corrige bugs
- `perf`: Mejora de performance
- `test`: Añadir o corregir tests
- `chore`: Cambios en proceso de build o herramientas auxiliares

#### Scopes Disponibles

- `motor`: Google Apps Script motor
- `frontend`: Interfaz web React
- `api`: APIs backend
- `docs`: Documentación
- `config`: Configuración
- `deps`: Dependencias
- `avbetos`: Sistema AVBETOS específico
- `tryonme`: Funcionalidad TryOnMe
- `tryonyou`: Funcionalidad TryOnYou

#### Ejemplos

```bash
feat(motor): add user preference weighting algorithm
fix(frontend): resolve navigation menu mobile display issue
docs(api): update Google Apps Script function documentation
refactor(motor): optimize recommendation calculation performance
test(frontend): add unit tests for UserForm component
chore(deps): update React to version 18.2.0
```

## 🔧 Google Apps Script

### Estructura de Archivos

```
google-apps-script/
├── motor.gs              # Función principal initTryOnMe()
├── helpers.gs            # Funciones auxiliares
├── utils.gs              # Utilidades de mantenimiento
├── appsscript.json       # Configuración del proyecto
├── README.md             # Documentación del motor
└── DEPLOYMENT.md         # Guía de despliegue
```

### Convenciones de Naming

```javascript
// ✅ Correcto - Funciones principales en camelCase
function initTryOnMe() { }
function generateRecommendations() { }
function calculateUserScore() { }

// ✅ Correcto - Constantes en UPPER_SNAKE_CASE  
const MAX_RECOMMENDATIONS = 20;
const DEFAULT_SCORE_THRESHOLD = 70;
const TREND_WEIGHT_FACTOR = 0.15;

// ✅ Correcto - Variables en camelCase
const userData = getUserData();
const recommendationList = [];
const scoreThreshold = 85;

// ❌ Incorrecto
function Init_TryOnMe() { }           // No usar snake_case para funciones
const maxRecommendations = 20;        // Constantes deben ser UPPER_CASE
const user_data = getUserData();      // Variables deben ser camelCase
```

### Documentación con JSDoc

```javascript
/**
 * Genera recomendaciones personalizadas para un usuario específico
 * @param {string} userId - ID único del usuario
 * @param {number} [limit=20] - Número máximo de recomendaciones
 * @param {Object} [options] - Opciones adicionales de configuración
 * @param {boolean} [options.includeTrends=true] - Incluir análisis de tendencias
 * @param {Array<string>} [options.categories] - Categorías específicas a incluir
 * @returns {Array<Object>} Lista de recomendaciones con scores
 * @throws {Error} Si el usuario no existe o faltan datos críticos
 * @example
 * // Generar 10 recomendaciones básicas
 * const recommendations = generateRecommendations('user_123', 10);
 * 
 * // Generar recomendaciones con opciones avanzadas
 * const recommendations = generateRecommendations('user_123', 20, {
 *   includeTrends: false,
 *   categories: ['vestidos', 'camisas']
 * });
 */
function generateRecommendations(userId, limit = 20, options = {}) {
  // Validación de entrada
  if (!userId || typeof userId !== 'string') {
    throw new Error('userId es requerido y debe ser un string');
  }
  
  // Configuración por defecto
  const config = {
    includeTrends: true,
    categories: [],
    ...options
  };
  
  // Implementación...
}
```

### Manejo de Errores

```javascript
// ✅ Correcto - Manejo específico de errores
function getUserData(userId) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Usuarios');
    
    if (!sheet) {
      throw new Error('Hoja "Usuarios" no encontrada');
    }
    
    const userData = findUserInSheet(sheet, userId);
    
    if (!userData) {
      throw new Error(`Usuario ${userId} no encontrado`);
    }
    
    return userData;
    
  } catch (error) {
    console.error(`Error al obtener datos del usuario ${userId}:`, error);
    
    // Re-lanzar con contexto adicional
    throw new Error(`Failed to get user data: ${error.message}`);
  }
}

// ✅ Correcto - Validación de entrada
function calculateScore(user, product) {
  // Validaciones tempranas
  if (!user || !product) {
    throw new Error('Usuario y producto son requeridos');
  }
  
  if (!user.preferences) {
    console.warn(`Usuario ${user.id} sin preferencias, usando valores por defecto`);
    user.preferences = getDefaultPreferences();
  }
  
  // Continuar con la lógica...
}
```

### Configuración y Constantes

```javascript
// ✅ Correcto - Configuración centralizada
const CONFIG = {
  SYSTEM: {
    VERSION: '1.0.0',
    MAX_RECOMMENDATIONS: 20,
    DEFAULT_SCORE_THRESHOLD: 70
  },
  WEIGHTS: {
    STYLE_WEIGHT: 0.25,
    SIZE_WEIGHT: 0.20,
    COLOR_WEIGHT: 0.15,
    TREND_WEIGHT: 0.15,
    PRICE_WEIGHT: 0.10,
    BRAND_WEIGHT: 0.10,
    SEASON_WEIGHT: 0.05
  },
  SHEETS: {
    USERS: 'Usuarios',
    MEASUREMENTS: 'Medidas',
    TRENDS: 'Tendencias',
    RULES: 'Reglas',
    RECOMMENDATIONS: 'Recomendaciones'
  }
};

// Uso de configuración
function initTryOnMe() {
  const ss = SpreadsheetApp.create(`TryOnMe Motor v${CONFIG.SYSTEM.VERSION}`);
  // ...
}
```

## ⚛️ React/JavaScript Frontend

### Estructura de Componentes

```
src/
├── components/
│   ├── common/           # Componentes reutilizables
│   │   ├── Button/
│   │   ├── Modal/
│   │   └── Loading/
│   ├── forms/            # Componentes de formularios
│   │   ├── UserForm/
│   │   └── PreferencesForm/
│   └── layouts/          # Layouts de página
│       ├── Header/
│       └── Footer/
├── hooks/                # Custom hooks
├── utils/                # Utilidades
├── services/             # Servicios API
└── styles/               # Estilos globales
```

### Convenciones de Componentes React

```jsx
// ✅ Correcto - Componente funcional con propTypes
import React from 'react';
import PropTypes from 'prop-types';
import './UserForm.css';

/**
 * Formulario para captura de datos de usuario
 * @param {Object} props - Props del componente
 * @param {Object} props.initialData - Datos iniciales del formulario
 * @param {Function} props.onSubmit - Callback al enviar formulario
 * @param {boolean} props.isLoading - Estado de carga
 * @returns {React.Component} Componente UserForm
 */
const UserForm = ({ initialData, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit(formData);
  }, [formData, onSubmit]);

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {/* Contenido del formulario */}
    </form>
  );
};

UserForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

UserForm.defaultProps = {
  initialData: {},
  isLoading: false
};

export default UserForm;
```

### Custom Hooks

```jsx
// ✅ Correcto - Custom hook para lógica reutilizable
import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para manejar datos de usuario con cache y loading states
 * @param {string} userId - ID del usuario
 * @returns {Object} Estado del usuario y funciones de control
 */
export const useUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    if (!userId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await userService.getUserById(userId);
      setUserData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const updateUserData = useCallback(async (updates) => {
    try {
      const updatedData = await userService.updateUser(userId, updates);
      setUserData(updatedData);
      return updatedData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  return {
    userData,
    isLoading,
    error,
    refetch: fetchUserData,
    updateUserData
  };
};
```

### Servicios API

```javascript
// ✅ Correcto - Servicio API con manejo de errores
class UserService {
  constructor(apiUrl = '/api') {
    this.apiUrl = apiUrl;
  }

  /**
   * Obtiene datos de usuario por ID
   * @param {string} userId - ID del usuario
   * @returns {Promise<Object>} Datos del usuario
   * @throws {Error} Si el usuario no existe o hay error de red
   */
  async getUserById(userId) {
    try {
      const response = await fetch(`${this.apiUrl}/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const userData = await response.json();
      
      // Validación de estructura de datos
      if (!userData.id || !userData.preferences) {
        throw new Error('Estructura de datos de usuario inválida');
      }
      
      return userData;
      
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Actualiza datos de usuario
   * @param {string} userId - ID del usuario
   * @param {Object} updates - Datos a actualizar
   * @returns {Promise<Object>} Usuario actualizado
   */
  async updateUser(userId, updates) {
    try {
      const response = await fetch(`${this.apiUrl}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }
      
      return await response.json();
      
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      throw error;
    }
  }
}

// Instancia singleton
export const userService = new UserService();
```

## 🎨 CSS/Estilos

### Metodología BEM

```css
/* ✅ Correcto - Seguir metodología BEM */

/* Bloque */
.user-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  max-width: 500px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  background: var(--white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
}

/* Elemento */
.user-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.user-form__label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.user-form__input {
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-base);
  transition: all 0.2s ease;
}

/* Modificador */
.user-form__input--error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.user-form__input--success {
  border-color: var(--color-success);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

/* Estado */
.user-form__input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.user-form__input:disabled {
  background-color: var(--gray-100);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Variables CSS

```css
/* ✅ Correcto - Variables CSS organizadas */
:root {
  /* Colores principales */
  --primary-color: #007bff;
  --primary-dark: #0056b3;
  --primary-light: #66b3ff;
  
  /* Colores secundarios */
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --error-color: #dc3545;
  
  /* Colores neutros */
  --white: #ffffff;
  --black: #000000;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  
  /* Tipografía */
  --font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  
  /* Espaciado */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  
  /* Bordes */
  --border-radius-sm: 0.25rem;   /* 4px */
  --border-radius-md: 0.375rem;  /* 6px */
  --border-radius-lg: 0.5rem;    /* 8px */
  --border-radius-xl: 0.75rem;   /* 12px */
  
  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Transiciones */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;
  --transition-slow: 0.3s ease;
}
```

### Responsive Design

```css
/* ✅ Correcto - Mobile-first responsive design */

/* Mobile por defecto */
.user-form {
  padding: var(--spacing-md);
  margin: var(--spacing-sm);
}

/* Tablet */
@media (min-width: 768px) {
  .user-form {
    padding: var(--spacing-lg);
    margin: var(--spacing-md) auto;
    max-width: 600px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .user-form {
    padding: var(--spacing-xl);
    max-width: 800px;
  }
}

/* Desktop large */
@media (min-width: 1280px) {
  .user-form {
    max-width: 900px;
  }
}
```

## 🧪 Testing

### Estructura de Tests

```
tests/
├── unit/                 # Tests unitarios
│   ├── components/       # Tests de componentes React
│   │   ├── UserForm.test.jsx
│   │   └── Modal.test.jsx
│   ├── utils/           # Tests de utilidades
│   │   ├── validation.test.js
│   │   └── formatting.test.js
│   └── gas/             # Tests de Google Apps Script
│       ├── motor.test.js
│       └── helpers.test.js
├── integration/         # Tests de integración
│   ├── api/             # Tests de APIs
│   │   └── userService.test.js
│   └── workflows/       # Tests de flujos completos
│       └── recommendation.test.js
├── e2e/                 # Tests end-to-end
│   ├── user-flows/      # Flujos de usuario
│   │   └── user-onboarding.test.js
│   └── admin-flows/     # Flujos de administración
│       └── system-setup.test.js
└── fixtures/            # Datos de prueba
    ├── users.json
    ├── recommendations.json
    └── products.json
```

### Tests de Componentes React

```jsx
// ✅ Correcto - Test completo de componente
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from '../UserForm';

describe('UserForm', () => {
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    onSubmit: mockOnSubmit,
    isLoading: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all required fields', () => {
    render(<UserForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/edad/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<UserForm {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await user.click(submitButton);
    
    expect(screen.getByText(/nombre es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/email es requerido/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const formData = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      age: 25
    };
    
    render(<UserForm {...defaultProps} />);
    
    await user.type(screen.getByLabelText(/nombre/i), formData.name);
    await user.type(screen.getByLabelText(/email/i), formData.email);
    await user.type(screen.getByLabelText(/edad/i), formData.age.toString());
    
    await user.click(screen.getByRole('button', { name: /enviar/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(formData);
    });
  });

  it('shows loading state when submitting', () => {
    render(<UserForm {...defaultProps} isLoading={true} />);
    
    const submitButton = screen.getByRole('button', { name: /enviando/i });
    expect(submitButton).toBeDisabled();
  });
});
```

### Tests de Google Apps Script

```javascript
// ✅ Correcto - Test de función GAS
describe('Google Apps Script Functions', () => {
  describe('calculateRecommendationScore', () => {
    const mockUser = {
      id: 'user_123',
      preferences: {
        styles: ['Elegante / Chic', 'Casual / Informal'],
        colors: ['Negro', 'Azul'],
        brands: ['Zara', 'H&M']
      },
      measurements: {
        bust: 88,
        waist: 68,
        hips: 94
      }
    };

    const mockProduct = {
      id: 'product_456',
      style: 'Elegante / Chic',
      color: 'Negro',
      brand: 'Zara',
      sizes: ['S', 'M'],
      price: 49.99,
      season: 'Primavera'
    };

    const mockTrends = {
      keywords: [
        { term: 'elegante', volume: 5000, date: '2024-01-15' }
      ],
      categories: ['vestidos'],
      colors: ['negro']
    };

    it('calculates correct score for perfect match', () => {
      const score = calculateRecommendationScore(mockUser, mockProduct, mockTrends);
      
      expect(score).toBeGreaterThan(80);
      expect(score).toBeLessThanOrEqual(100);
    });

    it('handles missing user preferences gracefully', () => {
      const userWithoutPrefs = { ...mockUser, preferences: {} };
      
      expect(() => {
        calculateRecommendationScore(userWithoutPrefs, mockProduct, mockTrends);
      }).not.toThrow();
    });

    it('returns 0 for invalid inputs', () => {
      expect(calculateRecommendationScore(null, mockProduct, mockTrends)).toBe(0);
      expect(calculateRecommendationScore(mockUser, null, mockTrends)).toBe(0);
    });
  });
});
```

## 📏 Linting y Formatting

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // Código limpio
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'error',
    
    // Mejores prácticas
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    
    // React específico
    'react/prop-types': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    
    // Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
```

### Prettier Configuration

```javascript
// .prettierrc.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf'
};
```

## 🔄 Pre-commit Hooks

### Husky Configuration

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{css,scss,md}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

## 📚 Recursos y Herramientas

### Herramientas de Desarrollo

- **ESLint**: Linting de JavaScript/TypeScript
- **Prettier**: Formateo automático de código
- **Husky**: Git hooks para automatización
- **Jest**: Framework de testing
- **React Testing Library**: Testing de componentes React

### Extensiones VS Code Recomendadas

```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Scripts NPM

```json
// package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,md}\"",
    "type-check": "tsc --noEmit"
  }
}
```