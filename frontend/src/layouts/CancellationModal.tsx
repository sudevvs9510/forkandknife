import React from 'react';

interface ConfirmCancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmCancellationModal: React.FC<ConfirmCancellationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
        <p>Are you sure you want to cancel this booking?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 p-2 rounded"
          >
            No, Go Back
          </button>
          <button
            onClick={onConfirm}
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
