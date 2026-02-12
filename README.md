# TRYONYOU ULTRA V7.0 (Fashion Intelligence System)

## Overview

TRYONYOU ULTRA V7.0 is a state-of-the-art Fashion Intelligence System (FIS) designed for Galeries Lafayette. It provides a hyper-personalized virtual fitting experience ("Lafayette Pilot") using advanced body tracking and generative AI.

## Google Platforms Integration (Latest Updates)

This repository is updated with the latest Google platforms technologies:

### 1. Google Gemini 2.0 Flash
The new "Agent 70" architecture uses the **Gemini 2.0 Flash** model to generate real-time style narratives.
-   **Speed:** Instant responses (<500ms) for a fluid user experience.
-   **Multimodal Context:** Ability to understand both garment images and user preferences.
-   **Creativity:** Generation of persuasive and personalized fashion advice ("Lafayette Pilot").

### 2. google-genai SDK
The backend has migrated to the new `google-genai` Python SDK, optimizing communication with Google Cloud AI infrastructure.
-   **Efficiency:** Significant reduction in resource usage and network latency.
-   **Future-proof:** Prepared for upcoming Gemini platform features.
-   **Security:** Improved API key and access token management.

### 3. Google MediaPipe
The "Zero Tallas" functionality is powered by **MediaPipe** for body tracking.
-   **Privacy:** All biometric processing occurs in the client's browser (Client-Side), ensuring data privacy.
-   **Precision:** Detection of 33 body key points for precise virtual fitting.
-   **Performance:** Optimized execution on mobile and desktop devices without specialized hardware.

## Architecture

-   **Frontend:** React (Vite) with TailwindCSS.
-   **Backend:** Python (FastAPI) running as serverless functions (Vercel/Netlify).
-   **AI Engine:** `api/fis_engine.py` orchestrates the "Agent 70" (GenAI), "Jules" (Privacy/Sanitization), and "Pau" (QR/Assets) agents.

## Quick Start

### Local Development

To run the application locally:

```bash
# Clone the repository
git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Deployment

For deployment and environment setup instructions, please refer to:
- [QUICK_START.md](QUICK_START.md) - Quick start guide with deployment steps
- [GITHUB_TOKEN_SETUP.md](GITHUB_TOKEN_SETUP.md) - GitHub token generation guide
- [DEPLOYMENT_README.md](DEPLOYMENT_README.md) - Detailed deployment documentation

## Configuration

To enable the AI features, ensure one of the following environment variables is set:

-   `GOOGLE_GENAI_KEY`: The API key for Google Gemini (preferred for deployment).
-   `GOOGLE_API_KEY`: Alternative variable name supported by the SDK.

See `QUICK_START.md` for full environment setup.
