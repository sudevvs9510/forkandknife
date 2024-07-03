// /* eslint-disable @typescript-eslint/no-explicit-any */


// import React, { useEffect, useState } from "react";
// import Button from "../../layouts/Buttons";
// import { Shimmer } from "react-shimmer";
// import authAxios from "../../redux/api/authApi";
// import { FaLocationDot } from "react-icons/fa6";


// interface RestaurantDetails {
//   _id: string;
//   restaurantName: string;
//   featuredImage: string;
//   place: string;
// }

// const RestaurantList: React.FC = () => {
//   const [restaurantData, setRestaurantData] = useState<RestaurantDetails[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await authAxios.get('/restaurants');
//         setRestaurantData(response.data.restaurant);
//       } catch (err: any) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const truncateText = (text: string, maxLength: number) => {
//     return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
//   };

//   return (
//     <div id="Restaurants" className="px-4 md:px-8 lg:px-16 xl:px-32 py-4 mb-10">
//       <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Restaurants</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {restaurantData.map((restaurant) => (
//           <div key={restaurant._id} className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
//             <div className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
//               <div className="w-full h-64 overflow-hidden rounded-xl">
//                 {!restaurant.featuredImage ? (
//                   <Shimmer width={300} height={200} className="w-full h-full" />
//                 ) : (
//                   <img
//                     className="w-full h-full object-cover rounded-xl"
//                     src={restaurant.featuredImage}
//                     alt="Restaurant"
//                   />
//                 )}
//               </div>
//               <div className="space-y-4">
//                 <h3 className="font-semibold text-center text-xl pt-6">{restaurant.restaurantName}</h3>
//                 <div className="flex flex-row justify-center">
//                 <FaLocationDot />
//                   <p>{truncateText(restaurant.place, 20)}</p> {/* Truncate place to 20 characters */}
//                 </div>
//                 <div className="flex flex-row items-center justify-center gap-4">
//                   <Button title="Book now" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RestaurantList;


// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import {useAppDispatch} from "../../redux/app/store"
// import { RootState } from "../../redux/app/store";
// import { fetchRestaurants  } from "../../redux/reducers/userSlices/RestaurantSearchSlice";
// import { Shimmer } from "react-shimmer";
// import Button from "../../layouts/Buttons";
// import { FaLocationDot } from "react-icons/fa6";


// const RestaurantList: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const restaurants = useSelector((state : RootState)=>state.restaurantSearch.filteredRestaurants);
//   const loading = useSelector((state: RootState) => state.restaurantSearch.isLoading);
//   const error = useSelector((state: RootState) => state.restaurantSearch.error);
//   console.log(restaurants)       
  
//   useEffect(() => {
//     dispatch(fetchRestaurants());
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   const truncateText = (text: string, maxLength: number) => {
//     return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
//   };

//   return (
//     <div id="Restaurants" className="px-4 md:px-8 lg:px-16 xl:px-32 py-4 mb-10">
//       <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Restaurants</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

//         {restaurants &&  (
//         restaurants.map((restaurant) => (
//           <div key={restaurant._id} className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
//             <div className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
//               <div className="w-full h-64 overflow-hidden rounded-xl">
//                 {!restaurant.featuredImage ? (
//                   <Shimmer width={300} height={200} className="w-full h-full" />
//                 ) : (
//                   <img
//                     className="w-full h-full object-cover rounded-xl"
//                     src={restaurant.featuredImage}
//                     alt="Restaurant"
//                   />
//                 )}
//               </div>
//               <div className="space-y-4">
//                 <h3 className="font-semibold text-center text-xl pt-6">{restaurant.restaurantName}</h3>
//                 <div className="flex flex-row justify-center">
//                   <FaLocationDot />
//                   <p>{truncateText(restaurant.place, 20)}</p> {/* Truncate place to 20 characters */}
//                 </div>
//                 <div className="flex flex-row items-center justify-center gap-4">
//                   <Button title="Book now" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//       </div>
//     </div>
//   );
// };

// export default RestaurantList;


import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/app/store";
import { RootState } from "../../redux/app/store";
import { fetchRestaurants } from "../../redux/reducers/userSlices/RestaurantSearchSlice";
import { Shimmer } from "react-shimmer";
// import Button from "../../layouts/Buttons";
import { FaLocationDot } from "react-icons/fa6";


const RestaurantList: React.FC = () => {
  const dispatch = useAppDispatch();
  const restaurants = useSelector((state: RootState) => state.restaurantSearch.filteredRestaurants);
  const error = useSelector((state: RootState) => state.restaurantSearch.error);
  console.log(restaurants);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div id="Restaurants" className="px-4 md:px-8 lg:px-16 xl:px-32 py-4 mb-10 mt-5">
      <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Restaurants</h2>
      {restaurants.length === 0 ? (
        <div className="text-center text-red-600">No restaurants found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {restaurants.map((restaurant) => (
            <div key={restaurant._id} className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
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
                    <p>{truncateText(restaurant.place, 20)}</p> {/* Truncate place to 20 characters */}
                  </div>
                  {/* <div className="flex flex-row items-center justify-center gap-4">
                    <Button title="Book now" />
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;

