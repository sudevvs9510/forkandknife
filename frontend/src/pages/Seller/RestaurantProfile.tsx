import React from 'react';
import Header from '../../Components/restaurant/Header';
import Sidebar from '../../Components/restaurant/SideBar';
import Profile from '../../Components/restaurant/Profile';
// import Footer from '../../Components/restaurant/Footer';

const RestaurantProfile: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 ">
        <Sidebar />
        <Profile />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default RestaurantProfile;
