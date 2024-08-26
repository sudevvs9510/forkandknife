/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import authAxios from '../../redux/api/authApi';
import { HiOutlineSearch } from "react-icons/hi";
import { blockRestaurant } from '../../api/AdminApis';
import toast from "react-hot-toast"
import BlockConfirmationModal from '../../layouts/BlockConfirmation';



interface Restaurant {
  _id: string,
  restaurantName: string,
  email: string,
  location: string,
  phone: string,
  isBlocked: boolean

}

const RestaurantManagement: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(5); // Number of restaurants per page

  const [showModal, setShowModal] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);


  console.log("url logs1", import.meta.env.VITE_APP_BASE_URL)
  console.log("url logs2", import.meta.env.VITE_APP_JWT_SECRET_KEY)
  console.log("url logs3", import.meta.env.VITE_APP_MAP_BOX_ACCESS_TOKEN)
  console.log("url logs4", import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY)

  
  useEffect(() => {
    authAxios.get("/admin/restaurant-lists")
      .then((res) => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
      }).catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchItem = e.target.value;
    setSearchItem(searchItem);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredItems = restaurants.filter((data: any) => {
    const { restaurantName, email, contact } = data;
    const searchTerm = searchItem.toLowerCase();
    return (
      restaurantName.toLowerCase().includes(searchTerm) ||
      email.toLowerCase().includes(searchTerm) ||
      contact.includes(searchTerm)
    );
  });

  const handleBlockRestaurant = async () => {
    if (!currentRestaurant) return;

    try {
      const isBlocked = !currentRestaurant.isBlocked;
      await blockRestaurant(currentRestaurant._id, isBlocked);
      setRestaurants(restaurants.map(restaurants => restaurants._id === currentRestaurant._id ? { ...restaurants, isBlocked } : restaurants));
      setShowModal(false);
      setCurrentRestaurant(null);
      toast.success(`Restaurant ${currentRestaurant.restaurantName} has been ${isBlocked ? 'blocked' : 'unblocked'}.`);
    } catch (error) {
      console.error(`Error ${currentRestaurant.isBlocked ? 'unblocking' : 'blocking'} user:`, error);
      toast.error(`Failed to ${currentRestaurant.isBlocked ? 'unblock' : 'block'} user.`);
    }
  };

  const openModal = (restaurant: Restaurant) => {
    setCurrentRestaurant(restaurant);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentRestaurant(null);
  };

  // Pagination Logic
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredItems.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full  md:flex-row justify-between items-center mb-4 p-4 ">
      <div className="flex-1">
        <div className="flex w-full justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Restaurant Management</h1>
          <div className="relative md:w-auto">
            <HiOutlineSearch fontSize={24} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
            <input
              type="text"
              placeholder="Search restaurants..."
              className="flex justify-end me-auto text-sm focus:outline-none border active:outline-none border-gray-300 p-3 pl-10   rounded-lg"
              value={searchItem}
              onChange={handleSearchInput}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-md bg-gray-100 shadow-md rounded mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-5">NAME</th>
                <th className="text-left p-3 px-5">EMAIL</th>
                <th className="text-left p-3 px-5">LOCATION</th>
                <th className="text-left p-3 px-5">CONTACT</th>
                <th className="text-left p-3 px-5 flex justify-end">STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentRestaurants.length > 0 ? (
                currentRestaurants.map((restaurant: any) => (
                  <tr className="border-b bg-white" key={restaurant._id}>
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
                    <td className="p-3 px-6">{restaurant.place}</td>
                    <td className="p-3 px-6">{restaurant.contact}</td>
                    <td className="p-3 px-5 flex justify-center">
                      <button
                        className={`px-4 py-2 rounded transition ${restaurant.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                        onClick={() => openModal(restaurant)}
                      >
                        {restaurant.isBlocked ? 'Unblock' : 'Block'}
                      </button>                    </td>
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

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredItems.length / restaurantsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700'
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <BlockConfirmationModal
        show={showModal}
        onClose={closeModal}
        onConfirm={handleBlockRestaurant}
        title={currentRestaurant?.isBlocked ? 'Unblock User' : 'Block User'}
        message={`Are you sure you want to ${currentRestaurant?.isBlocked ? 'unblock' : 'block'} ${currentRestaurant?.restaurantName}?`}
      />
    </div >


  );
};

export default RestaurantManagement;

