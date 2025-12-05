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

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx    # Navigation with mobile menu
│   └── Footer.jsx    # Site footer with links
├── pages/            # Route pages (7 total)
│   ├── Home.jsx      # Landing page with hero
│   ├── Brands.jsx    # Brand selection & filtering
│   ├── MyAvatar.jsx  # Avatar creation wizard
│   ├── Wardrobe.jsx  # Virtual closet with try-on
│   ├── Showroom.jsx  # Curated looks gallery
│   ├── GlowUp.jsx    # Style transformation
│   └── AskPeacock.jsx # AI chat assistant
├── data/             # JSON data files
│   └── texts.json    # Content & copy
├── hooks/            # Custom React hooks
│   └── useScrollPosition.js
├── styles/           # Global styles
│   └── index.css     # Tailwind + custom CSS
├── assets/           # Static assets
│   ├── images/
│   ├── videos/
│   └── 3d/
├── App.jsx           # Router configuration
└── main.jsx          # Entry point

public/
├── models/           # 3D models for avatar
└── favicon.svg       # Site favicon
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

## 🛠 Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool
- **React Router 7** - Client-side routing
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion 11** - Animations
- **Three.js + @react-three/fiber** - 3D graphics
- **GSAP** - Advanced animations
- **Lucide React** - Icons

## ✨ Features

- 🎨 **Glass morphism UI** with blur effects
- 🌙 **Dark theme** with neon accents
- 📱 **Fully responsive** mobile-first design
- ⚡ **Smooth animations** throughout
- 🔍 **Search & filter** functionality
- 💾 **Favorites/saved items** system
- 🦚 **AI Peacock** chat assistant
- 🎯 **Match percentage** for fit prediction

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

## 🚀 Deployment

Build the project and deploy the `dist` folder:

```bash
npm run build
# Deploy dist/ to your hosting
```

Compatible with: Vercel, Netlify, Railway, AWS, etc.

## 📄 License

Private - TRYONYOU © 2025
