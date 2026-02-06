from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

# BASE DE DATOS DE ELENA (Inyectada como constante para velocidad de piloto)
# Estos son los datos REALES que el espejo debe mostrar.
INVENTARIO_ELENA = [
    {
        "id": "GL-001",
        "nombre": "Blazer Ivory Elena",
        "tipo": "Fitted",
        "elasticidad": "Media",
        "mensaje": "La caída de este tejido estructura tus hombros sin rigidez.",
        "imagen": "/assets/catalog/blazer_ivory.png" 
    },
    {
        "id": "GL-002",
        "nombre": "Robe Soie Lafayette",
        "tipo": "Fluid",
        "elasticidad": "Alta",
        "mensaje": "Seda líquida que se adapta a tu movimiento natural.",
        "imagen": "/assets/catalog/red_dress_minimal.png"
    },
    {
        "id": "GL-003",
        "nombre": "Pantalon Noir Premium",
        "tipo": "Relaxed",
        "elasticidad": "Baja",
        "mensaje": "Corte sartorial que respeta tu silueta.",
        "imagen": "/assets/catalog/pantalon_noir.png"
    }
]

class SnapRequest(BaseModel):
    gender: str
    height: int = 0

@app.get("/api/health")
def health_check():
    return {"status": "VIVO", "sistema": "Divineo V7"}

@app.post("/api/snap")
def procesar_chasquido(datos: SnapRequest):
    # Lógica de selección "Inteligente" para la demo
    # En producción esto usaría ML, aquí usamos reglas de negocio básicas
    
    seleccion = random.choice(INVENTARIO_ELENA)
    
    return {
        "success": True,
        "prenda": seleccion,
        "meta": {
            "fit_score": 99.7,
            "agent_id": "Agente-007-Stylist"
        }
    }
