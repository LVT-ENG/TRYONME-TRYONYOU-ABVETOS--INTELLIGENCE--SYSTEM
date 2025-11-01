/**
 * FTT-CAP Module Index
 * Re-exports the FTT-CAP synchronization module
 */

export {
  syncFTTtoCAP,
  startAutoSync,
  stopAutoSync,
  getSyncStatus,
  testConnection,
  TRYONYOU_FTT_CAP,
  TRYONYOU_FTT_CAP as default
} from './tryonyou_ftt_cap_sync.js';
