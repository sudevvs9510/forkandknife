

// import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import background from '../../assets/images/pexels-photo-776538.webp';

import { useFormik } from 'formik';

import { Register } from '../../api/api';
import { validateSignup } from "../../helpers/validation"
import { setStorageItem } from '../../util/localStorage';



const SignupForm: React.FC = () => {
    const navigate = useNavigate();

    // const [formData, setFormData] = useState<UserType>({
    //     username: '',
    //     email: '',
    //     phone: '',
    //     password: ''
    // });

    // const [errors, setErrors] = useState<ErrorType>({});

    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: value
    //     }));
    // };

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const validationErrors = validateSignup(formData);
    //     setErrors(validationErrors);

    //     const isValid = Object.values(validationErrors).every((error) => !error);

    //     if (isValid) {
    //         try {
    //             const response = await authAxios.post('/signup', formData);
    //             console.log(response.data);
    //             navigate('/verify-otp', { state: { ...formData } });
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    // };



    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            phone: ""
        },
        validate: validateSignup,
        onSubmit: async(values) => { 
            try{
               const {user, message} = await Register(values);
               console.log(message)
               setStorageItem("otpSession",user._id as string)
               setStorageItem("remainingSeconds","30")
                setStorageItem("Email",user._id)
                navigate('/verify-otp')
            }catch(err){
                console.log(err) 
            }
        }
    }
);

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
                                <form id="signupForm" onSubmit={formik.handleSubmit}>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        {...formik.getFieldProps("username")}
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                    />
                                    {formik.touched.username && formik.errors.username && (
                                        <div className="text-red-500">{formik.errors.username}</div>
                                    )}

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="email"
                                        {...formik.getFieldProps("email")}
                                        name="email"
                                        placeholder="Email"
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="text-red-500">{formik.errors.email}</div>
                                    )}

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="text"
                                        {...formik.getFieldProps("phone")}
                                        name="phone"
                                        placeholder="Phone number"
                                    />
                                    {formik.touched.phone && formik.errors.phone && (
                                        <div className="text-red-500">{formik.errors.phone}</div>
                                    )}

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        {...formik.getFieldProps("password")}
                                        name="password"
                                        placeholder="Password"
                                    />
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
                                            Already have an account? <Link to="/login" className="text-green-700 hover:text-green-500">Login</Link>
                                        </p>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 justify-center align-middle text-center hidden lg:flex bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}></div>
            </div>
        </div>
    );
};

export default SignupForm;
