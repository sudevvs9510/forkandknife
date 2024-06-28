/* eslint-disable @typescript-eslint/no-explicit-any */


// import React, { ChangeEvent, useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { useFormik } from 'formik';
// import 'react-toastify/dist/ReactToastify.css';
// import { RestaurantValues, sellerRegistrationValidation } from "../../helpers/validation";
// import GoogleMap from '../GoogleMap';
// import authAxios from '../../redux/api/authApi';

// const RestaurantDetails: React.FC = () => {
//   const [restaurant, setRestaurant] = useState<RestaurantValues>({
//     email: "",
//     contact: "",
//     restaurantName: "",
//     address: "",
//     description: "",
//     location: {
//       types: "",
//       coordinates: ["", ""]
//     },
//     closingTime: "",
//     openingTime: "",
//     TableRate: "",
//     secondaryImages: [""],
//     featuredImage: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       await authAxios.get('/restaurant/restaurant-details')
//         .then((res) => {
//           setRestaurant(res.data.restaurantDetails);
//           formik.setValues({
//             ...formik.values,
//             email: res.data.restaurantDetails.email,
//             contact: res.data.restaurantDetails.contact,
//             restaurantName: res.data.restaurantDetails.restaurantName,
//           })
//         }).catch((error) => {
//           console.log("Error fetching restaurant details:", error);
//         })
//     };
//     fetchData();
//   }, []);


//   const formik = useFormik<RestaurantValues>({
//     initialValues: {
//       email: '',
//       contact: '',
//       restaurantName: '',
//       address: '',
//       location: {
//         types: '',
//         coordinates: ['', ''],
//       },
//       description: '',
//       closingTime: '',
//       openingTime: '',
//       TableRate: '',
//       secondaryImages: [],
//       featuredImage: "",
//     },
//     validate: sellerRegistrationValidation,
//     onSubmit: async (values) => {
//       try {
//         const formData = new FormData();
//         formData.append('datas', JSON.stringify(values));

//         if (values.featuredImage) {
//           formData.append('featuredImage', values.featuredImage);
//         }

//         values.secondaryImages.forEach((image) => {
//           formData.append('secondaryImages', image);
//         });

//         const response = await authAxios.put("/restaurant/restaurant-updation", formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         toast.success(response.data.message);
//       } catch (error) {
//         console.log("Error", error);
//         toast.error('Failed to update restaurant details');
//       }
//     },
//   });

//   useEffect(() => {
//     if (restaurant && restaurant.TableRate !== undefined) {
//       formik.setValues({
//         email: restaurant.email,
//         contact: restaurant.contact,
//         restaurantName: restaurant.restaurantName,
//         address: restaurant.address,
//         location: {
//           types: restaurant.location.types,
//           coordinates: [
//             restaurant.location.coordinates[0] || '',
//             restaurant.location.coordinates[1] || '',
//           ],
//         },
//         description: restaurant.description,
//         closingTime: restaurant.closingTime,
//         openingTime: restaurant.openingTime,
//         TableRate: restaurant.TableRate.toString(),
//         secondaryImages: restaurant.secondaryImages,
//         featuredImage: restaurant.featuredImage,
//       });
//     }
//   }, [restaurant]);

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <ToastContainer position="top-center" />
//       <div className="flex-grow flex flex-col items-center pb-10">
//         <div className="w-full max-w-7xl bg-white shadow-lg shadow-red-200 rounded-lg pb-10 animate-fadeIn">
//           <h1 className="p-5 text-2xl font-bold text-center text-teal-600 rounded-t-lg border-b border-gray-200">
//             Restaurant Details
//           </h1>
//           <form onSubmit={formik.handleSubmit} className="px-4 md:px-10 lg:px-16 font-semibold space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="lg:col-span-2 space-y-2">
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Restaurant Name</label>
//                   <input
//                     type="text"
//                     placeholder="Restaurant name"
//                     className="input border rounded-lg p-2 border-gray-200 w-full"
//                     name="restaurantName"
//                     onChange={formik.handleChange}
//                     value={formik.values.restaurantName}
//                   />
//                   {formik.errors.restaurantName ? (
//                     <div className="text-red-500">{formik.errors.restaurantName}</div>
//                   ) : null}
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Email</label>
//                   <input
//                     type="text"
//                     placeholder="Email"
//                     className="input border rounded-lg p-2 border-gray-200 w-full cursor-not-allowed"
//                     name="email"
//                     onChange={formik.handleChange}
//                     value={formik.values.email}
//                     readOnly
//                   />
//                   {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Contact</label>
//                   <input
//                     type="text"
//                     placeholder="Phone number"
//                     className="input border rounded-lg p-2 border-gray-200 w-full"
//                     name="contact"
//                     onChange={formik.handleChange}
//                     value={formik.values.contact}
//                   />
//                   {formik.errors.contact ? <div className="text-red-500">{formik.errors.contact}</div> : null}
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Address</label>
//                   <input
//                     type="text"
//                     placeholder="Address"
//                     className="input border rounded-lg p-2 border-gray-200 w-full"
//                     name="address"
//                     onChange={formik.handleChange}
//                     value={formik.values.address}
//                   />
//                   {formik.errors.address ? <div className="text-red-500">{formik.errors.address}</div> : null}
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Description</label>
//                   <textarea
//                     placeholder="Description"
//                     className="textarea border p-2 rounded-lg border-gray-200 w-full"
//                     name="description"
//                     onChange={formik.handleChange}
//                     value={formik.values.description}
//                   />
//                   {formik.errors.description ? <div className="text-red-500">{formik.errors.description}</div> : null}
//                 </div>
//                 <div className="flex flex-col md:flex-row items-center gap-3 transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="text-lg">Select time:</label>
//                   <div className="flex gap-3 w-full">
//                     <div className="flex-1">
//                       <label className="block text-sm">Opening time</label>
//                       <input
//                         type="time"
//                         className="input border rounded-lg p-2 border-gray-200 w-full"
//                         name="openingTime"
//                         onChange={formik.handleChange}
//                         value={formik.values.openingTime}
//                       />
//                       {formik.errors.openingTime ? (
//                         <div className="text-red-500">{formik.errors.openingTime}</div>
//                       ) : null}
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-sm">Closing time</label>
//                       <input
//                         type="time"
//                         className="input border rounded-lg p-2 border-gray-200 w-full"
//                         name="closingTime"
//                         onChange={formik.handleChange}
//                         value={formik.values.closingTime}
//                       />
//                       {formik.errors.closingTime ? (
//                         <div className="text-red-500">{formik.errors.closingTime}</div>
//                       ) : null}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Table Rate</label>
//                   <input
//                     type="text"
//                     placeholder="Rate"
//                     className="input border rounded-lg p-2 border-gray-200 w-full"
//                     name="TableRate"
//                     onChange={formik.handleChange}
//                     value={formik.values.TableRate}
//                   />
//                   {formik.errors.TableRate ? <div className="text-red-500">{formik.errors.TableRate}</div> : null}
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Featured Image</label>
//                   <input
//                     type="file"
//                     className="file-input border rounded-lg p-2 border-gray-200 w-full"
//                     name="featuredImage"
//                     onChange={(event: ChangeEvent<HTMLInputElement>) => {
//                       if (event.currentTarget.files && event.currentTarget.files[0]) {
//                         const file = event.currentTarget.files[0];
//                         formik.setFieldValue('featuredImage', file);
//                       }
//                     }}
//                   />
//                   {formik.errors.featuredImage ? (
//                     <div className="text-red-500">{formik.errors.featuredImage}</div>
//                   ) : null}
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Secondary Images</label>
//                   <input
//                     type="file"
//                     className="file-input border rounded-lg p-2 border-gray-200 w-full"
//                     name="secondaryImages"
//                     multiple
//                     onChange={(event: ChangeEvent<HTMLInputElement>) => {
//                       if (event.currentTarget.files) {
//                         const filesArray = Array.from(event.currentTarget.files);
//                         formik.setFieldValue('secondaryImages', filesArray);
//                       }
//                     }}
//                   />
//                   {formik.errors.secondaryImages ? (
//                     <div className="text-red-500">{formik.errors.secondaryImages}</div>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="lg:col-span-2 space-y-2">
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Location</label>
//                   <input
//                     type="text"
//                     placeholder="Location"
//                     className="input border rounded-lg p-2 border-gray-200 w-full"
//                     name="location.type"
//                     onChange={formik.handleChange}
//                     value={formik.values.location.types}
//                   />
//                   {formik.errors.location?.types ? <div className="text-red-500">{formik.errors.location.types}</div> : null}
//                 </div>

//                 <div className="lg:col-span-2">
//                   <GoogleMap formik={formik} />
//                 </div>

//               </div>
//             </div>
//             <div className="flex justify-center mt-8">
//               <button type="submit" className="btn btn-primary bg-teal-600 text-white px-6 py-2 rounded-lg">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantDetails;



// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { useFormik } from 'formik';
// import 'react-toastify/dist/ReactToastify.css';
// import { RestaurantValues, sellerRegistrationValidation } from "../../helpers/validation";
// import GoogleMap from '../GoogleMap';
// import authAxios from '../../redux/api/authApi';
// import getLocations from '../../util/getLocationApi';
// import { RestaurantFullDetails, uploadCloudImage } from '../../api/RestaurantApis';
// import { CiCircleRemove } from 'react-icons/ci';
// import axios from 'axios';
// // import PreviewImage from '../../layouts/PreviewImage';
// // import Secondaryimages from '../../layouts/Secondaryimage';

// const RestaurantDetails: React.FC = () => {
//   const [restaurantDetails, setRestaurantDetails] = useState<RestaurantValues>({
//     email: "",
//     contact: "",
//     restaurantName: "",
//     address: "",
//     description: "",
//     location: {
//       type: "",
//       coordinates: ["", ""]
//     },
//     closingTime: "",
//     openingTime: "",
//     TableRate: "",
//     secondaryImages: [],
//     featuredImage: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await authAxios.get('/restaurant/restaurant-details');
//         setRestaurantDetails(res.data.restaurantDetails);
//         formik.setValues({
//           ...formik.values,
//           ...res.data.restaurantDetails
//         });
//       } catch (error) {
//         console.log("Error fetching restaurant details:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const [suggestion, setSuggestions] = useState([]);
//   const [lat, setLat] = useState(10.0);
//   const [lng, setLng] = useState(76.5);
//   const [location, setLocation] = useState("");

//   // const [image, setImage] = useState<File | null>(null);
//   const [secondaryImages, setSecondaryImages] = useState<File[]>([]);

//   const formik = useFormik({
//     initialValues: restaurantDetails,
//     validate: sellerRegistrationValidation,
//     onSubmit: async (data) => {
//       console.log(data)
//       try {
//         // Upload featured image
//         if (data.featuredImage instanceof File) {
//           console.log("hhhh")
//           await uploadCloudImage(data.featuredImage).then((response) => {
//             data.featuredImage = response;
//             console.log(response.data.secret_url)
//           })
//         }

//         // Upload secondary images

//       //  const secondaryImg =  await Promise.all(data.secondaryImages.map(async (image) => {
//       //     if (image instanceof File) {
//       //         try {
//       //             const imageUrl = await uploadCloudImage(image);
//       //             return imageUrl; // Return the uploaded image URL
//       //         } catch (error) {
//       //             console.log(error);
//       //             throw error; // Throw error to handle it in the caller function if needed
//       //         }
//       //     }
//       // }));
//       //   console.log(secondaryImg)

//       if(data.secondaryImages){
//         console.log("secondary images")
//         const promises = data.secondaryImages.map(async(img)=>{
//           const formData  = new FormData();
//           formData .append('file',img);
//           formData .append('upload_preset', 'hg75472a');
//           formData .append('cloud_name', 'sudev99');
//           const resData =  await axios.post('https://api.cloudinary.com/v1_1/sudev99/image/upload',formData ,{
//             headers:{
//               'Content-Type': 'multipart/form-data'
//             }
//           });
//           console.log(resData.data.secure_url)
//           return resData.data.secure_url;
//         })


//         const uploadedImages = await Promise.all(promises);
//         data.secondaryImages = uploadedImages;
//         console.log("Secondary images uploaded:", uploadedImages);
//       }




//         const res = await RestaurantFullDetails(data)
//         toast.success(res.message)
//       } catch (error) {
//         console.log("Error", error);
//         toast.error('Failed to update restaurant details');
//       }
//     },
//   });

//   const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
//     setLocation(e.target.value);
//     const data = await getLocations(e.target.value);
//     setSuggestions(data);
//   };

//   const handleSuggestions = async (suggestion: any) => {
//     const lng = suggestion.center[0];
//     const lat = suggestion.center[1];
//     const search = suggestion.place_name.split(",")[0];
//     formik.setValues({
//       ...formik.values,
//       location: {
//         type: "Point",
//         coordinates: [lng, lat]
//       }
//     });
//     setLat(lat);
//     setLng(lng);
//     setLocation(search);
//     setSuggestions([]);
//   };

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const fileInputFeaturedRef = useRef<HTMLInputElement>(null);

//   const handleRemoveFeaturedImage = () => {
//     formik.setFieldValue("featuredImage", null);
//     if (fileInputFeaturedRef.current) {
//       fileInputFeaturedRef.current.value = ""
//     }
//   }

//   const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
//     const { files } = e.target;
//     if (files && files[0]) {
//       formik.setFieldValue("featuredImage", files[0]);
//     }
//   }

//   const handleRemoveImage = (index: number) => {
//     const updatedImages = [...secondaryImages];
//     updatedImages.splice(index, 1);
//     setSecondaryImages(updatedImages);
//     formik.setFieldValue("secondaryImages", updatedImages);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   }

//   const handleSecondaryImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
//     const { files } = e.target;
//     if (files) {
//       const filesArray = Array.from(files);
//       setSecondaryImages(filesArray);
//       formik.setFieldValue("secondaryImages", filesArray);
//     }
//   }

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <ToastContainer position="top-center" />
//       <div className="flex-grow flex flex-col items-center pb-10">
//         <div className="w-full max-w-7xl bg-white shadow-lg shadow-red-200 rounded-lg pb-10 animate-fadeIn">
//           <h1 className="p-5 text-2xl font-bold text-center text-teal-600 rounded-t-lg border-b border-gray-200">
//             Restaurant Details
//           </h1>
//           <form onSubmit={formik.handleSubmit} className="px-4 md:px-10 lg:px-16 font-semibold space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="lg:col-span-2 space-y-2">
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Restaurant Name</label>
//                   <input
//                     type="text"
//                     placeholder="Restaurant name"
//                     className="input border rounded-lg p-2 border-gray-200 w-full"
//                     name="restaurantName"
//                     onChange={formik.handleChange}
//                     value={restaurantDetails.restaurantName}
//                   />
//                   {formik.errors.restaurantName ? (
//                     <div className="text-red-500">{formik.errors.restaurantName}</div>
//                   ) : null}
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Email</label>
//                   <input
//                     type="text"
//                     placeholder="Email"
//                     className="input border rounded-lg p-2 border-gray-200 w-full cursor-not-allowed"
//                     name="email"
//                     onChange={formik.handleChange}
//                     value={restaurantDetails.email}
//                     readOnly
//                   />
//                   {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Contact</label>
//                   <input
//                     type="text"
//                     placeholder="Phone number"
//                     className="input border rounded-lg p-2 border-gray-200 w-full"
//                     name="contact"
//                     onChange={formik.handleChange}
//                     value={restaurantDetails.contact}
//                   />
//                   {formik.errors.contact ? <div className="text-red-500">{formik.errors.contact}</div> : null}
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Address</label>
//                   <input
//                     type="text"
//                     placeholder="Address"
//                     className="input border rounded-lg p-2 border-gray-200 w-full"
//                     name="address"
//                     onChange={formik.handleChange}
//                     value={restaurantDetails.address}
//                   />
//                   {formik.errors.address ? <div className="text-red-500">{formik.errors.address}</div> : null}
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Description</label>
//                   <textarea
//                     placeholder="Description"
//                     className="textarea border p-2 rounded-lg border-gray-200 w-full"
//                     name="description"
//                     onChange={formik.handleChange}
//                     value={restaurantDetails.description}
//                   />
//                   {formik.errors.description ? <div className="text-red-500">{formik.errors.description}</div> : null}
//                 </div>
//                 <div className="flex flex-col md:flex-row items-center gap-3 transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="text-lg">Select time:</label>
//                   <div className="flex gap-3 w-full">
//                     <div className="flex-1">
//                       <label className="block text-sm">Opening time</label>
//                       <input
//                         type="time"
//                         className="input border rounded-lg p-2 border-gray-200 w-full"
//                         name="openingTime"
//                         onChange={formik.handleChange}
//                         value={restaurantDetails.openingTime}
//                       />
//                       {formik.errors.openingTime ? (
//                         <div className="text-red-500">{formik.errors.openingTime}</div>
//                       ) : null}
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-sm">Closing time</label>
//                       <input
//                         type="time"
//                         className="input border rounded-lg p-2 border-gray-200 w-full"
//                         name="closingTime"
//                         onChange={formik.handleChange}
//                         value={restaurantDetails.closingTime}
//                       />
//                       {formik.errors.closingTime ? (
//                         <div className="text-red-500">{formik.errors.closingTime}</div>
//                       ) : null}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Table Rate</label>
//                   <input
//                     type="text"
//                     placeholder="Rate"
//                     className="input border rounded-lg p-2 border-gray-200 w-full"
//                     name="TableRate"
//                     onChange={formik.handleChange}
//                     value={restaurantDetails.TableRate}
//                   />
//                   {formik.errors.TableRate ? <div className="text-red-500">{formik.errors.TableRate}</div> : null}
//                 </div>



//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Featured Image</label>
//                   <div className="flex items-center justify-center">
//                     {formik.values.featuredImage ? (
//                       <div className="relative">
//                         <img src={typeof formik.values.featuredImage === 'string' ? formik.values.featuredImage : URL.createObjectURL(formik.values.featuredImage)} className="h-40 w-full object-cover rounded-lg shadow-md border-2 border-gray-300 cursor-pointer" />
//                         <button type="button" className="absolute top-2 right-2 p-1 bg-white rounded-full text-red-500" onClick={handleRemoveFeaturedImage}>
//                           <CiCircleRemove size={20} />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="w-full flex items-center justify-center h-40 border-2 border-gray-300 rounded-lg">
//                         <label className="cursor-pointer flex flex-col items-center">
//                           <input
//                             type="file"
//                             ref={fileInputFeaturedRef}
//                             className="hidden"
//                             accept="image/*"
//                             onChange={handleImageChange}
//                           />
//                           <span className="text-lg text-gray-600">Upload Image</span>
//                         </label>
//                       </div>
//                     )}
//                   </div>
//                   {formik.errors.featuredImage ? <div className="text-red-500">{formik.errors.featuredImage}</div> : null}
//                 </div>


//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Secondary Images</label>
//                   <div className="grid grid-cols-2 gap-2">
//                     {secondaryImages.map((image, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={typeof image === 'string' ? image : URL.createObjectURL(image)}
//                           className="h-40 w-full object-cover rounded-lg shadow-md border-2 border-gray-300 cursor-pointer"
//                         />
//                         <button type="button" className="absolute top-2 right-2 p-1 bg-white rounded-full text-red-500" onClick={() => handleRemoveImage(index)}>
//                           <CiCircleRemove size={20} />
//                         </button>
//                       </div>
//                     ))}
//                     <div className="w-full flex items-center justify-center h-40 border-2 border-gray-300 rounded-lg">
//                       <label className="cursor-pointer flex flex-col items-center">
//                         <input
//                           type="file"
//                           ref={fileInputRef}
//                           className="hidden"
//                           accept="image/*"
//                           multiple
//                           onChange={handleSecondaryImageChange}
//                         />
//                         <span className="text-lg text-gray-600">Upload Images</span>
//                       </label>
//                     </div>
//                   </div>
//                   {formik.errors.secondaryImages ? <div className="text-red-500">{formik.errors.secondaryImages}</div> : null}
//                 </div>
//               </div>


//               {/* </div> */}
//               <div className="lg:col-span-2 space-y-2">
//                 <div className="transition-transform duration-300 ease-in-out hover:scale-105">
//                   <label className="block text-lg">Location</label>
//                   <input
//                     type="text"
//                     value={location}
//                     placeholder="Search Location"
//                     className="input border rounded-lg p-2 border-gray-200 w-full"
//                     onChange={handleChange}
//                   />
//                   {formik.touched.location && formik.errors.location && (
//                     <div className="text-red-500 text-sm pt-2">
//                       {formik.errors.location.type}
//                     </div>
//                   )}
//                   {suggestion && (
//                     <ul className="w-[300px] mt-2 overflow-x-auto h-32 bg-white">
//                       {suggestion.map((suggestion: any, index) => (
//                         <li
//                           key={index}
//                           className="px-4 py-3 cursor-pointer hover:bg-gray-100"
//                           onClick={() => handleSuggestions(suggestion)}
//                         >
//                           {suggestion.place_name}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 <div className="lg:col-span-2">
//                   <GoogleMap latitude={lat} longitude={lng} />
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center mt-8">
//               <button type="submit" className="btn btn-primary bg-teal-600 text-white px-6 py-2 rounded-lg">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantDetails;





/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { RestaurantValues, sellerRegistrationValidation } from "../../helpers/validation";
import GoogleMap from '../GoogleMap';
import authAxios from '../../redux/api/authApi';
import getLocations from '../../util/getLocationApi';
import { RestaurantFullDetails, uploadCloudImage } from '../../api/RestaurantApis';
import { CiCircleRemove } from 'react-icons/ci';
import axios from 'axios';

const RestaurantDetails: React.FC = () => {
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantValues>({
    email: "",
    contact: "",
    restaurantName: "",
    address: "",
    description: "",
    location: {
      type: "",
      coordinates: ["", ""]
    },
    closingTime: "",
    openingTime: "",
    TableRate: "",
    secondaryImages: [],
    featuredImage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authAxios.get('/restaurant/restaurant-details');
        setRestaurantDetails(res.data.restaurantDetails);
        formik.setValues({
          ...formik.values,
          ...res.data.restaurantDetails
        });
        console.log(res.data)
      } catch (error) {
        console.log("Error fetching restaurant details:", error);
      }
    };
    fetchData();
  }, []);

  const [suggestion, setSuggestions] = useState([]);
  const [lat, setLat] = useState(10.0);
  const [lng, setLng] = useState(76.5);
  const [location, setLocation] = useState("");

  const [secondaryImages, setSecondaryImages] = useState<File[]>([]);

  const formik = useFormik({
    initialValues: restaurantDetails,
    validate: sellerRegistrationValidation,
    onSubmit: async (data) => {
      console.log(data)
      try {
        // Upload featured image
        if (data.featuredImage instanceof File) {
          await uploadCloudImage(data.featuredImage).then((response) => {
            console.log(response.data.secure_url)
            data.featuredImage = response.data.secure_url;
          });
        }

        // Upload secondary images
        if (data.secondaryImages) {
          const promises = data.secondaryImages.map(async (img) => {
            const formData = new FormData();
            formData.append('file', img);
            formData.append('upload_preset', 'hg75472a');
            formData.append('cloud_name', 'sudev99');
            const resData = await axios.post('https://api.cloudinary.com/v1_1/sudev99/image/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log(resData.data.secure_url)
            return resData.data.secure_url;
          });
          

          const uploadedImages = await Promise.all(promises);
          data.secondaryImages = uploadedImages;
          console.log("Secondary images uploaded:", uploadedImages);
        }

        const res = await RestaurantFullDetails(data);
        toast.success(res.message);
      } catch (error) {
        console.log("Error", error);
        toast.error('Failed to update restaurant details');
      }
    },
  });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    const data = await getLocations(e.target.value);
    setSuggestions(data);
  };

  const handleSuggestions = async (suggestion: any) => {
    const lng = suggestion.center[0];
    const lat = suggestion.center[1];
    const search = suggestion.place_name.split(",")[0];
    formik.setValues({
      ...formik.values,
      location: {
        type: "Point",
        coordinates: [lng, lat]
      }
    });
    setLat(lat);
    setLng(lng);
    setLocation(search);
    setSuggestions([]);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputFeaturedRef = useRef<HTMLInputElement>(null);

  const handleRemoveFeaturedImage = () => {
    formik.setFieldValue("featuredImage", null);
    if (fileInputFeaturedRef.current) {
      fileInputFeaturedRef.current.value = ""
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      formik.setFieldValue("featuredImage", files[0]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...secondaryImages];
    updatedImages.splice(index, 1);
    setSecondaryImages(updatedImages);
    formik.setFieldValue("secondaryImages", updatedImages);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSecondaryImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const filesArray = Array.from(files);
      setSecondaryImages(filesArray);
      formik.setFieldValue("secondaryImages", filesArray);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <ToastContainer position="top-center" />
      <div className="flex-grow flex flex-col items-center pb-10">
        <div className="w-full max-w-7xl bg-white shadow-lg shadow-red-200 rounded-lg pb-10 animate-fadeIn">
          <h1 className="p-5 text-2xl font-bold text-center text-teal-600 rounded-t-lg border-b border-gray-200">
            Restaurant Details
          </h1>
          <form onSubmit={formik.handleSubmit} className="px-4 md:px-10 lg:px-16 font-semibold space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2 space-y-2">
                <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="block text-lg">Restaurant Name</label>
                  <input
                    type="text"
                    placeholder="Restaurant name"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="restaurantName"
                    onChange={formik.handleChange}
                    value={formik.values.restaurantName}
                  />
                  {formik.errors.restaurantName ? (
                    <div className="text-red-500">{formik.errors.restaurantName}</div>
                  ) : null}
                </div>
                <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="block text-lg">Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input border rounded-lg p-2 border-gray-200 w-full cursor-not-allowed"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    readOnly
                  />
                  {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                </div>
                <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="block text-lg">Contact</label>
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="contact"
                    onChange={formik.handleChange}
                    value={formik.values.contact}
                  />
                  {formik.errors.contact ? <div className="text-red-500">{formik.errors.contact}</div> : null}
                </div>
                <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="block text-lg">Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                  {formik.errors.address ? <div className="text-red-500">{formik.errors.address}</div> : null}
                </div>
                <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="block text-lg">Description</label>
                  <textarea
                    placeholder="Description"
                    className="textarea border p-2 rounded-lg border-gray-200 w-full"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                  {formik.errors.description ? <div className="text-red-500">{formik.errors.description}</div> : null}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="text-lg">Select time:</label>
                  <div className="flex gap-3 w-full">
                    <div className="flex-1">
                      <label className="block text-sm">Opening time</label>
                      <input
                        type="time"
                        placeholder="Opening time"
                        className="input border rounded-lg p-2 border-gray-200 w-full"
                        name="openingTime"
                        onChange={formik.handleChange}
                        value={formik.values.openingTime}
                      />
                      {formik.errors.openingTime ? <div className="text-red-500">{formik.errors.openingTime}</div> : null}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm">Closing time</label>
                      <input
                        type="time"
                        placeholder="Closing time"
                        className="input border rounded-lg p-2 border-gray-200 w-full"
                        name="closingTime"
                        onChange={formik.handleChange}
                        value={formik.values.closingTime}
                      />
                      {formik.errors.closingTime ? <div className="text-red-500">{formik.errors.closingTime}</div> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="h-72 md:h-full lg:h-96 shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
                  <GoogleMap latitude={lat} longitude={lng} />
                </div>
                <div className="pt-4 relative transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="block text-lg">Search Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="location"
                    value={location}
                    onChange={handleChange}
                  />
                  {suggestion.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                      {suggestion.map((suggestion, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleSuggestions(suggestion)}
                        >
                          {/* {suggestion.place_name} */}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="lg:col-span-2 space-y-5">
                <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="block text-lg">Table rate (per hour)</label>
                  <input
                    type="text"
                    placeholder="Table rate"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="TableRate"
                    onChange={formik.handleChange}
                    value={formik.values.TableRate}
                  />
                  {formik.errors.TableRate ? <div className="text-red-500">{formik.errors.TableRate}</div> : null}
                </div>
                <div className="w-full space-y-1">
                  <label className="block text-lg">Featured Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="featuredImage"
                      className="opacity-0 absolute inset-0 w-full h-full"
                      onChange={handleImageChange}
                      ref={fileInputFeaturedRef}
                    />
                    <div className="flex justify-center items-center border border-gray-300 rounded-lg p-4 cursor-pointer">
                      <span className="text-gray-500">Upload Featured Image</span>
                    </div>
                  </div>
                  {formik.values.featuredImage && (
                    <div className="relative mt-2">
                      <img
                        src={
                          formik.values.featuredImage instanceof File
                            ? URL.createObjectURL(formik.values.featuredImage)
                            : formik.values.featuredImage
                        }
                        alt="Featured"
                        className="max-h-40 rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveFeaturedImage}
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                      >
                        <CiCircleRemove size={24} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="w-full space-y-1">
                  <label className="block text-lg">Secondary Images</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="secondaryImages"
                      multiple
                      className="opacity-0 absolute inset-0 w-full h-full"
                      onChange={handleSecondaryImageChange}
                      ref={fileInputRef}
                    />
                    <div className="flex justify-center items-center border border-gray-300 rounded-lg p-4 cursor-pointer">
                      <span className="text-gray-500">Upload Secondary Images</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {secondaryImages.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Secondary ${index}`}
                          className="h-20 w-20 object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                        >
                          <CiCircleRemove size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded-lg transition-all duration-300 ease-in-out"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
