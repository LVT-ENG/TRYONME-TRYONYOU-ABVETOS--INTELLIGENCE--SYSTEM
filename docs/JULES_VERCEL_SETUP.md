# Jules Agent - Vercel Deployment Setup

## Overview
This document describes the setup for deploying the Jules Agent (Ultimatum V7) as a Vercel serverless function.

## Problem Statement
**Original requirement (Spanish):**
> Para Vercel, deberás mover jules_main.py dentro de una carpeta api/ y renombrarlo a index.py o crear un pequeño wrapper que llame a la clase JulesAgent.

**Translation:**
> For Vercel, you must move jules_main.py into an api/ folder and rename it to index.py or create a small wrapper that calls the JulesAgent class.

## Solution Implemented

### Approach: Wrapper Pattern
Instead of moving the core Jules logic, we created a lightweight wrapper that follows Vercel's serverless function pattern while keeping the main agent logic in `jules_ultimatum_v7.py`.

### Files Created

#### 1. `api/jules.py` - Jules Agent API Wrapper
- **Purpose**: Vercel serverless function endpoint for Jules Agent
- **URL**: `/api/jules`
- **Features**:
  - Health check endpoint (GET)
  - Execute Jules actions (POST)
  - Actions: `scan_inbox`, `analyze_email`, `send_notification`
- **Pattern**: Follows Vercel's `handler(BaseHTTPRequestHandler)` pattern

#### 2. `api/index.py` - Main API Index
- **Purpose**: Root API endpoint providing service information
- **URL**: `/api/` or `/api/index`
- **Features**:
  - Lists all available API endpoints
  - Service health check
  - API version information

#### 3. `docs/API_JULES.md` - Comprehensive Documentation
- **Purpose**: Complete API documentation for developers
- **Contents**:
  - Endpoint specifications
  - Request/response formats
  - Usage examples (JavaScript, Python, curl)
  - Environment variables reference
  - Deployment instructions

### Existing Files (Not Modified)
- `jules_ultimatum_v7.py` - Core Jules Agent logic (remains in root)
- `jules_consolidator.py` - File consolidation utility (remains in root)

## API Structure

```
api/
├── index.py       # Main API info endpoint
├── jules.py       # Jules Agent endpoint
├── match.py       # Lafayette Intelligence endpoint
└── commits.py     # Git commits endpoint
```

## Vercel Configuration

The existing `vercel.json` already supports the API structure:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

This means:
- `/api/jules` → `/api/jules.py`
- `/api/index` → `/api/index.py`
- `/api/match` → `/api/match.py`
- `/api/commits` → `/api/commits.py`

## Environment Variables Required

Configure these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description | Required For |
|----------|-------------|--------------|
| `IMAP_HOST` | Email server (e.g., imap.porkbun.com) | Inbox scanning |
| `EMAIL_USER` | Email username | Inbox scanning |
| `EMAIL_PASS` | Email password | Inbox scanning |
| `GOOGLE_API_KEY` | Google Gemini API key | AI analysis |
| `SHEET_ID` | Google Sheets ID | Optional logging |
| `GOOGLE_CREDS_JSON` | Service account JSON path | Optional sheets |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token | Notifications |
| `TELEGRAM_CHAT_ID` | Telegram chat ID | Notifications |

## Dependencies Added

Updated `requirements.txt` with:
```
gspread==5.12.4        # Google Sheets integration
python-dotenv==1.0.0   # Environment variable management
```

These are required by `jules_ultimatum_v7.py`.

## Testing

### Local Testing

Test the wrapper locally:
```bash
# Test index endpoint
python3 api/index.py

# Test Jules endpoint
python3 api/jules.py
```

### Integration Test
```bash
python3 -c "
import sys
sys.path.insert(0, 'api')
from index import handler as index_handler
from jules import handler as jules_handler
print('✅ All handlers loaded successfully')
"
```

### Test on Vercel (after deployment)

```bash
# Health check
curl https://your-domain.vercel.app/api/jules

# Analyze email
curl -X POST https://your-domain.vercel.app/api/jules \
  -H "Content-Type: application/json" \
  -d '{"action": "analyze_email", "email_body": "I am interested in your project."}'
```

## Deployment Steps

1. **Commit and push changes** (already done)
2. **Deploy to Vercel**:
   - Connect repository to Vercel
   - Vercel will auto-detect the configuration
   - Add environment variables in Vercel dashboard
3. **Verify deployment**:
   - Test `/api/jules` endpoint
   - Check logs in Vercel dashboard
   - Verify environment variables are loaded

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Vercel Platform                   │
├─────────────────────────────────────────────────────┤
│                                                      │
│  /api/jules (HTTP Request)                          │
│       ↓                                              │
│  api/jules.py (Serverless Function)                 │
│       ↓                                              │
│  jules_ultimatum_v7.py (Core Agent Logic)           │
│       ↓                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐│
│  │ IMAP Server  │  │ Gemini AI    │  │ Telegram   ││
│  │ (Email)      │  │ (Analysis)   │  │ (Notify)   ││
│  └──────────────┘  └──────────────┘  └────────────┘│
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Benefits of This Approach

1. **Separation of Concerns**: Core logic stays separate from HTTP handling
2. **Reusability**: `jules_ultimatum_v7.py` can be used by other scripts
3. **Maintainability**: Updates to Jules logic don't require API changes
4. **Vercel Compatible**: Follows Vercel's serverless function pattern
5. **Consistency**: Matches existing API structure (commits.py, match.py)

## Related Documentation

- [API_JULES.md](./API_JULES.md) - Full API reference
- [API_COMMITS.md](./API_COMMITS.md) - Commits API reference
- [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) - General deployment guide

## Notes

- The wrapper imports the main agent from the project root using `sys.path`
- All existing Jules functionality is preserved
- The API follows REST principles with proper HTTP methods
- CORS is enabled for cross-origin requests
- Error handling is implemented for graceful failures

## Future Enhancements

Potential improvements:
- Add authentication/API keys for security
- Implement rate limiting
- Add webhook support for automatic email processing
- Create scheduled function for periodic inbox scans
- Add database integration for persistent logging

---

**Status**: ✅ Implemented and ready for Vercel deployment
**Date**: January 11, 2026
**Version**: Ultimatum V7
