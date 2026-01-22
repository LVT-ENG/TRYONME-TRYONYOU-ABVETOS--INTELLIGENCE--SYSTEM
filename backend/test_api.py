
import sys
import os
import asyncio
import json
# Add the parent directory to sys.path so we can import from backend
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_recommendation():
    print("Testing /api/recommend endpoint...")

    payload = {
        "height": 180.0,
        "weight": 75.0,
        "shoulderWidth": 45.0,
        "eventType": "work"
    }

    response = client.post("/api/recommend", json=payload)

    if response.status_code == 200:
        print("✅ Success! Response:")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"❌ Failed with status code {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    test_recommendation()
