import React from 'react';
import Header from '../../Components/restaurant/NavBar';
import Sidebar from '../../Components/restaurant/SideBar';
import Reservation from '../../Components/restaurant/Reservation';
import ChatIcon from '../../Components/restaurant/ChatIcon';
// import Footer from '../../Components/restaurant/Footer';

const RestaurantReservation: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 ">
      <div className='bg-gray-100'>
        <Sidebar />
        </div>
        <Reservation />
        <div className="fixed bottom-5 right-5">
          <ChatIcon />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default RestaurantReservation;
