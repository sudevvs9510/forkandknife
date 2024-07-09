// import React, {  useEffect, useState } from 'react';
// import { FaMapMarkerAlt, FaUtensils, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
// import MainNavBar from './MainNavBar';
// import authAxios from '../../redux/api/authApi';
// import { useParams } from 'react-router-dom';



// interface RestaurantType {
//   location: { type: string, coordinates: [number, number] },
//   _id: string,
//   restaurantName: string,
//   email: string,
//   contact: string,
//   role: string,
//   address: string,
//   description: string,
//   TableRate: string,
//   place: string,
//   openingTime: string,
//   closingTime: string,
//   featuredImage: string,
//   secondaryImages: string[],
// }

// const RestaurantProfile: React.FC = () => {
//   const [restaurant, setRestaurant] = useState<RestaurantType | null>(null)
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);

//   const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedDate(event.target.value);
//   };
//   console.log(restaurant)

//   const { restaurantId } = useParams();
//   useEffect(()=>{
//     authAxios.get(`/restaurant-view/${restaurantId}`)
//     .then((res)=>{
//       console.log(res.data)
//       setRestaurant(res.data.restaurant)
//     }).catch((error)=>{
//       console.log(error)
//     })
//   },[restaurantId])

//   if(!restaurant){
//     return <div> Loading...</div>
//   }

//   return (
//     <div>
//       <MainNavBar />
//       <div className="pt-20 flex flex-col items-center bg-gray-100 p-6 min-h-screen">
//         <div className='container mx-auto px-4 py-6'>
//           <div className="w-full max-w-7lg bg-white rounded-lg shadow-lg">
//             <div className="relative">
//               <img
//                 src={restaurant.featuredImage}
//                 alt={restaurant.restaurantName}
//                 className="w-full h-80 object-cover rounded-t-lg"
//               />
//               {/* <div className="absolute top-0 right-0 bg-black text-white text-sm p-2 m-2 rounded">694 photos</div> */}
//             </div>
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row justify-between items-center mb-4">
//                 <h1 className="text-3xl font-bold">{restaurant.restaurantName}</h1>
//                 <div className="flex items-center space-x-2 text-xl mt-2 md:mt-0">
//                   <span>9.1/10</span>
//                   <span className="text-sm text-gray-500">20470 reviews</span>
//                 </div>
//               </div>
//               <div className="flex flex-col space-y-4 mb-6">
//                 <div className="flex items-center space-x-4">
//                   <FaMapMarkerAlt className="text-gray-600" />
//                   <a href="#" className="text-blue-500">{restaurant.place}</a>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <FaUtensils className="text-gray-600" />
//                   <span>Kerala </span>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <FaRupeeSign className="text-gray-600" />
//                   <span>{restaurant.TableRate} per table</span>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <span>{restaurant.description}</span>
//                 </div>
//               </div>
//               <div className="flex items-center mb-6">
//                 <FaCalendarAlt className="text-gray-600 mr-2" />
//                 <input
//                   type="date"
//                   value={selectedDate ?? ""}
//                   onChange={handleDateChange}
//                   className="border rounded px-3 py-2"
//                 />
//                 <span className="ml-2">Already 7 bookings today</span>
//               </div>
//               <div className="flex flex-col items-center mb-6">
//                 <button className="bg-[#00655B] text-white px-6 py-2 rounded hover:bg-[#004d43]">
//                   Get up to 50% off
//                 </button>
//                 <span className="text-gray-500 text-sm mt-2">Conditions may apply</span>
//               </div>
//               {/* <div className="flex flex-col lg:flex-row justify-between mb-6">
//                 <div className="flex flex-col items-start mb-6 lg:mb-0">
//                   <h2 className="text-2xl font-bold mb-4">Bookable on Fork and Knife</h2>
//                   <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//                     <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full md:w-auto">
//                       <h3 className="text-xl font-semibold mb-2">Menu</h3>
//                       <p className="text-gray-700 mb-2">€39.9 per guest</p>
//                       <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-sm">Permanent TheFork offer</span>
//                       <button className="mt-4 bg-white border border-gray-300 rounded px-4 py-2 hover:bg-gray-100">See Menu Details</button>
//                     </div>
//                     <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full md:w-auto">
//                       <h3 className="text-xl font-semibold mb-2">Formule</h3>
//                       <p className="text-gray-700 mb-2">€19.9 per guest</p>
//                       <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-sm">Permanent TheFork offer</span>
//                       <button className="mt-4 bg-white border border-gray-300 rounded px-4 py-2 hover:bg-gray-100">See Menu Details</button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-full lg:w-1/2">
//                   <h2 className="text-2xl font-bold mb-4">Find a table</h2>
//                   <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
//                     <div className="flex items-center mb-4">
//                       <FaCalendarAlt className="text-gray-600 mr-2" />
//                       <input
//                         type="date"
//                         value={selectedDate ?? ""}
//                         onChange={handleDateChange}
//                         className="border rounded px-3 py-2"
//                       />
//                     </div>
//                     <div className="flex space-x-2 mb-4">
//                       {[1, 2, 3, 4, 5, 6].map(num => (
//                         <button key={num} className="bg-gray-200 rounded-full px-4 py-2">{num}</button>
//                       ))}
//                     </div>
//                     <div className="flex flex-col items-center mb-4">
//                       <span className="text-gray-500 text-sm">Offers are based on time, date, and number of guests and may vary as you continue the booking process.</span>
//                     </div>
//                     <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700">Can't find the date you want?</button>
//                     <span className="text-gray-500 text-sm mt-2">Find a table at a similar restaurant</span>
//                   </div>
//                 </div>
//               </div>
//               <h2 className="text-2xl font-bold mb-4">Popular dishes</h2>
//               <div className="flex space-x-4 overflow-x-auto mb-6">
//                 {['Dish 1', 'Dish 2', 'Dish 3'].map((dish, index) => (
//                   <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg w-80 flex-shrink-0">
//                     <img src="https://via.placeholder.com/150" alt="Dish" className="w-full h-40 object-cover rounded-lg mb-4" />
//                     <h3 className="text-xl font-semibold mb-2">{dish}</h3>
//                     <p className="text-gray-700">Description of the popular dish.</p>
//                   </div>
//                 ))}
//               </div> */}
//               <h2 className="text-2xl font-bold mb-4">About the restaurant</h2>
//               <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
//                 <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viverra ante luctus vel. Donec vel mauris quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viverra ante luctus vel. Donec vel mauris quam.</p>
//               </div>
//               <h2 className="text-2xl font-bold mb-4">Location & How to get there</h2>
//               <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
//                 <p className="text-gray-700 mb-4">10, rue Delambre, 75014 Paris</p>
//                 <div className="flex items-center space-x-4 mb-4">
//                   <FaMapMarkerAlt className="text-gray-600" />
//                   <span className="text-gray-700">Montparnasse - Line 4, 6, 12, 13</span>
//                 </div>
//               </div>
//               <h2 className="text-2xl font-bold mb-4">Opening hours</h2>
//               <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
//                 <p className="text-gray-700 mb-4">Monday - Saturaday: {restaurant.openingTime} - 11:00 PM</p>
        
//               </div>
//               <h2 className="text-2xl font-bold mb-4">Reviews</h2>
//               <div className="flex flex-col lg:flex-row justify-between mb-6">
//                 <div className="w-full lg:w-1/2">
//                   <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
//                     <h3 className="text-xl font-semibold mb-2">Overall rating</h3>
//                     <div className="flex space-x-4 mb-4">
//                       <span className="text-gray-500">Food</span>
//                       <span>9.1/10</span>
//                     </div>
//                     <div className="flex space-x-4 mb-4">
//                       <span className="text-gray-500">Service</span>
//                       <span>9.3/10</span>
//                     </div>
//                     <div className="flex space-x-4 mb-4">
//                       <span className="text-gray-500">Ambience</span>
//                       <span>8.9/10</span>
//                     </div>
//                     <div className="bg-gray-200 p-4 rounded-lg">
//                       <h3 className="text-xl font-semibold mb-2">Real experiences from real diners</h3>
//                       <p className="text-gray-700 mb-2">Ratings and reviews can only be left by guests who have booked with TheFork.</p>
//                       <a href="#" className="text-blue-500">How do we calculate ratings?</a>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-full lg:w-1/2">
//                   <h3 className="text-xl font-semibold mb-2">What diners said about this restaurant:</h3>
//                   <div className="flex flex-wrap space-x-2 mb-4">
//                     <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Good value for money</span>
//                     <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Short waiting time</span>
//                     <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Moderate noise level</span>
//                   </div>
//                   <div className="flex flex-col space-y-4">
//                     <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
//                       <h4 className="text-xl font-semibold mb-2">Mary S.</h4>
//                       <p className="text-gray-700">0 reviews</p>
//                     </div>
//                     <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
//                       <h4 className="text-xl font-semibold mb-2">John D.</h4>
//                       <p className="text-gray-700">2 reviews</p>
//                     </div>
//                     <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
//                       <h4 className="text-xl font-semibold mb-2">Anna R.</h4>
//                       <p className="text-gray-700">3 reviews</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantProfile;







// RestaurantProfile.tsx
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaUtensils, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import MainNavBar from './MainNavBar';
import authAxios from '../../redux/api/authApi';
import { useParams } from 'react-router-dom';
import GoogleMap from '../GoogleMap'; // Import your GoogleMap component

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
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
      <div className="pt-20 flex flex-col items-center bg-gray-100 p-6 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg">
            <div className="relative">
              <img
                src={restaurant.featuredImage}
                alt={restaurant.restaurantName}
                className="w-full h-80 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6 flex flex-col lg:flex-row">
              <div className="w-full lg:w-2/3 lg:pr-6 mb-6 lg:mb-0">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">{restaurant.restaurantName}</h1>
                    <div className="flex items-center space-x-2 text-xl">
                      <span>9.1/10</span>
                      <span className="text-sm text-gray-500">20470 reviews</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <a href="#" className="text-blue-500">{restaurant.place}</a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaUtensils className="text-gray-600" />
                    <span>Kerala</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaRupeeSign className="text-gray-600" />
                    <span>{restaurant.TableRate} per table</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{restaurant.description}</span>
                  </div>
                </div>
                <div className="flex items-center mt-6 mb-4">
                  <FaCalendarAlt className="text-gray-600 mr-2" />
                  <input
                    type="date"
                    value={selectedDate ?? ""}
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
              
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">About the restaurant</h2>
              <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
                <p className="text-gray-700 mb-4">{restaurant.description}</p>
              </div>
              <h2 className="text-2xl font-bold mb-4">Location & How to get there</h2>
              <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
                <p className="text-gray-700 mb-4">{restaurant.address}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <FaMapMarkerAlt className="text-gray-600" />
                  <span className="text-gray-700">{restaurant.place}</span>
                </div>
                <div className="w-full lg:w-1/3">
                <GoogleMap
                  latitude={restaurant.location.coordinates[1]}
                  longitude={restaurant.location.coordinates[0]}
                  isMarkerDraggable={false}
                />
              </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Opening hours</h2>
              <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
                <p className="text-gray-700 mb-4">Monday - Saturday: {restaurant.openingTime} - {restaurant.closingTime}</p>
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
  );
};

export default RestaurantProfile;
