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
    response = model.generate_content(["Analyse biométrique", content])
    return {"data": response.text}