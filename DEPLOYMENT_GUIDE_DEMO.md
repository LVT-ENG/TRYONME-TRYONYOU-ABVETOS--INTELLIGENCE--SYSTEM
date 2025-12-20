# Deployment Guide for tryonyou.app/demo

## Overview
This guide explains how to deploy the TRYONYOU pilot to the production domain `tryonyou.app/demo`.

## Prerequisites
- Vercel account with access to the tryonyou.app domain
- GitHub repository access
- Node.js 18+ installed locally (for testing)

## Build Configuration
The project is configured with:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Routing**: SPA routing configured in `vercel.json`

## Routes
The application includes the following routes:
- `/` - Home page
- `/landing` - Landing page
- `/brands` - Brands page
- `/my-avatar` - Avatar customization
- `/wardrobe` - Virtual wardrobe
- `/showroom` - Showroom
- `/glow-up` - Glow-up transformations
- `/demo` - **Pilot demo page** (Lafayette Paris virtual fitting)
- `/try` - Try-on interface
- `/measure` - Measurement interface

## Deployment Steps

### 1. Local Testing
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Preview the build locally
npm run preview
# Visit http://localhost:4173/demo
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy to production
vercel --prod
```

#### Option B: Using GitHub Integration
1. Push changes to the repository
2. Vercel will automatically deploy from the connected GitHub repository
3. The deployment will be available at tryonyou.app

### 3. Custom Domain Configuration
To ensure the demo is accessible at `tryonyou.app/demo`:

1. In Vercel Dashboard:
   - Go to Project Settings
   - Navigate to Domains
   - Add/verify domain: `tryonyou.app`

2. DNS Configuration:
   - Point your domain to Vercel's nameservers or
   - Add CNAME record pointing to your Vercel deployment

3. The routing configuration in `vercel.json` handles the `/demo` path automatically

## Demo Page Features
The `/demo` page includes:
- Virtual fitting experience for Lafayette Paris
- Interactive look selection (4 curated looks)
- Real-time fit analysis
- Fit score percentage
- Detailed measurements (shoulder, chest, waist, length)
- Responsive design for mobile and desktop
- High-quality product images

## Images
The demo page uses images from `/public/images/`:
- `look1-colorful-jacket.png` - Artisan Colorful Jacket
- `look2-brown-suit.png` - Heritage Brown Suit
- `look3-black-dress.png` - Noir Couture Dress
- `look4-white-jacket.png` - Graphic White Biker

All images are automatically copied to the `dist` folder during build.

## Verification
After deployment, verify:
1. Visit `https://tryonyou.app/demo`
2. Check that the page loads correctly
3. Test look selection interaction
4. Verify images load properly
5. Test responsive design on mobile

## Troubleshooting

### Images Not Loading
- Ensure images are in `/public/images/` directory
- Check that build process copied images to `dist/images/`
- Verify image paths in Demo.jsx match actual filenames

### 404 on /demo Route
- Verify `vercel.json` rewrites are configured
- Check that SPA routing is enabled
- Ensure all routes point to `/index.html`

### Build Failures
- Run `npm install` to ensure all dependencies are installed
- Clear `node_modules` and reinstall if needed
- Check for any TypeScript or linting errors

## Maintenance
To update the demo:
1. Make changes to `src/pages/Demo.jsx`
2. Test locally with `npm run dev`
3. Build and preview with `npm run build && npm run preview`
4. Commit and push changes
5. Vercel will auto-deploy if connected via GitHub

## Support
For issues or questions:
- Check build logs in Vercel Dashboard
- Review console errors in browser DevTools
- Verify all environment variables are set (if any)

---

**Last Updated**: December 2024
**Version**: 3.0.0
