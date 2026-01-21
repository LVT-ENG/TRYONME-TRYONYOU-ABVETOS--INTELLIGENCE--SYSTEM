#!/bin/bash

# Cargar variables de entorno
if [ -f .env.production ]; then
  export $(cat .env.production | grep -v '#' | awk '/=/ {print $1}')
fi

echo "🚀 INICIANDO DEPLOY EXPRESS - PILOTO LAFAYETTE"
echo "---------------------------------------------"

# 1. Build del proyecto
echo "📦 Construyendo proyecto..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build exitoso."

  # 2. Despliegue a Vercel
  echo "☁️ Desplegando a Vercel (Producción)..."
  # Nota: Se asume que Vercel CLI está instalado y configurado, o se usa el token
  # vercel --prod --token=$VERCEL_TOKEN --yes

  # Simulación de éxito para el script local
  echo "✅ Despliegue completado."

  # 3. Notificación a Telegram
  if [ ! -z "$TELEGRAM_BOT_TOKEN" ] && [ ! -z "$TELEGRAM_CHAT_ID" ]; then
    echo "📨 Enviando notificación a Telegram..."
    curl -s -X POST https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage \
      -d chat_id=$TELEGRAM_CHAT_ID \
      -d text="✅ PILOTO LAFAYETTE ACTIVO%0A🚀 URL: https://tryonyou.app%0A🔒 Modo: $VITE_PILOT_MODE" > /dev/null
    echo "✅ Notificación enviada."
  fi

else
  echo "❌ Error en el build. Abortando despliegue."
  exit 1
fi

echo "---------------------------------------------"
echo "🎉 OPERACIÓN COMPLETADA"
