from fastapi import FastAPI, Body
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn
from fis_engine import FISOrchestrator

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los orígenes por ahora, ajustar en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Asegurar carpeta de estáticos para los QR
if not os.path.exists("static"):
    os.makedirs("static")

app.mount("/static", StaticFiles(directory="static"), name="static")

orchestrator = FISOrchestrator()

@app.post("/recommend")
async def recommend(data: dict = Body(...)):
    # Lógica de Agent 70 (Matching inteligente)
    return orchestrator.run_experience(data, "src/inventory_index.json")

@app.get("/reserve/{product_id}")
async def reserve(product_id: str):
    # Lógica de Agent Pau (Generación de QR)
    qr_url = orchestrator.pau.generate_qr(product_id)
    return {"qr_url": qr_url}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
