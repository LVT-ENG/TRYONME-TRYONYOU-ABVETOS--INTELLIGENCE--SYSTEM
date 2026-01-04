import unittest
import sys
import os
from unittest.mock import MagicMock, patch

# Robust path addition
current_dir = os.path.dirname(os.path.abspath(__file__))
# Root of tryonyou-frontend-ultimatum
project_root = os.path.dirname(current_dir)
sys.path.append(project_root)

# Verify we can find the file
script_path = os.path.join(project_root, 'sync_drive_seat102.py')
if not os.path.exists(script_path):
    raise FileNotFoundError(f"Script not found at {script_path}")

from sync_drive_seat102 import Seat102Engine, capitalize, memoize_capped

class TestSeat102Engine(unittest.TestCase):
    def setUp(self):
        self.engine = Seat102Engine()

    def test_capitalize_utility(self):
        self.assertEqual(capitalize("hello world"), "Hello World")
        self.assertEqual(capitalize("tryonyou"), "Tryonyou")

    @patch('time.sleep', return_value=None)
    def test_process_anthropometrics(self, mock_sleep):
        metrics = self.engine.process_anthropometrics("test_file.json")
        self.assertEqual(metrics['height'], 175)
        self.assertEqual(metrics['source_file'], "Test_File.Json")

    def test_scan_drive_creates_folder(self):
        if os.path.exists(self.engine.drive_folder):
             import shutil
             shutil.rmtree(self.engine.drive_folder)

        files = self.engine.scan_drive()
        self.assertTrue(os.path.exists(self.engine.drive_folder))
        self.assertTrue(any("Subject_Alpha_Seat102.json" in f for f in files))

if __name__ == '__main__':
    unittest.main()
