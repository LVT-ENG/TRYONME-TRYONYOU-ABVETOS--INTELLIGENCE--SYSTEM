#!/bin/bash
# MIGRACIÓN Y FUSIÓN DE ESTRUCTURA TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
# Ejecutar desde la raíz del proyecto

set -e

# 1. Crear estructura base
mkdir -p src/modules src/utils docs tests

# 2. Mover y renombrar archivos principales
# Frontend y lógica principal
[ -f src/main.jsx ] && mv src/main.jsx src/index.js
[ -f src/components/Avatar3D.jsx ] && mv src/components/Avatar3D.jsx src/modules/avatar3D.js
[ -f src/pages/AskPeacock.jsx ] && mv src/pages/AskPeacock.jsx src/modules/recomendadorPAU.js
[ -f src/utils/assets.js ] && mv src/utils/assets.js src/utils/apiClient.js

# Backend y lógica avanzada
[ -f backend/matching_engine.py ] && mv backend/matching_engine.py src/modules/comparadorTextil.js
[ -f master_brain.py ] && mv master_brain.py src/modules/botsInternos.js
[ -f master_pilot.py ] && mv master_pilot.py src/modules/botsInternos.js

# Armario solidario y pagos (si existen)
[ -f backend/main.py ] && mv backend/main.py src/modules/autoDonate.js
[ -f backend/garment_database.json ] && mv backend/garment_database.json src/modules/

# 3. Documentación
[ -f README.md ] && mv README.md docs/README.md
[ -f ASSETS_GUIDE.md ] && mv ASSETS_GUIDE.md docs/arquitectura.md
[ -f DEMO_READY.md ] && mv DEMO_READY.md docs/casos_uso.md
[ -f DEPLOYMENT_CHECKLIST.md ] && mv DEPLOYMENT_CHECKLIST.md docs/flujo_usuario.md

# 4. Pruebas
[ -f scripts/TRYONYOU_SUPERCOMMIT_MAX.sh ] && mv scripts/TRYONYOU_SUPERCOMMIT_MAX.sh tests/testAutoDonate.js

# 5. Configuración y scripts
[ -f package.json ] && cp package.json package.json
[ -f vite.config.js ] && cp vite.config.js vite.config.js
[ -f vercel.json ] && cp vercel.json vercel.json
[ -f Makefile ] && cp Makefile Makefile
[ -f deploy.sh ] && cp deploy.sh deploy.sh
[ -f .env.example ] && cp .env.example .env.example
[ -f .gitignore ] && cp .gitignore .gitignore

# 6. Limpiar archivos y carpetas obsoletos
rm -rf backend/ scripts/ public/ src/components/ src/pages/ src/assets/ src/hooks/ src/styles/ src/data/ models/

# 7. Restaurar README principal
mv docs/README.md README.md

# 8. Mensaje final

echo "\n✅ Migración y fusión completadas. Estructura lista para TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM."
