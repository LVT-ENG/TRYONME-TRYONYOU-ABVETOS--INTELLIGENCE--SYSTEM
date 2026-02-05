import sys
import os
from fastapi.testclient import TestClient

# Add root directory to python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from api.index import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "online"

def test_recommend_endpoint():
    payload = {
        "chest": 50,
        "waist": 40,
        "height": 180,
        "user_id": "TEST_USER_01"
    }
    response = client.post("/api/recommend", json=payload)
    if response.status_code != 200:
        print(f"Error: {response.text}")
    assert response.status_code == 200
    data = response.json()
    assert "recommendations" in data
    # We might not get recommendations if no inventory matches perfectly, but we should get a list
    assert isinstance(data["recommendations"], list)
    # Verify narrative is present
    assert "narrative" in data
