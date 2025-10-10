# TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM

> 🚀 **Proyecto Maestro Unificado** - Sistema de Inteligencia de Moda Digital

[![Deploy Status](https://img.shields.io/badge/deploy-automated-success)](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions)
[![Vercel](https://img.shields.io/badge/vercel-deployed-black)](https://tryonyou.app)
[![Vite](https://img.shields.io/badge/vite-7.1.2-646CFF)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-18.3.1-61DAFB)](https://react.dev/)

## 🌐 Dominios Oficiales

- **Principal**: [tryonyou.app](https://tryonyou.app)
- **Alternativo**: [tryonme.com](https://tryonme.com)

## 📋 Descripción

TRYONYOU es la plataforma de inteligencia de moda digital más avanzada del mercado, fusionando experiencia interactiva, sostenibilidad y tecnología de vanguardia. Nuestro ecosistema conecta armarios inteligentes, pagos seguros ABVET, y actualizaciones en tiempo real con el Fashion Trend Tracker (FTT).

### Módulos Principales

- **🎭 Avatar 3D**: Prueba virtual de prendas con tecnología de renderizado avanzado
- **👔 Wardrobe Manager**: Gestión inteligente de armario digital
- **💰 ABVET Payment System**: Sistema de pagos seguros y descentralizados
- **📊 PAU (Personal Analytics Unit)**: Analítica personal de estilo y preferencias
- **🎯 CAP (Capsule)**: Colecciones cápsula personalizadas
- **📈 FTT (Fashion Trend Tracker)**: Seguimiento de tendencias en tiempo real
- **🤖 Deploy Express**: Sistema de despliegue automatizado
- **💝 AutoDonate**: Donación automática de prendas no utilizadas

## 🏗️ Estructura del Proyecto

```
TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM/
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD automático con Vercel
├── docs/                        # Documentación completa
│   ├── arquitectura.md
│   ├── casos_uso.md
│   └── legal/
├── public/                      # Assets estáticos
│   ├── assets/
│   ├── capsules/
│   └── pau-demo.html
├── src/                         # Código fuente
│   ├── components/              # Componentes React
│   ├── modules/                 # Módulos funcionales
│   ├── i18n/                    # Internacionalización
│   ├── App.jsx                  # Componente principal
│   └── main.jsx                 # Punto de entrada
├── scripts/                     # Scripts de utilidad
├── .env.example                 # Variables de entorno
├── package.json                 # Dependencias
├── vite.config.js               # Configuración Vite
├── vercel.json                  # Configuración Vercel
└── README.md                    # Este archivo
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 22.x o superior
- npm o pnpm
- Cuenta en Vercel (para deploy)

### Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build de Producción

```bash
# Generar build optimizado
npm run build

# Preview del build
npm run preview
```

## 🔄 CI/CD Automático

El proyecto está configurado con GitHub Actions para despliegue automático en Vercel.

### Configuración de Secrets

1. Ve a [GitHub Secrets](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/settings/secrets/actions)
2. Configura los siguientes secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_PROJECT_ID`
   - `VERCEL_TEAM_ID`
   - `TELEGRAM_BOT_TOKEN` (opcional)
   - `TELEGRAM_CHAT_ID` (opcional)

Ver [GITHUB_SECRETS_SETUP_COMPLETE.md](./GITHUB_SECRETS_SETUP_COMPLETE.md) para instrucciones detalladas.

### Flujo de Deploy

1. **Push a `main`** → Activa workflow automático
2. **Build** → Compila el proyecto
3. **Deploy** → Despliega a Vercel
4. **Notificación** → Envía mensaje a Telegram con URL y detalles

## 📦 Tecnologías

- **Frontend**: React 18.3.1, Vite 7.1.2
- **Routing**: React Router DOM 6.26.0
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Version Control**: Git + GitHub
- **Package Manager**: npm

## 🌍 Internacionalización

El proyecto soporta múltiples idiomas:
- 🇪🇸 Español
- 🇬🇧 English
- 🇫🇷 Français

## 📄 Documentación

- [Arquitectura del Sistema](./docs/arquitectura.md)
- [Casos de Uso](./docs/casos_uso.md)
- [Flujo de Usuario](./docs/flujo_usuario.md)
- [Roadmap 2025-2028](./docs/roadmap_2025-2028.md)
- [Configuración de Vercel](./VERCEL_DOMAIN_SETUP.md)
- [Instrucciones de Deploy](./DEPLOY_INSTRUCTIONS.md)

## 🤝 Contribución

Este es un proyecto privado de LVT-ENG. Para contribuir:

1. Crea una rama desde `main`
2. Realiza tus cambios
3. Crea un Pull Request
4. Espera revisión y aprobación

## 📊 Valoración

**Valoración estimada**: €120M - €400M

Ver [Dossier Inversor](./docs/investor-dossier.pdf) para más detalles.

## 📞 Contacto

- **Organización**: LVT-ENG
- **Proyecto**: TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
- **Bot de Deploy**: @abvet_deploy_bot (Telegram)

## 📝 Licencia

Propietario: LVT-ENG. Todos los derechos reservados.

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0
**Estado**: ✅ Producción
