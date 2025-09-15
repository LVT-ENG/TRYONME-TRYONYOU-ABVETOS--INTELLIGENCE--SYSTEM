# Guía de Configuración del Entorno de Desarrollo

## 🚀 Inicio Rápido

### Requisitos del Sistema

#### Software Necesario
- **Node.js** (versión 18 o superior)
- **npm** o **pnpm** (recomendado)
- **Git**
- **Editor de código** (VS Code recomendado)

#### Cuentas Necesarias
- **Cuenta de Google** (para Google Apps Script)
- **GitHub** (para contribuir al proyecto)

### Configuración Inicial

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
   cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
   ```

2. **Instalar Dependencias**
   ```bash
   # Con npm
   npm install
   
   # Con pnpm (recomendado)
   pnpm install
   ```

3. **Configurar Variables de Entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

4. **Verificar Instalación**
   ```bash
   npm run test
   npm run start
   ```

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
├── google-apps-script/          # Motor principal (Google Apps Script)
│   ├── motor.gs                 # Función principal initTryOnMe()
│   ├── helpers.gs               # Funciones auxiliares
│   ├── utils.gs                 # Utilidades de mantenimiento
│   ├── appsscript.json         # Configuración GAS
│   └── DEPLOYMENT.md           # Guía de despliegue
├── src/                        # Código fuente frontend
│   ├── components/             # Componentes React
│   ├── styles/                 # Archivos CSS
│   └── utils/                  # Utilidades JavaScript
├── docs/                       # Documentación
├── tests/                      # Pruebas
├── public/                     # Assets públicos
├── package.json               # Configuración npm
├── vite.config.js            # Configuración Vite
└── README.md                 # Documentación principal
```

### Tecnologías Utilizadas

#### Backend
- **Google Apps Script** - Motor de recomendaciones
- **Google Sheets** - Base de datos (prototipo)
- **PHP** - Sistema de contacto (mailer.php)

#### Frontend
- **React** - Framework de UI
- **Vite** - Build tool y servidor de desarrollo
- **CSS3** - Estilos y animaciones

#### Herramientas de Desarrollo
- **ESLint** - Linting de JavaScript
- **Prettier** - Formateo de código
- **Commitlint** - Validación de commits

---

## 🛠️ Configuración de Herramientas

### Visual Studio Code

#### Extensiones Recomendadas

1. **ES6 Syntax Highlighting**
2. **Google Apps Script** (para sintaxis .gs)
3. **Prettier** - Code formatter
4. **ESLint**
5. **Thunder Client** (para testing de APIs)

#### Configuración VS Code (settings.json)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.gs": "javascript"
  }
}
```

### Git Hooks

El proyecto usa Husky para git hooks automáticos:

```bash
# Instalar husky
npx husky install

# Configurar pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run test"

# Configurar commit-msg hook
npx husky add .husky/commit-msg "npx commitlint --edit $1"
```

---

## 🔧 Google Apps Script Development

### Configuración del Entorno GAS

1. **Instalar clasp (CLI de Google Apps Script)**
   ```bash
   npm install -g @google/clasp
   ```

2. **Autenticar con Google**
   ```bash
   clasp login
   ```

3. **Clonar proyecto existente**
   ```bash
   clasp clone <SCRIPT_ID>
   ```

4. **Configurar push automático**
   ```bash
   clasp push --watch
   ```

### Workflow de Desarrollo GAS

1. **Desarrollo Local**
   - Editar archivos .gs en tu editor preferido
   - Usar sintaxis highlighting para JavaScript

2. **Testing**
   ```bash
   # Push a Google Apps Script
   clasp push
   
   # Abrir en editor web
   clasp open
   
   # Ver logs
   clasp logs
   ```

3. **Deployment**
   ```bash
   # Crear nueva versión
   clasp version "Descripción de cambios"
   
   # Deploy
   clasp deploy
   ```

### Estructura de Archivos GAS

```javascript
// motor.gs - Archivo principal
function initTryOnMe() {
  // Función principal
}

// helpers.gs - Funciones auxiliares
function validateUser(userData) {
  // Validaciones
}

// utils.gs - Utilidades
function generateSystemReport() {
  // Reportes y mantenimiento
}
```

---

## 🌐 Desarrollo Web Frontend

### Servidor de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Servidor estará disponible en http://localhost:5173
```

### Build para Producción

```bash
# Crear build optimizado
npm run build

# Previsualizar build
npm run preview
```

### Estructura de Componentes

```javascript
// src/components/UserForm.jsx
import React, { useState } from 'react';

export default function UserForm() {
  const [formData, setFormData] = useState({});
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Componente del formulario */}
    </form>
  );
}
```

### CSS y Estilos

```css
/* src/styles/main.css */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-family: 'Inter', sans-serif;
}

.component {
  /* Estilos del componente */
}
```

---

## 🧪 Testing y Quality Assurance

### Configuración de Tests

```bash
# Ejecutar tests
npm run test

# Tests con watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Estructura de Tests

```javascript
// tests/motor.test.js
import { validateUser } from '../google-apps-script/helpers.gs';

describe('User Validation', () => {
  test('should validate correct user data', () => {
    const userData = {
      nombre: 'Juan Pérez',
      email: 'juan@email.com',
      edad: 25
    };
    
    const result = validateUser(userData);
    expect(result.isValid).toBe(true);
  });
});
```

### Linting y Formateo

```bash
# Ejecutar ESLint
npm run lint

# Corregir errores automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format
```

---

## 🚀 Deployment

### Desarrollo Local

1. **Frontend Development Server**
   ```bash
   npm run dev
   ```

2. **Google Apps Script Development**
   ```bash
   clasp push --watch
   ```

### Staging

1. **Build y Deploy Frontend**
   ```bash
   npm run build
   vercel --prod
   ```

2. **Deploy Google Apps Script**
   ```bash
   clasp deploy -d "Staging deployment"
   ```

### Producción

Ver [DEPLOY.md](../DEPLOY.md) para instrucciones completas de deployment.

---

## 📝 Convenciones de Código

### Naming Conventions

```javascript
// Funciones: camelCase
function getUserRecommendations() {}

// Variables: camelCase
const userPreferences = {};

// Constantes: UPPER_SNAKE_CASE
const MAX_RECOMMENDATIONS = 20;

// Archivos: kebab-case
user-form.jsx
api-client.js
```

### Comentarios y Documentación

```javascript
/**
 * Calcula recomendaciones para un usuario específico
 * @param {string} userId - ID del usuario
 * @param {Object} preferences - Preferencias del usuario
 * @returns {Array} Array de recomendaciones ordenadas por score
 */
function calculateRecommendations(userId, preferences) {
  // Implementación
}
```

### Commit Messages

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Feature
git commit -m "feat(motor): add new recommendation algorithm"

# Fix
git commit -m "fix(validation): correct email validation regex"

# Documentation
git commit -m "docs(api): update API reference examples"

# Refactor
git commit -m "refactor(helpers): optimize user validation function"
```

---

## 🐛 Debugging

### Google Apps Script Debugging

1. **Usar console.log extensively**
   ```javascript
   function debugRecommendations() {
     console.log('Starting recommendation calculation...');
     console.log('User data:', userData);
     console.log('Final score:', score);
   }
   ```

2. **Ver logs en tiempo real**
   ```bash
   clasp logs --watch
   ```

3. **Usar debugger en editor web**
   - Abrir script.google.com
   - Poner breakpoints
   - Ejecutar función en modo debug

### Frontend Debugging

1. **Browser DevTools**
   - F12 para abrir DevTools
   - Console tab para logs
   - Network tab para APIs

2. **React DevTools**
   - Instalar extensión React DevTools
   - Inspeccionar componentes y state

---

## 📦 Gestión de Dependencias

### npm Scripts Disponibles

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src --ext .js,.jsx",
    "lint:fix": "eslint src --ext .js,.jsx --fix",
    "format": "prettier --write .",
    "clasp:push": "clasp push",
    "clasp:deploy": "clasp deploy"
  }
}
```

### Actualización de Dependencias

```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar todas las dependencias
npm update

# Actualizar dependencia específica
npm install package-name@latest
```

---

## 🔐 Seguridad y Best Practices

### Variables de Entorno

```bash
# .env (nunca commitear)
GOOGLE_SCRIPT_ID=your_script_id
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

### Validación de Entrada

```javascript
// Siempre validar datos de entrada
function processUserData(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data provided');
  }
  
  // Validaciones específicas
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Invalid email format');
  }
}
```

### Manejo de Errores

```javascript
function safeApiCall() {
  try {
    const result = riskyOperation();
    return { success: true, data: result };
  } catch (error) {
    console.error('Operation failed:', error);
    return { success: false, error: error.message };
  }
}
```

---

## 📞 Soporte y Contribución

### Canales de Comunicación

1. **Issues de GitHub** - Para bugs y feature requests
2. **Discussions** - Para preguntas generales
3. **Code Reviews** - Para contribuciones

### Proceso de Contribución

1. Fork del repositorio
2. Crear branch feature: `git checkout -b feature/nueva-funcionalidad`
3. Hacer commits siguiendo convenciones
4. Push del branch: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Recursos Adicionales

- [Documentación de Google Apps Script](https://developers.google.com/apps-script)
- [Guía de React](https://react.dev)
- [Documentación de Vite](https://vitejs.dev)
- [ESLint Rules](https://eslint.org/docs/rules/)