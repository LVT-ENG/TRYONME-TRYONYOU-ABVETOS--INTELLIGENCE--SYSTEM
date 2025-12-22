# TRYONYOU Intelligence System - Deployment Guide

## Overview

This deployment system creates a dual-architecture setup for TRYONYOU:
1. **Landing Page** (`index.html`) - Marketing entry point
2. **Pilot Runtime** (`pilot.html`) - Independent, persistent intelligence system

## Architecture

### Files Generated

- `index.html` - Landing page with "LAUNCH PILOT" button
- `pilot.html` - Standalone pilot with deep linking support
- `.github/workflows/deploy.yml` - GitHub Pages auto-deployment

### Key Features

✅ **Persistent State** - Pilot is refresh-resistant  
✅ **Direct URL Access** - Access pilot directly via `/pilot.html`  
✅ **Deep Linking** - URL parameters supported (`?item=jacket_test`)  
✅ **Auto-Deploy** - GitHub Actions deploys on push to `main`

## Usage

### Build System

Run the Python build script to generate all files:

```bash
python3 build_system.py
```

This will create:
- `index.html` (Landing page)
- `pilot.html` (Pilot runtime)
- `.github/workflows/deploy.yml` (GitHub Actions config)

### Deployment

1. **Local Development**
   ```bash
   # Generate files
   python3 build_system.py
   
   # Open in browser
   open index.html
   ```

2. **Production Deploy**
   - Push to `main` branch
   - GitHub Actions automatically deploys to GitHub Pages
   - Access at: `https://<username>.github.io/<repo>/`

### Testing Deep Links

Test the pilot with URL parameters:
```
pilot.html?item=jacket_test
```

The pilot will parse the `item` parameter and display it in the interface.

## Integration with Intelligence API

The pilot includes placeholders for Intelligence API integration (Issue #1292):

```javascript
// In pilot.html
const itemParam = getUrlParameter('item');
if (itemParam) {
    console.log('Intelligence System activated for item:', itemParam);
    // Here you would integrate with the Intelligence API from Issue #1292
}
```

## Deployment Workflow

The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles:

1. Checkout code from `main` branch
2. Setup GitHub Pages
3. Upload entire repository as artifact
4. Deploy to GitHub Pages

No build step required - the HTML files are static and ready to deploy.

## URLs

After deployment:

- **Landing**: `https://<username>.github.io/<repo>/` or `https://<username>.github.io/<repo>/index.html`
- **Pilot**: `https://<username>.github.io/<repo>/pilot.html`
- **Deep Link Example**: `https://<username>.github.io/<repo>/pilot.html?item=jacket_test`

## Development Notes

- All HTML files are standalone and include inline CSS/JavaScript
- No external dependencies required
- Compatible with GitHub Pages static hosting
- Pilot maintains state across page refreshes
- Intelligence system ready for API integration

## Related Issues

- Intelligence System: LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1292
