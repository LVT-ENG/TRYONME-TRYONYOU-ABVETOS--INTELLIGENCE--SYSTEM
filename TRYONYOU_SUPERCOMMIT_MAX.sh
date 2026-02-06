#!/bin/bash
set -e
echo "🦚 INICIANDO SUPERCOMMIT MAX (Protocolo V7)..."

# Verificación de seguridad
if [ ! -f "package.json" ]; then
    echo "❌ Error: No veo 'package.json'. ¿Estás en la carpeta correcta?"
    exit 1
fi

# Safety Lint (Protocolo Zero Tallas)
echo "🛡️  Ejecutando Protocolo Zero Tallas..."
# Excluimos node_modules por si acaso, aunque el grep es sobre src/
if grep -rE "peso|talla|weight|size" src/ > /dev/null 2>&1; then
    echo "❌ ERROR CRÍTICO: Se detectaron términos prohibidos (peso, talla, weight, size) en src/"
    grep -rE "peso|talla|weight|size" src/
    exit 1
else
    echo "✅ Safety Lint Aprobado: Sin términos prohibidos."
fi

# Regeneración de Inventario
echo "🔄 Regenerando inventario..."
python3 regenerate_inventory.py

# Limpieza de temporales para asegurar build limpio
echo "🧹 Limpiando caché, node_modules y builds antiguos..."
rm -rf dist .next node_modules

# Git: Sincronización
echo "📦 Sincronizando con GitHub..."
git checkout main 2>/dev/null || git checkout -b main
git add .
git commit -m "🔥 SUPERCOMMIT MAX: Pilot Lafayette V7.1 Final Release" || echo "⚠️ Nada nuevo que guardar"
git push origin main

# Deploy Vercel
if [ -n "$VERCEL_TOKEN" ]; then
    echo "☁️ Desplegando en Vercel Producción..."
    # Usamos npx para no depender de instalación global
    npx vercel --prod --token=$VERCEL_TOKEN --yes --force
else
    echo "⚠️ VERCEL_TOKEN no detectado. Solo se hizo Push a GitHub."
fi

echo ""
echo "✅ TODO LISTO: Código en GitHub y Deploy iniciado."
echo "👉 Monitoriza el deploy en: https://vercel.com/dashboard"
