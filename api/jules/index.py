from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/api/jules")
def read_jules():
    return JSONResponse(content={
        "status": "🤖 JULES V7 ACTIVO",
        "vision": "Piloto Galeries Lafayette",
        "legal": "Protected by Patent PCT/EP2025/067317",
        "business": "Ready to eliminate returns"
    })
