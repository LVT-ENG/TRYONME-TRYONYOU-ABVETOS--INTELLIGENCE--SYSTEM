#!/usr/bin/env node

/**
 * TRYONYOU RETRODEPLOY - Auto-Sync Daemon for 48 ZIPs
 * Watches TRYONYOU_DEPLOY_EXPRESS_INBOX for changes and triggers deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const REPO_ROOT = path.resolve(__dirname, '..');
const INBOX_DIR = path.join(REPO_ROOT, 'TRYONYOU_DEPLOY_EXPRESS_INBOX');
const LOG_FILE = path.join(__dirname, 'retrodeploy.log');
const DEPLOY_SCRIPT = path.join(__dirname, 'deploy.sh');
const WATCH_INTERVAL = 30000; // 30 seconds

// Ensure log file exists
if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, '');
}

/**
 * Log message to console and file
 */
function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    
    console.log(logMessage.trim());
    fs.appendFileSync(LOG_FILE, logMessage);
}

/**
 * Get list of ZIP files in inbox
 */
function getZipFiles() {
    if (!fs.existsSync(INBOX_DIR)) {
        log(`Inbox directory does not exist: ${INBOX_DIR}`, 'WARN');
        return [];
    }
    
    try {
        const files = fs.readdirSync(INBOX_DIR);
        return files.filter(file => file.endsWith('.zip')).sort();
    } catch (error) {
        log(`Error reading inbox directory: ${error.message}`, 'ERROR');
        return [];
    }
}

/**
 * Clean duplicate ZIPs keeping most recent
 */
function cleanDuplicates() {
    const zipFiles = getZipFiles();
    log(`Found ${zipFiles.length} ZIP files in inbox`);
    
    // Group files by base name (without timestamp)
    const fileGroups = {};
    
    zipFiles.forEach(file => {
        // Extract base name (e.g., "TRYONYOU_DEPLOY_EXPRESS" from "TRYONYOU_DEPLOY_EXPRESS_20251017_0835.zip")
        const baseName = file.replace(/_\d{8}_\d{4}\.zip$/, '');
        
        if (!fileGroups[baseName]) {
            fileGroups[baseName] = [];
        }
        
        const filePath = path.join(INBOX_DIR, file);
        const stats = fs.statSync(filePath);
        
        fileGroups[baseName].push({
            name: file,
            path: filePath,
            mtime: stats.mtime
        });
    });
    
    // For each group, keep only the most recent file
    let removed = 0;
    Object.keys(fileGroups).forEach(baseName => {
        const files = fileGroups[baseName];
        
        if (files.length > 1) {
            // Sort by modification time (newest first)
            files.sort((a, b) => b.mtime - a.mtime);
            
            // Remove all except the newest
            files.slice(1).forEach(file => {
                try {
                    fs.unlinkSync(file.path);
                    log(`Removed duplicate: ${file.name}`, 'INFO');
                    removed++;
                } catch (error) {
                    log(`Error removing ${file.name}: ${error.message}`, 'ERROR');
                }
            });
        }
    });
    
    if (removed > 0) {
        log(`Cleaned ${removed} duplicate ZIP files`);
    }
    
    return getZipFiles().length;
}

/**
 * Trigger deployment
 */
async function triggerDeployment() {
    log('🚀 Triggering deployment...');
    
    try {
        const { stdout, stderr } = await execAsync(`bash ${DEPLOY_SCRIPT}`);
        
        if (stdout) {
            log(`Deployment output: ${stdout}`);
        }
        if (stderr) {
            log(`Deployment errors: ${stderr}`, 'WARN');
        }
        
        log('✅ Deployment completed successfully');
        return true;
    } catch (error) {
        log(`❌ Deployment failed: ${error.message}`, 'ERROR');
        return false;
    }
}

/**
 * Watch for changes
 */
let lastZipCount = 0;
let isDeploying = false;

async function watchInbox() {
    if (isDeploying) {
        log('Deployment in progress, skipping watch cycle', 'DEBUG');
        return;
    }
    
    try {
        // Clean duplicates first
        const currentZipCount = cleanDuplicates();
        
        // Check if ZIP count changed
        if (currentZipCount !== lastZipCount) {
            log(`ZIP count changed: ${lastZipCount} -> ${currentZipCount}`);
            lastZipCount = currentZipCount;
            
            if (currentZipCount > 0) {
                isDeploying = true;
                await triggerDeployment();
                isDeploying = false;
            }
        }
    } catch (error) {
        log(`Error in watch cycle: ${error.message}`, 'ERROR');
        isDeploying = false;
    }
}

/**
 * Main daemon loop
 */
function startDaemon() {
    log('🤖 TRYONYOU Retrodeploy Watcher started');
    log(`📁 Watching: ${INBOX_DIR}`);
    log(`⏱️  Interval: ${WATCH_INTERVAL / 1000} seconds`);
    log(`📝 Log file: ${LOG_FILE}`);
    
    // Ensure inbox directory exists
    if (!fs.existsSync(INBOX_DIR)) {
        log(`Creating inbox directory: ${INBOX_DIR}`);
        fs.mkdirSync(INBOX_DIR, { recursive: true });
    }
    
    // Initial count
    lastZipCount = getZipFiles().length;
    log(`Initial ZIP count: ${lastZipCount}`);
    
    // Start watching
    setInterval(watchInbox, WATCH_INTERVAL);
    
    // Also watch immediately
    watchInbox();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    log('🛑 Watcher stopped by user');
    process.exit(0);
});

process.on('SIGTERM', () => {
    log('🛑 Watcher stopped');
    process.exit(0);
});

// Start the daemon
startDaemon();
