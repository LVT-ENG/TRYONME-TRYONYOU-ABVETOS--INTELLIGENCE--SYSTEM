# NEURAL CORE v1.0 - Streamlit Interface

## Overview

NEURAL CORE v1.0 is a Streamlit-based neural interface designed for the TRYONYOU-ABVETOS Intelligence System. It features a cyberpunk-styled HUD with real-time console logging, authorization token generation, and environment variable management.

## Features

✓ **Neural HUD**: Cyberpunk-styled interface with 0.3s fade-in animation
✓ **Scan Line Animation**: 4-second continuous scan line effect
✓ **Real-time Console**: Live system logs with color-coded severity levels
✓ **Authorization**: Dynamic token generation (AUTH-XYZ-XXX pattern)
✓ **Environment Management**: Secure API key masking and display
✓ **Simulation Mode**: Automated system testing with progress tracking

## Installation

### Prerequisites

- Python 3.8 or higher
- pip package manager

### Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set environment variables (optional):
```bash
export API_KEY="your-api-key-here"
```

Or use GitHub Secrets for production deployment.

## Running the Application

### Local Development

```bash
streamlit run app.py
```

The application will start on `http://localhost:8501`

### Production Deployment

For production deployment with environment variables:

```bash
API_KEY="your-production-key" streamlit run app.py --server.headless=true
```

## Usage

### Control Panel

- **▶️ Start Simulation**: Initiates a simulation sequence with progress tracking
- **⏹️ Stop Simulation**: Halts the current simulation
- **🔑 Generate Authorization Token**: Creates a production-ready auth token (AUTH-XYZ-998 format)
- **🗑️ Clear Console**: Clears all console logs

### System Status

The right panel displays:
- Current system status (READY/RUNNING)
- Active authorization token
- Masked API key from environment
- QA checklist validation status

### Console Logs

The console displays real-time system events with:
- Timestamps (HH:MM:SS.mmm format)
- Severity levels (INFO, SUCCESS, WARNING, ERROR)
- Color-coded messages for quick identification

## QA Validation

The interface validates the following requirements:

- [x] UI/UX: CSS Injection with Neural HUD rendering
- [x] Animation: 0.3s fade-in transition
- [x] Animation: 4s scan line cycle
- [x] Authorization: Production token generation (AUTH-XYZ-998)
- [x] Environment: API_KEY masking and secure display

## Technology Stack

- **Streamlit** >= 1.28.0: Web application framework
- **Python 3.8+**: Core language
- **Custom CSS**: Neural HUD styling with animations

## Architecture

The application uses Streamlit's session state for:
- Console log persistence
- Authorization token management
- Simulation state tracking

CSS animations are implemented using:
- `@keyframes` for smooth transitions
- `animation` properties for scan lines and glow effects
- Gradient backgrounds for cyberpunk aesthetics

## Security

- API keys are automatically masked (showing only first/last 4 characters)
- Authorization tokens use secure random generation
- Environment variables are safely accessed without exposure

## Status

**Status**: ✅ READY FOR PRODUCTION DEMO

This interface has passed all QA requirements and is production-ready for the Lafayette Pilot.
