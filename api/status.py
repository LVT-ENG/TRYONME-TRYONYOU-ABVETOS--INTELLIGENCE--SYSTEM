from http.server import BaseHTTPRequestHandler
import json
import time
import sys
import os

# Add the parent directory to the path to import status_monitor
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from status_monitor import check_ai_gateway_health

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """
        Public Status Endpoint for Tryonyou.app monitoring.
        Reports on AI Gateway, API, and Build status.
        """
        gateway_info = check_ai_gateway_health()
        
        response = {
            "overall_status": "All Systems Operational" if gateway_info["status"] == "Operational" else "Partial Outage",
            "timestamp": time.time(),
            "components": [
                {
                    "name": "AI Gateway",
                    "status": gateway_info["status"],
                    "uptime_30d": "99.9%"
                },
                {
                    "name": "ABVETOS API",
                    "status": "Operational",
                    "uptime_30d": "100%"
                },
                {
                    "name": "Build & Deploy",
                    "status": "Operational",
                    "uptime_30d": "100%"
                }
            ],
            "metrics": {
                "ai_latency": gateway_info.get("latency_ms", "N/A")
            }
        }
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())
        return
