import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaCalendarAlt, FaClock, FaUsers, FaIdBadge, FaCreditCard, FaInfoCircle, FaRupeeSign } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { MdTableRestaurant } from 'react-icons/md';
import Loader from '../Loader';
import formatDateString from "../../helpers/DateFormat";
import { getReservationDetails, updateBookingStatus } from '../../api/RestaurantApis';
import { toast } from 'react-hot-toast';

interface ReservationDetails {
  username: string;
  email: string;
  tableNumber: string;
  date: string;
  time: string;
  guests: number;
  bookingId: string;
  paymentMethod: string;
  bookingStatus: string;
  amountPaid: number;
}

const UpdateReservation: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [reservation, setReservation] = useState<ReservationDetails | null>(null);
  const [originalReservation, setOriginalReservation] = useState<ReservationDetails | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const data = await getReservationDetails(bookingId as string);
        const reservationData: ReservationDetails = {
          username: data.userId.username,
          email: data.userId.email,
          tableNumber: data.tableId.tableNumber,
          date: formatDateString(data.bookingDate),
          time: data.bookingTime,
          guests: data.tableId.tableCapacity,
          bookingId: data.bookingId,
          paymentMethod: data.paymentMethod,
          bookingStatus: data.bookingStatus,
          amountPaid: data.totalAmount,
        };

        setReservation(reservationData);
        setOriginalReservation(reservationData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservationData();
  }, [bookingId]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReservation((prev) => prev ? { ...prev, bookingStatus: e.target.value } : null);
  };

  useEffect(() => {
    if (reservation && originalReservation) {
      const hasChanged = reservation.bookingStatus !== originalReservation.bookingStatus;
      setIsChanged(hasChanged);
    }
  }, [reservation, originalReservation]);

  const handleUpdate = async () => {
    if (reservation) {
      try {
        const updatedData = await updateBookingStatus(reservation.bookingId, reservation.bookingStatus);
        console.log('Updated reservation:', updatedData);
        toast.success('Booking status updated successfully!');
        setOriginalReservation(reservation); 
        setIsChanged(false);
      } catch (error) {
        console.log('Error updating reservation:', error);
        toast.error('Failed to update booking status.');
      }
    }
  };

  return (
    <div className="w-full bg-white shadow-lg flex flex-col items-center rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Update Reservation</h2>
      {reservation ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Customer Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Customer Information</h3>
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-700" />
              <span className="text-gray-700">Name: {reservation.username}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-700" />
              <span className="text-gray-700">Email: {reservation.email}</span>
            </div>

            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-700" />
              <span className="text-gray-700">{reservation.date}</span>
              <FaClock className="text-gray-700" />
              <span className="text-gray-700">{reservation.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MdTableRestaurant className="text-gray-700" />
              <span className="text-gray-700">{reservation.tableNumber}</span>
              <FaUsers className="text-gray-700" />
              <span className="text-gray-700">{reservation.guests} Guests</span>
            </div>
          </div>

          {/* Right Section: Booking Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Booking Details</h3>
            <div className="flex items-center space-x-2">
              <FaIdBadge className="text-gray-700" />
              <span className="text-gray-700">Booking ID: <span className='text-teal-600'>{reservation.bookingId}</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCreditCard className="text-gray-700" />
              <span className="text-gray-700">Payment Method: <span className='text-green-600 font-semibold'>{reservation.paymentMethod}</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <FaInfoCircle className="text-gray-700" />
              <span>Booking Status:</span>
              <select
                value={reservation.bookingStatus}
                onChange={handleStatusChange}
                className="border border-gray-300 rounded p-1"
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CHECKED">Checked In</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <FaRupeeSign className="text-gray-700" />
              <span className="text-gray-700 ">Amount Paid: <span className='font-bold'>₹{reservation.amountPaid.toFixed(2)}</span></span>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      {/* Update Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleUpdate}
          className={`bg-teal-600 text-white px-6 py-2 rounded-lg ${!isChanged && 'opacity-50 cursor-not-allowed'}`}
          disabled={!isChanged}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateReservation;
