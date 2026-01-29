#!/bin/bash
# PROTOCOLO AGENTE 70 - V7 COMMERCIAL

# Recuperar el token del primer argumento
VERCEL_TOKEN="$1"

# Validación de seguridad
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ ERROR: Jules, debes proporcionar el token como argumento."
    echo "Uso: ./TRYONYOU_SUPERCOMMIT_MAX.sh <TOKEN>"
    exit 1
fi

echo "🚀 Agente 70: Publicando en jules-pilot-galeries-lafayette..."

# 1. Limpieza y preparación
echo "🧹 Limpiando caché de builds anteriores..."
rm -rf .vercel dist

# 2. Despliegue directo a producción
# Se pasan las variables JULES_PILOT_MODE para activar la 'Matemática Invisible'
vercel deploy --token "$VERCEL_TOKEN" --prod --yes \
    --name jules-pilot-galeries-lafayette \
    --build-env NODE_ENV=production \
    --build-env JULES_PILOT_MODE=commercial \
    --build-env APP_VERSION=V7

# 3. Verificación de éxito
if [ $? -eq 0 ]; then
    echo "----------------------------------------------"
    echo "✅ DESPLIEGUE EXITOSO: El espejo V7 ya está live."
    echo "----------------------------------------------"
    # Borrar rastro del historial por seguridad extrema
    history -c
else
    echo "❌ Error en el despliegue. Jules, revisa los logs en Vercel."
    exit 1
fi
