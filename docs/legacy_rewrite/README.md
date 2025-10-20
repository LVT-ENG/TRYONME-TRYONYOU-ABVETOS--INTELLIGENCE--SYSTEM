# Legacy Rewrite Import Directory

## Purpose

This directory is used by the `deploy_express.sh` automation script to store files imported from the iCloud Drive deployment inbox.

## Structure

Each import creates a timestamped subdirectory:

```
docs/legacy_rewrite/
├── import_2025-01-15_10-30-45/
│   ├── file1.js
│   ├── file2.html
│   └── IMPORT_LOG.txt
├── import_2025-01-16_14-22-10/
│   ├── file3.zip
│   └── IMPORT_LOG.txt
└── README.md
```

## Usage

Files are automatically imported from:
```
~/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX
```

Each import includes:
- All new files from the inbox (ZIP, JS, MP4, JSON, HTML, CSS)
- An `IMPORT_LOG.txt` with details about the import
- Automatic git commit and push
- Optional Telegram notifications

## Automation

The `deploy_express.sh` script handles:
1. 📦 Detection of new files in the iCloud inbox
2. 📥 Copying files to timestamped import directories
3. 📝 Generating import logs
4. 📤 Git commit and push
5. 💬 Telegram notifications
6. 🚀 Optional Vercel deployment

## Configuration

Set these environment variables before running:
```bash
export VERCEL_TOKEN="your_vercel_token"
export TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
export TELEGRAM_CHAT_ID="your_telegram_chat_id"
```

## Running the Script

```bash
chmod +x deploy_express.sh
./deploy_express.sh
```

---

**TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM**  
*Deploy Express Automation System*
