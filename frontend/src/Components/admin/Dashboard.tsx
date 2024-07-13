// src/components/Dashboard.tsx
import React from 'react';
import { FaFilter, FaTable, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const statistics = [
    { label: 'Total Reservations', value: 120, icon: <FaTable className="text-4xl text-blue-500" /> },
    { label: 'Upcoming Reservations', value: 30, icon: <FaCalendarAlt className="text-4xl text-green-500" /> },
    { label: 'Completed Reservations', value: 80, icon: <FaCheckCircle className="text-4xl text-gray-500" /> },
  ];

  const upcomingReservations = [
    { bookingID: 'R001', name: 'John Doe', time: '18:30', date: '2024-07-10', tableSize: 4, status: 'Pending' },
    { bookingID: 'R002', name: 'Jane Smith', time: '19:00', date: '2024-07-11', tableSize: 2, status: 'Confirmed' },
  ];

  return (
    <div className=" w-full p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statistics.map((stat, index) => (
          <div key={index} className="flex items-center p-4 bg-white rounded shadow">
            <div className="mr-4">{stat.icon}</div>
            <div>
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Upcoming Reservations</h3>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <FaFilter className="mr-2" /> Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">BookingID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Time</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Date</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Table Size</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {upcomingReservations.map((reservation, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{reservation.bookingID}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{reservation.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{reservation.time}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{new Date(reservation.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{reservation.tableSize}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{reservation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
