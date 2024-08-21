// import React, { useEffect, useState } from 'react';
// import { useAppDispatch } from '../../redux/app/store';
// import { logout } from "../../redux/reducers/restaurantSlices/RestaurantAuthSlice"
// import { Link, useNavigate } from 'react-router-dom';


// const NavBar: React.FC = () => {
//   const [isAdminLoggedIn, setisAdminLoggedInLoggedIn] = useState(false);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate()

//   useEffect(() => {
//     const token = localStorage.getItem("AdminAuthToken");
//     setisAdminLoggedInLoggedIn(!!token);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await dispatch(logout());
//       localStorage.removeItem("AdminAuthToken");
//       setisAdminLoggedInLoggedIn(false);
//       navigate("/admin/login")
//     } catch (error) {
//       console.log("Error during logout:", error);
//     }
//   };

//   return (
//     <header className="bg-teal-600 text-white flex flex-col md:flex-row justify-between items-center p-4 space-y-2 md:space-y-0">
//       <h1 className="text-2xl font-bold">Fork & Knife</h1>
//       <div>
//         {isAdminLoggedIn ? (
//           <button
//             onClick={handleLogout}
//             className='border rounded px-4 py-1 hover:bg-[#00CCB8] border-white'
//           >
//             Logout
//           </button>
//         ) : (
//           <Link to="/admin/login">
//             <button className='border rounded px-4 py-1 hover:bg-[#00CCB8] border-white'>
//               Admin Login
//             </button>
//           </Link>
//         )}
//       </div>
//     </header>
//   );
// };

// export default NavBar;



import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/app/store';
import { logout } from "../../redux/reducers/restaurantSlices/RestaurantAuthSlice";
import { Link, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [isAdminLoggedIn, setisAdminLoggedIn] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("AdminAuthToken");
    setisAdminLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      localStorage.removeItem("AdminAuthToken");
      setisAdminLoggedIn(false);
      navigate("/admin/login");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <header className="bg-teal-600 text-white flex justify-between items-center p-4 w-full">
      <h1 className="text-2xl font-bold">Fork & Knife</h1>
      <div>
        {isAdminLoggedIn ? (
          <button
            onClick={handleLogout}
            className="border rounded px-4 py-1 hover:bg-[#00CCB8] border-white"
          >
            Logout
          </button>
        ) : (
          <Link to="/admin/login">
            <button className="border rounded px-4 py-1 hover:bg-[#00CCB8] border-white">
              Admin Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavBar;
