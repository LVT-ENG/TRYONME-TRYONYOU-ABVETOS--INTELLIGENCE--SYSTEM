#!/usr/bin/env python3
"""
Basic validation test for the MediaPipe biometric engine.
This test validates the core functionality without requiring a webcam.
"""

import numpy as np
import sys

def test_mediapipe_engine():
    """Test that mediapipe_engine can be imported and initialized."""
    try:
        from mediapipe_engine import TryOnBiometrics
        print("✓ Successfully imported TryOnBiometrics")
        
        # Initialize the engine
        engine = TryOnBiometrics()
        print("✓ Successfully initialized TryOnBiometrics")
        
        # Verify the engine has the required methods
        assert hasattr(engine, 'extract_metrics'), "Missing extract_metrics method"
        print("✓ extract_metrics method exists")
        
        # Verify MediaPipe components are initialized
        assert engine.mp_pose is not None, "mp_pose not initialized"
        assert engine.pose is not None, "pose not initialized"
        assert engine.mp_drawing is not None, "mp_drawing not initialized"
        print("✓ All MediaPipe components initialized")
        
        # Create a dummy frame (blank image)
        dummy_frame = np.zeros((480, 640, 3), dtype=np.uint8)
        print("✓ Created test frame")
        
        # Test extract_metrics with blank frame (should return None for metrics)
        metrics, result_frame = engine.extract_metrics(dummy_frame)
        print("✓ extract_metrics executed without errors")
        
        # Verify return types
        assert result_frame is not None, "Result frame should not be None"
        assert result_frame.shape == dummy_frame.shape, "Result frame shape mismatch"
        print("✓ Return types are correct")
        
        if metrics is None:
            print("✓ Correctly returned None for metrics (no person detected in blank frame)")
        else:
            # If by chance MediaPipe detected something in blank frame
            assert isinstance(metrics, dict), "Metrics should be a dict"
            assert "shoulder_width" in metrics, "Missing shoulder_width in metrics"
            assert "is_full_body" in metrics, "Missing is_full_body in metrics"
            print("✓ Metrics structure is correct")
        
        print("\n✅ All tests passed!")
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Note: MediaPipe and OpenCV need to be installed to run the biometric engine.")
        print("Install with: pip install -r requirements.txt")
        return False
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_mediapipe_engine()
    sys.exit(0 if success else 1)
