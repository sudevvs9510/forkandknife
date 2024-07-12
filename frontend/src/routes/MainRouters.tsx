import { Routes, Route } from "react-router-dom"

//user components
import Login from '../Components/auth/LoginForm'
import Signup from '../Components/auth/SignupForm'
import Otp from "../Components/user/OtpVerify"
import Home from "../Components/user/Home"
import UserProfile from "../Components/user/UserProfile"
import RestaurantProfile from "../Components/user/RestaurantProfile"
import ForgotPasswordMailPage from "../Components/user/EmailForgotPassword"
import ForgotNewPassword from "../Components/user/NewPassword"


//admin components
import AdminLogin from "../Components/admin/AdminLoginForm"
import AdminDashboard from "../pages/Admin/Dashboard"
import RestaurantManagement from "../Components/admin/RestaurantManagement"
import RestaurantApproval from "../Components/admin/RestaurantApproval"
import RestoRegisterManagement from "../Components/admin/RestoRegisterManagement"


// restaurant components
import RestaurantSignup from "../Components/auth/RestaurantSignup"
import RestaurantLogin from "../Components/auth/RestaurantLogin"
import Reservation from '../pages/Seller/Reservation'
import Menu from "../pages/Seller/RestaurantMenu"
import Profile from "../pages/Seller/RestaurantProfile"
import TableManagement from "../pages/Seller/TableMangement"
import TableSlots from "../pages/Seller/TableSlot"
import TimeSlotManagement from "../pages/Seller/TimeSlotManagement"
import RestaurantDashboard from "../pages/Seller/Dashboard"

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
      <Route path="/restaurant-view/:restaurantId" element={ < RestaurantProfile/> } />

      <Route path="/reset-password" element={< ForgotPasswordMailPage />} />
      <Route path="/reset-password/:id" element={<ForgotNewPassword />} />


      {/* Admin Routes  */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminProtected element={<AdminDashboard />} allowedRoles={['admin']} />} /> 
      <Route path="/admin/restaurant-lists"  element={<AdminProtected element={<RestaurantManagement />} allowedRoles={['admin']} />} /> 
      <Route path="/admin/restaurant-approval/:id"  element={<AdminProtected element={<RestaurantApproval />} allowedRoles={['admin']} />} />  
      <Route path="/admin/new-registrations" element={<AdminProtected element={<RestoRegisterManagement />} allowedRoles={['admin']} />} /> 



      {/* Restaurant Routes  */}
      <Route path="restaurant/signup" element={<RestaurantSignup />} />
      <Route path="restaurant/login" element={<RestaurantLogin />} />

      <Route path="restaurant/dashboard" element={<RestaurantProtected element={<RestaurantDashboard />} allowedRoles={['restaurant']} />} />
      <Route path="restaurant/reservations" element={<RestaurantProtected element={<Reservation />} allowedRoles={['restaurant']}  />} />
      <Route path="restaurant/menu" element={<RestaurantProtected element={<Menu />} allowedRoles={['restaurant']}  />} />
      <Route path="restaurant/profile" element={<RestaurantProtected element={<Profile />} allowedRoles={['restaurant']}  />}/>

      <Route path="restaurant/tables" element={<RestaurantProtected element={<TableManagement />} allowedRoles={['restaurant']} />} />
      <Route path="restaurant/tableslots/:tableId"  element={<RestaurantProtected element={< TableSlots />} allowedRoles={['restaurant']} />} />
      
      <Route path="/restaurant/time-slots" element={<RestaurantProtected element={<TimeSlotManagement />} allowedRoles={['restaurant']} />} />


    </Routes>
  )
}

export default MainRouter
