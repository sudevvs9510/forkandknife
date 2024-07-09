import React from 'react';
import Header from '../../Components/restaurant/NavBar';
import Sidebar from '../../Components/restaurant/SideBar';
import RestaurantDashboard from '../../Components/restaurant/RestaurantDashboard';
// import Footer from '../../Components/restaurant/Footer';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 ">
      <div className='bg-gray-100'>
        <Sidebar />
        </div>
        <RestaurantDashboard />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;