
// import React, { useState } from 'react';
// import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

// const MainNavBar: React.FC = () => {
//   const [showSearchBar, setShowSearchBar] = useState(false);

//   const toggleSearchBar = () => {
//     setShowSearchBar(!showSearchBar);
//   };

//   return (
//     <nav className="fixed top-0 w-full z-10 flex items-center justify-between p-4 bg-teal-600 shadow">
//       <div className="flex items-center">
//         <div className="text-2xl font-bold text-white">Fork & Knife</div>
//       </div>

//       {/* Search section visible for screens above 840px */}
//       <div className="hidden md:flex items-center space-x-1">
//         <div className="relative flex items-center">
//           <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//             <FaMapMarkerAlt className="h-5 w-5 text-gray-500" />
//           </span>
//           <input
//             type="text"
//             placeholder="Location"
//             className="pl-10 pr-4 py-2 border rounded-l-2xl rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="relative flex items-center">
//           <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//             <FaSearch className="h-5 w-5 text-gray-500" />
//           </span>
//           <input
//             type="text"
//             placeholder="Restaurant name..."
//             className="pl-10 pr-4 py-2 border rounded-r-2xl rounded-l-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button className="bg-teal-800 text-white px-5 py-2 rounded-lg hover:bg-[#00CCB8] focus:outline-none focus:ring-2 focus:ring-white-700">
//           Search
//         </button>
//       </div>

//       {/* Search section and logout button for screens below 840px */}
//       <div className="flex items-center space-x-4 md:hidden">
//       <FaSearch
//           className="h-5 w-5 text-white cursor-pointer"
//           onClick={toggleSearchBar}
//         />
//         <button className='text-white border rounded-lg px-4 py-1 hover:text-black hover:bg-[#00CCB8]'>
//           Logout
//         </button>

//       </div>

//       {showSearchBar && (
//         <div className="absolute top-14 left-0 w-full flex items-center bg-teal-600 p-4 md:hidden">
//           <div className="relative flex items-center flex-grow">
//             <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//               <FaMapMarkerAlt className="h-5 w-5 text-gray-500" />
//             </span>
//             <input
//               type="text"
//               placeholder="Location"
//               className="pl-10 pr-4 py-2 border rounded-l-2xl rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//             />
//           </div>
//           <div className="relative flex items-center flex-grow">
//             <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//               <FaSearch className="h-5 w-5 text-gray-500" />
//             </span>
//             <input
//               type="text"
//               placeholder="Restaurant name..."
//               className="pl-10 pr-4 py-2 border rounded-r-2xl rounded-l-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//             />
//           </div>
//           <button className="bg-teal-800 text-white px-5 py-2 rounded-lg hover:bg-[#00CCB8] focus:outline-none focus:ring-2 focus:ring-white-700">
//             Search
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default MainNavBar;



import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaTimes } from 'react-icons/fa';

const MainNavBar: React.FC = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [location, setLocation] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const clearLocation = () => {
    setLocation('');
  };

  const clearRestaurantName = () => {
    setRestaurantName('');
  };

  return (
    <nav className="fixed top-0 w-full z-10 flex items-center justify-between p-4 bg-teal-600 shadow">
      <div className="flex items-center">
        <div className="text-2xl font-bold text-white">Fork & Knife</div>
      </div>

      {/* Centering the search section for screens above 840px */}
      <div className="hidden md:flex items-center space-x-1 justify-center flex-grow">
        <div className="relative flex items-center">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaMapMarkerAlt className="h-5 w-5 text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-l-2xl rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {location && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={clearLocation}>
              <FaTimes className="h-4 w-4 text-gray-400" />
            </span>
          )}
        </div>
        <div className="relative flex items-center">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaSearch className="h-5 w-5 text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Restaurant name..."
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-r-2xl rounded-l-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {restaurantName && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={clearRestaurantName}>
              <FaTimes className="h-4 w-4 text-gray-400" />
            </span>
          )}
        </div>
        <button className="bg-teal-800 text-white px-5 py-2 rounded-lg hover:bg-[#00CCB8] focus:outline-none focus:ring-2 focus:ring-white-700">
          Search
        </button>
      </div>

      {/* Search section and logout button for screens below 840px */}
      <div className="flex items-center space-x-4 md:hidden">
        <FaSearch
          className="h-5 w-5 text-white cursor-pointer"
          onClick={toggleSearchBar}
        />
        <button className='text-white border rounded-lg px-4 py-1 hover:text-black hover:bg-[#00CCB8]'>
          Logout
        </button>
      </div>

      {showSearchBar && (
        <div className="absolute top-14 left-0 w-full flex items-center bg-teal-600 p-4 md:hidden">
          <div className="relative flex items-center flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaMapMarkerAlt className="h-5 w-5 text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-l-2xl rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {location && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={clearLocation}>
                <FaTimes className="h-5 w-5 text-gray-500" />
              </span>
            )}
          </div>
          <div className="relative flex items-center flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaSearch className="h-5 w-5 text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Restaurant name..."
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-r-2xl rounded-l-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {restaurantName && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={clearRestaurantName}>
                <FaTimes className="h-5 w-5 text-gray-500" />
              </span>
            )}
          </div>
          <button className="bg-teal-800 text-white px-5 py-2 rounded-lg hover:bg-[#00CCB8] focus:outline-none focus:ring-2 focus:ring-white-700">
            Search
          </button>
        </div>
      )}

      {/* Logout button for screens above 840px */}
      <div className="hidden md:flex items-center">
        <button className='text-white border rounded-lg px-4 py-1 hover:text-black hover:bg-[#00CCB8]'>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default MainNavBar;
