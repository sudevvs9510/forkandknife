import React, { useState } from 'react';
import { FaHome, FaCalendarAlt, FaUtensils, FaConciergeBell, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Sidebar: React.FC = () => {
   const [isOpen, setIsOpen] = useState(true);

   const toggleSidebar = () => {
      setIsOpen(!isOpen);
   };

   return (
      <aside className={`bg-gray-100 flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-48' : 'w-18'} sticky`}>
         <div className="p-4 space-y-4 relative">
            <a href="#" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
               <FaHome className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">Dashboard</span>}
            </a>
            <a href="#" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
               <FaCalendarAlt className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">Reservations</span>}
            </a>
            <a href="#" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
               <FaUtensils className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">Restaurants</span>}
            </a>
            <a href="#" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
               <FaConciergeBell className="h-6 w-6" />
               {isOpen && <span className="hidden md:block">Menu</span>}
            </a>
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
