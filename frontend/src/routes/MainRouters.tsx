import { Routes, Route } from "react-router-dom"
import Login from '../Components/auth/LoginForm'
import Signup from '../Components/auth/SignupForm'
import Otp from "../Components/user/OtpVerify"
import Home from "../Components/user/Home"
import AdminLogin from "../Components/admin/AdminLoginForm"
import Dashboard from "../pages/Admin/Dashboard"
import RestaurantDash from '../pages/Seller/ReservationDash'
import Menu from "../pages/Seller/RestaurantMenu"
import RestaurantSignup from "../Components/restaurant/RestaurantSignup"



const MainRouter = () => {


  return (

    <Routes>
      {/* User Routes  */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/home" element={<Home />} />
      <Route path="/verify-otp" element={<Otp />} />



      {/* Admin Routes  */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />


      {/* Restaurant Routes  */}
      <Route path="restaurant/signup" element={<RestaurantSignup/>} />
      <Route path="restaurant/dashboard" element={<RestaurantDash />} />
      <Route path="restaurant/reservations" element={<RestaurantDash/>} />
      <Route path="restaurant/menu" element={<Menu />} />


    </Routes>
  )
}

export default MainRouter
