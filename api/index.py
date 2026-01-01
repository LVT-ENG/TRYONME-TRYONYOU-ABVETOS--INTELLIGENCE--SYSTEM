from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .garment_data import GARMENT_DB

app = FastAPI(title="TRYONYOU Core Engine", version="Ultimatum-2.1")

# Configure CORS to allow requests from the frontend (adjust origins as needed)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
from backend_python.main import app, UserMeasurements, MatchResponse

__all__ = ["app", "UserMeasurements", "MatchResponse"]
