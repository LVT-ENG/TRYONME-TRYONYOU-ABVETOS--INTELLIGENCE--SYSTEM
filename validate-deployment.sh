#!/bin/bash
# Deployment Validation Script for TryOnMe/TryOnYou AVBETOS Intelligence System

set -e

echo "🚀 Starting Deployment Validation Process..."

# Step 1: Build validation
echo "📦 Step 1: Building project..."
npm run build
echo "✅ Build completed successfully"

# Step 2: Check required files
echo "🔍 Step 2: Validating required files..."
if [ ! -f "public/video_portada.mp4" ]; then
    echo "❌ video_portada.mp4 not found in public/"
    exit 1
fi

if [ ! -f "api/health.js" ]; then
    echo "❌ api/health.js not found"
    exit 1
fi

echo "✅ All required files present"

# Step 3: Verify build output
echo "🔍 Step 3: Checking build output..."
if [ ! -d "dist" ]; then
    echo "❌ dist directory not found"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ dist/index.html not found"
    exit 1
fi

echo "✅ Build output validated"

echo "🎉 Local validation completed successfully!"
echo ""
echo "📋 Deployment Checklist:"
echo "✅ npm run build - No errors"
echo "✅ Video file present"
echo "✅ Health API endpoint created"
echo "✅ Build output validated"
echo ""
echo "🔄 Ready for Vercel deployment"