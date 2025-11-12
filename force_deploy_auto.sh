#!/bin/bash
# ============================================
# 🚀 TRYONYOU – ABVETOS – Force Deploy Auto
# ============================================

WATCH_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
LOG_FILE="$WATCH_DIR/auto_deploy.log"
REPO_PATH="$HOME/TRYONYOU_PROJECT"
export VERCEL_TOKEN="your_vercel_token"
export VERCEL_ORG_ID="team_rubenespinarrodri"
export VERCEL_PROJECT_ID="prj_5cvRv3TeZFOnSlixHu1QC8q9DHI1"

echo "🔄 Watching $WATCH_DIR for new ZIPs..." | tee -a "$LOG_FILE"

# Monitor folder for new or changed ZIP files
fswatch -0 "$WATCH_DIR" | while read -d "" event
do
  FILE=$(basename "$event")
  if [[ "$FILE" == *.zip ]]; then
    echo "📦 New file detected: $FILE" | tee -a "$LOG_FILE"
    TIMESTAMP=$(date "+%Y-%m-%d_%H-%M-%S")
    TMP_DIR="$WATCH_DIR/tmp_$TIMESTAMP"
    mkdir -p "$TMP_DIR"
    unzip -o "$WATCH_DIR/$FILE" -d "$TMP_DIR" >/dev/null

    echo "⚙️ Syncing with repo..." | tee -a "$LOG_FILE"
    rsync -av --exclude='.git' "$TMP_DIR/" "$REPO_PATH/" >/dev/null
    cd "$REPO_PATH"

    echo "💬 Committing and deploying..." | tee -a "$LOG_FILE"
    git add .
    git commit -m "AutoDeploy: $FILE @ $TIMESTAMP" >/dev/null || true
    git push origin main

    vercel --prod --confirm --token $VERCEL_TOKEN >/dev/null
    echo "✅ Deployment finished for $FILE" | tee -a "$LOG_FILE"

    rm -rf "$TMP_DIR"
  fi
done
