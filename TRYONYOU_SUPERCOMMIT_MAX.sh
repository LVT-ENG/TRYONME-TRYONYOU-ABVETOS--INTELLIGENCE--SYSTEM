#!/bin/bash

echo "💎 INICIANDO PROTOCOLO ULTIMATUM V7 - SUPERCOMMIT MAX"

# Define Paths
PROJECT_ROOT=$(pwd)
ASSETS_SOURCE="$PROJECT_ROOT/TRYONYOU_PILOT_ASSETS"
PUBLIC_DIR="$PROJECT_ROOT/public"
CATALOG_DIR="$PUBLIC_DIR/assets/catalog"
BRANDING_DIR="$PUBLIC_DIR/assets/branding"
UI_DIR="$PUBLIC_DIR/assets/ui"
DOCS_DIR="$PUBLIC_DIR/docs"

echo "📂 Verificando origen: $ASSETS_SOURCE"
if [ ! -d "$ASSETS_SOURCE" ]; then
  echo "❌ Error: La carpeta de activos $ASSETS_SOURCE no existe."
  exit 1
fi

# Create Destination Directories
echo "🏗️ Creando estructura de directorios..."
mkdir -p "$CATALOG_DIR"
mkdir -p "$BRANDING_DIR"
mkdir -p "$UI_DIR"
mkdir -p "$DOCS_DIR"

# Function to move and rename
move_asset() {
  local pattern=$1
  local dest_dir=$2
  local dest_name=$3

  # Find file matching pattern (case insensitive)
  local file=$(find "$ASSETS_SOURCE" -maxdepth 1 -name "$pattern" | head -n 1)

  if [ -n "$file" ]; then
    echo "✅ Encontrado: $(basename "$file") -> $dest_name"
    cp "$file" "$dest_dir/$dest_name"
  else
    echo "⚠️ Advertencia: No se encontró archivo para $pattern"
  fi
}

# 1. 👗 El Armario Digital (Catálogo)
echo "👗 Procesando Armario Digital..."
move_asset "41C07010*" "$CATALOG_DIR" "red_dress_minimal.png"
move_asset "8762992B*" "$CATALOG_DIR" "burberry_trench.png"
move_asset "952B0855*" "$CATALOG_DIR" "black_gown_avant.png"
move_asset "CF3F64EF*" "$CATALOG_DIR" "pink_tweed_suit.png"

# 2. 🦚 Identidad y UI
echo "🦚 Procesando Identidad y UI..."
move_asset "IMG_6206*" "$BRANDING_DIR" "pau_tuxedo_agent.png"
move_asset "IMG_6168*" "$UI_DIR" "lafayette_hero_banner.png"
move_asset "IMG_6155*" "$UI_DIR" "biometric_scan_ui.png"
move_asset "IMG_6174*" "$UI_DIR" "future_imprint_hero.png"

# 3. ⚖️ Documentación de Venta
echo "⚖️ Procesando Documentación..."
move_asset "TryOnYou_Presentation_Commerciale.pdf" "$DOCS_DIR" "TryOnYou_Presentation_Commerciale.pdf"
move_asset "PATENTE_TRYONYOU*" "$DOCS_DIR" "consolidated_patent.pdf"
move_asset "TRYONYOU_Investor_Dossier.pdf" "$DOCS_DIR" "investor_dossier_2025.pdf"

# 4. Generate Manifest
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

# 5. Cleanup & Build
echo "🧹 Limpiando residuos..."
rm -rf client # Legacy folder
rm -rf dist
rm -rf .next

echo "🚀 Ejecutando Build System..."
# Check if pnpm is installed, else use npm
if command -v pnpm &> /dev/null; then
    echo "Usando pnpm..."
    pnpm install
    pnpm run build
else
    echo "Usando npm..."
    npm install
    npm run build
fi

echo "✨ PROTOCOLO ULTIMATUM COMPLETADO ✨"
