from fastapi import FastAPI
from fastapi.responses import JSONResponse
import os, requests

app = FastAPI()

@app.get("/api/jules")
async def jules_heartbeat():
    token = os.getenv("TELEGRAM_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    if token and chat_id:
        requests.post(f"https://api.telegram.org/bot{token}/sendMessage", 
                      json={"chat_id": chat_id, "text": "🤖 JULES V7: Piloto Lafayette ONLINE"})
    
    return {"status": "🤖 JULES V7 ACTIVO", "legal": "Patent PCT/EP2025/067317"}
