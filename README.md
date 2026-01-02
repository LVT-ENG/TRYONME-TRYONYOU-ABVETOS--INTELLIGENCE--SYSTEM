# TRYONYOU

**LIVE 'IT – Where beauty lives in movement**

AI-Powered Virtual Try-On Platform built with React, Vite, Tailwind CSS, Framer Motion, and Three.js.

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

## 📁 Project Structure (Consolidated Monolithic Architecture)

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx    # Navigation with mobile menu
│   ├── Footer.jsx    # Site footer with links
│   ├── Avatar3D.jsx  # 3D avatar renderer
│   └── SyncControl.jsx # Asset sync control
├── pages/            # Route pages (10 total)
│   ├── Home.jsx      # Landing page with hero
│   ├── Brands.jsx    # Brand selection & filtering
│   ├── MyAvatar.jsx  # Avatar creation wizard
│   ├── Wardrobe.jsx  # Virtual closet with try-on
│   ├── Showroom.jsx  # Curated looks gallery
│   ├── GlowUp.jsx    # Style transformation
│   ├── AskPeacock.jsx # AI chat assistant
│   ├── Demo.jsx      # Product demonstration
│   ├── Investors.jsx # Investor presentation
│   └── MagicMirror.jsx # Magic mirror experience
├── data/             # JSON data files
│   ├── texts.json    # Content & copy
│   └── mock_inventory.json # Mock product data
├── hooks/            # Custom React hooks
│   └── useScrollPosition.js
├── utils/            # Utility functions
│   └── agents.js     # AI agent integration layer
├── styles/           # Global styles
│   └── index.css     # Tailwind + custom CSS
├── assets/           # Static assets
├── App.jsx           # Router configuration (all routes)
└── main.jsx          # Entry point

public/
├── assets/           # All static assets
│   ├── images/       # Clothing, showroom, glow-up images
│   ├── videos/       # Video files
│   ├── animation/    # Animation files
│   └── logo/         # Brand logos
└── models/           # 3D models for avatar (GLB/GLTF)

core/                 # Python backend agents
├── agent_executor.py # Agent execution engine
├── calibration.py    # Core calibration logic
├── efficiency_engine.py
├── google_ai_bridge.py
└── ai_config/        # Agent configuration
```

## 🎯 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing with features & CTA |
| `/brands` | Brands | Browse & filter fashion brands |
| `/my-avatar` | My Avatar | Create your digital twin |
| `/wardrobe` | Wardrobe | Virtual try-on closet |
| `/showroom` | Showroom | Curated looks by mood/occasion |
| `/glow-up` | Glow-Up | AI style transformation |
| `/ask-peacock` | Ask Peacock | Chat with AI stylist 🦚 |
| `/demo` | Demo | Full product demonstration |
| `/investors` | Investors | Investor presentation |
| `/magic-mirror` | Magic Mirror | Interactive mirror experience |

## 🛠 Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool
- **React Router 6** - Client-side routing
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion 11** - Animations
- **Three.js + @react-three/fiber** - 3D graphics
- **GSAP** - Advanced animations
- **Lucide React** - Icons
- **Python/FastAPI** - Backend (in /core)

## ✨ Features

- 🎨 **Glass morphism UI** with blur effects
- 🌙 **Dark theme** with neon accents
- 📱 **Fully responsive** mobile-first design
- ⚡ **Smooth animations** throughout
- 🔍 **Search & filter** functionality
- 💾 **Favorites/saved items** system
- 🦚 **AI Peacock** chat assistant
- 🎯 **Match percentage** for fit prediction
- 🤖 **AI Agent Integration** for recommendations and fit scoring

## 🎨 Color Palette

```css
--tryonyou-blue: #00A8E8
--tryonyou-darkblue: #003459
--tryonyou-gold: #D4AF37
--tryonyou-metallic: #8B92A0
--tryonyou-black: #0A0A0A
--tryonyou-smoke: #1A1A2E
```

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
- **Vercel** (Recommended): Framework preset: Vite, Build command: `npm run build`, Output: `dist`
- **Netlify**: Build command: `npm run build`, Publish directory: `dist`
- **Railway**: Build command: `npm run build`, Output: `dist`
- **AWS S3/CloudFront**: Upload `dist/` folder

### Pre-Deployment Checklist
- ✅ All assets added to `/public/`
- ✅ Build completes without errors (`npm run build`)
- ✅ Assets appear in `/dist/assets/` and `/dist/models/`
- ✅ Test navigation on all pages
- ✅ Verify 3D avatar loads (or uses procedural fallback)
- ✅ Check all images load correctly
- ✅ Test on mobile devices

## 🔐 Security

This application includes production-ready security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📄 License

Private - TRYONYOU © 2025
