# GitHub Copilot Instructions for TRYONYOU

## Project Overview

TRYONYOU is a unified AI-powered fashion intelligence platform combining virtual try-on, emotional styling, and advanced biometric systems. This is a full-stack application with:

- **Frontend**: React 18 + Vite 5 + Tailwind CSS
- **Backend**: Python with AI agent system
- **3D Graphics**: Three.js + @react-three/fiber
- **AI System**: 53 specialized AI agents using Google Generative AI

## Technology Stack

### Frontend
- React 18 with modern hooks
- Vite 5 for build tooling
- React Router 6 for routing
- Tailwind CSS 3 for styling
- Framer Motion 11 for animations
- Three.js + @react-three/fiber + @react-three/drei for 3D
- GSAP for advanced animations
- Lucide React for icons

### Backend
- Python 3.x
- Google Generative AI (Gemini models)
- HTTP server using `http.server` module
- Custom AI agent orchestration system

### Build & Development
```bash
# Frontend development
npm install          # Install dependencies
npm run dev         # Start dev server (Vite)
npm run build       # Build for production
npm run preview     # Preview production build

# Backend
# Ensure GOOGLE_API_KEY is set in .env file before starting
python master_brain.py  # Start AI backend server (port 8000 by default)
```

## Code Style & Conventions

### JavaScript/React
- Use functional components with hooks (no class components)
- Prefer arrow functions for component definitions
- Use lazy loading for route components: `lazy(() => import('./pages/ComponentName'))`
- Component file names use PascalCase: `MyAvatar.jsx`, `Navbar.jsx`
- Use Tailwind utility classes for styling
- Color scheme constants:
  - Primary Blue: `#00A8E8`
  - Dark Blue: `#003459`
  - Gold/Accent: `#D4AF37`
  - Metallic: `#8B92A0`
  - Black: `#0A0A0A`
  - Smoke: `#1A1A2E`

### Python
- Use snake_case for file names and functions: `agent_executor.py`, `run_expert()`
- Classes use PascalCase: `AgentExecutor`, `MOE_Router`
- Handle API errors gracefully with fallback to `gemini-1.5-flash` or `gemini-1.5-pro`
- All AI responses should be JSON format
- Use Spanish for console messages and comments in Python backend
- CORS headers required for API endpoints to allow React frontend access

### Project Structure
```
src/                    # Frontend React application
├── components/         # Reusable UI components (Navbar, Footer, Avatar3D, etc.)
├── pages/             # Route pages (14 total: Home, Demo, Brands, MyAvatar, etc.)
├── agents/            # AI agent coordination for frontend
├── data/              # JSON data files (texts.json for content)
├── hooks/             # Custom React hooks
├── styles/            # Global CSS (index.css with Tailwind)
├── utils/             # Utility functions
├── App.jsx            # Router configuration
└── main.jsx           # Entry point

core/                  # Backend Python AI system
├── agent_executor.py  # Main AI agent execution engine
├── google_ai_bridge.py # Google AI integration and routing
├── ai_config/         # AI agent configurations
├── efficiency_engine.py
└── calibration.py

public/                # Static assets
├── assets/            # Images, videos, animations, logos
└── models/            # 3D models (GLB/GLTF)
```

## Key Architectural Decisions

### Frontend
1. **Lazy Loading**: All route pages are lazy-loaded for performance
2. **Suspense Fallback**: Simple loading screen with gold text on black background
3. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
4. **Glass Morphism UI**: Dark theme with blur effects and neon accents
5. **Route Structure**: 14 pages split between Consumer (B2C) and Technical (B2B/Patent) sections

### Backend
1. **AI Agent System**: 53 specialized agents coordinated through MOE (Mixture of Experts) router
2. **Model Fallback**: Automatic fallback from unavailable models to stable Gemini versions
3. **JSON Response Format**: All AI responses must be valid JSON
4. **CORS Enabled**: All API endpoints allow cross-origin requests from React frontend
5. **Environment Variables**: API keys loaded from `.env` file

### Consumer Pages (B2C)
- `/` - Home landing page
- `/demo` - Interactive try-on demo
- `/brands` - Brand selection and filtering
- `/my-avatar` - Avatar creation wizard
- `/wardrobe` - Virtual closet with try-on
- `/showroom` - Curated looks gallery
- `/glow-up` - Style transformation
- `/ask-peacock` - AI chat assistant (🦚 Pau the Peacock)
- `/MagicMirror` - Magic mirror experience

### Technical/Business Pages (B2B/Patent)
- `/fit` - FIT Intelligence (biometric measurement)
- `/cap` - Computer-Aided Production system
- `/abvet` - Advanced Biometric Verification & Encrypted Transactions
- `/claims` - Patent claims (PCT/EP2025/067317)
- `/investors` - Investor information and pitch

## Common Patterns

### Creating a New Page Component
```jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function PageName() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-black via-[#0A0A0A] to-[#1A1A2E] pt-24 px-4"
    >
      {/* Page content */}
    </motion.div>
  );
}
```

### Creating a New AI Agent Endpoint
```python
def do_POST(self):
    if self.path == '/api/new-endpoint':
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data)
            result = executor.run_expert("agent_id", data)
            
            self._set_headers(200)
            self.wfile.write(json.dumps(result).encode())
        except Exception as e:
            self._set_headers(500)
            self.wfile.write(json.dumps({"error": str(e)}).encode())
```

## Testing
- **Current State**: No formal test framework is currently set up
- **Primary Method**: Manual testing through UI navigation
- **Manual Testing Checklist**:
  - Test all 14 pages by navigating through the UI
  - Verify 3D avatar loads correctly (or uses fallback)
  - Check responsive behavior on mobile, tablet, and desktop
  - Test AI agent endpoints with sample data
- **Future Testing Recommendations**:
  - **Frontend**: Jest + React Testing Library + Vitest for unit/component tests
  - **Backend**: pytest for Python unit tests and API integration tests
  - **E2E**: Playwright or Cypress for end-to-end user flows
  - **Visual**: Chromatic or Percy for visual regression testing

## Important Notes

### Do NOT
- Remove or modify existing working code unless necessary
- Change the color scheme or brand identity
- Break existing routes or navigation
- Modify the AI agent system without understanding the MOE router
- Use class components (use functional components with hooks)
- Hard-code API keys (use environment variables)

### DO
- Follow existing file naming conventions
- Use Tailwind utility classes for styling
- Implement lazy loading for new route pages
- Add proper error handling and fallbacks
- Keep the glass morphism UI theme consistent
- Use motion animations from Framer Motion
- Ensure CORS compatibility for API endpoints
- Handle missing 3D models gracefully

## Environment Setup

### Required Environment Variables
```
GOOGLE_API_KEY=your_gemini_api_key_here
```

### Dependencies Installation
```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

## Deployment

- Primary platform: Vercel
- Build command: `npm run build`
- Output directory: `dist/`
- Environment variables must be set in deployment platform
- Assets automatically copied from `public/` to `dist/`

## Patent & IP Protection

This project includes patented technology (PCT/EP2025/067317):
- Emotional Fashion Intelligence System
- Biometric Measurement Technology (FIT)
- Automated Production Methods (CAP)
- Multi-Factor Biometric Authentication (ABVET)

Be mindful of these proprietary systems when making changes.

## Additional Resources

- `README.md` - Comprehensive project documentation
- `FUSION_COMPLETE.md` - Platform fusion details
- `DEPLOYMENT_CHECKLIST.md` - Deployment guide
- `ASSETS_GUIDE.md` - Asset requirements and conventions
- `docs/` - Additional documentation files
