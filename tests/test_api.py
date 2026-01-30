import os
import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch

# Set env vars before importing api.index
os.environ["INTERNAL_SECRET_KEY"] = "test_secret"
os.environ["GEMINI_API_KEY"] = "test_api_key"

from api.index import app

client = TestClient(app)

def test_recommend_success():
    # Mock the google.genai.Client
    with patch("api.index.genai.Client") as mock_client_cls:
        mock_instance = mock_client_cls.return_value
        mock_response = MagicMock()
        mock_response.text = '{"product_name": "Test Suit", "jules_narrative": "Fits well", "fabric_analysis": "Good fabric"}'
        mock_instance.models.generate_content.return_value = mock_response

        payload = {
            "height": 180,
            "weight": 75,
            "event": "Gala"
        }
        headers = {"X-Divineo-Token": "test_secret"}

        response = client.post("/api/recommend", json=payload, headers=headers)

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["product_name"] == "Test Suit"
        assert data["jules_narrative"] == "Fits well"

def test_recommend_unauthorized():
    payload = {
        "height": 180,
        "weight": 75,
        "event": "Gala"
    }
    # Wrong token
    headers = {"X-Divineo-Token": "wrong_secret"}

    response = client.post("/api/recommend", json=payload, headers=headers)

    assert response.status_code == 403
    assert response.json() == {"detail": "Unauthorized"}

def test_recommend_missing_token():
    payload = {
        "height": 180,
        "weight": 75,
        "event": "Gala"
    }
    # No token

    response = client.post("/api/recommend", json=payload)

    assert response.status_code == 403
    assert response.json() == {"detail": "Unauthorized"}

def test_recommend_minimal_payload():
    with patch("api.index.genai.Client") as mock_client_cls:
        mock_instance = mock_client_cls.return_value
        mock_response = MagicMock()
        mock_response.text = '{"product_name": "Default Suit", "jules_narrative": "Standard fit", "fabric_analysis": "Standard fabric"}'
        mock_instance.models.generate_content.return_value = mock_response

        # Only landmarks (simulated)
        payload = {
            "landmarks": []
        }
        headers = {"X-Divineo-Token": "test_secret"}

        response = client.post("/api/recommend", json=payload, headers=headers)

        assert response.status_code == 200
        data = response.json()
        assert data["product_name"] == "Default Suit"
