// import React, { useEffect } from 'react';
// import { FaCheckCircle } from 'react-icons/fa';
// import { Link, useLocation } from 'react-router-dom';
// import authAxios from '../../redux/api/authApi';

// const PaymentSuccess: React.FC = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const bookingId = queryParams.get('bookingId');
//   const tableSlotId = queryParams.get('tableSlotId');

//   console.log(bookingId, tableSlotId)

//   useEffect(() => {
//     const updateBookingAndSlotStatus = async () => {
//       if (bookingId && tableSlotId) {
//         try {
//           const response = await authAxios.post('/update-slot-and-booking-status', { bookingId, tableSlotId });
//           console.log('Booking and table slot updated successfully', response);
//           return response.data
//         } catch (error) {
//           console.error('Failed to update booking and table slot:', error);
//         }
//       }
//     };

//     updateBookingAndSlotStatus();
//   }, [bookingId, tableSlotId]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-green-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
//         <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
//         <h1 className="text-2xl font-bold mt-4">Payment Successful!</h1>
//         <p className="mt-2">Thank you for your payment. Your booking has been confirmed.</p>
//         <Link to="/" className="inline-block mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
//           Go to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;


import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import authAxios from '../../redux/api/authApi';

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get('bookingId');
  const tableSlotId = queryParams.get('tableSlotId');
  const status = queryParams.get('status'); // Get the status query parameter

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
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
        <h1 className="text-2xl font-bold mt-4">Payment Successful!</h1>
        <p className="mt-2">Thank you for your payment. Your booking has been confirmed.</p>
        <Link to="/" className="inline-block mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;


