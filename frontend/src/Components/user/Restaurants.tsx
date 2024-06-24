// import React from "react";
// import { BsStarFill, BsStarHalf } from "react-icons/bs";
// import Button from "../../layouts/Buttons";
// import { Shimmer } from "react-shimmer";
// import img from "../../assets/images/about.jpg";

// interface RestaurantDetails {
//   img: string;
//   title: string;
//   price: string;
// }

// const restaurantData: RestaurantDetails[] = [
//   { img, title: "Restaurant 1", price: "$20" },
//   { img, title: "Restaurant 2", price: "$25" },
//   { img, title: "Restaurant 3", price: "$30" },
//   { img, title: "Restaurant 4", price: "$35" },
//   { img, title: "Restaurant 5", price: "$40" },
//   { img, title: "Restaurant 6", price: "$45" },
//   { img, title: "Restaurant 7", price: "$55" },
//   { img, title: "Restaurant 8", price: "$75" },
// ];

// const RestaurantCards: React.FC<RestaurantDetails> = (props) => {
//   const [imageLoaded, setImageLoaded] = React.useState(false);

//   return (
//     <div className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
//       {!imageLoaded && (
//         <Shimmer width={300} height={200} className="rounded-xl" />
//       )}
//       <img
//         className={`rounded-xl ${!imageLoaded ? 'hidden' : ''}`}
//         src={props.img}
//         alt="Restaurant"
//         onLoad={() => setImageLoaded(true)}
//       />
//       <div className="space-y-4">
//         <h3 className="font-semibold text-center text-xl pt-6">{props.title}</h3>
//         <div className="flex flex-row justify-center">
//           <BsStarFill className="text-[#008376]" />
//           <BsStarFill className="text-[#008376]" />
//           <BsStarFill className="text-[#008376]" />
//           <BsStarFill className="text-[#008376]" />
//           <BsStarHalf className="text-[#008376]" />
//         </div>
//         <div className="flex flex-row items-center justify-center gap-4">
//           <h3 className="font-semibold text-lg">{props.price}</h3>
//           <Button title="Book now" />
//         </div>
//       </div>
//     </div>
//   );
// };

// const RestaurantList: React.FC = () => {
//   return (
//     <div id="Restaurants" className="px-4 md:px-8 lg:px-16 xl:px-32 py-4 mb-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {restaurantData.map((restaurant, index) => (
//           <RestaurantCards
//             key={index}
//             img={restaurant.img}
//             title={restaurant.title}
//             price={restaurant.price}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RestaurantList;

import React, { useEffect, useState } from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import Button from "../../layouts/Buttons";
import { Shimmer } from "react-shimmer";
import defaultImg from "../../assets/images/about.jpg"; 
import authAxios from "../../redux/api/authApi";

// interface RestaurantDetails {
//   _id: string;
//   restaurantName: string;
//   email: string;
//   contact: string;
//   address: string;
//   description: string;
//   tableRatePerPerson: number;
//   openingTime: string;
//   closingTime: string;
//   isListed: boolean;
//   isVerified: boolean;
//   isApproved: boolean;
//   isRejected: boolean;
//   secondaryImages: string[];
//   createdAt: string;
//   updatedAt: string;
// }

interface RestaurantDetails {
  _id: string;
  restaurantName: string;
  tableRatePerPerson: number;
  secondaryImages: string[];
}

const RestaurantList: React.FC = () => {
  const [restaurantData, setRestaurantData] = useState<RestaurantDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await authAxios.get('/restaurants');
        setRestaurantData(response.data.restaurant);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div id="Restaurants" className="px-4 md:px-8 lg:px-16 xl:px-32 py-4 mb-10">
      <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {restaurantData.map((restaurant) => (
          <div key={restaurant._id} className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
            <div className="w-full p-3 bg-[#00CCB8] bg-opacity-15 rounded-lg">
            {!restaurant.secondaryImages[0] ? (
                <Shimmer width={300} height={200} className="rounded-xl" />
              ) : (
                <img
                  className="rounded-xl"
                  // src={restaurant.secondaryImages[0] || defaultImg} 
                  src={defaultImg} 
                  alt="Restaurant"
                />
              )}
              <div className="space-y-4">
                <h3 className="font-semibold text-center text-xl pt-6">{restaurant.restaurantName}</h3>
                <div className="flex flex-row justify-center">
                  <BsStarFill className="text-[#008376]" />
                  <BsStarFill className="text-[#008376]" />
                  <BsStarFill className="text-[#008376]" />
                  <BsStarFill className="text-[#008376]" />
                  <BsStarHalf className="text-[#008376]" />
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                  <h3 className="font-semibold text-lg">${restaurant.tableRatePerPerson}</h3>
                  <Button title="Book now" />
                </div>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default RestaurantList;
