

import React from 'react';
import { FaHome, FaCalendarAlt, FaUtensils,FaClock  } from 'react-icons/fa';
import { MdTableRestaurant } from "react-icons/md";
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className={`bg-gray-50 flex justify-between transition-all duration-300 w-30 sticky top-0 left-0full`}>
      <div className="px-4 py-4 space-y-4 relative">
        <Link to="/restaurant/dashboard" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-teal-600 relative">
          <FaHome className="h-6 w-6" />
          <span className="absolute top-full z-10 left-0 ml-2 w-max bg-teal-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dashboard</span>
        </Link>
        <Link to="/restaurant/reservations" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-teal-600 relative">
          <FaCalendarAlt className="h-6 w-6" />
          <span className="absolute top-full z-10 left-0 ml-2 w-max bg-teal-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Reservations</span>
        </Link>
        <Link to="/restaurant/profile" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-teal-600 relative">
          <FaUtensils className="h-6 w-6" />
          <span className="absolute top-full z-10 left-0 ml-2 w-max bg-teal-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Restaurant Profile</span>
        </Link>
        <Link to="/restaurant/tables" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-teal-600 relative">
          <MdTableRestaurant className="h-6 w-6" />
          <span className="absolute top-full z-10 left-0 ml-2 w-max bg-teal-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Table Management</span>
        </Link>
        <Link to="/restaurant/time-slots" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-teal-600 relative">
          <FaClock className="h-6 w-6" />
          <span className="absolute top-full z-10 left-0 ml-2 w-max bg-teal-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Time Slots</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;


