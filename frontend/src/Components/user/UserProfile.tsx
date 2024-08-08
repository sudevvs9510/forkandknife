/* eslint-disable @typescript-eslint/no-unused-vars */

// import React, { useEffect, useState } from 'react';
// import { FaUser, FaHistory } from 'react-icons/fa';
// import { Link, useParams } from 'react-router-dom';
// import { fetchUserProfile, updateUserDetails } from "../../api/api";
// import toast from 'react-hot-toast';
// import ProfileDetails from './UserProfileDetails';
// import BookingHistory from './BookingHistory';
// import { RiLockPasswordLine } from 'react-icons/ri';
// import { CiWallet } from 'react-icons/ci';
// import Wallet from './Wallet';

// const ProfilePage: React.FC = () => {
//     const [user, setUser] = useState({
//         username: '',
//         phone: '',
//         email: '',
//     });

//     const [nav, setNavigate] = useState("profile");

//     const [originalUser, setOriginalUser] = useState({
//         username: '',
//         phone: '',
//         email: '',
//     });

//     const { userId } = useParams<{ userId: string }>();
//     console.log("user:", userId)

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userData = await fetchUserProfile(userId as string);
//                 if (userData) {
//                     setUser({
//                         username: userData.username || '',
//                         phone: userData.phone || '',
//                         email: userData.email || '',
//                     });
//                     setOriginalUser({
//                         username: userData.username || '',
//                         phone: userData.phone || '',
//                         email: userData.email || '',
//                     });
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user data:", error);
//             }
//         };

//         fetchUserData();
//     }, [userId]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setUser(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const updatedData = {
//                 username: user.username,
//                 phone: user.phone,
//             };
//             const response = await updateUserDetails(userId as string, updatedData);
//             setUser({
//                 ...user,
//                 email: response.updatedUser.email,
//             });
//             toast.success('Profile updated successfully');
//         } catch (error) {
//             console.error("Failed to update user data:", error);
//             toast.error('Failed to update profile');
//         }
//     };

//     const isFormDirty = () => {
//         return (
//             user.username !== originalUser.username ||
//             user.phone !== originalUser.phone
//         );
//     };

//     const handleNavigate = (query: string) => {
//         setNavigate(query);
//     }

//     return (
//         <div className="bg-white min-h-screen">
//             <div className="max-w-7xl mx-auto py-8 px-20">
//                 <div className="bg-white rounded-lg p-8">
//                     <div className="flex items-center">
//                         <div className="relative">
//                             <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-white text-4xl">
//                                 {user.username.charAt(0).toUpperCase()}
//                             </div>
//                         </div>
//                         <div className="ml-4">
//                             <h1 className="text-3xl font-bold">Hi, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>
//                         </div>
//                     </div>
//                     <div className="mt-6 border-t pt-6">
//                         <div className="flex space-x-4">
//                             {/* Left section */}
//                             <nav className="w-1/4">
//                                 <ul className="space-y-4">
//                                     <li>
//                                         <button
//                                             className={`flex items-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${nav === 'profile' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
//                                             onClick={() => handleNavigate("profile")}
//                                         >
//                                             <FaUser className="mr-2" /> Profile
//                                         </button>
//                                     </li>
//                                     <li>
//                                         <button
//                                             className={`flex items-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${nav === 'booking' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
//                                             onClick={() => handleNavigate("booking")}
//                                         >
//                                             <FaHistory className="mr-2" /> Booking History
//                                         </button>
//                                     </li>
//                                     <li>
//                                         <button
//                                             className={`flex items-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${nav === 'wallet' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
//                                             onClick={() => handleNavigate("wallet")}
//                                         >
//                                             <CiWallet className="mr-2" /> Wallet
//                                         </button>
//                                     </li>
//                                     <li>
//                                         <Link to='/reset-password'>
//                                             <button className="flex items-center w-full p-4 text-left bg-gray-200 rounded-lg hover:bg-gray-300">
//                                                 <RiLockPasswordLine className="mr-2" /> Change Password
//                                             </button>
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </nav>

//                             {/* Right section */}
//                             <div className="w-3/4">
//                                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                                     {nav === "profile" && (
//                                         <ProfileDetails user={user} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isFormDirty={isFormDirty} />
//                                     )}
//                                     {nav === "booking" && (
//                                         <BookingHistory userId={userId as string} />
//                                     )}
//                                     {nav === "wallet" && (
//                                         <Wallet userId={userId as string} />
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;











import React, { useEffect, useState } from 'react';
import { FaUser, FaHistory } from 'react-icons/fa';
import { Link, useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { fetchUserProfile, updateUserDetails } from "../../api/api";
import toast from 'react-hot-toast';
import ProfileDetails from './UserProfileDetails';
import BookingHistory from './BookingHistory';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CiWallet } from 'react-icons/ci';
import Wallet from './Wallet';

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState({
        username: '',
        phone: '',
        email: '',
    });

    const [originalUser, setOriginalUser] = useState({
        username: '',
        phone: '',
        email: '',
    });

    const { userId } = useParams<{ userId: string }>();
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await fetchUserProfile(userId as string);
                if (userData) {
                    setUser({
                        username: userData.username || '',
                        phone: userData.phone || '',
                        email: userData.email || '',
                    });
                    setOriginalUser({
                        username: userData.username || '',
                        phone: userData.phone || '',
                        email: userData.email || '',
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedData = {
                username: user.username,
                phone: user.phone,
            };
            const response = await updateUserDetails(userId as string, updatedData);
            setUser({
                ...user,
                email: response.updatedUser.email,
            });
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error("Failed to update user data:", error);
            toast.error('Failed to update profile');
        }
    };

    const isFormDirty = () => {
        return (
            user.username !== originalUser.username ||
            user.phone !== originalUser.phone
        );
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto py-8 px-20">
                <div className="bg-white rounded-lg p-8">
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-white text-4xl">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className="ml-4">
                            <h1 className="text-3xl font-bold">Hi, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>
                        </div>
                    </div>
                    <div className="mt-6 border-t pt-6">
                        <div className="flex space-x-4">
                            {/* Left section */}
                            <nav className="w-1/4">
                                <ul className="space-y-4">
                                    <li>
                                        <Link to="about-user">
                                            <button className={`flex items-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${window.location.pathname.includes('about-user') ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
                                                <FaUser className="mr-2" /> Profile
                                            </button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="booking">
                                            <button className={`flex items-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${window.location.pathname.includes('booking') ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
                                                <FaHistory className="mr-2" /> Booking History
                                            </button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="wallet">
                                            <button className={`flex items-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${window.location.pathname.includes('wallet') ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
                                                <CiWallet className="mr-2" /> Wallet
                                            </button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/reset-password'>
                                            <button className="flex items-center w-full p-4 text-left bg-gray-200 rounded-lg hover:bg-gray-300">
                                                <RiLockPasswordLine className="mr-2" /> Change Password
                                            </button>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            {/* Right section */}
                            <div className="w-3/4">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <Routes>
                                        <Route path="about-user" element={<ProfileDetails user={user} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isFormDirty={isFormDirty} />} />
                                        <Route path="booking" element={<BookingHistory userId={userId as string} />} />
                                        <Route path="wallet" element={<Wallet userId={userId as string} />} />
                                        {/* <Route path="/" element={<Navigate to="profile" />} /> */}
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
