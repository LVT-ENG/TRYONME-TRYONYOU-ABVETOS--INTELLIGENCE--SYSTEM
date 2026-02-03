# TRYONYOU - FIS (Fashion Intelligence System) v7.0

## Overview

TRYONYOU is an advanced Fashion Intelligence System designed for Galeries Lafayette. It leverages biometrics, AI, and real-time mesh overlays to provide personalized fashion recommendations.

This repository contains the source code for the "SuperCommit MAX" pilot, featuring:
- **Frontend**: React + Vite + TailwindCSS + MediaPipe
- **Backend**: Python + FastAPI + Google GenAI

## Google Platforms Integration

This project is powered by **Google Cloud** and the latest **Google AI** technologies.

### Gemini 2.0 Flash

The system utilizes the **Gemini 2.0 Flash** model via the `google-genai` SDK for generating sophisticated, high-speed fashion narratives. This ensures real-time responsiveness for the "Agent 70" stylist persona.

- **Model**: `gemini-2.0-flash`
- **SDK**: `google-genai` (v1.0+)
- **Integration**: `api/fis_engine.py`

## Getting Started

Please refer to [QUICK_START.md](QUICK_START.md) for instructions on setting up the environment and deploying the application.

For detailed deployment protocols, see [DEPLOYMENT_README.md](DEPLOYMENT_README.md).

## Project Structure

- `src/`: React frontend application.
- `api/`: Python backend (FastAPI) and FIS Engine.
- `public/`: Static assets.
- `scripts/`: Utility scripts.

## License

Confidential - Galeries Lafayette / TRYONYOU
