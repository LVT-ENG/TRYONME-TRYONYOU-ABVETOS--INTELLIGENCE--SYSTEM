#!/bin/bash
set -e

# 🧠 DEPLOY_EXPRESS.sh - Despliegue automático del dossier de patente TRYONYOU
# Este script extrae el ZIP maestro de patente en un directorio de despliegue

echo "🧠 Desplegando dossier de patente TRYONYOU..."

# Verificar que se pasó un argumento con la ruta del ZIP
if [ -z "$1" ]; then
  echo "❌ Error: Debe especificar la ruta al archivo ZIP"
  echo "Uso: ./DEPLOY_EXPRESS.sh /ruta/al/ZIP_MAESTRO_TRYONYOU.zip"
  exit 1
fi

ZIP_PATH="$1"

# Verificar que el archivo existe
if [ ! -f "$ZIP_PATH" ]; then
  echo "❌ Error: El archivo ZIP no existe: $ZIP_PATH"
  exit 1
fi

# Crear directorio de despliegue
DEPLOY_DIR="./tryonyou_patente_deploy"
echo "📁 Creando directorio de despliegue: $DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# Extraer el ZIP
echo "📦 Extrayendo contenido del ZIP maestro..."
unzip -o "$ZIP_PATH" -d "$DEPLOY_DIR"

# Verificar extracción exitosa (innecesario con set -e; asumimos éxito si llegamos aquí)
echo "✅ Despliegue completado exitosamente en $DEPLOY_DIR"
echo ""
echo "📋 Contenido desplegado:"
ls -lh "$DEPLOY_DIR"

echo ""
echo "🎉 Dossier de patente TRYONYOU-ABVETOS-ULTRA-PLUS desplegado correctamente"
