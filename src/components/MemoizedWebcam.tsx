import React, { memo, forwardRef } from 'react';
import Webcam from 'react-webcam';

// Memoized wrapper around react-webcam to prevent re-renders when parent state updates.
// This is critical for performance as Webcam initialization/reconciliation is heavy.
const MemoizedWebcam = memo(forwardRef<Webcam, React.ComponentProps<typeof Webcam>>((props, ref) => {
  return <Webcam ref={ref} {...props} />;
}));

MemoizedWebcam.displayName = 'MemoizedWebcam';

export default MemoizedWebcam;
