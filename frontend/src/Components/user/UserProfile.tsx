import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import MainNavBar from '../../Components/user/MainNavBar';

const UserProfile: React.FC = () => {
    const [name, setName] = useState('Sudev');
    const [nameInput, setNameInput] = useState(false);
    const [email, setEmail] = useState('sudev@gmail.com');
    const [emailInput, setEmailInput] = useState(false);
    const [contact, setContact] = useState('98478896545');
    const [contactInput, setContactInput] = useState(false);

    const onEditEmail = () => {
        setEmailInput(!emailInput);
    };

    const onEditName = () => {
        setNameInput(!nameInput);
    };

    const onEditContact = () => {
        setContactInput(!contactInput);
    };

    return (
        <div className="min-h-screen bg-gray-100 relative z-10">
            <MainNavBar />
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-6">
                <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Profile" /> */}
                            </div>
                            <p className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-1 cursor-pointer transform translate-x-1/2 translate-y-1/2 z-20">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </p>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-gray-700">Hello,</p>
                            <p className="text-lg font-semibold text-gray-900">Sudev V S</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link to="#" className="block text-center text-blue-600 hover:bg-gray-100 p-2 rounded-md">Account</Link>
                        <Link to="#" className="block text-center text-blue-600 hover:bg-gray-100 p-2 rounded-md">Bookings</Link>
                        <Link to="#" className="block text-center text-blue-600 hover:bg-gray-100 p-2 rounded-md">Transactions</Link>
                        <Link to="#" className="block text-center text-blue-600 hover:bg-gray-100 p-2 rounded-md">Settings</Link>
                        <Link to="#" className="block text-center text-blue-600 hover:bg-gray-100 p-2 rounded-md">Logout</Link>
                    </div>
                </div>
                <div className="w-full md:w-2/3 bg-white shadow-md rounded-lg p-6">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="text-xl font-bold text-gray-900">Personal Info</h1>
                            {!nameInput ? (
                                <p className="text-red-500 font-bold text-sm cursor-pointer" onClick={onEditName}>
                                    <FontAwesomeIcon icon={faPencilAlt} /> Edit
                                </p>
                            ) : (
                                <p className="text-red-500 font-bold text-sm cursor-pointer" onClick={onEditName}>
                                    Cancel
                                </p>
                            )}
                        </div>
                        <div className="pl-4">
                            {!nameInput ? (
                                <input
                                    type="text"
                                    className="border border-neutral-400 bg-neutral-100 p-3 w-full md:w-1/2 text-sm cursor-not-allowed"
                                    disabled
                                    value={name}
                                />
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        className="border border-neutral-400 bg-white p-3 w-full md:w-1/2 text-sm"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <button className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-lg">Submit</button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="text-xl font-bold text-gray-900">Email Address</h1>
                            {!emailInput ? (
                                <p className="text-red-500 font-bold text-sm cursor-pointer" onClick={onEditEmail}>
                                    <FontAwesomeIcon icon={faPencilAlt} /> Edit
                                </p>
                            ) : (
                                <p className="text-red-500 font-bold text-sm cursor-pointer" onClick={onEditEmail}>
                                    Cancel
                                </p>
                            )}
                        </div>
                        <div className="pl-4">
                            {!emailInput ? (
                                <input
                                    type="text"
                                    className="border border-neutral-400 bg-neutral-100 p-3 w-full md:w-1/2 text-sm cursor-not-allowed"
                                    disabled
                                    value={email}
                                />
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        className="border border-neutral-400 bg-white p-3 w-full md:w-1/2 text-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-lg">Submit</button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="text-xl font-bold text-gray-900">Contact</h1>
                            {!contactInput ? (
                                <p className="text-red-500 font-bold text-sm cursor-pointer" onClick={onEditContact}>
                                    <FontAwesomeIcon icon={faPencilAlt} /> Edit
                                </p>
                            ) : (
                                <p className="text-red-500 font-bold text-sm cursor-pointer" onClick={onEditContact}>
                                    Cancel
                                </p>
                            )}
                        </div>
                        <div className="pl-4">
                            {!contactInput ? (
                                <input
                                    type="text"
                                    className="border border-neutral-400 bg-neutral-100 p-3 w-full md:w-1/2 text-sm cursor-not-allowed"
                                    disabled
                                    value={contact}
                                />
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        className="border border-neutral-400 bg-white p-3 w-full md:w-1/2 text-sm"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                    <button className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-lg">Submit</button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Link to="/reset-password">
                            <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg">
                                Change Password
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
