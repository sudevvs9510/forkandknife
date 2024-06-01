import { Routes, Route } from "react-router-dom"
import Login from '../Components/auth/LoginForm'
import Signup from '../Components/auth/SignupForm'
import Otp from "../Components/user/OtpVerify"
import Home from "../Components/user/Home"
import AdminLogin from "../Components/admin/AdminLoginForm"
import Dashboard from "../Components/admin/Dashboard"
import RestaurantDash from '../pages/ReservationDash'


const MainRouter = () => {
  return (
    <div>
      <Routes>
        {/* User Routes  */}
        <Route path="/home" element={<Home/>} />
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>
         <Route path="/verify-otp" element={<Otp/>} />

        {/* Admin Routes  */}
         <Route path="/admin/login" element={<AdminLogin/>} />
         <Route path="/admin/dashboard" element={<Dashboard />} />


         {/* Restaurant Routes  */}
         <Route path="restaurant/dashboard" element={<RestaurantDash />} />

      </Routes>
    </div>
  )
}

export default MainRouter
