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
import ProtectedRoute from "../routes/ProtectedRoute"
import RestaurantProtectedRoute from "./RestaurantProtectedRoute"

const MainRouter = () => {


  return (

    <Routes>
      {/* User Routes  */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<Otp />} />

      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      <Route path="/profile" element={<ProtectedRoute element={< UserProfile />} />} />
      <Route path="/restaurant" element={ < RestaurantProfile/> } />

      <Route path="/reset-password" element={< ForgotPasswordMailPage />} />
      <Route path="/reset-password/:id" element={<ForgotNewPassword />} />


      {/* Admin Routes  */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/restaurant-lists" element={<RestaurantManagement />} />
      <Route path="/admin/restaurant-approval/:id" element={< RestaurantApproval />} />
      <Route path="/admin/new-registrations" element={< RestoRegisterManagement />} />



      {/* Restaurant Routes  */}
      <Route path="restaurant/signup" element={<RestaurantSignup />} />
      <Route path="restaurant/login" element={<RestaurantLogin />} />

      <Route path="restaurant/dashboard" element={<RestaurantProtectedRoute element={<RestaurantDash />} />} />
      <Route path="restaurant/reservations" element={<RestaurantProtectedRoute element={<RestaurantDash />} />} />
      <Route path="restaurant/menu" element={<RestaurantProtectedRoute element={<Menu />} />} />
      <Route path="restaurant/profile" element={<RestaurantProtectedRoute element={<Profile />} />}/>


    </Routes>
  )
}

export default MainRouter
