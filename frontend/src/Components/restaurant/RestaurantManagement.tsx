import React, { ChangeEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { RestaurantValues, sellerRegistrationValidation } from "../../helpers/validation";
import GoogleMap from '../GoogleMap';
import authAxios from '../../redux/api/authApi';

const RestaurantDetails: React.FC = () => {
  const formik = useFormik<RestaurantValues>({
    initialValues: {
      email: '',
      contact: '',
      restaurantName: '',
      address: '',
      location: {
        type: '',
        coordinates: ['', ''],
      },
      description: '',
      closingTime: '',
      openingTime: '',
      TableRate: '',
      secondaryImages: [],
      featuredImage: "",
    },
    validate: sellerRegistrationValidation,
    // onSubmit: (values) => {
    //   console.log('Form data', values);
    //   toast.success('Restaurant details saved successfully!');
    // },

    onSubmit:async (values)=>{
      try{
        //prepare form data
        const formData = new FormData()
        formData.append('datas', JSON.stringify(values))

        //upload featured image
        if(values.featuredImage){
          formData.append('featuredImage', values.featuredImage)
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        values.secondaryImages.forEach((image:any)=>{
          formData.append('secondaryImages', image)
        })

        const response = await authAxios.put("/restaurant/restaurant-updation", formData,{
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.success(response.data.message)
      } catch(error){
        console.log("Error",error)
        toast.error('Failed to update restaurant details')
      }
    }
  });

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
                      <label className="block text-sm">Closing time</label>
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
                </div>
                <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="block text-lg">Table Rate</label>
                  <input
                    type="text"
                    placeholder="Rate"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="TableRate"
                    onChange={formik.handleChange}
                    value={formik.values.TableRate}
                  />
                  {formik.errors.TableRate ? <div className="text-red-500">{formik.errors.TableRate}</div> : null}
                </div>
                <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="block text-lg">Featured Image</label>
                  <input
                    type="file"
                    className="file-input border rounded-lg p-2 border-gray-200 w-full"
                    name="featuredImage"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      if (event.currentTarget.files && event.currentTarget.files[0]) {
                        const file = event.currentTarget.files[0];
                        formik.setFieldValue('featuredImage', URL.createObjectURL(file));
                      }
                    }}
                  />
                  {formik.errors.featuredImage ? (
                    <div className="text-red-500">{formik.errors.featuredImage}</div>
                  ) : null}
                </div>
                <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="block text-lg">Secondary Images</label>
                  <input
                    type="file"
                    className="file-input border rounded-lg p-2 border-gray-200 w-full"
                    name="secondaryImages"
                    multiple
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      if (event.currentTarget.files) {
                        const filesArray = Array.from(event.currentTarget.files).map(file =>
                          URL.createObjectURL(file)
                        );
                        formik.setFieldValue('secondaryImages', filesArray);
                      }
                    }}
                  />
                  {formik.errors.secondaryImages ? (
                    <div className="text-red-500">{formik.errors.secondaryImages}</div>
                  ) : null}
                </div>
              </div>
              <div className="lg:col-span-2 space-y-2">
                <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                  <label className="block text-lg">Location</label>
                  <input
                    type="text"
                    placeholder="Location"
                    className="input border rounded-lg p-2 border-gray-200 w-full"
                    name="location.type"
                    onChange={formik.handleChange}
                    value={formik.values.location.type}
                  />
                  {formik.errors.location?.type ? <div className="text-red-500">{formik.errors.location.type}</div> : null}
                </div>
                <GoogleMap formik={formik} />
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button type="submit" className="btn btn-primary bg-teal-600 text-white px-6 py-2 rounded-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
