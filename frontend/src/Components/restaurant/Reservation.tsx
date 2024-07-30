import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import authAxios from '../../redux/api/authApi';
import { RootState, useAppSelector } from '../../redux/app/store';
import { FaEdit, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import TableShimmer from '../TableShimmer';

interface User {
  _id: string;
  email: string;
  username: string;
}

interface Table {
  _id: string;
  tableNumber: string;
  tableCapacity: number;
  tableLocation: string;
}

interface Reservation {
  _id: string;
  bookingId: string;
  userId: User;
  tableId: Table;
  restaurantId: string;
  bookingDate: string;
  bookingTime: string;
  paymentMethod: string;
  paymentStatus: string;
  bookingStatus: string;
  totalAmount: number;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'text-green-600';
    case 'cancelled':
      return 'text-red-600';
    case 'checked in':
      return 'text-blue-600';
    case 'pending':
      return 'text-orange-600';
    case 'completed':
      return 'text-gray-600'; 
    default:
      return 'text-gray-600'; 
  }
};

const ReservationComponent: React.FC = () => {
  const { restaurantId } = useAppSelector((state: RootState) => state.restaurantAuth);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFilterClick = () => {
    setShowMenu(!showMenu);
  };

  const handleFilterClose = (status: string) => {
    setFilter(status);
    setShowMenu(false);
  };

  const filteredReservations = filter === 'All'
    ? reservations
    : reservations.filter(reservation => reservation.bookingStatus === filter);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        if (restaurantId) {
          const res = await authAxios.get(`/restaurant/table-reservations/${restaurantId}`);
          setReservations(res.data.bookingDatas);
        } else {
          console.error("Unauthorized access or invalid role");
        }
      } catch (error) {
        console.error("Error fetching booking data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingData();
  }, [restaurantId]);

  const navigate = useNavigate();
  const handleViewDetails = (bookingId: string) => {
    navigate(`/restaurant/update-reservations/${bookingId}`);
  };

  return (
    <div className="w-[88%] lg:w-full p-4">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Reservations</h2>
        <div className="relative">
          <button className="flex items-center gap-2 bg-teal-500 text-white text-sm font-bold px-4 py-2 rounded-lg" onClick={handleFilterClick}>
            {filter}
            <FaFilter />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              {['All', 'PENDING', 'CONFIRMED', 'CANCELLED', 'CHECKED IN', 'COMPLETED'].map(status => (
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
      {loading ? (
        <TableShimmer />
      ) : filteredReservations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full w-full bg-white">
            <thead>
              <tr className='bg-gray-100'>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">BOOKING ID</th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">NAME</th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">DATE</th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">TIME</th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">TABLE </th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">TABLE SIZE </th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">BOOKING STATUS</th>
                <th className="px-6 py-4 text-left leading-4 text-teal-600 tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation, index) => (
                <tr key={index} className='border-b border-gray-100'>
                  <td className="px-6 py-1 whitespace-no-wrap">
                    <span title={reservation.bookingId}>{reservation.bookingId.substring(0, 10)}...</span>
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap">{reservation.userId.username}</td>
                  <td className="px-6 py-2 whitespace-no-wrap">{new Date(reservation.bookingDate).toLocaleDateString()}</td>
                  <td className="px-6 py-2 whitespace-no-wrap">{reservation.bookingTime}</td>
                  <td className="px-6 py-2 whitespace-no-wrap">{reservation.tableId.tableNumber}</td>
                  <td className="px-6 py-2 whitespace-no-wrap">{reservation.tableId.tableCapacity}</td>
                  <td className={`px-6 py-2 whitespace-no-wrap ${getStatusColor(reservation.bookingStatus)}`}>
                    {reservation.bookingStatus}
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap">
                    <button
                      onClick={() => handleViewDetails(reservation.bookingId)}
                      className=" text-white font-bold py-2 px-4 rounded">
                      <FaEdit className='text-teal-600' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">No reservations available</p>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
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
