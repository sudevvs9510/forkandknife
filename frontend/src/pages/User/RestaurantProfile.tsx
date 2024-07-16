import React from 'react';
import Navbar from '../../Components/user/Navbar';
import RestaurantProfile from '../../Components/user/RestaurantProfile';
// import Footer from '../../Components/User/Footer';

const RestaurantFullDetails: React.FC = () => {
  return (
    <div className="">
      <Navbar />
      <div className="pt-20">
        <RestaurantProfile />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default RestaurantFullDetails;
