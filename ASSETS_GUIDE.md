# TRYONYOU Assets Guide

## 📁 Folder Structure

All assets should be placed in the `/public` folder. The structure is:

```
public/
├── assets/
│   ├── images/          # All images (wardrobe, showroom, glow-up, etc.)
│   ├── videos/          # Video files
│   ├── animation/       # Animation files
│   └── logo/            # Brand logos
├── models/              # 3D models (GLB/GLTF format)
└── favicon.svg          # Site favicon
```

## 🖼️ Image Assets

### Wardrobe Images
Place clothing item images in `/public/assets/images/`:
- `silk-blouse.jpg`
- `jeans.jpg`
- `midi-dress.jpg`
- `blazer.jpg`
- `sweater.jpg`
- `belt.jpg`
- `skirt.jpg`
- `tshirt.jpg`
- `trench.jpg`
- `dress.jpg`
- `pants.jpg`
- `necklace.jpg`

### Showroom Images
Place look images in `/public/assets/images/`:
- `showroom-power-meeting.jpg`
- `showroom-weekend-vibes.jpg`
- `showroom-date-night.jpg`
- `showroom-festival.jpg`
- `showroom-city-explorer.jpg`
- `showroom-clean-slate.jpg`
- `showroom-summer-sunset.jpg`
- `showroom-street-cred.jpg`

### Glow-Up Images
Place before/after images in `/public/assets/images/`:
- `glowup-before-1.jpg`
- `glowup-after-1.jpg`
- `glowup-before-2.jpg`
- `glowup-after-2.jpg`
- `glowup-before-3.jpg`
- `glowup-after-3.jpg`

### Brand Logos
Place brand logo images in `/public/assets/logo/`:
- `zara-logo.png`
- `massimo-dutti-logo.png`
- `mango-logo.png`
- `cos-logo.png`
- `nike-logo.png`
- `adidas-logo.png`
- `reformation-logo.png`
- `gucci-logo.png`
- `balenciaga-logo.png`
- `patagonia-logo.png`
- `stussy-logo.png`
- `loewe-logo.png`

## 🎬 Video Assets

Place video files in `/public/assets/videos/`:
- Hero videos
- Demo videos
- Tutorial videos

## 🎨 3D Models

Place 3D avatar models in `/public/models/`:
- `avatar.glb` (or `avatar.gltf`) - Main avatar model

**Supported formats:** GLB, GLTF

## 🚀 Adding Your Assets

1. **Copy your assets** to the appropriate folders in `/public/`
2. **Ensure file names match** the expected names in the code (or update the code)
3. **Run the build**: `npm run build`
4. **Verify assets** are in `/dist/assets/` and `/dist/models/`

## 📝 Notes

- All images will fallback to color swatches if not found
- Brand logos will fallback to text initials if not found
- 3D avatar will use a procedural model if GLB/GLTF not found
- The build process automatically copies all `/public` assets to `/dist`

## ✅ Build Verification

After adding assets, verify:

```bash
# Build the project
npm run build

# Check that assets are copied
ls -la dist/assets/
ls -la dist/models/

# Preview the build
npm run preview
```

## 🎯 Asset Requirements

### Images
- **Format:** JPG, PNG, WebP
- **Recommended size:** 800x1200px for clothing items
- **Optimization:** Compress images for web (use tools like ImageOptim or TinyPNG)

### Videos
- **Format:** MP4, WebM
- **Codec:** H.264 for maximum compatibility
- **Optimization:** Compress for web delivery

### 3D Models
- **Format:** GLB (preferred) or GLTF
- **Optimization:** Use gltf-pipeline to optimize models
- **Size:** Keep under 5MB for best performance
