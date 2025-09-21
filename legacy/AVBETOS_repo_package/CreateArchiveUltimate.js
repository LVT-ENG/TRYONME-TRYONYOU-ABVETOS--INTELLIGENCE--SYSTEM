const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const axios = require('axios');
const puppeteer = require('puppeteer');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BOT_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const REPO_PATH = process.env.REPO_PATH || process.cwd();
const DRIVE_BACKUP = '/01_PATENTES/REWRITTEN_FILES/';
const SCREENSHOT_DIR = path.join(REPO_PATH, 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR);

async function takeScreenshots(url, fileBaseName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url);
  const desktopPath = path.join(SCREENSHOT_DIR, `${fileBaseName}-desktop.png`);
  await page.screenshot({ path: desktopPath, fullPage: true });
  const iPhone = puppeteer.devices['iPhone X'];
  await page.emulate(iPhone);
  await page.goto(url);
  const mobilePath = path.join(SCREENSHOT_DIR, `${fileBaseName}-mobile.png`);
  await page.screenshot({ path: mobilePath, fullPage: true });
  await browser.close();
  return { desktopPath, mobilePath };
}

async function processFile(file) {
  const filePath = path.join(REPO_PATH, file);
  const commitMsg = `rewrite: ${file}`;
  try {
    execSync(`git add "${filePath}"`, { cwd: REPO_PATH });
    execSync(`git commit -m "${commitMsg}"`, { cwd: REPO_PATH });
    execSync(`git push origin main`, { cwd: REPO_PATH });
    const deployOutput = execSync(`vercel --prod --confirm`, { cwd: REPO_PATH }).toString();
    const vercelLinkMatch = deployOutput.match(/https:\/\/[^\s]+/);
    const vercelLink = vercelLinkMatch ? vercelLinkMatch[0] : 'Enlace no detectado';
    const destPath = path.join(DRIVE_BACKUP, path.basename(file));
    fs.copyFileSync(filePath, destPath);
    const { desktopPath, mobilePath } = await takeScreenshots(vercelLink, file);
    const message = `
✅ *Archivo desplegado*
Archivo: ${file}
Commit: ${commitMsg}
Vercel: ${vercelLink}
Backup Drive: ${destPath}
Desktop: ${desktopPath}
Móvil: ${mobilePath}
`;
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: BOT_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    });
    fs.appendFileSync('archive_log.txt', `${new Date().toISOString()} | ${file} | ${commitMsg} | ${vercelLink}\n`);
    console.log(`✅ ${file} procesado correctamente`);
  } catch (err) {
    console.error(`❌ Error procesando ${file}:`, err.message);
    fs.appendFileSync('archive_log.txt', `${new Date().toISOString()} | ERROR | ${file} | ${err.message}\n`);
  }
}

async function main() {
  const files = fs.readdirSync(REPO_PATH)
    .filter(f => fs.lstatSync(path.join(REPO_PATH, f)).isFile());
  for (const file of files) {
    await processFile(file);
  }
}

main();
