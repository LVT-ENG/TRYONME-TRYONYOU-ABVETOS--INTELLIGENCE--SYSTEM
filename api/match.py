from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Returns the best match from Lafayette Stock
        try:
            match_data = {
                "garment_id": "Lafayette-001",
                "name": "Divineo Bespoke Blazer",
                "fit_score": 98.5,
                "fabric": "Midnight Wool",
                "description": "Perfectly calibrated for your shoulder width (45cm).",
                "measurements_used": ["shoulders", "chest"],
                "image_url": "/assets/images/blazer_match.jpg" # Placeholder
            }
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(match_data).encode())
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
