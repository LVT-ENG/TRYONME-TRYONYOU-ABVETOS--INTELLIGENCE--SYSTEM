#!/bin/bash
set -e
echo "🧹 ABVET: limpieza iniciada..."
mkdir -p legacy
mv *.zip legacy/ 2>/dev/null || true
mv texto*.txt legacy/ 2>/dev/null || true
mv README_TRYONME_FINAL*.txt legacy/ 2>/dev/null || true
mv package.merged.json legacy/ 2>/dev/null || true
mv AVBETOS_repo_package legacy/ 2>/dev/null || true
echo "✅ ABVET: limpieza terminada. Archivos innecesarios movidos a /legacy"
