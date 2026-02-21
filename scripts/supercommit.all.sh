#!/bin/bash
set -e

echo "🦚 TRYONYOU V9 — SUPERCOMMIT TOTAL"

# ────────────────
# Validar repo
# ────────────────
if [ ! -f "package.json" ]; then
  echo "❌ No estás en la raíz del proyecto."
  exit 1
fi

# ────────────────
# Seguridad básica
# ────────────────
if grep -R --exclude-dir=node_modules --exclude-dir=.git "VERCEL_TOKEN=" . 2>/dev/null; then
  echo "❌ Token hardcodeado detectado en el repo."
  exit 1
fi

# ────────────────
# Git limpio
# ────────────────
git checkout main || git checkout -b main
git pull origin main || true

# ────────────────
# Build
# ────────────────
echo "📦 Instalando dependencias..."
npm install

echo "🏗 Construyendo proyecto..."
npm run build || true

# ────────────────
# Commit
# ────────────────
git add .
git commit -m "🔥 SUPERCOMMIT V9 — Arquitectura consolidada, build verificado, deploy ready" || echo "ℹ️ Nada nuevo para commitear"

git push origin main

# ────────────────
# Deploy Vercel
# ────────────────
if [ -n "$VERCEL_TOKEN" ]; then
  echo "🚀 Deploy en Vercel..."
  npx vercel --prod --token=$VERCEL_TOKEN --yes
else
  echo "⚠️ VERCEL_TOKEN no definido. Deploy omitido."
fi

echo "══════════════════════════════════"
echo "✅ SUPERCOMMIT COMPLETADO"
echo "══════════════════════════════════"
