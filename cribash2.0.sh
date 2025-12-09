#!/usr/bin/env bash
set -e

echo "=== CribaSH 2.0 — Preparando criba limpia para TRYONYOU ==="

# Ajustables
ORIG="${HOME}/DeployExpress"
LIMPIO="${HOME}/TRYONYOU_DEMO_CLEAN"
BRANCH="design/criba2.0"
ZIP_PATH="/mnt/data/archive_20251207_161946.zip"   # (archivo que subiste)
ASSETS_DIR="ASSETS-DEMO"

# 0. Comprobaciones rápidas
echo "Origen esperado: $ORIG"
if [ ! -d "$ORIG" ]; then
  echo "ATENCIÓN: Carpeta origen $ORIG no encontrada."
  echo "Introduce la ruta correcta de DeployExpress (o ENTER para cancelar):"
  read -r NEW_ORIG
  if [ -z "$NEW_ORIG" ]; then
    echo "Cancelado por usuario. Salida."
    exit 1
  fi
  ORIG="$NEW_ORIG"
fi

# 1. Crear carpeta limpia
echo "🧹 Creando carpeta limpia en: $LIMPIO"
rm -rf "$LIMPIO"
mkdir -p "$LIMPIO/$ASSETS_DIR"
mkdir -p "$LIMPIO/src" "$LIMPIO/public"

# 2. Rsync inteligente: incluye solo tipos útiles, excluye basura y grandes
echo "🔎 Copiando solo archivos esenciales (html/js/ts/css/json/svg/png/jpg)..."
rsync -av --progress "$ORIG/" "$LIMPIO/" \
  --include="*/" \
  --include="*.html" \
  --include="*.htm" \
  --include="*.js" \
  --include="*.jsx" \
  --include="*.ts" \
  --include="*.tsx" \
  --include="*.css" \
  --include="*.scss" \
  --include="*.json" \
  --include="*.png" \
  --include="*.jpg" \
  --include="*.jpeg" \
  --include="*.svg" \
  --include="*.webp" \
  --include="*.gif" \
  --include="*.ico" \
  --exclude="node_modules/" \
  --exclude=".git/" \
  --exclude="**/dist/**" \
  --exclude="**/build/**" \
  --exclude="*.log" \
  --exclude="*.tmp" \
  --exclude="*.bak" \
  --exclude="*.DS_Store" \
  --exclude="**/__MACOSX/**" \
  --exclude="**/Cache/**" \
  --exclude="*.mp4" \
  --exclude="*.mov" \
  --exclude="*.avi" \
  --exclude="*.mkv" \
  --exclude="*.zip" \
  --exclude="*.dmg" \
  --exclude="*.iso" \
  --exclude="Downloads/" \
  --delete

echo "✅ Copia inicial terminada."

# 3. Detectar archivos pesados en la fuente y listarlos (no los copiamos)
echo "📦 Buscando archivos > 200MB en origen (serán listados y movidos a /tmp/TRYONYOU_LARGE_FILES si aceptas)..."
LARGE_LIST=$(mktemp)
find "$ORIG" -type f -size +200M 2>/dev/null > "$LARGE_LIST" || true
if [ -s "$LARGE_LIST" ]; then
  echo "Se han detectado archivos grandes (>=200MB):"
  nl -ba "$LARGE_LIST"
  echo ""
  echo "¿Quieres que MUEVA esos archivos grandes a /tmp/TRYONYOU_LARGE_FILES/ (no se borran, solo se agrupan) ? (yes/no)"
  read -r MOVE_LARGE
  if [ "$MOVE_LARGE" == "yes" ]; then
    mkdir -p /tmp/TRYONYOU_LARGE_FILES
    while IFS= read -r f; do
      echo "Moviendo: $f"
      # Preserve directory structure to avoid filename collisions
      RELATIVE_PATH=$(echo "$f" | sed "s|^$ORIG/||")
      DEST_DIR=$(dirname "/tmp/TRYONYOU_LARGE_FILES/$RELATIVE_PATH")
      mkdir -p "$DEST_DIR"
      mv "$f" "$DEST_DIR/" 2>/dev/null || echo "No se pudo mover $f"
    done < "$LARGE_LIST"
    echo "👍 Archivos grandes movidos a /tmp/TRYONYOU_LARGE_FILES/"
  else
    echo "Archivos grandes no movidos."
  fi
else
  echo "No se han detectado archivos >200MB."
fi
rm -f "$LARGE_LIST"

# 4. Incluir tu ZIP interno si existe y quieres (opcional)
if [ -f "$ZIP_PATH" ]; then
  echo "Se ha encontrado un ZIP interno en: $ZIP_PATH"
  echo "¿Deseas que copie $ZIP_PATH dentro de la criba en $ASSETS_DIR/? (yes/no)"
  read -r COPYZIP
  if [ "$COPYZIP" == "yes" ]; then
    cp "$ZIP_PATH" "$LIMPIO/$ASSETS_DIR/"
    echo "ZIP copiado a $LIMPIO/$ASSETS_DIR/"
  else
    echo "ZIP no incluido."
  fi
fi

# 5. Limpieza final de archivos vacíos y permisos
echo "🧽 Eliminando directorios vacíos en la criba..."
find "$LIMPIO" -type d -empty -delete || true

# 6. Crear ZIP final de la criba
ZIP_OUT="${HOME}/TRYONYOU_DEMO_CLEAN_$(date +%Y%m%d_%H%M%S).zip"
echo "📦 Creando ZIP: $ZIP_OUT"
(cd "$LIMPIO" && zip -r "$ZIP_OUT" . > /dev/null)
echo "ZIP creado en: $ZIP_OUT"

# 7. Git init + push (pide URL del repo)
echo ""
echo "Introduce la URL del repositorio GitHub destino (ej: git@github.com:ORG/REPO.git) :"
read -r REPO_URL
if [ -z "$REPO_URL" ]; then
  echo "No se proporcionó URL. El proceso terminó dejando la criba en: $LIMPIO y el ZIP en: $ZIP_OUT"
  exit 0
fi

echo "Inicializando repo git en $LIMPIO ..."
cd "$LIMPIO"
if [ -d .git ]; then
  rm -rf .git
fi
git init
git checkout -b "$BRANCH"
git remote add origin "$REPO_URL"
git add .
git commit -m "CribaSH 2.0 — demo clean for TRYONYOU"
echo "Empujando rama $BRANCH a $REPO_URL (forzando)..."
git push -u origin "$BRANCH" --force

echo "✅ Push realizado. Rama: $BRANCH"

# 8. Crear Pull Request si gh está instalado
if command -v gh >/dev/null 2>&1; then
  echo "gh CLI detectado. ¿Quieres crear PR al main/master del repo remoto? (yes/no)"
  read -r CREATE_PR
  if [ "$CREATE_PR" == "yes" ]; then
    # intentar inferir base branch
    DEFAULT_BASE="main"
    echo "Creando PR: $BRANCH -> $DEFAULT_BASE"
    gh pr create --title "CribaSH 2.0 — demo clean (TRYONYOU)" --body "This PR adds a cleaned demo package prepared by CribaSH 2.0. Relates to issue LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1211." --base "$DEFAULT_BASE" --head "$BRANCH"
    echo "PR creado (revisa en GitHub)."
  else
    echo "No se creó PR."
  fi
else
  echo "gh CLI no detectado. Si quieres crear PR automáticamente, instala GitHub CLI (gh)."
fi

# 9. Mensajes listos para Copilot y Manus (con la URL del repo)
echo ""
echo "=== LISTO. Copia los siguientes mensajes y pégalos en Copilot y Manus ==="
echo ""
REPO_HTTP=$(echo "$REPO_URL" | sed -e 's/\.git$//; s/^git@github\.com:/https:\/\/github.com\//')
echo "Repositorio (branch): $REPO_URL (branch: $BRANCH)"
echo ""
echo "MENSAJE PARA COPILOT:"
echo "---------------------------------------------------------------"
echo "Copilot: usa el contenido del repo $REPO_HTTP/tree/$BRANCH/$ASSETS_DIR y la raíz del branch $BRANCH para reconstruir la demo navegable y la landing. Usa sólo los assets en $ASSETS_DIR y el código en la raíz. Documento de referencia: Issue LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1211."
echo "---------------------------------------------------------------"
echo ""
echo "MENSAJE PARA MANUS:"
echo "---------------------------------------------------------------"
echo "Manus: escanea el repo $REPO_HTTP/tree/$BRANCH y genera todos los assets faltantes (PNGs/Renders/SVGs) y los mockups listos para integración. Entrega un ZIP con los assets listos en la misma estructura. Usa la guía visual en brand-guidelines/."
echo "---------------------------------------------------------------"
echo ""
echo "El ZIP con la criba está en: $ZIP_OUT"
echo "La criba limpia está en: $LIMPIO"
echo ""
echo "FIN — CribaSH 2.0 completada. Si quieres que yo genere también el PR body completo listo para pegar, dime 'PR'."
