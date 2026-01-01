import React from 'react';

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-black text-white">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#C5A46D]"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loading;
