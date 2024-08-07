import React from 'react';
import Header from '../../Components/restaurant/NavBar';
import Sidebar from '../../Components/restaurant/SideBar';
import RestaurantDashboard from '../../Components/restaurant/RestaurantDashboard';
import ChatIcon from '../../Components/restaurant/ChatIcon';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="bg-gray-100">
          <Sidebar />
        </div>
        <RestaurantDashboard />
        <div className="fixed bottom-5 right-5">
          <ChatIcon />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
