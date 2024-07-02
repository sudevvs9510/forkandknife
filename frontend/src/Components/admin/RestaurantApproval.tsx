import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import authAxios from "../../redux/api/authApi";
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';

const RestaurantApproval: React.FC = () => {

   const navigate = useNavigate()
   const [restaurantDetails, setRestaurantDetails] = useState<{restaurantName: string; email: string, contact: string}>();
   const { id } = useParams();
   
   useEffect(() => {
      const fetchData = async () => {
         await authAxios.get(`/admin/restaurant-approval/${id}`)
         .then((res) => {
            console.log(res.data);
            setRestaurantDetails(res.data.restaurants);
         }).catch((error) => {
            console.log(error);
         });
      }
      fetchData();
   }, [id]);

   const handleApprove = async () => {
      await authAxios.put(`/admin/restaurant-approval/${id}`).then((response) => {
         console.log(response)
         toast.success("Approved successfull");
         setTimeout(()=>{
            navigate('/admin/restaurant-lists')
         },1000)
      }).catch((error) => {
         console.log(error);
      });
   };

   const handleReject = async () =>{
      await authAxios.put(`/admin/restaurant-reject/${id}`).then((response) =>{
         console.log(response)
         toast.success("Rejection Successfull")
         setTimeout(()=>{
            navigate('/admin/restaurant-lists')
         },1000)
      }) .catch((error)=>{
         console.log(error)
      })
   }

  return (
   <div className='flex'>
      <Sidebar />
      <div className='flex-grow flex justify-center items-center p-5 lg:p-20'>
         <div className='w-full max-w-[900px] bg-white shadow-2xl shadow-neutral-500 rounded-3xl flex flex-col lg:flex-row lg:p-10 justify-between'>
            {restaurantDetails && (
            <div className='flex flex-col gap-5 p-5 lg:p-0'>
               <p className='text-base font-semibold text-black '>Restaurant Name&ensp;: <span className='text-blue-500'>{restaurantDetails.restaurantName}</span></p>
               <p className='text-base font-semibold text-black '>Email Address&ensp;&ensp;&ensp;&ensp;:  <span className='text-blue-500'>{restaurantDetails.email}</span></p>
               <p className='text-base font-semibold text-black '>Contact number&ensp;&ensp;: <span className='text-blue-500'>{restaurantDetails.contact}</span></p>
            </div>
            )}
            <div className='flex flex-col items-center gap-5 p-5 lg:p-0'>
               <button className='text-white bg-green-500 p-2 rounded-full px-10 font-bold text-base hover:bg-green-600 mb-5 lg:mb-0' onClick={handleApprove}>Approve Restaurant</button>
               <div className="w-full lg:w-[400px] bg-black/60 h-[1px] my-5 lg:my-0"></div>
               <textarea className='bg-rose-200 w-full lg:w-[400px] h-[200px] mb-5 outline-none p-5 text-black font-semibold lg:mb-0 rounded-3xl placeholder:text-black' placeholder='Reason for rejecting?' />
               <button className='text-white bg-red-500 p-2 rounded-full px-10 font-bold text-base hover:bg-red-700' onClick={handleReject}>Reject</button>
            </div>
         </div>
      </div>
   </div>
 )
}

export default RestaurantApproval;
