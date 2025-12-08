
cat > ~/prepare_maestro.sh << 'EOF'
#!/bin/zsh

BASE="/Users/mac/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
TARGET="$BASE/MASTER_ZIP_WORK"

echo "Cleaning workspace..."
rm -rf "$TARGET"
mkdir "$TARGET"

echo "Searching MAESTRO zip..."
MAESTRO_ZIP=$(find "$BASE" -maxdepth 1 -type f -iname "ZIP_MAESTRO_TRYONYOU_ABVET_ULTRA_PLUS_COMPLETO_DEPLOY_EXPRESS 2*.zip" | head -n 1)

if [ -z "$MAESTRO_ZIP" ]; then
  echo "ERROR: No MAESTRO ZIP found."
  exit 1
fi

echo "Found: $MAESTRO_ZIP"
cp "$MAESTRO_ZIP" "$TARGET/MAESTRO.zip"

echo "Unzipping..."
cd "$TARGET"
unzip -o MAESTRO.zip >/dev/null

echo "----- CONTENT -----"
ls -R .

echo "MAESTRO READY at:"
echo "$TARGET"
EOF

cd "/Users/mac/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"

rm -f MAESTRO.zip
rm -rf MASTER_ZIP_WORK
mkdir MASTER_ZIP_WORK

zip -r MAESTRO.zip ZIP_MAESTRO_TRYONYOU_ABVET_ULTRA_PLUS_COMPLETO_DEPLOY_EXPRESS* >/dev/null

unzip -o MAESTRO.zip -d MASTER_ZIP_WORK >/dev/null

ls -R MASTER_ZIP_WORK
#!/bin/zsh

BASE="/Users/mac/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
TARGET="$BASE/MASTER_ZIP_WORK"

echo "Cleaning previous workspace..."
rm -rf "$TARGET"
mkdir "$TARGET"

echo "Looking for the MAESTRO zip..."
MAESTRO_ZIP=$(ls "$BASE" | grep -i "ZIP_MAESTRO_TRYONYOU_ABVET_ULTRA_PLUS_COMPLETO_DEPLOY_EXPRESS 2\.zip" | head -n 1)

if [ -z "$MAESTRO_ZIP" ]; then
  echo "ERROR: No se encontró el archivo MAESTRO."
  exit 1
fi

echo "Found: $MAESTRO_ZIP"
cp "$BASE/$MAESTRO_ZIP" "$TARGET/MAESTRO.zip"

echo "Unzipping MAESTRO.zip..."
cd "$TARGET"
unzip -o MAESTRO.zip

echo "----- CONTENIDO FINAL -----"
ls -R .

echo "Listo. El MAESTRO está preparado en:"
echo "$TARGET"


