#!/bin/bash
set -e
echo "🧹 Iniciando limpieza profunda..."
rm -rf node_modules package-lock.json dist .DS_Store
find . -name "*.pyc" -delete
find . -name "__pycache__" -delete

echo "📦 Reinstalando dependencias limpias..."
npm install
pip3 install -r requirements.txt --quiet

echo "🔄 Sincronizando con GitHub (Master Truth)..."
git add .
git commit -m "💎 TRYONYOU v1.0.0 - PRODUCTION READY: Biometrics, AI Agents & Unified Monorepo" || echo "No hay cambios para commit"
git push origin main --force

echo "════════════════════════════════════════════════════════════════"
echo "✅ SISTEMA CONSOLIDADO Y LIVE EN https://tryonyou.app"
echo "════════════════════════════════════════════════════════════════"
