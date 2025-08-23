#!/bin/bash
set -e

# ================================
# TRYONME / TRYONYOU Deploy Script
# ================================

# Ruta del proyecto
PROJECT_PATH="/Users/mac/Library/Mobile Documents/com~apple~CloudDocs/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
cd "$PROJECT_PATH"

echo "📥 Actualizando GitHub..."
git fetch origin
git pull origin main --rebase || true
git add .
git commit -m "update: Tryonme Tryonyou Fashion Intelligence System" || true
git push origin main || git push origin main --force

echo "📦 Instalando dependencias..."
npm install || true

echo "⚡ Configurando credenciales..."
export VERCEL_TOKEN="t9mc4kHGRS0VTWBR6qtJmvOw"
export VERCEL_PROJECT_ID="prj_Wkq9CQEn6RJr3x7AMpNkbIZZ22AX4"
export VERCEL_ORG_ID="team_SDhjSkxLVE7oJ3S5KPkwG9uC"

echo "🚀 Desplegando en Vercel..."
npx vercel --prod --yes \
  --token=$VERCEL_TOKEN \
  --org-id=$VERCEL_ORG_ID \
  --project-id=$VERCEL_PROJECT_ID

echo "✅ Deploy Tryonme Tryonyou completado con éxito"
