#!/bin/bash
# Test script for TryOnYou Embed SDK

echo "🧪 Testing TryOnYou Embed SDK..."
echo "================================"

# Check if SDK files exist
if [ -f "packages/tryonyou-embed/dist/embed.js" ]; then
    echo "✅ UMD build exists"
    echo "   Size: $(du -h packages/tryonyou-embed/dist/embed.js | cut -f1)"
else
    echo "❌ UMD build missing"
fi

if [ -f "packages/tryonyou-embed/dist/embed.esm.js" ]; then
    echo "✅ ES modules build exists"
    echo "   Size: $(du -h packages/tryonyou-embed/dist/embed.esm.js | cut -f1)"
else
    echo "❌ ES modules build missing"
fi

# Check documentation
if [ -f "packages/tryonyou-embed/README.md" ]; then
    echo "✅ Documentation exists"
else
    echo "❌ Documentation missing"
fi

# Check examples
if [ -f "packages/tryonyou-embed/examples/levis-integration.html" ]; then
    echo "✅ Levi's integration example exists"
else
    echo "❌ Levi's example missing"
fi

if [ -f "packages/tryonyou-embed/examples/zara-integration.html" ]; then
    echo "✅ Zara integration example exists"
else
    echo "❌ Zara example missing"
fi

if [ -f "packages/tryonyou-embed/examples/test.html" ]; then
    echo "✅ Test page exists"
else
    echo "❌ Test page missing"
fi

# Check package.json
if [ -f "packages/tryonyou-embed/package.json" ]; then
    echo "✅ Package configuration exists"
    echo "   Name: $(grep '"name"' packages/tryonyou-embed/package.json | cut -d'"' -f4)"
    echo "   Version: $(grep '"version"' packages/tryonyou-embed/package.json | cut -d'"' -f4)"
else
    echo "❌ Package configuration missing"
fi

echo ""
echo "🚀 SDK Ready for partners like Levi's, Zara, etc."
echo "   Integration: <script src=\"https://cdn.tryonyou.app/embed.js\" data-partner-id=\"your-brand\"></script>"