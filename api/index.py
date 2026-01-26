from fastapi import FastAPI
app = FastAPI()
@app.get("/api/recommend")
async def recommend():
    return {"jules_narrative": "Ajuste perfecto detectado. La seda azul se adapta a su movimiento.", "status": "success"}
