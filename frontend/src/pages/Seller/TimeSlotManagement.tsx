import React from 'react';
import Sidebar from '../../Components/restaurant/SideBar';
import NavBar from '../../Components/restaurant/NavBar';
import TimeSlot from '../../Components/restaurant/TimeSlot';

const TimeSlotManagement: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        <div className='bg-gray-100'>
          <Sidebar />
        </div>
        <main className="flex-1 p-4">
          <TimeSlot />
        </main>
      </div>
    </div>
  );
};

export default TimeSlotManagement;
