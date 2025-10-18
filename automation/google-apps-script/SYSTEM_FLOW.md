# Daily Planner System Flow

## 🔄 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRYONYOU Daily Planner System                │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│  Google Sheets   │          │  Google Apps     │          │    Telegram      │
│    Dashboard     │◄────────►│     Script       │─────────►│   Bot API        │
│                  │          │                  │          │                  │
│  ┌────────────┐  │          │  ┌────────────┐  │          │  ┌────────────┐  │
│  │ P0 Tasks   │  │          │  │ Daily      │  │          │  │ Formatted  │  │
│  │ P1 Tasks   │  │  Read    │  │ Planner    │  │  Send    │  │ Message    │  │
│  │ Due Dates  │  │  ───►    │  │ Function   │  │  ───►    │  │ with Tasks │  │
│  │ Owners     │  │          │  │            │  │          │  │ + Guidance │  │
│  │ Status     │  │          │  │ Filter &   │  │          │  │            │  │
│  └────────────┘  │          │  │ Process    │  │          │  └────────────┘  │
│                  │          │  └────────────┘  │          │                  │
│                  │          │                  │          │        │         │
│  Task Data       │          │  Business Logic  │          │        ▼         │
│                  │          │                  │          │                  │
│                  │          │  ┌────────────┐  │          │  ┌────────────┐  │
│                  │          │  │ AI Agent   │  │          │  │ Mobile     │  │
│                  │          │  │ Guidance   │  │          │  │ Device     │  │
│                  │          │  │ HOWTO Map  │  │          │  │            │  │
│                  │          │  └────────────┘  │          │  │ Rubén      │  │
│                  │          │                  │          │  │ 7868120279 │  │
└──────────────────┘          └──────────────────┘          └──────────────────┘
        ▲                              │                             │
        │                              │                             │
        │      ┌─────────────────────┐ │                             │
        │      │  Time-based Trigger │ │                             │
        └──────┤   Daily @ 09:00 CEST├─┘                             │
               └─────────────────────┘                               │
                                                                      ▼
                                                              ┌──────────────┐
                                                              │   End User   │
                                                              │  Receives    │
                                                              │  Daily Plan  │
                                                              └──────────────┘
```

## 📊 Data Flow

### Step 1: Trigger Activation (09:00 CEST Daily)
```
Time-based Trigger → Activates dailyPlanner() function
```

### Step 2: Data Retrieval
```
Google Apps Script
    ↓
SpreadsheetApp.getActive()
    ↓
getSheetByName('Dashboard')
    ↓
getDataRange().getValues()
    ↓
Raw data array
```

### Step 3: Data Filtering & Processing
```
Filter Tasks:
├── Skip header row (index 0)
├── Must have due date (column F not empty)
├── Status ≠ "Completado" (column G)
├── Due date ≤ today
├── Priority = "P0" OR "P1"
└── Sort by priority (P0 first)
```

### Step 4: Message Generation
```
For each filtered task:
├── Format task details
│   ├── Priority badge: *[P0]* or *[P1]*
│   ├── Task description
│   ├── Owner: 👤 Name
│   └── Due date: ⏰ YYYY-MM-DD
│
└── Add AI-Agent guidance
    ├── Search task for keywords: deploy, hero, investor, epct
    ├── Match to HOWTO map
    └── Append execution instructions
```

### Step 5: Message Delivery
```
Format: Markdown
    ↓
Telegram Bot API: /sendMessage
    ↓
HTTP POST Request
    ↓
Telegram Server
    ↓
Push notification to mobile device
    ↓
User receives daily plan
```

## 🔍 Example Flow

### Input Data (Google Sheet)
```
| ID | Priority | Category | Task                | Owner | Due Date   | Status      |
|----|----------|----------|---------------------|-------|------------|-------------|
| 1  | P0       | Deploy   | Deploy producción   | Rubén | 2025-01-15 | En Progreso |
| 2  | P1       | Feature  | Hero video homepage | Team  | 2025-01-15 | En Progreso |
| 3  | P2       | Bug      | Fix mobile layout   | Dev   | 2025-01-15 | En Progreso |
```

### Processing Logic (Today = 2025-01-15)
```javascript
// Row 1: P0, due 2025-01-15, not Completado → ✅ INCLUDE
// Row 2: P1, due 2025-01-15, not Completado → ✅ INCLUDE
// Row 3: P2, due 2025-01-15, not Completado → ❌ EXCLUDE (P2 priority)
```

### Output Message (Telegram)
```
🗓️ TRYONYOU – Plan del Día
2025-01-15

*1. [P0]* Deploy producción
👤 Rubén  ⏰ 2025-01-15
• Agente 70 + Deploy Operator → usar workflow `deploy.yml` con Vercel CLI.
• Verifica secrets `VERCEL_TOKEN/ORG/PROJECT` y dispara `workflow_dispatch`.

*2. [P1]* Hero video homepage
👤 Team  ⏰ 2025-01-15
• Equipo Visual + Brand Guardian → generar `hero-bg.png` y `hero.mp4` (H.265).
• Optimizar con `ffmpeg -crf 23 -b:v 1800k` y preload playsinline.
```

## 🎯 Component Responsibilities

### Google Sheets (Data Layer)
- **Role**: Task database
- **Responsibilities**:
  - Store all project tasks
  - Maintain current status
  - Track owners and deadlines
- **Access**: Manual updates by team members

### Google Apps Script (Business Logic)
- **Role**: Processing engine
- **Responsibilities**:
  - Read and filter data
  - Apply business rules (P0/P1, dates)
  - Generate formatted messages
  - Map tasks to AI-agent guidance
- **Access**: Automated execution + manual testing

### Telegram Bot (Delivery Layer)
- **Role**: Notification system
- **Responsibilities**:
  - Accept API requests
  - Deliver messages to users
  - Support Markdown formatting
- **Access**: Bot API via HTTPS

### Time Trigger (Scheduler)
- **Role**: Automation trigger
- **Responsibilities**:
  - Execute script at 09:00 CEST
  - Run daily without manual intervention
- **Access**: Google Apps Script Triggers

## 🔐 Security Flow

```
┌──────────────────┐
│  User Setup      │
│  (One-time)      │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│  Store Credentials Securely  │
│  in Google Apps Script       │
│  (TELEGRAM_BOT token)        │
└────────┬─────────────────────┘
         │
         ▼
┌───────────────────────────────┐
│  Script Authorization         │
│  (Google OAuth)               │
│  - Read Sheet                 │
│  - External URL Fetch         │
└────────┬──────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Encrypted HTTPS              │
│  Telegram API Communication   │
└───────────────────────────────┘
```

## ⚙️ Configuration Points

### 1. Script Configuration (CFG object)
```javascript
SHEET: 'Dashboard'              // ← Sheet name to read
TELEGRAM_BOT: 'token'           // ← Bot authentication
TELEGRAM_CHAT_MAIN: 'chat_id'   // ← Target recipient
TZ: 'Europe/Madrid'             // ← Timezone for CEST
```

### 2. Business Rules (Hardcoded)
```javascript
Priorities: ['P0', 'P1']        // ← Which priorities to include
Status: '!== Completado'        // ← Exclude completed tasks
Date: '<= today'                // ← Today and overdue only
```

### 3. AI-Agent Mapping (HOWTO object)
```javascript
Keywords: deploy, hero, investor, epct
Default: PMV flow guidance
```

### 4. Trigger Schedule
```javascript
Time: 09:00 (9 AM)
Frequency: Daily
Timezone: Script project timezone
```

## 🔄 Error Handling

```
Script Execution
    ↓
Try: Get Sheet
    ├─ Success → Continue
    └─ Fail → Log error, exit
        ↓
Try: Read Data
    ├─ Success → Continue
    └─ Fail → Log error, exit
        ↓
Try: Filter Tasks
    ├─ Success → Continue
    └─ Fail → Send empty message
        ↓
Try: Send Telegram
    ├─ Success → Complete
    └─ Fail → Log error
        ↓
    End
```

## 📈 Scalability Considerations

### Current Capacity
- **Tasks**: Unlimited (limited by Google Sheets)
- **Recipients**: 1 (Rubén)
- **Frequency**: Daily
- **Execution Time**: < 10 seconds

### Future Expansion Options
1. **Multiple Recipients**: Add chat IDs array
2. **Custom Schedules**: Different times for different teams
3. **Rich Media**: Attach screenshots, charts
4. **Two-way Integration**: Update status from Telegram
5. **Analytics**: Track completion rates

## 🎨 Message Format Options

### Current: Markdown
```
*Bold text*
_Italic text_
`Code text`
```

### Future Options
- HTML formatting
- Inline buttons
- Rich cards
- Images/attachments

---

**System Version**: 1.0  
**Architecture**: Serverless (Google Apps Script)  
**Cost**: Free (within Google quotas)  
**Maintenance**: Minimal (self-executing)
