# 🦚 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM

**Master README — Clean Architecture, Build & Deployment Guide**

---

## 📌 1. Project Overview

**TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM** is a comprehensive platform for virtual fitting, intelligent recommendations, 3D showroom, and premium interactive experiences.

This repository contains:
- **React 18 + Vite 5** SPA (Single Page Application)
- **3D Avatar Module** (Three.js / React-Three-Fiber)
- **Virtual Wardrobe** with real-time try-on
- **Showroom + Brands** curated catalog
- **Recommender Engine** (AI-powered style assistant - Pau le Paon 🦚)
- **ABVETOS / DeployExpress** deployment system
- **Vercel integration** with `tryonyou.app` domain

This README defines the clean architecture that developers must implement and maintain.

---

## 📂 2. Clean Folder Structure

All developers must work with this structure:

```
TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/
│
├── LICENSE
├── README.md                    # This master guide
├── .gitignore
├── package.json                 # Dependencies & scripts
├── package-lock.json
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS config
├── postcss.config.js            # PostCSS config
├── vercel.json                  # Vercel deployment config
├── index.html                   # HTML entry point
│
├── src/                         # Source code
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Router configuration
│   │
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.jsx           # Navigation with mobile menu
│   │   ├── Footer.jsx           # Site footer
│   │   ├── Avatar3D.jsx         # 3D avatar viewer
│   │   └── demo/                # Demo components
│   │
│   ├── pages/                   # Page components (routes)
│   │   ├── Home.jsx             # Landing page with hero
│   │   ├── Brands.jsx           # Brand selection & filtering
│   │   ├── MyAvatar.jsx         # Avatar creation wizard
│   │   ├── Wardrobe.jsx         # Virtual closet with try-on
│   │   ├── Showroom.jsx         # Curated looks gallery
│   │   ├── GlowUp.jsx           # Style transformation
│   │   ├── AskPeacock.jsx       # AI chat assistant (Pau 🦚)
│   │   ├── LafayetteDemo.jsx    # Lafayette demonstration
│   │   ├── IntelligentSystem.jsx # System intelligence page
│   │   ├── Demo.jsx             # Demo page
│   │   └── LookSheetPage.jsx    # Look sheet details
│   │
│   ├── context/                 # React context providers
│   │   └── ThemeContext.jsx     # Theme management
│   │
│   ├── hooks/                   # Custom React hooks
│   │   └── useScrollPosition.js # Scroll tracking
│   │
│   ├── data/                    # Static data & content
│   │   └── texts.json           # UI copy & translations
│   │
│   ├── utils/                   # Utility functions
│   │   └── apiClient.js         # API client (Shopify, Amazon, etc.)
│   │
│   ├── styles/                  # Global styles
│   │   └── index.css            # Tailwind + custom CSS
│   │
│   └── assets/                  # Source assets (if any)
│       ├── images/
│       ├── videos/
│       └── 3d/
│
├── public/                      # Static assets (served as-is)
│   ├── assets/
│   │   ├── images/              # Product images, showroom, glow-up
│   │   ├── videos/              # Video files
│   │   ├── animation/           # Animation files
│   │   └── logo/                # Brand logos
│   ├── models/                  # 3D models (GLB/GLTF)
│   ├── hero/                    # Hero section assets
│   └── favicon.svg              # Site favicon
│
├── demo/                        # Demo files & presentations
│   ├── landing/
│   ├── pdf/
│   └── docs/
│
├── docs/                        # Documentation
│   ├── ASSETS_GUIDE.md          # Asset requirements & naming
│   ├── DEPLOYMENT_CHECKLIST.md  # Pre-deployment checklist
│   ├── DEMO_READY.md            # Demo preparation guide
│   └── arquitectura.md          # System architecture
│
├── tests/                       # Tests (unit & integration)
│   ├── testAvatar3D.js
│   ├── testPagoAVBET.js
│   └── testAutoDonate.js
│
└── dist/                        # Production build output (generated)
    ├── assets/
    ├── models/
    └── index.html
```

---

## 🎯 3. Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home.jsx | Landing page with hero section & CTAs |
| `/brands` | Brands.jsx | Browse & filter fashion brands |
| `/my-avatar` | MyAvatar.jsx | Create your digital twin (3D avatar) |
| `/avatar` | MyAvatar.jsx | Alias for `/my-avatar` |
| `/wardrobe` | Wardrobe.jsx | Virtual closet with real-time try-on |
| `/showroom` | Showroom.jsx | Curated looks by mood/occasion |
| `/glow-up` | GlowUp.jsx | AI style transformation |
| `/ask-peacock` | AskPeacock.jsx | Chat with AI stylist (Pau 🦚) |
| `/lafayette-demo` | LafayetteDemo.jsx | Lafayette demonstration |
| `/intelligent-system` | IntelligentSystem.jsx | System intelligence overview |
| `/demo` | Demo.jsx | Demo showcase |
| `/look` | LookSheetPage.jsx | Individual look details |

---

## 🛠 4. Tech Stack

### Frontend Framework
- **React 18.3.1** - UI library
- **Vite 5.4.11** - Next-generation build tool
- **React Router 7.0.1** - Client-side routing

### Styling & Animation
- **Tailwind CSS 3.4.15** - Utility-first CSS framework
- **Framer Motion 11.11.17** - Production-ready animations
- **GSAP 3.12.5** - Advanced animation engine
- **PostCSS 8.4.49** - CSS transformations

### 3D Graphics
- **Three.js 0.170.0** - 3D rendering engine
- **@react-three/fiber 8.17.10** - React renderer for Three.js
- **@react-three/drei 9.117.3** - Useful helpers for R3F

### Icons & UI
- **Lucide React 0.460.0** - Icon library

### Development Tools
- **@vitejs/plugin-react 4.3.4** - Fast Refresh for React
- **Autoprefixer 10.4.20** - Auto-add vendor prefixes

---

## 🚀 5. Installation & Setup

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **yarn** 1.22+
- **Git**

### Step 1: Clone the Repository
```bash
git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Variables (Optional)
Create `.env` file in root (if needed):
```env
VITE_API_URL=https://api.tryonyou.app
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_AMAZON_API_KEY=your-key
```

### Step 4: Start Development Server
```bash
npm run dev
```

Application will be available at: `http://localhost:5173`

---

## 💻 6. Development Workflow

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 5173) |
| `npm run build` | Build for production → `dist/` |
| `npm run preview` | Preview production build locally |

### Development Guidelines

1. **Component Structure**: Follow React functional components with hooks
2. **Styling**: Use Tailwind utility classes, avoid inline styles
3. **State Management**: Use React Context API for global state
4. **File Naming**: 
   - Components: `PascalCase.jsx`
   - Utilities: `camelCase.js`
   - Styles: `kebab-case.css`
5. **Code Style**: 
   - Use ES6+ features
   - Destructure props
   - Keep components small and focused
   - Comment complex logic

### Adding New Pages

1. Create component in `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`:
```javascript
import YourPage from './pages/YourPage'
// In Routes:
<Route path="/your-page" element={<YourPage />} />
```
3. Add navigation link in `src/components/Navbar.jsx`

---

## 🏗️ 7. Build & Production

### Build for Production
```bash
npm run build
```

**Output:** `dist/` directory with optimized production bundle.

### Build Optimizations
- **Code splitting**: Vendor chunks (React, Animation, Three.js)
- **Tree shaking**: Removes unused code
- **Minification**: JavaScript, CSS, HTML
- **Asset optimization**: Images, fonts automatically optimized
- **Source maps**: Disabled for production

### Build Verification
```bash
# Test production build locally
npm run preview

# Check build size
ls -lh dist/assets/

# Verify all assets copied
ls -R dist/
```

---

## 🚢 8. Deployment

### Vercel (Recommended)

**Live URL:** `https://tryonyou.app`

#### Quick Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

#### Vercel Configuration (`vercel.json`)
```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/demo",
      "destination": "/demo/index.html"
    },
    {
      "source": "/demo/(.*)",
      "destination": "/demo/$1"
    }
  ]
}
```

#### Vercel Settings
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Node Version:** 18.x

### Alternative Platforms

#### Netlify
```bash
netlify deploy --prod --dir=dist
```
**Settings:**
- Build command: `npm run build`
- Publish directory: `dist`

#### Railway
```bash
railway up
```
**Settings:**
- Build command: `npm run build`
- Start command: `npm run preview`

#### AWS S3 + CloudFront
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### Deployment Checklist

Before deploying, ensure:

- [ ] All assets added to `/public/` (see `ASSETS_GUIDE.md`)
- [ ] `npm run build` completes without errors
- [ ] Assets appear in `/dist/assets/` and `/dist/models/`
- [ ] Test all routes locally with `npm run preview`
- [ ] Verify 3D avatar loads (or uses procedural fallback)
- [ ] Check all images load correctly
- [ ] Test responsive design on mobile/tablet/desktop
- [ ] No console errors in browser
- [ ] Performance: Lighthouse score > 90
- [ ] SEO: Meta tags configured
- [ ] Analytics: Google Analytics / Plausible configured

See detailed checklist: `DEPLOYMENT_CHECKLIST.md`

---

## 🏛️ 9. Architecture & Modules

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   TRYONYOU Platform                      │
├─────────────────────────────────────────────────────────┤
│  Frontend (React + Vite SPA)                             │
│  ├── UI Layer (Components, Pages)                       │
│  ├── State Layer (Context API)                          │
│  ├── 3D Layer (Three.js)                                │
│  └── Data Layer (JSON, API Client)                      │
├─────────────────────────────────────────────────────────┤
│  Core Modules                                            │
│  ├── Avatar 3D Generator                                │
│  ├── Textile Comparator (Smart matching)                │
│  ├── PAU Recommender (Emotional AI - Pau le Paon)       │
│  ├── AVBET Payment (Biometric: Iris + Voice)            │
│  ├── AutoDonate (Solidarity Wardrobe)                   │
│  └── Internal Bots (Automation)                         │
├─────────────────────────────────────────────────────────┤
│  External Integrations                                   │
│  ├── Shopify (E-commerce)                               │
│  ├── Amazon (Marketplace)                               │
│  ├── EPCT/WIPO (Patent monitoring)                      │
│  ├── Social Media (Instagram, Facebook)                 │
│  └── Notion / Google Drive (CMS)                        │
└─────────────────────────────────────────────────────────┘
```

### Key Modules

#### 1. Avatar 3D Module (`src/components/Avatar3D.jsx`)
- Real-time 3D avatar generation
- Body measurements integration
- Customizable appearance
- Procedural fallback if no model loaded

#### 2. Virtual Wardrobe (`src/pages/Wardrobe.jsx`)
- Clothing catalog with filtering
- Real-time try-on preview
- Favorites & saved items
- Match percentage algorithm

#### 3. Showroom (`src/pages/Showroom.jsx`)
- Curated looks by occasion/mood
- Visual gallery
- Style recommendations

#### 4. PAU Recommender (`src/pages/AskPeacock.jsx`)
- AI-powered chat assistant (Pau le Paon 🦚)
- Emotional intelligence
- Style recommendations
- Conversational interface

#### 5. Brand Integration (`src/pages/Brands.jsx`)
- Multi-brand catalog
- Search & filter
- Logo display with fallbacks

#### 6. Glow-Up Transformer (`src/pages/GlowUp.jsx`)
- Before/after style transformations
- AI-powered makeover suggestions
- Visual comparison

---

## 🔌 10. API & Integrations

### API Client (`src/utils/apiClient.js`)

Handles connections to external services:

```javascript
// Example usage
import apiClient from '@/utils/apiClient'

// Fetch from Shopify
const products = await apiClient.shopify.getProducts()

// Query Amazon
const items = await apiClient.amazon.search(query)

// Check EPCT/WIPO patents
const patents = await apiClient.wipo.checkPatent(patentNumber)
```

### Supported Integrations
- **Shopify**: Product catalog, inventory sync
- **Amazon**: Marketplace integration
- **EPCT/WIPO**: Patent monitoring & alerts
- **Social Media APIs**: Instagram, Facebook auto-posting
- **Notion**: Documentation sync
- **Google Drive**: Asset storage

---

## 🎨 11. Design System

### Color Palette
```css
--tryonyou-blue: #00A8E8       /* Primary brand blue */
--tryonyou-darkblue: #003459   /* Dark accent */
--tryonyou-gold: #D4AF37       /* Premium gold */
--tryonyou-metallic: #8B92A0   /* Metallic gray */
--tryonyou-black: #0A0A0A      /* True black */
--tryonyou-smoke: #1A1A2E      /* Smoky dark */
```

### Typography
- **Headings**: System fonts (San Francisco, Segoe UI, Roboto)
- **Body**: System fonts
- **Accent**: Custom brand font (if loaded)

### Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 639px) { }

/* Tablet */
@media (min-width: 640px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

### UI Patterns
- **Glass morphism**: Blur effects with transparency
- **Dark theme**: Default theme with neon accents
- **Smooth animations**: Framer Motion transitions
- **3D interactions**: Three.js hover effects

---

## 🧪 12. Testing

### Test Structure
```
tests/
├── testAvatar3D.js         # 3D avatar generation tests
├── testPagoAVBET.js        # Biometric payment tests
└── testAutoDonate.js       # Auto-donation tests
```

### Running Tests (When Implemented)
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

---

## 📦 13. Assets Management

### Asset Location
All static assets must be placed in `/public/`:

```
public/
├── assets/
│   ├── images/              # Product images, looks
│   ├── videos/              # Video content
│   ├── animation/           # Animation files
│   └── logo/                # Brand logos
├── models/                  # 3D models (GLB/GLTF)
└── hero/                    # Hero section media
```

### Asset Requirements

**Images:**
- Format: JPG, PNG, WebP
- Max size: 500KB per image
- Naming: `kebab-case.jpg`

**3D Models:**
- Format: GLB (preferred), GLTF
- Max size: 5MB
- Naming: `avatar.glb`, `item-name.glb`

**Videos:**
- Format: MP4, WebM
- Max size: 10MB
- Encoding: H.264, VP9

See detailed guide: `ASSETS_GUIDE.md`

### Asset Fallbacks

The application includes intelligent fallbacks:
- **Missing images** → Color swatches
- **Missing logos** → Brand initials
- **Missing 3D models** → Procedural avatar

---

## 🤝 14. Contributing

### Development Process

1. **Create feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make changes following code style**
```bash
# Make your changes
git add .
git commit -m "feat: add your feature description"
```

3. **Test locally**
```bash
npm run dev     # Test in development
npm run build   # Test production build
npm run preview # Test production bundle
```

4. **Push and create PR**
```bash
git push origin feature/your-feature-name
```

### Commit Message Convention
```
feat: new feature
fix: bug fix
docs: documentation update
style: formatting changes
refactor: code restructuring
test: add/update tests
chore: maintenance tasks
```

---

## 🔐 15. Security & Privacy

### Data Protection
- No sensitive data stored in localStorage
- No plain-text credentials in code
- Environment variables for API keys
- HTTPS only in production

### Biometric Payment (AVBET)
- Iris + Voice authentication
- Encrypted biometric data
- No data stored on frontend
- Compliant with GDPR

---

## 📞 16. Support & Contact

### Documentation
- Main README: `README.md` (this file)
- Assets Guide: `ASSETS_GUIDE.md`
- Deployment: `DEPLOYMENT_CHECKLIST.md`
- Demo Guide: `DEMO_READY.md`

### Project Links
- **Live Site:** [https://tryonyou.app](https://tryonyou.app)
- **Repository:** [GitHub](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM)
- **Issues:** [GitHub Issues](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues)

### Ecosystem
- **Live It** - Lifestyle platform
- **TryOnYou** - Virtual try-on
- **TryOnMe** - Personal styling
- **VVL** - Visual virtual lookbook
- **ABVETOS** - Deployment system
- **Armario Inteligente** - Smart wardrobe
- **Armario Solidario** - Solidarity wardrobe

---

## 📄 17. License

**Private Repository** - TRYONYOU © 2025

All rights reserved. This is proprietary software.

---

## 🎯 18. Quick Reference

### Essential Commands
```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)

# Production
npm run build        # Build for production
npm run preview      # Test production build

# Deployment
vercel --prod        # Deploy to Vercel
```

### Key Files
- `package.json` - Dependencies & scripts
- `vite.config.js` - Build configuration
- `tailwind.config.js` - Styling configuration
- `src/App.jsx` - Router setup
- `src/main.jsx` - Application entry

### Important Directories
- `src/` - Source code
- `public/` - Static assets (copied to dist/)
- `dist/` - Production build output
- `docs/` - Documentation

---

**Built with ❤️ by the TRYONYOU team**

*LIVE 'IT – Where beauty lives in movement* 🦚
