#!/usr/bin/env bash
set -euo pipefail

### ───────── CONFIG ─────────
# Detect current repo path or use default
REPO_PATH="${REPO_PATH:-$(pwd)}"
# Check for ZIP source in multiple locations
ZIP_SOURCE_ORIGINAL="/mnt/data/ALL_TRYONYOU_ZIPS_ULTIMATUM.zip"
ZIP_SOURCE_ALT="$REPO_PATH/TRYONYOU-ULTIMATUM.zip"
DEST_DIR="$REPO_PATH/docs/legacy_rewrite"
COMMIT_MSG="AUTO: Integración de ALL_TRYONYOU_ZIPS_ULTIMATUM.zip en Ultimátum"

### ───────── PROCESO ─────────
echo "➤ Verificando repositorio oficial..."
if [ ! -d "$REPO_PATH/.git" ]; then
  echo "❌ Error: no se encontró el repo en $REPO_PATH"
  exit 1
fi

echo "➤ Detectando archivo ZIP fuente..."
if [ -f "$ZIP_SOURCE_ORIGINAL" ]; then
  ZIP_SOURCE="$ZIP_SOURCE_ORIGINAL"
  echo "✅ Usando ZIP fuente original: $ZIP_SOURCE"
elif [ -f "$ZIP_SOURCE_ALT" ]; then
  ZIP_SOURCE="$ZIP_SOURCE_ALT"
  echo "✅ Usando ZIP fuente alternativo: $ZIP_SOURCE"
else
  echo "❌ Error: no se encontró el archivo ZIP en ninguna ubicación"
  echo "   Buscado en: $ZIP_SOURCE_ORIGINAL"
  echo "   Buscado en: $ZIP_SOURCE_ALT"
  exit 1
fi

echo "➤ Creando carpeta destino en el repo..."
mkdir -p "$DEST_DIR"

echo "➤ Copiando ZIP maestro..."
cp "$ZIP_SOURCE" "$DEST_DIR/ALL_TRYONYOU_ZIPS_ULTIMATUM.zip"

cd "$REPO_PATH"

echo "➤ Aplicando cambios a Git..."
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "ℹ️ Trabajando en rama: $CURRENT_BRANCH"
git pull origin "$CURRENT_BRANCH" || echo "⚠️ No se pudo hacer pull, continuando..."
git add "$DEST_DIR/ALL_TRYONYOU_ZIPS_ULTIMATUM.zip"
git commit -m "$COMMIT_MSG" || echo "⚠️ No hay cambios que commitear."

echo "➤ Intentando push a origin..."
if git push origin "$CURRENT_BRANCH"; then
  echo "✅ Push exitoso"
else
  echo "⚠️ Push falló - es posible que requiera autenticación manual"
  echo "   Los cambios están committados localmente y listos para push manual"
fi

echo "✔️ Proceso terminado. El workflow de GitHub se encargará del despliegue automático."