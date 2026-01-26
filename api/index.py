import os
from fastapi import FastAPI, Header
from pydantic import BaseModel

app = FastAPI()

@app.post("/api/recommend")
async def recommend(data: dict, x_divineo_token: str = Header(None)):
    if x_divineo_token != os.environ.get("INTERNAL_SECRET_KEY"):
        return {"error": "Unauthorized"}
    
    return {
        "jules_narrative": "Une pièce en soie sauvage qui épouse votre carrure. Le mouvement est fluide, la structure est invisible.",
        "garment_type": "veste_luxe"
    }
