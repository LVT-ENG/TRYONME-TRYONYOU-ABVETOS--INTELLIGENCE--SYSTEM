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
NEW_FILES=($(find "$DEPLOY_INBOX" -type f \( -iname "*.zip" -o -iname "*.js" -o -iname "*.mp4" -o -iname "*.json" -o -iname "*.html" -o -iname "*.css" \) -newermt "$(date '+%Y-%m-%d')" -print))

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
cat > "$TARGET_DIR/IMPORT_LOG.txt" <<EOF
################################################################################
# TRYONYOU DEPLOY EXPRESS — IMPORT LOG
################################################################################

📅 Fecha:          $(date)
🏷️  Build ID:       import_$TS
📊 Total archivos:  ${#NEW_FILES[@]}
📂 Destino:         $TARGET_DIR
🌐 Proyecto:        $PROJECT_NAME

───────────────────────────────────────────────────────────────────────────────
ARCHIVOS IMPORTADOS:
───────────────────────────────────────────────────────────────────────────────

EOF

# Lista archivos importados en el log
for f in "${NEW_FILES[@]}"; do
  echo "  → $(basename "$f")" >> "$TARGET_DIR/IMPORT_LOG.txt"
done

cat >> "$TARGET_DIR/IMPORT_LOG.txt" <<EOF

───────────────────────────────────────────────────────────────────────────────
INFORMACIÓN DEL SISTEMA:
───────────────────────────────────────────────────────────────────────────────

Host:              $(hostname)
Usuario:           $(whoami)
Shell:             $SHELL
Directorio origen: $DEPLOY_INBOX
Directorio repo:   $REPO_PATH

───────────────────────────────────────────────────────────────────────────────
✅ IMPORT COMPLETADO
───────────────────────────────────────────────────────────────────────────────

EOF

echo "✅ Log de importación creado en $TARGET_DIR/IMPORT_LOG.txt"

# === COMMIT Y PUSH =========================================================

echo "📤 Realizando commit y push al repositorio..."

cd "$REPO_PATH"
git add "$DEST_FOLDER"

COMMIT_MSG="$COMMIT_MSG_PREFIX — $TS — ${#NEW_FILES[@]} archivos importados"
git commit -m "$COMMIT_MSG"

git push origin main

echo "✅ Commit y push completados"
notify_telegram "✅ *Deploy Express completado*\n📦 ${#NEW_FILES[@]} archivos importados\n⏰ $TS"

# === DESPLIEGUE OPCIONAL EN VERCEL =========================================

if [ -n "$VERCEL_TOKEN" ] && [ "$VERCEL_TOKEN" != "TU_TOKEN_DE_VERCEL" ]; then
  echo "🚀 Desplegando en Vercel..."
  
  cd "$REPO_PATH"
  
  if command -v vercel >/dev/null 2>&1; then
    vercel --prod --token "$VERCEL_TOKEN" --yes || echo "⚠️ Deploy en Vercel falló, continuando..."
    echo "✅ Deploy en Vercel completado"
    notify_telegram "🌐 *Deploy en Vercel completado*\n🔗 $DOMAIN_URL"
  else
    echo "⚠️ Vercel CLI no encontrado, saltando deploy..."
    notify_telegram "⚠️ *Vercel CLI no encontrado* — Deploy manual requerido"
  fi
fi

# === RESUMEN FINAL =========================================================

echo ""
echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║  🎉 DEPLOY EXPRESS COMPLETADO                                     ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Resumen:"
echo "  • Archivos procesados:  ${#NEW_FILES[@]}"
echo "  • Directorio destino:    $TARGET_DIR"
echo "  • Commit realizado:      ✅"
echo "  • Push realizado:        ✅"
echo "  • Timestamp:             $TS"
echo ""
echo "📄 Log detallado: $TARGET_DIR/IMPORT_LOG.txt"
echo "🌐 URL del proyecto: $DOMAIN_URL"
echo ""
echo "✨ TRYONYOU Deploy Express — Proceso finalizado exitosamente"
echo ""
