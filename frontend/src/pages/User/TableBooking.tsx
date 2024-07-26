import React from 'react';
import Navbar from '../../Components/user/Navbar';
import BookingConfirmation from '../../Components/user/BookingConfirmation';


const BookingConfirm: React.FC = () => {

  return (
    <div className="">
      <Navbar />
      <div className="pt-20">
        <BookingConfirmation />
      </div>
    </div>
  );
};

export default BookingConfirm;
