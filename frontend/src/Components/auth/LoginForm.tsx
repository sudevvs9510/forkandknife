import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/app/store';
import { login } from '../../redux/reducers/userSlices/UserAuthSlice';
import { validateLogin } from '../../helpers/validation';
import { removeStorageItem, setStorageItem } from '../../util/localStorage';
import GoogleLoginAuth from './GoogleLoginAuth';
import background from '../../assets/images/pexels-photo-776538.webp';

const LoginForm: React.FC = () => {
  removeStorageItem('otpSession');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { token, loading } = useSelector((state: RootState) => state.userAuth);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLogin,
    onSubmit: async (credentials) => {
      try {
        const response = await dispatch(login(credentials)).unwrap();
        setStorageItem("AuthToken", response.token);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 401) {
            setErrorMessage('Invalid email or password');
          } else {
            setErrorMessage('An error occurred. Please try again.');
          }
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  return (
    <div className="h-screen bg-gray-100 overflow-hidden text-gray-900 flex justify-center">
      <div className="w-full bg-white shadow sm:rounded-lg flex h-full justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <h2 className="flex flex-col items-center text-green-600 font-bold text-2xl">Fork & Knife</h2>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <p className="text-2xl font-bold mb-3 text-[#00655B]">Login</p>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={formik.handleSubmit}>
                  {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...formik.getFieldProps('email')}
                    onFocus={clearErrorMessage}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                  )}
                  <div className="relative mt-5">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Password"
                      {...formik.getFieldProps('password')}
                      onFocus={clearErrorMessage}
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
                  <p className="ml-auto text-sm cursor-pointer mt-3 underline">
                    <Link to="/reset-password">Forgot password?</Link>
                  </p>
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-[#00655B] text-white-500 w-full py-4 rounded-lg hover:bg-[#00655B] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6 -ml-2 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3 text-white">Login</span>
                      </>
                    )}
                  </button>
                </form>
                <div className="mt-5 mb-7 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or Log In with Gmail
                  </div>
                </div>
                <div className="flex flex-col items-center mt-5">
                  <GoogleLoginAuth />
                  <div className="flex flex-col items-center">
                    <p className="mt-4">
                      Don't have an account?{' '}
                      <Link to="/signup" className="text-green-700 hover:text-green-500">
                        Signup
                      </Link>
                    </p>
                  </div>
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

export default LoginForm;
