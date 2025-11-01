# PMV + ABVETOS Core Integration

## 📋 Overview

This integration synchronizes the ABVETOS agent registry with your Google Sheets Dashboard, enabling automated tracking and management of the 50 intelligent agents in the TRYONYOU ecosystem.

## 🎯 Features

- **Automatic Agent Sync**: Imports active agents from the registry to your Dashboard
- **Backstage Agent Management**: Archives agents that are no longer active
- **Daily Automation**: Set up automatic daily synchronization at 09:00
- **Status Tracking**: Monitor agent sync status and view statistics
- **Full Integration**: Works seamlessly with existing PMV Daily Planner

## 📁 Files Included

1. **pmv_abvetos_integration.gs** - Google Apps Script for agent synchronization
2. **agents_registry.json** - JSON registry of all 50 TRYONYOU agents
3. **abvetos_auto_integrate.sh** - Background monitoring script
4. **PMV_ABVETOS_INTEGRATION_README.md** - This documentation file

## 🚀 Quick Start

### Prerequisites

- Google Sheet with "Dashboard" sheet
- Required columns: ID, Tarea, Responsable, Prioridad, Fecha de entrega, Estado, Etiquetas, Nota, Última actualización
- Access to Google Apps Script
- (Optional) Linux/Unix environment for background script

### Installation Steps

#### 1. Deploy the Agent Registry

The agents registry is located at `public/data/agents_registry.json`. Ensure it's accessible at:
```
https://tryonyou.app/data/agents_registry.json
```

Or update the `REGISTRY_URL` in the script to point to your hosted location or Google Drive.

#### 2. Install Google Apps Script

1. Open your Google Sheet Dashboard
2. Go to **Extensions** → **Apps Script**
3. Create a new file called `pmv_abvetos_integration.gs`
4. Copy the entire content from `pmv_abvetos_integration.gs`
5. Update `REGISTRY_URL` if needed
6. Save the project

#### 3. Merge with Existing Scripts

If you already have `dailyPlanner.gs` installed:

**Option A: Keep separate onOpen functions**
- Apps Script will combine menu items from all onOpen functions automatically

**Option B: Merge manually**
- Add the agent sync menu items to your existing onOpen function:

```javascript
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('PMV')
    .addItem('Sincronizar con Calendar', 'pmv_syncCalendar')
    .addItem('Enviar resumen diario ahora', 'pmv_dailyDigest')
    .addSeparator()
    .addItem('Sincronizar agentes activos', 'pmv_syncAgents')
    .addItem('Archivar agentes backstage', 'pmv_archiveBackstageAgents')
    .addItem('Sincronización completa', 'pmv_fullSync')
    .addSeparator()
    .addItem('Configurar sincronización diaria', 'pmv_createSyncTrigger')
    .addToUi();
}
```

#### 4. Test the Integration

1. In Apps Script, select `pmv_testIntegration` from the function dropdown
2. Click **Run** (▶️)
3. Check the **Execution log** for results
4. Verify that the registry is accessible

#### 5. Run Initial Sync

1. Reload your Google Sheet
2. You should see the **PMV** menu
3. Click **PMV** → **Sincronizar agentes activos**
4. Check your Dashboard sheet for the new agent entries

#### 6. Set Up Automatic Daily Sync

1. In Google Sheet, click **PMV** → **Configurar sincronización diaria**
2. This creates a trigger to run at 09:00 daily
3. Verify: Go to Apps Script → Triggers (⏰) to see the configured trigger

## 🔄 Flujo Automático (Automatic Flow)

### 1. Initial Load
Run `pmv_syncAgents()` to populate the Dashboard with 15 active agents from the registry.

### 2. Future Changes
When Agent 70 or PMV changes an agent's status to "backstage" or "active", the system re-synchronizes automatically:
- Active agents are added/updated
- Backstage agents are archived

### 3. Daily Automation
Set up a daily trigger (09:00) to run `pmv_fullSync()`:
- **Apps Script** → **Triggers** (⏰) → **Add trigger**
- Function: `pmv_fullSync`
- Event source: Time-driven
- Type: Day timer
- Time: 9:00 AM

## 📊 Dashboard Structure

### Agent Entries

Each synchronized agent creates a row with:

| Column | Value | Description |
|--------|-------|-------------|
| ID | agent-XXX | Unique agent identifier |
| Tarea | Agent Name – Sincronizado | Agent name with sync status |
| Responsable | Agent Name | Agent responsible name |
| Prioridad | P1 | Priority level (P1 for agents) |
| Fecha de entrega | YYYY-MM-DD | Current date |
| Estado | Por hacer / Hecha | Active or archived status |
| Etiquetas | agent-sync, archivado | Tags for filtering |
| Nota | Agent role description | Full role description |
| Última actualización | YYYY-MM-DD | Last sync date |

## 🛠️ Available Functions

### Synchronization Functions

#### `pmv_syncAgents()`
Imports all active agents from the registry to the Dashboard.

#### `pmv_archiveBackstageAgents()`
Archives agents that have been moved to "backstage" status by:
- Setting Estado to "Hecha"
- Adding "archivado" tag

#### `pmv_fullSync()`
Performs both sync and archive operations in sequence.

### Configuration Functions

#### `pmv_createSyncTrigger()`
Creates a daily trigger at 09:00 for automatic synchronization.

### Utility Functions

#### `pmv_testIntegration()`
Tests the integration setup:
- Verifies registry accessibility
- Checks Dashboard sheet existence
- Validates column structure

#### `pmv_viewSyncStatus()`
Displays sync statistics:
- Total synced agents
- Active agents count
- Archived agents count

## 🖥️ Background Script Usage

The `abvetos_auto_integrate.sh` script provides continuous monitoring of the agent registry.

### Start in Background

```bash
cd ~/TRYONYOU_DEPLOY_EXPRESS_INBOX
nohup ./abvetos_auto_integrate.sh > /dev/null 2>&1 &
```

### Check Status

```bash
./abvetos_auto_integrate.sh status
```

### Stop Service

```bash
./abvetos_auto_integrate.sh stop
```

### View Help

```bash
./abvetos_auto_integrate.sh --help
```

## ✅ Expected Results

- **Dashboard reflects active agents**: All 15 active agents are visible
- **Auto-populated columns**: Responsable, Tarea, and Nota are filled automatically
- **Backstage archival**: When agents move to "backstage", their status changes to "Hecha" with "archivado" tag
- **PMV monitoring**: Agent 70 can monitor active agents and real progress from PMV

## 🔧 Customization

### Change Sync Schedule

Modify the trigger hour in `pmv_createSyncTrigger()`:

```javascript
ScriptApp.newTrigger('pmv_fullSync')
  .timeBased()
  .atHour(14)  // Change to 2 PM
  .everyDays(1)
  .create();
```

### Change Priority Level

Modify the priority assigned to synced agents:

```javascript
sh.getRange(row, idx['Prioridad']).setValue('P2'); // Change from P1 to P2
```

### Use Google Drive for Registry

If hosting the registry in Google Drive:

```javascript
const REGISTRY_URL = 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID';
```

## 🔍 Troubleshooting

### Registry Not Accessible

**Error**: "Exception: Request failed for https://tryonyou.app..."

**Solution**: 
1. Verify the registry URL is correct
2. Check if the file is publicly accessible
3. Consider hosting on Google Drive instead

### Missing Columns

**Error**: "Missing required columns: ..."

**Solution**: 
Add the missing columns to your Dashboard sheet header row.

### Duplicate Entries

**Problem**: Agents appear multiple times after sync

**Solution**: 
- Delete duplicate rows manually
- Run `pmv_syncAgents()` only once, or after clearing previous entries
- Use filters to identify duplicates by ID

### No Menu Appearing

**Problem**: PMV menu doesn't show after installation

**Solution**:
1. Refresh the Google Sheet
2. Check Apps Script for errors
3. Ensure `onOpen()` function is saved
4. Manually run `onOpen()` from Apps Script

## 📈 Monitoring Agent Status

### View Active Agents

Filter Dashboard by:
- Etiquetas contains "agent-sync"
- Estado = "Por hacer"

### View Archived Agents

Filter Dashboard by:
- Etiquetas contains "archivado"
- Estado = "Hecha"

### View Sync Statistics

Run `pmv_viewSyncStatus()` in Apps Script and check the execution log.

## 🔐 Security Notes

- Keep registry URL accessible but consider authentication
- Limit Dashboard sheet access to authorized team members
- Review agent data before syncing
- Monitor execution logs for unauthorized access

## 📚 Related Documentation

- [Daily Planner README](./README.md) - PMV Daily Task Planner
- [Quick Start Guide](./QUICK_START.md) - 5-minute setup guide
- [Agents Documentation](../../docs/agentes.md) - Full agent descriptions

## 🤝 Integration with Daily Planner

This integration works alongside the existing Daily Planner:

1. **Morning Report (09:00)**: Daily Planner sends task summary via Telegram
2. **Agent Sync (09:00)**: ABVETOS Integration updates agent status
3. **Continuous Monitoring**: Background script watches for registry changes
4. **Unified Dashboard**: All information in one Google Sheet

## 💡 Best Practices

1. **Initial Setup**: Run manual sync first, verify results, then enable automation
2. **Regular Reviews**: Check synced agents weekly to ensure accuracy
3. **Archive Management**: Periodically review and clean archived agents
4. **Backup**: Export Dashboard data regularly
5. **Testing**: Use `pmv_testIntegration()` before major changes

## 📞 Support

For issues or questions:
1. Check execution logs in Apps Script
2. Run `pmv_testIntegration()` to diagnose
3. Review this documentation
4. Check related documentation files

---

**Version**: 1.0.0  
**Last Updated**: 2025-11-01  
**Maintainer**: TRYONYOU Team
