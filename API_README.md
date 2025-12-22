# ABVETOS Intelligence Engine API

## Overview

The ABVETOS Intelligence Engine is a FastAPI-based backend service that provides AI-powered intelligence processing for the Tryonyou.app platform. It leverages Google's Gemini AI to deliver high-precision commercial insights for virtual try-on, style recommendations, and size analysis.

## Features

- **Secure API Access**: API key-based authentication using `X-ABVETOS-AUTH` header
- **AI-Powered Analysis**: Integration with Google Gemini 1.5 Pro for intelligent recommendations
- **Structured JSON Output**: Guaranteed JSON response format with score, recommendation, and summary
- **Commercial-Grade**: Built for monetization with proper access control and error handling

## Installation

### Prerequisites

- Python 3.8+
- pip package manager

### Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables in `.env`:
```
GEMINI_API_KEY=your_gemini_api_key_here
TRYONYOU_CLIENT_KEY=your_client_access_key_here
```

## Running the API

Start the development server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, access the interactive API documentation:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### POST /v1/intelligence/analyze

Analyzes user data and provides AI-powered recommendations.

**Headers:**
- `X-ABVETOS-AUTH`: Your client access key

**Request Body:**
```json
{
  "user_id": "user123",
  "feature_type": "size_recommendation",
  "raw_data": {
    "measurements": {
      "height": 175,
      "weight": 70,
      "chest": 95
    }
  }
}
```

**Response:**
```json
{
  "status": "success",
  "engine": "ABVETOS-PRO-STU",
  "payload": {
    "score": 0.95,
    "recommendation": "Size M recommended",
    "summary": "Based on your measurements..."
  }
}
```

## Integration with Tryonyou.app

The ABVETOS Intelligence Engine resolves Issue #1283 regarding data formatting by ensuring all responses follow a consistent JSON structure. The engine is designed to integrate seamlessly with the Tryonyou.app frontend.

## Security

- All API calls require valid authentication via `X-ABVETOS-AUTH` header
- Environment variables should never be committed to version control
- Use `.env` files for local development and secure secret management for production

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `403`: Forbidden - Invalid authentication
- `500`: Internal Server Error - Processing failure

## Production Deployment

For production deployment, consider:
- Using a production WSGI server like Gunicorn with Uvicorn workers
- Setting up proper logging and monitoring
- Implementing rate limiting
- Using HTTPS/TLS encryption
- Securing environment variables with a secrets manager

## Support

For issues and support, please refer to the main repository or contact LVT-ENG.
