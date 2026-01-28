## 2026-01-20 - [MediaPipe React Integration Loop]
**Learning:** `pose.onResults` callbacks defined inside `useEffect` with empty deps `[]` suffer from stale closures. Checking `useState` values inside them (like `if (!recommendation)`) causes infinite loops because the state is always the initial value (null).
**Action:** Use `useRef` to track state (like `hasFetched`) inside high-frequency callbacks like `onResults` to ensure fresh values are read without re-creating the callback or MediaPipe instance.
