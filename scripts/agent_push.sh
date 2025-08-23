#!/bin/bash
set -e
echo "⬆️ ABVET: preparando push a GitHub..."
git add .
git commit -m "AgentPush: actualización completa de documentación, limpieza y estructura"
git push origin main
echo "✅ ABVET: cambios subidos a GitHub. Vercel desplegará automáticamente."
