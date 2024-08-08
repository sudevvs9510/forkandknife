import React from 'react';
import Navbar from '../../Components/user/Navbar';
import BookingHistoryDetails from '../../Components/user/BookingHistoryDetails';
import ChatIcon from '../../Components/user/Chat';
// import Footer from '../../Components/User/Footer';

const UserChat: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 pt-16"> {/* Adjusted pt-16 to account for the navbar height */}
        <BookingHistoryDetails />
      </div>
      <div className="fixed bottom-4 right-4">
        <ChatIcon />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default UserChat;


