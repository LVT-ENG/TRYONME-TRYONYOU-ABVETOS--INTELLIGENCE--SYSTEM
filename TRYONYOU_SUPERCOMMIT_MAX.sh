#!/bin/bash
echo "🔍 [PASO 1] Verificando Escudo Legal..."
if [ -f "src/pages/Footer.tsx" ]; then
    grep -q "PCT/EP2025/067317" src/pages/Footer.tsx && echo "✅ Patente OK" || echo "⚠️ FALTA PATENTE EN FOOTER"
else
    echo "⚠️ No se encuentra Footer.tsx - Verifica la ruta."
fi

echo "📦 [PASO 2] Sincronizando..."
git add .
git commit -m "🚀 ULTIMATUM V7: Ecosistema Unificado | Jules & Pau Live"

echo "📡 [PASO 3] Desplegando..."
git push origin main
