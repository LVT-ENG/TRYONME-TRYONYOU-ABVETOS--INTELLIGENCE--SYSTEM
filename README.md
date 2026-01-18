# TRYONYOU - PROYECTO PILOTO DIVINEO V7

## Entrega Confidencial para Galeries Lafayette

---

## 🎯 Descripción del Proyecto

**TRYONYOU** es un sistema de inteligencia artificial avanzado diseñado exclusivamente para **Galeries Lafayette**, que revoluciona la experiencia de compra mediante tecnología de captura biométrica y prueba virtual de productos. Este proyecto piloto representa la convergencia entre alta costura y tecnología de vanguardia.

El sistema permite a los clientes:
- **Captura biométrica en tiempo real** utilizando MediaPipe Pose
- **Prueba virtual de prendas** con renderizado 3D
- **Experiencia inmersiva** con interfaz de usuario de lujo
- **Análisis de tallas personalizado** basado en biometría
- **Checkout integrado** con experiencia optimizada

## 🚀 Características Principales

### Tecnología Biométrica
- Escaneo corporal en tiempo real con MediaPipe
- Detección de poses y medidas precisas
- Análisis de proporciones para recomendaciones de tallas
- Captura de puntos clave anatómicos

### Interfaz de Usuario
- **Diseño Futurismo de Alta Costura**: Elegancia tecnológica fusionada con la sofisticación clásica
- **Tema oscuro premium** con identidad visual de Galeries Lafayette
- **Animaciones fluidas** con Framer Motion
- **Componentes UI modernos** basados en Radix UI
- **Responsive design** optimizado para múltiples dispositivos

### Funcionalidades Core
- 🏠 **Home**: Página de bienvenida con presentación inmersiva
- 📸 **BiometricCapture**: Captura y análisis biométrico del usuario
- 👔 **Wardrobe**: Armario virtual con pruebas de prendas en tiempo real
- 🛒 **Checkout**: Proceso de compra optimizado
- 🤖 **PauAgent**: Asistente inteligente personalizado

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2** con TypeScript
- **Vite** como build tool
- **Tailwind CSS 4** para estilos
- **Framer Motion** para animaciones
- **Three.js** y React Three Fiber para renderizado 3D
- **Wouter** para enrutamiento

### Librerías de UI
- **Radix UI** - Componentes accesibles y personalizables
- **Lucide React** - Iconografía moderna
- **Recharts** - Visualización de datos
- **Sonner** - Notificaciones toast elegantes

### IA y Computer Vision
- **@mediapipe/pose** - Detección de poses corporales
- **@mediapipe/tasks-vision** - Procesamiento de visión por computadora

### Backend
- **Express** - Servidor Node.js
- **Sharp** - Procesamiento de imágenes
- **Axios** - Cliente HTTP

## 📦 Instalación

### Requisitos Previos
- Node.js 18 o superior
- pnpm 10.4.1 o superior (recomendado)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env con las configuraciones necesarias
cp .env.example .env
```

4. **Iniciar el servidor de desarrollo**
```bash
pnpm dev
```

El servidor estará disponible en `http://localhost:5173`

## 🚀 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia el servidor de desarrollo con host

# Construcción
pnpm build        # Construye la aplicación para producción

# Producción
pnpm start        # Inicia el servidor en modo producción

# Vista previa
pnpm preview      # Vista previa de la build de producción

# Verificación
pnpm check        # Verifica tipos de TypeScript

# Formateo
pnpm format       # Formatea el código con Prettier
```

## 📁 Estructura del Proyecto

```
.
├── src/                      # Código fuente principal
├── App.tsx                   # Componente principal de la aplicación
├── Home.tsx                  # Página de inicio
├── BiometricCapture.tsx      # Módulo de captura biométrica
├── Wardrobe.tsx              # Armario virtual
├── Checkout.tsx              # Proceso de checkout
├── PauAgent.tsx              # Asistente inteligente
├── ThemeContext.tsx          # Contexto de tema
├── ErrorBoundary.tsx         # Manejo de errores
├── components/               # Componentes UI reutilizables
├── documentos/               # Documentación y recursos
├── media_demo/               # Assets multimedia
├── codigo_backend/           # Backend del sistema
├── package.json              # Dependencias del proyecto
├── vite.config.ts            # Configuración de Vite
└── tsconfig.json             # Configuración de TypeScript
```

## 🎨 Filosofía de Diseño

El proyecto sigue el paradigma de **Futurismo de Alta Costura**, combinando:

### Principios Core
1. **Elegancia Tecnológica**: Fusión de sofisticación clásica con innovación IA
2. **Fluidez Digital**: Transiciones orgánicas que imitan el movimiento de tela y luz
3. **Minimalismo de Lujo**: Espacios amplios, tipografía refinada
4. **Inmersión Sensorial**: Efectos visuales que crean atmósfera envolvente

### Paleta de Colores
- **Base**: Negro profundo (#0a0a0a) y Blanco puro (#ffffff)
- **Acento**: Lafayette Red (#E2001A) interpretado como neón sutil
- **Secundario**: Plata metálica y gris pizarra

## 🔒 Seguridad y Privacidad

- Datos biométricos procesados localmente
- Cumplimiento con GDPR y regulaciones de privacidad
- Encriptación de datos sensibles
- Sin almacenamiento permanente de imágenes sin consentimiento

## 🤝 Colaboración

Este es un proyecto confidencial desarrollado específicamente para **Galeries Lafayette**. 

### Documentación Adicional
Para más información sobre el diseño y arquitectura del sistema, consultar:
- 📄 `/documentos/ideas.md` - Brainstorming de diseño
- 📄 `/documentos/consolidated_patent.pdf` - Documentación de patente

## 📞 Contacto

**Proyecto**: TRYONYOU - DIVINEO V7  
**Cliente**: Galeries Lafayette  
**Estado**: Proyecto Piloto

---

## 🔗 Referencias

- [Documentación del Proyecto en Google AI Studio](https://g.co/gemini/share/fb794c048c3c)

---

## 📝 Notas de Versión

### v7.0.0 - Proyecto Piloto
- ✨ Implementación inicial del sistema biométrico
- 🎨 Interfaz de usuario de lujo personalizada
- 🤖 Integración de MediaPipe para análisis corporal
- 👔 Sistema de prueba virtual de prendas
- 🛒 Checkout optimizado
- 🌐 Aplicación web responsive

---

**© 2026 TRYONYOU - Todos los derechos reservados**  
*Proyecto Confidencial - Galeries Lafayette*
