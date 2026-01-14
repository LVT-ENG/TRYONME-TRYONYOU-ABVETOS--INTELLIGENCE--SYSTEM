# JULES — ALL-IN-ONE Email Automation System

JULES is a comprehensive email automation tool that manages your startup outreach pipeline by:
1. Reading your Excel contact pipeline
2. Sending automatic follow-up emails to pending contacts
3. Reading and processing email replies from your inbox
4. Updating Excel with reply information and status changes
5. Sending summary reports via Telegram

## Features

- **📊 Excel Integration**: Automatically reads and updates your contact pipeline spreadsheet
- **📧 IMAP Support**: Reads real replies from your email inbox
- **📤 SMTP Support**: Sends follow-up emails automatically
- **🤖 Smart Classification**: Automatically classifies responses as "Interested" or "Not interested"
- **🔔 Telegram Notifications**: Get real-time summaries sent to your Telegram
- **🏃 Dry Run Mode**: Test everything without sending actual emails
- **⏰ Configurable Timing**: Set custom follow-up intervals
- **🔒 Secure**: Uses environment variables for all credentials

## Requirements

```bash
pip install openpyxl python-dotenv
```

Or install from the project requirements:

```bash
pip install -r requirements.txt
```

## Configuration

### 1. Set up Environment Variables

Copy the example configuration:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```bash
# Excel Configuration
EXCEL_PATH=/path/to/Startup_Follow_Up_Sheet_TRYONYOU.xlsx
SHEET_NAME=Sheet1

# IMAP Configuration (for reading email replies)
IMAP_HOST=imap.porkbun.com
IMAP_PORT=993
IMAP_USER=contact@tryonyou.app
IMAP_PASS=your_imap_password

# SMTP Configuration (for sending follow-up emails)
SMTP_HOST=smtp.porkbun.com
SMTP_PORT=587
SMTP_USER=contact@tryonyou.app
SMTP_PASS=your_smtp_password
FROM_EMAIL=contact@tryonyou.app
FROM_NAME=TRYONYOU

# Telegram Configuration
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Behavior Configuration
FOLLOWUP_AFTER_HOURS=48       # Hours before sending follow-up
DRY_RUN=1                     # 1 = test mode, 0 = send emails
IMAP_SINCE_DAYS=7             # Days to look back for replies
TARGET_STATUSES=Pending reply,Contacted  # Statuses to follow up
```

### 2. Prepare Your Excel File

JULES expects an Excel file with the following columns (will create them if missing):

**Required Columns:**
- `Email` - Contact email address
- `Name` - Contact name
- `Company` - Company name (optional)
- `Status` - Current status (Contacted, Pending reply, etc.)
- `Last Action Date` - Date of last action
- `Next Action` - Next step to take
- `Offer Sent` - Whether offer was sent
- `Notes / Comments` - Additional notes

**Reply Tracking Columns (auto-created):**
- `Reply?` - YES/NO if reply received
- `Reply Date` - When reply was received
- `Reply From` - Reply email address
- `Reply Subject` - Subject of reply
- `Reply Text` - Content of reply (first 1000 chars)
- `Reply Message-ID` - Email message ID

## Usage

### Test Mode (Dry Run)

First, test without sending emails:

```bash
# Make sure DRY_RUN=1 in .env
python jules_all_in_one.py
```

This will:
- ✅ Read your Excel file
- ✅ Check your IMAP inbox for replies
- ✅ Show what emails would be sent
- ❌ NOT send any actual emails

### Production Mode

When you're ready to send real emails:

```bash
# Set DRY_RUN=0 in .env
python jules_all_in_one.py
```

### Scheduling

You can schedule JULES to run automatically:

**Linux/Mac (cron):**
```bash
# Run every 6 hours
0 */6 * * * cd /path/to/project && python jules_all_in_one.py
```

**Windows (Task Scheduler):**
Create a scheduled task to run `jules_all_in_one.py` at your preferred interval.

## How It Works

### 1. Follow-up Logic

JULES checks each contact in your Excel with status "Pending reply" or "Contacted":
- If `Last Action Date` was more than `FOLLOWUP_AFTER_HOURS` ago
- And no reply has been received (`Reply?` != YES)
- Then: Send a follow-up email and update status to "Follow-up sent"

### 2. Reply Processing

JULES reads your IMAP inbox for the past `IMAP_SINCE_DAYS`:
- Matches replies to contacts by email address
- Extracts reply text, subject, date, and message ID
- Writes all reply data to Excel columns
- Classifies interest level based on keywords

### 3. Interest Classification

**"Interested" keywords:**
- interested, let's talk, call, meeting, meet, discuss
- deck, nda, dataroom, me interesa, hablemos, etc.

**"Not interested" keywords:**
- not interested, no gracias, pass, we'll pass
- not a fit, no encaja, no me interesa, etc.

**Status Updates:**
- If classified as "Interested" → Next Action: "Schedule meeting"
- If classified as "Not interested" → Next Action: "Close"
- Otherwise → Next Action: "Follow up"

## Example Output

```
🤖 JULES ALL-IN-ONE starting...
📊 Excel: /path/to/contacts.xlsx
📧 IMAP: contact@tryonyou.app@imap.porkbun.com
📤 SMTP: contact@tryonyou.app@smtp.porkbun.com
🔔 Telegram: ✅
🏃 Dry run: True

✅ Loaded 25 contacts from Excel
📬 Fetching IMAP replies (last 7 days)...
✅ Found 3 emails
  💬 Reply from startup1@example.com: Re: TRYONYOU Pilot Opportunity
  📤 Follow-up needed for startup2@example.com (52.3h since last action)
    🏃 DRY RUN - would send

💾 Saved Excel: /path/to/contacts.xlsx

🤖 JULES ALL-IN-ONE Summary

📊 Contacts processed: 25
📬 Replies found: 3
💬 Replies processed: 1
📤 Follow-ups sent: 1

🏃 Dry run: True

✅ Telegram notification sent

✨ JULES completed!
```

## Troubleshooting

### "Missing env var: EXCEL_PATH"
Make sure you have a `.env` file with all required variables set.

### IMAP Connection Errors
- Verify your IMAP credentials are correct
- Check that IMAP is enabled in your email provider settings
- Ensure firewall allows port 993 (IMAP SSL)

### SMTP Send Failures
- Verify your SMTP credentials are correct
- Check that SMTP is enabled in your email provider settings
- Ensure firewall allows port 587 (SMTP TLS)
- Try `DRY_RUN=1` first to test without sending

### No Replies Detected
- Check `IMAP_SINCE_DAYS` - increase if replies are older
- Verify email addresses in Excel match exactly (case-insensitive)
- Check that replies are in INBOX (not other folders)

## Security Best Practices

- ✅ **Never commit `.env` file** to version control
- ✅ Use app-specific passwords for email providers
- ✅ Store credentials securely (use environment variables or secrets manager)
- ✅ Test with `DRY_RUN=1` first
- ✅ Regularly rotate passwords and tokens

## License

Private - TRYONYOU © 2025
