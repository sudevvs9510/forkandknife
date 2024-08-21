// import React from 'react';

// interface ConfirmCancellationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
// }

// const ConfirmCancellationModal: React.FC<ConfirmCancellationModalProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
//         <p>Are you sure you want to cancel this booking?</p>
//         <div className="mt-4 flex justify-end space-x-4">
//           <button
//             onClick={onClose}
//             className="bg-gray-200 text-gray-800 p-2 rounded"
//           >
//             No, Go Back
//           </button>
//           <button
//             onClick={onConfirm}
//             className="bg-red-600 text-white p-2 rounded"
//           >
//             Yes, Cancel Booking
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmCancellationModal;


import React, { useState } from 'react';
import toast from "react-hot-toast"

interface ConfirmCancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const ConfirmCancellationModal: React.FC<ConfirmCancellationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [cancelReason, setCancelReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!cancelReason.trim()) {
      setError('Cancellation reason is required');
      return;
    }
    setError('');
    onConfirm(cancelReason);

    toast.success('Booking cancelled successfully. Refund added to wallet.', {
      duration: 4000, // Duration the toast is displayed (in ms)
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
        <p>Are you sure you want to cancel this booking?</p>

        <div className="mt-4">
          <label htmlFor="cancelReason" className="block font-medium mb-2">
            Reason for Cancellation
          </label>
          <textarea
            id="cancelReason"
            className="w-full p-2 border border-gray-300 rounded"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Please provide a reason for cancellation"
          />
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 p-2 rounded"
          >
            No, Go Back
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-600 text-white p-2 rounded"
          >
            Yes, Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCancellationModal;
