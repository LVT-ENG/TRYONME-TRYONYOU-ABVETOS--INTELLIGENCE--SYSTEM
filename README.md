# TRYONYOU

**LIVE 'IT – Where beauty lives in movement**

Unified AI-Powered Fashion Intelligence Platform combining virtual try-on, emotional styling, and advanced biometric systems. Built with React, Vite, Tailwind CSS, Framer Motion, and Three.js.

## 🎯 Platform Overview

TRYONYOU is a comprehensive fashion intelligence ecosystem integrating:
- **Consumer Platform**: Virtual try-on, AI styling, and personalized recommendations
- **Technical Systems**: Biometric measurement, automated production, and secure payments
- **53 AI Agents**: Specialized intelligence for coordinated fashion operations

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Platform Features

### Consumer Experience (B2C)
- 🎨 **Virtual Try-On** - 3D avatar with real-time clothing visualization
- 👔 **Smart Wardrobe** - AI-powered outfit recommendations
- ✨ **Showroom** - Curated looks by mood and occasion
- 🦚 **Ask Peacock** - AI stylist chat assistant
- 💫 **Glow-Up** - Before/after style transformations

### Technical Systems (B2B/Patent)
- 📏 **FIT Intelligence** - Sub-millimeter biometric measurement
- 🏭 **CAP System** - Computer-Aided Production & automated manufacturing
- 🔐 **ABVET** - Advanced Biometric Verification & Encrypted Transactions
- 📜 **Patent Claims** - PCT/EP2025/067317 protection

### AI Agent System
- 🤖 **53 Specialized AI Agents** working in coordination
- 🎯 **Intent-based routing** for intelligent task delegation
- ⚡ **Real-time processing** for fit scores and recommendations

## 🗺️ Pages & Routes

| Route | Page | Category | Description |
|-------|------|----------|-------------|
| `/` | Home | Consumer | Landing with features & CTA |
| `/demo` | Demo | Consumer | Interactive try-on demonstration |
| `/brands` | Brands | Consumer | Browse & filter fashion brands |
| `/my-avatar` | My Avatar | Consumer | Create your digital twin |
| `/wardrobe` | Wardrobe | Consumer | Virtual try-on closet |
| `/showroom` | Showroom | Consumer | Curated looks by mood/occasion |
| `/glow-up` | Glow-Up | Consumer | AI style transformation |
| `/ask-peacock` | Ask Peacock | Consumer | Chat with AI stylist 🦚 |
| `/fit` | FIT | Technical | Biometric measurement & physics |
| `/cap` | CAP | Technical | Automated production system |
| `/abvet` | ABVET | Technical | Biometric payment authentication |
| `/claims` | Claims | Technical | Patent claims & IP protection |

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx    # Navigation with all routes
│   ├── Footer.jsx    # Site footer with links
│   └── Avatar3D.jsx  # 3D avatar component
├── pages/            # Route pages (14 total)
│   ├── Home.jsx      # Landing page with hero
│   ├── Demo.jsx      # Interactive try-on demo
│   ├── Brands.jsx    # Brand selection & filtering
│   ├── MyAvatar.jsx  # Avatar creation wizard
│   ├── Wardrobe.jsx  # Virtual closet with try-on
│   ├── Showroom.jsx  # Curated looks gallery
│   ├── GlowUp.jsx    # Style transformation
│   ├── AskPeacock.jsx # AI chat assistant
│   ├── Fit.jsx       # FIT Intelligence (Technical)
│   ├── CAP.jsx       # Automated Production (Technical)
│   ├── ABVET.jsx     # Biometric Payment (Technical)
│   └── Claims.jsx    # Patent Claims (Technical)
├── agents/           # AI Agent System
│   └── index.js      # Agent router & coordination
├── data/             # JSON data files
│   └── texts.json    # Content & copy
├── hooks/            # Custom React hooks
│   └── useScrollPosition.js
├── styles/           # Global styles
│   └── index.css     # Tailwind + custom CSS
├── App.jsx           # Router configuration (all routes)
└── main.jsx          # Entry point

public/
├── assets/           # All static assets
│   ├── images/       # Clothing, showroom, glow-up images
│   ├── videos/       # Video files
│   ├── animation/    # Animation files
│   └── logo/         # Brand logos
├── models/           # 3D models for avatar (GLB/GLTF)
└── favicon.svg       # Site favicon
```

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite 5** - Build tool & dev server
- **React Router 6** - Client-side routing
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion 11** - Animations
- **Three.js + @react-three/fiber** - 3D graphics
- **GSAP** - Advanced animations
- **Lucide React** - Icons

### Backend/AI
- **53 AI Agents** - Specialized intelligence
- **Python Backend** - Core systems
- **Biometric APIs** - Measurement systems
- **Physics Engine** - Fabric simulation

## ✨ Key Features

### UI/UX
- 🎨 **Glass morphism UI** with blur effects
- 🌙 **Dark theme** with neon accents
- 📱 **Fully responsive** mobile-first design
- ⚡ **Smooth animations** throughout
- 🔍 **Search & filter** functionality
- 💾 **Favorites/saved items** system

### Intelligence
- 🦚 **AI Peacock** chat assistant
- 🎯 **Match percentage** for fit prediction
- 🤖 **Agent orchestration** for coordinated operations
- 📏 **Biometric measurement** with sub-millimeter accuracy
- 🔐 **Multi-factor biometric** authentication

## 🎨 Color Palette

### Official Peacock Blue & Gold Palette

**Peacock Blue Spectrum:**
```css
--peacock-50: #E0F7FF   /* Lightest */
--peacock-100: #B8EEFF
--peacock-200: #8BE4FF
--peacock-300: #5DD9FF
--peacock-400: #2ECEFF
--peacock-500: #00A8E8  /* Primary Peacock Blue */
--peacock-600: #0088C4
--peacock-700: #006BA0
--peacock-800: #004F7C
--peacock-900: #003459  /* Deep Peacock Blue */
```

**Gold Spectrum:**
```css
--gold-50: #FFF9E6     /* Lightest */
--gold-100: #FFF0C2
--gold-200: #FFE699
--gold-300: #FFDD70
--gold-400: #FFD447
--gold-500: #D4AF37    /* Primary Gold */
--gold-600: #B8962F
--gold-700: #9C7D27
--gold-800: #80641F
--gold-900: #644B17    /* Deep Gold */
```

**Legacy Colors (Still Available):**
```css
--tryonyou-blue: #00A8E8
--tryonyou-darkblue: #003459
--tryonyou-gold: #D4AF37
--tryonyou-metallic: #8B92A0
--tryonyou-black: #0A0A0A
--tryonyou-smoke: #1A1A2E
```

### Luxury Effects
- **Glassmorphism**: Premium glass effects with backdrop blur
- **Glow Effects**: Peacock blue and gold glow shadows
- **Luxury Transitions**: Smooth, refined animations (300-500ms)
- **Premium Shadows**: Multi-layered shadows with color accents

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

## 📦 Adding Your Assets

**IMPORTANT:** Before deploying, add your real assets to `/public/`:

1. **Images**: Place in `/public/assets/images/`
   - Wardrobe items (clothing images)
   - Showroom looks
   - Glow-up before/after photos
   - Brand logos in `/public/assets/logo/`

2. **3D Models**: Place in `/public/models/`
   - Avatar model: `avatar.glb` or `avatar.gltf`

3. **Videos**: Place in `/public/assets/videos/`

See `ASSETS_GUIDE.md` for detailed asset requirements and naming conventions.

## 🚀 Deployment

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
├── assets/          # All public assets (automatically copied)
├── models/          # 3D models (automatically copied)
└── index.html       # Entry point
```

### Deployment Platforms
- **Vercel** ⭐ (Primary): Framework preset: Vite, Build command: `npm run build`, Output: `dist`
- **Netlify**: Build command: `npm run build`, Publish directory: `dist`
- **Railway**: Build command: `npm run build`, Output: `dist`
- **AWS S3/CloudFront**: Upload `dist/` folder

### Quick Deploy Script
```bash
./deploy.sh
```

This script will:
1. Install dependencies
2. Build the application
3. Commit changes
4. Push to GitHub
5. Deploy to Vercel

### Pre-Deployment Checklist
- ✅ Platform fusion complete
- ✅ All 12 routes accessible
- ✅ Build completes without errors (`npm run build`)
- ✅ Assets appear in `/dist/assets/` and `/dist/models/`
- ✅ Test navigation on all pages
- ✅ Verify 3D avatar loads (or uses procedural fallback)
- ✅ Check all images load correctly
- ✅ Test on mobile devices

## 📚 Documentation

- `FUSION_COMPLETE.md` - Details about platform fusion
- `DEPLOYMENT_CHECKLIST.md` - Comprehensive deployment guide
- `ASSETS_GUIDE.md` - Asset requirements and naming conventions
- `DEMO_READY.md` - Demo preparation guide
- `docs/GOOGLE_PLATFORM_NEWS.md` - Google Platform integration news (Nov/Dec 2025)

## 🔒 Patent Protection

**Patent Pending**: PCT/EP2025/067317
- Emotional Fashion Intelligence System
- Biometric Measurement Technology
- Automated Production Methods
- Multi-Factor Authentication System

## 📄 License

Private - TRYONYOU © 2025

---

**Build Status**: ✅ Fusion Complete | 🚀 Ready to Deploy

For detailed fusion information, see `FUSION_COMPLETE.md`
