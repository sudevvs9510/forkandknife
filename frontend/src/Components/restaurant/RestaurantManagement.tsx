
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { RestaurantValues, sellerRegistrationValidation } from "../../helpers/validation";
import GoogleMap from '../GoogleMap';
import authAxios from '../../redux/api/authApi';
import getLocations from '../../util/getLocationApi';
import { RestaurantFullDetails, uploadCloudImage } from '../../api/RestaurantApis';
import { CiCircleRemove } from 'react-icons/ci';
import { FaSpinner } from 'react-icons/fa'


const RestaurantDetails: React.FC = () => {
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantValues>({
    email: "",
    contact: "",
    restaurantName: "",
    restaurantType: "" as "Veg & Non-Veg" | "Veg" | "Non-Veg",
    address: "",
    description: "",
    place: "",
    location: {
      type: "",
      coordinates: ["", ""]
    },
    closingTime: "",
    openingTime: "",
    TableRate: "",
    secondaryImages: [],
    featuredImage: ""
  });

  const [suggestion, setSuggestions] = useState<any[]>([]);
  const [lat, setLat] = useState<number>(10.0);
  const [lng, setLng] = useState<number>(76.5);
  const [loading, setLoading] = useState<boolean>(false)


  console.log("url logs1", import.meta.env.VITE_APP_BASE_URL)
  console.log("url logs2", import.meta.env.VITE_APP_JWT_SECRET_KEY)
  console.log("url logs3", import.meta.env.VITE_APP_MAP_BOX_ACCESS_TOKEN)
  console.log("url logs4", import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await authAxios.get('/restaurant/restaurant-details');
        setRestaurantDetails(res.data.restaurantDetails);
        formik.setValues({
          ...formik.values,
          ...res.data.restaurantDetails
        });
        setLng(res.data.restaurantDetails.location.coordinates[0]);
        setLat(res.data.restaurantDetails.location.coordinates[1]);
      } catch (error) {
        console.log("Error fetching restaurant details:", error);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: restaurantDetails,
    validate: sellerRegistrationValidation,
    onSubmit: async (data) => {
      try {
        setLoading(true)
        if (data.featuredImage instanceof File) {
          const featuredImageUrl = await uploadCloudImage(data.featuredImage);
          data.featuredImage = featuredImageUrl.secure_url;
        }

        if (data.secondaryImages.length > 0) {
          const uploadedImages = [];
          for (let i = 0; i < data.secondaryImages.length; i++) {
            const image = data.secondaryImages[i];
            if (image instanceof File) {
              const uploadedImage = await uploadCloudImage(image);
              uploadedImages.push(uploadedImage.secure_url);
            }
          }
          // data.secondaryImages.length = 0;
          // uploadedImages.forEach((url) => {
          //   data.secondaryImages.push(url.secure_url);
          data.secondaryImages = uploadedImages
          // });
        }

        const res = await RestaurantFullDetails(data);
        toast.success(res.message);
      } catch (error) {
        console.log("Error", error);
        toast.error('Failed to update restaurant details');
      } finally {
        setLoading(false)
      }
    },
  });

  const handleLocationChange = async (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const data = await getLocations(e.target.value);
    setSuggestions(data);
  };

  const handleSuggestions = (suggestion: any) => {
    const lng = suggestion.center[0];
    const lat = suggestion.center[1];
    formik.setValues({
      ...formik.values,
      location: {
        type: "Point",
        coordinates: [lng, lat]
      },
      place: suggestion.place_name
    });
    setLat(lat);
    setLng(lng);
    setSuggestions([]);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputFeaturedRef = useRef<HTMLInputElement>(null);

  const handleRemoveFeaturedImage = () => {
    formik.setFieldValue("featuredImage", "");
    if (fileInputFeaturedRef.current) {
      fileInputFeaturedRef.current.value = "";
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      formik.setFieldValue("featuredImage", files[0]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.secondaryImages];
    updatedImages.splice(index, 1);
    formik.setFieldValue("secondaryImages", updatedImages);
  };

  const handleSecondaryImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const filesArray = Array.from(files).filter((file) => file instanceof File);
      formik.setFieldValue("secondaryImages", filesArray);
    }
  };

  return (
    <div className="min-h-screen flex  ">
      <div className="flex-grow flex flex-col items-center pb-10 ">
        <div className="w-full bg-white  rounded-lg pb-10 animate-fadeIn  ">
          <h1 className="p-5 text-2xl font-bold text-start text-black rounded-t-lg  border-gray-200">
            Restaurant Profile
          </h1>
          <form onSubmit={formik.handleSubmit} className="px-4 md:px-10 lg:px-16 font-semibold space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2 space-y-2">
                <div className=''>
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


                <div className=''>
                  <label className="block text-lg" htmlFor="restaurantType">Restaurant Type</label>
                  <select
                    id="restaurantType"
                    name="restaurantType"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    onChange={formik.handleChange}
                    value={formik.values.restaurantType || ""}
                  >
                    <option value="" disabled>Select restaurant type</option>
                    <option value="Veg & Non-Veg">Veg & Non-Veg</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                  </select>
                  {formik.errors.restaurantType ? (
                    <div className="text-red-500">{formik.errors.restaurantType}</div>
                  ) : null}
                </div>

                <div>
                  <label className="block text-lg">Email</label>
                  {/* <div className="text-teal-600">(Email cannot be changed)</div> */}
                  <input
                    type="text"
                    placeholder="Email"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    readOnly
                  />


                  {formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-lg">Contact</label>
                  <input
                    type="text"
                    placeholder="Contact"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="contact"
                    onChange={formik.handleChange}
                    value={formik.values.contact}
                  />
                  {formik.errors.contact ? (
                    <div className="text-red-500">{formik.errors.contact}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-lg">Description</label>
                  <textarea
                    placeholder="Description"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                  {formik.errors.description ? (
                    <div className="text-red-500">{formik.errors.description}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-lg">Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                  {formik.errors.address ? (
                    <div className="text-red-500">{formik.errors.address}</div>
                  ) : null}
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-lg">Opening Time</label>
                    <input
                      type="time"
                      className="input border rounded-lg p-2 border-gray-200 w-full"
                      name="openingTime"
                      onChange={formik.handleChange}
                      value={formik.values.openingTime}
                    />
                    {formik.errors.openingTime ? (
                      <div className="text-red-500">{formik.errors.openingTime}</div>
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <label className="block text-lg">Closing Time</label>
                    <input
                      type="time"
                      className="input border rounded-lg p-2 border-gray-200 w-full"
                      name="closingTime"
                      onChange={formik.handleChange}
                      value={formik.values.closingTime}
                    />
                    {formik.errors.closingTime ? (
                      <div className="text-red-500">{formik.errors.closingTime}</div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label className="block text-lg">Table Rate</label>
                  <input
                    type="number"
                    placeholder="Table Rate"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="TableRate"
                    onChange={formik.handleChange}
                    value={formik.values.TableRate}
                  />
                  {formik.errors.TableRate ? (
                    <div className="text-red-500">{formik.errors.TableRate}</div>
                  ) : null}
                </div>
              </div>

              {/* Updated Image Upload Section */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <label className="block text-lg">Featured Image</label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      ref={fileInputFeaturedRef}
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <button
                      type="button"
                      className="btn bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={() => fileInputFeaturedRef.current?.click()}
                    >
                      Upload Featured Image
                    </button>
                    {/* {formik.values.featuredImage && (
                       <button
                         type="button"
                         className="ml-4 btn bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                         onClick={handleRemoveFeaturedImage}
                       >
                         Remove Image
                       </button>
                     )} */}
                  </div>
                  {formik.values.featuredImage && (
                    <div className="relative mt-2">
                      <img
                        src={typeof formik.values.featuredImage === 'string' ? formik.values.featuredImage : URL.createObjectURL(formik.values.featuredImage)}
                        alt="Featured"
                        className="w-full h-25  object-cover rounded-lg"
                      />
                      {formik.values.featuredImage && (
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-white text-teal-600 rounded-full p-1"
                          onClick={handleRemoveFeaturedImage}
                        >
                          <CiCircleRemove size={24} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-lg">Secondary Images</label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      className="hidden"
                      onChange={handleSecondaryImageChange}
                    />
                    <button
                      type="button"
                      className="btn bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Upload Secondary Images
                    </button>
                  </div>
                  {formik.values.secondaryImages.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                      {formik.values.secondaryImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                            alt={`Secondary ${index}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-white text-teal-600 rounded-full p-1"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <CiCircleRemove size={24} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative space-y-2">
              <label className="block text-lg">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className="input border rounded-lg p-2 border-gray-200 w-full"
                name="place"
                onChange={handleLocationChange}
                value={formik.values.place}
              />
              {suggestion.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-1 w-full">
                  {suggestion.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSuggestions(suggestion)}
                    >
                      {suggestion.place_name}
                    </li>
                  ))}
                </ul>
              )}
              {formik.errors.place ? (
                <div className="text-red-500">{formik.errors.place}</div>
              ) : null}
            </div>

            <div className="mt-5 h-80 w-full rounded-lg overflow-hidden">
              <GoogleMap latitude={lat} longitude={lng} />
            </div>

            <div className="text-center pt-5">
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Loading...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
