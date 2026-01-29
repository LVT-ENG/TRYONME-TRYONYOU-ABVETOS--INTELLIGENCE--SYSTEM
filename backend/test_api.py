
import sys
import os
import asyncio
import json
# Add the parent directory to sys.path so we can import from backend
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_recommendation_narrative():
    print("Testing /api/recommend endpoint with Cero Tallas narrative...")

    # Test English (Default)
    payload_en = {
        "height": 180.0,
        "weight": 75.0,
        "shoulderWidth": 45.0,
        "eventType": "work",
        "language": "en"
    }

    response_en = client.post("/api/recommend", json=payload_en)

    if response_en.status_code == 200:
        data = response_en.json()
        print(f"✅ EN Response Explanation:\n{data['explanation']}\n")
        # Verification: Check for "Forbidden" words
        forbidden = ["cm", "kg", "Size", "size"]
        # Note: The 'explanation' should NOT contain these.
        # The prompt says "redact any mention ... in the final jules_narrative".
        # We check the explanation text specifically.
        if any(bad in data['explanation'] for bad in forbidden):
            print("❌ WARNING: Narrative contains forbidden measurement terms!")
        else:
            print("✅ Narrative is clean of measurements.")
    else:
        print(f"❌ Failed EN test with status {response_en.status_code}")


    # Test French
    payload_fr = {
        "height": 170.0,
        "weight": 65.0,
        "shoulderWidth": 40.0,
        "eventType": "event",
        "language": "fr"
    }

    response_fr = client.post("/api/recommend", json=payload_fr)
    if response_fr.status_code == 200:
        data = response_fr.json()
        print(f"✅ FR Response Explanation:\n{data['explanation']}\n")
        if "La silhouette" in data['explanation'] or "Confectionné" in data['explanation']:
             print("✅ French language detected.")
        else:
             print("❌ French language check failed.")
    else:
        print(f"❌ Failed FR test with status {response_fr.status_code}")

if __name__ == "__main__":
    test_recommendation_narrative()
