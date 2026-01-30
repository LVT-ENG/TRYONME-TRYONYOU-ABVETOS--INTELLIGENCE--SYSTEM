import os
import json
from fastapi import FastAPI, HTTPException, Header, Depends
from pydantic import BaseModel
from typing import Optional
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class RecommendationRequest(BaseModel):
    height: Optional[float] = 170.0
    weight: Optional[float] = 65.0
    event: Optional[str] = "Fashion Event"
    landmarks: Optional[list] = None

def verify_token(x_divineo_token: str = Header(None)):
    secret = os.environ.get("INTERNAL_SECRET_KEY")
    # If INTERNAL_SECRET_KEY is not set, we technically can't verify,
    # but strictly following the rule: requires it.
    if not x_divineo_token or x_divineo_token != secret:
        raise HTTPException(status_code=403, detail="Unauthorized")
    return x_divineo_token

@app.post("/api/recommend")
async def recommend(data: RecommendationRequest, token: str = Depends(verify_token)):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        # Fallback or error if no key.
        return {"error": "GEMINI_API_KEY not configured", "status": "error"}

    client = genai.Client(api_key=api_key)

    prompt = f"""
    Act as a high-end fashion stylist named Jules.
    Analyze the following user profile to recommend an outfit:
    Height: {data.height} cm
    Weight: {data.weight} kg
    Event: {data.event}

    Provide a recommendation in JSON format with the following keys:
    - product_name: The name of the recommended product.
    - jules_narrative: A sophisticated narrative explaining why this fits the user's silhouette and event.
    - fabric_analysis: Technical analysis of the fabric suitability (e.g., tension index, breathability).

    Ensure the tone is professional, elegant, and personalized.
    """

    try:
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json'
            )
        )

        if response.text:
            result = json.loads(response.text)
            result["status"] = "success"
            return result
        else:
            return {"error": "No content generated", "status": "error"}

    except Exception as e:
        return {"error": str(e), "status": "error"}
