#!/bin/bash
# --- TRYONYOU: FLUJO UNIFICADO DE DEPLOYMENT FINAL ---

# Asegura que el script se detenga si ocurre un error
set -e

echo "================================================"
echo "TRYONYOU - DEPLOYMENT FINAL UNIFICADO"
echo "================================================"

# 1. CREACIÓN DE ESTRUCTURA DE CARPETAS Y ARCHIVOS PLACEHOLDER
echo "1. Creando estructura de carpetas (public/assets/fusion_media) y placeholders..."
mkdir -p public/assets/fusion_media public/assets/photos
# Crea archivos vacíos como placeholders. El script Python emitirá una ADVERTENCIA si están vacíos, pero CONTINUARÁ.
touch public/assets/fusion_media/PIAPCOC_Avatar_Model.glb
touch public/assets/fusion_media/ABVETOS_3D_Fusion.mp4
echo "✅ Placeholders PIAPCOC y ABVETOS creados."

# 2. VERIFICACIÓN DE DEPENDENCIAS
echo "2. Verificando dependencias de Node..."
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias de Node (npm install)..."
    npm install
else
    echo "✅ Dependencias ya instaladas."
fi

# 3. EJECUCIÓN DEL FLUJO UNIFICADO (BUILD + DEPLOY)
echo "3. Ejecutando el comando final: npm run deploy:final..."
npm run deploy:final

# 4. VERIFICACIÓN DEL RESULTADO
if [ -f "TRYONYOU_PRODUCTO_VENDIBLE.zip" ]; then
    echo ""
    echo "================================================"
    echo "✅ DESPLIEGUE COMPLETO"
    echo "El archivo vendible está en la raíz:"
    echo "   TRYONYOU_PRODUCTO_VENDIBLE.zip"
    echo "================================================"
else
    echo ""
    echo "================================================"
    echo "❌ ERROR: El archivo ZIP no se generó correctamente"
    echo "================================================"
    exit 1
fi
