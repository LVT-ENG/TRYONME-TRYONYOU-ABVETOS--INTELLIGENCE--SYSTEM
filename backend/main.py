
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="TryOnYou Pilot API", version="7.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status")
def health_check():
    return {"status": "active", "mode": "LAFAYETTE_PILOT", "version": "v7"}

@app.post("/api/biometric/scan")
def mock_scan():
    return {"match_id": "GL-99283", "confidence": 0.98}
