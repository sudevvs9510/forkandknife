import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../../assets/images/pexels-photo-776538.webp';
import { useFormik } from 'formik';
import { Register } from '../../api/api';
import { validateSignup } from "../../helpers/validation"
import { setStorageItem } from '../../util/localStorage';

const RestaurantSignup: React.FC = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            phone: "",
            role: "user", // Default role
        },
        validate: validateSignup,
        onSubmit: async (values) => {
            try {
                const { user, message } = await Register(values);
                console.log(message)
                setStorageItem("otpSession", user._id as string)
                setStorageItem("remainingSeconds", "30")
                setStorageItem("Email", user._id)
                navigate('/verify-otp')
            } catch (err) {
                console.log(err)
            }
        }
    });

    // const toggleRole = () => {
    //     if (formik.values.role === 'user') {
    //         formik.setFieldValue('role', 'seller');
    //         navigate('/home');
    //     } else {
    //         formik.setFieldValue('role', 'user');
    //     }
    // };


    return (
        <div className="h-screen bg-gray-100 overflow-hidden text-gray-900 flex justify-center">
            <div className="w-full bg-white shadow sm:rounded-lg flex h-full justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <h2 className="flex flex-col items-center text-green-600 font-bold text-2xl">Fork & Knife</h2>
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">

                                <h3 className="text-2xl mb-6 font-bold  text-[#00655B]">Restaurant Signup</h3>

                                <form id="signupForm" onSubmit={formik.handleSubmit}>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        {...formik.getFieldProps("username")}
                                        type="text"
                                        name="restaurant"
                                        placeholder="Restaurant name"
                                    />
                                    {formik.touched.username && formik.errors.username && (
                                        <div className="text-red-500">{formik.errors.username}</div>
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
                                        {...formik.getFieldProps("phone")}
                                        name="phone"
                                        placeholder="Phone number"
                                    />
                                    {formik.touched.phone && formik.errors.phone && (
                                        <div className="text-red-500">{formik.errors.phone}</div>
                                    )}

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        {...formik.getFieldProps("password")}
                                        name="password"
                                        placeholder="Password"
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <div className="text-red-500">{formik.errors.password}</div>
                                    )}

                                    {/* <div className="flex items-center mb-6 mt-5">
                                        <p className='text-red-600'> Click to choose User or Seller </p>
                                        <button
                                            type="button"
                                            className={`px-3 py-1 rounded-lg font-medium ${
                                                formik.values.role === 'user'
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-100 border border-gray-200 text-gray-700'
                                            }`}
                                            onClick={toggleRole}
                                        >
                                            {formik.values.role === 'user' ? (
                                                <>
                                                    <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                        <circle cx="8.5" cy="7" r="4" />
                                                    </svg>
                                                    User
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                        <circle cx="8.5" cy="7" r="4" />
                                                    </svg>
                                                    Seller
                                                </>
                                            )}
                                        </button>
                                    </div> */}



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
                                            Already have an account? <Link to="/login" className="text-green-700 hover:text-green-500">Login</Link>
                                        </p>
                                    </div>
                                </form>

                                <div className='flex  justify-center rounded-md py-3 text-white text-xl mt-3 bg-[#008376]'> 
                                   <p className=''><Link to="/signup">User singup </Link> </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 justify-center align-middle text-center hidden lg:flex bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}></div>
            </div>
        </div>
    );
};




export default RestaurantSignup
