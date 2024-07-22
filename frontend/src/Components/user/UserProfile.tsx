
import React, { useEffect, useState } from 'react';
import { FaUser, FaHistory, FaMoneyBillWave } from 'react-icons/fa';
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useParams } from 'react-router-dom';
import { fetchUserProfile, updateUserDetails } from "../../api/api";
import toast from 'react-hot-toast';

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("Fetching user data for userId:", userId);
                const userData = await fetchUserProfile(userId as string);
                console.log("User data received from API:", userData);

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
                    console.log("Updated user state:", {
                        username: userData.username || '',
                        phone: userData.phone || '',
                        email: userData.email || '',
                    });
                } else {
                    console.log("Received invalid user data:", userData);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    console.log("Current user state:", user);

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
            console.log("Updating user data:", user);
            const updatedData = {
                username: user.username,
                phone: user.phone,
            };
            const response = await updateUserDetails(userId as string, updatedData);
            console.log("User data after update:", response.updatedUser);

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
                            {/* <button className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1">
                                <FaCamera className="text-gray-500" />
                            </button> */}
                        </div>
                        <div className="ml-4">
                            <h1 className="text-3xl font-bold">Hi, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>
                        </div>
                    </div>
                    <div className="mt-6 border-t pt-6">
                        <div className="flex space-x-4">
                            <nav className="w-1/4">
                                <ul className="space-y-4">
                                    <li className='flex items-center'>
                                        <FaUser className="mr-2" /> Account Details
                                    </li>
                                    <li className='flex items-center'>
                                        <FaHistory className="mr-2" /> Reservation History
                                    </li>
                                    <li className='flex items-center'>
                                        <FaMoneyBillWave className="mr-2" /> Transactions
                                    </li>
                                    <li className='flex items-center'>
                                        <Link to='/reset-password' className="flex items-center">
                                            <RiLockPasswordLine className="mr-2" /> Change Password
                                        </Link>
                                    </li>

                                    {/* <li className='border border-red-500 rounded p-2 hover:bg-red-500 hover:text-white text-red-500 flex items-center'>
                                        <FaSignOutAlt className="mr-2" /> Logout
                                    </li> */}
                                </ul>
                            </nav>
                            <div className="w-3/4">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-bold mb-4">About me</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={user.username}
                                                onChange={handleInputChange}
                                                className="w-full border rounded p-2 mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={user.email}
                                                readOnly
                                                className="w-full border rounded p-2 mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700">Phone number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={user.phone}
                                                onChange={handleInputChange}
                                                className="w-full border rounded p-2 mt-1"
                                            />
                                        </div>
                                        <div className="mt-6 flex space-x-4">
                                            <button type="submit" className={`bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-800 ${isFormDirty() ? '' : 'hidden'}`}>
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
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
