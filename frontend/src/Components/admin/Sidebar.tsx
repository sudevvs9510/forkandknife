import React from 'react';
import { FaHome, FaUser, FaUtensils  } from 'react-icons/fa';
import { MdAddBusiness } from "react-icons/md";
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {

  return (
    <aside className={`bg-gray-100 flex flex-col justify-between transition-all duration-300 w-30 sticky top-0 h-full`}>
      <div className="p-4 space-y-4 relative">
        <Link to="/admin/dashboard" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-gray-200 relative">
          <FaHome className="h-6 w-6" />
          <span className="absolute left-full ml-2 w-max bg-teal-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Admin Dashboard</span>
        </Link>
        <Link to="/admin/user-management" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-gray-200 relative">
          <FaUser className="h-6 w-6" />
          <span className="absolute left-full ml-2 w-max bg-teal-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">User Management</span>
        </Link>
        <Link to="/admin/restaurant-lists" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-gray-200 relative">
          <FaUtensils className="h-6 w-6" />
          <span className="absolute left-full ml-2 w-max bg-teal-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Restaurant Management</span>
        </Link>
        <Link to="/admin/new-registrations" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-gray-200 relative">
          <MdAddBusiness className="h-6 w-6" />
          <span className="absolute left-full ml-2 w-max bg-teal-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">New Restaurant Registrations</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
