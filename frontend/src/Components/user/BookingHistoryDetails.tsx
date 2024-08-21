/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authAxios from '../../redux/api/authApi';
import { MdOutlineAccessTime, MdOutlineTableRestaurant } from 'react-icons/md';
import { FiUsers } from "react-icons/fi";
import { BsCalendarDate } from "react-icons/bs";
import { RiHotelLine } from "react-icons/ri";
import formatDateString from "../../helpers/DateFormat"
import Loader from "../Loader"

interface BookingData {
  restaurantName: string;
  bookingDate: string;
  bookingTime: string;
  tableNumber: string;
  guests: number;
  bookingId: string;
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
    case 'checkedin':
      return 'text-blue-600';
    case 'pending':
      return 'text-orange-600';
    case 'completed':
      return 'text-teal-600';
    default:
      return 'text-teal-600';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'text-green-600';
    case 'pending':
      return 'text-orange-600';
    case 'failed':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};



const BookingDetails: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        if (bookingId) {
          const res = await authAxios.get(`/booking-details/${bookingId}`);
          console.log('API Response:', res.data);
          const booking = res.data.bookingData;
          setBookingData({
            restaurantName: booking.restaurantId.restaurantName,
            bookingDate: booking.bookingDate,
            bookingTime: booking.bookingTime,
            tableNumber: booking.tableId.tableNumber,
            guests: booking.tableId.tableCapacity,
            bookingId: booking.bookingId,
            paymentMethod: booking.paymentMethod,
            paymentStatus: booking.paymentStatus,
            bookingStatus: booking.bookingStatus,
            totalAmount: booking.totalAmount,
          });
        } else {
          console.error("Invalid booking ID");
        }
      } catch (error) {
        console.error("Error fetching booking data", error);
      }
    };
    fetchBookingData();
  }, [bookingId]);

  if (!bookingData) {
    return <div className="text-center py-10"><Loader /></div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl mt-10 shadow-md flex flex-col justify-center items-center space-y-6 md:space-y-0 md:flex-row md:space-x-6">
      <div className="w-full md:w-auto px-4 md:px-0">
        <h2 className="text-xl md:text-3xl font-bold mb-10 text-center">Booking Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xl md:text-2xl font-medium mb-2"><RiHotelLine className="inline-block mr-2" size={24}/> <span className='text-teal-600 '>{bookingData.restaurantName}</span></p>
            <p className="text-md md:text-lg mb-2 font-medium"><BsCalendarDate className="inline-block mr-2" size={24}/><span className="font-medium"></span> {formatDateString(bookingData.bookingDate)}</p>
            <p className="text-md md:text-lg mb-2 font-medium"><MdOutlineAccessTime className="inline-block mr-2"size={24} /> {bookingData.bookingTime}</p>
            <p className="text-md md:text-lg mb-2 font-medium"><MdOutlineTableRestaurant  className="inline-block mr-2" size={24}/> {bookingData.tableNumber}</p>
            <p className="text-md md:text-lg mb-2 font-medium"><FiUsers className="inline-block mr-2" size={24}/> <span className='text-teal-600'>{bookingData.guests}</span> <span className="font-medium">Guests</span></p>
          </div>
          <div>
            <p className="text-md md:text-xl mb-2"><span className="font-medium">Booking ID:</span> <span className='text-teal-600 '>{bookingData.bookingId}</span></p>
            <p className="text-md md:text-lg mb-2"><span className="font-medium">Payment Method:</span> <span className='text-green-600 font-semibold'>{bookingData.paymentMethod}</span></p>
            <p className='text-md md:text-lg mb-2'>
              <span className="font-medium">Payment Status:</span>
              <span className={`ml-2 font-semibold ${getPaymentStatusColor(bookingData.paymentStatus)}`}>
                {bookingData.paymentStatus}
              </span>
            </p>
            <p className='text-md md:text-lg mb-2'>
              <span className="font-medium">Booking Status:</span>
              <span className={`ml-2 font-semibold ${getStatusColor(bookingData.bookingStatus)}`}>
                {bookingData.bookingStatus}
              </span>
            </p>
            <p className="text-md md:text-lg mb-2 font-medium"><span className="font-medium">Amount Paid </span>  <span className='font-bold'>₹{bookingData.totalAmount.toFixed(2)}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
