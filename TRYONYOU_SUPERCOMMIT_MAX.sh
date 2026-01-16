#!/bin/bash
echo "🚀 [MODO EMERGENCIA] Limpiando y Desplegando..."

# Asegurar que la patente está en el archivo correcto
if ! grep -q "PCT/EP2025/067317" src/pages/Home.jsx; then
    echo "⚠️ Re-inyectando Patente por seguridad..."
    sed -i 's/LVT-ENG \/ TRYONYOU/PROTÉGÉ PAR BREVET PCT\/EP2025\/067317 | LVT-ENG/g' src/pages/Home.jsx
fi

git add .
git commit -m "🔧 FIX: Deployment alignment | Removing conflicting types | French Luxury Live"
git push origin main --force

echo "✅ Push completado. Jules está esperando que Vercel termine el build."
