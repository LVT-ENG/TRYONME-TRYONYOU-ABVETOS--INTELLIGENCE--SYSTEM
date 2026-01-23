import argparse
import cv2
import sys
from smart_mirror import LiveSmartMirror

def main():
    parser = argparse.ArgumentParser(description="Jules Smart Mirror Logic")
    parser.add_argument("--input", type=str, required=True, help="Path to input video file")
    parser.add_argument("--output", type=str, required=True, help="Path to output video file")
    
    args = parser.parse_args()
    
    # Initialize processor
    mirror = LiveSmartMirror()
    
    # Open Video
    cap = cv2.VideoCapture(args.input)
    if not cap.isOpened():
        print(f"Error: Could not open video file {args.input}")
        sys.exit(1)
        
    # Get video properties
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    
    # Initialize Writer
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(args.output, fourcc, fps, (width, height))
    
    print(f"Processing {args.input} -> {args.output}...")
    
    frame_count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # Process Frame
        timestamp_ms = int(cap.get(cv2.CAP_PROP_POS_MSEC))
        processed_frame = mirror.process_live_frame(frame, timestamp_ms)
        
        # Write Frame
        out.write(processed_frame)
        
        frame_count += 1
        if frame_count % 30 == 0:
            print(f"Processed {frame_count} frames...", end='\r')
            
    print(f"\nDone! Processed {frame_count} frames.")
    
    cap.release()
    out.release()

if __name__ == "__main__":
    main()
