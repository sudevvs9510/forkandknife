import React, { useState } from 'react';
import { FaHome, FaCalendarAlt, FaUtensils, FaConciergeBell, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
   const [isOpen, setIsOpen] = useState(true);

   const toggleSidebar = () => {
      setIsOpen(!isOpen);
   };

   return (
      <aside className={`bg-white mt-10 flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-48' : 'w-21'} sticky top-0 h-full`}>
         <div className="p-4 space-y-4">
            <Link to="/restaurant/dashboard" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
               <FaHome className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">Dashboard</span>}
            </Link>
            <Link to="/restaurant/reservations" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
               <FaCalendarAlt className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">Reservations</span>}
            </Link>
            <Link to="/restaurant/profile" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
               <FaUtensils className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">Restaurant Profile</span>}
            </Link>
            <Link to="/restaurant/menu" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
               <FaConciergeBell className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">Menu</span>}
            </Link>
         </div>
         <button
            className="bg-green-600 text-white p-2 rounded focus:outline-none transition-all duration-300 ease-in-out self-end mb-4 mr-4"
            onClick={toggleSidebar}
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
         >
            {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
         </button>
      </aside>
   );
};

export default Sidebar;
