from http.server import BaseHTTPRequestHandler
import json
import sys
import os
import math

# Add the root directory to sys.path so we can import api modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from api.matching.engine import BiometricEngine

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        try:
            body = json.loads(post_data.decode('utf-8'))
            landmarks = body.get('landmarks', [])

            if not landmarks:
                 raise ValueError("No landmarks provided")

            # Extract key landmarks (indices based on MediaPipe Pose)
            # 11: left_shoulder, 12: right_shoulder
            # 23: left_hip, 24: right_hip
            # 0: nose, 27: left_ankle, 28: right_ankle (using 27 for height approx)

            # Helper to safely get landmark
            def get_lm(idx):
                if idx < len(landmarks):
                    return landmarks[idx]
                return None

            shoulder_left = get_lm(11)
            shoulder_right = get_lm(12)
            hip_left = get_lm(23)
            hip_right = get_lm(24)
            nose = get_lm(0)
            ankle_left = get_lm(27)

            if not all([shoulder_left, shoulder_right, hip_left, hip_right, nose, ankle_left]):
                 # Fallback values if detection is incomplete
                 height = 175
                 shoulder_width = 45
                 waist = 85
            else:
                def dist(p1, p2):
                    return math.sqrt(math.pow(p1['x'] - p2['x'], 2) + math.pow(p1['y'] - p2['y'], 2))

                # Approximate measurements
                shoulder_width_px = dist(shoulder_left, shoulder_right)
                waist_width_px = dist(hip_left, hip_right)
                height_px = dist(nose, ankle_left)

                # Mock calibration (same multipliers as BiometricCapture.tsx)
                shoulder_width = round(shoulder_width_px * 100 * 1.2)
                waist = round(waist_width_px * 100 * 1.1)
                height = round(height_px * 100 * 1.7)

            # Weight estimation
            weight = (height - 100) * 0.9 # Very rough estimate

            # Initialize BiometricEngine
            engine = BiometricEngine()

            # Prepare data for calculate_fit
            fit_data = {
                "height": height,
                "weight": weight,
                "shoulderWidth": shoulder_width,
                "eventType": "trabajo" # Defaulting to work/blazer preference
            }

            result = engine.calculate_fit(fit_data)

            response = {
                "status": "success",
                "garment": result["label"],
                "image_url": result["image_url"],
                "message": result["message"],
                "measurements": {
                    "shoulder": f"{shoulder_width} cm",
                    "waist": f"{waist} cm",
                    "height": f"{height} cm"
                }
            }

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "error", "error": str(e)}).encode('utf-8'))
        return

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
