import time
import mediapipe as mp
import cv2
import numpy as np
import os

def run_benchmark():
    # Load image
    img_path = 'verification/magic_mirror_test.png'
    if not os.path.exists(img_path):
        print(f"Error: {img_path} not found.")
        return

    img1 = cv2.imread(img_path)
    if img1 is None:
        print(f"Error: Could not read {img_path}")
        return

    # Convert to RGB as MediaPipe expects RGB
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)

    # Create a flipped version to simulate a different image (unrelated request)
    img2 = cv2.flip(img1, 1)

    images = [img1, img2] * 10  # 20 iterations

    mp_pose = mp.solutions.pose

    print("Starting benchmark...")

    # Benchmark static_image_mode=False (Current)
    print("\nTesting static_image_mode=False (Current implementation)...")
    pose_false = mp_pose.Pose(
        static_image_mode=False,
        min_detection_confidence=0.5,
        model_complexity=1
    )

    start_time = time.time()
    for img in images:
        pose_false.process(img)
    end_time = time.time()
    avg_false = (end_time - start_time) / len(images)
    print(f"Average time (False): {avg_false * 1000:.2f} ms")
    pose_false.close()

    # Benchmark static_image_mode=True (Proposed)
    print("\nTesting static_image_mode=True (Proposed optimization)...")
    pose_true = mp_pose.Pose(
        static_image_mode=True,
        min_detection_confidence=0.5,
        model_complexity=1
    )

    start_time = time.time()
    for img in images:
        pose_true.process(img)
    end_time = time.time()
    avg_true = (end_time - start_time) / len(images)
    print(f"Average time (True): {avg_true * 1000:.2f} ms")
    pose_true.close()

    # Compare
    diff = avg_false - avg_true
    percent = (diff / avg_false) * 100 if avg_false > 0 else 0
    print(f"\nOptimization impact: {diff * 1000:.2f} ms faster ({percent:.2f}%)")

if __name__ == "__main__":
    run_benchmark()
