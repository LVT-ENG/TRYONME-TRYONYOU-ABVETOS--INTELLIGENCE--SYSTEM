import os
import json
from fastapi import FastAPI, HTTPException, Security, Depends
from fastapi.security.api_key import APIKeyHeader
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# 1. Environment & API Configuration
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="ABVETOS Intelligence Engine v1.0")

# 2. Security for Monetization
API_KEY_NAME = "X-ABVETOS-AUTH"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=True)

async def verify_access(api_key: str = Depends(api_key_header)):
    if api_key != os.getenv("TRYONYOU_CLIENT_KEY"):
        raise HTTPException(status_code=403, detail="Forbidden: Invalid Commercial License")
    return api_key

# 3. Structured Data Models
class IntelligenceQuery(BaseModel):
    user_id: str
    feature_type: str  # e.g., "size_recommendation", "style_matching"
    raw_data: dict

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

        response = model.generate_content(prompt)
        
        # Clean the response for the frontend
        cleaned_response = response.text.replace('```json', '').replace('```', '').strip()
        
        return {
            "status": "success",
            "engine": "ABVETOS-PRO-STU",
            "payload": json.loads(cleaned_response)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Intelligence Error: {str(e)}")
