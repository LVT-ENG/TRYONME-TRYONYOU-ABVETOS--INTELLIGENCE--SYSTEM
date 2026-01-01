import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-black text-[#C5A46D] mb-4">404</h1>
      <p className="text-xl uppercase tracking-widest mb-8 opacity-70">Page Not Found</p>
      <Link
        to="/"
        className="px-8 py-3 bg-[#C5A46D] text-black font-bold rounded hover:bg-white transition-all duration-300"
      >
        RETURN HOME
      </Link>
    </div>
  );
};

export default NotFound;
