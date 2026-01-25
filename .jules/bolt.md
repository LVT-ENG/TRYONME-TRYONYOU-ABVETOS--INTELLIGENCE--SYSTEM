## 2025-01-28 - Redundant Network Checks in React Components
**Learning:** Found a pattern where `fetch(HEAD)` was used to check for asset existence before rendering a component that already handles 404s/loading via `Suspense` and `useGLTF`. This created a race condition, an extra network request, and an unnecessary re-render.
**Action:** Always check if the loading mechanism (like `Suspense`) already handles the "loading" state before adding manual `isLoading` state variables and `fetch` checks. Remove them if redundant.

## 2026-01-29 - Throttling High-Frequency Computer Vision Tasks
**Learning:** `requestAnimationFrame` runs at screen refresh rate (typically 60Hz), but heavy ML inference tasks (like MediaPipe Pose) often block the main thread or waste resources if run at that frequency without needing to.
**Action:** Implement throttling (e.g., limit to 30 FPS) for the inference step while keeping the animation loop active. This maintains responsiveness while significantly reducing CPU/GPU load.
