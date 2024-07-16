// components/Loader.tsx
import React from 'react';
import { Rings } from 'react-loader-spinner';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Rings
          visible={true}
          height="80"
          width="80"
          color="#00897B"
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
    </div>
  );
};

export default Loader;
