// import React from 'react';
// import Navbar from '../../Components/user/Navbar';
// import Profile from '../../Components/user/UserProfile';
// import ChatIcon from '../../Components/user/Chat';

// const UserProfile: React.FC = () => {
//   return (
//     <div className="">
//       <Navbar />
//       <div className="pt-20">
//         <Profile />
//       </div>
//       <div className="fixed bottom-4 right-4">
//         <ChatIcon />
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React from 'react';
import Navbar from '../../Components/user/Navbar';
import Profile from '../../Components/user/UserProfile';
import ChatIcon from '../../Components/user/Chat';

const UserProfile: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar should be sticky to the top */}
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 flex-grow">
        {/* Profile Component should be responsive */}
        <Profile />
      </div>

      {/* Chat Icon should be fixed and responsive */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <ChatIcon />
      </div>
    </div>
  );
};

export default UserProfile;

