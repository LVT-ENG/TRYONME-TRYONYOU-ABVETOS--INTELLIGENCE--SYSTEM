#!/bin/bash

echo "🔍 Running ABVETOS Integrity Check..."

# Check for package.json
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    exit 1
fi

# Check for src directory
if [ ! -d "src" ]; then
    echo "❌ Error: src directory not found!"
    exit 1
fi

# Check for public/assets directory
if [ ! -d "public/assets" ]; then
    echo "❌ Error: public/assets directory not found!"
    exit 1
fi

echo "✅ Integrity Check Passed."
exit 0
