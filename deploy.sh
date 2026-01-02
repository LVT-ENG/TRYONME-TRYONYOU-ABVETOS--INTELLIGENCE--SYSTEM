#!/bin/bash
set -e

echo "🔗 TRYONYOU Fusion & Deploy Script"
echo "=================================="

echo ""
echo "STEP 1: Clean install dependencies"
rm -rf node_modules package-lock.json
npm install

echo ""
echo "STEP 2: Build unified application"
npm run build

echo ""
echo "STEP 3: Verify build output"
ls -lh dist/
echo "Build completed successfully!"

echo ""
echo "STEP 4: Initialize git if needed"
if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

echo ""
echo "STEP 5: Commit changes"
git add .
git commit -m "🚀 Fusion complete - unified TRYONYOU platform with technical pages" || true

echo ""
echo "STEP 6: Push to repository (if origin exists)"
if git remote | grep -q origin; then
  git push -u origin main
else
  echo "⚠️  NO remote origin configured."
  echo "Add it with:"
  echo "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
fi

echo ""
echo "STEP 7: Deploy to Vercel"
npx vercel --prod

echo ""
echo "✅ FUSION & DEPLOYMENT COMPLETED"
echo "=================================="
echo "Your unified TRYONYOU platform is now live!"
echo "Features integrated:"
echo "  ✓ Virtual Try-On (Wardrobe, Avatar, Showroom)"
echo "  ✓ AI Styling (Glow-Up, Ask Peacock)"
echo "  ✓ Technical Systems (FIT, CAP, ABVET)"
echo "  ✓ Patent Claims"
echo "  ✓ Agent System Integration"

