import { UserType } from "../../entities/User"
import { AdminRepositories } from "../../interfaces/repositories/admin-repository";
import UserModel from "../../../frameworks/database/models/userModel"
import bcrypt from "bcryptjs"
import restaurantModel from "../../../frameworks/database/models/restaurantModel";
import nodeMailerRestaurantApprovalMail from "../../../functions/sendMailApproval"

export class adminRepositoryImpl implements AdminRepositories {
   

   async adminLoginRepo(credentials: { email: string; password: string; }): Promise<{ admin: UserType | null; message: string; }> {
      try {
         console.log("inside interactor repo")
         const admin = await UserModel.findOne({ email: credentials.email })
         if (!admin || !admin.isAdmin) {
            return { admin, message: "Admin doesn't exist" }
         } else {
            const isPasswordMatch = await bcrypt.compare(credentials.password, admin.password)
            if (isPasswordMatch) {
               return { admin, message: "Admin Login Successfull" }
            } else {
               return { admin, message: "Incorrect password"}
            }
         }
      } catch(error: any){
         console.error("Error in admin Login Repo:", error);
         return {admin: null, message: error.message}
      }
   }

   async getRestaurantLists(): Promise<{ restaurants: object | null; message: string; }> {
      try{
         const restaurants = await restaurantModel.find({isApproved: true})
         return { restaurants, message : " restaurant list successfull"}
      } catch(error){
         console.error("Error in get restaurant repository",error);
         throw error
         
      }
   }

   
   async approve(): Promise<{ restaurants: object | null; message: string; }> {
      try{
         const restaurants = await restaurantModel.find({ isApproved: false })
         console.log(restaurants)
         return { restaurants, message: "restaurant list successfull"}
      }catch(error){
         console.error("Error in get restaurant approve repository:",error);
         throw error
      }
   }

   async getApprovalRestaurant(restaurantId: string): Promise<{ restaurants: object | null; message: string; }> {
     try {
         const restaurantDetails = await restaurantModel.findById(restaurantId)
         console.log(restaurantDetails)
         return { restaurants: restaurantDetails, message: "Restaurant details"}
     } catch (error) {
      console.log("Error in getApprovalRestaurant repository", error);
      throw error
      
     }
   }
  
   
   async confirmRestaurantApproval(restaurantId: string): Promise<{ success: boolean; message: string; }> {
      try{
         const restaurant = await restaurantModel.findByIdAndUpdate(restaurantId, {isApproved: true });
         console.log(restaurant)
         nodeMailerRestaurantApprovalMail(restaurant?.email as string)
         return { success: true, message: "Success"}
      } catch(error){
         console.log("Error occured in restaurant approval/confirmation", error)
         throw error
      }
   }



}
