import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authAxios from '../../redux/api/authApi';

const RestoRegisterManagement: React.FC = () => {
   const [restaurant, setRestaurant] = useState([]);

   console.log("url logs1",import.meta.env.VITE_APP_BASE_URL)
   console.log("url logs2",import.meta.env.VITE_APP_JWT_SECRET_KEY)
   console.log("url logs3",import.meta.env.VITE_APP_MAP_BOX_ACCESS_TOKEN)
   console.log("url logs4",import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY)

   useEffect(() => {
      const fetchData = async () => {
         await authAxios.get('/admin/restaurants-approval-lists')
            .then((response) => {
               setRestaurant(response.data.restaurants);
            }).catch((error) => {
               console.log(error);
            });
      };
      fetchData();
   }, []);

   return (
      <div className="w-full md:flex-row text-gray-900 bg-gray-100 min-h-screen">
         <div className="flex-1 p-4">
            <div className="flex w-full justify-between items-center">
               <h1 className="text-3xl font-bold">New Restaurant Registrations </h1>
            </div>
            <div className="mt-4 overflow-x-auto">
               <table className="w-full text-md bg-white shadow-md rounded mb-4">
                  <thead>
                     <tr className="border-b">
                        <th className="text-left p-3 px-5">Name</th>
                        <th className="text-left p-3 px-5">Email</th>
                        <th className="text-left p-3 px-5">Contact</th>
                        <th className="text-left p-3 px-5">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {restaurant && restaurant.length > 0 ? (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        restaurant.map((restaurant: any) => {
                           return (
                              <tr className="border-b bg-gray-100 text-green-600 font-semibold" key={restaurant._id}>
                                 <td className="p-3 px-5">
                                    <input
                                       type="text"
                                       value={restaurant.restaurantName}
                                       className="bg-transparent border-none focus:outline-none w-full"
                                       readOnly
                                    />
                                 </td>
                                 <td className="p-3 px-5">
                                    <input
                                       type="text"
                                       className="bg-transparent border-none focus:outline-none w-full"
                                       value={restaurant.email}
                                       readOnly
                                    />
                                 </td>
                                 <td className="p-3 px-5">
                                    <input
                                       type="text"
                                       className="bg-transparent border-none focus:outline-none w-full"
                                       value={restaurant.contact}
                                       readOnly
                                    />
                                 </td>
                                 <td className="p-3 px-5 flex justify-end">
                                    <Link to={`/admin/restaurant-approval/${restaurant._id}`}>
                                       <button className="p-2 bg-green-500 text-white rounded-xl px-4 hover:bg-green-400">View</button>
                                    </Link>
                                 </td>
                              </tr>
                           );
                        })) : (
                        <tr className="border-b bg-gray-100">
                           <td colSpan={4} className="p-3 text-center text-black font-bold text-2xl">
                              Restaurants not found
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default RestoRegisterManagement;
