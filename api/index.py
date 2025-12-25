from fastapi import FastAPI, UploadFile, File
import google.generativeai as genai
import os

app = FastAPI()
genai.configure(api_key=os.environ.get("GOOGLE_AI_STUDIO_KEY"))
model = genai.GenerativeModel('gemini-1.5-pro')

@app.get("/api/status")
def status(): return {"status": "IA CONNECTÉ", "domain": "tryonyou.app"}

@app.post("/api/process-biometry")
async def process(file: UploadFile = File(...)):
    content = await file.read()
    # Lógica fusionada: Análisis de escáner + Recomendación de ajuste
    response = model.generate_content(["Analiza la biometría de este escáner y recomienda la mejor prenda de la base de datos para un ajuste perfecto.", content])
    return {"data": response.text}