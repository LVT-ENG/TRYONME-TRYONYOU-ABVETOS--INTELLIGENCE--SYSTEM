# TryOnMe / TryOnYou - AVBETOS Intelligence System

**Sistema de inteligencia avanzada patentado para recomendaciones de moda y análisis de preferencias**

> 🔬 **Proyecto de investigación e innovación** - Sistema propietario protegido por patente internacional

## 📖 Descripción del Proyecto

TryOnMe/TryOnYou es un sistema de inteligencia artificial avanzado que combina análisis biométrico, preferencias personales y tendencias de moda para ofrecer recomendaciones de vestuario personalizadas. El sistema utiliza tecnología patentada AVBETOS para crear experiencias de compra digitales inmersivas.

### 🎯 Características Principales

- **Motor de Recomendaciones IA**: Algoritmo propietario que combina gustos personales, medidas corporales y tendencias globales
- **Interfaz Web Interactiva**: Aplicación React con experiencia de usuario premium
- **Sistema Biométrico**: Integración con tecnologías de reconocimiento (desarrollo)
- **Prototipo Funcional**: Implementación en Google Apps Script para validación rápida
- **Arquitectura Escalable**: Diseño modular preparado para producción

## 🚀 Requisitos Previos

### Software Necesario

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 
- **Git** >= 2.34.0
- **Navegador web moderno** (Chrome, Firefox, Safari, Edge)

### Cuentas de Servicio

- **Cuenta de Google** (para Google Apps Script)
- **Cuenta de Vercel** (para despliegue web, opcional)

### Herramientas de Desarrollo (Opcional)

- **Visual Studio Code** con extensiones de React/JavaScript
- **Google Apps Script Editor** para el motor de recomendaciones

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita las variables necesarias
# Nota: Las claves API no están incluidas por seguridad
```

## 🏃‍♂️ Ejecución en Entorno Local

### Desarrollo con Vite

```bash
# Iniciar servidor de desarrollo
npm run dev

# El servidor estará disponible en http://localhost:5173
```

### Build de Producción

```bash
# Generar build optimizado
npm run build

# Previsualizar build de producción
npm run preview
```

### Verificar Commits (Desarrollo)

```bash
# Validar formato de commits
npm run lint:commits
```

## 📁 Estructura del Proyecto

```
├── 📂 google-apps-script/          # Motor de recomendaciones (Google Apps Script)
│   ├── 📄 motor.gs                 # Función principal initTryOnMe()
│   ├── 📄 helpers.gs               # Funciones auxiliares del algoritmo
│   ├── 📄 utils.gs                 # Utilidades de mantenimiento
│   ├── 📄 appsscript.json         # Configuración del proyecto Apps Script
│   └── 📄 DEPLOYMENT.md           # Guía de despliegue detallada
├── 📂 src/                        # Código fuente React
│   ├── 📄 App.jsx                  # Componente principal de la aplicación
│   ├── 📄 main.jsx                 # Punto de entrada React
│   ├── 📄 index.css                # Estilos globales
│   └── 📄 styles.css               # Estilos específicos
├── 📂 dist/                       # Build de producción (generado)
├── 📂 docs/                       # Documentación del proyecto
├── 📂 .github/                    # Configuración de GitHub
│   ├── 📄 copilot-instructions.md  # Guías para GitHub Copilot
│   └── 📂 workflows/               # GitHub Actions
├── 📄 index.html                  # Página principal
├── 📄 mailer.php                  # Sistema de contacto por email
├── 📄 package.json                # Configuración npm y dependencias
├── 📄 vite.config.js              # Configuración de Vite
├── 📄 vercel.json                 # Configuración de despliegue Vercel
└── 📄 README.md                   # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **[React 18](https://react.dev/)** - Biblioteca de interfaces de usuario
- **[Vite](https://vitejs.dev/)** - Herramienta de build y desarrollo
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones y transiciones

### Backend y Servicios
- **[Google Apps Script](https://script.google.com/)** - Motor de recomendaciones
- **PHP** - Sistema de contacto por email
- **[Vercel](https://vercel.com/)** - Plataforma de despliegue

### Herramientas de Desarrollo
- **[Commitlint](https://commitlint.js.org/)** - Validación de commits convencionales
- **[Vercel Analytics](https://vercel.com/analytics)** - Análisis de rendimiento

### Integración IA
- **AVBETOS** - Sistema propietario de inteligencia artificial (patentado)

## 🚀 Componentes del Sistema

### 1. 📊 Motor de Recomendaciones (Google Apps Script)

Sistema central implementado en Google Sheets para prototipado rápido y validación.

**Funcionalidades**:
- Algoritmo de matching inteligente
- Catálogos de validación configurables
- Interfaz de administración en hojas de cálculo
- Generación automática de recomendaciones

**Inicio Rápido**:
1. Ve a [script.google.com](https://script.google.com)
2. Crea un nuevo proyecto
3. Importa los archivos de `/google-apps-script/`
4. Ejecuta `initTryOnMe()`

📖 [Ver guía completa de despliegue](./google-apps-script/DEPLOYMENT.md)

### 2. 🌐 Interfaz Web React

Aplicación web moderna con experiencia de usuario premium.

**Características**:
- Diseño responsivo y moderno
- Animaciones fluidas con Framer Motion
- Integración con analytics
- Formulario de contacto funcional

### 3. 📧 Sistema de Contacto

Backend PHP para gestión de formularios de contacto.

**Archivo**: `mailer.php`
**Funcionalidad**: Envío de emails desde el formulario web

## 🤝 Cómo Contribuir

### 1. Fork y Clonar

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/TU-USUARIO/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
```

### 2. Crear Rama de Feature

```bash
git checkout -b feature/nueva-funcionalidad
```

### 3. Hacer Cambios

- Sigue las [guías de estilo del proyecto](.github/copilot-instructions.md)
- Usa commits convencionales
- Añade tests si es necesario
- Actualiza documentación

### 4. Enviar Pull Request

```bash
git push origin feature/nueva-funcionalidad
# Crea PR en GitHub
```

### 📋 Estándares de Código

- **JavaScript/React**: ES6+, JSDoc para funciones
- **Google Apps Script**: Buenas prácticas de Apps Script
- **PHP**: Estándares PSR-12
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/)

## 📚 Documentación Adicional

- 📄 [Guía de Despliegue Google Apps Script](./google-apps-script/DEPLOYMENT.md)
- 📄 [Instrucciones para GitHub Copilot](.github/copilot-instructions.md)
- 📄 [Commits Convencionales](./CONVENTIONAL_COMMITS.md)
- 📄 [Configuración de Observabilidad](./OBSERVABILITY.md)
- 📄 [Guía de Seguridad](./SECURITY.md)

## 📞 Soporte y Contacto

- **Issues**: [GitHub Issues](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues)
- **Documentación**: Archivo local en `/docs/`
- **Email**: A través del formulario web en la aplicación

## ⚖️ Licencia y Propiedad Intelectual

**⚠️ IMPORTANTE**: Este software es propietario y está protegido por patente internacional.

```
© 2025 Rubén Espinar Rodríguez
Todos los derechos reservados.

Sistema AVBETOS protegido por patente.
Uso no autorizado prohibido.
```

## 🎯 Estado del Proyecto

### ✅ Completado
- [x] Motor de recomendaciones (Google Apps Script)
- [x] Interfaz web React con Vite
- [x] Sistema de contacto por email
- [x] Configuración de despliegue Vercel
- [x] Documentación base del proyecto

### 🔄 En Desarrollo
- [ ] Integración con APIs de moda externas
- [ ] Dashboard de administración avanzado
- [ ] Sistema de pagos biométricos
- [ ] Tests automatizados
- [ ] Optimización de rendimiento

### 🔮 Roadmap Futuro
- [ ] Aplicación móvil nativa
- [ ] Integración con realidad aumentada
- [ ] Machine Learning avanzado
- [ ] Marketplace de marcas
- [ ] Sistema de analytics avanzado

---

**🚀 ¡Bienvenido al futuro de las recomendaciones de moda inteligentes!**