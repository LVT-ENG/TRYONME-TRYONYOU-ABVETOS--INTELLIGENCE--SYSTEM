import os
import json
from google import genai
from fastapi import FastAPI, HTTPException, Header, Depends
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Configuration
# Securely load secret key from environment
INTERNAL_SECRET_KEY = os.getenv("INTERNAL_SECRET_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

class RecommendationRequest(BaseModel):
    landmarks: List[Dict[str, Any]]

async def verify_token(x_divineo_token: str = Header(None)):
    if not INTERNAL_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Server misconfiguration: Missing INTERNAL_SECRET_KEY")
    if not x_divineo_token or x_divineo_token != INTERNAL_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized")
    return x_divineo_token

@app.post("/api/recommend")
async def recommend(data: RecommendationRequest, token: str = Depends(verify_token)):
    narrative = "Ajuste perfecto detectado. La seda azul se adapta a su movimiento."

    if GOOGLE_API_KEY:
        try:
            client = genai.Client(api_key=GOOGLE_API_KEY)

            # Create a prompt based on landmarks
            prompt = (
                "You are Jules, a high-end fashion AI advisor for Galeries Lafayette. "
                "Analyze the user's pose based on these landmarks:\n"
                f"{json.dumps(data.landmarks)}\n"
                "Generate a short, poetic, and luxurious narrative (max 2 sentences) in Spanish about how the 'Seda Azul' dress fits them perfectly. "
                "Focus on the 'Zero Sizes' concept (fabric adaptability)."
            )

            response = client.models.generate_content(
                model='gemini-1.5-flash',
                contents=prompt
            )

            if response.text:
                narrative = response.text.strip()
        except Exception as e:
            print(f"Gemini Error: {e}")
            # Fallback to default narrative

    return {"jules_narrative": narrative, "status": "success"}
