
import React, { useState } from 'react';
import { MdArrowDropDown  } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

const reservationsData = [
  { bookingID: 'FK001', name: 'John Doe', time: '18:30', date: '2024-07-10', tableSize: 4, status: 'Pending' },
  { bookingID: 'FK002', name: 'Jane Smith', time: '19:00', date: '2024-07-11', tableSize: 2, status: 'Confirmed' },
  { bookingID: 'FK003', name: 'Mike Johnson', time: '20:00', date: '2024-07-12', tableSize: 6, status: 'Cancelled' },
  { bookingID: 'FK004', name: 'Emily Davis', time: '18:00', date: '2024-07-13', tableSize: 3, status: 'CheckedIn' },
  { bookingID: 'FK005', name: 'Chris Lee', time: '19:30', date: '2024-07-14', tableSize: 5, status: 'No-Show' },
  { bookingID: 'FK006', name: 'Sarah Brown', time: '20:30', date: '2024-07-15', tableSize: 2, status: 'Completed' },
];

const ReservationComponent: React.FC = () => {
  const [reservations, setReservations] = useState(reservationsData);
  const [filter, setFilter] = useState('All');
  const [showMenu, setShowMenu] = useState(false);

  const handleFilterClick = () => {
    setShowMenu(!showMenu);
  };

  const handleFilterClose = (status: string) => {
    setFilter(status);
    setShowMenu(false);
  };

  const filteredReservations = filter === 'All' ? reservations : reservations.filter(reservation => reservation.status === filter);

  return (
    <div className="w-full p-4">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Reservations</h2>
        <div className="relative">
          <button className="flex items-center gap-2 bg-teal-500 text-white text-sm font-bold px-4 py-2 rounded-lg" onClick={handleFilterClick}>
            {filter}
            <MdArrowDropDown  />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              {['All', 'Pending', 'Confirmed', 'Cancelled', 'CheckedIn', 'Completed'].map(status => (
                <button
                  key={status}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleFilterClose(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {filteredReservations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full w-full bg-white">
            <thead>
              <tr className='bg-gray-100'>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">BookingID</th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">Name</th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">Time</th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">Date</th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">Table Size</th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">Status</th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation, index) => (
                <tr key={index} className='border-b border-gray-100'>
                  <td className="px-6 py-1 whitespace-no-wrap">{reservation.bookingID}</td>
                  <td className="px-6 py-1 whitespace-no-wrap">{reservation.name}</td>
                  <td className="px-6 py-1 whitespace-no-wrap">{reservation.time}</td>
                  <td className="px-6 py-1 whitespace-no-wrap">{new Date(reservation.date).toLocaleDateString()}</td>
                  <td className="px-6 py-1 whitespace-no-wrap">{reservation.tableSize}</td>
                  <td className="px-6 py-1 whitespace-no-wrap">{reservation.status}</td>
                  <td className="px-6 py-1 whitespace-no-wrap">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        const updatedReservations = reservations.filter((_, i) => i !== index);
                        setReservations(updatedReservations);
                        toast.success('Reservation deleted successfully!');
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">No reservations added</p>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              // Handle the addition of a new reservation
              toast.success('Add new reservation functionality not implemented');
            }}
          >
            Add Reservation
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationComponent;
