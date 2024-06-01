import React from 'react';
import { FaRegCalendar, FaRegClock } from 'react-icons/fa';

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Table Headers */}
        <div className="col-span-full flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-xl font-bold">Reservations</h2>
          <div className="flex space-x-2 mt-2 md:mt-0">
            <button className="bg-white px-4 py-2 rounded shadow hover:bg-gray-200 flex items-center space-x-2">
              <FaRegCalendar className="h-5 w-5" />
              <span>Date</span>
            </button>
            <button className="bg-white px-4 py-2 rounded shadow hover:bg-gray-200 flex items-center space-x-2">
              <FaRegClock className="h-5 w-5" />
              <span>Time</span>
            </button>
          </div>
        </div>

        {/* Reservation Rows */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded shadow p-4 flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">10:00 AM</p>
                <p className="text-sm text-gray-600">Robertson</p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded">Reserve Table</button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">James Wam</p>
              <button className="bg-red-600 text-white px-4 py-2 rounded">Release</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
