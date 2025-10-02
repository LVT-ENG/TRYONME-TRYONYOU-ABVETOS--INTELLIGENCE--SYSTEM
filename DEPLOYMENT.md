# TRYONYOU Deployment Guide

## 🚀 Quick Deployment

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- Vercel account (for production deployment)

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

3. **Build for production:**
```bash
npm run build
```
This generates optimized files in the `dist/` directory.

4. **Preview production build:**
```bash
npm run preview
```

---

## 🌐 Production Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy to production:**
```bash
vercel --prod
```

### Option 2: GitHub Integration

1. **Push code to GitHub repository:**
```bash
git add .
git commit -m "Deploy TRYONYOU premium update"
git push origin main
```

2. **Connect repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project settings:
     - Framework Preset: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

### Option 3: Manual Deployment with Tokens

```bash
# Set environment variables
export VERCEL_TOKEN=t9mc4kHGRS0VTWBR6qtJmvOw
export VERCEL_PROJECT_ID=prj_Wkq9QCEn6RJr3x7AMpNkbIZ2Z2AX4
export VERCEL_TEAM_ID=team_SDhjSkxLVE7oJ3S5KPkwG9uC

# Deploy
vercel deploy --prod --yes --token $VERCEL_TOKEN
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
VITE_API_URL=https://api.tryonyou.app
VITE_ANALYTICS_ID=your-analytics-id
```

### Domain Configuration

The project is configured for the following domains:
- **Primary:** https://tryonyou.app
- **Alternate languages:**
  - https://tryonyou.app/en (English)
  - https://tryonyou.app/es (Spanish)
  - https://tryonyou.app/fr (French)

---

## 📦 Build Optimization

The build process includes:
- ✅ Code minification and tree-shaking
- ✅ CSS optimization and purging
- ✅ Image optimization
- ✅ Lazy loading for components
- ✅ Gzip compression
- ✅ Cache headers for static assets

---

## 🎨 Design System

### Color Palette (Premium)
- **Luxury Gold:** `#D3B26A`
- **Peacock Deep:** `#0E6B6B`
- **Anthracite Dark:** `#141619`
- **Bone Light:** `#F5EFE6`

### Typography
- **Primary Font:** Poppins
- **Secondary Font:** Inter
- **Weights:** 300, 400, 600, 700, 800

### Spacing Scale
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 40px
- XXL: 64px

---

## 🌍 Multi-language Support

The application supports three languages:
- **English (EN)** - Default
- **Spanish (ES)**
- **French (FR)**

Language detection is automatic based on browser settings, with manual override available via the language selector in the header.

---

## 📊 Performance Metrics

Target metrics (Lighthouse):
- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

---

## 🔐 Security Headers

The following security headers are configured in `vercel.json`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 📝 Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test language switching (EN/ES/FR)
- [ ] Check mobile responsiveness
- [ ] Validate all animations work smoothly
- [ ] Test carousel functionality
- [ ] Verify patent tooltip displays correctly
- [ ] Check all CTAs redirect properly
- [ ] Run Lighthouse audit
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify OG images display on social media

---

## 🐛 Troubleshooting

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Assets not loading
- Check that all assets are in the `public/` directory
- Verify paths start with `/` (e.g., `/logo.png`)

### Vercel deployment issues
```bash
# Check deployment logs
vercel logs

# Redeploy
vercel --prod --force
```

---

## 📞 Support

For deployment issues or questions:
- **Email:** info@tryonyou.app
- **Repository:** https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

---

## 📄 License

© 2025 TRYONYOU. All rights reserved.
Patent-protected technology (EPCT Pending).
