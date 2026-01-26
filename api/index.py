from fastapi import FastAPI
app = FastAPI()
@app.get("/api/recommend")
async def recommend():
    return {
        "jules_narrative": "Votre silhouette est parfaitement équilibrée. La soie bleue s'adapte dynamiquement à votre carrure.",
        "look": "Total Look Lafayette Edition"
    }
