import { Routes, Route } from "react-router-dom"
import Login from '../Components/auth/LoginForm'
import Signup from '../Components/auth/SignupForm'
import Otp from "../Components/user/OtpVerify"
import Home from "../Components/user/Home"
import AdminLogin from "../Components/admin/AdminLoginForm"
import Dashboard from "../pages/Admin/Dashboard"
import RestaurantDash from '../pages/Seller/ReservationDash'
import Menu from "../pages/Seller/RestaurantMenu"
import RestaurantSignup from "../Components/auth/RestaurantSignup"
import RestaurantManagement from "../Components/admin/RestaurantManagement"
import RestaurantApproval from "../Components/admin/RestaurantApproval"
import RestoRegisterManagement from "../Components/admin/RestoRegisterManagement"
import UserProfile from "../Components/user/UserProfile"
import RestaurantLogin from "../Components/auth/RestaurantLogin"
import ForgotPasswordMailPage from "../Components/user/EmailForgotPassword"
import ForgotNewPassword from "../Components/user/NewPassword"
import Profile from "../pages/Seller/RestaurantProfile"
import RestaurantProfile from "../Components/user/RestaurantProfile"

//protected routes
import UserProtected from "./UserProtected"
import RestaurantProtected from "./RestaurantProtected"
import AdminProtected from "./AdminProtected"

const MainRouter = () => {


  return (

    <Routes>
      {/* User Routes  */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<Otp />} />

      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<UserProtected element={<Home />} allowedRoles={['user']}  />} />
      <Route path="/profile" element={<UserProtected element={< UserProfile />} allowedRoles={['user']} />} />
      <Route path="/restaurant" element={ < RestaurantProfile/> } />

      <Route path="/reset-password" element={< ForgotPasswordMailPage />} />
      <Route path="/reset-password/:id" element={<ForgotNewPassword />} />


      {/* Admin Routes  */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminProtected element={<Dashboard />} allowedRoles={['admin']} />} /> 
      <Route path="/admin/restaurant-lists"  element={<AdminProtected element={<RestaurantManagement />} allowedRoles={['admin']} />} /> 
      <Route path="/admin/restaurant-approval/:id"  element={<AdminProtected element={<RestaurantApproval />} allowedRoles={['admin']} />} />  
      <Route path="/admin/new-registrations" element={<AdminProtected element={<RestoRegisterManagement />} allowedRoles={['admin']} />} /> 



      {/* Restaurant Routes  */}
      <Route path="restaurant/signup" element={<RestaurantSignup />} />
      <Route path="restaurant/login" element={<RestaurantLogin />} />

      <Route path="restaurant/dashboard" element={<RestaurantProtected element={<RestaurantDash />} allowedRoles={['restaurant']}  />} />
      <Route path="restaurant/reservations" element={<RestaurantProtected element={<RestaurantDash />} allowedRoles={['restaurant']}  />} />
      <Route path="restaurant/menu" element={<RestaurantProtected element={<Menu />} allowedRoles={['restaurant']}  />} />
      <Route path="restaurant/profile" element={<RestaurantProtected element={<Profile />} allowedRoles={['restaurant']}  />}/>


    </Routes>
  )
}

export default MainRouter
