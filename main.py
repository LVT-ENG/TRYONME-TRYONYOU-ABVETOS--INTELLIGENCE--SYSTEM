from fastapi import FastAPI, Body, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os, uvicorn
from fis_engine import FISOrchestrator

app = FastAPI(title="FIS v7.0 - Galeries Lafayette Pilot")

# Configuración de CORS para el frontend
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"]
)

# Servir archivos estáticos (QR, Catálogo, Siluetas)
if not os.path.exists("static"): 
    os.makedirs("static")
app.mount("/static", StaticFiles(directory="static"), name="static")

orchestrator = FISOrchestrator()

@app.post("/api/recommend")
async def recommend(data: dict = Body(...)):
    # Prioridad: 1. Productos Reales (CSV), 2. CRM Elena (XLSX), 3. Ejemplo (JSON)
    if os.path.exists("TRYONYOU_PRODUCTS.csv"):
        inv = "TRYONYOU_PRODUCTS.csv"
    elif os.path.exists("TRYONYOU_CRM_MASTER_CLEAN-1.xlsx"):
        inv = "TRYONYOU_CRM_MASTER_CLEAN-1.xlsx"
    else:
        inv = "src/inventory_index.json"
    
    result = orchestrator.run_experience(data, inv)
    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    return result

@app.get("/api/reserve/{product_id}")
async def reserve(product_id: str):
    qr_url = orchestrator.pau.generate_qr(product_id)
    return {
        "status": "success",
        "message": f"Reserva VIP creada para {product_id}",
        "qr_url": qr_url
    }

@app.get("/api/health")
async def health():
    return {"status": "alive", "engine": "FIS v7.0", "mode": "Bunker Maestro"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
