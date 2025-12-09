# 📦 TryOnYou 70 Image Pack - Installation & Usage Guide

This directory contains the complete folder structure for the **TryOnYou 70 Image Pack**, as specified by **Agente 70**.

## 📁 Directory Structure

The following structure has been created to organize all visual assets:

```
assets/images/tryonyou/
├── logo/                         # Official TryOnYou logos (PNG)
├── pau/                          # PAU avatar in high quality
│   └── mini/                     # PAU mini version
├── ui/                           # UI/UX screens
│   ├── wardrobe/                 # Virtual wardrobe interface
│   ├── fitting/                  # 3D fitting and avatar views
│   ├── recommendations/          # PAU recommendation screens
│   └── onboarding/               # Body scanning onboarding
├── outfits/                      # Outfit images
│   ├── female/                   # Female outfits
│   └── male/                     # Male outfits
├── retail/                       # Retail integration assets
├── marketing/                    # Marketing materials
│   ├── hero/                     # Hero images for landing pages
│   ├── community/                # Community and user content
│   └── testimonials/             # Testimonial images
├── storytelling/                 # Narrative assets
│   ├── problem/                  # Problem illustration (sizing issues)
│   ├── before_after/             # Before/after comparisons
│   └── lifestyle/                # Lifestyle imagery
├── concepts/                     # Conceptual assets
│   └── editorial/                # Editorial fashion content
└── fashion/                      # Fashion collections and trends
```

## 🚀 Quick Start

### 1. Add Your Images

Place your image files in the appropriate folders following the naming convention:

```
{category}_{subcategory}_{descriptor}_{variant}.{ext}

Examples:
✅ pau_avatar_fullbody_01.png
✅ ui_wardrobe_grid_desktop.png
✅ marketing_hero_homepage_v2.jpg
✅ outfit_female_casual_summer.png
```

### 2. Validate Assets

After adding images, run the validation script:

```bash
npm run check:assets
```

This will verify:
- ✅ Correct naming conventions
- ✅ File size limits
- ✅ Valid formats
- ✅ Path existence

### 3. Generate Asset Constants

To generate TypeScript constants and JSON manifest:

```bash
npm run import:assets
```

This creates:
- `src/constants/TryonAssets.generated.ts` - TypeScript constants with all paths
- `docs/assets/tryonyou-assets.json` - JSON manifest with metadata

### 4. Use in Code

Import the generated assets in your React components:

```typescript
import { TRYON_ASSETS } from '@/constants/TryonAssets.generated';

// Use in component
const WardrobeScreen = () => {
  return <img src={TRYON_ASSETS.ui.wardrobe[0]} alt="Wardrobe" />;
};
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run check:assets` | Validate all assets (naming, size, format) |
| `npm run check:naming` | Show naming convention guide |
| `npm run import:assets` | Generate TypeScript constants and JSON manifest |

## 📖 Documentation

For complete technical documentation, see:
- **[Technical README](/docs/assets/README_TryOnYou_TECH.md)** - Complete technical guide for developers
- **[Asset Manifest](/docs/assets/tryonyou-assets.json)** - JSON manifest with all asset metadata

## 🎨 File Naming Rules

**Format:** `{category}_{subcategory}_{descriptor}_{variant}.{ext}`

**Rules:**
- All lowercase
- Use underscores (_) instead of spaces
- No accents or special characters
- Valid extensions: `.png`, `.jpg`, `.jpeg`, `.webp`
- Minimum 3 parts

**Examples:**
```
✅ pau_avatar_fullbody_01.png
✅ ui_wardrobe_grid_desktop.png
✅ marketing_hero_homepage_v2.jpg
✅ outfit_female_casual_summer.png

❌ PAU Avatar.png (uppercase, spaces)
❌ Foto 1.jpg (not descriptive, space)
❌ imagen-final.PNG (uppercase extension)
```

## 📏 File Size Limits

| Format | Maximum Size |
|--------|--------------|
| PNG    | 2.5 MB      |
| JPG    | 1.8 MB      |
| JPEG   | 1.8 MB      |
| WEBP   | 500 KB      |

## 🔧 Integration

### TypeScript Types

The system provides full TypeScript support with auto-generated types:

```typescript
// Manually created types (reference)
import { TRYON_ASSETS } from '@/constants/TryonAssets';

// Auto-generated from actual files
import { TRYON_ASSETS } from '@/constants/TryonAssets.generated';
```

### Asset Categories

All assets are organized by category:

- `logo` - Brand logos and icons
- `pau` - PAU avatar assets
- `ui` - User interface screens
- `outfits` - Clothing combinations
- `retail` - Retail integration
- `marketing` - Marketing materials
- `storytelling` - Narrative content
- `concepts` - Editorial concepts
- `fashion` - Fashion collections

## ✅ Quality Checklist

Before deploying, ensure:

- [ ] All images follow naming conventions
- [ ] File sizes are within limits
- [ ] Validation script passes (`npm run check:assets`)
- [ ] Assets are imported (`npm run import:assets`)
- [ ] TypeScript constants are generated
- [ ] Paths work in development and production
- [ ] Images load correctly on mobile (iOS/Android)

## 🆘 Troubleshooting

### Images not loading in production

**Solution:** Verify that:
1. Images are in the correct folder: `/assets/images/tryonyou/`
2. Paths start with `/assets/`
3. File names match exactly (case-sensitive)

### Validation script fails

**Solution:**
1. Check file naming: `npm run check:naming`
2. Review error messages
3. Rename files to match conventions

### Import script doesn't find images

**Solution:**
1. Ensure images are in `/assets/images/tryonyou/` (not `/public/assets/`)
2. Check file extensions are lowercase
3. Remove any `.DS_Store` or system files

## 📞 Contact

**Agente 70 – Visual Integration & Orchestration**

Responsibilities:
- ✔ Asset organization
- ✔ Quality control
- ✔ Visual consistency
- ✔ Development deliverables

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Package:** TryOnYou 70 Image Pack
