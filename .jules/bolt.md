## 2025-10-27 - [Backend Concurrency]
**Learning:** `HTTPServer` in Python's standard library is single-threaded by default. This creates a bottleneck where one long-running AI request blocks all other users.
**Action:** Use `ThreadingHTTPServer` (available in Python 3.7+) or `ThreadingMixIn` for any production-like Python HTTP server to ensure concurrent request handling without external WSGI containers.

## 2025-10-27 - [React Anti-Pattern: Fetch in Render]
**Learning:** Performing a manual `fetch(HEAD)` inside a `useEffect` to check if a 3D model exists is often redundant when using `Suspense` and loaders like `useGLTF`. It causes "waterfalls" (fetch then load) and unnecessary re-renders.
**Action:** Trust the loader's error handling or use an Error Boundary. If the file is missing, the loader will throw, which Suspense/ErrorBoundaries should catch. Do not pre-flight check assets in client-side code unless absolutely necessary for logic branching.
