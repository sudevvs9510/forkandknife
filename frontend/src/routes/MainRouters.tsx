import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import Loader from '../Components/Loader';  

// user components
const Login = lazy(() => import('../Components/auth/LoginForm'));
const Signup = lazy(() => import('../Components/auth/SignupForm'));
const Otp = lazy(() => import("../Components/user/OtpVerify"));
const Home = lazy(() => import("../Components/user/Home"));
const UserProfile = lazy(() => import("../pages/User/UserProfile"));
const RestaurantProfile = lazy(() => import("../pages/User/RestaurantProfile"));
const ForgotPasswordMailPage = lazy(() => import("../Components/user/EmailForgotPassword"));
const ForgotNewPassword = lazy(() => import("../Components/user/NewPassword"));
const TableBooking = lazy(()=> import('../pages/User/TableBooking'))
const Chat = lazy(()=> import('../pages/User/Chat'))
import PaymentSuccess from '../Components/user/PaymentSuccess';
import PaymentFailure from '../Components/user/PaymentFailure';


// admin components
const AdminLogin = lazy(() => import("../Components/admin/AdminLoginForm"));
const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const RestaurantManagement = lazy(() => import("../pages/Admin/RestaurantManagement"));
const RestaurantApproval = lazy(() => import("../Components/admin/RestaurantApproval"));
const RestoRegisterManagement = lazy(() => import("../pages/Admin/NewRestaurants"));

// restaurant components
const RestaurantSignup = lazy(() => import("../Components/auth/RestaurantSignup"));
const RestaurantLogin = lazy(() => import("../Components/auth/RestaurantLogin"));
const Reservation = lazy(() => import('../pages/Seller/Reservation'));
const Menu = lazy(() => import("../pages/Seller/RestaurantMenu"));
const Profile = lazy(() => import("../pages/Seller/RestaurantProfile"));
const TableManagement = lazy(() => import("../pages/Seller/TableMangement"));
const TableSlots = lazy(() => import("../pages/Seller/TableSlot"));
const TimeSlotManagement = lazy(() => import("../pages/Seller/TimeSlotManagement"));
const RestaurantDashboard = lazy(() => import("../pages/Seller/Dashboard"));

const RestaurantChat = lazy(()=> import("../pages/Seller/ChatRestaurant"))

// protected routes
const UserProtected = lazy(() => import("./UserProtected"));
const RestaurantProtected = lazy(() => import("./RestaurantProtected"));
const AdminProtected = lazy(() => import("./AdminProtected"));

const MainRouter:React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* User Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/" element={<UserProtected element={<Home />} allowedRoles={['user']} />} />
        <Route path="/profile/:userId" element={<UserProtected element={<UserProfile />} allowedRoles={['user']} />} />
        <Route path="/restaurant-view/:restaurantId" element={<UserProtected  element={<RestaurantProfile />} allowedRoles={['user']} />} />
        <Route path="/reset-password" element={<ForgotPasswordMailPage />} />
        <Route path="/reset-password/:id" element={<ForgotNewPassword />} />
        <Route path="/booking-confirmation" element={<UserProtected element={<TableBooking />} allowedRoles={['user']} />} />

        <Route path="/chat" element={<UserProtected element={<Chat />} allowedRoles={['user']} />} />

        <Route path="/payment-success" element={<UserProtected element={<PaymentSuccess />} allowedRoles={['user']} />} />
        <Route path="/payment-failure" element={<UserProtected element={<PaymentFailure />} allowedRoles={['user']} />} />



        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminProtected element={<AdminDashboard />} allowedRoles={['admin']} />} />
        <Route path="/admin/restaurant-lists" element={<AdminProtected element={<RestaurantManagement />} allowedRoles={['admin']} />} />
        <Route path="/admin/restaurant-approval/:id" element={<AdminProtected element={<RestaurantApproval />} allowedRoles={['admin']} />} />
        <Route path="/admin/new-registrations" element={<AdminProtected element={<RestoRegisterManagement />} allowedRoles={['admin']} />} />

        {/* Restaurant Routes */}
        <Route path="restaurant/signup" element={<RestaurantSignup />} />
        <Route path="restaurant/login" element={<RestaurantLogin />} />
        <Route path="restaurant/dashboard" element={<RestaurantProtected element={<RestaurantDashboard />} allowedRoles={['restaurant']} />} />
        <Route path="restaurant/reservations" element={<RestaurantProtected element={<Reservation />} allowedRoles={['restaurant']} />} />
        <Route path="restaurant/menu" element={<RestaurantProtected element={<Menu />} allowedRoles={['restaurant']} />} />
        <Route path="restaurant/profile" element={<RestaurantProtected element={<Profile />} allowedRoles={['restaurant']} />} />
        <Route path="restaurant/tables" element={<RestaurantProtected element={<TableManagement />} allowedRoles={['restaurant']} />} />
        <Route path="restaurant/tableslots/:tableId" element={<RestaurantProtected element={<TableSlots />} allowedRoles={['restaurant']} />} />
        <Route path="/restaurant/time-slots" element={<RestaurantProtected element={<TimeSlotManagement />} allowedRoles={['restaurant']} />} />
        <Route path="/restaurant/chat" element={<RestaurantProtected element={<RestaurantChat />} allowedRoles={['restaurant']} />} />
      </Routes>
    </Suspense>
  );
};

export default MainRouter;
