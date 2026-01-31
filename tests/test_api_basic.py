from fastapi.testclient import TestClient
from api.index import app

client = TestClient(app)

def test_recommend():
    response = client.get("/api/recommend")
    assert response.status_code == 200
    assert response.json() == {"jules_narrative": "Ajuste perfecto detectado. La seda azul se adapta a su movimiento.", "status": "success"}
