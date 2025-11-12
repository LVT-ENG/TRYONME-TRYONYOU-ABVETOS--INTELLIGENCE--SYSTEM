═══════════════════════════════════════════════════════════════════════════════
  TRYONYOU DEPLOY EXPRESS — AUTO-SYNC INSTRUCTIONS
  Legal Documentation Update System
═══════════════════════════════════════════════════════════════════════════════

📦 PACKAGE CONTENTS
────────────────────────────────────────────────────────────────────────────────
  ✓ ISSUE_LEGAL_EPCT_SUPERCLAIMS.md — Consolidated 8 Super-Claims (FTT + EBTT)
  ✓ README_LEGAL_SYNC.txt — This file (auto-deploy instructions)

═══════════════════════════════════════════════════════════════════════════════
  🚀 DEPLOY EXPRESS AUTO-SYNC WORKFLOW
═══════════════════════════════════════════════════════════════════════════════

STEP 1: DRAG TO INBOX
────────────────────────────────────────────────────────────────────────────────
Drag this package to your iCloud Drive Deploy Express Inbox:

  📂 ~/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX

STEP 2: AUTOMATIC DETECTION
────────────────────────────────────────────────────────────────────────────────
The Deploy Express daemon will automatically:
  ⏱  Detect new files in the inbox (scan interval: 30 seconds)
  📋 Validate file integrity and format
  🔍 Verify package manifest (README_LEGAL_SYNC.txt present)
  ✅ Extract contents from .zip if packaged

STEP 3: REPOSITORY SYNC
────────────────────────────────────────────────────────────────────────────────
Once validated, the system will:
  📤 Upload ISSUE_LEGAL_EPCT_SUPERCLAIMS.md to /docs/legal/
  🔄 Sync with GitHub repository main branch
  📝 Generate commit message:
      "✅ [LEGAL] EPCT Superclaims integrated (FTT + EBTT) — auto-synced via Deploy Express"

STEP 4: NOTIFICATION
────────────────────────────────────────────────────────────────────────────────
Telegram bot @abvet_deploy_bot will send confirmation:

  📜 EPCT Legal Update integrado correctamente – TRYONYOU ABVETOS ULTRA-PLUS-ULTIMATUM
  
  ✅ File: ISSUE_LEGAL_EPCT_SUPERCLAIMS.md
  📂 Location: /docs/legal/
  🕐 Timestamp: [Auto-generated]
  🔗 Commit: [GitHub commit hash]
  📊 Status: DEPLOYED ✓

═══════════════════════════════════════════════════════════════════════════════
  ⚙️ TECHNICAL DETAILS
═══════════════════════════════════════════════════════════════════════════════

DEPLOY EXPRESS DAEMON CONFIGURATION
────────────────────────────────────────────────────────────────────────────────
  Watch Path:      ~/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX
  Scan Interval:   30 seconds
  File Types:      .md, .txt, .zip, .pdf
  Target Repo:     LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
  Target Branch:   main
  Target Path:     /docs/legal/

AUTO-COMMIT FORMAT
────────────────────────────────────────────────────────────────────────────────
  Convention:      Conventional Commits (https://www.conventionalcommits.org/)
  Type:           [LEGAL] for legal documentation updates
  Format:         ✅ [LEGAL] <description> — auto-synced via Deploy Express
  Example:        ✅ [LEGAL] EPCT Superclaims integrated (FTT + EBTT) — auto-synced via Deploy Express

GIT OPERATIONS
────────────────────────────────────────────────────────────────────────────────
  Step 1:  git add docs/legal/ISSUE_LEGAL_EPCT_SUPERCLAIMS.md
  Step 2:  git commit -m "✅ [LEGAL] EPCT Superclaims integrated (FTT + EBTT) — auto-synced via Deploy Express"
  Step 3:  git push origin main

TELEGRAM BOT INTEGRATION
────────────────────────────────────────────────────────────────────────────────
  Bot Handle:      @abvet_deploy_bot
  API Token:       [Stored in secure credentials]
  Chat ID:         [Configured in deployment environment]
  Message Format:  Markdown with status emojis

═══════════════════════════════════════════════════════════════════════════════
  📋 VERIFICATION CHECKLIST
═══════════════════════════════════════════════════════════════════════════════

Before deployment, ensure:
  ☐ iCloud Drive is synced and connected
  ☐ Deploy Express daemon is running (check launchd status)
  ☐ GitHub credentials are configured (SSH key or PAT)
  ☐ Telegram bot token is valid and active
  ☐ Network connection is stable
  ☐ Target repository has write permissions

Post-deployment verification:
  ☐ File appears in GitHub at /docs/legal/ISSUE_LEGAL_EPCT_SUPERCLAIMS.md
  ☐ Commit message follows convention
  ☐ Telegram notification received
  ☐ File content is complete and properly formatted
  ☐ No merge conflicts or errors in git log

═══════════════════════════════════════════════════════════════════════════════
  🛠️ TROUBLESHOOTING
═══════════════════════════════════════════════════════════════════════════════

ISSUE: File not detected after 60 seconds
────────────────────────────────────────────────────────────────────────────────
SOLUTION:
  1. Check iCloud sync status: System Preferences → iCloud → iCloud Drive
  2. Verify daemon is running: launchctl list | grep deploy_express
  3. Check daemon logs: ~/Library/Logs/TRYONYOU/deploy_express.log

ISSUE: Git push fails with authentication error
────────────────────────────────────────────────────────────────────────────────
SOLUTION:
  1. Verify SSH key: ssh -T git@github.com
  2. Or check Personal Access Token: cat ~/.config/gh/token
  3. Re-authenticate if needed: gh auth login

ISSUE: Telegram notification not received
────────────────────────────────────────────────────────────────────────────────
SOLUTION:
  1. Verify bot token: curl -X GET "https://api.telegram.org/bot<TOKEN>/getMe"
  2. Check chat ID configuration: cat ~/.config/tryonyou/telegram_chat_id
  3. Test notification: ./scripts/test_telegram_notification.sh

ISSUE: File uploaded but wrong location
────────────────────────────────────────────────────────────────────────────────
SOLUTION:
  1. Check target path in config: cat ~/.config/tryonyou/deploy_config.json
  2. Manually move file: git mv <wrong_path> docs/legal/
  3. Update config if needed: vi ~/.config/tryonyou/deploy_config.json

═══════════════════════════════════════════════════════════════════════════════
  📞 SUPPORT & DOCUMENTATION
═══════════════════════════════════════════════════════════════════════════════

Deploy Express Documentation:
  📖 Full Guide:     /docs/DEPLOY_EXPRESS_PACKAGE/DEPLOY_GUIDE.md
  🚀 Quick Start:    /docs/QUICK_START.md
  🔧 Configuration:  /docs/DEPLOY_INSTRUCTIONS.md

Repository:
  🌐 GitHub:         https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
  📄 Legal Docs:     https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/tree/main/docs/legal

Contact:
  📧 Email:          info@tryonyou.app
  💬 Telegram:       @abvet_deploy_bot
  🐛 Issues:         https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues

═══════════════════════════════════════════════════════════════════════════════
  ⚡ QUICK REFERENCE
═══════════════════════════════════════════════════════════════════════════════

Manual Git Commands (if auto-sync fails):
────────────────────────────────────────────────────────────────────────────────
  cd ~/path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
  git add docs/legal/*
  git commit -m "✅ [LEGAL] EPCT Superclaims integrated (FTT + EBTT) — auto-synced via Deploy Express"
  git push origin main

Check Deploy Express Status:
────────────────────────────────────────────────────────────────────────────────
  launchctl list | grep deploy_express
  tail -f ~/Library/Logs/TRYONYOU/deploy_express.log

Force Manual Sync:
────────────────────────────────────────────────────────────────────────────────
  ./scripts/package_deploy_express.sh --force-sync

Test Telegram Bot:
────────────────────────────────────────────────────────────────────────────────
  ./scripts/test_telegram_notification.sh "Test message from Deploy Express"

═══════════════════════════════════════════════════════════════════════════════
  📊 DEPLOYMENT METRICS
═══════════════════════════════════════════════════════════════════════════════

Expected Performance:
  ⏱  Detection Time:        < 30 seconds
  📤 Upload Time:           < 10 seconds
  🔄 Git Operations:        < 5 seconds
  📱 Notification Delay:    < 3 seconds
  ✅ Total Deployment:      < 60 seconds

Success Criteria:
  ✓ File in correct location: /docs/legal/ISSUE_LEGAL_EPCT_SUPERCLAIMS.md
  ✓ Commit on main branch with proper message
  ✓ Telegram notification with success status
  ✓ No errors in deployment logs
  ✓ File accessible via GitHub web interface

═══════════════════════════════════════════════════════════════════════════════

🎯 READY TO DEPLOY

Simply drag this package to your Deploy Express Inbox folder and wait for the
automated deployment to complete. You will receive a Telegram notification when
the process is finished.

📦 Inbox Location:
   ~/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX

✅ Expected Outcome:
   File deployed to /docs/legal/ with automatic commit and notification.

═══════════════════════════════════════════════════════════════════════════════

Document Version:    1.0
Last Updated:        October 20, 2025
Compatibility:       Deploy Express v2.x+
Platform:            macOS 10.15+ with iCloud Drive

© 2025 TRYONYOU. All rights reserved.

═══════════════════════════════════════════════════════════════════════════════
