#!/usr/bin/env bash
set -e

# 🚀 Script de despliegue rápido TRYONYOU
# Uso: ./deploy.sh "mensaje del commit"

# Mensaje de commit (por defecto si no se pasa)
MSG=${1:-"🚀 Update rápido TRYONYOU"}

# Asegurarse de estar en main
git checkout main || git checkout -b main

# Añadir cambios
git add .

# Crear commit
git commit -m "$MSG" || echo "⚠️ No hay cambios nuevos para commitear"

# Subir a GitHub
git push origin main

echo "✅ Cambios subidos al repo oficial"
echo "🌍 Verifica en: https://tryonyou.app"
