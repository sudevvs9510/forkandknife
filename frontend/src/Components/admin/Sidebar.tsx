import React, { useState } from 'react';
import { FaHome, FaUser, FaUtensils, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const Sidebar: React.FC = () => {
   const [isOpen, setIsOpen] = useState(true);

   const toggleSidebar = () => {
      setIsOpen(!isOpen);
   };

   return (
      <aside className={`bg-gray-100 flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-48' : 'w-18'} fixed lg:relative h-full lg:h-auto`}>
         <div className="p-4 space-y-4">
            <Link to="/admin/dashboard">
            <a className={`flex items-center ${isOpen ? 'space-x-2' : 'justify-center'} py-2 px-4 bg-white rounded shadow hover:bg-gray-200`}>
               <FaHome className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">Admin Dashboard</span>}
            </a>
            </Link>

            <Link to="">
            <a  className={`flex items-center ${isOpen ? 'space-x-2' : 'justify-center'} py-2 px-4 bg-white rounded shadow hover:bg-gray-200`}>
               <FaUser className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">User Management</span>}
            </a>
            </Link>


            <Link to="/admin/restaurant-lists">
            <a className={`flex items-center ${isOpen ? 'space-x-2' : 'justify-center'} py-2 px-4 bg-white rounded shadow hover:bg-gray-200`}>
               <FaUtensils className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">Restaurant Management</span>}
            </a>
            </Link>

            <Link to="/admin/new-registrations">
            <a className={`flex items-center ${isOpen ? 'space-x-2' : 'justify-center'} py-2 px-4 bg-white rounded shadow hover:bg-gray-200`}>
               <FaUtensils className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">New Restaurant Registrations</span>}
            </a>
            </Link>
         </div>
         <button
            className="bg-green-600 text-white p-2 rounded focus:outline-none transition-all duration-300 ease-in-out self-end mb-4 mr-4"
            onClick={toggleSidebar}
         >
            {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
         </button>
      </aside>
   );
};

export default Sidebar;
