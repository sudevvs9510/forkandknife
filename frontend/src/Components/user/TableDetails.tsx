import React, { useEffect } from 'react';
import { FaTimes, FaTable, FaUserFriends, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/app/store';
import { setReservationDetails } from '../../redux/reducers/userSlices/BookingConfimrationSlice';

interface TableDetailsProps {
  selectedTable: {
    _id :string;
    tableNumber: string;
    tableCapacity: number;
    tableLocation: string;
  } | null;
  slotStartTime: string | null;
  slotEndTime: string | null;
  guests: number;
  tableRate: string;
  isOpen: boolean;
  onRequestClose: () => void;
  restaurantName: string;
  restaurantId: string,
  tableSlotId: string
}

const TableDetails: React.FC<TableDetailsProps> = ({
  selectedTable,
  slotStartTime,
  slotEndTime,
  isOpen,
  onRequestClose,
  restaurantName,
  guests,
  tableRate,
  restaurantId,
  tableSlotId
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedTable && isOpen) {
      dispatch(
        setReservationDetails({
          selectedTable,
          slotStartTime,
          slotEndTime,
          guests,
          tableRate,
          restaurantName,
          restaurantId,
          tableSlotId
        })
      );
    }
  }, [dispatch, selectedTable, slotStartTime, slotEndTime, isOpen, guests, tableRate, restaurantName, tableSlotId]);

  if (!selectedTable || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 border rounded-lg shadow-md z-10 max-w-md w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onRequestClose}
        >
          <FaTimes />
        </button>
        <h1 className="font-semibold pb-2">Complete your reservation</h1>
        <hr className="pb-2"></hr>
        <h3 className="text-[30px] font-bold mb-4 text-teal-600">{restaurantName}</h3>
        <div className="flex flex-col align-center">
          <p>
            <FaTable className="inline-block size-5 mr-2 mb-2 text-teal-600" />
            <strong>Table Number:</strong> {selectedTable.tableNumber} (<strong>Capacity:</strong> {selectedTable.tableCapacity} people)
          </p>
          <p>
            <FaMapMarkerAlt className="inline-block size-5 mr-2 mb-2 text-teal-600" />
            <strong>Table Location:</strong> {selectedTable.tableLocation}
          </p>
          <p>
            <FaClock className="inline-block size-5 mr-2 mb-2 text-teal-600" />
            <strong>Selected Time:</strong> {slotStartTime} - {slotEndTime}
          </p>
          <p>
            <FaUserFriends className="inline-block size-5 mr-2 mb-2 text-teal-600" />
            <strong>{guests} Guests </strong>
          </p>
          <p>{tableSlotId}</p>
        
          <Link to="/booking-confirmation">
            <button
              className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200 mt-4"
            >
              Continue Reservation
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TableDetails;
