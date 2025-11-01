/**
 * TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
 * FTT ↔ CAP Synchronization Module (EPCT 2025)
 *
 * Links Fashion Trend Tracker (FTT) with Creative Auto-Production (CAP)
 * to propagate real-time fashion trends into manufacturing.
 *
 * Adds traceability, event dispatch, Telegram alerting and ABVETOS orchestration hooks.
 * 
 * © 2025 TRYONYOU / ABVETOS SYSTEMS — All rights reserved.
 */

const FTT_API_ENDPOINT   = import.meta.env.VITE_FTT_API_ENDPOINT   || '/api/trends';
const CAP_API_ENDPOINT   = import.meta.env.VITE_CAP_API_ENDPOINT   || '/api/production';
const FTT_API_KEY        = import.meta.env.VITE_FTT_API_KEY        || '';
const GIT_COMMIT_HASH    = import.meta.env.VITE_GIT_COMMIT_HASH    || 'dev-local';
const TELEGRAM_ALERT_URL = import.meta.env.VITE_TELEGRAM_ALERT_URL || '';
const SYNC_INTERVAL      = Number(import.meta.env.VITE_SYNC_INTERVAL_MS) || 60000; // 60s default
const REQUEST_TIMEOUT_MS = 10000;

let syncIntervalId = null;
let lastSyncTimestamp = null;

/* ---------------------------- Utility: fetch with timeout ---------------------------- */
async function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

/* ---------------------------- Fetch trends from FTT ---------------------------- */
async function fetchTrends() {
  const res = await fetchWithTimeout(FTT_API_ENDPOINT, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${FTT_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error(`FTT API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  console.log('✅ FTT > Trends fetched:', data);
  return data;
}

/* ---------------------------- Update CAP with trends ---------------------------- */
async function updateCAP(trendData) {
  const body = {
    trends: trendData,
    timestamp: new Date().toISOString(),
    source: 'FTT_SYNC',
    commit: GIT_COMMIT_HASH
  };
  const res = await fetchWithTimeout(CAP_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FTT_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`CAP API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  console.log('✅ CAP > Production updated:', data);
  return data;
}

/* ---------------------------- Main sync routine ---------------------------- */
export async function syncFTTtoCAP() {
  const start = performance.now();
  try {
    console.log('🔄 FTT > CAP Sync initiated...');
    const trends = await fetchTrends();
    const capResp = await updateCAP(trends);
    const latency = Math.round(performance.now() - start);
    lastSyncTimestamp = new Date().toISOString();

    const result = { success: true, latency, timestamp: lastSyncTimestamp, trends, capResp };
    console.log(`✅ FTT > CAP Sync OK (${latency} ms)`);

    // Dispatch internal ABVETOS event
    window.dispatchEvent(new CustomEvent('ABVETOS_SYNC_EVENT', {
      detail: { module: 'FTT-CAP', success: true, latency, timestamp: lastSyncTimestamp }
    }));

    return result;
  } catch (error) {
    const latency = Math.round(performance.now() - start);
    console.error(`❌ FTT > CAP Sync FAILED (${latency} ms):`, error);

    // Alert ABVETOS bot if configured
    if (TELEGRAM_ALERT_URL) {
      fetch(TELEGRAM_ALERT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'FTT-CAP',
          success: false,
          latency,
          error: error.message,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {});
    }

    window.dispatchEvent(new CustomEvent('ABVETOS_SYNC_EVENT', {
      detail: { module: 'FTT-CAP', success: false, latency, error: error.message }
    }));

    return { success: false, latency, timestamp: new Date().toISOString(), error: error.message };
  }
}

/* ---------------------------- Auto-sync control ---------------------------- */
export function startAutoSync(interval = SYNC_INTERVAL) {
  if (syncIntervalId) {
    console.warn('⚠️  FTT > CAP Auto-sync already running');
    return;
  }
  console.log(`🚀 FTT > CAP Auto-sync started (interval: ${interval} ms)`);
  syncFTTtoCAP();
  syncIntervalId = setInterval(syncFTTtoCAP, interval);
}

export function stopAutoSync() {
  if (syncIntervalId) {
    clearInterval(syncIntervalId);
    syncIntervalId = null;
    console.log('⏹️  FTT > CAP Auto-sync stopped');
  }
}

export function getSyncStatus() {
  return {
    isRunning: syncIntervalId !== null,
    lastSync: lastSyncTimestamp,
    interval: SYNC_INTERVAL
  };
}

/* ---------------------------- Connection tests ---------------------------- */
export async function testConnection() {
  console.log('🧪 Testing FTT-CAP connection...');
  const result = {
    ftt: { connected: false, latency: null, error: null },
    cap: { connected: false, latency: null, error: null }
  };
  try {
    const t0 = performance.now();
    await fetchTrends();
    result.ftt.latency = Math.round(performance.now() - t0);
    result.ftt.connected = true;
  } catch (e) { result.ftt.error = e.message; }

  try {
    const t1 = performance.now();
    await updateCAP({ test: true });
    result.cap.latency = Math.round(performance.now() - t1);
    result.cap.connected = true;
  } catch (e) { result.cap.error = e.message; }

  console.table(result);
  return result;
}

/* ---------------------------- Export unified object ---------------------------- */
export const TRYONYOU_FTT_CAP = {
  syncFTTtoCAP,
  startAutoSync,
  stopAutoSync,
  getSyncStatus,
  testConnection
};
export default TRYONYOU_FTT_CAP;
