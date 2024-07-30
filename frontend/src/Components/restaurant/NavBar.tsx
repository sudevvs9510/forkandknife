import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/app/store';
import { logout } from "../../redux/reducers/restaurantSlices/RestaurantAuthSlice";
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {

  const [isRestaurantLoggedIn, setIsRestaurantLoggedIn] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("RestaurantAuthToken");
    setIsRestaurantLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      localStorage.removeItem("RestaurantAuthToken");
      setIsRestaurantLoggedIn(false);
    } catch (error) {
      console.log("Error during logout:", error);
    }
  }

  return (
    <header className="w-full bg-teal-600 text-white flex justify-between items-center p-4 px-8 md:px-8">
      <h1 className="text-2xl font-bold">Fork & Knife</h1>
      <div className='flex items-center'>
        {isRestaurantLoggedIn ? (
          <button
            onClick={handleLogout}
            className='border rounded px-4 py-1 hover:bg-[#00CCB8] border-white'
          >
            Logout
          </button>
        ) : (
          <Link to="/restaurant/login">
            <button className='border rounded px-4 py-1 hover:bg-[#00CCB8] hover:text-black border-white'>
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavBar;
