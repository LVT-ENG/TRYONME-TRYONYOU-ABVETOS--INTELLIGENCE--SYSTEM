import json
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    """
    Main API handler for TryOnYou Intelligence System
    This serves as the primary backend endpoint (Cerebro/Jules Agent)
    """
    
    def do_OPTIONS(self):
        """Handle preflight CORS requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        """Handle GET requests - System status"""
        try:
            response = {
                'success': True,
                'system': 'TryOnYou Intelligence System',
                'status': 'ONLINE',
                'version': '1.0.0',
                'endpoints': {
                    '/api': 'System status',
                    '/api/match': 'Lafayette Intelligence matching',
                    '/api/commits': 'Git commits history'
                }
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response, indent=2).encode('utf-8'))
            
        except Exception as e:
            error_response = {
                'success': False,
                'error': str(e),
                'message': 'Failed to retrieve system status'
            }
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode('utf-8'))

    def do_POST(self):
        """Handle POST requests - System operations"""
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body) if body else {}
            
            response = {
                'success': True,
                'message': 'Request received',
                'data': data
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
        except Exception as e:
            error_response = {
                'success': False,
                'error': str(e)
            }
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode('utf-8'))

# Local test
if __name__ == "__main__":
    print("✅ TryOnYou Intelligence System API Handler")
    print("   This module contains the Vercel handler class for deployment.")
    print("   Status: READY")
