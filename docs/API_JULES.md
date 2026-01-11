# Jules Agent API

## Overview
This API endpoint provides access to the Jules Agent (Ultimatum V7), an intelligent email processing and analysis agent powered by Google's Gemini AI. Jules can scan inboxes, analyze email intent, and send notifications.

## Endpoint
- **URL**: `/api/jules`
- **Methods**: `GET`, `POST`
- **Content-Type**: `application/json`

## GET Request - Health Check

### Response Format

#### Success Response (200)
```json
{
  "success": true,
  "agent": "Jules Ultimatum V7",
  "status": "online",
  "message": "Jules agent API is operational"
}
```

#### Error Response (500)
```json
{
  "success": false,
  "error": "Error message",
  "message": "Jules agent API health check failed"
}
```

## POST Request - Execute Jules Actions

### Available Actions

#### 1. Scan Inbox
Scans the configured email inbox for new messages and analyzes them.

**Request Body:**
```json
{
  "action": "scan_inbox"
}
```

**Response:**
```json
{
  "success": true,
  "action": "scan_inbox",
  "message": "Jules inbox scan completed successfully"
}
```

#### 2. Analyze Email
Analyzes an email body to determine intent (INTERESTED, NOT_INTERESTED, MEETING_REQUEST, OUT_OF_OFFICE, or OTHER).

**Request Body:**
```json
{
  "action": "analyze_email",
  "email_body": "I would love to schedule a meeting to discuss the Lafayette Pilot project."
}
```

**Response:**
```json
{
  "success": true,
  "action": "analyze_email",
  "intent": "MEETING_REQUEST",
  "message": "Email analysis completed"
}
```

#### 3. Send Notification
Sends a notification via Telegram to the configured chat.

**Request Body:**
```json
{
  "action": "send_notification",
  "message": "Important update from Jules Agent"
}
```

**Response:**
```json
{
  "success": true,
  "action": "send_notification",
  "message": "Notification sent successfully"
}
```

## Environment Variables

Jules requires the following environment variables to be configured in Vercel:

| Variable | Description | Required |
|----------|-------------|----------|
| `IMAP_HOST` | Email server (e.g., imap.porkbun.com) | For inbox scanning |
| `EMAIL_USER` | Email username | For inbox scanning |
| `EMAIL_PASS` | Email password | For inbox scanning |
| `GOOGLE_API_KEY` | Google Gemini API key | For AI analysis |
| `SHEET_ID` | Google Sheets ID for logging | Optional |
| `GOOGLE_CREDS_JSON` | Path to Google service account JSON | Optional |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token | For notifications |
| `TELEGRAM_CHAT_ID` | Telegram chat ID | For notifications |

## Usage Examples

### Using fetch in JavaScript
```javascript
// Health check
fetch('/api/jules')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Analyze email
fetch('/api/jules', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    action: 'analyze_email',
    email_body: 'Thank you for your proposal. I would like to discuss this further.'
  })
})
  .then(response => response.json())
  .then(data => console.log('Intent:', data.intent))
  .catch(error => console.error('Error:', error));

// Trigger inbox scan
fetch('/api/jules', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    action: 'scan_inbox'
  })
})
  .then(response => response.json())
  .then(data => console.log(data.message))
  .catch(error => console.error('Error:', error));
```

### Using curl
```bash
# Health check
curl https://your-domain.vercel.app/api/jules

# Analyze email
curl -X POST https://your-domain.vercel.app/api/jules \
  -H "Content-Type: application/json" \
  -d '{
    "action": "analyze_email",
    "email_body": "I am interested in the Lafayette Pilot project."
  }'

# Scan inbox
curl -X POST https://your-domain.vercel.app/api/jules \
  -H "Content-Type: application/json" \
  -d '{"action": "scan_inbox"}'
```

### Using Python requests
```python
import requests
import json

# Health check
response = requests.get('https://your-domain.vercel.app/api/jules')
print(response.json())

# Analyze email
payload = {
    "action": "analyze_email",
    "email_body": "Thank you for reaching out. Let's schedule a call."
}
response = requests.post(
    'https://your-domain.vercel.app/api/jules',
    json=payload
)
data = response.json()
if data['success']:
    print(f"Email intent: {data['intent']}")

# Scan inbox
payload = {"action": "scan_inbox"}
response = requests.post(
    'https://your-domain.vercel.app/api/jules',
    json=payload
)
print(response.json())
```

## Deployment
This endpoint is designed to work with Vercel's serverless functions. It will be automatically deployed when the code is pushed to the repository.

The Jules agent wrapper imports functionality from `jules_ultimatum_v7.py` in the project root.

## Local Testing
To test the endpoint locally:
```bash
python3 api/jules.py
```

## Architecture

Jules Agent consists of:
- **jules_ultimatum_v7.py**: Core agent logic (email scanning, AI analysis, notifications)
- **api/jules.py**: Vercel serverless function wrapper that exposes the agent via HTTP API
- **api/index.py**: Main API index providing information about all available endpoints

## Notes
- CORS is enabled for cross-origin requests
- The endpoint works with Vercel's serverless function format
- Email analysis uses Google's Gemini AI for intelligent classification
- Notifications are sent via Telegram for real-time alerts
- All actions are logged and can be tracked via Google Sheets integration (if configured)

## Related Endpoints
- `/api/match` - Lafayette Intelligence (biometric matching)
- `/api/commits` - Git commits retrieval
- `/api/` or `/api/index` - API information and health check
