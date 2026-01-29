## 2026-01-20 - [MediaPipe React Integration Loop]
**Learning:** `pose.onResults` callbacks defined inside `useEffect` with empty deps `[]` suffer from stale closures. Checking `useState` values inside them (like `if (!recommendation)`) causes infinite loops because the state is always the initial value (null).
**Action:** Use `useRef` to track state (like `hasFetched`) inside high-frequency callbacks like `onResults` to ensure fresh values are read without re-creating the callback or MediaPipe instance.

## 2026-01-20 - [Serverless Model Instantiation]
**Learning:** Instantiating `genai.GenerativeModel` inside the request handler (`generate_jules_response`) creates unnecessary overhead on every invocation. Serverless functions often reuse the execution environment (warm starts).
**Action:** Use a global singleton pattern with lazy initialization (`get_gemini_model`) to instantiate the model once per container lifecycle, significantly reducing latency for subsequent requests.
