
# TryOnMe / TryOnYou - AVBETOS Intelligence System

Sistema de inteligencia avanzada para recomendaciones de moda y análisis de preferencias.

## 🚀 Componentes del Sistema

### 📊 Google Apps Script Motor
Motor central del sistema de recomendaciones implementado en Google Sheets como prototipo funcional.

**Ubicación**: `/google-apps-script/`

**Características**:
- Sistema completo de recomendaciones basado en preferencias de usuario
- Algoritmo de matching que combina gustos personales, tendencias y medidas corporales
- Interfaz de prototipo en Google Sheets para validación rápida
- Validaciones automáticas y catálogos de datos configurables

**Inicio Rápido**:
1. Ve a [script.google.com](https://script.google.com)
2. Crea un nuevo proyecto
3. Copia los archivos de `/google-apps-script/` al proyecto
4. Ejecuta la función `initTryOnMe()`

Ver [Guía de Despliegue](./google-apps-script/DEPLOYMENT.md) para instrucciones detalladas.

### 🌐 Web Interface
Interfaz web principal del sistema TryOnMe.

**Archivos principales**:
- `index.html` - Página principal
- `main.js` - Lógica JavaScript
- `styles.css` - Estilos
- `mailer.php` - Sistema de contacto

### 📦 AVBETOS Package
Módulo core del sistema de inteligencia AVBETOS.

**Ubicación**: `/AVBETOS_repo_package/`

## 🔧 Desarrollo

### 🛠️ Comandos de Construcción (Make)

El proyecto incluye un **Makefile** completo que proporciona comandos estandarizados para construir, probar y desplegar el sistema:

```bash
# Construir todo el proyecto desde cero
make all

# Comandos individuales
make install     # Instalar dependencias
make build       # Construir para producción  
make clean       # Limpiar archivos temporales
make test        # Ejecutar tests
make dev         # Servidor de desarrollo
make preview     # Preview de la build

# Orquestación completa ABVET
make orchestrate # Pipeline completo

# Información del proyecto
make status      # Estado del proyecto
make help        # Ver todos los comandos disponibles
```

**Comandos principales:**
- `make all` - **El comando principal** que ejecuta: install, clean, build, test, lint, validate
- `make orchestrate` - Pipeline completo ABVET (clean, docs, install, build, preview, push, test)
- `make status` - Muestra el estado actual del proyecto

### 📋 Contribuir al Proyecto

**Issue Templates Mejorados**: El proyecto utiliza templates de GitHub que siguen conventional commits para mantener la calidad y consistencia:

- **🚀 Feature Request**: Para nuevas funcionalidades - `feat(scope): descripción`
- **🐛 Bug Report**: Para reportar errores - `fix(scope): descripción` 
- **📚 Documentation**: Para mejoras de documentación - `docs(scope): descripción`

**Guía rápida**:
1. Al crear un issue, selecciona el template apropiado
2. Reemplaza `SCOPE` con uno válido: `core`, `ui`, `api`, `auth`, `db`, etc.
3. Reemplaza los placeholders en MAYÚSCULAS con información específica
4. Consulta la [Guía de Templates](./.github/ISSUE_TEMPLATE/template-guide.md) para ejemplos

**Validación**: Los templates se validan automáticamente con `npm run validate:templates`

### Estructura del Proyecto
```
├── google-apps-script/          # Motor de recomendaciones (Google Apps Script)
│   ├── motor.gs                 # Función principal initTryOnMe()
│   ├── helpers.gs               # Funciones auxiliares
│   ├── utils.gs                 # Utilidades de mantenimiento
│   ├── appsscript.json         # Configuración del proyecto
│   └── DEPLOYMENT.md           # Guía de despliegue
├── AVBETOS_repo_package/       # Módulo core AVBETOS
├── src/                        # Código fuente adicional
├── tests/                      # Pruebas
└── docs/                       # Documentación
```

### Tecnologías
- **Backend**: Google Apps Script, PHP
- **Frontend**: HTML5, CSS3, JavaScript
- **Datos**: Google Sheets (prototipo), bases de datos (producción)
- **AI/ML**: Sistema propietario AVBETOS

## 📝 Licencia

Este software es propietario y está protegido por patente.
© 2025 Rubén Espinar Rodríguez — Todos los derechos reservados.

## 🎯 Estado del Proyecto

- [x] Motor de recomendaciones (Google Apps Script)
- [x] Interfaz web básica con React Router
- [x] Sistema de contacto
- [x] Navegación entre páginas principales
- [x] Estructura base para componentes
- [x] Stub components para features principales
- [ ] Integración con APIs de moda
- [ ] Dashboard de administración completo
- [ ] Sistema de pagos biométricos funcional

## 🗺️ Planificación

Ver [ROADMAP.md](./ROADMAP.md) para la hoja de ruta completa y [FEATURE_ISSUES.md](./FEATURE_ISSUES.md) para los issues individuales planificados.

## 📄 Documentación Completa

- **[ONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM](./docs/ONYOU-ABVETOS-ULTRA-PLUS-ULTIMATUM.md)** - Informe final completo del proyecto en inglés
- **[Entrega Final](./entrega-final.md)** - Resumen del proyecto en español
- **[Documentación Técnica](./docs/)** - Guías técnicas y de desarrollo

