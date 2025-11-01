# FTT-CAP Synchronization Module (EPCT 2025)

**TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM**

Links Fashion Trend Tracker (FTT) with Creative Auto-Production (CAP) to propagate real-time fashion trends into manufacturing.

## 🧩 Features

- **🔁 Real-time Synchronization**: FTT ↔ CAP sync every 60s (configurable via environment)
- **🧱 Robust Error Handling**: 10s timeout + comprehensive error management
- **🧬 EPCT Traceability**: Git commit hash included in every payload
- **🛰️ Event System**: Dispatches `ABVETOS_SYNC_EVENT` for reactive module integration
- **📡 Telegram Alerts**: Automatic notifications to `@abvet_deploy_bot` on failures
- **📊 Connection Testing**: Integrated health checks for FTT and CAP APIs

## 📦 Installation

The module is included in the TRYONYOU main application. No additional installation required.

## ⚙️ Configuration

Add the following environment variables to your `.env` file:

```bash
# FTT-CAP Synchronization Configuration (EPCT 2025)
VITE_FTT_API_ENDPOINT=/api/trends
VITE_CAP_API_ENDPOINT=/api/production
VITE_FTT_API_KEY=your_ftt_api_key_here
VITE_GIT_COMMIT_HASH=dev-local
VITE_TELEGRAM_ALERT_URL=https://api.telegram.org/bot<TOKEN>/sendMessage
VITE_SYNC_INTERVAL_MS=60000
```

## 🚀 Usage

### Import the Module

```javascript
import { 
  syncFTTtoCAP, 
  startAutoSync, 
  stopAutoSync, 
  getSyncStatus, 
  testConnection 
} from '@modules/FTT_CAP';
```

### Manual Sync

```javascript
// Trigger a single sync operation
const result = await syncFTTtoCAP();
console.log(result);
// { success: true, latency: 245, timestamp: '2025-01-15T...', trends: {...}, capResp: {...} }
```

### Auto-Sync

```javascript
// Start automatic synchronization (default: 60s interval)
startAutoSync();

// Start with custom interval (e.g., 30s)
startAutoSync(30000);

// Stop auto-sync
stopAutoSync();

// Check sync status
const status = getSyncStatus();
console.log(status);
// { isRunning: true, lastSync: '2025-01-15T...', interval: 60000 }
```

### Connection Testing

```javascript
// Test connectivity to both FTT and CAP APIs
const result = await testConnection();
console.table(result);
// {
//   ftt: { connected: true, latency: 120, error: null },
//   cap: { connected: true, latency: 95, error: null }
// }
```

## 🛰️ Event System

The module dispatches custom events for integration with other ABVETOS modules:

```javascript
window.addEventListener('ABVETOS_SYNC_EVENT', (event) => {
  const { module, success, latency, timestamp, error } = event.detail;
  console.log(`Sync event from ${module}:`, { success, latency, timestamp });
});
```

## 📡 Telegram Alerting

When `VITE_TELEGRAM_ALERT_URL` is configured, the module automatically sends alerts on sync failures:

```json
{
  "module": "FTT-CAP",
  "success": false,
  "latency": 10050,
  "error": "FTT API error: 503 Service Unavailable",
  "timestamp": "2025-01-15T12:34:56.789Z"
}
```

## 🧬 Payload Structure

### FTT to CAP Payload

```json
{
  "trends": { /* trend data from FTT API */ },
  "timestamp": "2025-01-15T12:34:56.789Z",
  "source": "FTT_SYNC",
  "commit": "a1b2c3d4e5f6g7h8i9j0"
}
```

## 🔧 API Requirements

### FTT API Endpoint

- **Method**: `GET`
- **Endpoint**: `VITE_FTT_API_ENDPOINT`
- **Headers**: 
  - `Authorization: Bearer ${FTT_API_KEY}`
  - `Content-Type: application/json`
- **Response**: JSON with trend data

### CAP API Endpoint

- **Method**: `POST`
- **Endpoint**: `VITE_CAP_API_ENDPOINT`
- **Headers**:
  - `Authorization: Bearer ${FTT_API_KEY}`
  - `Content-Type: application/json`
- **Body**: Trend data with metadata
- **Response**: JSON confirmation

## 📊 Monitoring

The module provides comprehensive console logging with emojis for easy monitoring:

- `🔄` - Sync initiated
- `✅` - Successful operation
- `❌` - Failed operation
- `⚠️` - Warning
- `🚀` - Auto-sync started
- `⏹️` - Auto-sync stopped
- `🧪` - Connection test

## 🔒 Security

- All API calls use Bearer token authentication
- 10-second request timeout to prevent hanging connections
- Telegram alerts are sent asynchronously without blocking main flow
- No sensitive data is logged to console

## 📝 Version

**Version**: v1.4  
**Status**: EPCT 2025 / ABVETOS Live  
**License**: © 2025 TRYONYOU / ABVETOS SYSTEMS — All rights reserved

---

For more information, contact ABVETOS deployment team or check the main TRYONYOU documentation.
