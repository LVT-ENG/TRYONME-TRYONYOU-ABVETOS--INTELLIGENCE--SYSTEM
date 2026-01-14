# JULES V7 - Email Automation Agent

## Overview

JULES (Just Ultra-Luxury Email System) is an automated email agent that processes incoming emails, classifies intent, generates appropriate responses, and logs interactions in a Google Sheets CRM.

## Features

- 📧 **Email Processing**: Automatically reads unread emails via IMAP
- 🧠 **Intent Classification**: Identifies email intent (GET_LOOK, SUPPORT, INVESTOR, GENERAL)
- 💌 **Automated Responses**: Sends personalized HTML responses based on intent
- 📊 **CRM Integration**: Logs all interactions to Google Sheets
- 📱 **Telegram Notifications**: Sends alerts to mobile device
- 🔒 **Secure**: Uses environment variables for credentials

## Required Environment Variables

Set the following environment variables before running:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
TELEGRAM_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
GOOGLE_CREDENTIALS_JSON={"type":"service_account",...}
SHEET_NAME=Divineo_Leads_DB  # Optional, defaults to Divineo_Leads_DB
```

### Gmail Setup

1. Enable IMAP in Gmail settings
2. Create an App Password (don't use your regular password)
3. Set `EMAIL_USER` and `EMAIL_PASS` environment variables

### Google Sheets Setup

1. Create a Google Cloud Project
2. Enable Google Sheets API and Google Drive API
3. Create a Service Account and download credentials JSON
4. Share your Google Sheet with the service account email
5. Set `GOOGLE_CREDENTIALS_JSON` with the entire JSON content

### Telegram Setup

1. Create a Telegram bot via [@BotFather](https://t.me/botfather)
2. Get your chat ID via [@userinfobot](https://t.me/userinfobot)
3. Set `TELEGRAM_TOKEN` and `TELEGRAM_CHAT_ID` environment variables

## Usage

### Manual Execution

```bash
python api/jules/jules_main.py
```

### Automated Execution (Cron)

Add to your crontab to run every 5 minutes:

```bash
*/5 * * * * cd /path/to/project && python api/jules/jules_main.py
```

### GitHub Actions

Create a workflow file `.github/workflows/jules.yml`:

```yaml
name: JULES Email Agent
on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:

jobs:
  run-jules:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: python api/jules/jules_main.py
        env:
          EMAIL_USER: ${{ secrets.EMAIL_USER }}
          EMAIL_PASS: ${{ secrets.EMAIL_PASS }}
          TELEGRAM_TOKEN: ${{ secrets.TELEGRAM_TOKEN }}
          TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
          GOOGLE_CREDENTIALS_JSON: ${{ secrets.GOOGLE_CREDENTIALS_JSON }}
```

## Intent Classification

The agent classifies emails into the following intents:

- **GET_LOOK**: Keywords: scan, look, recomenda, divineo
- **SUPPORT**: Keywords: problem, error, ayuda
- **INVESTOR**: Keywords: invest, socio
- **GENERAL**: Default for all other emails

## Response Templates

### GET_LOOK Response
Sends a personalized HTML email with:
- Biometric scan results
- Recommended garments
- Link to virtual fitting room

### SUPPORT Response
Acknowledges the issue and promises human follow-up

### GENERAL Response
Generic acknowledgment of the email

## CRM Logging

Each interaction is logged to Google Sheets with:
- Timestamp
- Sender email
- Intent classification
- Status (✅ Respondido / ❌ Error)

## Security Notes

- Never commit credentials to version control
- Use environment variables or secrets management
- Gmail App Passwords are recommended over regular passwords
- Service account credentials should be tightly controlled

## Dependencies

See `requirements.txt` for full list:
- `requests` - HTTP client for Telegram API
- `gspread` - Google Sheets integration
- `oauth2client` - Google OAuth authentication (Note: deprecated, consider migrating to `google-auth` in future)
- Python built-ins: `imaplib`, `smtplib`, `email`

## Troubleshooting

### "Login failed" error
- Verify `EMAIL_USER` and `EMAIL_PASS` are correct
- Ensure you're using an App Password, not your regular Gmail password
- Check that IMAP is enabled in Gmail settings

### "Cannot connect to Sheets" error
- Verify `GOOGLE_CREDENTIALS_JSON` is valid JSON
- Ensure the service account has access to the sheet
- Check that both Sheets API and Drive API are enabled

### No Telegram notifications
- Verify `TELEGRAM_TOKEN` and `TELEGRAM_CHAT_ID` are set
- Test the bot by sending a message to it first
- Ensure the bot has permission to send messages

## Architecture

```
JulesAgent
├── _connect_sheets()      # Google Sheets connection
├── notify_telegram()       # Send mobile alerts
├── get_unread_emails()     # Fetch unread emails via IMAP
├── analyze_intent()        # Classify email intent
├── generate_reply()        # Create HTML response
├── send_email()            # Send response via SMTP
├── log_interaction()       # Log to CRM
├── extract_email_address() # Parse sender email
└── run()                   # Main execution loop
```

## License

Part of the TRYONYOU/Divineo Intelligence System
Patent: PCT/EP2025/067317
