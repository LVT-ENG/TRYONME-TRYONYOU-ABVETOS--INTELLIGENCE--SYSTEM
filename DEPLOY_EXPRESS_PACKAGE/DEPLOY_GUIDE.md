# 🚀 TRYONYOU Deploy Express Guide

## Package Contents

```
DEPLOY_EXPRESS_PACKAGE/
├── main-build/              # Production build (ready to deploy)
├── modules/
│   ├── PAU/                # Emotional Avatar System
│   ├── CAP/                # Creation & Production System
│   └── FTT/                # Fashion Try-On Technology (placeholder)
├── docs/                   # Documentation
├── scripts/                # Deployment scripts
└── DEPLOY_GUIDE.md         # This file
```

## Quick Deploy

### Option 1: Vercel (Recommended)

```bash
cd main-build
vercel --prod --token YOUR_TOKEN
```

### Option 2: Manual Deploy

1. Upload `main-build/` contents to your hosting
2. Configure your domain to point to the uploaded directory
3. Ensure HTTPS is enabled

## Module Integration

### PAU Module

```javascript
import { PAUAvatar, EmotionDetector } from './modules/PAU/dist-pau/pau.es.js'
```

### CAP Module

```javascript
import { PatternGenerator, FabricSimulator } from './modules/CAP/dist-cap/cap.es.js'
```

## Environment Variables

Required for production:

```env
VERCEL_TOKEN=your_token_here
VITE_API_URL=https://api.tryonyou.app
VITE_ENVIRONMENT=production
```

## Support

For issues or questions:
- Email: support@tryonyou.app
- Docs: https://docs.tryonyou.app

---

**TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM**
*Fashion Intelligence Platform*
