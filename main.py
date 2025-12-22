import os
import json
from fastapi import FastAPI, HTTPException, Security, Depends
from fastapi.security.api_key import APIKeyHeader
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# 1. Environment & API Configuration
load_dotenv()

# Validate required environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
TRYONYOU_CLIENT_KEY = os.getenv("TRYONYOU_CLIENT_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is required")
if not TRYONYOU_CLIENT_KEY:
    raise ValueError("TRYONYOU_CLIENT_KEY environment variable is required")

genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI(title="ABVETOS Intelligence Engine v1.0")

# 2. Security for Monetization
API_KEY_NAME = "X-ABVETOS-AUTH"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=True)

async def verify_access(api_key: str = Depends(api_key_header)):
    if api_key != TRYONYOU_CLIENT_KEY:
        raise HTTPException(status_code=403, detail="Forbidden: Invalid Commercial License")
    return api_key

# 3. Structured Data Models
class IntelligenceQuery(BaseModel):
    user_id: str
    feature_type: str  # e.g., "size_recommendation", "style_matching"
    raw_data: dict

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "operational", "engine": "ABVETOS-V1"}

# 4. The Intelligence Engine Logic
@app.post("/v1/intelligence/analyze", dependencies=[Depends(verify_access)])
async def analyze_pilot_data(query: IntelligenceQuery):
    """
    Core ABVETOS logic for Tryonyou.app integration.
    Resolves Issue LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1283 regarding data formatting.
    """
    try:
        model = genai.GenerativeModel('gemini-1.5-pro')
        
        # System instruction to force JSON output
        prompt = (
            f"You are the ABVETOS AI Core for Tryonyou.app.\n"
            f"Analyze the following {query.feature_type} for user {query.user_id}.\n"
            f"Data: {json.dumps(query.raw_data)}\n\n"
            "CRITICAL: Return ONLY a JSON object with 'score', 'recommendation', and 'summary' keys."
        )

        # Call Gemini API with error handling
        try:
            response = model.generate_content(prompt)
        except Exception as api_error:
            raise HTTPException(
                status_code=503,
                detail=f"AI Service Error: {str(api_error)}"
            )
        
        if not response or not response.text:
            raise HTTPException(
                status_code=500,
                detail="AI Service returned empty response"
            )
        
        # Clean the response for the frontend
        cleaned_response = response.text.strip()
        
        # Remove markdown code blocks if present
        if cleaned_response.startswith('```'):
            # Find the first newline after ```
            first_newline = cleaned_response.find('\n')
            if first_newline != -1:
                cleaned_response = cleaned_response[first_newline + 1:]
            # Remove trailing ```
            if cleaned_response.endswith('```'):
                cleaned_response = cleaned_response[:-3]
            cleaned_response = cleaned_response.strip()
        
        # Parse JSON with error handling
        try:
            payload_data = json.loads(cleaned_response)
        except json.JSONDecodeError as json_error:
            raise HTTPException(
                status_code=500,
                detail=f"Invalid JSON response from AI: {str(json_error)}"
            )
        
        # Validate required fields
        required_fields = ['score', 'recommendation', 'summary']
        missing_fields = [field for field in required_fields if field not in payload_data]
        if missing_fields:
            raise HTTPException(
                status_code=500,
                detail=f"AI response missing required fields: {', '.join(missing_fields)}"
            )
        
        return {
            "status": "success",
            "engine": "ABVETOS-PRO-STU",
            "payload": payload_data
        }

    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Catch any other unexpected errors
        raise HTTPException(status_code=500, detail=f"Intelligence Error: {str(e)}")
