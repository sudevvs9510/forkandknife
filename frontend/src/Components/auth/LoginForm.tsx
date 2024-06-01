

import background from '../../assets/images/pexels-photo-776538.webp'
import { Link, useNavigate } from 'react-router-dom'
import { validateLogin } from '../../helpers/validation'
import authAxios from '../../redux/api/authApi'
import { useFormik } from 'formik'
import { removeStorageItem, setStorageItem } from "../../util/localStorage"
import React, { useState } from 'react'
import GoogleLoginAuth from './GoogleLoginAuth'
import axios from 'axios'


interface UserType {
    email: string,
    password: string
} 


const LoginForm: React.FC = () => {
    removeStorageItem("otpSession")
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")


    const formik = useFormik<UserType>({
        initialValues: {
            email: "",
            password: ""
        },
        validate: validateLogin,
        onSubmit: async (credentials: UserType) => {
            console.log("Submiting form", credentials)
            try {
                console.log("inside try");
                
                const response = await authAxios.post('/login', credentials)
                console.log(response)
                const { token } = response.data
                setStorageItem('Email', token)
                navigate('/home')
            } catch (error ) {
                if(axios.isAxiosError(error)){

                    if (error.response && error.response.status === 401) {
                        setErrorMessage('Invalid email or password');
                    } else {
                        setErrorMessage('An error occurred. Please try again.');
                    }
                } else {
                    setErrorMessage("An unexpected error occured. Please try again.")
                }
            }
        }
    })

    const clearErrorMessage = () => {
        setErrorMessage('');
    };

    return (
        <div className="h-screen  bg-gray-100 overflow-hidden text-gray-900 flex justify-center">
            <div className="w-full  bg-white shadow sm:rounded-lg flex h-full  justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        {/* <img src={logo} className="w-mx-auto" alt="Logo" style={{ width: '30%' }} /> */}
                        <h2 className=' flex flex-col items-center text-green-600 font-bold text-2xl'>Fork & Knife</h2>
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">


                            <div className="mx-auto max-w-xs">
                                <form onSubmit={formik.handleSubmit}>
                                    {errorMessage && (<div className="text-red-500 mb-4">{errorMessage}</div>)}
                                    <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email" id='email' placeholder="Email"
                                        {...formik.getFieldProps("email")} onFocus={clearErrorMessage} />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className='text-red-500'>{formik.errors.email}</div>
                                    )}
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password" id='password' placeholder="Password"
                                        {...formik.getFieldProps('password')} onFocus={clearErrorMessage}/>
                                    {formik.touched.password && formik.errors.password && (
                                        <div className='text-red-500'> {formik.errors.password}</div>
                                    )}

                                    {/* <p className="ml-auto text-sm cursor-pointer mt-3 underline">
                                        Forgot password?
                                    </p> */}
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-[#00655B] text-white-500 w-full py-4 rounded-lg hover:bg-[#00655B] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2 text-white" fill="none" stroke="currentColor" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml text-white">
                                            Login
                                        </span>
                                    </button>

                                    <div className="mt-5 mb-7 border-b text-center">
                                        <div
                                            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                            Or Log In with gmail
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center mt-5">
                                    <GoogleLoginAuth />
                                        <div className="flex flex-col items-center">
                                            <p className="mt-4">
                                                don't have an account? <Link to="/signup" className="text-green-700 hover:text-green-500">Signup</Link>
                                            </p>
                                        </div>
                                    </div>



                                    {/* <p className="mt-6 text-xs text-gray-600 text-center">
                                            I agree to abide by fork and knife
                                            <a href="#" className="border-b border-gray-500 ">
                                                 Terms of Service
                                            </a>
                                            and its
                                            <a href="#" className="border-b border-gray-500 border-dotted">
                                                Privacy Policy
                                            </a>
                                        </p> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 justify-center align-middle text-center hidden lg:flex bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}>
                </div>
            </div>
        </div>
    )
}

export default LoginForm





