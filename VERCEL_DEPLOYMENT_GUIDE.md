# Vercel Deployment Guide - Hybrid Configuration

## Overview
This project is configured as a **hybrid Vercel deployment** with:
- **Frontend**: Vite + React (Static Site Generation)
- **Backend**: Python FastAPI (Serverless Functions)

## Configuration Files

### vercel.json
The `vercel.json` file is configured to:
1. **Build the frontend** using Vite: `npm run build`
2. **Output to `dist/` directory**: Contains the built static files
3. **Deploy Python API** as serverless functions using `@vercel/python`
4. **Route requests** appropriately:
   - `/api/*` → Python FastAPI backend
   - `/assets/*` → Static assets from build
   - `/*` → Frontend SPA (index.html)

### Key Configuration Details

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ]
}
```

## How It Works

### Build Process
1. Vercel runs `npm install` to install Node.js dependencies
2. Vercel runs `npm run build` (Vite build) to compile React app
3. Vercel builds Python serverless function from `api/index.py`
4. Frontend static files are placed in `dist/`
5. Backend becomes available at `/api/*` routes

### Runtime Behavior
- **Static requests** (`/`, `/assets/*`, etc.) → Served from `dist/`
- **API requests** (`/api/*`) → Routed to Python FastAPI serverless functions
- **SPA routing** → All unmatched routes serve `index.html` for client-side routing

## Deployment Steps

### 1. Prerequisites
- Vercel account linked to GitHub repository
- Project created in Vercel dashboard (e.g., "tryonyou-main")

### 2. Environment Variables
Set the following environment variables in Vercel dashboard:
- `GOOGLE_GENAI_KEY` - Google Generative AI API key
- `STRIPE_SECRET_KEY` - Stripe secret key
- Any other required environment variables

### 3. Deploy to Vercel

#### Option A: Via Vercel Dashboard
1. Go to your Vercel dashboard
2. Select the "tryonyou-main" project
3. Click **"Redeploy"** button
4. Vercel will:
   - Pull latest code from repository
   - Install Node.js dependencies
   - Build Vite frontend
   - Deploy Python serverless functions
   - Deploy to production

#### Option B: Via CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod --token YOUR_VERCEL_TOKEN

# Or deploy to preview
vercel --token YOUR_VERCEL_TOKEN
```

## Why This Works Now

Previously, Vercel tried to serve the source code as a simple static site. The new configuration fixes this by:

1. **Explicit Build Command**: `buildCommand: "npm run build"` tells Vercel to build the frontend
2. **Output Directory**: `outputDirectory: "dist"` tells Vercel where to find built files
3. **Serverless Functions**: `builds` array configures Python API as serverless functions
4. **Proper Routing**: Routes separate API calls from static file serving

## File Structure

```
TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/
├── api/                      # Python FastAPI backend
│   ├── index.py             # Main API entry point
│   ├── fis_engine.py        # Business logic
│   └── requirements.txt     # Python dependencies
├── src/                      # React frontend source
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── dist/                     # Built frontend (generated)
│   ├── index.html
│   ├── assets/
│   └── ...
├── public/                   # Static assets
├── vercel.json              # Vercel configuration
├── package.json             # Node.js dependencies
└── vite.config.js           # Vite configuration
```

## Troubleshooting

### Build Fails
- Check that all Node.js dependencies are listed in `package.json`
- Ensure `vite` and `@vitejs/plugin-react` are installed
- Review Vercel build logs

### API Not Working
- Verify Python dependencies in `api/requirements.txt`
- Check environment variables are set in Vercel dashboard
- Review Vercel function logs

### Static Files Not Loading
- Ensure assets are in `public/` folder or imported in React components
- Check that build output directory is `dist/`
- Verify routing configuration in `vercel.json`

### CORS Issues
- FastAPI CORS middleware may be needed for local development
- Vercel handles CORS for same-origin requests automatically

## Testing Locally

### Frontend Only
```bash
npm install
npm run dev
# Opens at http://localhost:5173
```

### Backend Only
```bash
cd api
pip install -r requirements.txt
uvicorn index:app --reload
# Opens at http://localhost:8000
```

### Full Stack (with Vercel CLI)
```bash
npm install -g vercel
vercel dev
# Simulates Vercel environment locally
```

## Production URLs

After deployment, your app will be available at:
- **Production**: `https://tryonyou-main.vercel.app` (or your custom domain)
- **Frontend**: All routes except `/api/*`
- **API Health Check**: `https://tryonyou-main.vercel.app/api/health`

## Support

For issues or questions:
1. Check Vercel deployment logs
2. Review function logs for serverless errors
3. Refer to [Vercel Documentation](https://vercel.com/docs)
4. Refer to [FastAPI Documentation](https://fastapi.tiangolo.com/)
