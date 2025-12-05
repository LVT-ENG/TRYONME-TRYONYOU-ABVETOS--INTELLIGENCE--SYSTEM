# TRYONYOU

**LIVE 'IT – Where beauty lives in movement**

A hyper-real fashion experience platform built with React, Vite, and Three.js.

## 🌟 Features

- **7 Interactive Pages**: Home, Brands, Avatar3D, Wardrobe, Showroom, Recommendation, AI System
- **3D Avatar System**: Customizable 3D avatar with Three.js + React Three Fiber
- **AI Style Oracle**: The Peacock - your personal style advisor
- **Virtual Wardrobe**: Mix and match outfits in real-time
- **Glow-Up Recommendations**: AI-powered style suggestions

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
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   └── Avatar3DCanvas.jsx
├── pages/           # Route pages
│   ├── Home.jsx
│   ├── Brands.jsx
│   ├── Avatar3D.jsx
│   ├── Wardrobe.jsx
│   ├── Showroom.jsx
│   ├── Recommendation.jsx
│   └── IntelligentSystem.jsx
├── context/         # React Context providers
│   └── AppContext.jsx
├── utils/           # Utility functions & constants
│   ├── constants.js
│   └── helpers.js
├── styles/          # Global styles
│   └── global.css
├── assets/          # Static assets (images, fonts)
├── App.jsx          # Main app with routing
└── main.jsx         # Entry point
```

## 🛠 Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool
- **React Router 7** - Client-side routing
- **Three.js + @react-three/fiber** - 3D graphics
- **Framer Motion** - Animations
- **CSS Custom Properties** - Theming

## 🎨 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Welcome & body shape selection |
| Brands | `/brands` | Choose your preferred brand |
| Avatar | `/avatar` | Customize your 3D avatar |
| Wardrobe | `/wardrobe` | Virtual wardrobe with categories |
| Showroom | `/showroom` | Browse curated collections |
| Glow-Up | `/recommendation` | AI style recommendations |
| Ask Peacock | `/ai-system` | Chat with The Peacock AI |

## 🦚 The Peacock

Your personal style oracle - an AI assistant that provides context-aware fashion advice based on:
- Your body shape
- Selected brands
- Personal preferences
- Event/occasion context

## 📱 Responsive Design

Fully responsive across all device sizes with:
- Mobile-first approach
- Adaptive navigation
- Touch-friendly interactions

## 🔧 Development

```bash
# Run linter
npm run lint

# Type checking (if TypeScript added)
npm run type-check
```

## 📄 License

Private - TRYONYOU © 2024
