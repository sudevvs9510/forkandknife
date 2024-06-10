import React from 'react';
import Header from '../../Components/restaurant/Header';
import Sidebar from '../../Components/restaurant/SideBar';
import Reservation from '../../Components/restaurant/Reservation';
import Footer from '../../Components/restaurant/Footer';

const ReservationDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 ">
        <Sidebar />
        <Reservation />
      </div>
      <Footer />
    </div>
  );
};

export default ReservationDashboard;
