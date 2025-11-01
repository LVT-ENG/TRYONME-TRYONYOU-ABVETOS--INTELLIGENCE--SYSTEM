# 🚀 Quick Start - Daily Planner Setup

## ⚡ 5-Minute Setup

### Step 1: Get Telegram Credentials (2 min)

1. **Bot Token**: Message `@BotFather` → `/newbot` → copy token
2. **Chat ID**: Message your bot → visit `https://api.telegram.org/bot<TOKEN>/getUpdates` → copy `chat_id`

### Step 2: Install Script (2 min)

1. Open your Google Sheet **"Dashboard"**
2. **Extensions** → **Apps Script**
3. Delete existing code
4. Copy-paste from `dailyPlanner.gs`
5. Update these lines:
   ```javascript
   TELEGRAM_BOT: 'YOUR_BOT_TOKEN',     // ← Paste your token
   TELEGRAM_CHAT_MAIN: 'YOUR_CHAT_ID', // ← Paste your chat ID
   ```
6. **Save** (💾) → Name it "TRYONYOU Daily Planner"

### Step 3: Test & Activate (1 min)

1. Select `testDailyPlanner` → **Run** ▶️
2. **Allow** permissions when prompted
3. Check Telegram for test message ✅
4. Select `createDailyTrigger` → **Run** ▶️
5. Done! 🎉

## ✅ Expected Behavior

Every day at **09:00 CEST**, you'll receive a Telegram message like:

```
🗓️ TRYONYOU – Plan del Día
2025-01-15

*1. [P0]* Deploy a producción
👤 Rubén  ⏰ 2025-01-15
• Agente 70 + Deploy Operator → usar workflow `deploy.yml` con Vercel CLI.
• Verifica secrets `VERCEL_TOKEN/ORG/PROJECT` y dispara `workflow_dispatch`.
```

## 📊 Sheet Format

Your "Dashboard" sheet needs these columns:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| ID | Priority | Category | Task | Owner | Due Date | Status |
| 1 | P0 | Deploy | "Deploy producción" | Rubén | 2025-01-15 | En Progreso |
| 2 | P1 | Feature | "Hero video" | Team | 2025-01-15 | Completado |

**Only shows**: P0 & P1 tasks, due today or overdue, not "Completado"

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| No message received | Check bot token & chat ID are correct |
| Wrong tasks shown | Verify sheet name is "Dashboard" |
| Trigger not running | Verify trigger exists in Apps Script → Triggers ⏰ |
| Permission error | Re-run and allow all permissions |

## 📅 Bonus: Calendar Sync

Sync pending tasks to Google Calendar:

1. Select `syncCalendar` from function dropdown
2. Click **Run** ▶️
3. Check your Google Calendar for new events

Creates all-day events for tasks with status "Pendiente":
```
⚠️ Deploy producción (Rubén)
Date: January 15, 2025
```

## 📚 Full Documentation

See [README.md](./README.md) for complete documentation, customization options, and advanced features.

---

**Need Help?** Check execution logs in Apps Script → Executions
