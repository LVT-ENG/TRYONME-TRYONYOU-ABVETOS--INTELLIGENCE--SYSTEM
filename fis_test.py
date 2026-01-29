import requests
import json
import os

# 1. Limpiar pantalla para presentación
os.system('clear')

def ejecutar_prueba_maestra():
    # --- CONFIGURACIÓN ---
    # PEGA AQUÍ TU URL DE MAKE
    WEBHOOK_URL = "https://eu2.make.com/webhook/TU_ID_AQUI"
    
    # --- PROMPT MAESTRO (Para tu referencia en el Board) ---
    print("💎 PROMPT DE LUJO ACTIVADO (Zero-Sizes Policy)")
    print("------------------------------------------------")
    
    # --- DATA DE ÁNGEL (Escenario: 33 Cajas / Horma Ancha) ---
    payload = {
        "user": "Ángel",
        "profile": "wide_comfort",
        "drama": "33_returned_boxes_trauma",
        "scan_data": {
            "hombros": "proporción_imperial",
            "cintura": "ajuste_natural"
        },
        "tienda": "Galeries Lafayette",
        "slogan_req": "Ne vous le faites pas raconter, vivez-le."
    }

    print(f"📡 Enviando escaneo de Ángel al Cerebro FIS...")

    try:
        response = requests.post(WEBHOOK_URL, json=payload, timeout=10)
        
        if response.status_code == 200:
            print("\n✅ RESPUESTA DEL CEREBRO RECIBIDA:")
            print(f"👗 Sugerencia FIS: {response.text}")
        else:
            print(f"\n⚠️ Make recibió el JSON (Status: {response.status_code})")
            print("Nota: El Webhook está activo pero no devolvió texto de respuesta.")
            
    except Exception as e:
        print(f"\n❌ Error de conexión: {e}")
        print("Tip: Instala requests con 'pip3 install requests' si falla.")

if __name__ == "__main__":
    ejecutar_prueba_maestra()
    print("\n🎬 Ne vous le faites pas raconter, vivez-le.")
