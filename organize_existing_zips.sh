#!/usr/bin/env zsh

set -e

INBOX="$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"

mkdir -p "$INBOX/CAP"
mkdir -p "$INBOX/PAU"
mkdir -p "$INBOX/JIT"
mkdir -p "$INBOX/SmartWardrobe"
mkdir -p "$INBOX/Patent"
mkdir -p "$INBOX/UI"
mkdir -p "$INBOX/Assets"
mkdir -p "$INBOX/Misc"

DOWNLOADS="$HOME/Downloads"

if [ -d "$HOME/Library/CloudStorage" ]; then
  GDRIVE=("$HOME"/Library/CloudStorage/GoogleDrive*)
else
  GDRIVE=()
fi

ICLOUD_BASE="$HOME/Library/Mobile Documents/com~apple~CloudDocs"

move_zip() {
  local FILE="$1"
  local BASE="$(basename "$FILE")"
  local DEST=""

  if [[ "$BASE" == *"CAP"* ]]; then DEST="$INBOX/CAP"
  elif [[ "$BASE" == *"PAU"* ]]; then DEST="$INBOX/PAU"
  elif [[ "$BASE" == *"JIT"* ]]; then DEST="$INBOX/JIT"
  elif [[ "$BASE" == *"Wardrobe"* || "$BASE" == *"Smart"* ]]; then DEST="$INBOX/SmartWardrobe"
  elif [[ "$BASE" == *"Patent"* || "$BASE" == *"PCT"* || "$BASE" == *"EPCT"* ]]; then DEST="$INBOX/Patent"
  elif [[ "$BASE" == *"UI"* || "$BASE" == *"frontend"* ]]; then DEST="$INBOX/UI"
  elif [[ "$BASE" == *"img"* || "$BASE" == *"asset"* ]]; then DEST="$INBOX/Assets"
  else DEST="$INBOX/Misc"
  fi

  local TS=$(date +"%Y%m%d-%H%M%S")
  mv "$FILE" "$DEST/${TS}__${BASE}"
}

scan_dir() {
  local DIR="$1"
  if [ ! -d "$DIR" ]; then
    return 0
  fi
  for FILE in "$DIR"/*.zip(N); do
    [ -e "$FILE" ] || continue
    move_zip "$FILE"
  done
}

scan_dir "$DOWNLOADS"
scan_dir "$ICLOUD_BASE"

for GD in "${GDRIVE[@]}"; do
  scan_dir "$GD"
  if [ -d "$GD/docs" ]; then scan_dir "$GD/docs"; fi
done

echo "ZIP organization complete."
