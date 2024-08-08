// import React from 'react';
// import Navbar from '../../Components/user/Navbar';
// import Chat from '../../Components/user/UserChat';
// // import Footer from '../../Components/User/Footer';

// const UserChat: React.FC = () => {
//   return (
//     <div className="flex flex-col md:flex-row h-screen">
//       <Navbar />
//       <div className="flex-1 md:mt-0"> 
//         <Chat />
//       </div>
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default UserChat;


import React from 'react';
import Navbar from '../../Components/user/Navbar';
import Chat from '../../Components/user/UserChat';

const UserChat: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-1 md:mt-0"> 
        <Chat />
      </div>
    </div>
  );
};

export default UserChat;



