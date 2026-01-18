from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        data = {
            "status": "🤖 JULES V7 ACTIVE",
            "patent": "PCT/EP2025/067317",
            "commercial_proposal": "Approved"
        }

        self.wfile.write(json.dumps(data).encode('utf-8'))
        return
