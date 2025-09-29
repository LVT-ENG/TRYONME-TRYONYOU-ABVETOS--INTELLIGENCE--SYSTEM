#!/usr/bin/env bash
set -euo pipefail

### ───────── CONFIGURACIÓN ─────────
REPO="LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
BRANCH="main"
DEST="$HOME/tryonyou-app"
COMMIT_MSG="🚀 Deploy completo TRYONYOU – ABVETOS – ULTIMATUM"
DOMAIN="www.tryonyou.app"

: "${VERCEL_TOKEN:?Debes exportar VERCEL_TOKEN primero}"
: "${VERCEL_PROJECT_ID:?Debes exportar VERCEL_PROJECT_ID primero}"
: "${VERCEL_ORG_ID:?Debes exportar VERCEL_ORG_ID primero}"

### ───────── CLONAR O ACTUALIZAR ─────────
if [ ! -d "$DEST" ]; then
  echo "📂 Clonando repo oficial..."
  git clone -b $BRANCH "https://github.com/$REPO.git" "$DEST"
else
  echo "📂 Repo ya existe, actualizando..."
  cd "$DEST"
  git fetch origin
  git checkout $BRANCH
  git pull origin $BRANCH
fi

cd "$DEST"

### ───────── COPIAR ARCHIVOS NUEVOS ─────────
echo "📦 Copiando assets de deploy (intro Pau, configs, etc.)..."
# Ejemplo: si tus archivos están en ~/deploy_inbox
rsync -avh ~/deploy_inbox/ ./ --update

### ───────── COMMIT Y PUSH ─────────
git add .
git commit -m "$COMMIT_MSG" || echo "✅ Nada nuevo que commitear"
git push origin $BRANCH

### ───────── DEPLOY EN VERCEL ─────────
echo "🚀 Lanzando deploy en Vercel..."
vercel --prod   --token "$VERCEL_TOKEN"   --confirm   --scope "$VERCEL_ORG_ID"   --project "$VERCEL_PROJECT_ID"

### ───────── CONFIRMAR DOMINIO ─────────
echo "🌍 Verifica dominio:"
echo "   https://$DOMAIN"
