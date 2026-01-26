import time
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import cv2
import numpy as np
import os

def run_benchmark():
    # Load image
    img_path = 'verification/magic_mirror_test.png'
    if not os.path.exists(img_path):
        print(f"Error: {img_path} not found.")
        return

    # Helper to convert cv2 image to mp.Image
    def to_mp_image(cv_img):
        # cv2 is BGR, mp needs RGB
        rgb_img = cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB)
        return mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_img)

    img1_cv = cv2.imread(img_path)
    if img1_cv is None:
        print(f"Error: Could not read {img_path}")
        return

    img2_cv = cv2.flip(img1_cv, 1)

    # Pre-convert to mp.Image to isolate processing time (or include it? API takes mp.Image)
    # The current API takes numpy array (cv2), converts it.
    # mp.Image creation is fast (just wrapper around numpy array usually).
    # But let's create fresh mp.Image inside loop to simulate real usage where we get new frames.

    model_path = 'api/pose_landmarker.task'

    # 1. Benchmark VIDEO mode (Legacy static_image_mode=False equivalent)
    print("\nTesting Tasks API - RunningMode.VIDEO (Simulating legacy static=False)...")
    base_options = python.BaseOptions(model_asset_path=model_path)
    options = vision.PoseLandmarkerOptions(
        base_options=base_options,
        running_mode=vision.RunningMode.VIDEO,
        num_poses=1,
        min_pose_detection_confidence=0.5,
        min_pose_presence_confidence=0.5,
        min_tracking_confidence=0.5,
    )
    detector_video = vision.PoseLandmarker.create_from_options(options)

    start_time = time.time()
    # Alternate images. For VIDEO mode, we need increasing timestamps.
    for i in range(20):
        # Create mp.Image from "new" frame
        curr_cv = img1_cv if i % 2 == 0 else img2_cv
        mp_img = to_mp_image(curr_cv)

        # Timestamp must be increasing
        timestamp_ms = int(time.time() * 1000) + (i * 33)
        detector_video.detect_for_video(mp_img, timestamp_ms)

    end_time = time.time()
    avg_video = (end_time - start_time) / 20
    print(f"Average time (VIDEO mode): {avg_video * 1000:.2f} ms")
    detector_video.close()

    # 2. Benchmark IMAGE mode (Legacy static_image_mode=True equivalent)
    print("\nTesting Tasks API - RunningMode.IMAGE (Simulating legacy static=True)...")
    options = vision.PoseLandmarkerOptions(
        base_options=base_options,
        running_mode=vision.RunningMode.IMAGE,
        num_poses=1,
        min_pose_detection_confidence=0.5,
        min_pose_presence_confidence=0.5,
        min_tracking_confidence=0.5,
    )
    detector_image = vision.PoseLandmarker.create_from_options(options)

    start_time = time.time()
    for i in range(20):
        curr_cv = img1_cv if i % 2 == 0 else img2_cv
        mp_img = to_mp_image(curr_cv)

        detector_image.detect(mp_img)

    end_time = time.time()
    avg_image = (end_time - start_time) / 20
    print(f"Average time (IMAGE mode): {avg_image * 1000:.2f} ms")
    detector_image.close()

    # Compare
    diff = avg_video - avg_image
    percent = (diff / avg_video) * 100 if avg_video > 0 else 0
    print(f"\nOptimization impact (Switching to IMAGE mode for stateless): {diff * 1000:.2f} ms faster ({percent:.2f}%)")

if __name__ == "__main__":
    run_benchmark()
