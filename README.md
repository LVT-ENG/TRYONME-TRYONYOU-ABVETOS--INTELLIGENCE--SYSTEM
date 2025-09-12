# TryOnMe / TryOnYou - AVBETOS Intelligence System

Sistema de inteligencia avanzada patentado para recomendaciones de moda y análisis de preferencias biométricas.

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
Interfaz web principal del sistema TryOnMe con verificación biométrica.

**Archivos principales**:
- `index.html` - Página principal
- `main.js` - Lógica JavaScript
- `styles.css` - Estilos
- `mailer.php` - Sistema de contacto
- `health.php` - Endpoint de salud con métricas

**API Endpoints**:
- `GET /health` - Estado del sistema y métricas
- `POST /enroll` - Matrícula biométrica `{ userId, voiceSample, irisTemplate }`
- `POST /verify` - Verificación biométrica `{ userId, voiceSample, irisTemplate }`
- `POST /payments/intent` - Intención de pago `{ amount, currency?, metadata? }`

### 📦 AVBETOS Package
Módulo core del sistema de inteligencia AVBETOS patentado.

**Ubicación**: `/AVBETOS_repo_package/`

## 🔧 Desarrollo

### Scripts Disponibles
- `npm run dev` - Servidor de desarrollo con hot reload
- `npm run build` - Construcción para producción
- `npm run preview` - Vista previa de la construcción
- `npm run lint:commits` - Validación de commits convencionales

### Estructura del Proyecto
```
├── google-apps-script/          # Motor de recomendaciones (Google Apps Script)
│   ├── motor.gs                 # Función principal initTryOnMe()
│   ├── helpers.gs               # Funciones auxiliares
│   ├── utils.gs                 # Utilidades de mantenimiento
│   ├── appsscript.json         # Configuración del proyecto
│   └── DEPLOYMENT.md           # Guía de despliegue
├── AVBETOS_repo_package/       # Módulo core AVBETOS
├── tryonu-app/                 # Aplicación React con Sentry
├── src/                        # Código fuente adicional
├── tests/                      # Pruebas
├── docs/                       # Documentación
└── .github/                    # Templates y workflows
```

### Tecnologías
- **Backend**: Google Apps Script, PHP, Node.js
- **Frontend**: React, HTML5, CSS3, JavaScript, Framer Motion
- **Datos**: Google Sheets (prototipo), bases de datos (producción)
- **AI/ML**: Sistema propietario AVBETOS
- **Observabilidad**: Sentry, métricas personalizadas
- **Despliegue**: Vercel, Vite

## 📚 Documentación

- [**Documentación Principal**](./docs/placeholder.md) - Índice completo de documentación
- [**Guía de Usuario**](./docs/USER_GUIDE.md) - Cómo usar el sistema TryOnMe / TryOnYou
- [**Guía de Desarrollo**](./docs/DEVELOPER_GUIDE.md) - Configuración y desarrollo
- [**Documentación de API**](./docs/API.md) - Endpoints y especificaciones técnicas
- [**Troubleshooting**](./docs/TROUBLESHOOTING.md) - Resolución de problemas comunes
- [**Despliegue Google Apps Script**](./google-apps-script/DEPLOYMENT.md) - Guía de despliegue
- [**Observabilidad**](./OBSERVABILITY.md) - Monitoring, métricas y alertas
- [**Commits Convencionales**](./CONVENTIONAL_COMMITS.md) - Estándares de commits
- [**Contribución**](./.github/CONTRIBUTING.md) - Guía para contribuidores
- [**Instrucciones Copilot**](./.github/copilot-instructions.md) - Configuración del proyecto

## 🔐 Seguridad

> **Aviso**: El sistema incluye funciones de verificación biométrica (voz + iris) que en esta versión son **mocks** para demostración. No apto para producción sin implementación real de seguridad biométrica.

Ver [SECURITY.md](./SECURITY.md) para política de seguridad.

## 📝 Licencia

Este software es propietario y está protegido por patente.
© 2025 Rubén Espinar Rodríguez — Todos los derechos reservados.

## 🎯 Estado del Proyecto

- [x] Motor de recomendaciones (Google Apps Script)
- [x] Interfaz web básica con React
- [x] Sistema de contacto y health checks
- [x] Observabilidad con Sentry y métricas
- [x] Verificación biométrica (mock)
- [x] Sistema de pagos (mock)
- [ ] Integración con APIs de moda reales
- [ ] Dashboard de administración
- [ ] Implementación biométrica de producción
