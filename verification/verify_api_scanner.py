import sys
import os
import cv2
import numpy as np

# Mock os.getenv to avoid key error if any
os.environ["VITE_GOOGLE_API_KEY"] = "dummy"

try:
    # Add root to sys.path to allow import
    sys.path.append(os.getcwd())
    from api.index import JulesScanner

    print("Initializing JulesScanner...")
    scanner = JulesScanner()
    print("JulesScanner initialized successfully.")

    # Optional: Test analyze_silhouette with dummy image
    img = np.zeros((480, 640, 3), dtype=np.uint8)
    print("Testing analyze_silhouette with blank image...")
    result = scanner.analyze_silhouette(img)
    print(f"Result (should be None for blank image): {result}")

except Exception as e:
    print(f"Failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
