## 2025-10-27 - [Backend Concurrency]
**Learning:** `HTTPServer` in Python's standard library is single-threaded by default. This creates a bottleneck where one long-running AI request blocks all other users.
**Action:** Use `ThreadingHTTPServer` (available in Python 3.7+) or `ThreadingMixIn` for any production-like Python HTTP server to ensure concurrent request handling without external WSGI containers.

## 2025-10-28 - [Vite HMR & Code Splitting]
**Learning:** Defining React Context directly in `src/App.jsx` along with component exports breaks Vite's HMR and can interfere with route-based code splitting optimization.
**Action:** Always isolate Context definitions in `src/contexts/` and import them. This ensures the entry point remains clean for lazy loading routes.
