## 2025-02-19 - Stale Closures in Event Listeners
**Learning:** Initializing event listeners (like MediaPipe `onResults`) inside `useEffect` with an empty dependency array `[]` creates a closure that captures the initial state forever. Using state variables inside these callbacks checks the *initial* value (e.g., `null`), not the current value.
**Action:** Use `useRef` to track mutable state (like `hasFetched`) that needs to be accessed inside long-lived callbacks without triggering re-renders or requiring re-initialization of the listener.
