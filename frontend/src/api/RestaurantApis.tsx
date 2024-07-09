
import axios from "axios";
import { RestaurantValues } from "../helpers/validation";
import authAxios from "../redux/api/authApi";


export interface credentials {
   restaurantName: string;
   email: string;
   password: string
   contact: string;
   address: string;
   description: string;
   openingTime: string;
   closingTime: string;
   TableRate: string;
   featuredImage: string;
   secondaryImages: string;
 }


 export interface TableSlotTypes {
  _id?: string
  tableId: string
  tableNumber: string;
  tableCapacity: number
  tableLocation: string
 }

export const RestaurantRegister = async (datas: credentials) => {
   try {
      console.log("Sending payload:", datas);
      const {data: {success, message }} = await authAxios.post("/restaurant/registration", datas);
      return {data:{success, message}};
   } catch (error) {
      console.log("Error in register", error)
      throw error;
   }
}

export const RestaurantLoginApi = async (data: Partial<credentials>) =>{
   try {
      console.log(data)
      const {data: {message, user, token}} = await authAxios.post('/restaurant/login',data)
      return {data: { message, user, token }}
   } catch (error) {
      console.log("Error in login", error)
      throw error
   }
}

// export const RestaurantFullDetails = async (datas: credentials) =>{
//    try{
//       const { data: {message} } = await authAxios.put("/restaurant/restaurant-updation",{datas})
//       console.log(datas)
//       return {data:{message}}
//    } catch(error){
//       console.log(error)
//       throw error
//    }
// }

export const RestaurantFullDetails = async (datas: RestaurantValues) => {
   try {
     console.log("response")
     const response = await authAxios.put("/restaurant/restaurant-updation", { datas });
     console.log(response) 
     return response.data;
   } catch (error) {
     console.error(error);
     throw error;
   }
 };

export const uploadCloudImage = async (file: File) => {
   try {
     const formData = new FormData();
     formData.append('file', file);
     formData.append('upload_preset', 'hg75472a'); 
 
     const response = await axios.post(
       'https://api.cloudinary.com/v1_1/sudev99/image/upload',
       formData,
       {
         headers: {
           'Content-Type': 'multipart/form-data',
         },
         withCredentials: false,
       }
     );
 
     return response.data;
   } catch (error) {
     console.error('Error uploading image:', error);
     throw error;
   }
 };
 

 export const getTableDatas = async (restaurantId: string) =>{
  try{
    const { data: { message, tableSlotDatas}} = await authAxios.get(`/restaurant/tables/${restaurantId}`)
    return { data: {message, tableSlotDatas }}
  } catch(error){
    console.log(error)
    throw error
  }
 }



 export const logoutRestaurant = async () =>{
  try{
    console.log("llkk")
    await authAxios.post('/restaurant/logout')

  } catch(error){
    console.log("Logout error",error)
  } finally{
    localStorage.removeItem("AuthToken")
  }
 }