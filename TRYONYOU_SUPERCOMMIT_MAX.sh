#!/bin/bash
# PROTOCOLO AGENTE 70 - CONTROL TOTAL
TOKEN=$1

if [ -z "$TOKEN" ]; then
    echo "❌ ERROR: Acceso denegado. Falta el Token de Vercel."
    exit 1
fi

echo "🕵️  Activando Protocolo Agente 70..."

# Limpieza profunda antes del despliegue
rm -rf .vercel dist node_modules/.cache

# Despliegue con variables de entorno comerciales
vercel deploy --token "$TOKEN" --prod --yes \
    --build-env NODE_ENV=production \
    --build-env JULES_PILOT_MODE=commercial

# Borrar rastro del comando para proteger el Token
history -c
echo "✅ AGENTE 70: El sistema Jules está operativo y publicado."
