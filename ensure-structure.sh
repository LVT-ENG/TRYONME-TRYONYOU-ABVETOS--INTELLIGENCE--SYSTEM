#!/bin/bash

# Crear carpeta src si no existe
echo "🏗️  Ensuring directory structure..."
mkdir -p src public/video

echo "✅ Directories created:"
echo "   - src/ $([ -d src ] && echo '✓' || echo '✗')"
echo "   - public/ $([ -d public ] && echo '✓' || echo '✗')"
echo "   - public/video/ $([ -d public/video ] && echo '✓' || echo '✗')"

echo "🧱 Directory structure ready!"

# Verificar que App.jsx existe
if [ -f "src/App.jsx" ]; then
    echo "✅ src/App.jsx exists"
else
    echo "❌ src/App.jsx does not exist"
fi