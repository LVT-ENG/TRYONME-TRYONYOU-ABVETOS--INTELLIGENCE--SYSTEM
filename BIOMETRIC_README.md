# ABVETOS Biometric Engine

## Overview

This module provides real-time biometric analysis using MediaPipe for the TRYONYOU virtual try-on system. It extracts body measurements and pose information to enable accurate garment fitting on 3D avatars.

## Features

- Real-time pose detection using MediaPipe
- Shoulder width measurement for garment scaling
- Full body detection
- Visual debugging overlay
- Integration ready for ABVETOS Intelligence API

## Installation

### Install Python Dependencies

```bash
pip install -r requirements.txt
```

### Verify Installation

Run the test script to verify the biometric engine is working:

```bash
python test_biometric_engine.py
```

This will validate the core functionality without requiring a webcam.

## Usage

### Basic Integration

```python
from mediapipe_engine import TryOnBiometrics

# Initialize the biometric engine
engine = TryOnBiometrics()

# Process a video frame
metrics, annotated_frame = engine.extract_metrics(frame)

if metrics:
    print(f"Shoulder width: {metrics['shoulder_width']}")
    print(f"Full body detected: {metrics['is_full_body']}")
```

### Live Demo

Run the live biometric capture demo:

```bash
python abvetos_biometric_pilot.py
```

This will:
1. Open your webcam
2. Detect pose landmarks in real-time
3. Extract biometric metrics
4. Display visual feedback with measurements
5. Press ESC to exit

## API Integration

The demo script includes a payload structure ready for ABVETOS API integration:

```python
payload = {
    "user_id": "demo_user_001",
    "feature_type": "biometric_sync",
    "raw_data": metrics
}
```

Uncomment the API call in `abvetos_biometric_pilot.py` to enable real-time sync with your ABVETOS Intelligence backend.

## Architecture

### mediapipe_engine.py

Core biometric analysis engine:
- `TryOnBiometrics` class: Main interface for pose detection
- `extract_metrics()`: Processes frames and returns measurements

### abvetos_biometric_pilot.py

Live demonstration script:
- Webcam capture loop
- Real-time metric extraction
- Visual debug overlay
- API integration template

## Metrics Extracted

- **shoulder_width**: Normalized shoulder width for garment scaling
- **is_full_body**: Boolean indicating if full body is visible (based on ankle visibility)

## Requirements

- Python 3.8+
- OpenCV 4.8.0+
- MediaPipe 0.10.0+
- NumPy 1.24.0+
- Webcam (for live demo)

## Integration with TRYONYOU System

This biometric engine integrates with the main TRYONYOU ecosystem:

1. **Smart Wardrobe**: Measurements inform garment fit analysis
2. **3D Avatar**: Metrics guide avatar generation and scaling
3. **Pau AI**: Biometric data enhances style recommendations
4. **ABVETOS Intelligence**: Real-time sync with backend AI

## Notes

- The demo uses model_complexity=2 for highest accuracy
- Segmentation is enabled for better body isolation
- Minimum detection confidence is set to 0.5 for reliability
- The API call in the demo is commented out by default for safety
