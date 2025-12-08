#!/bin/bash
set -euo pipefail

echo "------------------------------------------"
echo " 🧠 LIBERANDO ESPACIO SEGURO EN EL MAC..."
echo "------------------------------------------"

# Borrar cachés del usuario
rm -rf ~/Library/Caches/* || true

# Borrar cachés del sistema
sudo rm -rf /Library/Caches/* || true

# Vaciar papelera
sudo rm -rf ~/.Trash/* || true

# Vaciar cache local de iCloud
rm -rf ~/Library/Application\ Support/iCloud/* || true

echo "------------------------------------------"
echo " ✔ ESPACIO LIBERADO"
echo "------------------------------------------"

ICLOUD="$HOME/Library/Mobile Documents/com~apple~CloudDocs"
DEST="$ICLOUD/TryonYou_Backup_Final"

echo "📁 Creando carpeta de backup final en iCloud..."
mkdir -p "$DEST"

echo "------------------------------------------"
echo " 🚀 COPIANDO TODO A ICLOUD (menos deploy express y tryon-app)..."
echo "------------------------------------------"

rsync -avh --progress \
  --exclude 'deploy express/' \
  --exclude 'tryon-app/' \
  --exclude 'Library/' \
  --exclude 'Applications/' \
  "$HOME/" "$DEST/"

echo "------------------------------------------"
echo " ✔ COPIA COMPLETADA EN ICLOUD"
echo "------------------------------------------"

echo "------------------------------------------"
echo " 🧹 BORRANDO TODO DEL MAC (menos deploy express y tryon-app)..."
echo "------------------------------------------"

find "$HOME" -mindepth 1 -maxdepth 1 \
  ! -name "deploy express" \
  ! -name "tryon-app" \
  ! -name "Library" \
  ! -name "Applications" \
  -exec rm -rf {} \;

echo "------------------------------------------"
echo " 🎉 MAC LIMPIO Y ICLOUD COMPLETO"
echo "------------------------------------------"
echo " ✔ SOLO QUEDA deploy express Y tryon-app EN EL MAC"
echo "------------------------------------------"

