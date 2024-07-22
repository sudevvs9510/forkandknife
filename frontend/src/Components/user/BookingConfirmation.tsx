import React from 'react';

type ReservationDetailsProps = {
  email: string;
  restaurantName: string;
  tableName: string;
  isOutdoor: boolean;
  guestNumber: number;
  paymentPerPerson: number;
};

const BookingConfirmation: React.FC<ReservationDetailsProps> = ({
  email,
  restaurantName,
  tableName,
  isOutdoor,
  guestNumber,
  paymentPerPerson,
}) => {
  const totalPayment = guestNumber * paymentPerPerson;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg shadow-md bg-white">
      {/* Left side details */}
      <div className="flex flex-col space-y-4 w-full md:w-1/2">
        <div>
          <label className="font-bold">User Email:</label>
          <div>{email}</div>
        </div>
        <div>
          <label className="font-bold">Restaurant Name:</label>
          <div>{restaurantName}</div>
        </div>
        <div>
          <label className="font-bold">Table Name:</label>
          <div>{tableName}</div>
        </div>
        <div>
          <label className="font-bold">Location:</label>
          <div>{isOutdoor ? 'Outdoor' : 'Indoor'}</div>
        </div>
      </div>

      {/* Right side details */}
      <div className="flex flex-col space-y-4 w-full md:w-1/2 mt-4 md:mt-0">
        <div>
          <label className="font-bold">Guest Number:</label>
          <div>{guestNumber}</div>
        </div>
        <div>
          <label className="font-bold">Payment per Person:</label>
          <div>${paymentPerPerson.toFixed(2)}</div>
        </div>
        <div>
          <label className="font-bold">Total Payment:</label>
          <div>${totalPayment.toFixed(2)}</div>
        </div>
        <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Confirm Reservation
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
