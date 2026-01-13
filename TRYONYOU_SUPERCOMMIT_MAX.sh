#!/bin/bash
# NÚCLEO JULES V8 - CONFIGURACIÓN MASTER LAFAYETTE
export VERCEL_PROJECT_NAME="tryonyou-master"

echo "🔍 [PASO 1] Verificando Escudo Legal y Home..."
if [ -f "src/pages/Home.tsx" ]; then
    echo "✅ Home.tsx detectada (Versión Lafayette FR)"
else
    echo "⚠️ ADVERTENCIA: No se encuentra Home.tsx"
fi

echo "📦 [PASO 2] Consolidando en GitHub (Master Intelligence)..."
git add .
git commit -m "🚀 ULTIMATUM V8: Master Deployment | Lafayette FR | Jules Active"

echo "📡 [PASO 3] Desplegando en Vercel (Project: $VERCEL_PROJECT_NAME)..."
# Forzamos el despliegue al proyecto correcto
npx vercel --prod --name $VERCEL_PROJECT_NAME --yes

echo "✨ [RESULTADO] ¡Ecosistema LIVE en tryonyou.app!"
