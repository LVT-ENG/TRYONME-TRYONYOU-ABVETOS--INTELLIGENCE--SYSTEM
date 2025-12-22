import React from "react";

export const ProcessingView = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array - onComplete is expected to be stable

  return (
    <div className="processing-view">
      <div className="processing-text">
        Processing...
      </div>
      <div className="spinner"></div>
    </div>
  );
};
