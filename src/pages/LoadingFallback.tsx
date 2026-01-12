import React, { useState } from 'react';
import { Loader, AlertCircle, RefreshCw } from 'lucide-react';

interface LoadingFallbackProps {
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  children?: React.ReactNode;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  isLoading = false,
  error = null,
  onRetry,
  children
}) => {
  const [retryCount, setRetryCount] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <Loader className="w-full h-full animate-spin text-[#D4AF37]" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-2">
              Initializing AI Engine
            </h2>
            <p className="text-sm text-[#E5E4E2]">
              Loading models and preparing your virtual mirror...
            </p>
          </div>
          <div className="w-full max-w-xs h-1 bg-[#333333] rounded-full overflow-hidden">
            <div className="h-full bg-[#D4AF37] animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-400 mb-2">
              Error Loading Demo
            </h2>
            <p className="text-sm text-[#E5E4E2] mb-4">
              {error}
            </p>
            <p className="text-xs text-[#999999]">
              Attempt {retryCount + 1}
            </p>
          </div>
          
          {onRetry && (
            <button
              onClick={() => {
                setRetryCount(prev => prev + 1);
                onRetry();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#111111] font-bold rounded hover:bg-[#F4E4BC] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
          
          <a
            href="/"
            className="text-sm text-[#D4AF37] hover:text-[#F4E4BC] transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingFallback;
