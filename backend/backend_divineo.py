import os
import io
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import google.generativeai as genai

# --- CONFIGURACIÓN DIVINEO V7 (English Base) ---
app = FastAPI(
    title="TryOnYou Divineo API",
    description="AI Backend for Lafayette Pilot - English Base",
    version="7.1.0"
)

# 1. Security (CORS)
origins = [
    "https://tryonyou.app",
    "https://tryonme-tryonyou-abvetos-intelligen.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Gemini Configuration
GENAI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GENAI_API_KEY:
    print("⚠️ WARNING: GEMINI_API_KEY not found.")
else:
    genai.configure(api_key=GENAI_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash') 

# --- DATA STRUCTURES ---
class RecommendationResponse(BaseModel):
    recommendation_text: str
    outfit_id: str
    match_score: int

# --- THE MASTER PROMPT (Lafayette Protocol - English Edition) ---
SYSTEM_PROMPT = """
You are a high-end fashion stylist expert for Galeries Lafayette. Your client is standing in front of the 'Divineo' smart mirror.
Goal: Visually analyze the body image and recommend a garment.

STRICT RULES (Protocol ABVETOS-ULTIMATUM):
1. LANGUAGE: Respond in ENGLISH (clean, professional, easy for auto-translate).
2. FORBIDDEN: Do NOT mention numerical sizes (S, M, L, 38, 42), weight, or height.
3. TONE: Empathetic, inspiring, premium. Use phrases like "This silhouette calls for...", "To highlight your posture...".
4. FOCUS: Focus on fabric drape, structure, and occasion.
5. OUTPUT: Return a pure JSON with:
   - 'reasoning': Brief chic explanation (max 2 sentences).
   - 'suggested_style': One of these IDs: [DRESS_RED_SILK, SUIT_NAVY_WOOL, CASUAL_CHIC_BEIGE].
   - 'confidence': Integer between 85 and 99.
"""

# --- ENDPOINTS ---

@app.get("/")
def health_check():
    return {"status": "online", "system": "Divineo v7", "language": "English Base"}

@app.post("/api/scan-style", response_model=RecommendationResponse)
async def analyze_image(file: UploadFile = File(...), occasion: str = "cocktail"):
    """
    Receives video capture, analyzes with Gemini Vision, 
    returns recommendation in English (privacy focused).
    """
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        full_prompt = f"{SYSTEM_PROMPT}\n\nClient Context: Occasion '{occasion}'. Analyze and recommend."

        response = model.generate_content([full_prompt, image])
        
        # Fallback text in English if JSON fails
        text_response = response.text if response.text else "A perfect cut for your silhouette."
        
        return RecommendationResponse(
            recommendation_text=text_response.replace("```json", "").replace("```", "").strip(), 
            outfit_id="DRESS_RED_SILK",
            match_score=98
        )

    except Exception as e:
        print(f"Divineo Core Error: {e}")
        raise HTTPException(status_code=500, detail="Error processing style analysis.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
