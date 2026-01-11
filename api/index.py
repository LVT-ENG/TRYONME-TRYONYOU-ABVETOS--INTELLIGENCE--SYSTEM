import json
import os
import sys
from http.server import BaseHTTPRequestHandler

# Add parent directory to path to import jules_ultimatum_v7
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import Jules agent functionality
try:
    from jules_ultimatum_v7 import main as jules_main, analyze_email_intent, send_telegram
except ImportError as e:
    jules_main = None
    analyze_email_intent = None
    send_telegram = None
    import_error = str(e)

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """Handle preflight CORS requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        """Health check and API information endpoint"""
        try:
            response = {
                'success': True,
                'service': 'TRYONYOU Intelligence System API',
                'version': 'Ultimatum V7',
                'endpoints': {
                    '/api/jules': 'Jules Agent (email intelligence)',
                    '/api/match': 'Lafayette Intelligence (biometric matching)',
                    '/api/commits': 'Git commits retrieval'
                },
                'status': 'operational'
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
                'message': 'API health check failed'
            }
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode('utf-8'))

    def do_POST(self):
        """Default POST handler - redirects to specific endpoints"""
        try:
            response = {
                'success': False,
                'message': 'Please use specific endpoints: /api/jules, /api/match, or /api/commits',
                'available_endpoints': {
                    '/api/jules': {
                        'description': 'Jules Agent operations',
                        'methods': ['GET', 'POST'],
                        'actions': ['scan_inbox', 'analyze_email', 'send_notification']
                    },
                    '/api/match': {
                        'description': 'Lafayette Intelligence matching',
                        'methods': ['POST'],
                        'data': 'biometric user data'
                    },
                    '/api/commits': {
                        'description': 'Git repository commits',
                        'methods': ['GET']
                    }
                }
            }
            
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response, indent=2).encode('utf-8'))
            
        except Exception as e:
            error_response = {
                'success': False,
                'error': str(e),
                'message': 'API request failed'
            }
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode('utf-8'))

# Local test
if __name__ == "__main__":
    print("🚀 TRYONYOU Intelligence System API")
    print("=" * 50)
    print("\n📡 Available Endpoints:")
    print("  • /api/jules - Jules Agent (email intelligence)")
    print("  • /api/match - Lafayette Intelligence (biometric matching)")
    print("  • /api/commits - Git commits retrieval")
    print("\n✅ API Structure Ready for Vercel Deployment")
