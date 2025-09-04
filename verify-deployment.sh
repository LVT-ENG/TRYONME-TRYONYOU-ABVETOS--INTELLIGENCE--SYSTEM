#!/bin/bash

echo "🚀 TRYONME/TRYONYOU AVBETOS Intelligence System - Deployment Verification"
echo "================================================================"

echo ""
echo "📦 Checking build artifacts..."
if [ -f "dist/index.html" ]; then
    echo "✅ index.html exists"
else
    echo "❌ index.html missing"
    exit 1
fi

if [ -f "dist/video_portada.mp4" ]; then
    echo "✅ video_portada.mp4 exists"
else
    echo "❌ video_portada.mp4 missing"
    exit 1
fi

echo ""
echo "🎨 Checking assets..."
asset_count=$(find dist/ -name "*.png" -o -name "*.jpeg" -o -name "*.jpg" | wc -l)
echo "✅ Found $asset_count image assets"

echo ""
echo "🔌 Checking API endpoint..."
if [ -f "api/health.js" ]; then
    echo "✅ health.js API endpoint exists"
else
    echo "❌ health.js API endpoint missing"
    exit 1
fi

echo ""
echo "⚙️ Checking configuration files..."
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json exists"
else
    echo "❌ vercel.json missing"
    exit 1
fi

if [ -f "package.json" ]; then
    echo "✅ package.json exists"
else
    echo "❌ package.json missing"
    exit 1
fi

echo ""
echo "📊 Build statistics:"
echo "   - Total build size: $(du -sh dist/ | cut -f1)"
echo "   - Asset files: $asset_count"
echo "   - JavaScript bundle: $(ls -lh dist/assets/*.js | awk '{print $5}')"

echo ""
echo "🎉 Deployment verification complete! Ready for Vercel deploy."
echo ""
echo "Next steps:"
echo "1. Push to GitHub (automatic Vercel deployment)"
echo "2. Verify https://tryonyou.app loads with video"
echo "3. Test https://tryonyou.app/api/health returns JSON"
echo "4. Validate all premium features work (scroll, animations, Avatar PAU)"