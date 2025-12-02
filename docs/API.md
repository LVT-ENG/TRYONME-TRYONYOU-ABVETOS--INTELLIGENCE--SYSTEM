# AVBETOS API Design Specification

This document outlines the API design for the AVBETOS Intelligence System.

## API Overview

The AVBETOS API provides endpoints for the virtual try-on pipeline, allowing clients to submit images and receive processed outputs with style recommendations.

---

## Base URL

```
Production: https://api.tryon.app/v1
Staging: https://staging-api.tryon.app/v1
```

---

## Authentication

All API requests require authentication using Bearer tokens.

```http
Authorization: Bearer <access_token>
```

---

## Endpoints

### 1. Process Image

Submit an image for AVBETOS pipeline processing.

**Request**

```http
POST /process
Content-Type: application/json

{
  "image": "<base64_encoded_image>",
  "options": {
    "style": "elegant",
    "output_format": "webp",
    "quality": 85,
    "aspect_ratio": "9:16"
  },
  "metadata": {
    "session_id": "string",
    "user_preferences": {}
  }
}
```

**Response**

```json
{
  "success": true,
  "data": {
    "result_image": "<base64_encoded_result>",
    "pau_approval": {
      "approved": true,
      "score": 0.95,
      "recommendations": ["Elegant", "Minimal", "Red"]
    },
    "processing_time_ms": 2450,
    "pipeline_log": [
      {"module": "bao", "status": "success", "duration_ms": 450},
      {"module": "tendency", "status": "success", "duration_ms": 200},
      {"module": "royal_hair", "status": "success", "duration_ms": 600},
      {"module": "royal_makeup", "status": "success", "duration_ms": 400},
      {"module": "nano_render", "status": "success", "duration_ms": 500},
      {"module": "pau", "status": "approved", "duration_ms": 300}
    ]
  },
  "request_id": "req_abc123"
}
```

---

### 2. Get Processing Status

Check the status of an async processing job.

**Request**

```http
GET /process/{job_id}/status
```

**Response**

```json
{
  "job_id": "job_xyz789",
  "status": "processing",
  "progress": 65,
  "current_module": "royal_makeup",
  "estimated_completion_ms": 1200
}
```

---

### 3. Get Style Recommendations

Get PAU style recommendations for a user profile.

**Request**

```http
POST /recommendations
Content-Type: application/json

{
  "user_profile": {
    "skin_tone": "medium",
    "preferences": ["minimal", "modern"],
    "occasion": "casual"
  }
}
```

**Response**

```json
{
  "recommendations": [
    {
      "style": "Elegant",
      "confidence": 0.92,
      "colors": ["#8B4513", "#F5F5DC", "#2F4F4F"]
    },
    {
      "style": "Minimal",
      "confidence": 0.88,
      "colors": ["#FFFFFF", "#000000", "#808080"]
    }
  ]
}
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "PIPELINE_ERROR",
    "message": "Processing failed at module: royal_hair",
    "details": {
      "module": "royal_hair",
      "reason": "Image quality below threshold"
    }
  },
  "request_id": "req_abc123"
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `INVALID_IMAGE` | Image format not supported or corrupted |
| `IMAGE_TOO_LARGE` | Image exceeds maximum size (10MB) |
| `PIPELINE_ERROR` | Error during pipeline processing |
| `PAU_REJECTED` | Output did not pass quality approval |
| `RATE_LIMITED` | Too many requests |
| `UNAUTHORIZED` | Invalid or expired token |

---

## Rate Limits

| Plan | Requests/minute | Concurrent jobs |
|------|-----------------|-----------------|
| Free | 10 | 1 |
| Pro | 60 | 5 |
| Enterprise | 300 | 25 |

---

## Webhooks

Configure webhooks to receive processing completion notifications.

**Webhook Payload**

```json
{
  "event": "processing.complete",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "job_id": "job_xyz789",
    "status": "success",
    "result_url": "https://cdn.tryon.app/results/xyz789.webp"
  }
}
```

---

## SDK Examples

### JavaScript

```javascript
import { AvbetosClient } from '@tryon/avbetos-sdk';

const client = new AvbetosClient({
  apiKey: process.env.AVBETOS_API_KEY
});

const result = await client.process({
  image: imageBase64,
  options: {
    style: 'elegant',
    aspectRatio: '9:16'
  }
});

console.log(result.pauApproval.recommendations);
```

### Python

```python
from avbetos import AvbetosClient

client = AvbetosClient(api_key=os.environ['AVBETOS_API_KEY'])

result = client.process(
    image=image_base64,
    options={
        'style': 'elegant',
        'aspect_ratio': '9:16'
    }
)

print(result.pau_approval.recommendations)
```

---

## Best Practices

1. **Image Quality**: Submit images with minimum 720p resolution for best results
2. **Caching**: Cache results using the provided `result_url` for repeat views
3. **Error Handling**: Implement retry logic with exponential backoff
4. **Webhooks**: Use webhooks for async processing to avoid polling
5. **Compression**: Use WebP format for optimal quality/size ratio

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0.0 | 2024-01-15 | Initial release |
