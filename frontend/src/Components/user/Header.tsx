import React from "react";
import { FaSearch } from 'react-icons/fa';
import { FaLocationPin } from "react-icons/fa6";

const Header: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[url('./assets/images/interior-restaurant-design.jpg')] bg-cover bg-no-repeat">
      <div className="bg-teal-900 bg-opacity-80 w-full lg:w-2/3 p-10 rounded-lg flex flex-col items-center space-y-5">
          <h1 className="text-white font-semibold text-4xl lg:text-5xl text-center">
            Discover and book the best restaurant
          </h1>
          <form className="w-full flex flex-col lg:flex-row bg-teal-800 py-2 px-2 rounded-lg items-center space-y-3 lg:space-y-0 lg:space-x-3">
            <div className="flex items-center bg-white rounded-lg shadow-md w-full lg:w-2/6 p-3">
              <FaLocationPin className="text-gray-400 mx-2" />
              <input
                type="text"
                placeholder="Location"
                className="bg-transparent focus:outline-none flex-1"
              />
            </div>
            <div className="flex items-center bg-white rounded-lg shadow-md w-full lg:w-2/3 p-3">
              <FaSearch className="text-gray-400 mx-2" />
              <input
                type="text"
                placeholder="Restaurant"
                className="bg-transparent focus:outline-none flex-1"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-400 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition duration-200"
            >Search
            </button>
          </form>
      </div>
    </div>
  );
};

export default Header;
