import React from 'react';
import Header from '../../Components/restaurant/NavBar';
import Sidebar from '../../Components/restaurant/SideBar';
import RestaurantChat from '../../Components/restaurant/ChatRestaurant';


const RestoChat: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 bg-gray-100">
        <Sidebar />
        <div className="flex-1">
          <RestaurantChat />
        </div>
      </div>
    </div>
  );
};

export default RestoChat;






