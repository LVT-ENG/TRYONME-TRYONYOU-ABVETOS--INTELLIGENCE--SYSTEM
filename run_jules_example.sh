#!/bin/bash
# Example script to run JULES with environment variables
# Copy this to run_jules.sh and customize with your values

# Excel Configuration
export EXCEL_PATH="/path/to/Startup_Follow_Up_Sheet_TRYONYOU.xlsx"
export SHEET_NAME="Sheet1"

# IMAP Configuration
export IMAP_HOST="imap.porkbun.com"
export IMAP_PORT="993"
export IMAP_USER="contact@tryonyou.app"
export IMAP_PASS="your_password_here"

# SMTP Configuration
export SMTP_HOST="smtp.porkbun.com"
export SMTP_PORT="587"
export SMTP_USER="contact@tryonyou.app"
export SMTP_PASS="your_password_here"
export FROM_EMAIL="contact@tryonyou.app"
export FROM_NAME="TRYONYOU"

# Email Template Configuration
export PATENT_NUMBER="PCT/EP2025/067317"
export PRICING="€4,900/month"

# Telegram Configuration
export TELEGRAM_BOT_TOKEN="your_bot_token"
export TELEGRAM_CHAT_ID="your_chat_id"

# Behavior Configuration
export FOLLOWUP_AFTER_HOURS="48"
export DRY_RUN="1"  # Set to 0 to actually send emails
export IMAP_SINCE_DAYS="7"
export TARGET_STATUSES="Pending reply,Contacted"

# Run JULES
python3 jules_all_in_one.py
