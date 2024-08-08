// import React, { useState } from 'react';
// import { FaClock, FaMapMarkerAlt, FaTable, FaUserFriends } from 'react-icons/fa';
// import { useAppSelector, RootState } from '../../redux/app/store';
// import { loadStripe } from "@stripe/stripe-js";
// import authAxios from '../../redux/api/authApi';

// const ReservationDetails: React.FC = () => {
//   const {
//     selectedTable,
//     slotStartTime,
//     slotEndTime,
//     restaurantName,
//     guests,
//     tableRate,
//     restaurantId
//   } = useAppSelector((state: RootState) => state.bookingConfirmation);


//   const userData = useAppSelector((state: RootState) => state.userAuth.user)
//   console.log(userData)

//   const [paymentMethod, setPaymentMethod] = useState<string>('Online');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   if (!selectedTable || !slotStartTime || !slotEndTime || !restaurantName || !guests || !tableRate || !restaurantId) {
//     return null;
//   }

//   const tableRateNum = parseFloat(tableRate);

//   const makePayment = async () => {
//     setLoading(true);
//     setError(null);
//     // try{
//     const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY as string)
//     await authAxios.post("/make-payment", {
//       restaurantDatas: {
//         tableRate: tableRateNum,
//         guests,
//       },
//       userId: userData._id,
//       userEmail: userData.email,
//       userUsername: userData.username,
//       restaurantId: restaurantId,
//       tableSlotId: selectedTable._id,
//     })

//       .then((res) => {
//         console.log(res)
//         stripe?.redirectToCheckout({
//           sessionId: res.data.sessionId
//         })
//       }).catch((error) => {
//         console.log(error)
//       })
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white p-4 border rounded-lg shadow-md z-10 max-w-md w-full relative">
//         <h1 className='font-bold text-[25px] text-center pb-2'>Booking Summary</h1>
//         <hr className='pb-2'></hr>
//         <h3 className="text-[23px] font-bold mb-4 text-teal-600">{restaurantName}</h3>
//         <div className='flex flex-col align-center'>
//           <p><FaTable className="inline-block size-5 mr-2 mb-2 text-teal-600" /> <strong>Table Number:</strong> {selectedTable.tableNumber} (<strong>Capacity:</strong> {selectedTable.tableCapacity} people)</p>
//           <p><FaMapMarkerAlt className="inline-block size-5 mr-2 mb-2 text-teal-600" /> <strong>Table Location:</strong> {selectedTable.tableLocation}</p>
//           <p><FaClock className="inline-block size-5 mr-2 mb-2 text-teal-600" /> <strong>Selected Time:</strong> {slotStartTime} - {slotEndTime}</p>
//           <p><FaUserFriends className="inline-block size-5 mr-2 mb-2 text-teal-600" /> <strong>{guests} Guests </strong></p>

//           <hr className='my-4'></hr>

//           <h3 className='font-bold text-[24px]'>Total Charges</h3>
//           <p><strong>Amount per person:</strong> ₹{tableRateNum.toFixed(2)}</p>
//           <p><strong>Total Amount:</strong> ₹{(tableRateNum * guests).toFixed(2)}</p>

//           <br></br>

//           <h3 className='font-bold'>Payment Method</h3>
//           <div>
//             <label className="inline-flex items-center mt-2">
//               <input
//                 type="radio"
//                 className="form-radio"
//                 name="paymentMethod"
//                 value="Online"
//                 checked={paymentMethod === 'Online'}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               <span className="ml-2">Online</span>
//             </label>
//           </div>

//           <button
//             className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200 mt-4"
//             onClick={makePayment}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReservationDetails;



import React, { useState } from 'react';
import { FaClock, FaMapMarkerAlt, FaTable, FaUserFriends } from 'react-icons/fa';
import { useAppSelector, RootState } from '../../redux/app/store';
import { loadStripe } from "@stripe/stripe-js";
import authAxios from '../../redux/api/authApi';

const ReservationDetails: React.FC = () => {
  const {
    selectedTable,
    slotStartTime,
    slotEndTime,
    restaurantName,
    guests,
    tableRate,
    restaurantId,
    tableSlotId,
    bookingDate
  } = useAppSelector((state: RootState) => state.bookingConfirmation);


  const userData = useAppSelector((state: RootState) => state.userAuth.user);

  const [paymentMethod, setPaymentMethod] = useState<string>('Online');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!selectedTable || !slotStartTime || !slotEndTime || !restaurantName || !guests || !tableRate || !restaurantId || !tableSlotId ||!bookingDate) {
    return null;
  }

  const tableRateNum = parseFloat(tableRate);

  const makePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY as string);
      const response = await authAxios.post("/make-payment", {
        restaurantDatas: {
          tableRate: tableRateNum,
          guests,
        },
        userId: userData._id,
        userEmail: userData.email,
        userUsername: userData.username,
        restaurantId: restaurantId,
        tableId: selectedTable._id,
        bookingTime: slotStartTime,
        tableSlotId: tableSlotId,
        bookingDate
      });
      console.log(response.data)

      stripe?.redirectToCheckout({
        sessionId: response.data.sessionId
      });
    } catch (error) {
      setError("Failed to initiate payment. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 border rounded-lg shadow-md z-10 max-w-md w-full relative">
        <h1 className='font-bold text-[25px] text-center pb-2'>Booking Summary</h1>
        <hr className='pb-2'></hr>
        <h3 className="text-[23px] font-bold mb-4 text-teal-600">{restaurantName}</h3>
        <div className='flex flex-col align-center'>
          <p><FaTable className="inline-block size-5 mr-2 mb-2 text-teal-600" /> <strong>Table Number:</strong> {selectedTable.tableNumber} (<strong>Capacity:</strong> {selectedTable.tableCapacity} people)</p>
          <p><FaMapMarkerAlt className="inline-block size-5 mr-2 mb-2 text-teal-600" /> <strong>Table Location:</strong> {selectedTable.tableLocation}</p>
          <p><FaClock className="inline-block size-5 mr-2 mb-2 text-teal-600" /> <strong>Selected Time:</strong> {slotStartTime} - {slotEndTime}</p>
          <p><FaUserFriends className="inline-block size-5 mr-2 mb-2 text-teal-600" /> <strong>{guests} Guests </strong></p>

          <hr className='my-4'></hr>

          <h3 className='font-bold text-[24px]'>Total Charges</h3>
          <p><strong>Amount per person:</strong> ₹{tableRateNum.toFixed(2)}</p>
          <p><strong>Total Amount:</strong> ₹{(tableRateNum * guests).toFixed(2)}</p>

          <br></br>

          <h3 className='font-bold'>Payment Method</h3>
          <div>
            <label className="inline-flex items-center mt-2">
              <input
                type="radio"
                className="form-radio"
                name="paymentMethod"
                value="Online"
                checked={paymentMethod === 'Online'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">Online</span>
            </label>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          
          <button
            className={`bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200 mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={makePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;

