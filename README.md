<<<<<<< HEAD
# AvBet Biometrics (demo)

API mínima de ejemplo para matrícula y verificación biométrica (voz + iris, **mock**).

## Scripts
- `npm run start` – inicia servidor en `PORT` (por defecto 3000)
- `npm run dev` – inicia con `--watch`
- `npm test` – prueba rápida placeholder

## Endpoints
- `GET /health`
- `POST /enroll` `{ userId, voiceSample, irisTemplate }`
- `POST /verify` `{ userId, voiceSample, irisTemplate }`
- `POST /payments/intent` `{ amount, currency?, metadata? }`

> **Aviso**: Este código es un demo *no apto para producción* y no realiza verificación biométrica real.
=======
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
- [x] Interfaz web básica
- [x] Sistema de contacto
- [ ] Integración con APIs de moda
- [ ] Dashboard de administración
- [ ] Sistema de pagos biométricos
>>>>>>> 64eec70b9cacfa043d4974482c5fa6daed352623
