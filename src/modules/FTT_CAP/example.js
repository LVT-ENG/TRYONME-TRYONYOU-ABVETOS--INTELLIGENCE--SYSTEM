/**
 * FTT-CAP Module Usage Examples
 * 
 * This file demonstrates how to use the FTT-CAP synchronization module
 * in your TRYONYOU application.
 */

import { 
  syncFTTtoCAP, 
  startAutoSync, 
  stopAutoSync, 
  getSyncStatus, 
  testConnection,
  TRYONYOU_FTT_CAP 
} from './tryonyou_ftt_cap_sync.js';

// Alternative import using the index
// import { syncFTTtoCAP, startAutoSync } from '@modules/FTT_CAP';

/* ============================================================================
 * Example 1: Manual Single Sync
 * ============================================================================ */
async function example1_ManualSync() {
  console.log('\n📖 Example 1: Manual Single Sync\n');
  
  try {
    const result = await syncFTTtoCAP();
    
    if (result.success) {
      console.log('✅ Sync successful!');
      console.log(`   Latency: ${result.latency}ms`);
      console.log(`   Timestamp: ${result.timestamp}`);
      console.log(`   Trends received: ${JSON.stringify(result.trends).substring(0, 100)}...`);
    } else {
      console.error('❌ Sync failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Exception during sync:', error.message);
  }
}

/* ============================================================================
 * Example 2: Auto-Sync with Default Interval (60s)
 * ============================================================================ */
function example2_AutoSyncDefault() {
  console.log('\n📖 Example 2: Auto-Sync with Default Interval (60s)\n');
  
  // Start auto-sync with default 60-second interval
  startAutoSync();
  
  // Check status
  const status = getSyncStatus();
  console.log('Status:', status);
  
  // Stop after 5 minutes (300 seconds)
  setTimeout(() => {
    stopAutoSync();
    console.log('Auto-sync stopped after 5 minutes');
  }, 300000);
}

/* ============================================================================
 * Example 3: Auto-Sync with Custom Interval (30s)
 * ============================================================================ */
function example3_AutoSyncCustom() {
  console.log('\n📖 Example 3: Auto-Sync with Custom Interval (30s)\n');
  
  // Start auto-sync with custom 30-second interval
  startAutoSync(30000);
  
  // Monitor status every 10 seconds
  const monitorInterval = setInterval(() => {
    const status = getSyncStatus();
    console.log(`[Monitor] Running: ${status.isRunning}, Last Sync: ${status.lastSync}`);
  }, 10000);
  
  // Stop after 2 minutes
  setTimeout(() => {
    stopAutoSync();
    clearInterval(monitorInterval);
    console.log('Auto-sync and monitoring stopped');
  }, 120000);
}

/* ============================================================================
 * Example 4: Connection Testing
 * ============================================================================ */
async function example4_ConnectionTest() {
  console.log('\n📖 Example 4: Connection Testing\n');
  
  const result = await testConnection();
  
  console.log('\n🔌 FTT API:');
  console.log(`   Connected: ${result.ftt.connected}`);
  console.log(`   Latency: ${result.ftt.latency}ms`);
  if (result.ftt.error) console.log(`   Error: ${result.ftt.error}`);
  
  console.log('\n🔌 CAP API:');
  console.log(`   Connected: ${result.cap.connected}`);
  console.log(`   Latency: ${result.cap.latency}ms`);
  if (result.cap.error) console.log(`   Error: ${result.cap.error}`);
}

/* ============================================================================
 * Example 5: Listening to Sync Events
 * ============================================================================ */
function example5_EventListener() {
  console.log('\n📖 Example 5: Listening to Sync Events\n');
  
  // Set up event listener
  window.addEventListener('ABVETOS_SYNC_EVENT', (event) => {
    const { module, success, latency, timestamp, error } = event.detail;
    
    if (success) {
      console.log(`🟢 [${module}] Sync successful in ${latency}ms at ${timestamp}`);
      
      // Trigger other actions on successful sync
      // e.g., update UI, refresh data, etc.
    } else {
      console.error(`🔴 [${module}] Sync failed in ${latency}ms: ${error}`);
      
      // Handle failure
      // e.g., show notification, retry logic, etc.
    }
  });
  
  // Start auto-sync to generate events
  startAutoSync();
  
  // Stop after 3 minutes
  setTimeout(() => {
    stopAutoSync();
  }, 180000);
}

/* ============================================================================
 * Example 6: Using the Unified Object
 * ============================================================================ */
async function example6_UnifiedObject() {
  console.log('\n📖 Example 6: Using the Unified Object\n');
  
  // Test connection first
  const connTest = await TRYONYOU_FTT_CAP.testConnection();
  
  if (connTest.ftt.connected && connTest.cap.connected) {
    console.log('✅ Both APIs are reachable, starting auto-sync...');
    TRYONYOU_FTT_CAP.startAutoSync();
    
    // Check status periodically
    setInterval(() => {
      const status = TRYONYOU_FTT_CAP.getSyncStatus();
      if (status.isRunning) {
        console.log(`✅ Auto-sync running. Last sync: ${status.lastSync}`);
      }
    }, 60000);
  } else {
    console.error('❌ API connection test failed. Not starting auto-sync.');
  }
}

/* ============================================================================
 * Example 7: Error Handling and Retry Logic
 * ============================================================================ */
async function example7_ErrorHandlingRetry() {
  console.log('\n📖 Example 7: Error Handling and Retry Logic\n');
  
  let retries = 0;
  const maxRetries = 3;
  
  async function syncWithRetry() {
    try {
      const result = await syncFTTtoCAP();
      
      if (result.success) {
        console.log('✅ Sync successful on attempt', retries + 1);
        retries = 0; // Reset retries on success
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      retries++;
      console.error(`❌ Sync failed (attempt ${retries}/${maxRetries}):`, error.message);
      
      if (retries < maxRetries) {
        const delay = Math.pow(2, retries) * 1000; // Exponential backoff
        console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
        setTimeout(syncWithRetry, delay);
      } else {
        console.error('❌ Max retries reached. Giving up.');
        retries = 0;
      }
    }
  }
  
  await syncWithRetry();
}

/* ============================================================================
 * Example 8: Integration with React Component
 * ============================================================================ */
const example8_ReactComponent = `
import { useEffect, useState } from 'react';
import { startAutoSync, stopAutoSync, getSyncStatus } from '@modules/FTT_CAP';

function FTTCAPMonitor() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Start auto-sync when component mounts
    startAutoSync();

    // Listen for sync events
    const handleSyncEvent = (event) => {
      console.log('Sync event received:', event.detail);
      setStatus(getSyncStatus());
    };

    window.addEventListener('ABVETOS_SYNC_EVENT', handleSyncEvent);

    // Update status every 5 seconds
    const interval = setInterval(() => {
      setStatus(getSyncStatus());
    }, 5000);

    // Cleanup on unmount
    return () => {
      stopAutoSync();
      window.removeEventListener('ABVETOS_SYNC_EVENT', handleSyncEvent);
      clearInterval(interval);
    };
  }, []);

  if (!status) return <div>Loading...</div>;

  return (
    <div className="ftt-cap-monitor">
      <h3>FTT-CAP Sync Status</h3>
      <p>Status: {status.isRunning ? '🟢 Running' : '🔴 Stopped'}</p>
      <p>Interval: {status.interval / 1000}s</p>
      <p>Last Sync: {status.lastSync || 'Never'}</p>
    </div>
  );
}

export default FTTCAPMonitor;
`;

/* ============================================================================
 * Run Examples
 * ============================================================================ */
console.log('🚀 FTT-CAP Module Examples');
console.log('=' .repeat(60));

// Uncomment the example you want to run:

// await example1_ManualSync();
// example2_AutoSyncDefault();
// example3_AutoSyncCustom();
// await example4_ConnectionTest();
// example5_EventListener();
// await example6_UnifiedObject();
// await example7_ErrorHandlingRetry();
console.log('\n💡 React Component Example:\n', example8_ReactComponent);

export {
  example1_ManualSync,
  example2_AutoSyncDefault,
  example3_AutoSyncCustom,
  example4_ConnectionTest,
  example5_EventListener,
  example6_UnifiedObject,
  example7_ErrorHandlingRetry
};
