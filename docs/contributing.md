# Guía de Contribución - TryOnMe Sistema

## 🎯 Cómo Contribuir

¡Gracias por tu interés en contribuir al sistema TryOnMe! Esta guía te ayudará a hacer contribuciones efectivas.

## 📋 Antes de Empezar

### Requisitos Previos

- [ ] Lee la [documentación completa](./README.md)
- [ ] Configura tu [entorno de desarrollo](./development-setup.md)
- [ ] Familiarízate con nuestras [convenciones de código](#convenciones-de-código)

### Code of Conduct

Este proyecto adhiere a un código de conducta. Al participar, esperas mantener un ambiente respetuoso y constructivo.

---

## 🚀 Proceso de Contribución

### 1. Fork y Clone

```bash
# Fork del repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/TU_USUARIO/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Añade el upstream
git remote add upstream https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
```

### 2. Crear Branch

```bash
# Sincroniza con upstream
git fetch upstream
git checkout main
git merge upstream/main

# Crea tu branch feature
git checkout -b feature/descripcion-breve
# o
git checkout -b fix/descripcion-del-bug
# o
git checkout -b docs/mejora-documentacion
```

### 3. Hacer Cambios

```bash
# Instala dependencias
npm install

# Ejecuta tests antes de cambios
npm test

# Haz tus cambios...

# Ejecuta tests después de cambios
npm test
npm run lint
```

### 4. Commit y Push

```bash
# Añade cambios
git add .

# Commit siguiendo conventional commits
git commit -m "feat(motor): add new recommendation algorithm"

# Push a tu fork
git push origin feature/descripcion-breve
```

### 5. Pull Request

1. Ve a GitHub y crea un Pull Request
2. Usa nuestro [template de PR](.github/pull_request_template.md)
3. Describe claramente los cambios realizados
4. Referencia issues relacionados
5. Asegúrate de que pasen todos los checks

---

## 📝 Convenciones de Código

### Conventional Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/) para mensajes de commit:

```
<tipo>[scope opcional]: <descripción>

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

#### Scopes Sugeridos

- `motor`: Google Apps Script motor
- `frontend`: Interfaz web React
- `api`: APIs backend
- `docs`: Documentación
- `config`: Configuración
- `deps`: Dependencias

#### Ejemplos

```bash
feat(motor): add user preference weighting algorithm
fix(frontend): resolve navigation menu mobile display issue
docs(api): update Google Apps Script function documentation
refactor(motor): optimize recommendation calculation performance
test(frontend): add unit tests for UserForm component
chore(deps): update React to version 18.2.0
```

### Estilo de Código

#### JavaScript/React

```javascript
// ✅ Correcto
const UserForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      {/* componente JSX */}
    </form>
  );
};

export default UserForm;
```

#### Google Apps Script

```javascript
// ✅ Correcto
/**
 * Calcula recomendaciones para un usuario específico
 * @param {string} userId - ID único del usuario
 * @param {Object} preferences - Preferencias del usuario
 * @returns {Array<Object>} Lista de recomendaciones ordenadas
 */
function calculateUserRecommendations(userId, preferences) {
  if (!userId || !preferences) {
    throw new Error('userId y preferences son requeridos');
  }
  
  const userSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Usuarios');
  const recommendations = [];
  
  // Lógica de cálculo...
  
  return recommendations.sort((a, b) => b.score - a.score);
}
```

#### CSS

```css
/* ✅ Correcto */
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

.user-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.user-form__input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}
```

### Naming Conventions

#### Archivos y Directorios

```
components/
├── UserForm.jsx          # PascalCase para componentes
├── user-form.css         # kebab-case para CSS
└── userFormHelpers.js    # camelCase para utilities

utils/
├── apiClient.js          # camelCase
├── dataValidation.js     # camelCase
└── constants.js          # camelCase

google-apps-script/
├── motor.gs              # kebab-case
├── helpers.gs            # kebab-case
└── utils.gs              # kebab-case
```

#### Variables y Funciones

```javascript
// ✅ Variables: camelCase
const userPreferences = {};
const recommendationScore = 85;

// ✅ Funciones: camelCase con verbo
function calculateRecommendations() {}
function validateUserInput() {}
function generateReport() {}

// ✅ Componentes React: PascalCase
const UserFormComponent = () => {};
const RecommendationList = () => {};

// ✅ Constantes: UPPER_SNAKE_CASE
const MAX_RECOMMENDATIONS = 20;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_TIMEOUT = 5000;
```

---

## 🧪 Testing Guidelines

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
│   ├── user-flows/      # Flujos de usuario
│   └── admin-flows/     # Flujos de administración
└── fixtures/            # Datos de prueba
    ├── users.json
    ├── recommendations.json
    └── products.json
```

### Escribir Tests

#### Unit Tests

```javascript
// tests/unit/utils/validation.test.js
import { describe, test, expect } from 'vitest';
import { validateUser } from '../../../src/utils/validation';

describe('validateUser', () => {
  test('debería validar usuario correcto', () => {
    const userData = {
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      edad: 25,
      sexo: 'Masculino'
    };

    const result = validateUser(userData);
    
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test('debería rechazar email inválido', () => {
    const userData = {
      nombre: 'Juan Pérez',
      email: 'email-invalido',
      edad: 25,
      sexo: 'Masculino'
    };

    const result = validateUser(userData);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Email inválido');
  });

  test('debería requerir campos obligatorios', () => {
    const userData = {};

    const result = validateUser(userData);
    
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
```

#### Component Tests

```javascript
// tests/unit/components/UserForm.test.jsx
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../../../src/components/UserForm';

describe('UserForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('debería renderizar todos los campos', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/edad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sexo/i)).toBeInTheDocument();
  });

  test('debería manejar envío de formulario válido', async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          nombre: 'Test User',
          email: 'test@example.com'
        })
      );
    });
  });
});
```

#### Google Apps Script Tests

```javascript
// tests/unit/gas/motor.test.js
import { describe, test, expect, beforeEach } from 'vitest';

// Mock Google Apps Script globals
global.SpreadsheetApp = {
  getActiveSpreadsheet: () => ({
    getSheetByName: (name) => ({
      getDataRange: () => ({
        getValues: () => [
          ['ID', 'Nombre', 'Email'],
          ['USR_001', 'Test User', 'test@example.com']
        ]
      })
    })
  })
};

// Import functions to test (you'd need to export them for testing)
import { validateUser, calculateRecommendations } from '../../../google-apps-script/helpers.gs';

describe('Google Apps Script Functions', () => {
  test('validateUser debería validar datos correctos', () => {
    const userData = {
      nombre: 'Test User',
      email: 'test@example.com',
      edad: 25
    };

    const result = validateUser(userData);
    
    expect(result.isValid).toBe(true);
  });

  test('calculateRecommendations debería retornar array ordenado', () => {
    const userId = 'USR_001';
    const preferences = { estilo: 'Casual' };

    const recommendations = calculateRecommendations(userId, preferences);
    
    expect(Array.isArray(recommendations)).toBe(true);
    
    // Verificar que está ordenado por score descendente
    for (let i = 1; i < recommendations.length; i++) {
      expect(recommendations[i-1].score).toBeGreaterThanOrEqual(
        recommendations[i].score
      );
    }
  });
});
```

### Cobertura de Tests

Objetivo mínimo de cobertura: **80%**

```bash
# Ejecutar tests con cobertura
npm run test:coverage

# Generar reporte HTML
npm run test:coverage:html
```

### Tests E2E

```javascript
// tests/e2e/complete-flow.spec.js
import { test, expect } from '@playwright/test';

test.describe('Flujo Completo de Usuario', () => {
  test('registro de usuario y generación de recomendaciones', async ({ page }) => {
    // Navegar a la aplicación
    await page.goto('/');
    
    // Completar formulario de registro
    await page.fill('[data-testid="nombre"]', 'Usuario E2E');
    await page.fill('[data-testid="email"]', 'e2e@test.com');
    await page.selectOption('[data-testid="sexo"]', 'Femenino');
    await page.fill('[data-testid="edad"]', '28');
    
    // Enviar formulario
    await page.click('[data-testid="submit-button"]');
    
    // Verificar redirección y carga de recomendaciones
    await expect(page).toHaveURL(/\/recommendations/);
    await expect(page.locator('[data-testid="recommendation-card"]')).toHaveCount.toBeGreaterThan(0);
    
    // Verificar contenido de recomendaciones
    const firstCard = page.locator('[data-testid="recommendation-card"]').first();
    await expect(firstCard.locator('[data-testid="product-name"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="product-score"]')).toBeVisible();
  });
});
```

---

## 📚 Documentación

### Requisitos de Documentación

Toda contribución debe incluir documentación apropiada:

- **Nuevas funciones**: JSDoc completo
- **Componentes React**: PropTypes o TypeScript + comentarios
- **APIs**: Documentación en `docs/api-reference.md`
- **Configuración**: Actualizar guías relevantes

### Formato JSDoc

```javascript
/**
 * Calcula el score de recomendación para un producto
 * 
 * @param {Object} userProfile - Perfil del usuario
 * @param {string} userProfile.estilo - Estilo preferido
 * @param {number} userProfile.edad - Edad del usuario
 * @param {Object} product - Datos del producto
 * @param {string} product.categoria - Categoría del producto
 * @param {number} product.precio - Precio del producto
 * @param {Object} trends - Tendencias actuales
 * @param {number} trends.popularity - Popularidad de 0-100
 * 
 * @returns {number} Score de 0-100 indicando compatibilidad
 * 
 * @throws {Error} Si faltan parámetros requeridos
 * 
 * @example
 * const score = calculateRecommendationScore(
 *   { estilo: 'Casual', edad: 25 },
 *   { categoria: 'Vestido', precio: 49.99 },
 *   { popularity: 85 }
 * );
 * // Returns: 78
 * 
 * @since 1.2.0
 */
function calculateRecommendationScore(userProfile, product, trends) {
  // implementación...
}
```

### README Component

Para componentes React complejos, añade un README:

```markdown
# UserForm Component

Formulario de registro de usuario con validación en tiempo real.

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `onSubmit` | `function` | ✅ | Callback ejecutado al enviar formulario válido |
| `initialData` | `object` | ❌ | Datos iniciales del formulario |
| `disabled` | `boolean` | ❌ | Deshabilita el formulario |

## Uso

```jsx
<UserForm 
  onSubmit={handleUserSubmit}
  initialData={{ nombre: 'Juan' }}
  disabled={loading}
/>
```

## Validaciones

- Nombre: mínimo 2 caracteres
- Email: formato válido
- Edad: entre 18 y 100 años
- Sexo: selección requerida
```

---

## 🐛 Reportar Bugs

### Antes de Reportar

1. Busca en issues existentes
2. Reproduce el bug en la última versión
3. Verifica si es un problema de configuración local

### Template de Bug Report

```markdown
## Descripción del Bug
Descripción clara y concisa del problema.

## Pasos para Reproducir
1. Ve a '...'
2. Haz clic en '...'
3. Scroll hasta '...'
4. Ver error

## Comportamiento Esperado
Descripción clara de lo que esperabas que pasara.

## Comportamiento Actual
Descripción de lo que realmente pasó.

## Screenshots
Si es aplicable, añade screenshots.

## Entorno
- OS: [e.g. iOS, Windows, Linux]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
- Node.js: [e.g. 18.2.0]

## Información Adicional
Cualquier contexto adicional sobre el problema.
```

---

## 💡 Sugerir Features

### Template de Feature Request

```markdown
## Feature Request

### Problema a Resolver
Descripción clara del problema que esta feature resolvería.

### Solución Propuesta
Descripción clara y concisa de lo que quieres que pase.

### Alternativas Consideradas
Descripción de soluciones alternativas que consideraste.

### Información Adicional
Contexto adicional, screenshots, etc.
```

---

## 🎨 Contribuir con Diseño

### Assets

- **Iconos**: SVG optimizados, preferiblemente de Heroicons o similar
- **Imágenes**: WebP cuando sea posible, fallback a PNG/JPG
- **Logos**: SVG con variantes en different tamaños

### Design System

Sigue nuestro sistema de diseño documentado en [frontend-guide.md](./frontend-guide.md):

- Usa variables CSS existentes
- Mantén consistencia en espaciado
- Respeta la paleta de colores
- Asegura accesibilidad (contraste, tamaños)

---

## 🚀 Release Process

### Versionado

Seguimos [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Cambios incompatibles
- **MINOR** (0.1.0): Nueva funcionalidad compatible
- **PATCH** (0.0.1): Bug fixes compatibles

### Release Notes

```markdown
## [1.2.0] - 2024-01-15

### Added
- Nueva funcionalidad de recomendaciones por IA
- Integración con API de Zalando
- Dashboard de administración

### Changed
- Mejora en performance del motor de recomendaciones
- Actualización de UI components

### Fixed
- Corrección en validación de formularios
- Fix en cálculo de scores

### Security
- Actualización de dependencias con vulnerabilidades
```

---

## 🏆 Reconocimiento

### Contributors

Reconocemos a todos los contributores en:
- README.md principal
- Hall of Fame en documentación
- Release notes

### Levels de Contribución

- 🥉 **Bronze**: 1-5 PRs merged
- 🥈 **Silver**: 5-15 PRs merged  
- 🥇 **Gold**: 15+ PRs merged
- 💎 **Diamond**: Contribuciones significativas al proyecto

---

## 📞 Ayuda y Soporte

### Canales de Comunicación

1. **GitHub Issues** - Para bugs y features
2. **GitHub Discussions** - Para preguntas generales
3. **Discord/Slack** - Para chat en tiempo real (si existe)

### Mentoring

Si eres nuevo contribuyendo:
- Busca issues etiquetados como `good-first-issue`
- Pregunta en discussions si necesitas ayuda
- Los maintainers están disponibles para mentoring

### Review Process

1. **Automated Checks**: CI/CD debe pasar
2. **Code Review**: Al menos un maintainer debe aprobar
3. **Testing**: Verificación manual si es necesario
4. **Documentation**: Verificar que docs están actualizadas

---

## 📋 Checklist de PR

Antes de enviar tu PR, verifica:

- [ ] Tests pasan localmente (`npm test`)
- [ ] Linting pasa (`npm run lint`)
- [ ] Build es exitoso (`npm run build`)
- [ ] Documentación actualizada
- [ ] Conventional commits utilizados
- [ ] PR description completa
- [ ] Issues referenciados
- [ ] Screenshots incluidos (si hay cambios UI)
- [ ] Breaking changes documentados

---

¡Gracias por contribuir al sistema TryOnMe! 🎉