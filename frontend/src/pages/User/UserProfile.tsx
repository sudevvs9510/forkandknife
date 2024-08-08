import React from 'react';
import Navbar from '../../Components/user/Navbar';
import Profile from '../../Components/user/UserProfile';
import ChatIcon from '../../Components/user/Chat';
// import Footer from '../../Components/User/Footer';

const UserProfile: React.FC = () => {
  return (
    <div className="">
      <Navbar />
      <div className="pt-20">
        <Profile />
      </div>
      <div className="fixed bottom-4 right-4">
        <ChatIcon />
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default UserProfile;
