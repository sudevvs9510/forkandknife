import React from 'react';
import Sidebar from '../../Components/restaurant/SideBar';
import NavBar from '../../Components/restaurant/NavBar';
import TableSlot from '../../Components/restaurant/TableSlot';
import ChatIcon from '../../Components/restaurant/ChatIcon';

const TableManagement: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        <div className='bg-gray-100'>
          <Sidebar />
        </div>
        <main className="flex-1 p-4">
          <TableSlot />
          <div className="fixed bottom-5 right-5">
          <ChatIcon />
        </div>
        </main>
      </div>
    </div>
  );
};

export default TableManagement;
