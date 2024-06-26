import React from 'react';
import Sidebar from '../../Components/restaurant/SideBar';
import Menu from "../../Components/restaurant/Menu";

import NavBar from '../../Components/restaurant/NavBar';
// import Footer from '../../Components/restaurant/Footer';

const ReservationMenu: React.FC = () => {
  return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex flex-1 ">
          <Sidebar />
          <Menu />
        </div>
        {/* <Footer /> */}
      </div>
    );
  };

export default ReservationMenu;