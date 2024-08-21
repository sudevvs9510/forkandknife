

import React, { useEffect } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import authAxios from '../../redux/api/authApi';

const PaymentFailure: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get('bookingId');
  const tableSlotId = queryParams.get('tableSlotId');
  const status = 'false'; // Indicate failure

  useEffect(() => {
    const updateBookingAndSlotStatus = async () => {
      if (bookingId && tableSlotId) {
        try {
          const response = await authAxios.post('/update-slot-and-booking-status', { bookingId, tableSlotId, status });
          console.log('Booking and table slot updated successfully', response);
        } catch (error) {
          console.error('Failed to update booking and table slot:', error);
        }
      }
    };

    updateBookingAndSlotStatus();
  }, [bookingId, tableSlotId, status]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto" />
        <h1 className="text-2xl font-bold mt-4">Payment Failed</h1>
        <p className="mt-2">We're sorry, but your payment could not be processed. Please try again.</p>
        <Link to="/" className="inline-block mt-4 ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailure;

