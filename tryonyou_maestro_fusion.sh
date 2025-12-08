#!/bin/zsh

# TRYONYOU – Global fusion script

BASE="/Users/mac/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
WORK="$BASE/MASTER_FUSION_WORK"
OUT_ZIP="$BASE/ZIP_MAESTRO_TRYONYOU_ABVET_ULTRA_PLUS_COMPLETO_DEPLOY_EXPRESS_FUSION.zip"
TMP_UNPACK="$WORK/__unpack_tmp"

echo ">>> TRYONYOU MAESTRO FUSION START"

echo "Base folder:"
echo "$BASE"
echo ""

echo "Cleaning previous fusion workspace..."
rm -rf "$WORK"
mkdir -p "$WORK"

rm -f "$OUT_ZIP"

echo ""
echo "Fusion priority:"
echo "  1) Manus / MASTER trunks"
echo "  2) Vite Advanced / Final Web / Luxury"
echo "  3) Ultimatum / Demo / Deploy zips"
echo ""

PRIORITY_DIRS=(
  "$BASE/TRYONYOU_MASTER"
  "$BASE/TRYONYOU_MASTER2"
  "$BASE/TRYON_MASTER_COMPLETE"
  "$BASE/TRYONYOU_FINAL_WEB"
  "$BASE/TRYONYOU_Vite_Advanced"
  "$BASE/TRYONYOU_Vite_Advanced 2"
  "$BASE/TRYONYOU_Vite_Advanced 3"
  "$BASE/TRYONYOU_FULL_LUXURY_DEPLOY"
  "$BASE/TRYONYOU_FULL_LUXURY_DEPLOY 2"
  "$BASE/TRYONYOU-ABVETOS-ULTIMATUM"
  "$BASE/TRYONYOU-ABVETOS-ULTIMATUM 2"
  "$BASE/TRYONYOU-ABVETOS-ULTIMATUM 3"
  "$BASE/TRYONYOU-ABVETOS-ULTIMATUM 4"
  "$BASE/TRYONYOU-ABVETOS-ULTIMATUM 5"
  "$BASE/TRYONYOU-ABVETOS-ULTIMATUM 6"
  "$BASE/TRYONYOU_Ultimatum_Landing_Vercel"
  "$BASE/TRYONYOU_Ultimatum_Landing_Vercel 2"
)

PRIORITY_ZIPS=(
  "$BASE/TRYONYOU_FULL_BUNDLE_F2.zip"
  "$BASE/TRYONYOU_FULL_BUNDLE_F2 2.zip"
  "$BASE/TRYONYOU_FULL_BUNDLE_F2 3.zip"
  "$BASE/TRYONYOU_FULL_BUNDLE_F2 4.zip"
  "$BASE/TRYONYOU_FULL_BUNDLE_F2 5.zip"
  "$BASE/TRYONYOU_FULL_BUNDLE_F2 6.zip"
  "$BASE/TRYONYOU_DEMO_COMPLETE.zip"
  "$BASE/TRYONYOU_DEMO_COMPLETE 2.zip"
  "$BASE/TRYONYOU_DEMO_COMPLETE 3.zip"
  "$BASE/TRYONYOU_DEMO_READY.zip"
  "$BASE/TRYONYOU_DEMO_READY 2.zip"
  "$BASE/TRYONYOU_ULTIMATUM_FINAL 2.zip"
  "$BASE/TRYONYOU_ULTIMATUM_FINAL 2 copia.zip"
  "$BASE/TRYONYOU-ULTIMATUM-MASTER.zip"
  "$BASE/TRYONYOU_ONLINE_READY.zip"
  "$BASE/TRYONYOU_PRODUCTION_READY.zip"
  "$BASE/TRYONYOU_PRODUCTION_READY (1).zip"
  "$BASE/TRYONYOU_FULL_PROJECT.zip"
  "$BASE/TRYONYOU_FULL_PROJECT 2.zip"
  "$BASE/TRYONYOU_DEPLOY_REAL_FINAL_PACKAGE.zip"
  "$BASE/TRYONYOU_DEPLOY_REAL_FINAL_PACKAGE 2.zip"
  "$BASE/TRYONYOU_DEPLOY_REAL_FINAL_PACKAGE 3.zip"
  "$BASE/TRYONYOU_MANUS_INTEGRATION_PACKAGE.zip"
  "$BASE/TRYONYOU_MANUS_INTEGRATION_PACKAGE (1).zip"
  "$BASE/TRYONYOU_MANUS_INTEGRATION_PACKAGE (2).zip"
  "$BASE/TRYONYOU_MANUS_INTEGRATION_PACKAGE (3).zip"
  "$BASE/TRYONYOU_APP_COMPLETE.zip"
  "$BASE/TRYONYOU_APP_COMPLETE 2.zip"
  "$BASE/TRYONYOU_DEMO_READY.zip"
  "$BASE/TRYONYOU_FIN.zip"
  "$BASE/TRYONYOU_FINAL_DEPLOY.zip"
  "$BASE/TRYONYOU_FINAL_DEPLOY 2.zip"
  "$BASE/TRYONYOU_FINAL_WEB.zip"
  "$BASE/TRYONYOU_FULL_AUTO.zip"
  "$BASE/TRYONYOU_FULL_BUNDLE.zip"
  "$BASE/TRYONYOU_FULL_BUNDLE 2.zip"
  "$BASE/TRYONYOU_ULTIMATUM_FINAL 2.zip"
  "$BASE/TRYONYOU-ULTIMATUM-MASTER.zip"
  "$BASE/ZIP_MAESTRO_TRYONYOU_ABVET_ULTRA_PLUS_COMPLETO_DEPLOY_EXPRESS.zip"
  "$BASE/ZIP_MAESTRO_TRYONYOU_ABVET_ULTRA_PLUS_COMPLETO_DEPLOY_EXPRESS 2.zip"
)

echo "Phase 1: merging priority directories..."
for SRC in "${PRIORITY_DIRS[@]}"; do
  if [ -d "$SRC" ]; then
    echo "  Merging directory: $SRC"
    rsync -a --ignore-existing "$SRC"/ "$WORK"/
  else
    echo "  Skipping missing directory: $SRC"
  fi
done

echo ""
echo "Phase 2: merging priority zip archives..."
for ZIP_SRC in "${PRIORITY_ZIPS[@]}"; do
  if [ -f "$ZIP_SRC" ]; then
    echo "  Unpacking and merging zip: $ZIP_SRC"
    rm -rf "$TMP_UNPACK"
    mkdir -p "$TMP_UNPACK"
    unzip -oq "$ZIP_SRC" -d "$TMP_UNPACK"
    rsync -a --ignore-existing "$TMP_UNPACK"/ "$WORK"/
  else
    echo "  Skipping missing zip: $ZIP_SRC"
  fi
done

rm -rf "$TMP_UNPACK"

echo ""
echo "Phase 3: sanity check for Vite project markers..."
if [ -f "$WORK/package.json" ] && [ -f "$WORK/vite.config.js" ] && [ -d "$WORK/src" ]; then
  echo "  Vite project markers detected."
else
  echo "  WARNING: Vite markers not clearly detected."
  echo "  Check manually: $WORK"
fi

echo ""
echo "Phase 4: building final maestro zip..."
cd "$WORK"
zip -r "$OUT_ZIP" . >/dev/null

echo ""
echo ">>> FUSION FINISHED"
echo "Final maestro zip:"
echo "$OUT_ZIP"
echo ""
echo "You can now give this zip to the dev or to Gemini as the single fused master."


chmod +x ~/tryonyou_maestro_fusion.sh
zsh ~/tryonyou_maestro_fusion.sh



