# Status Monitoring API

## Overview
The Status Monitoring API provides real-time health checks and status information for the TRYONME-TRYONYOU-ABVETOS system components.

## Endpoints

### GET /v1/status

Returns the current operational status of all system components.

#### Response Format

```json
{
  "overall_status": "All Systems Operational",
  "timestamp": 1703262151.234,
  "components": [
    {
      "name": "AI Gateway",
      "status": "Operational",
      "uptime_30d": "99.9%"
    },
    {
      "name": "ABVETOS API",
      "status": "Operational",
      "uptime_30d": "100%"
    },
    {
      "name": "Build & Deploy",
      "status": "Operational",
      "uptime_30d": "100%"
    }
  ],
  "metrics": {
    "ai_latency": 450.23
  }
}
```

#### Component Status Values
- `Operational` - Component is functioning normally
- `Degraded` - Component is experiencing issues

#### Overall Status Values
- `All Systems Operational` - All components are operational
- `Partial Outage` - One or more components are degraded

## Configuration

### Environment Variables

The API requires the following environment variable to be set:

- `GEMINI_API_KEY` - API key for Google Gemini AI services

## Implementation Details

The status endpoint:
1. Performs a health check on the Gemini API by sending a minimal request
2. Measures the latency of the API response
3. Returns comprehensive status information for all system components

## Usage Example

```bash
curl https://tryonyou.app/v1/status
```

## Error Handling

If the Gemini API is unavailable, the endpoint will still return a 200 OK response with the AI Gateway component marked as "Degraded" and include error details in the response.
