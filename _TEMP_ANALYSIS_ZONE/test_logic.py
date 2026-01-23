import unittest
import numpy as np
from unittest.mock import MagicMock, patch
from smart_mirror import LiveSmartMirror
from physics_engine import FabricPhysics

# Mock classes for MediaPipe Tasks API
class MockLandmark:
    def __init__(self, x, y, z=0.0):
        self.x = x
        self.y = y
        self.z = z

class MockDetectionResult:
    def __init__(self, landmarks):
        # landmarks is a list of lists (one per person)
        self.pose_landmarks = landmarks

class TestSmartMirrorLogic(unittest.TestCase):
    
    @patch('smart_mirror.vision.PoseLandmarker')
    @patch('smart_mirror.vision.PoseLandmarkerOptions')
    @patch('smart_mirror.python.BaseOptions')
    def test_physics_application(self, MockBaseOptions, MockOptions, MockLandmarkerClass):
        """
        Verify that physics (Inertia/Gravity) affects the mesh points.
        """
        # Setup Mock Landmarker Instance
        mock_landmarker = MagicMock()
        MockLandmarkerClass.create_from_options.return_value = mock_landmarker
        
        mirror = LiveSmartMirror(model_path="dummy.task")
        
        # Define Landmark Sequence
        def make_pose_landmarks(offset_x, offset_y):
            # Create 33 landmarks
            l = [MockLandmark(0, 0)] * 33
            l[11] = MockLandmark(0.4 + offset_x, 0.2 + offset_y) # L Shoulder
            l[12] = MockLandmark(0.6 + offset_x, 0.2 + offset_y) # R Shoulder
            l[23] = MockLandmark(0.4 + offset_x, 0.5 + offset_y) # L Hip
            l[24] = MockLandmark(0.6 + offset_x, 0.5 + offset_y) # R Hip
            return [l] # List of lists (one person)

        # Frame 1: Stationary
        res1 = MockDetectionResult(make_pose_landmarks(0, 0))
        # Frame 2: Stationary (Gravity should kick in)
        res2 = MockDetectionResult(make_pose_landmarks(0, 0))
        # Frame 3: Moved Right
        res3 = MockDetectionResult(make_pose_landmarks(0.1, 0))
        
        mock_landmarker.detect_for_video.side_effect = [res1, res2, res3]
        
        dummy_frame = np.zeros((100, 100, 3), dtype=np.uint8)
        
        # --- Step 1: Initial Frame (Init Mesh) ---
        mirror.process_live_frame(dummy_frame, timestamp_ms=0)
        initial_mesh = np.copy(mirror.mesh_grid_points)
        
        # --- Step 2: Static Frame (Apply Gravity) ---
        mirror.process_live_frame(dummy_frame, timestamp_ms=33)
        static_mesh = np.copy(mirror.mesh_grid_points)
        
        # --- Step 3: Move Right (Apply Inertia) ---
        mirror.process_live_frame(dummy_frame, timestamp_ms=66)
        moved_mesh = np.copy(mirror.mesh_grid_points)
        
        center_idx = (2, 2)
        
        # Check Gravity (Static Frame)
        # Top-Mid Y=20, Bot-Mid Y=50. Mid-Mid Y=35.
        # With gravity, Y should be > 35.
        static_pt = static_mesh[center_idx]
        print(f"Static Pt (Frame 2): {static_pt}")
        self.assertTrue(static_pt[1] > 35.001, f"Gravity should pull point down (Y={static_pt[1]})")

        # Check Inertia (Moved Frame)
        # Body moved +X (Right). Inertia makes cloth Lag Left (-X relative to body).
        # We need to compare "Moved Mesh" vs "Target Mesh for Frame 3".
        # Target for Frame 3 is shifted +10px from Frame 2.
        # So Target X = 50 + 10 = 60.
        # With Inertia, Actual X < 60.
        moved_pt = moved_mesh[center_idx]
        print(f"Moved Pt (Frame 3): {moved_pt}")
        self.assertTrue(moved_pt[0] < 60.0, f"Inertia should lag behind target (X={moved_pt[0]} < 60)")

if __name__ == '__main__':
    unittest.main()
