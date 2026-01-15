# TRYONYOU Deployment Checklist

## ✅ Pre-Deployment

### Assets
- [ ] All images added to `/public/assets/images/`
- [ ] Brand logos added to `/public/assets/logo/`
- [ ] 3D avatar model added to `/public/models/avatar.glb` (or .gltf)
- [ ] Videos added to `/public/assets/videos/` (if any)

### Build Verification
- [ ] Run `npm install` (dependencies installed)
- [ ] Run `npm run build` (build succeeds)
- [ ] Check `/dist/assets/` contains all images
- [ ] Check `/dist/models/` contains 3D models
- [ ] Check `/dist/assets/logo/` contains brand logos

### Functionality Testing
- [ ] **Home Page**: Hero section displays correctly
- [ ] **Brands Page**: Brand logos display (or fallback to initials)
- [ ] **My Avatar Page**: 3D avatar loads (or shows procedural model)
- [ ] **Wardrobe Page**: Clothing images display (or fallback to color swatches)
- [ ] **Wardrobe Try-On**: 3D avatar appears in try-on modal
- [ ] **Showroom Page**: Look images display (or fallback to color swatches)
- [ ] **Glow-Up Page**: Before/After images display
- [ ] **Ask Peacock Page**: Chat interface works

### Navigation
- [ ] All menu links work
- [ ] Mobile menu opens/closes correctly
- [ ] Footer links work
- [ ] Back navigation works

### Responsive Design
- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Images scale correctly on all devices

## 🚀 Deployment Steps

### SuperCommit MAX Script (Ultimatum V7)

The repository includes a comprehensive deployment script `TRYONYOU_SUPERCOMMIT_MAX.sh` that automates the entire deployment process.

**⚠️ WARNING**: This script is destructive and will:
- Delete `node_modules`, `dist`, and legacy folders
- Force clean installation of dependencies
- Commit and push to main branch
- Optionally trigger Vercel production deploy

**How to Execute:**

```bash
# From repository root
./TRYONYOU_SUPERCOMMIT_MAX.sh

# Or with Vercel deploy
VERCEL_TOKEN=your_token ./TRYONYOU_SUPERCOMMIT_MAX.sh
```

**What it does:**
1. Verifies you're in the repository root (checks for package.json)
2. Switches to main branch and pulls latest changes
3. Cleans obsolete files and reinstalls dependencies
4. Stages all project files (docs/, src/, public/, scripts/, api/, configs)
5. Creates consolidated commit with detailed message
6. Pushes changes to origin main
7. Optionally triggers Vercel production deployment

**Script Location:**
- Root: `/TRYONYOU_SUPERCOMMIT_MAX.sh`
- Scripts: `/scripts/TRYONYOU_SUPERCOMMIT_MAX.sh`

---

### 1. Build Production Version
```bash
npm run build
```

### 2. Verify Build Output
```bash
# Check dist folder structure
ls -la dist/
ls -la dist/assets/
ls -la dist/models/

# Verify all assets are present
find dist/assets -type f | wc -l
```

### 3. Test Locally
```bash
npm run preview
# Visit http://localhost:4173
# Test all pages and functionality
```

### 4. Deploy to Platform

#### Vercel
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

**Settings:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

#### Netlify
```bash
# Install Netlify CLI (if not installed)
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Settings:**
- Build command: `npm run build`
- Publish directory: `dist`

#### Manual Upload
1. Zip the `dist` folder
2. Upload to your hosting provider
3. Extract to web root

## 🔍 Post-Deployment Verification

### Live Site Checks
- [ ] Home page loads
- [ ] All routes accessible (`/`, `/brands`, `/my-avatar`, `/wardrobe`, `/showroom`, `/glow-up`, `/ask-peacock`)
- [ ] Images load correctly
- [ ] 3D avatar loads (or procedural fallback works)
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] No 404 errors for assets

### Performance
- [ ] Page load time < 3 seconds
- [ ] Images optimized and loading
- [ ] 3D models loading efficiently

## 🐛 Troubleshooting

### Assets Not Loading
- Check file paths match expected names
- Verify assets are in `/public/` folder
- Ensure build copied assets to `/dist/`

### 3D Avatar Not Showing
- Check model is in `/public/models/`
- Verify GLB/GLTF format
- Check browser console for errors
- Procedural fallback should work if model missing

### Build Errors
- Run `npm install` to ensure dependencies
- Check for import errors
- Verify all components export correctly

## 📝 Notes

- **Fallbacks**: The app includes fallbacks for missing assets:
  - Images → Color swatches
  - Logos → Text initials
  - 3D Models → Procedural avatar

- **Asset Optimization**: Optimize images before adding:
  - Use ImageOptim or TinyPNG
  - Keep images under 500KB each
  - Use WebP format when possible

- **3D Models**: Optimize GLB files:
  - Use gltf-pipeline: `gltf-pipeline -i avatar.gltf -o avatar.glb`
  - Keep models under 5MB

