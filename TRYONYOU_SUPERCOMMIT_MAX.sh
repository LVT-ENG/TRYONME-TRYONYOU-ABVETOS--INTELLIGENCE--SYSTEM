#!/bin/bash
echo "🔍 [PASO 1] Verificando Escudo Legal en Home.jsx..."
if grep -q "PCT/EP2025/067317" src/pages/Home.jsx; then
    echo "✅ Patente OK"
else
    echo "⚠️ ERROR: Patente no encontrada."
    exit 1
fi

echo "📦 [PASO 2] Consolidando en GitHub..."
git add .
git commit -m "🚀 ULTIMATUM V7: Ecosistema Unificado | Jules & Pau Live | French Luxury Edition"

echo "📡 [PASO 3] Forzando Despliegue en Vercel..."
git push origin main --force
