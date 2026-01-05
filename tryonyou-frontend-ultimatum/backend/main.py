from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.seat102 import Seat102Engine
import shutil
import os

app = FastAPI(title="TRYONYOU Backend", version="3.0.0")

# CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, lock this down
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = Seat102Engine()

@app.get("/")
def read_root():
    return {"status": "Divineo System Online"}

@app.post("/api/scan/upload")
async def upload_scan(file: UploadFile = File(...)):
    try:
        # Save temp file
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Process using Seat 102
        metrics = engine.process_anthropometrics(temp_path)

        # Cleanup
        os.remove(temp_path)

        # Generate Mockup (Simulated)
        mockup_url = engine.generate_mockup(metrics)

        # Create Shopify Product (Mock)
        product_url = engine.write_products_shopify(mockup_url, metrics)

        return {
            "success": True,
            "metrics": metrics,
            "mockup_url": mockup_url,
            "product_url": product_url,
            "message": "Anthropometrics Extracted & Product Created"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
