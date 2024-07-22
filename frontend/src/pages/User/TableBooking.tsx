import React from 'react';
import Navbar from '../../Components/user/Navbar';
import BookingConfirmation from '../../Components/user/BookingConfirmation';
// import Footer from '../../Components/User/Footer';

const RestaurantFullDetails: React.FC = () => {
  return (
    <div className="">
      <Navbar />
      <div className="pt-20">
        <BookingConfirmation
          email="user@example.com"
          restaurantName="Awesome Restaurant"
          tableName="Table 1"
          isOutdoor={false}
          guestNumber={4}
          paymentPerPerson={25.00}
        />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default RestaurantFullDetails;
