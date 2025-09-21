#!/bin/bash
set -e
echo "🚀 Iniciando orquestación ABVET..."

# Ir siempre al directorio raíz del repo (el padre de /scripts)
cd "$(dirname "$0")/.."

./scripts/agent_clean.sh
./scripts/agent_docs.sh
npm install
npm run build
npm run preview
./scripts/agent_push.sh
./scripts/agent_test.sh

echo "✅ Orquestación ABVET completada. Revisa Vercel para confirmar despliegue."
