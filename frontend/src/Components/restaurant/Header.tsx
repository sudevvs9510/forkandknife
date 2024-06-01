import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-teal-600 text-white flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold">Fork & Knife</h1>
      <div className="flex space-x-2">
        <button className="bg-blue-600 px-4 py-2 rounded">Filter</button>
        <button className="bg-red-500 px-4 py-2 rounded">Logout</button>
      </div>
    </header>
  );
};

export default Header;
