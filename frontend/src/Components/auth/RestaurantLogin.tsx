import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { restaurantLoginValidate } from "../../helpers/validation";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import background from "../../assets/images/pexels-photo-776538.webp";
import { useAppDispatch } from "../../redux/app/store";
import { login } from "../../redux/reducers/restaurantSlices/RestaurantAuthSlice";
import authAxios from "../../redux/api/authApi";
import logoWhite from "../../assets/images/logoWhite.png"


const RestaurantLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const res = await authAxios.get('/restaurant/verify')
      if (res.status === 200) return navigate("/restaurant/dashboard")
    }
    verify()
  }, [])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: restaurantLoginValidate,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(login({email:values.email as string, password: values.password as string}));
        if (login.fulfilled.match(resultAction)) {
          navigate("/restaurant/dashboard");
        } else {
          throw resultAction.payload;
        }
      } catch (err) {
        console.error("Failed to login:", err);
        formik.setFieldError("email", "Invalid email or password");
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
          <div className="flex flex-col items-center justify-center">
          <img src={logoWhite} className='h-[110px] ' alt="logo" />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <p className="text-2xl font-bold mb-3 text-[#00655B]">
              Restaurant Login
            </p>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={formik.handleSubmit}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                  )}
                  <div className="relative mt-5">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...formik.getFieldProps("password")}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-500" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500">{formik.errors.password}</div>
                  )}
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-[#00655B] text-white-500 w-full py-4 rounded-lg hover:bg-[#00655B] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                    <span className="ml text-white">Login</span>
                  </button>
                </form>
                <div className="flex flex-col items-center mt-5">
                  <div className="flex flex-col items-center">
                    <p className="mt-4">
                      Don't have an account?{" "}
                      <Link
                        to="/restaurant/signup"
                        className="text-green-700 hover:text-green-500"
                      >
                        Signup
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex-1 justify-center align-middle text-center hidden lg:flex bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${background})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLoginForm;
