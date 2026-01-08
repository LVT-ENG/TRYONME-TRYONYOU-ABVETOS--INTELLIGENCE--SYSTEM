#!/bin/bash
# Script para exportar todos los assets de public/assets a otro proyecto destino
# Uso: ./export_assets.sh /ruta/al/otro/proyecto

SRC="$(dirname "$0")/public/assets"
DEST="$1/public/assets"

if [ -z "$1" ]; then
  echo "Uso: $0 /ruta/al/otro/proyecto"
  exit 1
fi

if [ ! -d "$SRC" ]; then
  echo "No se encontró la carpeta de assets en $SRC"
  exit 2
fi

mkdir -p "$DEST"
rsync -av --progress "$SRC/" "$DEST/"

echo "\n✅ Assets copiados a: $DEST"
