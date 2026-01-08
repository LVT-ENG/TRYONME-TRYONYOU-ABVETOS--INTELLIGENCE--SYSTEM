import React from 'react';

const SkeletonLoader = ({ className }) => {
  return (
    <div className={className ? `animate-pulse bg-gray-700/50 rounded-lg ${className}` : 'animate-pulse bg-gray-700/50 rounded-lg'} />
  );
};

export default SkeletonLoader;
