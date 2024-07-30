import React from 'react';

const Shimmer: React.FC = () => {
  return (
    <div className="animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex space-x-4 py-1 px-6 bg-white border-b border-gray-100">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
