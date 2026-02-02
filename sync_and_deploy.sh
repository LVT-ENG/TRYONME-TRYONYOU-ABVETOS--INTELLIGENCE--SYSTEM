#!/bin/bash

# ============================================================================
# TRYONYOU MAX PRO SYNCHRONIZATION AND DEPLOYMENT
# Rebase refactor-mirrors-logic on main and deploy to Vercel
# ============================================================================

set -e  # Exit on error

# --- CONFIGURACIÓN DE SEGURIDAD ---
# Asegúrate de tener GITHUB_TOKEN y VERCEL_TOKEN definidos en el entorno
export REPO_URL="https://x-access-token:${GITHUB_TOKEN}@github.com/tryonme-tryonyou-abvetos-intelligen.git"

# --- 1. SINCRONIZACIÓN 'MAX PRO' (REBASE) ---
echo "🚀 Iniciando Sincronización Pro..."
git remote set-url origin $REPO_URL
git fetch origin

# Nos movemos a la rama del refactor y ponemos los 22 commits encima de main
git checkout refactor-mirrors-logic
git rebase origin/main

# --- 2. INYECCIÓN DE VARIABLES (ULTIMATUM) ---
echo "🔑 Inyectando secretos en Vercel..."
# Configura las keys en la nube para el piloto comercial
echo -n $GOOGLE_GENAI_KEY | vercel env add GOOGLE_GENAI_KEY production --token $VERCEL_TOKEN
echo -n $STRIPE_SECRET_KEY | vercel env add STRIPE_SECRET_KEY production --token $VERCEL_TOKEN

# Genera el .env local para respaldo
cat << EOF > .env
GOOGLE_GENAI_KEY=$GOOGLE_GENAI_KEY
STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
EOF

# --- 3. DESPLIEGUE FINAL ---
echo "📦 Ejecutando deploy_ultimatum.sh..."
chmod +x ./deploy_ultimatum.sh
./deploy_ultimatum.sh --token $VERCEL_TOKEN

echo "✅ Proceso completado: Piloto desplegado y actualizado."
