#!/bin/bash
set -e

# Rutas y credenciales
PROJECT_PATH="/Users/mac/Library/Mobile Documents/com~apple~CloudDocs/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"

export VERCEL_ORG_ID="ruben-espinar-rodriguez-pro"
export VERCEL_PROJECT_ID="prj_Wkq9CQEn6RJr3x7AMpNkbIZ22AX4"
export VERCEL_TOKEN="t9mc4kHGRS0VTWBR6QtJmvOw"

# Ir al proyecto
cd "$PROJECT_PATH"

echo "📥 Actualizando GitHub..."
git fetch origin
git pull origin main --rebase || true
git add .
git commit -m "update: Deploy Tryonme Tryonyou Fashion Intelligence System" || true
git push origin main || git push origin main --force

echo "📦 Instalando dependencias..."
npm install || true

echo "🚀 Desplegando en Vercel..."
npx vercel --prod --yes --token=$VERCEL_TOKEN --org $VERCEL_ORG_ID --project $VERCEL_PROJECT_ID

echo "✅ Deploy completado con éxito en GitHub + Vercel"
