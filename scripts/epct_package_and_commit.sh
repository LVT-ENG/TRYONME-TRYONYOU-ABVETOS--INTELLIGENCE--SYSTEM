#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
APPID="PCT/EP2025/067317"
REPO_ROOT="${REPO_ROOT:-$HOME/TRYONYOU_MASTER}"
SRC_DIR="$REPO_ROOT/docs/legal/epct/src"
OUT_DIR="$REPO_ROOT/docs/legal/epct"
LOG_DIR="$REPO_ROOT/logs/epct"
PDF_NAME="PCT-EP2025-067317_RULE26_FULL_DOCUMENT.pdf"
NOW="$(date '+%Y-%m-%d %H:%M:%S')"
mkdir -p "$SRC_DIR" "$OUT_DIR" "$LOG_DIR"
touch "$SRC_DIR/00-cover.txt" "$SRC_DIR/01-abstract.txt" "$SRC_DIR/02-claims.txt" "$SRC_DIR/03-description.txt" "$SRC_DIR/04-drawings.txt"
if ! grep -q "$APPID" "$SRC_DIR/00-cover.txt" 2>/dev/null; then
cat > "$SRC_DIR/00-cover.txt" <<TXT
INTERNATIONAL APPLICATION — $APPID
Submitted under Rule 26 as Replacement Sheets
Applicant: TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
Formatting: PCT Rule 11; Replacement: PCT Rule 26.
Contents: Cover, Abstract, Claims (9 super-claims), Description, Drawings (FIG.1–9).
Date of preparation: $NOW
TXT
fi
MASTER="$OUT_DIR/_rule26_master.txt"
{ echo "===== COVER ====="; cat "$SRC_DIR/00-cover.txt"; echo -e "\n\f";
  echo "===== ABSTRACT ====="; cat "$SRC_DIR/01-abstract.txt"; echo -e "\n\f";
  echo "===== CLAIMS ====="; cat "$SRC_DIR/02-claims.txt"; echo -e "\n\f";
  echo "===== DESCRIPTION ====="; cat "$SRC_DIR/03-description.txt"; echo -e "\n\f";
  echo "===== DRAWINGS LIST ====="; cat "$SRC_DIR/04-drawings.txt"; } > "$MASTER"
OUTPDF="$OUT_DIR/$PDF_NAME"
if command -v cupsfilter >/dev/null 2>&1; then
  cupsfilter -D "$MASTER" > "$OUTPDF"
else
  PS="$OUT_DIR/_rule26_master.ps"
  { echo "%!PS"; echo "/Courier findfont 10 scalefont setfont 50 780 moveto";
    sed 's/$/\\n/g' "$MASTER" | awk '{printf "%s",$0} END{print ""}' | \
    awk -v ml=50 'BEGIN{y=780}{gsub(/\\n/,"\n"); n=split($0,a,"\n"); for(i=1;i<=n;i++){print "50 " y " moveto (" a[i] ") show"; y-=14; if (y<50){print "showpage"; y=780}}} END{print "showpage"}'; } > "$PS"
  cupsfilter "$PS" > "$OUTPDF"; rm -f "$PS"
fi
HASH="$(shasum "$OUTPDF" | awk '{print $1}')"
echo "$NOW | Built EPCT Rule26 | $PDF_NAME | $HASH" >> "$LOG_DIR/epct_build.log"
cd "$REPO_ROOT"; git pull --rebase || true
git add "$OUTPDF" "$MASTER" "$SRC_DIR" "$LOG_DIR/epct_build.log"
git commit -m "EPCT Rule26 package: $PDF_NAME (hash $HASH)" || true
git push origin main || true
if [[ -n "${TELEGRAM_TOKEN:-}" && -n "${TELEGRAM_CHAT_ID:-}" ]]; then
  curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage" \
       -d chat_id="$TELEGRAM_CHAT_ID" \
       -d text="EPCT Rule 26 package READY: $PDF_NAME (hash $HASH). Pushed to repo."
fi
echo "DONE | $OUTPDF"
