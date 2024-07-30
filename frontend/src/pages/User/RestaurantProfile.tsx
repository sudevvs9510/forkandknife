import React from 'react';
import Navbar from '../../Components/user/Navbar';
import RestaurantProfile from '../../Components/user/RestaurantProfile';
import ChatIcon from "../../Components/user/Chat";
// import Footer from '../../Components/User/Footer';

const RestaurantFullDetails: React.FC = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="pt-20">
        <RestaurantProfile />
      </div>
      <div className="fixed bottom-4 right-4">
        <ChatIcon />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default RestaurantFullDetails;
