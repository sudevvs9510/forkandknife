import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../../assets/images/pexels-photo-776538.webp';
import { useFormik } from 'formik';
import { validateRestaurantSignup } from "../../helpers/validation";
import { RestaurantRegister } from '../../api/RestaurantApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RestaurantSignup: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            restaurantName: "",
            email: "",
            password: "",
            contact: "",
        },
        validate: validateRestaurantSignup,
        onSubmit: async (values) => {
            const fullValues = {
                ...values,
                address: "default address",
                description: "default description",
                openingTime: "00:00",
                closingTime: "23:59",
                TableRate: "default rate",
                featuredImage: "default image",
                secondaryImages: "default images"
            };
            try {
                console.log(fullValues);
                const data = await RestaurantRegister(fullValues);
                console.log("onsubmit", data);
                if (data.data.message) {
                    toast.success('An email has sent to you.', {
                        onClose: () => navigate('/restaurant/login'),
                    });
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                if (err.response && err.response.data && err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again later.");
                }
                console.log(err);
            }
        }
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-screen bg-gray-100 overflow-hidden text-gray-900 flex justify-center">
            <ToastContainer />
            <div className="w-full bg-white shadow sm:rounded-lg flex h-full justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <h2 className="flex flex-col items-center text-green-600 font-bold text-2xl">Fork & Knife</h2>
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <h3 className="text-2xl mb-6 font-bold text-[#00655B]">Restaurant Signup</h3>

                                {errorMessage && (
                                    <div className="mb-4 text-red-500">
                                        {errorMessage}
                                    </div>
                                )}

                                <form id="signupForm" onSubmit={formik.handleSubmit}>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        {...formik.getFieldProps("restaurantName")}
                                        type="text"
                                        name="restaurantName"
                                        placeholder="Restaurant name"
                                    />
                                    {formik.touched.restaurantName && formik.errors.restaurantName && (
                                        <div className="text-red-500">{formik.errors.restaurantName}</div>
                                    )}

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="email"
                                        {...formik.getFieldProps("email")}
                                        name="email"
                                        placeholder="Email"
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="text-red-500">{formik.errors.email}</div>
                                    )}

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="text"
                                        {...formik.getFieldProps("contact")}
                                        name="contact"
                                        placeholder="Contact"
                                    />
                                    {formik.touched.contact && formik.errors.contact && (
                                        <div className="text-red-500">{formik.errors.contact}</div>
                                    )}

                                    <div className="relative mt-5">
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type={showPassword ? 'text' : 'password'}
                                            {...formik.getFieldProps("password")}
                                            name="password"
                                            placeholder="Password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
                                        </button>
                                    </div>
                                    {formik.touched.password && formik.errors.password && (
                                        <div className="text-red-500">{formik.errors.password}</div>
                                    )}

                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-[#008376] text-white-500 w-full py-4 rounded-lg hover:bg-[#008376] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type="submit"
                                    >
                                        <svg className="w-6 h-6 -ml-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-2 text-white">Register</span>
                                    </button>

                                    <div className="flex flex-col items-center">
                                        <p className="mt-4">
                                            Already have an account? <Link to="/restaurant/login" className="text-green-700 hover:text-green-500">Login</Link>
                                            </p>
                                        </div>
                                    </form>
    
                                    {/* <div className='flex justify-center rounded-md py-3 text-white text-xl mt-3 bg-[#008376]'>
                                        <p className=''><Link to="/signup">User signup </Link></p>
                                    </div> */}
    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 justify-center align-middle text-center hidden lg:flex bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}></div>
                </div>
            </div>
        );
    };
    
    export default RestaurantSignup;
    