## 2025-10-27 - [Backend Concurrency]
**Learning:** `HTTPServer` in Python's standard library is single-threaded by default. This creates a bottleneck where one long-running AI request blocks all other users.
**Action:** Use `ThreadingHTTPServer` (available in Python 3.7+) or `ThreadingMixIn` for any production-like Python HTTP server to ensure concurrent request handling without external WSGI containers.

## 2025-10-28 - [Vite HMR & Code Splitting]
**Learning:** Defining React Context directly in `src/App.jsx` along with component exports breaks Vite's HMR and can interfere with route-based code splitting optimization.
**Action:** Always isolate Context definitions in `src/contexts/` and import them. This ensures the entry point remains clean for lazy loading routes.

## 2025-10-29 - [Dead AI Initialization]
**Learning:** The `BodyScan` component initializes the full MediaPipe Pose library (heavy WASM download) but never calls `pose.send()`, relying instead on a `setTimeout` simulation. This means the client pays the performance cost of AI initialization without any benefit.
**Action:** When auditing performance, check if initialized libraries are actually invoked. If a component is in "simulation mode" or "demo mode", the heavy real-world dependencies should be removed or lazy-loaded only when "real" mode is activated.

## 2025-10-29 - [Static Object Optimization]
**Learning:** Large static configuration objects (like animation variants or content arrays) defined inside React components are re-created on every render, causing unnecessary garbage collection pressure.
**Action:** Move static data outside the component definition or use `useMemo` to ensure referential stability, especially when passing these objects to libraries like `framer-motion` which rely on prop comparison.
