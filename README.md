# 🦚 TRYONYOU - Lafayette Pilot System

**TRYONYOU–ABVETOS–ULTIMATUM** - Sistema de prueba virtual inteligente para Galeries Lafayette.

## 🌟 What's New in V9.0

We are thrilled to announce **TryOnYou Ultra V9.0**, powered by Google's latest AI technologies!

- **🚀 Powered by Gemini 2.0 Flash**: Real-time style narratives with < 500ms response time.
- **🤖 Agent 70**: Advanced style intelligence engine for hyper-personalized recommendations.
- **🔒 Privacy-First with MediaPipe**: Biometric data processed entirely on your device.

See the full release notes:
- [English (NEWS.md)](./NEWS.md)
- [Español (NEWS_ES.md)](./NEWS_ES.md)
- [Français (NEWS_FR.md)](./NEWS_FR.md)

## 🚀 Quick Start

### Deployment
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete deployment instructions.

### Validation
After deployment, use [LAFAYETTE_VALIDATION_GUIDE.md](./LAFAYETTE_VALIDATION_GUIDE.md) to validate the production deployment.

### Environment Variables
Copy `.env.template` to `.env.local` and configure the required variables:
- `VITE_GOOGLE_API_KEY` - Google Gemini API for biometric analysis (REQUIRED)
- `VITE_PILOT_MODE` - Set to `LAFAYETTE_ACTIVE` for Lafayette branding
- `VITE_PORKBUN_API` - For domain management (optional)

## 🎨 Key Features

- ✨ **Biometric Analysis**: AI-powered fashion recommendations
- 🎯 **Zero Tallas**: Size-free fashion philosophy
- 🏛️ **Lafayette Integration**: Branded experience for Galeries Lafayette pilot
- 🦚 **Pau Agent**: Interactive mascot guide

## 🛠️ Development

```bash
npm install
npm run dev
```

## 📦 Build

```bash
npm run build
npm run preview
```

## 📋 Technical Stack

- React 19.1.1
- Vite 7.3.1
- TypeScript
- Tailwind CSS
- Google Gemini 2.0 Flash
- Google MediaPipe

---

## Validation History
Last Validated: Fri Feb 20 23:04:28 UTC 2026
