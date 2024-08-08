/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../../redux/app/store";
// import { RootState } from "../../redux/app/store";
// import { fetchRestaurants } from "../../redux/reducers/userSlices/RestaurantSearchSlice";
// import { Shimmer } from "react-shimmer";
// import { FaLocationDot } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// const RestaurantList: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const restaurants = useSelector((state: RootState) => state.restaurantSearch.filteredRestaurants);
//   const error = useSelector((state: RootState) => state.restaurantSearch.error);

//   useEffect(() => {
//     dispatch(fetchRestaurants());
//   }, [dispatch]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const truncateText = (text: string, maxLength: number) => {
//     return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
//   };

//   return (
//     <div id="Restaurants" className="px-4 md:px-8 lg:px-16 xl:px-32 py-4 mb-10 mt-5">
//       <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Restaurants</h2>
//       {restaurants.length === 0 ? (
//         <div className="text-center text-red-600">No restaurants found.</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {restaurants.map((restaurant) => (
//             <Link to={`/restaurant-view/${restaurant._id}`} key={restaurant._id}>
//               <div className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
//                 <div className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
//                   <div className="w-full h-40 overflow-hidden rounded-xl">
//                     {!restaurant.featuredImage ? (
//                       <Shimmer width={200} height={100} className="w-full h-full" />
//                     ) : (
//                       <img
//                         className="w-full h-full object-cover rounded-xl"
//                         src={restaurant.featuredImage}
//                         alt="Restaurant"
//                       />
//                     )}
//                   </div>
//                   <div className="space-y-4">
//                     <h3 className="font-semibold text-center text-xl pt-6">{restaurant.restaurantName}</h3>
//                     <div className="flex flex-row justify-center">
//                       <FaLocationDot />
//                       <p>{truncateText(restaurant.place, 16)}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RestaurantList;







import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/app/store";
import { RootState } from "../../redux/app/store";
import { fetchRestaurants } from "../../redux/reducers/userSlices/RestaurantSearchSlice";
import { Shimmer } from "react-shimmer";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"; // Import arrow icons

const RestaurantList: React.FC = () => {
  const dispatch = useAppDispatch();
  const restaurants = useSelector((state: RootState) => state.restaurantSearch.filteredRestaurants);
  const error = useSelector((state: RootState) => state.restaurantSearch.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(4); // Number of restaurants per page

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Calculate the displayed restaurants based on the current page
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle next and previous page changes
  const handleNextPage = () => {
    if (currentPage < Math.ceil(restaurants.length / restaurantsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div id="Restaurants" className="px-4 md:px-8 lg:px-16 xl:px-32 py-4 mb-10 mt-5">
      <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Restaurants</h2>
      {restaurants.length === 0 ? (
        <div className="text-center text-red-600">No restaurants found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentRestaurants.map((restaurant) => (
              <Link to={`/restaurant-view/${restaurant._id}`} key={restaurant._id}>
                <div className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
                  <div className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
                    <div className="w-full h-40 overflow-hidden rounded-xl">
                      {!restaurant.featuredImage ? (
                        <Shimmer width={200} height={100} className="w-full h-full" />
                      ) : (
                        <img
                          className="w-full h-full object-cover rounded-xl"
                          src={restaurant.featuredImage}
                          alt="Restaurant"
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-center text-xl pt-6">{restaurant.restaurantName}</h3>
                      <div className="flex flex-row justify-center">
                        <FaLocationDot />
                        <p>{truncateText(restaurant.place, 16)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-600" : "bg-teal-600 text-white"}`}
            >
              <FaAngleLeft />
            </button>
            <span className="text-xl">{currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(restaurants.length / restaurantsPerPage)}
              className={`p-2 rounded ${currentPage === Math.ceil(restaurants.length / restaurantsPerPage) ? "bg-gray-300 text-gray-600" : "bg-teal-600 text-white"}`}
            >
              <FaAngleRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantList;
