## 2025-02-19 - Stale Closures in Event Listeners
**Learning:** Initializing event listeners (like MediaPipe `onResults`) inside `useEffect` with an empty dependency array `[]` creates a closure that captures the initial state forever. Using state variables inside these callbacks checks the *initial* value (e.g., `null`), not the current value.
**Action:** Use `useRef` to track mutable state (like `hasFetched`) that needs to be accessed inside long-lived callbacks without triggering re-renders or requiring re-initialization of the listener.

## 2025-02-19 - Expensive I/O in Hot Paths
**Learning:** The `FISOrchestrator.run_experience` method was reading and parsing the inventory file (Excel/CSV) on *every request*. This caused significant latency (~170-220ms).
**Action:** Implement caching for static data files loaded in hot paths. Using an instance-level dictionary cache (`self._inventory_cache`) reduced subsequent call latency to near-zero (~0ms), eliminating repetitive disk I/O and parsing overhead.
