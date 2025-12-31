#!/bin/bash
set -e
echo "🦚 TRYONYOU — SuperCommit MAX — Lanzamiento Lafayette"

# Sincronizar GitHub
git add .
git commit -m "🚀 FINAL RELEASE: Ecosistema TRYONYOU totalmente operativo para Lafayette" || echo "No hay cambios para commit"
git push origin main --force

# Despliegue en Vercel
if [ -n "$VERCEL_TOKEN" ]; then
    echo "🌐 Desplegando en Vercel..."
    npx vercel --prod --token=$VERCEL_TOKEN --yes --confirm --force
else
    echo "❌ Error: Token de Vercel no detectado"
    exit 1
fi

echo "════════════════════════════════════════════════════════════════"
echo "✅ ÉXITO: SISTEMA CONSOLIDADO Y LIVE EN https://tryonyou.app"
echo "════════════════════════════════════════════════════════════════"
