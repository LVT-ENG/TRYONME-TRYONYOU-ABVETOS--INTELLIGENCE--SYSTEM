#!/bin/bash
set -e

# ---------------------------
# CONFIGURACIÓN
# ---------------------------
REPO="LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"

# Variables de Vercel (deben estar exportadas antes de correr)
: "${VERCEL_TOKEN:?Necesitas definir VERCEL_TOKEN}"
: "${VERCEL_ORG_ID:?Necesitas definir VERCEL_ORG_ID}"
: "${VERCEL_PROJECT_ID:?Necesitas definir VERCEL_PROJECT_ID}"

# ---------------------------
# 1. Instalar GitHub CLI
# ---------------------------
if ! command -v gh &> /dev/null
then
  echo "⚙️ Instalando GitHub CLI..."

  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo apt update
    sudo apt install -y curl git
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \
      sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
    sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] \
    https://cli.github.com/packages stable main" | \
      sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
    sudo apt update
    sudo apt install gh -y
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    brew install gh
  else
    echo "❌ Sistema no soportado automáticamente. Instala gh manualmente."
    exit 1
  fi
else
  echo "✅ GitHub CLI ya instalado."
fi

# ---------------------------
# 2. Autenticación GitHub
# ---------------------------
echo "🔑 Iniciando sesión en GitHub..."
gh auth login --hostname github.com --web --scopes "repo,workflow"

# ---------------------------
# 3. Instalar App de Manus
# ---------------------------
echo "📦 Instalando App de Manus en $REPO..."
gh app install manus --owner LVT-ENG --repo TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM || \
echo "⚠️ Revisa que la App de Manus esté disponible en GitHub Marketplace."

# ---------------------------
# 4. Configurar permisos de workflows
# ---------------------------
echo "⚙️ Activando GitHub Actions y permisos..."
gh api -X PUT repos/$REPO/actions/permissions \
  -f enabled=true \
  -f allowed_actions=all

gh api -X PUT repos/$REPO/actions/permissions/workflow \
  -f can_approve_pull_request_reviews=true

# ---------------------------
# 5. Desbloquear environment production
# ---------------------------
echo "⚙️ Desbloqueando environment production..."
gh api -X PUT repos/$REPO/environments/production \
  -f wait_timer=0 \
  -f reviewers="[]" \
  -f deployment_branch_policy='{"protected_branches":false,"custom_branch_policies":false}'

# ---------------------------
# 6. Configurar secretos de Vercel
# ---------------------------
echo "🔐 Añadiendo secretos de Vercel..."
gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN" --repo $REPO
gh secret set VERCEL_ORG_ID --body "$VERCEL_ORG_ID" --repo $REPO
gh secret set VERCEL_PROJECT_ID --body "$VERCEL_PROJECT_ID" --repo $REPO

# ---------------------------
# FIN
# ---------------------------
echo "🎉 Setup completo: Manus instalado, workflows habilitados, environment desbloqueado y secretos listos."
