
from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add the root directory to sys.path so we can import api modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from api.matching.engine import MatchingEngine, UserMeasurements

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        try:
            body = json.loads(post_data.decode('utf-8'))

            user_measurements = UserMeasurements(
                height=body.get('height'),
                weight=body.get('weight'),
                chest=body.get('chest'),
                waist=body.get('waist'),
                hips=body.get('hips'),
                shoulder_width=body.get('shoulder_width'),
                arm_length=body.get('arm_length'),
                leg_length=body.get('leg_length'),
                torso_length=body.get('torso_length'),
            )

            occasion = body.get('occasion')
            category = body.get('category')
            size_preference = body.get('size_preference', 'M')

            result = MatchingEngine.find_best_fit(
                user_measurements=user_measurements,
                occasion=occasion,
                category=category,
                size_preference=size_preference
            )

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
        return

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
