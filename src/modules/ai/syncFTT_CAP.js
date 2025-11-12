/**
 * FTT-CAP Synchronization Module
 * 
 * Connects the Fashion Trend Tracker (FTT) real-time trend analysis
 * with the Creative Auto-Production (CAP) system for automated manufacturing.
 * 
 * @module syncFTT_CAP
 */

const FTT_API_ENDPOINT = import.meta.env.VITE_FTT_API_ENDPOINT || '/api/trends';
const CAP_API_ENDPOINT = import.meta.env.VITE_CAP_API_ENDPOINT || '/api/production';
const FTT_API_KEY = import.meta.env.VITE_FTT_API_KEY || '';
const SYNC_INTERVAL = 60000; // 60 seconds

let syncIntervalId = null;
let lastSyncTimestamp = null;

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
        'Content-Type': 'application/json'
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
        'Authorization': `Bearer ${FTT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trends: trendData,
        timestamp: new Date().toISOString(),
        source: 'FTT_SYNC'
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
 * @returns {Promise<Object>} Sync result
 */
export async function syncFTTtoCAP() {
  const startTime = performance.now();
  
  try {
    console.log('🔄 FTT > CAP Sync initiated...');
    
    // Fetch trends from FTT
    const trendData = await fetchTrends();
    
    // Update CAP with trend data
    const capResponse = await updateCAP(trendData);
    
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);
    
    lastSyncTimestamp = new Date().toISOString();
    
    console.log(`✅ FTT > CAP Sync OK (${latency}ms)`);
    
    return {
      success: true,
      latency,
      timestamp: lastSyncTimestamp,
      trends: trendData,
      capResponse
    };
  } catch (error) {
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);
    
    console.error(`❌ FTT > CAP Sync FAILED (${latency}ms):`, error);
    
    return {
      success: false,
      latency,
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
}

/**
 * Start automatic synchronization
 * @param {number} interval - Sync interval in milliseconds (default: 60000)
 */
export function startAutoSync(interval = SYNC_INTERVAL) {
  if (syncIntervalId) {
    console.warn('⚠️ FTT > CAP Auto-sync already running');
    return;
  }
  
  console.log(`🚀 FTT > CAP Auto-sync started (interval: ${interval}ms)`);
  
  // Initial sync
  syncFTTtoCAP();
  
  // Set up interval
  syncIntervalId = setInterval(() => {
    syncFTTtoCAP();
  }, interval);
}

/**
 * Stop automatic synchronization
 */
export function stopAutoSync() {
  if (syncIntervalId) {
    clearInterval(syncIntervalId);
    syncIntervalId = null;
    console.log('⏹️ FTT > CAP Auto-sync stopped');
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
    interval: SYNC_INTERVAL
  };
}

/**
 * Test connection to FTT and CAP APIs
 * @returns {Promise<Object>} Connection test results
 */
export async function testConnection() {
  console.log('🧪 Testing FTT-CAP connection...');
  
  const results = {
    ftt: { connected: false, latency: null, error: null },
    cap: { connected: false, latency: null, error: null }
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
    await updateCAP({ test: true, trends: [] });
    results.cap.latency = Math.round(performance.now() - startCAP);
    results.cap.connected = true;
    console.log('✅ CAP connection OK');
  } catch (error) {
    results.cap.error = error.message;
    console.error('❌ CAP connection FAILED:', error);
  }
  
  return results;
}

// Export default object with all functions
export default {
  syncFTTtoCAP,
  startAutoSync,
  stopAutoSync,
  getSyncStatus,
  testConnection
};
