# Google Sheet Template - Dashboard

## 📊 Required Sheet Structure

Your Google Sheet must have a sheet named **"Dashboard"** with the following structure:

### Column Layout

| Column | Name | Type | Required | Description | Example Values |
|--------|------|------|----------|-------------|----------------|
| **A** | ID | Number | Yes | Unique task identifier | 1, 2, 3... |
| **B** | Priority | Text | Yes | Task priority level | P0, P1, P2, P3 |
| **C** | Category | Text | Optional | Task category/type | Deploy, Feature, Bug, Documentation |
| **D** | Task | Text | Yes | Task description | "Implementar hero video", "Deploy producción" |
| **E** | Owner | Text | Yes | Person responsible | Rubén, Team, DevOps |
| **F** | Due Date | Date | Yes | Task deadline | 2025-01-15, 2025-01-20 |
| **G** | Status | Text | Yes | Current status | En Progreso, Completado, Bloqueado |

### Sample Data

```
| A  | B  | C            | D                                        | E       | F          | G            |
|----|----|--------------|-----------------------------------------|---------|------------|--------------|
| ID | PR | Category     | Task                                    | Owner   | Due Date   | Status       |
| 1  | P0 | Deploy       | Deploy producción a Vercel              | Rubén   | 2025-01-15 | En Progreso  |
| 2  | P0 | Feature      | Implementar hero video en homepage      | Team    | 2025-01-15 | En Progreso  |
| 3  | P1 | Documentation| Actualizar investor deck                | Content | 2025-01-15 | En Progreso  |
| 4  | P1 | Legal        | Revisar claims patent EPCT              | Legal   | 2025-01-16 | Pendiente    |
| 5  | P2 | Feature      | Optimizar módulos 3D                    | Dev     | 2025-01-20 | En Progreso  |
| 6  | P1 | Deploy       | Configurar hero video en deploy         | DevOps  | 2025-01-14 | Completado   |
```

## 📋 Script Behavior

### Tasks Included in Daily Report

The script will **ONLY** include tasks that meet **ALL** these criteria:

✅ **Priority**: P0 or P1  
✅ **Due Date**: Today or earlier (overdue)  
✅ **Status**: NOT "Completado"  
✅ **Has Due Date**: Column F is not empty

### Tasks Excluded from Report

❌ **Priority**: P2, P3, or other values  
❌ **Due Date**: Future dates (after today)  
❌ **Status**: "Completado"  
❌ **No Due Date**: Column F is empty

### Example: What Gets Reported on 2025-01-15?

From the sample data above:

**INCLUDED** (will be in report):
- Task 1: P0, due 2025-01-15, En Progreso ✅
- Task 2: P0, due 2025-01-15, En Progreso ✅
- Task 3: P1, due 2025-01-15, En Progreso ✅

**EXCLUDED** (will NOT be in report):
- Task 4: P1, but due 2025-01-16 (future) ❌
- Task 5: P2 priority (not P0 or P1) ❌
- Task 6: P1, but status is "Completado" ❌

## 🎯 Expected Telegram Output

For the included tasks, the Telegram message would be:

```
🗓️ TRYONYOU – Plan del Día
2025-01-15

*1. [P0]* Deploy producción a Vercel
👤 Rubén  ⏰ 2025-01-15
• Agente 70 + Deploy Operator → usar workflow `deploy.yml` con Vercel CLI.
• Verifica secrets `VERCEL_TOKEN/ORG/PROJECT` y dispara `workflow_dispatch`.

*2. [P0]* Implementar hero video en homepage
👤 Team  ⏰ 2025-01-15
• Equipo Visual + Brand Guardian → generar `hero-bg.png` y `hero.mp4` (H.265).
• Optimizar con `ffmpeg -crf 23 -b:v 1800k` y preload playsinline.

*3. [P1]* Actualizar investor deck
👤 Content  ⏰ 2025-01-15
• Content Pro + Image Curator → completar slides del deck y exportar PDF.
• Guardar en `/docs/investors/TRYONYOU_Deck.pdf`.
```

## 🔧 Customization

### Change Column Positions

If your sheet has different columns, modify these indices in `dailyPlanner.gs`:

```javascript
const tasks = values.filter((r,i)=>i>0 && r[5] && r[6]!=='Completado')
  .map(r=>({
    prio: r[1],   // Column B (index 1) = Priority
    task: r[3],   // Column D (index 3) = Task
    owner: r[4],  // Column E (index 4) = Owner
    due: Utilities.formatDate(new Date(r[5]), tz, 'yyyy-MM-dd')  // Column F (index 5) = Due Date
  }))
```

**Column Index Reference** (0-based):
- A = 0
- B = 1
- C = 2
- D = 3
- E = 4
- F = 5
- G = 6

### Change Priority Levels

To include P2 tasks, modify:

```javascript
.filter(t=>t.due<=todayStr && ['P0','P1','P2'].includes(t.prio))
```

### Change Status Exclusion

To exclude different statuses:

```javascript
.filter((r,i)=>i>0 && r[5] && !['Completado', 'Cancelado'].includes(r[6]))
```

## 📝 Best Practices

1. **Consistent Formatting**
   - Use exact priority codes: P0, P1, P2, P3
   - Use "Completado" exactly (case-sensitive)
   - Keep date format consistent

2. **Date Entry**
   - Use actual date values, not text
   - Format: YYYY-MM-DD or your locale format
   - Google Sheets auto-formats dates

3. **Status Values**
   - Common: "En Progreso", "Completado", "Bloqueado", "Pendiente"
   - Be consistent with spelling and capitalization
   - Use "Pendiente" for tasks you want to sync with Google Calendar

4. **Task Descriptions**
   - Include keywords for AI-agent guidance: deploy, hero, investor, epct
   - Be specific and actionable
   - Keep under 100 characters for readability

## 📅 Calendar Synchronization

The script includes a `syncCalendar()` function that integrates tasks with Google Calendar:

### How It Works

- **Reads** all tasks from the Dashboard sheet
- **Filters** tasks with status = "Pendiente"
- **Creates** all-day calendar events with:
  - ⚠️ Warning emoji for visibility
  - Task description
  - Responsible person in parentheses
  - Event date = task due date

### Usage

Run manually from Apps Script editor:
```javascript
syncCalendar()
```

### Example Calendar Event

For a task:
- Task: "Deploy producción a Vercel"
- Owner: "Rubén"
- Due Date: 2025-01-15
- Status: "Pendiente"

Creates calendar event:
```
⚠️ Deploy producción a Vercel (Rubén)
Date: January 15, 2025 (all day)
```

## 🔗 Quick Start

Ready to set up? Follow:
1. Create your sheet with this structure
2. Add some test tasks (P0 and P1)
3. Follow [QUICK_START.md](./QUICK_START.md)

---

**Template Version**: 1.0  
**Compatible With**: dailyPlanner.gs v1.0
