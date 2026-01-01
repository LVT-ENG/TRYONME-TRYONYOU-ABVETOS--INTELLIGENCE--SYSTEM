/*
   ☁️ TRYONYOU DAILY PLANNER & ORCHESTRATOR
   Basado en Source [10]: automation/google-apps-script/dailyPlanner.gs
*/

const SCRIPT_PROPS = PropertiesService.getScriptProperties();
const CFG = {
  SHEET: 'Dashboard',
  // Fetch token from Script Properties
  TELEGRAM_BOT: SCRIPT_PROPS.getProperty('TELEGRAM_BOT_TOKEN'),
  // Fetch chat ID from Script Properties
  TELEGRAM_CHAT_MAIN: SCRIPT_PROPS.getProperty('TELEGRAM_CHAT_ID'),
  TZ: 'Europe/Madrid'
};

// Mapa de "Cómo ejecutar" basado en tus scripts existentes
const HOWTO = {
  'dominio': 'Ejecutar `./setup-vercel-domain.sh` en terminal local [Source 239]',
  'ci/cd': 'Mover workflows de `workflows_to_activate/` a `.github/workflows/` [Source 722]',
  'legal': 'Arrastrar PDFs a `TRYONYOU_DEPLOY_EXPRESS_INBOX` (No commitear directo) [Source 34]',
  'performance': 'Ejecutar `./scripts/optimize-images.sh` [Source 663]',
  'backup': 'El script `deploy_express.sh` genera backup automático en cada ejecución [Source 752]'
};

function sendDailyReport() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG.SHEET);
  const data = sheet.getDataRange().getValues();
  const today = new Date();

  let message = `🗓️ *PLAN DE CHOQUE TRYONYOU* - Día ${today.getDate()}\n`;
  message += `🎯 *Prioridad: Estabilización Infra + Legal*\n\n`;

  let tasksFound = 0;

  // Empezar en fila 1 para saltar cabeceras
  for (let i = 1; i < data.length; i++) {
    const [id, priority, category, task, owner, dueDate, status] = data[i];

    // Filtrar: Solo pendientes y Alta Prioridad (P0/P1)
    if (status !== 'Completado' && (priority === 'P0' || priority === 'P1')) {
      tasksFound++;
      message += `*${tasksFound}. [${priority}]* ${task}\n`;
      message += `👤 ${owner} | 🚨 Vence: ${formatDate(dueDate)}\n`;

      // Buscar consejo de ejecución inteligente
      for (const [key, instruction] of Object.entries(HOWTO)) {
        if (task.toLowerCase().includes(key)) {
          message += `💡 *Ejecución:* ${instruction}\n`;
        }
      }
      message += `\n`;
    }
  }

  if (tasksFound > 0) {
    sendTelegram(message);
  }
}

function sendTelegram(text) {
  const url = `https://api.telegram.org/bot${CFG.TELEGRAM_BOT}/sendMessage`;
  const payload = {
    'chat_id': CFG.TELEGRAM_CHAT_MAIN,
    'text': text,
    'parse_mode': 'Markdown'
  };

  UrlFetchApp.fetch(url, {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  });
}

function formatDate(date) {
  return Utilities.formatDate(new Date(date), CFG.TZ, 'dd/MM');
}
