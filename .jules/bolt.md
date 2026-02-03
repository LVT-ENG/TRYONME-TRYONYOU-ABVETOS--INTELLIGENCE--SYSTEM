## 2025-02-19 - Stale Closures in Event Listeners
**Learning:** Initializing event listeners (like MediaPipe `onResults`) inside `useEffect` with an empty dependency array `[]` creates a closure that captures the initial state forever. Using state variables inside these callbacks checks the *initial* value (e.g., `null`), not the current value.
**Action:** Use `useRef` to track mutable state (like `hasFetched`) that needs to be accessed inside long-lived callbacks without triggering re-renders or requiring re-initialization of the listener.

## 2025-02-19 - Expensive I/O in Hot Paths
**Learning:** The `FISOrchestrator.run_experience` method was reading and parsing the inventory file (Excel/CSV) on *every request*. This caused significant latency (~170-220ms).
**Action:** Implement caching for static data files loaded in hot paths. Using an instance-level dictionary cache (`self._inventory_cache`) reduced subsequent call latency to near-zero (~0ms), eliminating repetitive disk I/O and parsing overhead.

## 2025-02-21 - Ghost Processes in SPA Transitions
**Learning:** In a Single Page Application (SPA), removing a `<video>` or `<canvas>` element from the DOM does not automatically stop the underlying camera stream or MediaPipe processing loop if they were initialized in JavaScript. They continue to run in the background, consuming CPU/GPU, even if not visible.
**Action:** Always store references to active heavy processes (like `Camera` or `Pose` instances) in `useRef` and explicitly call their stop/close methods when the component unmounts or transitions to a state where they are not needed.
