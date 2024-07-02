/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { FaSearch } from 'react-icons/fa';
// import { FaLocationPin } from "react-icons/fa6";

// const Header: React.FC = () => {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-[url('./assets/images/interior-restaurant-design.jpg')] bg-cover bg-no-repeat">
//       <div className="bg-teal-900 bg-opacity-80 w-full lg:w-2/3 p-10 rounded-lg flex flex-col items-center space-y-5">
//           <h1 className="text-white font-semibold text-4xl lg:text-5xl text-center">
//             Discover and book the best restaurant
//           </h1>
//           <form className="w-full flex flex-col lg:flex-row bg-teal-800 py-2 px-2 rounded-lg items-center space-y-3 lg:space-y-0 lg:space-x-3">
//             <div className="flex items-center bg-white rounded-lg shadow-md w-full lg:w-2/6 p-3">
//               <FaLocationPin className="text-gray-400 mx-2" />
//               <input
//                 type="text"
//                 placeholder="Location"
//                 className="bg-transparent focus:outline-none flex-1"
//               />
//             </div>
//             <div className="flex items-center bg-white rounded-lg shadow-md w-full lg:w-2/3 p-3">
//               <FaSearch className="text-gray-400 mx-2" />
//               <input
//                 type="text"
//                 placeholder="Restaurant"
//                 className="bg-transparent focus:outline-none flex-1"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-teal-700 hover:bg-teal-400 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition duration-200"
//             >Search
//             </button>
//           </form>
//       </div>
//     </div>
//   );
// };

// export default Header;


// import React from "react";
// import { FaSearch } from 'react-icons/fa';
// import { FaLocationPin } from "react-icons/fa6";
// import { useAppDispatch } from '../../redux/app/store';
// import { updateSearchQuery, fetchLocationData, filterRestaurantsByLocation } from '../../redux/reducers/userSlices/RestaurantSearchSlice';

// const Header: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     dispatch(filterRestaurantsByLocation());
//   };

//   const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//    console.log(event.target.value) 
//     dispatch(fetchLocationData(event.target.value));
//   };

//   const handleRestaurantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     console.log(event.target.value)
//     dispatch(updateSearchQuery(event.target.value));

//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-[url('./assets/images/interior-restaurant-design.jpg')] bg-cover bg-no-repeat">
//       <div className="bg-teal-900 bg-opacity-80 w-full lg:w-2/3 p-10 rounded-lg flex flex-col items-center space-y-5">
//         <h1 className="text-white font-semibold text-4xl lg:text-5xl text-center">
//           Discover and book the best restaurant
//         </h1>
//         <form className="w-full flex flex-col lg:flex-row bg-teal-800 py-2 px-2 rounded-lg items-center space-y-3 lg:space-y-0 lg:space-x-3" onSubmit={handleSearch}>
//           <div className="flex items-center bg-white rounded-lg shadow-md w-full lg:w-2/6 p-3">
//             <FaLocationPin className="text-gray-400 mx-2" />
//             <input
//               type="text"
//               placeholder="Location"
//               className="bg-transparent focus:outline-none flex-1"
//               onChange={handleLocationChange}
//             />
//           </div>
//           <div className="flex items-center bg-white rounded-lg shadow-md w-full lg:w-2/3 p-3">
//             <FaSearch className="text-gray-400 mx-2" />
//             <input
//               type="text"
//               placeholder="Restaurant"
//               className="bg-transparent focus:outline-none flex-1"
//               onChange={handleRestaurantChange}
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-teal-700 hover:bg-teal-400 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition duration-200"
//           >Search
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Header;




// import React, { useState } from "react";
// import { FaSearch } from 'react-icons/fa';
// import { FaLocationPin } from "react-icons/fa6";
// import { useAppDispatch } from '../../redux/app/store';
// import { updateSearchQuery, fetchLocationData, filterRestaurantsByLocation } from '../../redux/reducers/userSlices/RestaurantSearchSlice';
// import getLocations from "../../util/getLocationApi"; 

// const Header: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const [searchItem, setSearchItem] = useState<string>("");
//   const [suggestions, setSuggestions] = useState<any[]>([]); // State for location suggestions

//   // Handle location search input change
//   const handleLocationChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const searchedTerm = event.target.value;
//     setSearchItem(searchedTerm);

//     try {
//       const data = await getLocations(searchedTerm); // Call your location suggestion service
//       setSuggestions(data); // Update suggestions based on API response
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Handle selecting a suggestion
//   const handleInput = (suggestion: any) => {
//     setSearchItem(suggestion.place_name);
//     dispatch(fetchLocationData(suggestion.place_name)); // Update location data based on suggestion
//     dispatch(filterRestaurantsByLocation(suggestion.center[1])); // Filter restaurants based on location
//     setSuggestions([]); // Clear suggestions after selection
//   };

//   // Handle restaurant search input change
//   const handleRestaurantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(updateSearchQuery(event.target.value)); // Update restaurant search query
//   };

//   // Handle form submission
//   const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     dispatch(filterRestaurantsByLocation(suggestion.center[1])); // Perform restaurant filtering based on current location
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-[url('./assets/images/interior-restaurant-design.jpg')] bg-cover bg-no-repeat">
//       <div className="bg-teal-900 bg-opacity-80 w-full lg:w-2/3 p-10 rounded-lg flex flex-col items-center space-y-5">
//         <h1 className="text-white font-semibold text-4xl lg:text-5xl text-center">
//           Discover and book the best restaurant
//         </h1>
//         <form className="w-full flex flex-col lg:flex-row bg-teal-800 py-2 px-2 rounded-lg items-center space-y-3 lg:space-y-0 lg:space-x-3" onSubmit={handleSearch}>
//           <div className="relative flex items-center bg-white rounded-lg shadow-md w-full lg:w-2/6 p-3">
//             <FaLocationPin className="text-gray-400 mx-2" />
//             <input
//               type="text"
//               placeholder="Location"
//               className="bg-transparent focus:outline-none flex-1"
//               onChange={handleLocationChange}
//               value={searchItem}
//             />
//             {suggestions.length > 0 && (
//               <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-1 w-full">
//                 {suggestions.map((suggestion, index) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-200 cursor-pointer"
//                     onClick={() => handleInput(suggestion)}
//                   >
//                     {suggestion.place_name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <div className="flex items-center bg-white rounded-lg shadow-md w-full lg:w-2/3 p-3">
//             <FaSearch className="text-gray-400 mx-2" />
//             <input
//               type="text"
//               placeholder="Restaurant"
//               className="bg-transparent focus:outline-none flex-1"
//               onChange={handleRestaurantChange}
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-teal-700 hover:bg-teal-400 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition duration-200"
//           >
//             Search
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { FaLocationPin } from "react-icons/fa6";
import { useAppDispatch } from '../../redux/app/store';
import { updateSearchQuery, fetchLocationData, filterRestaurantsByLocation, filterRestaurants } from '../../redux/reducers/userSlices/RestaurantSearchSlice';
import getLocations from "../../util/getLocationApi"; 

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchItem, setSearchItem] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]); 

  // Handle location search input change
  const handleLocationChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchedTerm = event.target.value;
    setSearchItem(searchedTerm);

    try {
      const data = await getLocations(searchedTerm); 
      setSuggestions(data); 
    } catch (error) {
      console.log(error);
    }
  };

  // Handle selecting a suggestion
  const handleInput = (suggestion: any) => {
    setSearchItem(suggestion.place_name);
    dispatch(fetchLocationData(suggestion.place_name)); 
    dispatch(filterRestaurantsByLocation(suggestion.center[1])); 
    setSuggestions([]); 
  };

  // Handle restaurant search input change
  const handleRestaurantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    dispatch(updateSearchQuery(searchQuery)); 
    dispatch(filterRestaurants());
  };

  // Handle form submission
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(filterRestaurantsByLocation(suggestion.center[1])); 
  };

  return (
    <div className="h-[45vh] lg:h-[45vh] flex flex-col justify-center items-center bg-[url('./assets/images/interior-restaurant-design.jpg')] bg-cover bg-no-repeat mt-10">
      <div className="bg-teal-900 bg-opacity-60 w-full lg:w-2/3 p-10 rounded-lg flex flex-col items-center space-y-5 mt-10">
        <h1 className="text-white font-semibold text-4xl lg:text-5xl text-center">
          Discover and book the best restaurant
        </h1>
        <form className="w-full flex flex-col lg:flex-row bg-teal-800 py-2 px-2 rounded-lg items-center space-y-3 lg:space-y-0 lg:space-x-3" onSubmit={handleSearch}>
          <div className="relative flex items-center bg-white rounded-lg shadow-md w-full lg:w-2/6 p-3">
            <FaLocationPin className="text-gray-400 mx-2" />
            <input
              type="text"
              placeholder="Location"
              className="bg-transparent focus:outline-none flex-1"
              onChange={handleLocationChange}
              value={searchItem}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 bg-white border border-gray-200 rounded-lg mt-1 w-full top-full">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleInput(suggestion)}
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-center bg-white rounded-lg shadow-md w-full lg:w-2/3 p-3">
            <FaSearch className="text-gray-400 mx-2" />
            <input
              type="text"
              placeholder="Restaurant"
              className="bg-transparent focus:outline-none flex-1"
              onChange={handleRestaurantChange}
            />
          </div>
          <button
            type="submit"
            className="bg-teal-700 hover:bg-teal-400 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition duration-200"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
