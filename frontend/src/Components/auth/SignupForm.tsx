// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { Register } from '../../api/api';
// import { validateSignup } from '../../helpers/validation';
// import { setStorageItem } from '../../util/localStorage';
// import background from '../../assets/images/pexels-photo-776538.webp';
// import { useDispatch,useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../../redux/app/store';
// import { signup } from '../../redux/reducers/auth/UserAuthSlice';


// const SignupForm: React.FC = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch<AppDispatch>()
//     const [showPassword, setShowPassword] = useState(false);

//     const { loading, error } = useSelector((state: RootState) => state.userAuth)

//     const formik = useFormik({
//         initialValues: {
//             username: '',
//             email: '',
//             password: '',
//             phone: '',
//             role: 'user',
//         },
//         validate: validateSignup,
//         // onSubmit: async (values) => {
//         //     try {
//         //         const { user, message } = await Register(values);
//         //         console.log(message);
//         //         setStorageItem('otpSession', user._id as string);
//         //         setStorageItem('remainingSeconds', '30');
//         //         setStorageItem('Email', user._id);
//         //         navigate('/verify-otp');
//         //     } catch (err) {
//         //         console.log(err);
//         //     }
//         // },

//         onSubmit: async(values) =>{
//             try{
//                 const result= await dispatch(signup(values)).unwrap();
//                 setStorageItem('otpSession', result._id)
//                 setStorageItem('remainingSeconds','30')
//                 setStorageItem("Email", result._id)
//                 navigate("/verify-otp")
//             } catch(err){
//                 console.log(err)
//             }
//         }
//     });

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <div className="h-screen bg-gray-100 overflow-hidden text-gray-900 flex justify-center">
//             <div className="w-full bg-white shadow sm:rounded-lg flex h-full justify-center flex-1">
//                 <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
//                     <div>
//                         <h2 className="flex flex-col items-center text-green-600 font-bold text-2xl">Fork & Knife</h2>
//                     </div>
//                     <div className="mt-12 flex flex-col items-center">
//                         <div className="w-full flex-1 mt-8">
//                             <div className="mx-auto max-w-xs">
//                                 <h3 className="text-2xl mb-6 font-bold text-[#00655B]">User Signup</h3>
//                                 <form id="signupForm" onSubmit={formik.handleSubmit}>
//                                     <input
//                                         className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                                         {...formik.getFieldProps('username')}
//                                         type="text"
//                                         placeholder="Username"
//                                     />
//                                     {formik.touched.username && formik.errors.username && (
//                                         <div className="text-red-500">{formik.errors.username}</div>
//                                     )}
//                                     <input
//                                         className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
//                                         {...formik.getFieldProps('email')}
//                                         type="email"
//                                         placeholder="Email"
//                                     />
//                                     {formik.touched.email && formik.errors.email && (
//                                         <div className="text-red-500">{formik.errors.email}</div>
//                                     )}
//                                     <input
//                                         className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
//                                         {...formik.getFieldProps('phone')}
//                                         type="tel"
//                                         placeholder="Phone"
//                                     />
//                                     {formik.touched.phone && formik.errors.phone && (
//                                         <div className="text-red-500">{formik.errors.phone}</div>
//                                     )}
//                                     <div className="relative mt-5">
//                                         <input
//                                             className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                                             type={showPassword ? 'text' : 'password'}
//                                             id="password"
//                                             placeholder="Password"
//                                             {...formik.getFieldProps('password')}
//                                         />
//                                         <button
//                                             type="button"
//                                             className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                                             onClick={togglePasswordVisibility}
//                                         >
//                                             {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
//                                         </button>
//                                     </div>
//                                     {formik.touched.password && formik.errors.password && (
//                                         <div className="text-red-500">{formik.errors.password}</div>
//                                     )}
//                                     <button
//                                         type="submit"
//                                         className="mt-5 tracking-wide font-semibold bg-[#00655B] text-white-500 w-full py-4 rounded-lg hover:bg-[#00655B] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
//                                     >
//                                         <svg
//                                             className="w-6 h-6 -ml-2 text-white"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             strokeWidth="2"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                         >
//                                             <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//                                             <circle cx="8.5" cy="7" r="4" />
//                                             <path d="M20 8v6M23 11h-6" />
//                                         </svg>
//                                         <span className="ml-3 text-white">Sign Up</span>
//                                     </button>
//                                 </form>
//                                 <div className="flex flex-col items-center mt-5">
//                                     <p className="mt-4">
//                                         Already have an account?{' '}
//                                         <Link to="/login" className="text-green-700 hover:text-green-500">
//                                             Login
//                                         </Link>
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex-1 justify-center align-middle text-center hidden lg:flex bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}></div>
//             </div>
//         </div>
//     );
// };

// export default SignupForm;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/app/store';
import { signup } from '../../redux/reducers/auth/UserAuthSlice';
import { validateSignup } from '../../helpers/validation';
import { setStorageItem } from '../../util/localStorage';
import background from '../../assets/images/pexels-photo-776538.webp';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error } = useSelector((state: RootState) => state.userAuth);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
      role: 'user',
    },
    validate: validateSignup,
    onSubmit: async (values) => {
      try {
        const result = await dispatch(signup(values)).unwrap();
        setStorageItem('otpSession', result._id);
        setStorageItem('remainingSeconds', '30');
        setStorageItem('Email', result._id);
        navigate('/verify-otp');
      } catch (err) {
        console.log(err);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
                <h3 className="text-2xl mb-6 font-bold text-[#00655B]">User Signup</h3>
                <form id="signupForm" onSubmit={formik.handleSubmit}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    {...formik.getFieldProps('username')}
                    type="text"
                    placeholder="Username"
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="text-red-500">{formik.errors.username}</div>
                  )}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    {...formik.getFieldProps('email')}
                    type="email"
                    placeholder="Email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                  )}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    {...formik.getFieldProps('phone')}
                    type="tel"
                    placeholder="Phone"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-red-500">{formik.errors.phone}</div>
                  )}
                  <div className="relative mt-5">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Password"
                      {...formik.getFieldProps('password')}
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
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-[#00655B] text-white-500 w-full py-4 rounded-lg hover:bg-[#00655B] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    disabled={loading}
                  >
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
                    <span className="ml-3 text-white">Sign Up</span>
                  </button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex flex-col items-center mt-5">
                  <p className="mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-700 hover:text-green-500">
                      Login
                    </Link>
                  </p>
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

export default SignupForm;
