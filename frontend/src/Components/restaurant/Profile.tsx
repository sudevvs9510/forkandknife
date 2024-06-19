import { useState } from 'react';

const RestaurantDetails = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  const handleRestaurantNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurantName(event.target.value);
  };

  const handleFullAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullAddress(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleOpeningTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpeningTime(event.target.value);
  };

  const handleClosingTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClosingTime(event.target.value);
  };

  const handleFeaturedImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeaturedImage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      restaurantName,
      fullAddress,
      location,
      description,
      openingTime,
      closingTime,
      featuredImage,
    });
  };

  return (
    
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Restaurant Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="restaurantName" className="block text-gray-700 font-bold mb-2">
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurantName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={restaurantName}
            onChange={handleRestaurantNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fullAddress" className="block text-gray-700 font-bold mb-2">
            Full Address
          </label>
          <input
            type="text"
            id="fullAddress"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={fullAddress}
            onChange={handleFullAddressChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="mb-4 flex gap-4">
          <div>
            <label htmlFor="openingTime" className="block text-gray-700 font-bold mb-2">
              Opening Time
            </label>
            <input
              type="time"
              id="openingTime"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={openingTime}
              onChange={handleOpeningTimeChange}
            />
          </div>
          <div>
            <label htmlFor="closingTime" className="block text-gray-700 font-bold mb-2">
              Closing Time
            </label>
            <input
              type="time"
              id="closingTime"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={closingTime}
              onChange={handleClosingTimeChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="featuredImage" className="block text-gray-700 font-bold mb-2">
            Featured Image
          </label>
          <input
            type="text"
            id="featuredImage"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={featuredImage}
            onChange={handleFeaturedImageChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default RestaurantDetails;