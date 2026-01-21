# 📚 API REFERENCE

## Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://your-domain.com`

## Authentication
Currently no authentication required for pilot phase.

---

## Endpoints

### 1. Health Check

**GET** `/status`

Check if the API is running and get service information.

**Response:**
```json
{
  "ok": true,
  "service": "tryonyou",
  "mode": "dev",
  "pilot": "galeries_lafayette",
  "client": "lafallet",
  "version": "1.0.0-pilot",
  "ts": "2026-01-20T08:40:16.178128Z"
}
```

**Status Codes:**
- `200 OK` - Service is healthy

---

### 2. Find Matching Garment

**POST** `/api/matching`

Find the best fitting garment based on user body measurements.

**Request Body:**
```json
{
  "height": 170,
  "weight": 70,
  "chest": 96,
  "waist": 86,
  "hips": 100,
  "shoulder_width": 42,
  "arm_length": 62,
  "leg_length": 84,
  "torso_length": 66,
  "occasion": "work",
  "category": null,
  "size_preference": "M"
}
```

**Parameters:**
- `height` (float, required): Height in cm
- `weight` (float, required): Weight in kg
- `chest` (float, required): Chest measurement in cm
- `waist` (float, required): Waist measurement in cm
- `hips` (float, required): Hip measurement in cm
- `shoulder_width` (float, required): Shoulder width in cm
- `arm_length` (float, required): Arm length in cm
- `leg_length` (float, required): Leg length in cm
- `torso_length` (float, required): Torso length in cm
- `occasion` (string, optional): Occasion type (work, casual, formal, event, ceremony)
- `category` (string, optional): Garment category filter
- `size_preference` (string, required): Preferred size (XS, S, M, L, XL)

**Response:**
```json
{
  "success": true,
  "best_garment": {
    "id": "laf_blazer_001",
    "name": "Heritage Navy Blazer",
    "brand": "Lafayette Couture",
    "category": "blazer",
    "price": 1890.0,
    "image_url": "/images/blazer_navy.jpg",
    "description": "Classic navy blazer...",
    "size": "M"
  },
  "fit_score": 100.0,
  "explanation": "This Heritage Navy Blazer is a great fit...",
  "details": {
    "overall_fit_score": 100.0,
    "tolerance": 4.5,
    "fabric_elasticity": 5.0,
    "fabric_drape": 7.0,
    "measurement_details": [
      {
        "measurement": "Chest",
        "user_value": 96.0,
        "garment_value": 96.0,
        "deviation": 0.0,
        "tolerance": 4.5,
        "fit_quality": "Perfect",
        "fit_score": 100.0
      }
    ]
  },
  "error": null
}
```

**Status Codes:**
- `200 OK` - Matching successful
- `400 Bad Request` - Invalid input
- `500 Internal Server Error` - Server error

---

### 3. Get Product Catalog

**GET** `/api/catalog`

Retrieve the complete product catalog.

**Response:**
```json
{
  "catalog_version": "1.0.0-pilot",
  "client": "galeries_lafayette",
  "last_updated": "2026-01-20T00:00:00Z",
  "items": [
    {
      "sku": "laf_blazer_001",
      "name": "Heritage Navy Blazer",
      "brand": "Lafayette Couture",
      "category": "blazer",
      "price": 1890.0,
      "currency": "EUR",
      "description": "Classic navy blazer...",
      "fabric": {
        "composition": "100% Virgin Wool",
        "elasticity": 5,
        "drape": 7,
        "weight": "medium"
      },
      "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
      "measurements": {
        "M": {
          "chest": 96,
          "shoulder": 42,
          "waist": 86,
          "length": 74
        }
      },
      "occasions": ["work", "formal", "ceremony"],
      "try_on_enabled": true,
      "stock_status": "in_stock"
    }
  ]
}
```

**Status Codes:**
- `200 OK` - Catalog retrieved successfully
- `404 Not Found` - Catalog file not found
- `500 Internal Server Error` - Invalid catalog format

---

### 4. Get Single Product

**GET** `/api/catalog/{product_id}`

Retrieve a single product by its SKU.

**Parameters:**
- `product_id` (string, path): Product SKU (e.g., "laf_blazer_001")

**Response:**
```json
{
  "sku": "laf_blazer_001",
  "name": "Heritage Navy Blazer",
  "brand": "Lafayette Couture",
  "category": "blazer",
  "price": 1890.0,
  "currency": "EUR",
  "description": "Classic navy blazer...",
  "fabric": {
    "composition": "100% Virgin Wool",
    "elasticity": 5,
    "drape": 7,
    "weight": "medium"
  },
  "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
  "measurements": {
    "M": {
      "chest": 96,
      "shoulder": 42,
      "waist": 86,
      "length": 74
    }
  },
  "image_url": "/images/blazer_navy.jpg",
  "occasions": ["work", "formal", "ceremony"],
  "try_on_enabled": true,
  "stock_status": "in_stock",
  "tags": ["classic", "wool", "tailored", "formal"]
}
```

**Status Codes:**
- `200 OK` - Product found
- `404 Not Found` - Product not found

---

### 5. Virtual Try-On (Placeholder)

**POST** `/api/try-on`

Virtual try-on endpoint for ML model integration (placeholder in pilot).

**Request Body:**
```json
{
  "user_image": "base64_encoded_image_or_url",
  "product_id": "laf_blazer_001",
  "options": {
    "quality": "high"
  }
}
```

**Response:**
```json
{
  "success": true,
  "output_image": "https://placeholder.tryonyou.app/result/laf_blazer_001.jpg",
  "processing_time_ms": 1234,
  "error": null
}
```

**Status Codes:**
- `200 OK` - Try-on processed
- `400 Bad Request` - Try-on not enabled for product
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Processing error

---

### 6. Get Metrics

**GET** `/api/metrics`

Get usage analytics and event counts.

**Response:**
```json
{
  "total_events": 42,
  "event_counts": {
    "service_start": 1,
    "matching_request": 15,
    "matching_success": 15,
    "catalog_view": 8,
    "product_view": 18
  },
  "period": {
    "start": "2026-01-20T08:00:00.000000Z",
    "end": "2026-01-20T09:30:00.000000Z"
  }
}
```

**Status Codes:**
- `200 OK` - Metrics retrieved
- `500 Internal Server Error` - Error reading metrics

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "detail": "Error message here"
}
```

Common error codes:
- `400 Bad Request` - Invalid input parameters
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side error

---

## Data Models

### UserMeasurements
```typescript
{
  height: number          // cm
  weight: number          // kg
  chest: number           // cm
  waist: number           // cm
  hips: number            // cm
  shoulder_width: number  // cm
  arm_length: number      // cm
  leg_length: number      // cm
  torso_length: number    // cm
  occasion?: string       // work|casual|formal|event|ceremony
  category?: string       // Optional category filter
  size_preference: string // XS|S|M|L|XL
}
```

### Garment
```typescript
{
  id: string
  name: string
  brand: string
  category: string
  price: number
  image_url: string
  description: string
  size: string
}
```

### MeasurementDetail
```typescript
{
  measurement: string       // e.g., "Chest"
  user_value: number        // User's measurement in cm
  garment_value: number     // Garment's measurement in cm
  deviation: number         // Difference in cm
  tolerance: number         // Acceptable tolerance in cm
  fit_quality: string       // Perfect|Excellent|Good|Fair|Poor
  fit_score: number         // 0-100
}
```

### ResultDetails
```typescript
{
  overall_fit_score: number
  tolerance: number
  fabric_elasticity: number
  fabric_drape: number
  measurement_details: MeasurementDetail[]
}
```

---

## Rate Limits

Currently no rate limits in pilot phase.

Production recommendations:
- 100 requests per minute per IP
- 1000 requests per hour per IP

---

## CORS

Current configuration allows all origins (`*`).

For production, update `CORS_ORIGINS` environment variable:
```bash
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

## Interactive Documentation

When running the API, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## Example Usage

### cURL Examples

**Check API Status:**
```bash
curl http://localhost:8000/status
```

**Find Matching Garment:**
```bash
curl -X POST http://localhost:8000/api/matching \
  -H "Content-Type: application/json" \
  -d '{
    "height": 170,
    "weight": 70,
    "chest": 96,
    "waist": 86,
    "hips": 100,
    "shoulder_width": 42,
    "arm_length": 62,
    "leg_length": 84,
    "torso_length": 66,
    "size_preference": "M"
  }'
```

**Get Catalog:**
```bash
curl http://localhost:8000/api/catalog
```

### JavaScript Examples

```javascript
// Find matching garment
const response = await fetch('http://localhost:8000/api/matching', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    height: 170,
    weight: 70,
    chest: 96,
    waist: 86,
    hips: 100,
    shoulder_width: 42,
    arm_length: 62,
    leg_length: 84,
    torso_length: 66,
    size_preference: 'M',
  }),
});

const data = await response.json();
console.log('Fit score:', data.fit_score);
console.log('Best garment:', data.best_garment.name);
```

### Python Examples

```python
import requests

# Find matching garment
response = requests.post('http://localhost:8000/api/matching', json={
    'height': 170,
    'weight': 70,
    'chest': 96,
    'waist': 86,
    'hips': 100,
    'shoulder_width': 42,
    'arm_length': 62,
    'leg_length': 84,
    'torso_length': 66,
    'size_preference': 'M'
})

data = response.json()
print(f"Fit score: {data['fit_score']}")
print(f"Best garment: {data['best_garment']['name']}")
```

---

## Support

For issues or questions:
1. Check this API reference
2. Review interactive docs at `/docs`
3. Contact development team

**Last Updated**: January 20, 2026  
**API Version**: 1.0.0-pilot
