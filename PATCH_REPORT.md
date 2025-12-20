# TRYONYOU Pilot Patch Report

Generated: 2025-12-20 00:07:06Z
## Created files
- /home/ubuntu/tryonyou-repo/src/services/fitEngine.js
- /home/ubuntu/tryonyou-repo/src/pages/Try.jsx
- /home/ubuntu/tryonyou-repo/api/lead.js

## Modified files
- /home/ubuntu/tryonyou-repo/src/App.jsx
- /home/ubuntu/tryonyou-repo/src/pages/Demo.jsx
- /home/ubuntu/tryonyou-repo/src/pages/Home.jsx

## Warnings
- /home/ubuntu/tryonyou-repo/src/App.jsx: Added Try import.
- /home/ubuntu/tryonyou-repo/src/pages/Demo.jsx: Could not locate Demo() function signature. Manual patch needed.
- /home/ubuntu/tryonyou-repo/src/pages/Home.jsx: Rewired CTA /demo -> /try (best effort). Please verify UI copy.

## Errors
- None

## Deployment notes (Vercel)
- Create env var: `LEADS_WEBHOOK_URL` (Apps Script webhook) for /api/lead
- Verify routes: `/try` -> `/demo`
- Verify Home CTA points to `/try`
