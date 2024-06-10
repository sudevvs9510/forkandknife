import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authAxios from '../../redux/api/authApi';
import background from '../../assets/images/pexels-photo-776538.webp'



interface Credentials {
   email: string;
   password: string
}


const AdminLoginForm: React.FC = () => {
   const navigate = useNavigate()
   const [errorMessage, setErrorMessage] = useState("")

   const formik = useFormik<Credentials>({
      initialValues: {
         email: "",
         password: ""
      },
      validate: (values: Credentials) => {
         const errors: Partial<Credentials> = {}
         if (!values.email) {
            errors.email = "Email is required"
         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Please enter a valid email address";
         }
         if (!values.password) {
            errors.password = "Password is required"
         } else if (values.password.length < 6) {
            errors.password = "Password length must be 8 characters";
         }
         return errors
      },
      onSubmit: async (credentials: Credentials) => {
         console.log("submiting admin form:", credentials)
         try {
            console.log("inside admin login try")
            const response = await authAxios.post('/admin/login', credentials)
            console.log(response)
            navigate('/admin/dashboard')
         } catch (error) {
            console.error(error);
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
                  <h2 className=' flex flex-col items-center  text-[#05554D] font-bold text-2xl'>Fork & Knife</h2>
               </div>
               <div className="mt-12 flex flex-col items-center">
                  <div className="w-full flex-1 mt-8">
                     <p className='flex flex-col items-center mb-5 text-[#008376] font-bold text-2xl'>Admin Login</p>


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
                              {...formik.getFieldProps('password')} onFocus={clearErrorMessage} />
                           {formik.touched.password && formik.errors.password && (
                              <div className='text-red-500'> {formik.errors.password}</div>
                           )}

                           {/* <p className="ml-auto text-sm cursor-pointer mt-3 underline">
                                        Forgot password?
                                    </p> */}
                           <button
                              type="submit" className="mt-5 tracking-wide font-semibold bg-[#008376] text-white-500 w-full py-4 rounded-lg hover:bg-[#00655B] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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

export default AdminLoginForm
