#!/usr/bin/env node
/**
 * ============================================================
 * TRYONYOU RETRODEPLOY — Watcher Daemon
 * Auto-sync 48 ZIPs from INBOX directory
 * ============================================================
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  inboxDir: path.join(__dirname, '..', 'TRYONYOU_DEPLOY_EXPRESS_INBOX'),
  logFile: path.join(__dirname, 'retrodeploy.log'),
  watchInterval: 30000, // 30 seconds
  maxZipCount: 48,
  deployScript: path.join(__dirname, 'deploy.sh'),
  autoDeployOnChange: false, // Set to true for automatic deployment
};

// Color console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.green) {
  const timestamp = new Date().toISOString();
  console.log(`${color}[${timestamp}] ${message}${colors.reset}`);
  
  // Also write to log file
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(CONFIG.logFile, logMessage);
}

function warn(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function error(message) {
  log(`✗ ${message}`, colors.red);
}

function info(message) {
  log(`ℹ ${message}`, colors.cyan);
}

// Ensure INBOX directory exists
function ensureInboxDir() {
  if (!fs.existsSync(CONFIG.inboxDir)) {
    fs.mkdirSync(CONFIG.inboxDir, { recursive: true });
    log(`Created INBOX directory: ${CONFIG.inboxDir}`);
  }
}

// Get all ZIP files from INBOX
function getZipFiles() {
  try {
    const files = fs.readdirSync(CONFIG.inboxDir);
    return files.filter(file => file.toLowerCase().endsWith('.zip'));
  } catch (err) {
    error(`Error reading INBOX directory: ${err.message}`);
    return [];
  }
}

// Get file stats
function getFileStats(filename) {
  const filePath = path.join(CONFIG.inboxDir, filename);
  try {
    const stats = fs.statSync(filePath);
    return {
      name: filename,
      path: filePath,
      size: stats.size,
      modified: stats.mtime,
    };
  } catch (err) {
    error(`Error getting stats for ${filename}: ${err.message}`);
    return null;
  }
}

// Clean duplicate files, keeping the most recent
function cleanDuplicates(zipFiles) {
  const filesByBaseName = {};
  
  // Group files by base name (without timestamp suffix)
  zipFiles.forEach(file => {
    const baseName = file.replace(/_\d{8}_\d{6}\.zip$/i, '').replace(/\.zip$/i, '');
    if (!filesByBaseName[baseName]) {
      filesByBaseName[baseName] = [];
    }
    filesByBaseName[baseName].push(file);
  });
  
  let duplicatesRemoved = 0;
  
  // For each group, keep only the most recent file
  Object.entries(filesByBaseName).forEach(([baseName, files]) => {
    if (files.length > 1) {
      // Get stats for all files
      const filesWithStats = files
        .map(file => getFileStats(file))
        .filter(stats => stats !== null)
        .sort((a, b) => b.modified - a.modified); // Sort by modified time, newest first
      
      // Keep the first (newest) and remove others
      const toKeep = filesWithStats[0];
      const toRemove = filesWithStats.slice(1);
      
      info(`Found ${files.length} versions of "${baseName}", keeping newest: ${toKeep.name}`);
      
      toRemove.forEach(file => {
        try {
          fs.unlinkSync(file.path);
          log(`Removed duplicate: ${file.name}`);
          duplicatesRemoved++;
        } catch (err) {
          error(`Failed to remove ${file.name}: ${err.message}`);
        }
      });
    }
  });
  
  return duplicatesRemoved;
}

// Monitor INBOX directory
let lastZipCount = 0;

async function watchInbox() {
  ensureInboxDir();
  
  const zipFiles = getZipFiles();
  const currentZipCount = zipFiles.length;
  
  if (currentZipCount !== lastZipCount) {
    log(`ZIP count changed: ${lastZipCount} → ${currentZipCount}`);
    
    // Clean duplicates
    const duplicatesRemoved = cleanDuplicates(zipFiles);
    if (duplicatesRemoved > 0) {
      log(`Cleaned ${duplicatesRemoved} duplicate file(s)`);
    }
    
    // Get updated count after cleanup
    const cleanedZipFiles = getZipFiles();
    const finalCount = cleanedZipFiles.length;
    
    log(`Current ZIP files in INBOX: ${finalCount}`);
    
    if (finalCount > CONFIG.maxZipCount) {
      warn(`ZIP count (${finalCount}) exceeds maximum (${CONFIG.maxZipCount})`);
    }
    
    // Auto-deploy if configured
    if (CONFIG.autoDeployOnChange && finalCount > 0) {
      info('Auto-deploy triggered by ZIP changes...');
      await triggerDeploy();
    }
    
    lastZipCount = finalCount;
  }
}

// Trigger deployment
async function triggerDeploy() {
  try {
    info('Running deployment script...');
    const { stdout, stderr } = await execAsync(`bash ${CONFIG.deployScript}`);
    
    if (stdout) log(stdout.trim());
    if (stderr) warn(stderr.trim());
    
    log('Deployment completed successfully');
  } catch (err) {
    error(`Deployment failed: ${err.message}`);
  }
}

// Main daemon function
function startDaemon() {
  log('════════════════════════════════════════════════════════════════');
  log('    TRYONYOU RETRODEPLOY — Watcher Daemon Started');
  log('════════════════════════════════════════════════════════════════');
  log(`Watching: ${CONFIG.inboxDir}`);
  log(`Interval: ${CONFIG.watchInterval / 1000} seconds`);
  log(`Auto-deploy: ${CONFIG.autoDeployOnChange ? 'ENABLED' : 'DISABLED'}`);
  log(`Max ZIPs: ${CONFIG.maxZipCount}`);
  log('════════════════════════════════════════════════════════════════');
  
  // Initial check
  watchInbox();
  
  // Set up periodic checking
  setInterval(watchInbox, CONFIG.watchInterval);
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    log('Shutting down watcher daemon...');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    log('Shutting down watcher daemon...');
    process.exit(0);
  });
}

// Start the daemon
if (require.main === module) {
  startDaemon();
}

module.exports = { watchInbox, cleanDuplicates, getZipFiles };
