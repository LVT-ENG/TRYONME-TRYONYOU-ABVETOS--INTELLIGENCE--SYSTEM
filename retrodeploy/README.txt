════════════════════════════════════════════════════════════════════════════════
    TRYONYOU RETRODEPLOY — Automated Deployment System
════════════════════════════════════════════════════════════════════════════════

📁 DIRECTORY STRUCTURE
----------------------
/retrodeploy/
│
├── deploy.sh           # Master deployment script
├── Makefile            # Build + commit + vercel deploy automation
├── vercel.json         # Stable config for tryonyou.app
├── watcher.js          # Daemon for auto-sync 48 ZIPs
├── .env.template       # Template for environment variables
├── .env                # Your actual credentials (create from template)
├── retrodeploy.log     # Continuous log file
└── README.txt          # This file

════════════════════════════════════════════════════════════════════════════════

🚀 QUICK START
--------------

1. SET UP ENVIRONMENT VARIABLES
   
   Copy the template and fill in your credentials:
   $ cp .env.template .env
   $ nano .env  # or your favorite editor
   
   Required credentials:
   - VERCEL_TOKEN (from https://vercel.com/account/tokens)
   - TELEGRAM_BOT_TOKEN (from @BotFather)
   - TELEGRAM_CHAT_ID (message your bot to get this)

2. INSTALL DEPENDENCIES
   
   Make sure you have Node.js and Vercel CLI installed:
   $ npm install -g vercel
   $ vercel login

3. RUN FULL DEPLOYMENT
   
   Execute the master script:
   $ ./deploy.sh
   
   Or use the Makefile:
   $ make all

════════════════════════════════════════════════════════════════════════════════

📋 WHAT IT DOES
---------------

The retrodeploy system performs the following steps:

1️⃣  DETECT ZIPs
    • Scans TRYONYOU_DEPLOY_EXPRESS_INBOX/ for *.zip files
    • Counts and logs all ZIP files found

2️⃣  CLEAN DUPLICATES
    • Identifies duplicate ZIP files by base name
    • Keeps the most recent version of each file
    • Removes older duplicates automatically

3️⃣  COMMIT TO MAIN
    • Ensures you're on the main branch
    • Stages all changes (git add .)
    • Commits with timestamp: "🚀 RETRODEPLOY: Auto-deploy TRYONYOU ZIPs"
    • Pushes changes to GitHub origin/main

4️⃣  BUILD & DEPLOY
    • Installs npm dependencies if needed
    • Runs: npm run build (using Vite 7.1.2)
    • Deploys to Vercel production
    • URL: https://tryonyou.app

5️⃣  NOTIFY TELEGRAM
    • Sends deployment summary to @abvet_deploy_bot
    • Includes: ZIP count, timestamp, URL, status
    • Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID

6️⃣  VERIFY DEPLOYMENT
    • Checks if tryonyou.app responds with 200 OK
    • Logs verification result
    • Reports any issues

════════════════════════════════════════════════════════════════════════════════

🛠️ MAKEFILE COMMANDS
--------------------

make all         - Full pipeline: install, build, commit, deploy
make install     - Install npm dependencies
make build       - Build project with Vite 7.1.2
make commit      - Commit and push changes to main
make deploy      - Deploy to Vercel production
make clean       - Clean build artifacts and logs
make watch       - Start watcher daemon for auto-sync
make quick       - Quick deploy (build + deploy only)
make retrodeploy - Run full deploy.sh script
make verify      - Verify deployment status
make logs        - Show last 50 log entries
make help        - Show help message

════════════════════════════════════════════════════════════════════════════════

👁️ WATCHER DAEMON
-----------------

The watcher.js daemon continuously monitors the INBOX directory for changes:

START DAEMON:
$ node watcher.js
# or
$ make watch

CONFIGURATION (in watcher.js):
- watchInterval: 30000 (30 seconds)
- maxZipCount: 48
- autoDeployOnChange: false (set to true for automatic deployment)

The daemon will:
- Check for new/removed ZIP files every 30 seconds
- Automatically clean duplicates when detected
- Optionally trigger full deployment on changes
- Log all activity to retrodeploy.log

════════════════════════════════════════════════════════════════════════════════

📊 MONITORING
-------------

View logs in real-time:
$ tail -f retrodeploy.log

Check last 50 entries:
$ make logs

Verify deployment status:
$ make verify

════════════════════════════════════════════════════════════════════════════════

🔧 CUSTOMIZATION
----------------

INBOX DIRECTORY:
The default location is: ../TRYONYOU_DEPLOY_EXPRESS_INBOX/
To change this, edit the following files:
- deploy.sh (line: INBOX_DIR="...")
- watcher.js (CONFIG.inboxDir)

MAX ZIP COUNT:
Default is 48 files. To change:
- Edit watcher.js: CONFIG.maxZipCount = 48

AUTO-DEPLOY ON CHANGE:
To enable automatic deployment when ZIP files change:
- Edit watcher.js: CONFIG.autoDeployOnChange = true
- Or set in .env: AUTO_DEPLOY_ON_CHANGE=true

WATCH INTERVAL:
Default is 30 seconds. To change:
- Edit watcher.js: CONFIG.watchInterval = 30000 (in milliseconds)

════════════════════════════════════════════════════════════════════════════════

🔐 SECURITY NOTES
-----------------

1. NEVER commit the .env file with real credentials
2. Add .env to .gitignore (already done)
3. Use strong, unique tokens for production deployments
4. Rotate credentials periodically
5. Limit Vercel token permissions to minimum required
6. Keep your Telegram bot token private

════════════════════════════════════════════════════════════════════════════════

🐛 TROUBLESHOOTING
------------------

ISSUE: "Vercel CLI not found"
SOLUTION: Install with: npm install -g vercel

ISSUE: "Permission denied" when running deploy.sh
SOLUTION: Make it executable: chmod +x deploy.sh

ISSUE: "Telegram notification failed"
SOLUTION: Check your TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env

ISSUE: "Build failed"
SOLUTION: Check that all dependencies are installed: npm install

ISSUE: "Push failed"
SOLUTION: Check your Git credentials and network connection

ISSUE: "No changes to commit"
SOLUTION: This is normal if no files have changed since last commit

════════════════════════════════════════════════════════════════════════════════

📞 SUPPORT
----------

For issues or questions:
- Check the logs: tail -f retrodeploy.log
- Review this README
- Contact: @LVT-ENG or @abvet_deploy_bot

════════════════════════════════════════════════════════════════════════════════

✅ VERIFICATION CHECKLIST
-------------------------

Before first deployment, verify:
[ ] .env file created and filled with credentials
[ ] Vercel CLI installed (vercel --version)
[ ] Logged into Vercel (vercel whoami)
[ ] Node.js installed (node --version)
[ ] npm installed (npm --version)
[ ] Git configured (git config --list)
[ ] INBOX directory exists or will be created
[ ] You're on the main branch (git branch)

════════════════════════════════════════════════════════════════════════════════

🎯 PRODUCTION DEPLOYMENT URL
----------------------------

After successful deployment, your app will be live at:
👉 https://tryonyou.app

Staging (if configured):
👉 https://staging.tryonyou.app

════════════════════════════════════════════════════════════════════════════════

Last Updated: 2025-10-20
Version: 1.0.0
