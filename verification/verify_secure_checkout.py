import requests
import json
import subprocess
import time

def run():
    # Start the Flask API in the background
    process = subprocess.Popen(["python3", "api/index.py"])
    print("⏳ Waiting for API to start...")
    time.sleep(3)

    try:
        url = "http://localhost:8000/api/secure-checkout"
        payload = {
            "user_id": "test_user_123",
            "fit_confirmed": True
        }
        headers = {"Content-Type": "application/json"}

        print(f"🔄 Testing POST {url}...")
        response = requests.post(url, json=payload, headers=headers)

        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "Pago Autorizado"
        assert data["transaction_id"] == "AVB-Lafayette-2026-X99"

        print("✅ Secure Checkout Verification Passed!")

    except Exception as e:
        print(f"❌ Verification Failed: {e}")
    finally:
        process.terminate()
        print("🛑 API Server stopped.")

if __name__ == "__main__":
    run()
