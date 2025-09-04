# TryOnMe - Minimal Official Landing Page

## Overview
This is the minimal official landing page for the TryOnMe/TryOnYou AVBETOS Intelligence System, designed for mobile-first deployment.

## Features
- **Minimal Design**: Clean, professional interface focusing on the core AVBETOS message
- **Mobile Optimized**: Responsive design with breakpoints at 768px and 480px
- **Fast Loading**: 44% bundle size reduction (259KB → 145KB)
- **Brand Consistent**: Uses official AVBETOS colors (#0F5E68 primary)
- **SEO Ready**: Proper meta tags and semantic HTML
- **Accessible**: Focus states, reduced motion support, high contrast mode

## Technical Stack
- React 18.3.1
- Vite 7.1.4 (build tool)
- Vanilla CSS (no framework dependencies)
- @vercel/analytics for tracking

## Build & Deploy

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

### Deployment
The `dist/` folder contains the production-ready files:
- `index.html` - Main HTML file
- `assets/index-*.css` - Styles (3.28 KB)
- `assets/index-*.js` - JavaScript bundle (145.06 KB)

## Mobile Optimization
- Viewport meta tag for proper mobile scaling
- CSS custom properties for consistent theming
- Grid layout that adapts to mobile screens
- Touch-friendly button sizes (minimum 44px height)
- Optimized font sizes with responsive scaling

## Browser Support
- Modern browsers with CSS Grid support
- CSS custom properties (IE11+ with polyfill)
- ES6+ JavaScript features

## Performance Metrics
- Initial bundle: 145KB (gzipped: 46.6KB)
- CSS: 3.28KB (gzipped: 1.14KB)
- HTML: 0.68KB (gzipped: 0.40KB)

## Color Palette
- Primary: #0F5E68 (AVBETOS Teal)
- Secondary: #1a7c87
- Accent: #2dd4bf
- Text Dark: #1f2937
- Text Light: #6b7280

## Next Steps
- Add analytics tracking
- Implement contact form
- Add loading animations
- Connect to Google Apps Script backend
- Add multi-language support

---
Developed for LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
© 2025 TryOnMe - AVBETOS Intelligence System