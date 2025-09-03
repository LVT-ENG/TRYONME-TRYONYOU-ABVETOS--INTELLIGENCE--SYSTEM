/**
 * deploy_notify_bot.js
 * Script para enviar notificaciones de deploy de Vercel a Telegram
 * Proyecto: TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuración
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // tu token
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;     // chat ID del bot @rubensanzburo_bot

// Información del deploy
const deployInfo = {
  fileName: process.env.DEPLOY_FILE || 'Desconocido',
  commit: process.env.DEPLOY_COMMIT || 'Sin commit',
  vercelLink: process.env.DEPLOY_LINK || 'Sin enlace',
  desktopCapture: process.env.DEPLOY_DESKTOP || 'Sin captura desktop',
  mobileCapture: process.env.DEPLOY_MOBILE || 'Sin captura móvil',
  backupPath: process.env.DEPLOY_BACKUP || '/01_PATENTES/REWRITTEN_FILES/'
};

// Función para enviar mensaje a Telegram
async function sendTelegramMessage() {
  const message = `
✅ *Deploy completado*
Archivo: ${deployInfo.fileName}
Commit: ${deployInfo.commit}
Vercel: ${deployInfo.vercelLink}
Backup Drive: ${deployInfo.backupPath}
Desktop: ${deployInfo.desktopCapture}
Móvil: ${deployInfo.mobileCapture}
`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    });
    console.log('✅ Notificación enviada a Telegram');
  } catch (error) {
    console.error('❌ Error enviando mensaje a Telegram:', error.message);
  }
}

// Ejecutar
sendTelegramMessage();
