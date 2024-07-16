

// import React, { useEffect, useState } from 'react';
// import { FaMapMarkerAlt } from 'react-icons/fa';
// import { MdOutlineReviews } from "react-icons/md";
// import { RiRestaurantLine } from "react-icons/ri";
// import { IoPhonePortraitOutline } from "react-icons/io5";
// import { CiLocationOn } from "react-icons/ci";
// import authAxios from '../../redux/api/authApi';
// import { useParams } from 'react-router-dom';
// import GoogleMap from '../GoogleMap';
// import Loader from '../Loader';

// interface ReviewType {
//   rating: number;
//   date: string;
//   reviewText: string;
//   reviewerName: string;
//   reviewerLocation: string;
//   reviewerImage: string;
// }

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
//   reviews: ReviewType[];
//   averageRatings: {
//     overall: number;
//     food: number;
//     service: number;
//     ambience: number;
//     value: number;
//   };
//   ratingBreakdown: {
//     [key: number]: number;
//   };
// }

// const RestaurantProfile: React.FC = () => {
//   const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
//   const [guestCount, setGuestCount] = useState<number>(2);
//   const [date, setDate] = useState('2024-07-13');
//   const [time, setTime] = useState('19:00');

//   const { restaurantId } = useParams();
//   useEffect(() => {
//     authAxios.get(`/restaurant-view/${restaurantId}`)
//       .then((res) => {
//         setRestaurant(res.data.restaurant);
//       }).catch((error) => {
//         console.log(error);
//       });
//   }, [restaurantId]);

//   if (!restaurant) {
//     return <Loader/>;
//   }

//   const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${restaurant.location.coordinates[1]},${restaurant.location.coordinates[0]}`;


//   return (
//     <div>
//       <div className="bg-white">
//         {/* Top image */}
//         <div className="w-full">
//           <img
//             src={restaurant.featuredImage}
//             alt={restaurant.restaurantName}
//             className="w-full h-92 md:h-[400px] object-cover"
//           />
//         </div>

//         {/* Main content */}
//         <div className="max-w-screen-lg mx-auto px-4">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Left section */}
//             <div className="lg:w-2/3 pt-10">
//               <div className='py-4 '>
//                 <div className="flex flex-col items-start mb-4">
//                   <h1 className="text-4xl font-bold">{restaurant.restaurantName}</h1>
//                   <div className="flex items-center mt-2 space-x-4">
//                     <div className="flex items-center">
//                       <span className="text-teal-600 mr-2">★★★★☆</span>
//                       <span className="text-gray-600">4.2</span>
//                     </div>
//                     <div className="flex items-center">
//                       <MdOutlineReviews className="text-gray-600 mr-1" />
//                       <span className="text-gray-600">445 Reviews</span>
//                     </div>
//                     <div className="flex items-center">
//                       <RiRestaurantLine className="text-gray-600 mr-1" />
//                       <span className="text-gray-600">Arabic</span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-start mt-2">
//                     <div className='flex'>
//                       <CiLocationOn />
//                       <span className="text-gray-600">{restaurant.place}</span>
//                     </div>
//                     <div className='flex'>
//                       <IoPhonePortraitOutline />
//                       <span className="text-gray-600 mr-2">{restaurant.contact}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mb-6">
//                 <div className="bg-white py-2 rounded-lg ">
//                   <p className="text-gray-700">{restaurant.description}</p>
//                 </div>
//               </div>

//               {/* Secondary Images */}
//               <div className="mb-6">
//                 <h2 className="text-2xl font-bold mb-4">Gallery</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                   {restaurant.secondaryImages.map((image, index) => (
//                     <div key={index} className="w-full h-48 overflow-hidden rounded-lg shadow-lg">
//                       <img
//                         src={image}
//                         alt={`Secondary image ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Reviews Section */}
//               <div className="mb-6">
//                 <h2 className="text-2xl font-bold mb-4">What People are Saying</h2>
//                 <div className="bg-gray-100 p-4 rounded-lg mb-6">
//                   <h3 className="text-xl font-semibold mb-2">Overall ratings and reviews</h3>
//                   <p className="text-gray-700 mb-4">Reviews can only be made by diners who have eaten at this restaurant</p>
//                   <div className="flex items-center mb-4">
//                     <span className="text-teal-600 text-2xl mr-2">★★★★☆</span>
//                     <span className="text-gray-700 text-lg font-semibold">4.2 based on recent ratings</span>
//                   </div>
//                   <div className="flex justify-between mb-4">
//                     <div className="text-center">
//                       <span className="block text-xl font-bold">4.5</span>
//                       <span className="text-gray-600">Food</span>
//                     </div>
//                     <div className="text-center">
//                       <span className="block text-xl font-bold">4.0</span>
//                       <span className="text-gray-600">Service</span>
//                     </div>
//                     <div className="text-center">
//                       <span className="block text-xl font-bold">4.2</span>
//                       <span className="text-gray-600">Ambience</span>
//                     </div>
//                     <div className="text-center">
//                       <span className="block text-xl font-bold">4.1</span>
//                       <span className="text-gray-600">Value</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Placeholder for Reviews */}
//                 <div className="bg-white p-4 rounded-lg shadow-md">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-xl font-semibold">No Reviews Yet</h3>
//                   </div>
//                   <div className="text-gray-700">
//                     <p>No reviews available for this restaurant yet.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right section */}
//             <div className="lg:w-1/3 lg:sticky lg:top-20 space-y-6 pt-12">
//               <div className="border p-4 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold mb-4">Make a reservation</h2>
//                 <form className="space-y-4">
//                   <div>
//                     <label className="block text-gray-700">Number of guests</label>
//                     <select
//                       value={guestCount}
//                       onChange={(e) => setGuestCount(parseInt(e.target.value))}
//                       className="w-full border-b p-2 rounded"
//                     >
//                       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
//                         <option key={size} value={size}>{size} people</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-gray-700">Date</label>
//                     <input
//                       type="date"
//                       value={date}
//                       onChange={(e) => setDate(e.target.value)}
//                       className="w-full border-b p-2 rounded"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700">Time</label>
//                     <input
//                       type="time"
//                       value={time}
//                       onChange={(e) => setTime(e.target.value)}
//                       className="w-full border-b p-2 rounded"
//                     />
//                   </div>
//                   <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded">Reserve</button>
//                 </form>
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold mb-4">Location</h2>
//                 <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
//                   <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
//                     <div className="flex items-center space-x-4 mb-4">
//                       <FaMapMarkerAlt className="text-gray-600" />
//                       <span className="text-gray-700">{restaurant.place}</span>
//                     </div>
//                   </a>
//                   <div className="w-full">
//                     <GoogleMap
//                       latitude={restaurant.location.coordinates[1]}
//                       longitude={restaurant.location.coordinates[0]}
//                       isMarkerDraggable={false}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RestaurantProfile;




import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineReviews } from "react-icons/md";
import { RiRestaurantLine } from "react-icons/ri";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import authAxios from '../../redux/api/authApi';
import { useParams } from 'react-router-dom';
import GoogleMap from '../GoogleMap';
import Loader from '../Loader';

interface ReviewType {
  rating: number;
  date: string;
  reviewText: string;
  reviewerName: string;
  reviewerLocation: string;
  reviewerImage: string;
}

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
  reviews: ReviewType[];
  averageRatings: {
    overall: number;
    food: number;
    service: number;
    ambience: number;
    value: number;
  };
  ratingBreakdown: {
    [key: number]: number;
  };
}

const RestaurantProfile: React.FC = () => {
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [date, setDate] = useState('2024-07-13');
  const [time, setTime] = useState('19:00');

  const { restaurantId } = useParams();

  useEffect(() => {
    authAxios.get(`/restaurant-view/${restaurantId}`)
      .then((res) => {
        setRestaurant(res.data.restaurant);
      }).catch((error) => {
        console.log(error);
      });
  }, [restaurantId]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date(0, 0, 0, hour, minute, 0);
        const formattedTime = time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        slots.push(formattedTime);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  if (!restaurant) {
    return <Loader />;
  }

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${restaurant.location.coordinates[1]},${restaurant.location.coordinates[0]}`;

  return (
    <div>
      <div className="bg-white">
        {/* Top image */}
        <div className="w-full">
          <img
            src={restaurant.featuredImage}
            alt={restaurant.restaurantName}
            className="w-full h-92 md:h-[400px] object-cover"
          />
        </div>

        {/* Main content */}
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left section */}
            <div className="lg:w-2/3 pt-10">
              <div className='py-4 '>
                <div className="flex flex-col items-start mb-4">
                  <h1 className="text-4xl font-bold">{restaurant.restaurantName}</h1>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center">
                      <span className="text-teal-600 mr-2">★★★★☆</span>
                      <span className="text-gray-600">4.2</span>
                    </div>
                    <div className="flex items-center">
                      <MdOutlineReviews className="text-gray-600 mr-1" />
                      <span className="text-gray-600">445 Reviews</span>
                    </div>
                    <div className="flex items-center">
                      <RiRestaurantLine className="text-gray-600 mr-1" />
                      <span className="text-gray-600">Arabic</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start mt-2">
                    <div className='flex'>
                      <CiLocationOn />
                      <span className="text-gray-600">{restaurant.place}</span>
                    </div>
                    <div className='flex'>
                      <IoPhonePortraitOutline />
                      <span className="text-gray-600 mr-2">{restaurant.contact}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="bg-white py-2 rounded-lg ">
                  <p className="text-gray-700">{restaurant.description}</p>
                </div>
              </div>

              {/* Secondary Images */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {restaurant.secondaryImages.map((image, index) => (
                    <div key={index} className="w-full h-48 overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={image}
                        alt={`Secondary image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">What People are Saying</h2>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-2">Overall ratings and reviews</h3>
                  <p className="text-gray-700 mb-4">Reviews can only be made by diners who have eaten at this restaurant</p>
                  <div className="flex items-center mb-4">
                    <span className="text-teal-600 text-2xl mr-2">★★★★☆</span>
                    <span className="text-gray-700 text-lg font-semibold">4.2 based on recent ratings</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <span className="block text-xl font-bold">4.5</span>
                      <span className="text-gray-600">Food</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-xl font-bold">4.0</span>
                      <span className="text-gray-600">Service</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-xl font-bold">4.2</span>
                      <span className="text-gray-600">Ambience</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-xl font-bold">4.1</span>
                      <span className="text-gray-600">Value</span>
                    </div>
                  </div>
                </div>

                {/* Placeholder for Reviews */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">No Reviews Yet</h3>
                  </div>
                  <div className="text-gray-700">
                    <p>No reviews available for this restaurant yet.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="lg:w-1/3 lg:sticky lg:top-20 space-y-6 pt-12">
              <div className="border p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Make a reservation</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Number of guests</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value))}
                      className="w-full border-b p-2 rounded"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
                        <option key={size} value={size}>{size} people</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border-b p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Time</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full border-b p-2 rounded"
                    >
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded">Reserve</button>
                </form>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">

                  <div className="w-full">
                    <GoogleMap
                      latitude={restaurant.location.coordinates[1]}
                      longitude={restaurant.location.coordinates[0]}
                      isMarkerDraggable={false}
                    />
                  </div>
                  <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center space-x-4 mb-4 mt-4">
                      <FaMapMarkerAlt className="text-gray-600" />
                      <span className="text-gray-700">{restaurant.place}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantProfile;
