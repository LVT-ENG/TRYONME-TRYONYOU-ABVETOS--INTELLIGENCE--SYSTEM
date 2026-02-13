# TRYONYOU ULTRA V9.0 (Fashion Intelligence System)

## Overview

TRYONYOU ULTRA V9.0 is a state-of-the-art Fashion Intelligence System (FIS) designed for Galeries Lafayette Paris Haussmann. It provides a hyper-personalized virtual fitting experience ("Lafayette Pilot") using advanced body tracking and generative AI. Version 9.0 represents "L'Ajustement Parfait" (The Perfect Fit) with enhanced predictive intelligence, zero-display privacy, and seamless O2O (Online-to-Offline) conversion capabilities.

### V9.0 Key Features: "L'Ajustement Parfait"

* **99.7% Predictive Accuracy:** Advanced calibration integrating real textile elasticity for impeccable draping without physical try-on (Reference: Issue #1871, SuperCommit ProMax Ultra)
* **Zero-Display Privacy Technology:** "Zero Complex" experience ensuring no weight or size data is displayed, eliminating psychological barriers to purchase
* **O2O Conversion Module:** Active QR Code reservation system linking digital experience to physical fitting rooms, with projected returns below 5%

## Google Platforms Integration (Latest Updates)

This repository is updated with the latest Google platforms technologies:

-   **Google Gemini 2.0 Flash:** The system utilizes the cutting-edge **Gemini 2.0 Flash** model for generating "Agent 70" stylist narratives, providing instant, sophisticated, and context-aware fashion advice.
-   **google-genai SDK:** The backend integration is built on the modern `google-genai` Python SDK, ensuring optimal performance and compatibility with the latest Gemini models.
-   **MediaPipe:** Real-time body tracking and "Zero Tallas" (Zero Sizes) measurements are powered by **Google MediaPipe**, running client-side for privacy and speed.

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
