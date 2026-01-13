# TRYONYOU — ABVETOS Intelligence System

A sophisticated virtual try-on and fashion intelligence platform featuring AI-powered biometric analysis, size recommendations, and interactive shopping experiences.

## 🚀 Overview

TRYONYOU is an advanced fashion technology platform that combines computer vision, AI, and interactive web technologies to revolutionize the online shopping experience. The system eliminates returns through accurate size recommendations and provides immersive try-on experiences.

**Protected by Patent PCT/EP2025/067317**

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 with Vite
- **UI Components**: Custom TypeScript/TSX components
- **Styling**: CSS with custom holographic effects and glassmorphism
- **Key Features**:
  - Interactive Try-On Interface
  - Smart Wardrobe Management
  - Biometric Capture & Checkout
  - AI Chat Integration
  - Concept Studio
  - Trend Dashboard
  - Promo Carousel

### Backend
- **Framework**: FastAPI (Python)
- **AI/ML**: MediaPipe for pose detection
- **Computer Vision**: OpenCV, NumPy
- **API Endpoints**:
  - `/` - Health check
  - `/analyze` - Biometric analysis endpoint
  - `/api/jules` - JULES V7 AI assistant

## 📋 Prerequisites

- Node.js (v18 or higher) - Required for Vite 7.x
- Python 3.8+
- npm or yarn

## 🔧 Installation

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Backend Setup

```bash
# Install Python dependencies from requirements.txt
pip install -r requirements.txt

# Install additional dependencies for computer vision features
pip install opencv-python mediapipe numpy

# Run the FastAPI server with uvicorn
uvicorn main:app --reload
```

The backend server will be available at `http://localhost:8000`

## 📜 Available Scripts

### Frontend
- `npm run dev` - Start Vite development server on port 5173
- `npm run build` - Build static production files

### Backend
- `uvicorn main:app --reload` - Start FastAPI development server with hot reload
- `python tryonyou_master_orchestrator.py` - Generate global.css and system status report

## 🌐 Deployment

The project is configured for Vercel deployment:

```bash
# Deploy to Vercel
vercel --prod
```

The `vercel.json` configuration handles:
- API routing to Python functions
- Static file serving
- Clean URLs

## 📁 Project Structure

```
.
├── api/                      # Backend API endpoints
│   └── jules/               # JULES AI assistant API
├── docs/                    # Documentation
├── public/                  # Static assets
├── scripts/                 # Utility scripts
├── src/
│   ├── data/               # JSON catalogs and configurations
│   ├── lib/                # Shared libraries
│   ├── pages/              # React page components
│   ├── styles/             # CSS stylesheets
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── index.html              # HTML entry point
├── main.py                 # FastAPI backend server
├── package.json            # Node.js dependencies
├── requirements.txt        # Python dependencies
├── vercel.json            # Vercel deployment config
└── vite.config.js         # Vite configuration
```

## 🎨 Key Features

### JULES V7 AI Assistant
Intelligent AI assistant for fashion recommendations and customer support, powered by the `/api/jules` endpoint.

### Biometric Analysis
Advanced body measurement system using MediaPipe and OpenCV to provide accurate size recommendations:
- Chest, waist, hips measurements
- Shoulder width analysis
- Automatic size recommendation (XS, S, M, L, XL)

**Note**: The biometric features require additional dependencies (opencv-python, mediapipe, numpy) beyond those in requirements.txt. Install them separately as shown in the Backend Setup section.

### Smart Wardrobe
Digital wardrobe management system for organizing and styling virtual fashion items.

### Interactive Try-On
Real-time virtual try-on experience with 3D visualization capabilities.

### Concept Studio
Creative design space for fashion concept development and visualization.

## 🎨 Design System

The project uses a custom color palette:
- **Anthracite** (#1A1A1A) - Primary background
- **Gold** (#D4AF37) - Accent color
- **Peacock Blue** (#006D77) - Secondary accent
- **Bone** (#F5EFE6) - Text color

Visual effects include:
- Glassmorphism
- Holographic elements
- Smooth animations

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Add your environment variables here
```

## 🤝 Contributing

This is a proprietary project protected by patent PCT/EP2025/067317.

## 📄 License

ISC License

## 👨‍💻 Author

espinar

## 🏢 Business Model

Ready to eliminate returns and revolutionize online fashion retail through:
- Accurate size recommendations
- Virtual try-on technology
- AI-powered shopping assistance
- Reduced return rates for retailers

## 🔗 API Documentation

### Main Endpoints

#### GET `/`
Health check endpoint
```json
{
  "status": "TRYONYOU PILOT OK"
}
```

#### POST `/analyze`
Biometric analysis endpoint
```json
{
  "chest": 88,
  "waist": 66,
  "hips": 94,
  "shoulders": 38,
  "recommended_size": "S"
}
```

#### GET `/api/jules`
JULES AI assistant status
```json
{
  "status": "🤖 JULES V7 ACTIVO",
  "vision": "Piloto Galeries Lafayette",
  "legal": "Protected by Patent PCT/EP2025/067317",
  "business": "Ready to eliminate returns"
}
```

## 🚀 Development Workflow

1. Make changes to source files
2. Test locally with `npm run dev`
3. Build with `npm run build`
4. Deploy with `npm run deploy:final` or via Vercel

## 📊 System Status

Check `TRYONYOU_MASTER_REPORT.json` for current system status and module health.
