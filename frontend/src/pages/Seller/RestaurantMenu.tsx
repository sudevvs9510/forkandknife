import React from 'react';
import Sidebar from '../../Components/restaurant/SideBar';
import Menu from "../../Components/restaurant/Menu";
// import Footer from '../../Components/restaurant/Footer';

const ReservationDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <Menu />
      {/* <Footer /> */}
    </div>
  );
};

export default ReservationDashboard;