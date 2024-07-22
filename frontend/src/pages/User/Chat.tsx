import React from 'react';
import Navbar from '../../Components/user/Navbar';
import Chat from '../../Components/user/UserChat';
// import Footer from '../../Components/User/Footer';

const UserChat: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 pt-16"> {/* Adjusted pt-16 to account for the navbar height */}
        <Chat />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default UserChat;


