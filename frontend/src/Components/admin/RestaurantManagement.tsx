import React, { useEffect, useState } from 'react';
import authAxios from '../../redux/api/authApi';
import { HiOutlineSearch } from "react-icons/hi";
import Sidebar from './Sidebar';

const RestaurantManagement: React.FC = () => {
   const [restaurants, setRestaurant] = useState([]);
   const [searchItem, setSearchItem] = useState('');

   useEffect(() => {
      authAxios.get("/admin/restaurant-lists")
         .then((res) => {
            console.log(res.data);
            
            setRestaurant(res.data.restaurants)

         }).catch((err) => {
            console.error(err);
         });
   }, []);

   const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchItem = e.target.value;
      setSearchItem(searchItem);
   };

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const filteredItems = restaurants.filter((data: any) => {
      const { restaurantName, email, contact } = data;
      const searchTerm = searchItem.toLowerCase();
      return (
         restaurantName.toLowerCase().includes(searchTerm) ||
         email.toLowerCase().includes(searchTerm) ||
         contact.includes(searchTerm)
      );
   });

   return (
      <div className="flex flex-col md:flex-row text-gray-900 bg-gray-200 min-h-screen">
         <Sidebar />
         <div className="flex-1 p-4">
            <div className="flex w-full justify-between items-center">
               <h1 className="text-3xl font-bold">Restaurant Management</h1>
               <div className="relative flex-shrink-0  w-full md:w-auto mt-4 md:mt-0">
                  <HiOutlineSearch fontSize={24} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                  <input
                     type="text"
                     placeholder="Search restaurants..."
                     className="text-sm focus:outline-none border active:outline-none border-gray-300 h-14 w-full md:w-96 pl-10 pr-4 rounded-lg"
                     value={searchItem}
                     onChange={handleSearchInput}
                  />
               </div>
            </div>
            <div className="mt-4 overflow-x-auto">
               <table className="w-full text-md bg-white shadow-md rounded mb-4">
                  <thead>
                     <tr className="border-b">
                        <th className="text-left p-3 px-5">Name</th>
                        <th className="text-left p-3 px-5">Email</th>
                        <th className="text-left p-3 px-5">Contact</th>
                        <th className="text-left p-3 px-5 flex justify-end">Status</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredItems.length > 0 ? (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        filteredItems.map((restaurant: any) => (
                           <tr className="border-b bg-gray-100" key={restaurant._id}>
                              <td className="p-3 px-5">
                                 <input
                                    type="text"
                                    className="bg-transparent border-none focus:outline-none font-medium"
                                    value={restaurant.restaurantName}
                                    readOnly
                                 />
                              </td>
                              <td className="p-3 px-5">
                                 <input
                                    type="text"
                                    className="bg-transparent border-none focus:outline-none font-medium"
                                    value={restaurant.email}
                                    readOnly
                                 />
                              </td>
                              <td className="p-3 px-6">{restaurant.contact}</td>
                              <td className="p-3 px-5 flex justify-end">
                                 <button className="p-1 rounded-2xl px-5 bg-green-500 text-white">Block</button>
                              </td>
                           </tr>
                        ))
                     ) : (
                        <tr className="border-b bg-gray-100">
                           <td colSpan={5} className="p-3 text-center text-black font-bold text-2xl">
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

export default RestaurantManagement;
