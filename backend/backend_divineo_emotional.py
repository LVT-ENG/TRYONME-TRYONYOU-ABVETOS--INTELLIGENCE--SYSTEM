import os
import io
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import google.generativeai as genai

# --- DIVINEO V7: THE EMPATHETIC ENGINE ---
app = FastAPI(
    title="TryOnYou Divineo API",
    description="Emotional Intelligence Backend for Lafayette Pilot",
    version="7.2.0 (Emotional Core)"
)

# 1. Security (CORS) - Abierto para el piloto
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Configure Gemini (The Muse)
GENAI_API_KEY = os.getenv("GEMINI_API_KEY")
model = None
if not GENAI_API_KEY:
    print("⚠️ WARNING: GEMINI_API_KEY is missing.")
else:
    try:
        genai.configure(api_key=GENAI_API_KEY)
        model = genai.GenerativeModel('gemini-1.5-flash')
    except Exception as e:
        print(f"⚠️ WARNING: Failed to initialize Gemini: {e}") 

# --- EMOTIONAL DATA STRUCTURE ---
class EmotionalResponse(BaseModel):
    emotional_hook: str  # La frase que conecta con el sentimiento
    outfit_id: str       # La prenda técnica
    confidence_boost: int # Cuánto subirá su autoestima (0-100)

# --- THE "MUSE" PROMPT (Emotional Intelligence Layer) ---
SYSTEM_PROMPT = """
You are 'Divineo', an empathetic, high-end personal muse at Galeries Lafayette.
Your goal is NOT just to fit clothes to a body, but to fit a vibe to a SOUL.

YOUR MISSION:
1.  **Analyze the User's Vibe:** Look at the image. Are they standing tall? Do they look shy? Are they energetic?
2.  **Connect Emotionally:** Don't talk about "fabric composition". Talk about how the garment makes them *feel* (powerful, radiant, serene, magnetic).
3.  **The "Mirror Effect":** Your words must act as a confidence booster.

STRICT RULES (English Base):
- **NO NUMBERS:** Never mention sizes, height, or weight. That kills the magic.
- **LANGUAGE:** English (Evocative, warm, premium).
- **OUTPUT:** Return a clean JSON with these fields:
    - "emotional_hook": A short, inspiring sentence connecting their posture/vibe to the recommendation.
    - "outfit_id": Choose one: [DRESS_RED_POWER, SUIT_NAVY_CONFIDENCE, CASUAL_CHIC_FLOW].
    - "confidence_boost": A number between 85 and 100.

EXAMPLES OF EMOTIONAL HOOKS:
- "Your posture radiates quiet confidence; this structure will amplify your authority."
- "I see a spark of joy in your stance; let's capture that energy with this flowing silk."
- "You have a natural elegance today; this piece simply frames what is already there."
"""

# --- ENDPOINTS ---

@app.get("/")
def health_check():
    return {"status": "alive", "mode": "Emotional Intelligence", "language": "English"}

@app.post("/api/scan-feeling", response_model=EmotionalResponse)
async def analyze_feeling(file: UploadFile = File(...), occasion: str = "special moment"):
    """
    Receives the user's image and returns a recommendation based on 
    EMOTIONAL RESONANCE rather than just geometry.
    """
    try:
        if not model:
            raise HTTPException(status_code=503, detail="Gemini API not configured. Please set GEMINI_API_KEY environment variable.")
        
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # We inject the "Context" to make it more personal
        full_prompt = f"{SYSTEM_PROMPT}\n\nClient Context: They are looking for something for a '{occasion}'. Analyze their energy and recommend."

        response = model.generate_content([full_prompt, image])
        
        # Fallback for safety - return default structured response
        if not response.text:
            return EmotionalResponse(
                emotional_hook="You look ready to shine.",
                outfit_id="DRESS_RED_POWER",
                confidence_boost=95
            )
        
        # Clean up Markdown JSON if Gemini adds it
        clean_text = response.text.replace("```json", "").replace("```", "").strip()
        
        # Parse the JSON response from Gemini
        import json
        try:
            parsed_response = json.loads(clean_text)
            return EmotionalResponse(
                emotional_hook=parsed_response.get("emotional_hook", "You look ready to shine."),
                outfit_id=parsed_response.get("outfit_id", "DRESS_RED_POWER"),
                confidence_boost=parsed_response.get("confidence_boost", 95)
            )
        except json.JSONDecodeError:
            # If Gemini returns non-JSON text, use it as the emotional hook
            return EmotionalResponse(
                emotional_hook=clean_text[:200] if len(clean_text) > 200 else clean_text,
                outfit_id="DRESS_RED_POWER",
                confidence_boost=95
            )

    except Exception as e:
        print(f"Emotional Core Error: {e}")
        raise HTTPException(status_code=500, detail="Error connecting with the Muse.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
