/* eslint-disable @typescript-eslint/no-explicit-any */

// import React, { useEffect, useState } from 'react';
// import { FaUser, FaHistory } from 'react-icons/fa';
// import { Link, useParams, Routes, Route } from 'react-router-dom';
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

//     const [originalUser, setOriginalUser] = useState({
//         username: '',
//         phone: '',
//         email: '',
//     });

//     const { userId } = useParams<{ userId: string }>();

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
//                                         <Link to="about-user">
//                                             <button className={`flex items-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${window.location.pathname.includes('about-user') ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
//                                                 <FaUser className="mr-2" /> Profile
//                                             </button>
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="booking">
//                                             <button className={`flex items-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${window.location.pathname.includes('booking') ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
//                                                 <FaHistory className="mr-2" /> Booking History
//                                             </button>
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="wallet">
//                                             <button className={`flex items-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${window.location.pathname.includes('wallet') ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
//                                                 <CiWallet className="mr-2" /> Wallet
//                                             </button>
//                                         </Link>
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
//                                     <Routes>
//                                         <Route path="about-user" element={<ProfileDetails user={user} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isFormDirty={isFormDirty} />} />
//                                         <Route path="booking" element={<BookingHistory userId={userId as string} />} />
//                                         <Route path="wallet" element={<Wallet userId={userId as string} />} />
//                                     </Routes>
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
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchUserProfile, updateUserDetails } from "../../api/api";
import toast from 'react-hot-toast';
import ProfileDetails from './UserProfileDetails';
import BookingHistory from './BookingHistory';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CiWallet } from 'react-icons/ci';
import Wallet from './Wallet';
type DataType = (type: "about-user" | "booking" | "wallet") => void;

const ProfilePage: React.FC = () => {

    const { data } = useParams()
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
    const navigate = useNavigate()
    const { userId } = useParams<{ userId: string }>();
    useEffect(() => {
        function validateData(data: any): data is DataType {
            return ["about-user", "booking", "wallet"].includes(data);
        }
        if(!validateData(data)) {
            return navigate(`/not-found`)
        }
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
            <div className="w-full mx-auto sm:px-2 md:px-6 lg:px-20">
                <div className="bg-white rounded-lg p-4 md:p-4 sm:-p-2">
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="w-14 h-14 sm:w-14 sm:h-14 lg:w-24 lg:h-24 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl lg:text-4xl">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className="ml-2 sm:ml-3 lg:ml-4">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                Hi, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                            </h1>
                        </div>
                    </div>
                    <div className="mt-6 border-t pt-6">
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                            {/* Left section */}
                            <nav className="w-full md:w-1/4 flex flex-col md:flex-col space-y-2 md:space-y-2">
                                <ul className="flex flex-row md:flex-col w-full md:w-auto md:space-y-2 space-x-2 md:space-x-0">
                                    <li className="w-full md:w-auto">
                                        <Link to={`/profile/${userId}/about-user`}>
                                            <button className={`flex items-center justify-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${data === 'about-user' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
                                                <FaUser className="mr-2 text-xl md:text-2xl" />
                                                <span className="hidden md:inline">Profile</span>
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="w-full md:w-auto">
                                        <Link to={`/profile/${userId}/booking`}>
                                            <button className={`flex items-center justify-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${window.location.pathname.includes('booking') ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
                                                <FaHistory className="mr-2 text-xl md:text-2xl" />
                                                <span className="hidden md:inline">Booking History</span>
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="w-full md:w-auto">
                                        <Link to={`/profile/${userId}/wallet`}>
                                            <button className={`flex items-center justify-center w-full p-4 text-left rounded-lg hover:bg-teal-600 ${window.location.pathname.includes('wallet') ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
                                                <CiWallet className="mr-2 text-xl md:text-2xl" />
                                                <span className="hidden md:inline">Wallet</span>
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="w-full md:w-auto">
                                        <Link to='/reset-password'>
                                            <button className="flex items-center justify-center w-full p-4 text-left bg-gray-200 rounded-lg hover:bg-gray-300">
                                                <RiLockPasswordLine className="mr-2 text-xl md:text-2xl" />
                                                <span className="hidden md:inline">Change Password</span>
                                            </button>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            {/* Right section */}
                            <div className="w-full md:w-3/4">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    {data === "about-user" && <ProfileDetails user={user} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isFormDirty={isFormDirty} />}
                                    {data === "booking" && <BookingHistory userId={userId as string} />}
                                    {data === "wallet" && <Wallet userId={userId as string} />}
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
