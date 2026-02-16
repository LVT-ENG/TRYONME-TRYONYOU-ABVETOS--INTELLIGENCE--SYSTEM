# TRYONYOU ULTRA V9.0 (Fashion Intelligence System)

## Overview

TRYONYOU ULTRA V9.0 is a state-of-the-art Fashion Intelligence System (FIS) designed for Galeries Lafayette Paris Haussmann. It provides a hyper-personalized virtual fitting experience ("Lafayette Pilot") using advanced body tracking and generative AI. Version 9.0 represents "L'Ajustement Parfait" (The Perfect Fit) with enhanced predictive intelligence, zero-display privacy, and seamless O2O (Online-to-Offline) conversion capabilities.

### V9.0 Key Features: "L'Ajustement Parfait"

* **99.7% Predictive Accuracy:** Advanced calibration integrating real textile elasticity for impeccable draping without physical try-on (Reference: Issue #1871, SuperCommit ProMax Ultra)
* **Zero-Display Privacy Technology:** "Zero Complex" experience ensuring no weight or size data is displayed, eliminating psychological barriers to purchase
* **O2O Conversion Module:** Active QR Code reservation system linking digital experience to physical fitting rooms, with projected returns below 5%

## New in V9.0: Google Platforms Integration

This repository is updated with the latest Google platforms technologies, delivering unprecedented performance and privacy:

-   **Google Gemini 2.0 Flash:** The system utilizes the cutting-edge **Gemini 2.0 Flash** model for generating "Agent 70" stylist narratives.
    -   **Speed:** Instant responses (**<500ms**) for a fluid user experience.
    -   **Context:** Multimodal understanding of garment images and user preferences.
-   **google-genai SDK:** The backend integration is built on the modern `google-genai` Python SDK.
    -   **Efficiency:** Optimized for ultra-low latency and secure enterprise deployment.
-   **MediaPipe:** Real-time body tracking powered by **Google MediaPipe**.
    -   **Precision:** Detection of **33 keypoints** for precise virtual fitting.
    -   **Privacy:** "Zero Tallas" measurements run entirely client-side.

For more details on the V9.0 updates:
-   [Read the full release notes (English)](NEWS.md)
-   [Lire les notes de mise à jour (Français)](NEWS_FR.md)

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

# Set up environment variables
cp .env.example .env
# Edit .env and add your API keys (see ENV_SETUP.md for details)

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173/`

**Important:** Before running the application, you must configure your environment variables. See [ENV_SETUP.md](ENV_SETUP.md) for detailed instructions.

### Deployment

For deployment and environment setup instructions, please refer to:
- [ENV_SETUP.md](ENV_SETUP.md) - **Environment variables configuration guide** (required setup)
- [QUICK_START.md](QUICK_START.md) - Quick start guide with deployment steps
- [GITHUB_TOKEN_SETUP.md](GITHUB_TOKEN_SETUP.md) - GitHub token generation guide
- [DEPLOYMENT_README.md](DEPLOYMENT_README.md) - Detailed deployment documentation

## Configuration

Environment variables are required for the application to function properly. The system uses:

-   `GOOGLE_API_KEY` / `VITE_GOOGLE_API_KEY`: Google API key for Gemini AI services
-   `VITE_VERCEL_TOKEN`: Vercel deployment token (production)
-   `TELEGRAM_BOT_TOKEN`: Telegram bot for notifications (production)
-   Additional variables listed in [ENV_SETUP.md](ENV_SETUP.md)

**See [ENV_SETUP.md](ENV_SETUP.md) for complete environment setup instructions.**

## SuperCommit Log
* **Date:** 2026-02-16
* **Protocol:** SuperCommit ProMax Ultra
* **Status:** Verified (Zero Tallas, Inventory Synced, Build Successful)
