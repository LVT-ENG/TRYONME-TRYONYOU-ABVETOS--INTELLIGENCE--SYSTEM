# TRYONYOU Static Demo

## 🎯 Overview

Zero-cost, zero-backend static frontend demo of TRYONYOU (AI Virtual Try-On platform).

This demo runs entirely in the browser with:
- ✅ React 18 (via ESM CDN)
- ✅ Tailwind CSS (via CDN)
- ✅ No build process
- ✅ No backend required
- ✅ €0 hosting cost

## 📁 Structure

```
/
├── index.html              # Entry point with CDN imports
├── main.js                 # React root initialization
├── App.js                  # Main app with routing logic
└── components/
    ├── MeasureFlow.jsx     # User measurements input (3 steps)
    ├── ScanView.jsx        # Body scanning interface
    └── ProcessingView.jsx  # Avatar creation processing
```

## 🚀 Usage

### Local Development

Simply serve the files with any static server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Deployment

Deploy to any static hosting service:

- **Vercel**: Just push to GitHub (already configured via `vercel.json`)
- **Netlify**: Drag & drop the root folder
- **GitHub Pages**: Enable in repository settings
- **Cloudflare Pages**: Connect your repo

No build step required!

## 🎨 Features

1. **Landing Page**: Hero section with feature showcase
2. **Measurement Flow**: 3-step form (gender, height/weight, age)
3. **Body Scan**: Camera interface simulation
4. **Processing**: Animated avatar creation

## 🔧 Technical Details

- **React Version**: 18.2.0 (NOT 19)
- **CDN Provider**: esm.sh
- **Styling**: Tailwind CSS 3.x via CDN
- **Fonts**: Google Fonts (Plus Jakarta Sans)
- **No Dependencies**: Everything via CDN

## ⚠️ Important Notes

- This is a **DEMO** interface for presentations and pilots
- No actual backend integration
- No real camera access (placeholder UI)
- No data persistence
- Designed for investor pitches and brand presentations

## 🔗 Links

- Production URL: https://tryonyou.app (when deployed)
- Repository: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

## 📝 License

© 2026 TRYONYOU - All Rights Reserved
