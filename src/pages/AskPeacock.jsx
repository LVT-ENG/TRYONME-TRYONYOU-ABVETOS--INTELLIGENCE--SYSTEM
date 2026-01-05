import React from 'react';

export default function AskPeacock() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0A0A0A] to-[#1A1A2E] flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-6">Ask Peacock</h1>
        <p className="text-lg text-gray-300 mb-8">
          Interactive AI-powered fashion advisor powered by TRYONYOU's PAU system
        </p>
        <div className="bg-[#1A1A2E] border border-[#D4AF37] rounded-lg p-8">
          <p className="text-gray-400">Coming Soon - AI Fashion Recommendations</p>
        </div>
      </div>
    </div>
  );
}
