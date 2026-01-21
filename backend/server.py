import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from main_orchestrator import BiometricEngine

app = FastAPI(title="Jules Pilot API")

# Configuración CORS para Vite (Puerto 5173/3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción, limitar a dominios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = BiometricEngine()

class ScanRequest(BaseModel):
    height: float
    weight: float
    shoulderWidth: float
    eventType: str

@app.post("/api/recommend")
async def get_recommendation(data: ScanRequest):
    try:
        return engine.calculate_fit(data.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
