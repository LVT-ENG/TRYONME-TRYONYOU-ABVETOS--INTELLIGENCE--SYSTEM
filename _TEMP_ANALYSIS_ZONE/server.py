from fastapi import FastAPI, WebSocket
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI()

# Production Domain Configuration for Tryonyou.app
origins = [
    "https://tryonyou.app",
    "https://www.tryonyou.app",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir archivos estáticos (HTML, JS, Imágenes)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def get():
    with open("static/index.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

# Endpoint para futura lógica de física o recomendación
@app.websocket("/ws/scan")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_json()
            # Aquí procesaremos las medidas (peso, altura) enviadas desde la Demo
            # y devolveremos la recomendación basada en la caída de la tela.
            print(f"Datos recibidos para análisis: {data}")
            await websocket.send_json({"status": "processing", "recommendation": "Blazer Lafayette - Talla Optimizada"})
        except Exception as e:
            print(f"WebSocket Error: {e}")
            break

if __name__ == "__main__":
    # Use PORT env variable for production deployment
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
