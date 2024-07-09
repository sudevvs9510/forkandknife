import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/app/store';
import { logout } from "../../redux/reducers/restaurantSlices/RestaurantAuthSlice"
import { Link } from 'react-router-dom';


const NavBar: React.FC = () => {

  const [isRestaurantLoggedIn, setisRestaurantLoggedIn] = useState(false);
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem("RestaurantAuthToken");
    setisRestaurantLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout())
      console.log("handlelogout")
      // await logoutRestaurant();
      localStorage.removeItem("RestaurantAuthToken")
      setisRestaurantLoggedIn(false);

    } catch (error) {
      console.log("Error during logout:", error)
    }
  }

  return (
    <header className="bg-teal-600 text-white flex flex-col md:flex-row justify-between items-center p-4 space-y-2 md:space-y-0">
      <h1 className="text-2xl font-bold">Fork & Knife</h1>
      <div className='hidden lg:block'>
        {isRestaurantLoggedIn ?
          <button
            onClick={handleLogout}
            className='border rounded px-4 py-1 hover:bg-[#00CCB8] border-white'>
            Logout
          </button>
          :
          <Link to="/restaurant/login">
            <button className='border rounded px-4 py-1 hover:bg-[#00CCB8] hover:text-black border-white'>
              Login
            </button>
          </Link>
        }
      </div>
    </header>
  );
};

export default NavBar;
