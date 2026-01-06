import React from 'react';

const SkeletonLoader = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-700/50 rounded-lg ${className}`} />
  );
};

export default SkeletonLoader;
