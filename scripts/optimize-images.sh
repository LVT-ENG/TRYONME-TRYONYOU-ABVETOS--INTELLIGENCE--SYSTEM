#!/bin/bash
# Script to optimize images and convert to WebP format for better performance

set -e

echo "🖼️  Optimizing images for production..."

# Create optimized directory if it doesn't exist
mkdir -p public/optimized

# Function to convert PNG to WebP
convert_to_webp() {
  local input=$1
  local output="${input%.png}.webp"
  
  if command -v cwebp &> /dev/null; then
    echo "Converting $input to WebP..."
    cwebp -q 85 "$input" -o "$output"
    echo "✅ Created $output"
  else
    echo "⚠️  cwebp not installed. Skipping WebP conversion."
    echo "   Install with: sudo apt-get install webp"
  fi
}

# Optimize PNG files
if command -v optipng &> /dev/null; then
  echo "Optimizing PNG files..."
  find public -name "*.png" -type f -exec optipng -o7 {} \;
  echo "✅ PNG optimization complete"
else
  echo "⚠️  optipng not installed. Skipping PNG optimization."
  echo "   Install with: sudo apt-get install optipng"
fi

# Optimize JPG files
if command -v jpegoptim &> /dev/null; then
  echo "Optimizing JPG files..."
  find public -name "*.jpg" -o -name "*.jpeg" -type f -exec jpegoptim --max=85 {} \;
  echo "✅ JPG optimization complete"
else
  echo "⚠️  jpegoptim not installed. Skipping JPG optimization."
  echo "   Install with: sudo apt-get install jpegoptim"
fi

# Convert large images to WebP
echo "Converting large images to WebP..."
for img in public/*.png; do
  if [ -f "$img" ]; then
    size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
    if [ "$size" -gt 500000 ]; then  # If larger than 500KB
      convert_to_webp "$img"
    fi
  fi
done

echo "✅ Image optimization complete!"
echo ""
echo "📊 Image sizes after optimization:"
du -h public/*.png public/*.webp 2>/dev/null | sort -hr || true

