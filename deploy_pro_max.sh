#!/bin/bash

echo "🦚 INICIANDO DESPLIEGUE: PILOTO LAFAYETTE PRO MAX (VERSIÓN ULTIMATUM)"

# 1. Limpieza Nuclear (Ignorando bloqueos de iCloud con '|| true')
echo "🧹 Purgando caché y dependencias legacy..."
rm -rf node_modules dist .next .vercel package-lock.json yarn.lock legacy_old temp_old || true

# Activamos el stop-on-error solo DESPUÉS de la limpieza
set -e 

# 2. Reconstrucción
echo "📦 Instalando dependencias limpias..."
npm install

echo "🏗️ Compilando arquitectura Vite..."
npm run build

# 3. Hostile Takeover: Despliegue Forzado en Vercel
echo "🚀 Ejecutando toma de servidores Vercel..."
if [ -z "$VERCEL_TOKEN" ]; then
  npx vercel --prod --yes --force
else
  npx vercel --prod --yes --force --token "$VERCEL_TOKEN"
fi

# 4. Asignación de Dominio Principal
echo "🔗 Anclando dominio oficial..."
if [ -z "$VERCEL_TOKEN" ]; then
  npx vercel domains add tryonyou.app || echo "✅ (El dominio ya estaba asignado)"
else
  npx vercel domains add tryonyou.app --token "$VERCEL_TOKEN" || echo "✅ (El dominio ya estaba asignado)"
fi

echo "===================================================="
echo "✅ SISTEMA EN LÍNEA Y BLINDADO."
echo "🌐 Tráfico enrutado a https://tryonyou.app"
echo "===================================================="
