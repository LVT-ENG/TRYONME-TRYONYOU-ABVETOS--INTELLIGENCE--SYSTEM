# Convenciones de Código - TryOnMe/TryOnYou Sistema

## 📋 Introducción

Este documento establece las convenciones de código para el proyecto TryOnMe/TryOnYou - AVBETOS Intelligence System. Seguir estas convenciones asegura consistencia, legibilidad y mantenibilidad del código.

## 🌐 Lenguajes y Tecnologías

### Estándares por Tecnología
- **Google Apps Script**: Seguir buenas prácticas de Apps Script
- **JavaScript/Node.js**: ES6+ syntax, ESLint configuration
- **PHP**: PSR-12 coding standards
- **HTML/CSS**: HTML5 semántico, principios de diseño responsive
- **React**: Functional components, hooks pattern

## 📝 Conventional Commits

### Formato de Commits

```
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos Válidos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Solo cambios en documentación
- `style`: Cambios que no afectan funcionalidad (espacios, formato, etc.)
- `refactor`: Refactoring que no añade features ni corrige bugs
- `perf`: Mejora de performance
- `test`: Añadir o corregir tests
- `build`: Cambios que afectan el sistema de build o dependencias
- `ci`: Cambios a archivos y scripts de CI
- `chore`: Otras tareas que no modifican src o test files
- `revert`: Revierte un commit previo

### Scopes Disponibles

- `core`: funcionalidad principal del sistema
- `ui`: interfaz de usuario
- `api`: endpoints y servicios
- `auth`: autenticación y autorización
- `db`: base de datos
- `deploy`: despliegue y configuración
- `config`: archivos de configuración
- `docs`: documentación
- `test`: testing
- `avbetos`: sistema AVBETOS específico
- `tryonme`: funcionalidad TryOnMe
- `tryonyou`: funcionalidad TryOnYou
- `health`: health checks y monitoring
- `workflow`: GitHub Actions y workflows

### Ejemplos de Commits

```bash
feat(core): add new recommendation algorithm
fix(ui): resolve mobile responsive issues
docs(api): update endpoint documentation
style(ui): format code with prettier
refactor(avbetos): improve data processing pipeline
perf(db): optimize query performance
test(core): add unit tests for recommendation engine
build(deps): upgrade React to v18
ci(workflow): add conventional commit validation
chore(config): update environment variables
```

## 📋 Naming Conventions

### Variables y Funciones

#### JavaScript/Google Apps Script
```javascript
// Variables: camelCase
const userPreferences = {};
const recommendationScore = 85;

// Funciones: camelCase con verbos descriptivos
function calculateRecommendationScore() {}
function validateUserData() {}
function generateSystemReport() {}

// Constantes: UPPER_SNAKE_CASE
const MAX_RECOMMENDATIONS = 20;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_TIMEOUT = 5000;

// Clases: PascalCase
class RecommendationEngine {}
class UserProfileManager {}
```

#### PHP
```php
// Variables: snake_case
$user_preferences = [];
$recommendation_score = 85;

// Funciones: snake_case
function calculate_recommendation_score() {}
function validate_user_data() {}

// Constantes: UPPER_SNAKE_CASE
const MAX_RECOMMENDATIONS = 20;
const API_BASE_URL = 'https://api.example.com';

// Clases: PascalCase
class RecommendationEngine {}
class UserProfileManager {}
```

### Archivos y Directorios

```
// Archivos: kebab-case
user-form.jsx
api-client.js
recommendation-engine.gs
user-profile-manager.php

// Directorios: kebab-case
google-apps-script/
src/components/
docs/api-reference/
tests/integration/
```

### CSS Classes

```css
/* BEM Methodology */
.header {}
.header__navigation {}
.header__navigation--active {}

.user-form {}
.user-form__input {}
.user-form__input--error {}
.user-form__submit-button {}

/* Utility Classes */
.text-center {}
.margin-large {}
.color-primary {}
```

## 📚 Documentación de Código

### JSDoc para JavaScript/Google Apps Script

```javascript
/**
 * Calcula recomendaciones para un usuario específico
 * @param {string} userId - ID único del usuario
 * @param {Object} preferences - Preferencias del usuario
 * @param {string[]} preferences.colors - Colores preferidos
 * @param {string} preferences.style - Estilo favorito
 * @param {Object} options - Opciones adicionales
 * @param {number} [options.maxResults=20] - Número máximo de resultados
 * @param {boolean} [options.includeTrends=true] - Incluir tendencias actuales
 * @returns {Promise<Object[]>} Array de recomendaciones ordenadas por score
 * @throws {Error} Error si userId es inválido
 * @example
 * const recommendations = await calculateRecommendations('user123', {
 *   colors: ['azul', 'verde'],
 *   style: 'casual'
 * });
 */
async function calculateRecommendations(userId, preferences, options = {}) {
  // Implementación
}
```

### PHPDoc para PHP

```php
/**
 * Envía un email de contacto
 * 
 * @param string $name Nombre del remitente
 * @param string $email Email del remitente
 * @param string $message Mensaje a enviar
 * @return array Resultado con status y mensaje
 * @throws InvalidArgumentException Si algún parámetro es inválido
 * 
 * @example
 * $result = sendContactEmail('Juan', 'juan@example.com', 'Hola mundo');
 */
function sendContactEmail($name, $email, $message) {
    // Implementación
}
```

### Comentarios en el Código

```javascript
// ✅ Buenos comentarios
// Aplicar algoritmo de diversificación para evitar recomendaciones repetitivas
const diversifiedResults = diversifyRecommendations(results);

// Validar entrada antes del procesamiento principal
if (!validateUserInput(userData)) {
  throw new Error('Datos de usuario inválidos');
}

/**
 * Este algoritmo utiliza una matriz de compatibilidad para calcular
 * la afinidad entre estilos de usuario y productos disponibles.
 * Basado en teorías de moda y análisis de preferencias.
 */
function calculateStyleCompatibility(userStyle, productStyle) {
  // Implementación
}

// ❌ Evitar comentarios obvios
const count = items.length; // Obtiene la longitud del array
let i = 0; // Inicializa contador en 0
```

## 🏗️ Estructura de Código

### Organización de Funciones

```javascript
// Google Apps Script - motor.gs
// 1. Función principal exportada
function initTryOnMe() {
  // Lógica principal
}

// 2. Funciones públicas (API)
function validateSystem() {}
function generateSystemReport() {}

// 3. Funciones privadas (helper)
function createSpreadsheetStructure_() {}
function populateDefaultData_() {}
function calculateCompatibilityScore_() {}

// 4. Constantes y configuración
const SYSTEM_CONFIG = {
  MAX_USERS: 50000,
  DEFAULT_RECOMMENDATIONS: 20
};
```

### Organización de Archivos React

```javascript
// UserForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './UserForm.css';

/**
 * Componente de formulario de usuario para capturar preferencias
 */
const UserForm = ({ onSubmit, initialData, isLoading }) => {
  // 1. Hooks y estado
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  // 2. Effects
  useEffect(() => {
    validateForm();
  }, [formData]);

  // 3. Handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // 4. Helper functions
  const validateForm = () => {
    const newErrors = {};
    // Validación
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 5. Render
  return (
    <form onSubmit={handleSubmit} className="user-form">
      {/* JSX */}
    </form>
  );
};

// 6. PropTypes
UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isLoading: PropTypes.bool
};

// 7. Default props
UserForm.defaultProps = {
  initialData: {},
  isLoading: false
};

export default UserForm;
```

## 🧪 Convenciones de Testing

### Estructura de Tests

```
tests/
├── unit/                 # Tests unitarios
│   ├── components/       # Tests de componentes React
│   ├── utils/           # Tests de utilidades
│   └── gas/             # Tests de Google Apps Script
├── integration/         # Tests de integración
│   ├── api/             # Tests de APIs
│   └── workflows/       # Tests de flujos completos
├── e2e/                 # Tests end-to-end
└── fixtures/            # Datos de prueba
```

### Naming de Tests

```javascript
// Describir el comportamiento esperado
describe('RecommendationEngine', () => {
  describe('calculateScore', () => {
    it('should return score between 0 and 100', () => {});
    it('should handle invalid user data gracefully', () => {});
    it('should apply style weights correctly', () => {});
  });
  
  describe('when user has no preferences', () => {
    it('should return default recommendations', () => {});
  });
});
```

### Estructura de Test Cases

```javascript
describe('calculateRecommendationScore', () => {
  // Setup
  let mockUser, mockProduct, mockTrends;
  
  beforeEach(() => {
    mockUser = {
      id: 'user123',
      preferences: { style: 'casual', colors: ['azul'] }
    };
    mockProduct = {
      id: 'product456',
      style: 'casual',
      colors: ['azul', 'blanco']
    };
    mockTrends = { casual: 0.8 };
  });
  
  // Test cases
  it('should calculate correct score for matching preferences', () => {
    // Arrange
    const expectedScore = 85;
    
    // Act
    const result = calculateRecommendationScore(mockUser, mockProduct, mockTrends);
    
    // Assert
    expect(result).toBe(expectedScore);
  });
});
```

## 🔧 Configuración de Herramientas

### ESLint Configuration (.eslintrc.js)

```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  rules: {
    // Naming conventions
    'camelcase': 'error',
    'prefer-const': 'error',
    
    // Code style
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    
    // Best practices
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'prefer-arrow-callback': 'error'
  }
};
```

### Prettier Configuration (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### EditorConfig (.editorconfig)

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.php]
indent_size = 4
```

## 🚀 Performance Guidelines

### JavaScript/Google Apps Script

```javascript
// ✅ Buenas prácticas
// Usar const/let en lugar de var
const users = getUsers();
let processedCount = 0;

// Evitar loops anidados innecesarios
const userMap = new Map(users.map(u => [u.id, u]));
const result = products.map(p => userMap.get(p.userId));

// Usar métodos de array apropiados
const activeUsers = users.filter(u => u.isActive);
const userNames = users.map(u => u.name);

// ❌ Evitar
// Loops anidados con O(n²) complexity
for (let user of users) {
  for (let product of products) {
    if (user.id === product.userId) {
      // Procesamiento
    }
  }
}
```

### CSS

```css
/* ✅ Buenas prácticas */
/* Usar clases específicas */
.user-form__submit-button {
  background-color: var(--primary-color);
  transition: background-color 0.3s ease;
}

/* Evitar !important */
.text-primary {
  color: #007bff;
}

/* ❌ Evitar */
/* Selectores demasiado específicos */
.container .content .form .input.text-input {
  margin: 10px;
}

/* Uso innecesario de !important */
.text-red {
  color: red !important;
}
```

## 📊 Code Quality Metrics

### Complejidad Ciclomática
- **Funciones simples**: 1-5
- **Funciones moderadas**: 6-10
- **Funciones complejas**: 11-15 (revisar refactoring)
- **Funciones muy complejas**: >15 (refactoring obligatorio)

### Cobertura de Tests
- **Mínimo aceptable**: 70%
- **Objetivo**: 85%
- **Funciones críticas**: 95%

### Tamaño de Funciones
- **Líneas por función**: <50 líneas
- **Parámetros por función**: <5 parámetros
- **Archivos por módulo**: <500 líneas

## 🔒 Seguridad

### Validación de Entrada

```javascript
// ✅ Validar siempre entrada de usuario
function validateUserEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function sanitizeUserInput(input) {
  return input.toString().trim().slice(0, 1000);
}

// ❌ Nunca confiar en entrada sin validar
function processUserData(userData) {
  // Peligroso: userData puede contener cualquier cosa
  return eval(userData.formula); // ¡Nunca hacer esto!
}
```

### Manejo de Secrets

```javascript
// ✅ Usar variables de entorno
const API_KEY = process.env.API_KEY;
const DB_PASSWORD = PropertiesService.getScriptProperties().getProperty('DB_PASSWORD');

// ❌ Nunca hardcodear secrets
const API_KEY = 'abc123def456'; // ¡No hacer esto!
```

## 📋 Checklist de Code Review

### Funcionalidad
- [ ] El código cumple los requisitos
- [ ] El código maneja casos edge apropiadamente
- [ ] No hay lógica duplicada
- [ ] El código es eficiente

### Calidad
- [ ] Sigue las convenciones de naming
- [ ] Está bien documentado
- [ ] Maneja errores apropiadamente
- [ ] Es fácil de leer y entender

### Testing
- [ ] Tiene tests unitarios adecuados
- [ ] Los tests pasan
- [ ] Cobertura de tests es aceptable
- [ ] Tests son mantenibles

### Seguridad
- [ ] Valida entrada de usuario
- [ ] No expone información sensible
- [ ] Maneja autenticación/autorización
- [ ] Usa HTTPS donde corresponde

## 📚 Referencias

- [Google Apps Script Best Practices](https://developers.google.com/apps-script/guides/best-practice)
- [JavaScript Style Guide - Airbnb](https://github.com/airbnb/javascript)
- [PSR-12 PHP Coding Standard](https://www.php-fig.org/psr/psr-12/)
- [React Best Practices](https://reactjs.org/docs/thinking-in-react.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Versión**: 1.0.0  
**Última actualización**: Septiembre 2024  
**Mantenido por**: Equipo LVT-ENG