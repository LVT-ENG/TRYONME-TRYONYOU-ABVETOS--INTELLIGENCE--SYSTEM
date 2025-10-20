#!/bin/zsh
###############################################################################
# 🦚 TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
# DEPLOY EXPRESS AUTOMATOR — versión definitiva 2025
# Autor: Agente 70 · Sistema ABVETOS Orchestrator
###############################################################################

set -euo pipefail

# === CONFIGURACIÓN PRINCIPAL ===============================================

# 📁 Ruta de la carpeta iCloud Drive
DEPLOY_INBOX="$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"

# 📁 Ruta local del repositorio maestro
REPO_PATH="$HOME/Projects/TRYONYOU-ABVETOS-ULTRA-PLUS-ULTIMATUM"

# 📂 Carpeta destino dentro del repo
DEST_FOLDER="docs/legacy_rewrite"

# 💬 Prefijo del mensaje de commit
COMMIT_MSG_PREFIX="ABVETOS Deploy Express Auto-Commit"

# 🔑 Variables de autenticación
export VERCEL_TOKEN="${VERCEL_TOKEN:-TU_TOKEN_DE_VERCEL}"
export TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-TU_TOKEN_DEL_BOT}"
export TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-TU_ID_TELEGRAM}"

# 🌐 Información del proyecto
PROJECT_NAME="TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM"
DOMAIN_URL="https://tryonyou.app"
TS=$(date +"%Y-%m-%d_%H-%M-%S")

# === FUNCIONES =============================================================

notify_telegram () {
  local msg="$1"
  if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
    curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
      -d chat_id="$TELEGRAM_CHAT_ID" \
      -d parse_mode="Markdown" \
      -d text="$msg" >/dev/null
  fi
}

# === INICIO DEL PROCESO =====================================================

echo "🦚 TRYONYOU DEPLOY EXPRESS iniciado a las $(date)"
notify_telegram "🚀 *Deploy Express iniciado* — $(date)\nProyecto: $PROJECT_NAME"

cd "$REPO_PATH"
git pull origin main

mkdir -p "$DEST_FOLDER"

echo "📦 Buscando archivos nuevos en $DEPLOY_INBOX..."
NEW_FILES=()
while IFS= read -r -d '' file; do
  NEW_FILES+=("$file")
done < <(find "$DEPLOY_INBOX" -type f \( -iname "*.zip" -o -iname "*.js" -o -iname "*.mp4" -o -iname "*.json" -o -iname "*.html" -o -iname "*.css" \) -newermt "$(date '+%Y-%m-%d')" -print0 2>/dev/null)

if [ ${#NEW_FILES[@]} -eq 0 ]; then
  echo "⚠️ No se encontraron archivos nuevos hoy."
  notify_telegram "⚠️ *Sin archivos nuevos* en $DEPLOY_INBOX — $(date '+%H:%M')"
  exit 0
fi

# === PROCESAMIENTO DE ARCHIVOS =============================================

TARGET_DIR="$DEST_FOLDER/import_$TS"
mkdir -p "$TARGET_DIR"

echo "📥 Copiando ${#NEW_FILES[@]} archivos nuevos..."
for f in "${NEW_FILES[@]}"; do
  echo "→ Copiando: $(basename "$f")"
  cp -R "$f" "$TARGET_DIR/"
done

# Crea un archivo de log dentro del repo
cat > "$TARGET_DIR/IMPORT_LOG.txt" <<LOGEOF
═══════════════════════════════════════════════════════════════════
🦚 TRYONYOU DEPLOY EXPRESS — IMPORT LOG
═══════════════════════════════════════════════════════════════════
Timestamp: $TS
Proyecto: $PROJECT_NAME
Domain: $DOMAIN_URL

Archivos importados desde: $DEPLOY_INBOX
Cantidad: ${#NEW_FILES[@]}

Listado:
$(for f in "${NEW_FILES[@]}"; do echo "  - $(basename "$f")"; done)

═══════════════════════════════════════════════════════════════════
LOGEOF

echo "✅ Log de importación creado en $TARGET_DIR/IMPORT_LOG.txt"

# === COMMIT Y PUSH =========================================================

echo "📝 Creando commit con los archivos nuevos..."
git add "$TARGET_DIR"
git commit -m "$COMMIT_MSG_PREFIX — $TS — ${#NEW_FILES[@]} archivos importados"

echo "🚀 Subiendo cambios a GitHub..."
git push origin main

notify_telegram "✅ *Deploy Express completado*\n📦 ${#NEW_FILES[@]} archivos importados\n📂 $TARGET_DIR"

# === DESPLIEGUE AUTOMÁTICO A VERCEL ========================================

if [ "$VERCEL_TOKEN" != "TU_TOKEN_DE_VERCEL" ] && [ -n "$VERCEL_TOKEN" ]; then
  echo "🚀 Desplegando a Vercel..."
  
  # Login automático con token
  export VERCEL_ORG_ID="${VERCEL_ORG_ID:-}"
  export VERCEL_PROJECT_ID="${VERCEL_PROJECT_ID:-}"
  
  # Deploy a producción
  if command -v vercel >/dev/null 2>&1; then
    vercel --token "$VERCEL_TOKEN" --prod --yes || {
      echo "⚠️ Error en deploy de Vercel"
      notify_telegram "⚠️ *Error en deploy de Vercel*\nRevisa manualmente"
    }
    echo "✅ Deploy a Vercel completado"
    notify_telegram "🌐 *Deploy a Vercel completado*\n🔗 $DOMAIN_URL"
  else
    echo "⚠️ Vercel CLI no encontrado. Instálalo con: npm i -g vercel"
    notify_telegram "⚠️ *Vercel CLI no encontrado*\nInstálalo con: npm i -g vercel"
  fi
else
  echo "⚠️ VERCEL_TOKEN no configurado. Saltando deploy automático."
  notify_telegram "⚠️ *Deploy manual requerido*\nVERCEL_TOKEN no configurado"
fi

# === LIMPIEZA OPCIONAL =====================================================

# Opcional: mover archivos procesados a una carpeta de archivo
ARCHIVE_DIR="$DEPLOY_INBOX/_processed_$TS"
mkdir -p "$ARCHIVE_DIR"

echo "📦 Archivando archivos procesados..."
for f in "${NEW_FILES[@]}"; do
  if [ -f "$f" ]; then
    mv "$f" "$ARCHIVE_DIR/"
    echo "  ✓ Archivado: $(basename "$f")"
  fi
done

# === RESUMEN FINAL =========================================================

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🎉 DEPLOY EXPRESS COMPLETADO"
echo "════════════════════════════════════════════════════════════════"
echo "📂 Carpeta destino: $TARGET_DIR"
echo "📦 Archivos importados: ${#NEW_FILES[@]}"
echo "📝 Log: $TARGET_DIR/IMPORT_LOG.txt"
echo "🗄️  Archivos archivados en: $ARCHIVE_DIR"
echo "🌐 URL: $DOMAIN_URL"
echo "════════════════════════════════════════════════════════════════"
echo ""

notify_telegram "🎉 *Deploy Express finalizado exitosamente*\n⏰ $(date '+%H:%M:%S')"

echo "✅ Proceso completado a las $(date)"
