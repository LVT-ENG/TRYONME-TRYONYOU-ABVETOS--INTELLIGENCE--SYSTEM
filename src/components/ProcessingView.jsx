import React from "react";

export const ProcessingView = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // Removed onComplete from dependencies since it's expected to be stable

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>
        Processing...
      </div>
      <div className="spinner"></div>
    </div>
  );
};
