import React, { useState, useEffect } from 'react';
import '../styles/ABVETAuth.css';

/**
 * ABVET Biometric Authentication Component
 * 
 * Demonstrates the ABVET dual-biometric payment system
 * with iris and voice recognition (demo mode).
 * 
 * @component
 */
const ABVETAuth = ({ mode = 'demo', onAuthComplete = null }) => {
  const [authStep, setAuthStep] = useState('idle'); // idle, scanning, verifying, success, error
  const [authMethod, setAuthMethod] = useState(null); // 'iris', 'voice', 'dual'
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const isDemoMode = mode === 'demo' || import.meta.env.VITE_ABVET_MODE === 'demo';

  useEffect(() => {
    // Simulate progress during scanning
    if (authStep === 'scanning' || authStep === 'verifying') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [authStep]);

  useEffect(() => {
    // Auto-transition to next step when progress completes
    if (progress === 100) {
      setTimeout(() => {
        if (authStep === 'scanning') {
          setAuthStep('verifying');
          setProgress(0);
        } else if (authStep === 'verifying') {
          handleAuthSuccess();
        }
      }, 500);
    }
  }, [progress, authStep]);

  const startAuth = (method) => {
    setAuthMethod(method);
    setAuthStep('scanning');
    setProgress(0);
    setErrorMessage('');
    
    // Log authentication attempt (local only)
    console.log(`🔒 ABVET > ${method} authentication initiated`);
  };

  const handleAuthSuccess = () => {
    setAuthStep('success');
    console.log('✅ ABVET > Authentication successful');
    
    if (onAuthComplete) {
      onAuthComplete({
        success: true,
        method: authMethod,
        timestamp: new Date().toISOString(),
        mode: isDemoMode ? 'demo' : 'production'
      });
    }
  };

  const handleAuthError = (error) => {
    setAuthStep('error');
    setErrorMessage(error);
    console.error('❌ ABVET > Authentication failed:', error);
    
    if (onAuthComplete) {
      onAuthComplete({
        success: false,
        method: authMethod,
        error,
        timestamp: new Date().toISOString()
      });
    }
  };

  const resetAuth = () => {
    setAuthStep('idle');
    setAuthMethod(null);
    setProgress(0);
    setErrorMessage('');
  };

  const getStepMessage = () => {
    switch (authStep) {
      case 'scanning':
        return authMethod === 'iris' 
          ? 'Scanning iris pattern...' 
          : authMethod === 'voice'
          ? 'Analyzing voice signature...'
          : 'Dual biometric scan in progress...';
      case 'verifying':
        return 'Verifying identity...';
      case 'success':
        return 'Authentication successful!';
      case 'error':
        return errorMessage || 'Authentication failed';
      default:
        return 'Select authentication method';
    }
  };

  return (
    <div className="abvet-auth-container">
      <div className="abvet-header">
        <div className="abvet-logo">
          <svg viewBox="0 0 100 100" className="abvet-icon">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#006D77" strokeWidth="3" />
            <circle cx="35" cy="40" r="8" fill="#C5A46D" />
            <circle cx="65" cy="40" r="8" fill="#C5A46D" />
            <path d="M 30 65 Q 50 75 70 65" stroke="#006D77" strokeWidth="3" fill="none" />
          </svg>
        </div>
        <h3>ABVET Secure Payment</h3>
        <p className="abvet-subtitle">Dual-Biometric Authentication</p>
        {isDemoMode && <span className="demo-badge">DEMO MODE</span>}
      </div>

      <div className="abvet-status">
        <div className={`status-indicator status-${authStep}`}>
          <div className="status-icon"></div>
        </div>
        <p className="status-message">{getStepMessage()}</p>
        {(authStep === 'scanning' || authStep === 'verifying') && (
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>

      {authStep === 'idle' && (
        <div className="auth-methods">
          <button 
            className="auth-button iris-button"
            onClick={() => startAuth('iris')}
          >
            <svg viewBox="0 0 24 24" className="method-icon">
              <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
            <span>Iris Recognition</span>
          </button>

          <button 
            className="auth-button voice-button"
            onClick={() => startAuth('voice')}
          >
            <svg viewBox="0 0 24 24" className="method-icon">
              <path d="M12 2 L12 22 M8 6 L8 18 M16 6 L16 18 M4 10 L4 14 M20 10 L20 14" 
                    stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <span>Voice Recognition</span>
          </button>

          <button 
            className="auth-button dual-button"
            onClick={() => startAuth('dual')}
          >
            <svg viewBox="0 0 24 24" className="method-icon">
              <circle cx="9" cy="9" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M15 15 L15 21 M12 18 L18 18" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>Dual Biometric</span>
          </button>
        </div>
      )}

      {authStep === 'success' && (
        <div className="auth-result success">
          <svg viewBox="0 0 100 100" className="result-icon">
            <circle cx="50" cy="50" r="45" fill="#006D77" />
            <path d="M 30 50 L 45 65 L 70 35" stroke="#F5EFE6" strokeWidth="6" fill="none" />
          </svg>
          <button className="reset-button" onClick={resetAuth}>
            Complete Payment
          </button>
        </div>
      )}

      {authStep === 'error' && (
        <div className="auth-result error">
          <svg viewBox="0 0 100 100" className="result-icon">
            <circle cx="50" cy="50" r="45" fill="#d32f2f" />
            <path d="M 35 35 L 65 65 M 65 35 L 35 65" stroke="#F5EFE6" strokeWidth="6" />
          </svg>
          <button className="reset-button" onClick={resetAuth}>
            Try Again
          </button>
        </div>
      )}

      <div className="abvet-footer">
        <p className="security-note">
          🔒 Encrypted end-to-end • GDPR compliant • Patent pending
        </p>
      </div>
    </div>
  );
};

export default ABVETAuth;
