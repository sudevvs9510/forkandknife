import React from 'react';
import Sidebar from '../../Components/restaurant/SideBar';
import Menu from "../../Components/restaurant/Menu";
import NavBar from '../../Components/restaurant/NavBar';
import ChatIcon from '../../Components/restaurant/ChatIcon';
// import Footer from '../../Components/restaurant/Footer';

const ReservationMenu: React.FC = () => {
  return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex flex-1 ">
        <div className='bg-gray-100'>
        <Sidebar />
        </div>
          <Menu />
          <div className="fixed bottom-5 right-5">
          <ChatIcon />
        </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  };

export default ReservationMenu;