import React from "react";

export const ProcessingView = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

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
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
