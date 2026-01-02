#!/usr/bin/env python3
"""
Simple test server to demonstrate git commit endpoints
"""
import json
import sys
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.git_utils import get_commits, get_commit_stats

class TestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/commits':
            try:
                query_params = parse_qs(parsed_path.query)
                limit = int(query_params.get('limit', [20])[0])
                branch = query_params.get('branch', [None])[0]
                
                result = get_commits(limit=limit, branch=branch)
                self._set_headers(200)
                self.wfile.write(json.dumps(result).encode())
            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode())
        
        elif parsed_path.path == '/api/commit-stats':
            try:
                result = get_commit_stats()
                self._set_headers(200)
                self.wfile.write(json.dumps(result).encode())
            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode())
        
        else:
            self._set_headers()
            self.wfile.write(json.dumps({"status": "Test Git Server Online", "endpoints": ["/api/commits", "/api/commit-stats"]}).encode())

    def log_message(self, format, *args):
        # Suppress default logging
        pass

if __name__ == '__main__':
    port = 8080
    print(f"🚀 Git API Test Server running on http://localhost:{port}")
    print(f"📍 Endpoints available:")
    print(f"   - GET /api/commits?limit=20")
    print(f"   - GET /api/commit-stats")
    try:
        HTTPServer(('', port), TestHandler).serve_forever()
    except KeyboardInterrupt:
        print("\n⏹  Server stopped")
