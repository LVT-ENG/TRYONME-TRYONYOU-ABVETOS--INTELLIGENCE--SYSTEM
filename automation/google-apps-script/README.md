# Google Apps Script - Daily Planner & Telegram Notifier

## 📋 Overview

This automation script sends a daily report at **09:00 CEST** to Telegram with:
- 1️⃣ The most important tasks of the day (P0 and P1 priorities)
- 2️⃣ AI-agent-based guidance on how to complete them

## 🚀 Setup Instructions

### 1. Prepare Your Telegram Bot

1. **Get Bot Token** (if you don't have one):
   - Open Telegram and search for `@BotFather`
   - Send `/newbot` and follow instructions
   - Save the bot token provided

2. **Get Your Chat ID**:
   - Start a conversation with your bot
   - Send any message to it
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your `chat_id` in the response

### 2. Configure Google Sheet

Your Google Sheet should have a sheet named **"Dashboard"** with the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| A | ID/Number | 1 |
| B | Priority | P0, P1, P2, P3 |
| C | Category | Feature, Bug, Deploy |
| D | Task Description | "Implementar hero video" |
| E | Owner | Rubén, Team |
| F | Due Date | 2025-01-15 |
| G | Status | En Progreso, Completado |

**Important Notes:**
- Only tasks with priority **P0** or **P1** will be included
- Tasks with status **"Completado"** are excluded
- Only tasks due today or overdue will be reported

### 3. Install the Script

1. **Open Your Google Sheet**
   - Open the Dashboard Google Sheet where you manage tasks

2. **Access Apps Script**
   - Click on **Extensions** → **Apps Script**
   - A new tab will open with the script editor

3. **Create New Project**
   - Delete any existing code in the editor
   - Copy the entire content from `dailyPlanner.gs`
   - Paste it into the editor

4. **Configure Settings**
   - Update the `CFG` object with your values:
   ```javascript
   const CFG = {
     SHEET: 'Dashboard',                    // Your sheet name
     TELEGRAM_BOT: 'YOUR_BOT_TOKEN_HERE',  // Replace with your bot token
     TELEGRAM_CHAT_MAIN: 'YOUR_CHAT_ID',   // Replace with your chat ID
     TZ: 'Europe/Madrid'                    // Your timezone
   };
   ```

5. **Save the Project**
   - Click the **Save** icon (💾)
   - Name your project: "TRYONYOU Daily Planner"

### 4. Test the Script

Before setting up the automatic trigger, test the script:

1. **Run Test Function**
   - Select `testDailyPlanner` from the function dropdown
   - Click **Run** (▶️)

2. **Authorize Permissions**
   - First time: Click **Review permissions**
   - Select your Google account
   - Click **Advanced** → **Go to TRYONYOU Daily Planner (unsafe)**
   - Click **Allow**

3. **Check Results**
   - Open Telegram and verify you received the test message
   - Check the **Execution log** in Apps Script for any errors

### 5. Create Daily Trigger

Once testing is successful:

1. **Run Trigger Setup**
   - Select `createDailyTrigger` from the function dropdown
   - Click **Run** (▶️)

2. **Verify Trigger Creation**
   - Click on the **Clock icon** (⏰) in the left sidebar (Triggers)
   - You should see a trigger for `dailyPlanner` running daily at 9:00 AM

3. **Done!**
   - The script will now run automatically every day at 09:00 CEST

## 🎯 How It Works

### Task Processing Flow

```
1. Read Dashboard sheet → Get all rows
2. Filter tasks:
   - Skip header row (row 0)
   - Must have a due date (column F)
   - Status ≠ "Completado" (column G)
   - Due date ≤ today
   - Priority = "P0" or "P1"
3. Sort by priority (P0 first, then P1)
4. Generate message with task details
5. Add AI-agent guidance for each task
6. Send to Telegram
```

### AI-Agent Guidance

The script provides specific instructions based on task keywords:

| Keyword | Agent Team | Instructions |
|---------|-----------|--------------|
| **deploy** | Agente 70 + Deploy Operator | Use `deploy.yml` workflow with Vercel CLI |
| **hero** | Visual Team + Brand Guardian | Generate `hero-bg.png` and `hero.mp4` with H.265 |
| **investor** | Content Pro + Image Curator | Complete deck slides and export PDF |
| **epct** | Document Locker + Legal Team | Integrate Technical Field / Claims 15–17 |
| *(default)* | PMV Flow | Execute according to PMV assigned flow |

### Message Format

```
🗓️ TRYONYOU – Plan del Día
2025-01-15

*1. [P0]* Implementar hero video en homepage
👤 Rubén  ⏰ 2025-01-15
• Equipo Visual + Brand Guardian → generar `hero-bg.png` y `hero.mp4` (H.265).
• Optimizar con `ffmpeg -crf 23 -b:v 1800k` y preload playsinline.

*2. [P1]* Deploy producción Vercel
👤 DevOps  ⏰ 2025-01-15
• Agente 70 + Deploy Operator → usar workflow `deploy.yml` con Vercel CLI.
• Verifica secrets `VERCEL_TOKEN/ORG/PROJECT` y dispara `workflow_dispatch`.
```

## 🛠️ Utility Functions

### Test the Planner Manually
```javascript
testDailyPlanner()
```
Sends an immediate test report to verify configuration.

### List All Triggers
```javascript
listTriggers()
```
Shows all configured triggers in the execution log.

### Delete All Triggers
```javascript
deleteAllTriggers()
```
Removes all triggers (useful for resetting).

## 🔧 Troubleshooting

### No Message Received

1. **Check Bot Token**
   - Verify the token is correct in `CFG.TELEGRAM_BOT`
   - Test token: `https://api.telegram.org/bot<TOKEN>/getMe`

2. **Check Chat ID**
   - Verify you've started a conversation with the bot
   - Confirm `CFG.TELEGRAM_CHAT_MAIN` is correct

3. **Check Execution Log**
   - Apps Script Editor → **Executions** (left sidebar)
   - Look for error messages

### Wrong Tasks Shown

1. **Check Sheet Name**
   - Verify `CFG.SHEET` matches your actual sheet name
   - Sheet names are case-sensitive

2. **Check Column Positions**
   - Script expects: [A]=ID, [B]=Priority, [D]=Task, [E]=Owner, [F]=Due Date, [G]=Status
   - Adjust column indices in the script if needed

3. **Check Date Format**
   - Due dates should be valid dates
   - Status should be exactly "Completado" to exclude

### Trigger Not Running

1. **Check Trigger Exists**
   - Apps Script → Triggers (⏰)
   - Should show `dailyPlanner` running daily

2. **Check Timezone**
   - Verify `CFG.TZ` matches your desired timezone
   - Trigger runs at 9 AM in the project's timezone

3. **Check Quotas**
   - Apps Script has daily quotas
   - Free accounts: 100 trigger executions/day

## 📝 Customization

### Add New Task Keywords

Edit the `HOWTO` object to add new guidance:

```javascript
const HOWTO = {
  'deploy': [...],
  'hero': [...],
  'mynewkeyword': [
    'Agent Team → instruction 1',
    'Specific step 2'
  ]
};
```

### Change Schedule

Modify the trigger hour (0-23):

```javascript
ScriptApp.newTrigger('dailyPlanner')
  .timeBased()
  .atHour(9)  // Change this to your preferred hour
  .everyDays(1)
  .create();
```

### Support Multiple Recipients

Add more chat IDs to `CFG`:

```javascript
const CFG = {
  // ...
  TELEGRAM_CHAT_MAIN: '7868120279',
  TELEGRAM_CHAT_BACKUP: '1234567890',
};

// Then in sendTG function:
function sendTG(text) {
  const chats = [CFG.TELEGRAM_CHAT_MAIN, CFG.TELEGRAM_CHAT_BACKUP];
  chats.forEach(chat_id => {
    const url = `https://api.telegram.org/bot${CFG.TELEGRAM_BOT}/sendMessage`;
    UrlFetchApp.fetch(url,{method:'post',payload:{chat_id,text,parse_mode:'Markdown'}});
  });
}
```

## 🔐 Security Notes

- ⚠️ **Never commit bot tokens** to version control
- 🔒 Keep your Apps Script project private
- 🔄 Rotate bot tokens periodically
- 👥 Limit sheet access to authorized team members only

## 📚 Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Time-driven Triggers](https://developers.google.com/apps-script/guides/triggers/installable#time-driven_triggers)

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review execution logs in Apps Script
- Verify your Google Sheet structure
- Test with `testDailyPlanner()` function

---

**Version**: 1.0  
**Last Updated**: 2025-01-15  
**Maintainer**: TRYONYOU Team
