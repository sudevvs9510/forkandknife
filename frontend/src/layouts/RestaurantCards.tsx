// import React from "react";
// import { BsStarFill, BsStarHalf } from "react-icons/bs";
// import Button from "../layouts/Buttons";


// import img from "../assets/images/about.jpg"

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
//   return (
//     <div className="w-full p-3  bg-[#00CCB8] bg-opacity-15 rounded-lg">
//       <img className="rounded-xl" src={props.img} alt="Restaurant" />
//       <div className="space-y-4 ">
//         <h3 className="font-semibold text-center text-xl pt-6">{props.title}</h3>
//         <div className="flex flex-row justify-center">
//           <BsStarFill className="text-brightColor" />
//           <BsStarFill className="text-brightColor" />
//           <BsStarFill className="text-brightColor" />
//           <BsStarFill className="text-brightColor" />
//           <BsStarHalf className="text-brightColor" />
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
//     <div className="px-4 md:px-8 lg:px-16 xl:px-32 py-4">
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
