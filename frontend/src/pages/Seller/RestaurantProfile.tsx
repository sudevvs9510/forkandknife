import React from 'react';
import Header from '../../Components/restaurant/NavBar';
import Sidebar from '../../Components/restaurant/SideBar';
import RestaurantDetails from '../../Components/restaurant/RestaurantManagement';
// import Footer from '../../Components/restaurant/Footer';

const RestaurantProfile: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <RestaurantDetails />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default RestaurantProfile;
