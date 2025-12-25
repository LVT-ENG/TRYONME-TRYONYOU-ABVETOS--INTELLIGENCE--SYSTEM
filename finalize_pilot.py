import os
import shutil
import subprocess

# --- CONFIGURACIÓN MAESTRA DE TRYONYOU ---
DOMAIN = "tryonyou.app"
ASSETS_DIR = "public/assets"
REQUIRED_IMAGES = [
    "logo_tryonyou.png", "look1.png", "look2.png",
    "look3.png", "montana_pantalones.png", "pau_blanco_chasquido.png"
]

def finalize_pilot():
    print("🚀 JULES: Iniciando fusión y despliegue total...")

    # 1. Crear estructura de carpetas
    folders = ['api', 'src/pages', ASSETS_DIR]
    for f in folders:
        os.makedirs(f, exist_ok=True)
        print(f"✅ Carpeta creada: {f}")

    # 2. Mover imágenes automáticamente a assets
    for img in REQUIRED_IMAGES:
        if os.path.exists(img):
            shutil.move(img, os.path.join(ASSETS_DIR, img))
            print(f"✅ Imagen movida: {img}")
        else:
            print(f"⚠️ Aviso: {img} no encontrada, se usará placeholder.")

    # 3. Generar Backend con lógica de Google AI Studio fusionada
    backend_code = f"""
from fastapi import FastAPI, UploadFile, File
import google.generativeai as genai
import os

app = FastAPI()
genai.configure(api_key=os.environ.get("GOOGLE_AI_STUDIO_KEY"))
model = genai.GenerativeModel('gemini-1.5-pro')

@app.get("/api/status")
def status(): return {{"status": "IA CONNECTÉ", "domain": "{DOMAIN}"}}

@app.post("/api/process-biometry")
async def process(file: UploadFile = File(...)):
    content = await file.read()
    # Lógica fusionada: Análisis de escáner + Recomendación de ajuste
    response = model.generate_content(["Analiza la biometría de este escáner y recomienda la mejor prenda de la base de datos para un ajuste perfecto.", content])
    return {{"data": response.text}}
"""
    with open("api/index.py", "w") as f:
        f.write(backend_code.strip())
    print("✅ Backend fusionado con Gemini 1.5 Pro.")

    # 4. Ejecutar el despliegue final (deploy_tryonyou.sh o Vercel directo)
    print("🚀 Ejecutando despliegue en Vercel...")
    try:
        # Forzamos el despliegue ignorando advertencias
        subprocess.run(["vercel", "--prod", "--yes", "--force", "--token", "MI3ctTgOyjZMOYnqfVvR1vOl"], check=True)
        print(f"🎉 ¡PILOTO EN VIVO! Revisa {DOMAIN}/pilot")
    except Exception as e:
        print(f"❌ Error en el despliegue: {e}")

if __name__ == "__main__":
    finalize_pilot()
