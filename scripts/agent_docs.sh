#!/bin/bash
set -e
echo "📑 ABVET: organización de documentación..."
mkdir -p docs/patents
mkdir -p legacy/patents_old
mv docs/patents/* legacy/patents_old/ 2>/dev/null || true
cp ~/Desktop/TRYONME-TRYONYOU-ULTRA-AVBET/aqui/*.pdf docs/patents/ 2>/dev/null || true
mv docs/patents/11_INTERNAL_NOTES.pdf legacy/ 2>/dev/null || true
mv ~/Desktop/TRYONME-TRYONYOU-ULTRA-AVBET/aqui/Env.secrets legacy/ 2>/dev/null || true
echo "Env.secrets" >> .gitignore
echo "✅ ABVET: documentación organizada en /docs/patents y secretos protegidos"
