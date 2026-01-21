from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from main_orchestrator import BiometricEngine

app = FastAPI()
engine = BiometricEngine()

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your domain
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanData(BaseModel):
    landmarks: list
    height_cm: float
    weight_kg: float
    shoulderWidth: Optional[float] = 0.0

@app.post("/api/secure_checkout")
async def secure_checkout(data: ScanData):
    try:
        result = engine.calculate_fit(data.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
