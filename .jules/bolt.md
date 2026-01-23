## 2025-01-28 - Redundant Network Checks in React Components
**Learning:** Found a pattern where `fetch(HEAD)` was used to check for asset existence before rendering a component that already handles 404s/loading via `Suspense` and `useGLTF`. This created a race condition, an extra network request, and an unnecessary re-render.
**Action:** Always check if the loading mechanism (like `Suspense`) already handles the "loading" state before adding manual `isLoading` state variables and `fetch` checks. Remove them if redundant.
