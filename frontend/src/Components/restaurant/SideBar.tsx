// import React, { useState } from 'react';
// import { FaHome, FaCalendarAlt, FaUtensils, FaConciergeBell, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Sidebar: React.FC = () => {
//    const [isOpen, setIsOpen] = useState(true);

//    const toggleSidebar = () => {
//       setIsOpen(!isOpen);
//    };

//    return (
//       <aside className={`bg-white mt-10 flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-48' : 'w-21'} sticky top-0 h-full`}>
//          <div className="p-4 space-y-4">
//             <Link to="/restaurant/dashboard" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
//                <FaHome className="h-6 w-6" />
//                {isOpen && <span className="hidden md:block">Dashboard</span>}
//             </Link>
//             <Link to="/restaurant/reservations" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
//                <FaCalendarAlt className="h-6 w-6" />
//                {isOpen && <span className="hidden md:block">Reservations</span>}
//             </Link>
//             <Link to="/restaurant/profile" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
//                <FaUtensils className="h-6 w-6" />
//                {isOpen && <span className="hidden md:block">Restaurant Profile</span>}
//             </Link>
//             <Link to="/restaurant/menu" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
//                <FaConciergeBell className="h-6 w-6" />
//                {isOpen && <span className="hidden md:block">Menu</span>}
//             </Link>
//          </div>
//          <button
//             className="bg-green-600 text-white p-2 rounded focus:outline-none transition-all duration-300 ease-in-out self-end mb-4 mr-4"
//             onClick={toggleSidebar}
//             aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
//          >
//             {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
//          </button>
//       </aside>
//    );
// };

// export default Sidebar;



// import React, { useState } from 'react';
// import { FaHome, FaCalendarAlt, FaUtensils, FaConciergeBell, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Sidebar: React.FC = () => {
//    const [isOpen, setIsOpen] = useState(true);

//    const toggleSidebar = () => {
//       setIsOpen(!isOpen);
//    };

//    return (
//       <aside className={`bg-white flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-48' : 'w-21'} sticky top-0 h-full`}>
//          <div className="p-4 space-y-4">
//             <Link to="/restaurant/dashboard" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
//                <FaHome className="h-6 w-6" />
//                {isOpen && <span className="hidden md:block">Dashboard</span>}
//             </Link>
//             <Link to="/restaurant/reservations" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
//                <FaCalendarAlt className="h-6 w-6" />
//                {isOpen && <span className="hidden md:block">Reservations</span>}
//             </Link>
//             <Link to="/restaurant/profile" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
//                <FaUtensils className="h-6 w-6" />
//                {isOpen && <span className="hidden md:block">Restaurant Profile</span>}
//             </Link>
//             <Link to="/restaurant/menu" className="flex items-center space-x-2 py-2 px-4 bg-white rounded shadow hover:bg-gray-200">
//                <FaConciergeBell className="h-6 w-6" />
//                {isOpen && <span className="hidden md:block">Menu</span>}
//             </Link>
//          </div>
//          <button
//             className="bg-green-600 text-white p-2 rounded focus:outline-none transition-all duration-300 ease-in-out self-end mb-4 mr-4"
//             onClick={toggleSidebar}
//             aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
//          >
//             {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
//          </button>
//       </aside>
//    );
// };

// export default Sidebar;




import React from 'react';
import { FaHome, FaCalendarAlt, FaUtensils,FaClock  } from 'react-icons/fa';
import { MdTableRestaurant } from "react-icons/md";
// import { BiSolidFoodMenu } from "react-icons/bi";
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

  return (
    <aside className={`bg-gray-100 flex flex-col justify-between transition-all duration-300 w-30 sticky top-0 h-full`}>
      <div className="p-4 space-y-4 relative">
        <Link to="/restaurant/dashboard" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-gray-200 relative">
          <FaHome className="h-6 w-6" />
          <span className="absolute left-full ml-2 w-max bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dashboard</span>
        </Link>
        <Link to="/restaurant/reservations" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-gray-200 relative">
          <FaCalendarAlt className="h-6 w-6" />
          <span className="absolute left-full ml-2 w-max bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Reservations</span>
        </Link>
        <Link to="/restaurant/profile" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-gray-200 relative">
          <FaUtensils className="h-6 w-6" />
          <span className="absolute left-full ml-2 w-max bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Restaurant Profile</span>
        </Link>
        <Link to="/restaurant/tables" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-gray-200 relative">
          <MdTableRestaurant className="h-6 w-6" />
          <span className="absolute left-full ml-2 w-max bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Table Management</span>
        </Link>
        <Link to="/restaurant/tableslots" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-gray-200 relative">
          <FaClock className="h-6 w-6" />
          <span className="absolute left-full ml-2 w-max bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Table Slots</span>
        </Link>
        {/* <Link to="/restaurant/menu" className="group flex items-center py-2 px-4 bg-white rounded shadow hover:bg-gray-200 relative">
          <BiSolidFoodMenu className="h-6 w-6" />
          <span className="absolute left-full ml-2 w-max bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Menu</span>
        </Link> */}
      </div>
    </aside>
  );
};

export default Sidebar;
