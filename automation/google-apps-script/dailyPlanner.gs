/**
 * TRYONYOU – PMV + ABVETOS Core Integration
 * Daily Planner (9:00) + Telegram Notifier + Agent Sync
 * 
 * This script combines:
 * - Daily task reports at 09:00 CEST with P0/P1 priorities
 * - AI-agent-based guidance for task execution
 * - Automatic sync of active ABVETOS agents to Dashboard
 * 
 * Setup Instructions:
 * 1. Open your Google Sheet Dashboard
 * 2. Go to Extensions → Apps Script → New project
 * 3. Copy this entire script
 * 4. Update the CFG object with your Telegram bot token
 * 5. Run createDailyTrigger() once to set up the daily trigger at 09:00
 * 6. Run pmv_syncAgents() manually or set up daily sync trigger
 * 7. Authorize the permissions when prompted
 */

const CFG = {
  SHEET: 'Dashboard',
  TELEGRAM_BOT: 'PASTE_TELEGRAM_BOT_TOKEN',
  TELEGRAM_CHAT_MAIN: '7868120279',  // Rubén
  TZ: 'Europe/Madrid',
  REGISTRY_URL: 'https://tryonyou.app/data/agents_registry.json'  // Agents registry endpoint
};

const HOWTO = {
  'deploy': [
    'Agente 70 + Deploy Operator → usar workflow `deploy.yml` con Vercel CLI.',
    'Verifica secrets `VERCEL_TOKEN/ORG/PROJECT` y dispara `workflow_dispatch`.'
  ],
  'hero': [
    'Equipo Visual + Brand Guardian → generar `hero-bg.png` y `hero.mp4` (H.265).',
    'Optimizar con `ffmpeg -crf 23 -b:v 1800k` y preload playsinline.'
  ],
  'investor': [
    'Content Pro + Image Curator → completar slides del deck y exportar PDF.',
    'Guardar en `/docs/investors/TRYONYOU_Deck.pdf`.'
  ],
  'epct': [
    'Document Locker + Legal Team → integrar Technical Field / Claims 15–17.',
    'Actualizar `/docs/patent/EPCT_MASTER_2025.pdf`.'
  ]
};

/**
 * Main function that generates and sends the daily task report
 * This function is triggered daily at 09:00 CEST
 */
function dailyPlanner() {
  const tz = Session.getScriptTimeZone() || CFG.TZ;
  const sheet = SpreadsheetApp.getActive().getSheetByName(CFG.SHEET);
  const values = sheet.getDataRange().getValues();
  const today = new Date();
  const todayStr = Utilities.formatDate(today, tz, 'yyyy-MM-dd');

  // Filter and process tasks
  // Expected columns: [0]=ID, [1]=Priority, [2]=?, [3]=Task, [4]=Owner, [5]=Due Date, [6]=Status
  const tasks = values.filter((r,i)=>i>0 && r[5] && r[6]!=='Completado')
    .map(r=>({prio:r[1], task:r[3], owner:r[4], due:Utilities.formatDate(new Date(r[5]),tz,'yyyy-MM-dd')}))
    .filter(t=>t.due<=todayStr && ['P0','P1'].includes(t.prio))
    .sort((a,b)=>a.prio.localeCompare(b.prio));

  // Build message
  let msg = `🗓️ *TRYONYOU – Plan del Día*\n_${todayStr}_\n\n`;
  if (!tasks.length) msg += 'No hay tareas críticas hoy. ✅\n';
  else {
    tasks.forEach((t,i)=>{
      msg += `*${i+1}. [${t.prio}]* ${t.task}\n👤 ${t.owner}  ⏰ ${t.due}\n`;
      msg += howToBlock(t.task);
    });
  }
  sendTG(msg);
}

/**
 * Generates how-to instructions based on task keywords
 * @param {string} task - The task description
 * @return {string} How-to instructions
 */
function howToBlock(task) {
  const key = Object.keys(HOWTO).find(k=>task.toLowerCase().includes(k));
  if (!key) return '• Ejecutar según el flujo asignado por PMV.\n';
  return HOWTO[key].map(x=>'• '+x).join('\n')+'\n';
}

/**
 * Sends a message to Telegram using the bot API
 * @param {string} text - The message text to send
 */
function sendTG(text) {
  const url = `https://api.telegram.org/bot${CFG.TELEGRAM_BOT}/sendMessage`;
  UrlFetchApp.fetch(url,{method:'post',payload:{chat_id:CFG.TELEGRAM_CHAT_MAIN,text,parse_mode:'Markdown'}});
}

/**
 * Creates a daily trigger for the dailyPlanner function
 * Run this function ONCE to set up the automation
 */
function createDailyTrigger() {
  ScriptApp.newTrigger('dailyPlanner').timeBased().atHour(9).everyDays(1).create();
}

/**
 * Test function to manually trigger the daily planner
 * Use this to test the script before setting up the trigger
 */
function testDailyPlanner() {
  Logger.log('Testing daily planner...');
  dailyPlanner();
  Logger.log('Daily planner test completed!');
}

/**
 * Utility function to list all existing triggers
 * Useful for debugging or managing triggers
 */
function listTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach((trigger, index) => {
    Logger.log(`Trigger ${index + 1}:`);
    Logger.log(`  Function: ${trigger.getHandlerFunction()}`);
    Logger.log(`  Event Type: ${trigger.getEventType()}`);
  });
}

/**
 * Utility function to delete all existing triggers
 * Use this if you need to reset the automation
 */
function deleteAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    ScriptApp.deleteTrigger(trigger);
  });
  Logger.log(`Deleted ${triggers.length} trigger(s)`);
}

// ============================================================================
// PMV + ABVETOS CORE INTEGRATION
// ============================================================================

/**
 * Imports active agents from the ABVETOS registry to the PMV Dashboard
 * This function synchronizes the agent list with the Google Sheets Dashboard
 * 
 * Features:
 * - Fetches agents from the registry URL
 * - Filters only active agents
 * - Creates dashboard entries with proper formatting
 * - Updates existing entries or creates new ones
 * - Sets proper priorities, dates, and statuses
 */
function pmv_syncAgents() {
  const sh = SpreadsheetApp.getActive().getSheetByName(CFG.SHEET);
  
  // Fetch the agents registry
  try {
    const resp = UrlFetchApp.fetch(CFG.REGISTRY_URL);
    const registry = JSON.parse(resp.getContentText());
    // Filter only agents whose status is 'active', since registry.active may include agents with other statuses (e.g., 'backstage')
    const activeAgents = (registry.active || []).filter(agent => agent.status === 'active');
    
    // Get header row to find column indices
    const header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    const idx = Object.fromEntries(header.map((h, i) => [h, i + 1]));
    
    // Validate required columns exist
    const requiredCols = ['ID', 'Tarea', 'Responsable', 'Prioridad', 'Fecha de entrega', 'Estado', 'Etiquetas', 'Nota', 'Última actualización'];
    const missingCols = requiredCols.filter(col => !idx[col]);
    if (missingCols.length > 0) {
      throw new Error(`Missing required columns: ${missingCols.join(', ')}`);
    }
    
    const now = Utilities.formatDate(new Date(), CFG.TZ, 'yyyy-MM-dd');
    const lastRow = sh.getLastRow();
    
    // Check for existing agent entries
    const existingData = sh.getRange(2, idx['ID'], Math.max(lastRow - 1, 1), 1).getValues();
    const existingIds = existingData.map(row => row[0]);
    
    // Sync each active agent
    activeAgents.forEach(agent => {
      const existingIndex = existingIds.indexOf(agent.id);
      let row;
      
      if (existingIndex !== -1) {
        // Update existing row
        row = existingIndex + 2; // +2 because array is 0-indexed and starts at row 2
      } else {
        // Add new row
        row = lastRow + 1 + (activeAgents.indexOf(agent) - existingIds.filter(id => id).length);
      }
      
      // Set values for all columns
      sh.getRange(row, idx['ID']).setValue(agent.id);
      sh.getRange(row, idx['Tarea']).setValue(`${agent.name} – Sincronizado`);
      sh.getRange(row, idx['Responsable']).setValue(agent.name);
      sh.getRange(row, idx['Prioridad']).setValue('P1');
      sh.getRange(row, idx['Fecha de entrega']).setValue(now);
      sh.getRange(row, idx['Estado']).setValue('Por hacer');
      sh.getRange(row, idx['Etiquetas']).setValue('agent-sync');
      sh.getRange(row, idx['Nota']).setValue(agent.role);
      sh.getRange(row, idx['Última actualización']).setValue(now);
    });
    
    Logger.log(`Successfully synced ${activeAgents.length} active agents to Dashboard`);
    
    // Send notification to Telegram
    const msg = `✅ *PMV Agent Sync*\n\nSincronizados ${activeAgents.length} agentes activos al Dashboard.\n_${now}_`;
    sendTG(msg);
    
  } catch (error) {
    Logger.log(`Error syncing agents: ${error.message}`);
    const errorMsg = `❌ *PMV Agent Sync Error*\n\n${error.message}`;
    sendTG(errorMsg);
  }
}

/**
 * Archives backstage agents by updating their status
 * This function finds agents marked as 'backstage' and archives them in the dashboard
 */
function pmv_archiveBackstageAgents() {
  const sh = SpreadsheetApp.getActive().getSheetByName(CFG.SHEET);
  
  try {
    const resp = UrlFetchApp.fetch(CFG.REGISTRY_URL);
    const registry = JSON.parse(resp.getContentText());
    const backstageAgents = registry.backstage || [];
    
    if (backstageAgents.length === 0) {
      Logger.log('No backstage agents to archive');
      return;
    }
    
    const header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    const idx = Object.fromEntries(header.map((h, i) => [h, i + 1]));
    
    const lastRow = sh.getLastRow();
    const data = sh.getRange(2, 1, lastRow - 1, sh.getLastColumn()).getValues();
    
    const now = Utilities.formatDate(new Date(), CFG.TZ, 'yyyy-MM-dd');
    let archivedCount = 0;
    
    backstageAgents.forEach(agent => {
      // Find the agent in the sheet
      for (let i = 0; i < data.length; i++) {
        if (data[i][idx['ID'] - 1] === agent.id) {
          const row = i + 2;
          sh.getRange(row, idx['Estado']).setValue('Archivado');
          sh.getRange(row, idx['Etiquetas']).setValue('backstage');
          sh.getRange(row, idx['Última actualización']).setValue(now);
          archivedCount++;
          break;
        }
      }
    });
    
    Logger.log(`Archived ${archivedCount} backstage agents`);
    
  } catch (error) {
    Logger.log(`Error archiving backstage agents: ${error.message}`);
  }
}

/**
 * Daily sync function that combines agent sync with task planning
 * This function should be triggered daily at 09:00
 */
function pmv_dailySync() {
  // First sync agents
  pmv_syncAgents();
  
  // Then run the daily planner
  dailyPlanner();
}

/**
 * Creates menu items for PMV + ABVETOS integration
 * This function is automatically called when the spreadsheet opens
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('PMV')
    .addItem('Sincronizar agentes activos', 'pmv_syncAgents')
    .addItem('Archivar agentes backstage', 'pmv_archiveBackstageAgents')
    .addSeparator()
    .addItem('Enviar resumen diario ahora', 'dailyPlanner')
    .addItem('Sincronización completa (agentes + tareas)', 'pmv_dailySync')
    .addToUi();
}

/**
 * Creates a daily trigger for the combined PMV sync function
 * Run this function ONCE to set up daily agent sync + task planning
 */
function createDailySyncTrigger() {
  ScriptApp.newTrigger('pmv_dailySync').timeBased().atHour(9).everyDays(1).create();
  Logger.log('Daily sync trigger created for 09:00');
}
