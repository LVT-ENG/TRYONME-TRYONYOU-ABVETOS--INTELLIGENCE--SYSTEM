#!/bin/bash
set -e
echo "🚀 TRYONYOU–ABVETOS AUTO-DEPLOY v3 — iniciado"

PROJECT_DIR="$HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX"
ORG_ID="team_7d968ah5fE123abcXYZ"
PROJECT_NAME="TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM"

cd "$PROJECT_DIR" || { echo "❌ No se encontró carpeta $PROJECT_DIR"; exit 1; }

if ! command -v vercel &>/dev/null; then
  echo "📦 Instalando Vercel CLI..."
  npm install -g vercel
fi

read -p "👉 Pega tu token de Vercel (equipo LVT-ENG): " VERCEL_TOKEN
echo "🔍 Verificando token..."
if ! npx vercel whoami --token="$VERCEL_TOKEN" &>/dev/null; then
  echo "❌ Token inválido o no pertenece al equipo LVT-ENG."
  echo "Crea uno nuevo en: https://vercel.com/account/tokens"
  exit 1
fi
echo "✅ Token verificado."

echo "⚙️ Instalando dependencias..."
npm install --no-audit --progress=false
npm run build

echo "🚀 Desplegando en producción..."
DEPLOY_OUTPUT=$(npx vercel deploy --prod --token="$VERCEL_TOKEN" --yes --scope="$ORG_ID" 2>&1)
SITE_URL=$(echo "$DEPLOY_OUTPUT" | grep -Eo "https://[a-zA-Z0-9.-]*\.vercel\.app" | head -n 1 || echo "no encontrada")
echo "🌍 Sitio desplegado: $SITE_URL"

echo "✅ DEPLOY COMPLETO — $PROJECT_NAME"
