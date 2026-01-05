from http.server import BaseHTTPRequestHandler
import json
import random

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Simulate processing of vision assets
        try:
            # In a real scenario, this would process images from public/assets/vision/
            # returning deterministic values for the Pilot flow
            measurements = {
                "height": 175,
                "shoulders": 45,
                "chest": 98,
                "waist": 82,
                "hips": 94,
                "status": "success",
                "message": "Biometric scan complete. synchronized with Lafayette Stock."
            }

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(measurements).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
