from fastapi import FastAPI, UploadFile, File
import google.generativeai as genai
import os

app = FastAPI()
genai.configure(api_key=os.environ.get("GOOGLE_AI_STUDIO_KEY"))
model = genai.GenerativeModel('gemini-1.5-pro')

@app.post("/api/process-biometry")
async def process(file: UploadFile = File(...)):
    content = await file.read()
    # Prompt de la Patente Ultimátum para Lafayette
    prompt = "Analiza este escaneo corporal. Extrae medidas y recomienda la talla exacta de la base de datos de ropa para un ajuste perfecto sin devoluciones."
    response = model.generate_content([prompt, content])
    return {"recommendation": response.text, "status": "SUCCESS"}
