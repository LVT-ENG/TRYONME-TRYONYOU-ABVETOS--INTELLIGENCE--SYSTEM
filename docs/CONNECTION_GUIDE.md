# TRYONYOU System Connection & Sintonia (Synchronization)

## Overview
This document describes how the TRYONYOU system components are connected and synchronized (en sintonia) with each other.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     TRYONYOU SYSTEM                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                │
│  │   Frontend   │ ◄─────► │   Backend    │                │
│  │  React/Vite  │   API   │   FastAPI    │                │
│  └──────────────┘         └──────────────┘                │
│         │                        │                         │
│         │                        ▼                         │
│         │                 ┌─────────────┐                 │
│         │                 │  Matching   │                 │
│         │                 │   Engine    │                 │
│         │                 └─────────────┘                 │
│         │                        │                         │
│         │                        ▼                         │
│         │                 ┌─────────────┐                 │
│         └────────────────►│  Garment    │                 │
│                           │  Database   │                 │
│                           └─────────────┘                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. Frontend (React + Vite)
- **Location**: `/src`
- **Entry Point**: `src/main.jsx`
- **Main Page**: `src/pages/Home.jsx`
- **Status Page**: `src/pages/ConnectionStatus.jsx`

The frontend provides:
- User interface for Lafayette Pilot demo
- Biometric scanner visualization
- Virtual try-on experience
- Real-time system status monitoring

### 2. Backend (FastAPI)
- **Location**: `/backend`
- **Entry Point**: `backend/main.py`
- **API Wrapper**: `api/index.py`

The backend provides:
- `/api/health` - System health check
- `/api/recommend` - Get garment recommendation
- `/api/fit-analysis` - Detailed fit analysis
- `/api/garments` - List all garments
- `/api/garment/{id}` - Get specific garment
- `/api/scan/process` - Process biometric data
- `/api/conversation/process` - Process user input

### 3. Matching Engine
- **Location**: `backend/matching_engine.py`
- **Purpose**: Matches user measurements with garment specifications

The engine calculates:
- Fit scores based on biometric data
- Fabric elasticity considerations
- Drape score analysis
- Size recommendations

### 4. Garment Database
- **Location**: `backend/garment_database.json`
- **Purpose**: Stores Lafayette garment catalog

Each garment includes:
- Measurements (chest, shoulders, waist, etc.)
- Fabric properties (elasticity, drape score)
- Occasion tags
- Brand and category information

## Connection Flow

### Development Environment
1. Frontend runs on `http://localhost:5173` (Vite dev server)
2. Backend runs on `http://localhost:5000` (FastAPI/Uvicorn)
3. API calls use CORS to communicate between servers
4. Configuration in `src/config/index.js` and `src/utils/api.js`

### Production Environment (Vercel)
1. Frontend builds to `/dist` folder (static files)
2. Backend runs as Vercel serverless function at `/api/*`
3. Both deployed together on Vercel
4. No CORS needed - same domain
5. Configuration in `vercel.json`

## API Integration

### Using the API from Frontend

```javascript
import api from './utils/api';

// Check system health
const health = await api.checkHealth();

// Get garments list
const garments = await api.listGarments();

// Get recommendation
const recommendation = await api.getRecommendation(
  measurements,
  conversation
);
```

### Configuration

Edit `src/config/index.js` to modify:
- API timeouts
- Feature flags
- Theme colors
- Service settings

## System Status Monitoring

Access the System Status page to verify connections:
1. Visit the home page
2. Click "SYSTEM STATUS" button
3. View real-time connection status
4. Check API, garments, and backend connectivity

The status page shows:
- ✅ Green: Service connected and working
- 🔄 Blue: Checking connection
- ❌ Red: Connection failed
- ⏸️ Gray: Waiting to check

## Deployment

### Vercel Deployment
The system is configured for seamless Vercel deployment:

```bash
# Deploy to Vercel
npm run build
vercel --prod
```

The `vercel.json` configuration ensures:
- Frontend static files served from `/dist`
- Backend API accessible at `/api/*`
- Proper routing for single-page app

### Environment Variables
No environment variables needed by default. The system automatically detects:
- Development vs Production mode
- Correct API base URL
- Feature availability

## Troubleshooting

### Connection Issues
1. Check System Status page for specific errors
2. Verify backend is running (development only)
3. Check browser console for API errors
4. Ensure CORS is configured (development only)

### Backend Not Responding
```bash
# Start backend manually
cd backend
pip install -r requirements.txt
python -c "from main import app; import uvicorn; uvicorn.run(app, host='127.0.0.1', port=5000)"
```

### Build Issues
```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## Patent & Legal
- **Patent**: PCT/EP2025/067317
- **Client**: Galeries Lafayette
- **System**: Jules Lafayette Pilot v7
- **Version**: 3.0.0

## Technical Stack
- **Frontend**: React 18, Vite 7, Tailwind CSS 3, Framer Motion 11
- **Backend**: Python 3.x, FastAPI, Uvicorn
- **Deployment**: Vercel (serverless)
- **3D**: Three.js, @react-three/fiber
- **AI/ML**: MediaPipe, NumPy

---

*Last Updated: 2026-01-23*
*System: TRYONYOU Intelligence System*
*Status: ✅ Connected & Synchronized*
