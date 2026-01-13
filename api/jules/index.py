from fastapi import FastAPI
from fastapi.responses import JSONResponse
import os, requests

app = FastAPI()

BUSINESS_CORE = {
    "client": "Galeries Lafayette / Hub71",
    "price_per_pilot": "4,900€ / mes",
    "patent": "PCT/EP2025/067317",
    "target": "Reducción de devoluciones al 0%",
    "demo_url": "https://tryonyou.app/demo"
}

def notify_telegram(msg):
    token = os.getenv("TELEGRAM_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    if token and chat_id:
        try:
            requests.post(f"https://api.telegram.org/bot{token}/sendMessage",
                          json={"chat_id": chat_id, "text": f"💎 JULES V7:\n{msg}"})
        except:
            pass

@app.get("/api/jules")
async def jules_master():
    notify_telegram("✅ Ecosistema Consolidado: Acceso de cliente detectado.")
    return JSONResponse(content={
        "status": "🤖 JULES V7 MASTER ACTIVE",
        "business": BUSINESS_CORE,
        "narrative": "Pau le Paon confirmando dignidad y ajuste.",
        "technical": "All Assets Merged Successfully"
    })
