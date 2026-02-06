import os

# 1. Definición de la estructura de archivos
files = {
    "api/models.py": """from pydantic import BaseModel
from typing import List, Optional

class Product(BaseModel):
    id: str
    name: str
    brand: str
    price: float

class CartItem(BaseModel):
    product_id: str
    size: str

class CartResponse(BaseModel):
    status: str
    message: str

class QRReservation(BaseModel):
    qr_code: str
    location: str

class CombinationSuggestion(BaseModel):
    id: str
    label: str

class SilhouetteData(BaseModel):
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    body_shape: str
    scan_date: str
""",
    "api/services.py": """import uuid
from typing import Dict, List, Optional
from .models import CartItem, CartResponse, QRReservation, CombinationSuggestion, SilhouetteData, Product

class ProductService:
    def __init__(self):
        # Base de datos local para el piloto comercial
        self.products_db: Dict[str, dict] = {
            "1": {"id": "1", "name": "Robe de soirée fluide", "brand": "Galeries Lafayette", "price": 185.0},
            "2": {"id": "2", "name": "Veste ajustée Homme", "brand": "Lafayette Homme", "price": 240.0},
            "3": {"id": "3", "name": "Chemise en soie", "brand": "Lafayette", "price": 95.0}
        }
        self.carts_db: Dict[str, List] = {}
        self.silhouettes_db: Dict[str, dict] = {}

    def get_product(self, product_id: str) -> Optional[Product]:
        data = self.products_db.get(product_id)
        return Product(**data) if data else None

    def add_to_cart(self, user_id: str, item: CartItem) -> CartResponse:
        if user_id not in self.carts_db:
            self.carts_db[user_id] = []
        self.carts_db[user_id].append(item)
        return CartResponse(status="Success", message="Ajouté au panier")

    def reserve_in_fitting_room(self, product_id: str) -> QRReservation:
        res_id = str(uuid.uuid4())[:6].upper()
        return QRReservation(qr_code=f"QR-{res_id}", location="Zone A - Cabine 4")

    def save_silhouette(self, user_id: str, data: SilhouetteData):
        self.silhouettes_db[user_id] = data
        return {"status": "success", "message": "Silhouette enregistrée"}

    def get_combinations(self, product_id: str) -> List[CombinationSuggestion]:
        return [
            CombinationSuggestion(id="c1", label="Look Soirée"),
            CombinationSuggestion(id="c2", label="Look Business"),
            CombinationSuggestion(id="c3", label="Look Casual")
        ]
""",
    "main.py": """from fastapi import FastAPI, HTTPException
from api.services import ProductService
from api.models import SilhouetteData, CartItem
import uvicorn

app = FastAPI(title="Digital Mirror Pilot")
service = ProductService()

@app.get("/")
def home():
    return {"status": "Mirror API Active"}

@app.post("/scan")
def scan(data: SilhouetteData):
    return service.save_silhouette("user_123", data)

@app.get("/reserve/{product_id}")
def reserve(product_id: str):
    return service.reserve_in_fitting_room(product_id)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
"""
}

# 2. Creación física de las carpetas y archivos
print("🚀 Iniciando configuración del piloto...")

# Crear carpeta api y archivo __init__.py para que Python lo reconozca como módulo
if not os.path.exists("api"):
    os.makedirs("api")
    with open("api/__init__.py", "w") as f:
        f.write("")

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Archivo creado: {path}")

print("\\n🔥 ¡Todo listo! Ahora ejecuta: python main.py")
