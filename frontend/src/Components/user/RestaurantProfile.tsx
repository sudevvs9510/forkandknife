import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign, FaClock } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MainNavBar from './MainNavBar';
import authAxios from '../../redux/api/authApi';
import { useParams } from 'react-router-dom';
import GoogleMap from '../GoogleMap';

interface RestaurantType {
  location: { type: string, coordinates: [number, number] },
  _id: string,
  restaurantName: string,
  email: string,
  contact: string,
  role: string,
  address: string,
  description: string,
  TableRate: string,
  place: string,
  openingTime: string,
  closingTime: string,
  featuredImage: string,
  secondaryImages: string[],
}

const RestaurantProfile: React.FC = () => {
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const { restaurantId } = useParams();
  useEffect(() => {
    authAxios.get(`/restaurant-view/${restaurantId}`)
      .then((res) => {
        setRestaurant(res.data.restaurant);
      }).catch((error) => {
        console.log(error);
      });
  }, [restaurantId]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MainNavBar />
      <div className="pt-20 flex flex-col items-center bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <div className="w-full bg-white">
            <div className="relative">
              <img
                src={restaurant.featuredImage}
                alt={restaurant.restaurantName}
                className="w-full h-80 object-cover rounded-t-lg"
              />
            </div>
            <div className="px-4 sm:px-6 lg:px-8 py-6 mx-20">

              <div className="w-full lg:w-2/3 lg:pr-6 mb-6 lg:mb-0">

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">{restaurant.restaurantName}</h1>
                    <div className="flex items-center space-x-2 text-xl">
                      <span>9.1/10</span>
                      <span className="text-sm text-gray-500">20470 reviews</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{restaurant.description}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <a href="#" className="text-blue-500">{restaurant.place}</a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaClock className="text-gray-600" />
                    <span>{restaurant.openingTime} am - {restaurant.closingTime} pm</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaRupeeSign className="text-gray-600" />
                    <span>{restaurant.TableRate} per table</span>
                  </div>
                </div>

                <hr className='my-10'></hr>
                <div className="container flex flex-col lg:flex-row">
                  <div className="flex items-center mt-6 mb-4">
                    <FaCalendarAlt className="text-gray-600 mr-2" />
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      className="border rounded px-3 py-2"
                    />
                    <span className="ml-2">Already 7 bookings today</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <button className="bg-[#00655B] text-white px-6 py-2 rounded hover:bg-[#004d43]">
                      Get up to 50% off
                    </button>
                    <span className="text-gray-500 text-sm mt-2">Conditions may apply</span>
                  </div>
                </div>

                <div className="lg:w-1/3 lg:pl-6">
                  <h2 className="text-2xl font-bold mb-4">Location</h2>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
                    <p className="text-gray-700 mb-4">{restaurant.address}</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <FaMapMarkerAlt className="text-gray-600" />
                      <span className="text-gray-700">{restaurant.place}</span>
                    </div>
                    <div className="w-full">
                      <GoogleMap
                        latitude={restaurant.location.coordinates[1]}
                        longitude={restaurant.location.coordinates[0]}
                        isMarkerDraggable={false}
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Opening hours</h2>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                    <p className="text-gray-700 mb-4">Monday - Saturday: {restaurant.openingTime} AM - {restaurant.closingTime} PM</p>
                  </div>
                </div>

              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">About the restaurant</h2>
                <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
                  <p className="text-gray-700 mb-4">{restaurant.description}</p>
                </div>
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                <div className="flex flex-col lg:flex-row justify-between mb-6">
                  <div className="w-full lg:w-1/2">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
                      <h3 className="text-xl font-semibold mb-2">Overall rating</h3>
                      <div className="flex space-x-4 mb-4">
                        <span className="text-gray-500">Food</span>
                        <span>9.1/10</span>
                      </div>
                      <div className="flex space-x-4 mb-4">
                        <span className="text-gray-500">Service</span>
                        <span>9.3/10</span>
                      </div>
                      <div className="flex space-x-4 mb-4">
                        <span className="text-gray-500">Ambience</span>
                        <span>8.9/10</span>
                      </div>
                      <div className="bg-gray-200 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Real experiences from real diners</h3>
                        <p className="text-gray-700 mb-2">Ratings and reviews can only be left by guests who have booked with TheFork.</p>
                        <a href="#" className="text-blue-500">How do we calculate ratings?</a>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Services</h2>
                <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
                  <div className="flex flex-wrap space-x-2 mb-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Wi-Fi</span>
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Air conditioning</span>
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Parking</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mb-6">
                <button className="bg-[#00655B] text-white px-6 py-2 rounded hover:bg-[#004d43]">Make a reservation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
