/**
 * TRYONYOU – Daily Planner (9:00) + Telegram Notifier
 * 
 * This script sends a daily report at 09:00 CEST with the most important tasks (P0 and P1)
 * and provides AI-agent-based guidance on how to complete them.
 * 
 * Setup Instructions:
 * 1. Open your Google Sheet Dashboard
 * 2. Go to Extensions → Apps Script → New project
 * 3. Copy this entire script
 * 4. Update the CFG object with your Telegram bot token
 * 5. Run createDailyTrigger() once to set up the daily trigger at 09:00
 * 6. Authorize the permissions when prompted
 */

const CFG = {
  SHEET: 'Dashboard',
  TELEGRAM_BOT: 'PASTE_TELEGRAM_BOT_TOKEN',
  TELEGRAM_CHAT_MAIN: '7868120279',  // Rubén
  TZ: 'Europe/Madrid'
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
