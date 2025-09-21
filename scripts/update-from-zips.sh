#!/usr/bin/env bash
# update-from-zips.sh
# Script para procesar archivos ZIP y desplegar automáticamente
# Versión migrada a GitHub Actions: .github/workflows/update-from-zips.yml

set -euo pipefail

### ───────── CONFIG GENERAL ─────────
REPO_PATH="$(pwd)"
TMP_DIR="/tmp/tryonyou_incoming"
COMMIT_MSG="Integración de archivos externos (Manu + otros) en proyecto oficial (Ultimátum)"

echo "🔧 Iniciando procesamiento de ZIPs en: $REPO_PATH"

### ───────── VALIDACIONES ─────────
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Ejecuta desde la raíz del repositorio."
    exit 1
fi

# Verificar que existan archivos ZIP
if ! ls *.zip 1> /dev/null 2>&1; then
    echo "❌ No se encontraron archivos ZIP en el directorio actual"
    exit 1
fi

### ───────── PROCESO ─────────
mkdir -p "$TMP_DIR"
echo "➤ Creando carpeta temporal: $TMP_DIR"
rm -rf "$TMP_DIR"/*

echo "➤ Procesando archivos ZIP..."
cd "$REPO_PATH"

for zip in *.zip; do
    if [ -f "$zip" ]; then
        echo "➤ Descomprimiendo $zip"
        unzip -o "$zip" -d "$TMP_DIR/extracted"
    fi
done

if [ ! -d "$TMP_DIR/extracted" ]; then
    echo "❌ No se extrajo ningún contenido de los ZIPs"
    exit 1
fi

echo "➤ Sincronizando con el repositorio..."
rsync -avh "$TMP_DIR/extracted/" "$REPO_PATH/" --ignore-existing
rsync -avh "$TMP_DIR/extracted/" "$REPO_PATH/" --update

echo "➤ Aplicando cambios a Git..."
git add .

if git diff --cached --quiet; then
    echo "ℹ️ No hay cambios que commitear"
else
    git commit -m "$COMMIT_MSG"
    git push origin main
    echo "✅ Cambios aplicados y enviados al repositorio"
fi

### ───────── BUILD Y DEPLOY ─────────
echo "➤ Instalando dependencias y compilando..."
npm install
npm run build

### ───────── DEPLOY EN VERCEL ─────────
echo "➤ Verificando configuración de Vercel..."

if [ -z "${VERCEL_TOKEN:-}" ]; then
    echo "❌ Error: VERCEL_TOKEN no está configurado"
    echo "Configura las variables de entorno necesarias:"
    echo "- VERCEL_TOKEN"
    echo "- VERCEL_PROJECT_ID" 
    echo "- VERCEL_ORG_ID"
    echo "- TELEGRAM_BOT_TOKEN (opcional)"
    echo "- TELEGRAM_CHAT_ID (opcional)"
    exit 1
fi

echo "➤ Lanzando deploy en Vercel..."
DEPLOY_OUTPUT=$(npx vercel --prod --token "$VERCEL_TOKEN" --confirm \
    --project "$VERCEL_PROJECT_ID" --scope "$VERCEL_ORG_ID" 2>&1)

echo "$DEPLOY_OUTPUT"
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -Eo 'https://[a-zA-Z0-9./_-]+\.vercel\.app' | tail -n1)

if [ -n "$DEPLOY_URL" ]; then
    echo "✅ Deploy completado: $DEPLOY_URL"
else
    echo "❌ No se pudo obtener la URL de deployment"
    exit 1
fi

### ───────── NOTIFICACIÓN TELEGRAM ─────────
if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ]; then
    echo "➤ Enviando notificación a Telegram..."
    MESSAGE="✅ Deploy completado\nRepo: TRYONYOU–ULTIMATUM\nCommit: $COMMIT_MSG\nURL: $DEPLOY_URL"
    
    RESPONSE=$(curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d chat_id="${TELEGRAM_CHAT_ID}" \
        -d text="$MESSAGE")
    
    if echo "$RESPONSE" | grep -q '"ok":true'; then
        echo "✅ Notificación enviada a Telegram"
    else
        echo "❌ Error enviando notificación a Telegram"
    fi
else
    echo "ℹ️ Notificación de Telegram no configurada (TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID faltantes)"
fi

### ───────── LIMPIEZA ─────────
echo "➤ Limpiando archivos temporales..."
rm -rf "$TMP_DIR"

echo "✔️ Proceso terminado exitosamente."