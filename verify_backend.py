import sys
import os
import unittest
from unittest.mock import MagicMock, patch

# Add current directory to path
sys.path.append(os.getcwd())

# MOCK EVERYTHING BEFORE IMPORT to avoid environment issues with MediaPipe/CV2
mp_mock = MagicMock()
cv2_mock = MagicMock()
genai_mock = MagicMock()

sys.modules["mediapipe"] = mp_mock
sys.modules["cv2"] = cv2_mock
sys.modules["google.generativeai"] = genai_mock

# Setup nested attributes for MediaPipe
# scanner = JulesScanner() calls mp.solutions.pose.Pose(...)
mp_mock.solutions.pose.Pose.return_value = MagicMock()

try:
    from api.index import Agent12Audit, GeminiTrendBrain, trend_brain
except ImportError as e:
    print(f"Import failed: {e}")
    sys.exit(1)

class TestAgente12(unittest.TestCase):
    def test_logger(self):
        # We need to manually setup the logger handler because it might not be capturing in this test context normally
        # But assertLogs should handle it.
        agent = Agent12Audit()
        with self.assertLogs("Agente12", level="INFO") as cm:
            agent.log_event("TEST_EVENT", "Test Details")

        # Check output
        # Format is "TEST_EVENT: Test Details" inside the log message
        self.assertTrue(any("TEST_EVENT: Test Details" in o for o in cm.output))

class TestTrendBrain(unittest.TestCase):
    def test_fallback_trends(self):
        brain = GeminiTrendBrain()
        trends = brain.get_trends()
        self.assertIn("Col Mao", trends['patterns'])
        self.assertIn("Bordeaux Intense", trends['colors'])
        self.assertEqual(trends['season'], "Hiver 2026")

if __name__ == '__main__':
    unittest.main()
