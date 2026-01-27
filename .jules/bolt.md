## 2026-01-24 - React Stale Closure Trap
**Learning:** External libraries (like MediaPipe) with callbacks defined inside `useEffect` close over the initial state. Updating state inside the callback does not update the closure, leading to infinite loops if the callback re-executes based on the stale state condition.
**Action:** Use `useRef` for mutable values accessed inside callbacks that don't trigger re-renders or dependency updates, or ensure dependencies are correctly listed (though expensive for libraries).
