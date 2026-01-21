# TryOnYou Developer Package

Welcome to the TryOnYou backend codebase. This package contains the core Python services, serverless function definitions, and monitoring tools required to maintain and deploy the "Divineo V7" pilot.

## 📂 Project Structure

```
developer_handoff/
├── backend_core/       # Main FastAPI application (Standalone Server)
│   ├── main.py         # Entry point for the API
│   ├── pilot_assets/   # Catalog and assets
│   └── ...
├── serverless_api/     # Vercel Serverless Functions (for Edge deployment)
│   ├── matching/       # Matching engine logic
│   └── ...
├── monitoring/         # Health check and system monitoring tools
│   ├── guardian_monitor.py
│   └── requirements.txt
├── scripts/            # Utility scripts (consolidation, setup)
└── requirements.txt    # dependencies for backend_core
```

## 🚀 Getting Started

### 1. Backend Core (FastAPI)

This is the main Python service handling logic that isn't offloaded to the edge.

**Setup:**

```bash
cd backend_core
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r ../requirements.txt
```

**Running the Server:**

```bash
# Runs on http://localhost:8000
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Monitoring (Guardian)

The `guardian_monitor.py` script ensures the web service is alive and the system is healthy. It is designed to "take care" of the infrastructure.

**Setup & Run:**

```bash
cd monitoring
pip install -r requirements.txt
# Set the target URL if different from default
export BACKEND_URL="http://localhost:8000/status"
python guardian_monitor.py
```

It will log health status to `guardian.log`.

### 3. Serverless API

The `serverless_api` folder contains the structure used for Vercel Serverless Functions.
- `api/matching/index.py` handles the specialized matching logic.
- These are deployed automatically via Vercel if the repo is connected.

## 🛠 Deployment

- **Production:** The project is configured for Vercel. Ensure `vercel.json` (in the root of the full repo) points to these API paths.
- **Docker:** You can containerize `backend_core` using the provided `Dockerfile` inside that directory.

## 📞 Support

This package was prepared to assist in the handover and maintenance of the TryOnYou platform.
