from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from .main_orchestrator import BiometricEngine

app = FastAPI()
engine = BiometricEngine()

class ScanData(BaseModel):
    height: float
    weight: float
    shoulderWidth: float
    eventType: str
    language: Optional[str] = "en"

@app.post("/api/recommend")
async def recommend(data: ScanData):
    """Entry point for the commercial pilot recommendation logic."""
    return engine.calculate_fit(data.dict())
