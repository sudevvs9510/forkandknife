
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

export const RestaurantFullDetails = async (datas: credentials) =>{
   try{
      const { data: {message} } = await authAxios.put("/restaurant/restaurant-updation",{datas})
      return {data:{message}}
   } catch(error){
      console.log(error)
      throw error
   }
}


