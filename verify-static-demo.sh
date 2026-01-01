#!/bin/bash
# Verification script for TRYONYOU static demo

echo "🔍 VERIFYING TRYONYOU STATIC DEMO"
echo "=================================="
echo ""

# Check required files
echo "📁 Checking file structure..."
required_files=(
  "index.html"
  "main.js"
  "App.js"
  "components/MeasureFlow.jsx"
  "components/ScanView.jsx"
  "components/ProcessingView.jsx"
)

all_exist=true
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    lines=$(wc -l < "$file")
    echo "  ✓ $file ($lines lines)"
  else
    echo "  ✗ $file MISSING"
    all_exist=false
  fi
done

echo ""

# Check React version
echo "🔍 Checking React version..."
if grep -q "react@18.2.0" index.html; then
  echo "  ✓ React 18.2.0 found in import map"
else
  echo "  ✗ React 18 not found or wrong version"
  all_exist=false
fi

# Check Tailwind
echo ""
echo "🎨 Checking Tailwind CSS..."
if grep -q "cdn.tailwindcss.com" index.html; then
  echo "  ✓ Tailwind CSS CDN found"
else
  echo "  ✗ Tailwind CSS CDN not found"
  all_exist=false
fi

# Check Google Fonts
echo ""
echo "🔤 Checking Google Fonts..."
if grep -q "Plus Jakarta Sans" index.html; then
  echo "  ✓ Plus Jakarta Sans font found"
else
  echo "  ✗ Plus Jakarta Sans font not found"
  all_exist=false
fi

# Check imports
echo ""
echo "📦 Checking imports..."
if grep -q 'import React from "react"' main.js; then
  echo "  ✓ main.js imports React correctly"
else
  echo "  ✗ main.js React import incorrect"
  all_exist=false
fi

if grep -q 'createRoot' main.js; then
  echo "  ✓ main.js uses createRoot"
else
  echo "  ✗ main.js missing createRoot"
  all_exist=false
fi

if grep -q 'import App from "./App.js"' main.js; then
  echo "  ✓ main.js imports App correctly"
else
  echo "  ✗ main.js App import incorrect"
  all_exist=false
fi

# Final result
echo ""
echo "=================================="
if [ "$all_exist" = true ]; then
  echo "✅ ALL CHECKS PASSED!"
  echo ""
  echo "To test locally:"
  echo "  python3 -m http.server 8000"
  echo "  # Open http://localhost:8000"
  echo ""
  echo "Ready for deployment to:"
  echo "  • Vercel"
  echo "  • Netlify"
  echo "  • GitHub Pages"
  echo "  • Cloudflare Pages"
  echo "  • Any static hosting"
  exit 0
else
  echo "❌ SOME CHECKS FAILED"
  echo "Please review the issues above"
  exit 1
fi
