# TRYONYOU ULTRA V9.0 (Fashion Intelligence System)

## Overview

TRYONYOU ULTRA V9.0 is a state-of-the-art Fashion Intelligence System (FIS) designed for Galeries Lafayette Paris Haussmann. It provides a hyper-personalized virtual fitting experience ("Lafayette Pilot") using advanced body tracking and generative AI with 99.7% precision.

## Version 9.0 - "L'Ajustement Parfait" (The Perfect Fit)

### Key Features

-   **Predictive Intelligence (99.7% Precision):** Advanced biometric algorithms calibrated with real textile elasticity to guarantee a flawless fit without physical try-on
-   **"Zero Complex" Experience:** Zero-Display privacy technology ensures no weight or size data is displayed, eliminating psychological barriers to purchase
-   **O2O Conversion (Online to Offline):** Active QR Code reservation module linking digital experience to physical fitting rooms with projected return rate reduction to less than 5%

### Google Platforms Integration

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

## Certification

**V9.0 Certificate of Conformity** is available at:
- [Certificate V9 Conformity](public/docs/certification/CERTIFICATE_V9_CONFORMITY.md) - Technical and regulatory compliance certification
- [V9.0 Presentation Content](fis_v9_presentation_content.md) - Detailed feature documentation

## Configuration

To enable the AI features, ensure one of the following environment variables is set:

-   `GOOGLE_GENAI_KEY`: The API key for Google Gemini (preferred for deployment).
-   `GOOGLE_API_KEY`: Alternative variable name supported by the SDK.

See `QUICK_START.md` for full environment setup.
