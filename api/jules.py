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
        """Health check endpoint"""
        try:
            response = {
                'success': True,
                'agent': 'Jules Ultimatum V7',
                'status': 'online',
                'message': 'Jules agent API is operational'
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
                'message': 'Jules agent API health check failed'
            }
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode('utf-8'))

    def do_POST(self):
        """Execute Jules agent tasks"""
        try:
            if jules_main is None:
                raise Exception(f"Jules module import failed: {import_error}")

            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            request_data = json.loads(body) if body else {}
            
            action = request_data.get('action', 'scan_inbox')
            
            if action == 'scan_inbox':
                # Execute the main Jules inbox scanning function
                jules_main()
                response = {
                    'success': True,
                    'action': 'scan_inbox',
                    'message': 'Jules inbox scan completed successfully'
                }
            
            elif action == 'analyze_email':
                # Analyze a specific email body
                email_body = request_data.get('email_body', '')
                if not email_body:
                    raise ValueError("email_body is required for analyze_email action")
                
                intent = analyze_email_intent(email_body)
                response = {
                    'success': True,
                    'action': 'analyze_email',
                    'intent': intent,
                    'message': 'Email analysis completed'
                }
            
            elif action == 'send_notification':
                # Send a Telegram notification
                message = request_data.get('message', '')
                if not message:
                    raise ValueError("message is required for send_notification action")
                
                send_telegram(message)
                response = {
                    'success': True,
                    'action': 'send_notification',
                    'message': 'Notification sent successfully'
                }
            
            else:
                raise ValueError(f"Unknown action: {action}")
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response, indent=2).encode('utf-8'))
            
        except Exception as e:
            error_response = {
                'success': False,
                'error': str(e),
                'message': 'Jules agent execution failed'
            }
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode('utf-8'))

# Local test
if __name__ == "__main__":
    print("🦚 Jules API Wrapper - Local Test")
    print("=" * 50)
    
    # Test health check
    print("\n✅ Health Check:")
    print({
        'success': True,
        'agent': 'Jules Ultimatum V7',
        'status': 'online',
        'message': 'Jules agent API is operational'
    })
    
    # Test analyze_email action
    if analyze_email_intent:
        print("\n✅ Email Analysis Test:")
        test_body = "I would love to schedule a meeting to discuss the Lafayette Pilot project."
        intent = analyze_email_intent(test_body)
        print(f"Intent: {intent}")
    else:
        print("\n⚠️  Jules module not available for testing")
