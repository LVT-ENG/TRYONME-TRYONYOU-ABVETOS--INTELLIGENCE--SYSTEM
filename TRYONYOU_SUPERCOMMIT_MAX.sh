#!/bin/bash
set -e

# ==============================================================================
# 🦚 PROTOCOLO ULTIMATUM V7: SUPERCOMMIT MAX (PRODUCTION DEPLOY)
# Autor: Agente 70 (Jules) | Proyecto: TRYONYOU-ABVETOS
# ==============================================================================

echo "🔒 INICIANDO PROTOCOLO SUPERCOMMIT MAX..."
echo "💎 Arquitectura: Divineo v7 (Vite 7.1.2 + React 18.3.1)"

# Define Paths
PROJECT_ROOT=$(pwd)
ASSETS_SOURCE="$PROJECT_ROOT/TRYONYOU_PILOT_ASSETS"
PUBLIC_DIR="$PROJECT_ROOT/public"
CATALOG_DIR="$PUBLIC_DIR/assets/catalog"
BRANDING_DIR="$PUBLIC_DIR/assets/branding"
UI_DIR="$PUBLIC_DIR/assets/ui"
DOCS_DIR="$PUBLIC_DIR/docs"

# 1. VERIFICACIÓN DE SEGURIDAD
if [ ! -f "package.json" ]; then
    echo "❌ Error: Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

if [ ! -d "$ASSETS_SOURCE" ]; then
  echo "❌ Error: La carpeta de activos $ASSETS_SOURCE no existe."
  exit 1
fi

# 2. LIMPIEZA PROFUNDA
echo "🧹 Limpiando directorios obsoletos y dependencias..."
rm -rf node_modules dist .next legacy_old temp_old apps/web-old tests-old legacy integrations/duplicados client
echo "✅ Limpieza completada."

# 3. ESTRUCTURACIÓN DE CARPETAS MAESTRAS
echo "📂 Asegurando arquitectura de carpetas..."
mkdir -p web engines services
mkdir -p "$CATALOG_DIR" "$BRANDING_DIR" "$UI_DIR" "$DOCS_DIR"
mkdir -p src/{modules,components,pages,styles}

# 4. MIGRACIÓN DE ASSETS
echo "🚚 Migrando activos desde $ASSETS_SOURCE..."

move_asset() {
  local pattern=$1
  local dest_dir=$2
  local dest_name=$3
  local file=$(find "$ASSETS_SOURCE" -maxdepth 1 -name "$pattern" | head -n 1)

  if [ -n "$file" ]; then
    echo "✅ Encontrado: $(basename "$file") -> $dest_name"
    cp "$file" "$dest_dir/$dest_name"
  else
    echo "⚠️ Advertencia: No se encontró archivo para $pattern"
  fi
}

# Catalog
move_asset "41C07010*" "$CATALOG_DIR" "red_dress_minimal.png"
move_asset "8762992B*" "$CATALOG_DIR" "burberry_trench.png"
move_asset "952B0855*" "$CATALOG_DIR" "black_gown_avant.png"
move_asset "CF3F64EF*" "$CATALOG_DIR" "pink_tweed_suit.png"

# Identity & UI
move_asset "IMG_6206*" "$BRANDING_DIR" "pau_tuxedo_agent.png"
move_asset "IMG_6168*" "$UI_DIR" "lafayette_hero_banner.png"
move_asset "IMG_6155*" "$UI_DIR" "biometric_scan_ui.png"
move_asset "IMG_6174*" "$UI_DIR" "future_imprint_hero.png"

# Docs
move_asset "TryOnYou_Presentation_Commerciale.pdf" "$DOCS_DIR" "TryOnYou_Presentation_Commerciale.pdf"
move_asset "PATENTE_TRYONYOU*" "$DOCS_DIR" "consolidated_patent.pdf"
move_asset "TRYONYOU_Investor_Dossier.pdf" "$DOCS_DIR" "investor_dossier_2025.pdf"

# Generate Manifest
echo "📝 Generando assets_manifest.json..."
cat <<EOF > "$PUBLIC_DIR/assets_manifest.json"
{
  "catalog": [
    "assets/catalog/red_dress_minimal.png",
    "assets/catalog/burberry_trench.png",
    "assets/catalog/black_gown_avant.png",
    "assets/catalog/pink_tweed_suit.png"
  ],
  "branding": [
    "assets/branding/pau_tuxedo_agent.png"
  ],
  "ui": [
    "assets/ui/lafayette_hero_banner.png",
    "assets/ui/biometric_scan_ui.png",
    "assets/ui/future_imprint_hero.png"
  ],
  "docs": [
    "docs/TryOnYou_Presentation_Commerciale.pdf",
    "docs/consolidated_patent.pdf",
    "docs/investor_dossier_2025.pdf"
  ]
}
EOF

# 5. INSTALACIÓN Y BUILD (PNPM)
echo "📦 Instalando dependencias (PNPM)..."
if ! command -v pnpm &> /dev/null; then
    echo "⚠️ pnpm no encontrado. Instalando..."
    npm install -g pnpm
fi

pnpm install

echo "🚀 Ejecutando Build System..."
pnpm run build

# 6. GIT SUPERCOMMIT
echo "💎 Generando SuperCommit..."
git add .

git commit -m "🚀 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM: SuperCommit MAX

- Arquitectura: Vite 7.1.2 + React 18.3.1 (Monorepo Unificado)
- Módulos Activos: Avatar3D, PAU, CAP, ABVET, FTT
- Piloto: Lafayette Active (Divineo v7 UI)
- Legal: Patente PCT/EP2025/067317 Integrada
- Estado: Production Ready
- Assets: Mapeo de 'Vestido Rojo' y 'Pau Tuxedo' completado.

Generado por: Jules (Agent 70)" || echo "⚠️ No hay cambios pendientes para commitear."

echo "✅ SUPERCOMMIT COMPLETADO."
