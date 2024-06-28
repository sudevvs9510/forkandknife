
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

//  export const uploadCloudImage = async (image: File)  => {
//    const formData = new FormData();
//    formData.append('file', image);
//    formData.append('upload_preset', 'hg75472a');
   
//    try {
//      const res = await fetch(
//        "https://api.cloudinary.com/v1_1/sudev99/image/upload",
       
//        {
//          method: "POST",
//          body: formData,
//        }
//      );
 
//      if (res.ok) {
//        const data = await res.json();
//        return data.secure_url;
//      } else {
//        console.log("upload failed: ", res);
//        throw new Error("Upload failed");
//      }
//    } catch (error) {
//      console.log("upload error: ", error);
//      throw new Error("Failed to upload image");
//    }
//  };

export const uploadCloudImage = async (file: File) => {
   try {
     const formData = new FormData();
     formData.append('file', file);
     formData.append('upload_preset', 'hg75472a'); // Replace with your actual upload preset
 
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
 
