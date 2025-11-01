/**
 * TRYONYOU FTT-CAP Synchronization Module v1.4
 * 
 * Enhanced version for TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM ecosystem
 * Connects Fashion Trend Tracker (FTT) real-time trend analysis
 * with Creative Auto-Production (CAP) system for automated manufacturing.
 * 
 * Deployed by: Agent 70
 * Target: GitHub + Vercel + Telegram
 * 
 * @module TRYONYOU_FTT_CAP_SYNC_v1.4
 * @version 1.4
 * @ecosystem TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
 */

const FTT_API_ENDPOINT = process.env.VITE_FTT_API_ENDPOINT || '/api/trends';
const CAP_API_ENDPOINT = process.env.VITE_CAP_API_ENDPOINT || '/api/production';
const FTT_API_KEY = process.env.VITE_FTT_API_KEY || '';
const CAP_API_KEY = process.env.VITE_CAP_API_KEY || process.env.VITE_FTT_API_KEY || ''; // Fallback to FTT key for backward compatibility
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';
const SYNC_INTERVAL = 60000; // 60 seconds
const VERSION = 'v1.4';
const DEPLOYED_BY = 'Agent 70';

let syncIntervalId = null;
let lastSyncTimestamp = null;
let syncHistory = [];
const MAX_HISTORY_SIZE = 100;

/**
 * Send notification to Telegram
 * @param {string} message - Message to send
 * @returns {Promise<void>}
 */
async function sendTelegramNotification(message) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('⚠️ Telegram credentials not configured');
    return;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`);
    }

    console.log('✅ Telegram notification sent');
  } catch (error) {
    console.error('❌ Telegram notification failed:', error);
  }
}

/**
 * Fetch latest fashion trends from FTT API
 * @returns {Promise<Object>} Trend data
 */
async function fetchTrends() {
  try {
    const response = await fetch(FTT_API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${FTT_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Module-Version': VERSION,
        'X-Deployed-By': DEPLOYED_BY
      }
    });

    if (!response.ok) {
      throw new Error(`FTT API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ FTT > Trends fetched:', data);
    return data;
  } catch (error) {
    console.error('❌ FTT > Error fetching trends:', error);
    throw error;
  }
}

/**
 * Update CAP production system with trend data
 * @param {Object} trendData - Trend data from FTT
 * @returns {Promise<Object>} CAP response
 */
async function updateCAP(trendData) {
  try {
    const response = await fetch(CAP_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CAP_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Module-Version': VERSION,
        'X-Deployed-By': DEPLOYED_BY
      },
      body: JSON.stringify({
        trends: trendData,
        timestamp: new Date().toISOString(),
        source: 'FTT_SYNC',
        version: VERSION,
        ecosystem: 'TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM'
      })
    });

    if (!response.ok) {
      throw new Error(`CAP API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ CAP > Production updated:', data);
    return data;
  } catch (error) {
    console.error('❌ CAP > Error updating production:', error);
    throw error;
  }
}

/**
 * Synchronize FTT trends with CAP production
 * @param {boolean} notifyOnSuccess - Send Telegram notification on success
 * @returns {Promise<Object>} Sync result
 */
export async function syncFTTtoCAP(notifyOnSuccess = false) {
  const startTime = performance.now();
  
  try {
    console.log(`🔄 FTT > CAP Sync ${VERSION} initiated...`);
    
    // Fetch trends from FTT
    const trendData = await fetchTrends();
    
    // Update CAP with trend data
    const capResponse = await updateCAP(trendData);
    
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);
    
    lastSyncTimestamp = new Date().toISOString();
    
    const syncResult = {
      success: true,
      latency,
      timestamp: lastSyncTimestamp,
      trends: trendData,
      capResponse,
      version: VERSION,
      deployedBy: DEPLOYED_BY
    };
    
    // Add to history
    syncHistory.unshift(syncResult);
    if (syncHistory.length > MAX_HISTORY_SIZE) {
      syncHistory = syncHistory.slice(0, MAX_HISTORY_SIZE);
    }
    
    console.log(`✅ FTT > CAP Sync ${VERSION} OK (${latency}ms)`);
    
    // Send Telegram notification if requested
    if (notifyOnSuccess) {
      await sendTelegramNotification(
        `<b>✅ FTT-CAP Sync ${VERSION} Success</b>\n\n` +
        `⏱ Latency: ${latency}ms\n` +
        `🕐 Timestamp: ${lastSyncTimestamp}\n` +
        `📊 Trends: ${JSON.stringify(trendData).length} bytes\n` +
        `🚀 Deployed by: ${DEPLOYED_BY}`
      );
    }
    
    return syncResult;
  } catch (error) {
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);
    
    console.error(`❌ FTT > CAP Sync ${VERSION} FAILED (${latency}ms):`, error);
    
    const syncResult = {
      success: false,
      latency,
      timestamp: new Date().toISOString(),
      error: error.message,
      version: VERSION,
      deployedBy: DEPLOYED_BY
    };
    
    // Add to history
    syncHistory.unshift(syncResult);
    if (syncHistory.length > MAX_HISTORY_SIZE) {
      syncHistory = syncHistory.slice(0, MAX_HISTORY_SIZE);
    }
    
    // Send Telegram notification on error
    await sendTelegramNotification(
      `<b>❌ FTT-CAP Sync ${VERSION} Failed</b>\n\n` +
      `⏱ Latency: ${latency}ms\n` +
      `❗ Error: ${error.message}\n` +
      `🚀 Deployed by: ${DEPLOYED_BY}`
    );
    
    return syncResult;
  }
}

/**
 * Start automatic synchronization
 * @param {number} interval - Sync interval in milliseconds (default: 60000)
 * @param {boolean} notifyOnSuccess - Send Telegram notifications on successful syncs
 */
export function startAutoSync(interval = SYNC_INTERVAL, notifyOnSuccess = false) {
  if (syncIntervalId) {
    console.warn(`⚠️ FTT > CAP Auto-sync ${VERSION} already running`);
    return;
  }
  
  console.log(`🚀 FTT > CAP Auto-sync ${VERSION} started (interval: ${interval}ms)`);
  
  // Send startup notification
  sendTelegramNotification(
    `<b>🚀 FTT-CAP Sync ${VERSION} Started</b>\n\n` +
    `⏱ Interval: ${interval}ms\n` +
    `🎯 Ecosystem: TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM\n` +
    `🚀 Deployed by: ${DEPLOYED_BY}\n` +
    `📡 Targets: GitHub + Vercel + Telegram`
  );
  
  // Initial sync
  syncFTTtoCAP(notifyOnSuccess);
  
  // Set up interval
  syncIntervalId = setInterval(() => {
    syncFTTtoCAP(notifyOnSuccess);
  }, interval);
}

/**
 * Stop automatic synchronization
 */
export function stopAutoSync() {
  if (syncIntervalId) {
    clearInterval(syncIntervalId);
    syncIntervalId = null;
    console.log(`⏹️ FTT > CAP Auto-sync ${VERSION} stopped`);
    
    // Send shutdown notification
    sendTelegramNotification(
      `<b>⏹️ FTT-CAP Sync ${VERSION} Stopped</b>\n\n` +
      `🚀 Deployed by: ${DEPLOYED_BY}\n` +
      `📊 Total syncs in history: ${syncHistory.length}`
    );
  }
}

/**
 * Get last sync status
 * @returns {Object} Last sync information
 */
export function getSyncStatus() {
  return {
    isRunning: syncIntervalId !== null,
    lastSync: lastSyncTimestamp,
    interval: SYNC_INTERVAL,
    version: VERSION,
    deployedBy: DEPLOYED_BY,
    ecosystem: 'TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM',
    targets: ['GitHub', 'Vercel', 'Telegram'],
    historySize: syncHistory.length
  };
}

/**
 * Get sync history
 * @param {number} limit - Maximum number of history entries to return
 * @returns {Array} Sync history
 */
export function getSyncHistory(limit = 10) {
  return syncHistory.slice(0, limit);
}

/**
 * Test connection to FTT and CAP APIs
 * @returns {Promise<Object>} Connection test results
 */
export async function testConnection() {
  console.log(`🧪 Testing FTT-CAP connection ${VERSION}...`);
  
  const results = {
    ftt: { connected: false, latency: null, error: null },
    cap: { connected: false, latency: null, error: null },
    telegram: { connected: false, error: null },
    version: VERSION,
    deployedBy: DEPLOYED_BY
  };
  
  // Test FTT
  try {
    const startFTT = performance.now();
    await fetchTrends();
    results.ftt.latency = Math.round(performance.now() - startFTT);
    results.ftt.connected = true;
    console.log('✅ FTT connection OK');
  } catch (error) {
    results.ftt.error = error.message;
    console.error('❌ FTT connection FAILED:', error);
  }
  
  // Test CAP (with mock data)
  try {
    const startCAP = performance.now();
    await updateCAP({ test: true, trends: [], version: VERSION });
    results.cap.latency = Math.round(performance.now() - startCAP);
    results.cap.connected = true;
    console.log('✅ CAP connection OK');
  } catch (error) {
    results.cap.error = error.message;
    console.error('❌ CAP connection FAILED:', error);
  }
  
  // Test Telegram
  try {
    await sendTelegramNotification(
      `<b>🧪 FTT-CAP Sync ${VERSION} Connection Test</b>\n\n` +
      `✅ System operational\n` +
      `🚀 Deployed by: ${DEPLOYED_BY}`
    );
    results.telegram.connected = true;
    console.log('✅ Telegram connection OK');
  } catch (error) {
    results.telegram.error = error.message;
    console.error('❌ Telegram connection FAILED:', error);
  }
  
  return results;
}

/**
 * Get module metadata
 * @returns {Object} Module information
 */
export function getModuleInfo() {
  return {
    module: 'FTT_CAP_SYNC',
    version: VERSION,
    ecosystem: 'TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM',
    deployedBy: DEPLOYED_BY,
    targets: ['GitHub', 'Vercel', 'Telegram'],
    capabilities: [
      'Real-time FTT-CAP synchronization',
      'Telegram notifications',
      'Sync history tracking',
      'Connection testing',
      'Auto-sync with configurable interval'
    ]
  };
}

// Export default object with all functions
export default {
  syncFTTtoCAP,
  startAutoSync,
  stopAutoSync,
  getSyncStatus,
  getSyncHistory,
  testConnection,
  getModuleInfo,
  VERSION,
  DEPLOYED_BY
};
