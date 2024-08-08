/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import React, { useState } from "react";
// import { FaSearch } from 'react-icons/fa';
// import { FaLocationPin } from "react-icons/fa6";
// import { useAppDispatch } from '../../redux/app/store';
// import { updateSearchQuery, fetchLocationData, filterRestaurantsByLocation, filterRestaurants } from '../../redux/reducers/userSlices/RestaurantSearchSlice';
// import getLocations from "../../util/getLocationApi"; 

// const Header: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const [searchItem, setSearchItem] = useState<string>("");
//   const [suggestions, setSuggestions] = useState<any[]>([]); 

//   // Handle location search input change
//   const handleLocationChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const searchedTerm = event.target.value;
//     setSearchItem(searchedTerm);

//     try {
//       const data = await getLocations(searchedTerm); 
//       setSuggestions(data); 
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Handle selecting a suggestion
//   const handleInput = (suggestion: any) => {
//     setSearchItem(suggestion.place_name);
//     dispatch(fetchLocationData(suggestion.place_name)); 
//     dispatch(filterRestaurantsByLocation(suggestion.center[1])); 
//     setSuggestions([]); 
//   };

//   // Handle restaurant search input change
//   const handleRestaurantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const searchQuery = event.target.value;
//     dispatch(updateSearchQuery(searchQuery)); 
//     dispatch(filterRestaurants());
//   };

//   // Handle form submission
//   // const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
//   //   event.preventDefault();
//   //   dispatch(filterRestaurantsByLocation(suggestion.center[1])); 
//   // };

//   return (
//     <div className="h-[45vh] lg:h-[45vh] flex flex-col justify-center items-center bg-[url('./assets/images/interior-restaurant-design.jpg')] bg-cover bg-no-repeat mt-10">
//       <div className="bg-teal-900 bg-opacity-60 w-full lg:w-2/3 p-10 rounded-lg flex flex-col items-center space-y-5 mt-10">
//         <h1 className="text-white font-semibold text-4xl lg:text-5xl text-center">
//           Discover and book the best restaurant
//         </h1>
//         {/* <form className="w-full flex flex-col lg:flex-row bg-teal-800 py-2 px-2 rounded-lg items-center space-y-3 lg:space-y-0 lg:space-x-3" onSubmit={handleSearch}> */}
//         <form className="w-full flex flex-col lg:flex-row bg-teal-800 py-2 px-2 rounded-lg items-center space-y-3 lg:space-y-0 lg:space-x-3">
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
//               <ul className="absolute z-20 bg-white border border-gray-200 rounded-lg mt-1 w-full top-full">
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
//             Filter
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
import { updateSearchQuery, fetchLocationData, filterRestaurantsByLocation, filterRestaurants, setFilterOptions, setSortOption } from '../../redux/reducers/userSlices/RestaurantSearchSlice';
import getLocations from "../../util/getLocationApi";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchItem, setSearchItem] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

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

  const handleInput = (suggestion: any) => {
    setSearchItem(suggestion.place_name);
    dispatch(fetchLocationData(suggestion.place_name)); 
    dispatch(filterRestaurantsByLocation(suggestion.center[1])); 
    setSuggestions([]); 
  };

  const handleRestaurantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    dispatch(updateSearchQuery(searchQuery)); 
    dispatch(filterRestaurants());
  };

  const handleFilterClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleFilterChange = (option: string) => {
    setFilter(option);
    dispatch(setFilterOptions(option));
    setDropdownVisible(false);
  };

   const handleSortChange = (sortOption: string) => {
    dispatch(setSortOption(sortOption));
    setDropdownVisible(false);
  };

  return (
    <div className="h-[45vh] lg:h-[45vh] flex flex-col justify-center items-center bg-[url('./assets/images/interior-restaurant-design.jpg')] bg-cover bg-no-repeat mt-10">
      <div className="bg-teal-900 bg-opacity-60 w-full lg:w-2/3 p-10 rounded-lg flex flex-col items-center space-y-5 mt-10">
        <h1 className="text-white font-semibold text-4xl lg:text-5xl text-center">
          Discover and book the best restaurant
        </h1>
        <form className="w-full flex flex-col lg:flex-row bg-teal-800 py-2 px-2 rounded-lg items-center space-y-3 lg:space-y-0 lg:space-x-3">
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
            type="button"
            onClick={handleFilterClick}
            className="bg-teal-700 hover:bg-teal-400 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition duration-200"
          >
            Filter
          </button>
          {dropdownVisible && (
            <div className="absolute bg-white border border-gray-200 rounded-lg mt-2 w-50 lg:w-2/2 right-[140px] top-[235px]">
              <div className="p-2">
                <h3 className="font-semibold">Filter by Rate</h3>
                <ul className="space-y-1">
                  <li
                    className={`p-1 cursor-pointer ${filter === 'lessThan200' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleFilterChange('lessThan200')}
                  >
                    Less than 200
                  </li>
                  <li
                    className={`p-1 cursor-pointer ${filter === '200To500' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleFilterChange('200To500')}
                  >
                    200 to 500
                  </li>
                  <li
                    className={`p-1 cursor-pointer ${filter === 'above500' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleFilterChange('above500')}
                  >
                    Above 500
                  </li>
                </ul>
                <h3 className="font-semibold mt-4">Sort by</h3>
                <ul className="space-y-1">
                  <li
                    className={`p-1 cursor-pointer ${filter === 'sortByName' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleSortChange('sortByName')}
                  >
                    Restaurant Name
                  </li>
                </ul>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Header;
