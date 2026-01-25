import os
# Mock env var before import if needed, but here we can set it after since api/main reads it inside the route or global scope?
# api/main.py reads it inside the route: if api_key != os.environ.get("INTERNAL_SECRET_KEY"):
# So setting it here is fine.

os.environ["INTERNAL_SECRET_KEY"] = "TEST_KEY"

from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

def test_calculate_success():
    payload = {
        "h": 170,
        "w": 60,
        "e": "gala",
        "m": [{"x":0, "y":0, "z":0.1}, {"x":0, "y":0, "z":0.2}, {"x":0, "y":0, "z":0.3}, {"x":0, "y":0, "z":0.4}, {"x":0, "y":0, "z":0.5}]
    }
    response = client.post(
        "/api/v1/internal/calculate",
        json=payload,
        headers={"X-Divineo-Token": "TEST_KEY"}
    )
    if response.status_code != 200:
        print(response.json())
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "Tension_Index" in data["physics"]

def test_calculate_forbidden():
    payload = {
        "h": 170,
        "w": 60,
        "e": "gala",
        "m": []
    }
    response = client.post(
        "/api/v1/internal/calculate",
        json=payload,
        headers={"X-Divineo-Token": "WRONG_KEY"}
    )
    assert response.status_code == 403

if __name__ == "__main__":
    try:
        test_calculate_success()
        test_calculate_forbidden()
        print("Backend tests passed!")
    except Exception as e:
        print(f"Backend tests failed: {e}")
        exit(1)
