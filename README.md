# TRYONYOU - Final Fused Project

> AI-Powered Virtual Fashion Try-On Platform by ABVETOS

## 🎯 Overview

TRYONYOU is a revolutionary fashion-tech platform that uses AI to provide hyper-realistic virtual try-on experiences. This project is the final fused and cleaned version, ready for deployment.

## ✨ Features

- **Virtual Try-On Demo** - AI-powered outfit visualization
- **Smart Wardrobe** - Intelligent outfit management
- **Station-F Investor Page** - Professional investment deck
- **PAU Mascot** - Interactive peacock assistant
- **Responsive Design** - Mobile-first approach

## 🎨 Design System (DRS-TRYONYOU v1.0)

- **Colors**: Anthracite (#2d2d2d), Gold (#c9a227), Bone-White (#f5f2eb)
- **Typography**: Playfair Display (headings), Inter (body)
- **Style**: Warm showroom lighting, clean futuristic look

## 📁 Project Structure

```
/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Navigation.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ClaimsCarousel.jsx
│   │   ├── FashionGrid.jsx
│   │   ├── PauMascot.jsx
│   │   └── Footer.jsx
│   ├── pages/          # Page components
│   │   ├── HomePage.jsx
│   │   ├── DemoPage.jsx
│   │   └── StationFPage.jsx
│   ├── styles/         # CSS styles
│   │   └── style.css
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/
│   └── assets/
│       └── tryonyou/   # Project assets
├── index.html          # HTML entry
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

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

## 🔧 Tech Stack

- **React** 18.2.0
- **React Router** 6.22.1
- **Vite** 7.1.2
- **CSS3** with custom properties

## 📱 Pages

1. **Home** (`/`) - Hero section, claims carousel, fashion grid
2. **Demo** (`/demo`) - Virtual try-on demonstration
3. **Station-F** (`/station-f`) - Investor presentation page

## 🌐 Deployment

The `/dist` folder contains the production-ready build. Deploy to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- ABVETOS Deploy Express

## 📄 License

MIT © ABVETOS
