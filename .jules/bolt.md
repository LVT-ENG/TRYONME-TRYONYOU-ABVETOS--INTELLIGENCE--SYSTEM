# Bolt's Journal

## 2023-10-27 - [Anti-pattern: Component Definition Inside Component]
**Learning:** Defining a component inside another component forces a remount of the child component on every parent render. This destroys internal state and animations, and kills performance.
**Action:** Always define components outside of the render function. Pass necessary data as props.
