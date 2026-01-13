from fastapi import FastAPI
import os
import requests

app = FastAPI()

def send_telegram_alert(message):
    token = os.getenv("TELEGRAM_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    if token and chat_id:
        url = f"https://api.telegram.org/bot{token}/sendMessage"
        requests.post(url, json={"chat_id": chat_id, "text": f"🤖 JULES V7:\n{message}"})

@app.get("/api/jules")
async def jules_logic():
    # Simulamos el procesamiento de un lead (aquí conectarías con Sheets/Email)
    lead_found = True

    if lead_found:
        send_telegram_alert("¡Nuevo interés detectado en el Piloto Lafayette! Revisando biometría...")

    return {
        "status": "ACTIVO",
        "patent": "PCT/EP2025/067317",
        "narrative": "Pau está guiando al usuario ahora mismo."
    }
