from fastapi import FastAPI
from pydantic import BaseModel
from .jules.logic import BiometricEngine # Importación limpia

app = FastAPI()
engine = BiometricEngine()

class ScanData(BaseModel):
    height: float
    weight: float
    shoulderWidth: float
    eventType: str

@app.post("/api/recommend")
async def recommend(data: ScanData):
    # La lógica de Jules procesa los datos y devuelve la prenda ideal
    return engine.calculate_fit(data.dict())
