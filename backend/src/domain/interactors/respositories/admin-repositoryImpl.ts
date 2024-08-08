import { UserType } from "../../entities/User"
import { AdminRepositories } from "../../interfaces/repositories/admin-repository";
import UserModel from "../../../frameworks/database/models/userModel"
import bcrypt from "bcryptjs"
import restaurantModel from "../../../frameworks/database/models/restaurantModel";
import nodeMailerRestaurantApprovalMail from "../../../functions/sendMailApproval"
import nodeMailerRestaurantRejectMail from "../../../functions/restoRejectMail"
import { generateAccessToken, generateRefreshToken } from "../../../functions/jwt";
import userModel from "../../../frameworks/database/models/userModel";

export class adminRepositoryImpl implements AdminRepositories {
   
   async adminLoginRepo(credentials: { email: string; password: string; }): Promise<{ admin: UserType | null; message: string; token: string | null; refreshToken: string | null }> {
      try {
         console.log("inside interactor repo")
         const admin = await UserModel.findOne({ email: credentials.email })
         console.log(admin)
         let token = null;
         let refreshToken = null;

         if (!admin || !admin.isAdmin) {
            return { admin, message: "Admin doesn't exist", token, refreshToken }
         } else {
            const isPasswordMatch = await bcrypt.compare(credentials.password, admin.password)
            if (isPasswordMatch) {
               if (admin) {
                  token = generateAccessToken(admin._id.toString(), "admin");
                  refreshToken = generateRefreshToken(admin._id.toString(), 'admin')
                  console.log(token)
               }
               return { admin, message: "Admin Login Successfull", token, refreshToken }
            } else {
               return { admin, message: "Incorrect password", token, refreshToken }
            }
         }
      } catch (error: any) {
         console.error("Error in admin Login Repo:", error);
         throw error
      }
   }

   async getRestaurantLists(): Promise<{ restaurants: object | null; message: string; }> {
      try {
         const restaurants = await restaurantModel.find({ isApproved: true })
         return { restaurants, message: " restaurant list successfull" }
      } catch (error) {
         console.error("Error in get restaurant repository", error);
         throw error

      }
   }

   async blockRestaurant(restaurantId: string, isBlocked: boolean): Promise<{ message: string; status: boolean; }> {
      try{
         const restaurant = await restaurantModel.findByIdAndUpdate(restaurantId, { isBlocked }, { new: true})
         console.log(restaurant)
         if(restaurant){
            console.log(restaurant)
            return { message:"User blocked successfully", status: true}
         } else {
            return { message: "restaurant not found", status: false}
         }
      } catch(error){
         console.log(error)
         throw error
      }
   }



   async approve(): Promise<{ restaurants: object | null; message: string; }> {
      try {
         const restaurants = await restaurantModel.find({ isApproved: false })
         console.log(restaurants)
         return { restaurants, message: "restaurant list successfull" }
      } catch (error) {
         console.error("Error in get restaurant approve repository:", error);
         throw error
      }
   }

   async getApprovalRestaurant(restaurantId: string): Promise<{ restaurants: object | null; message: string; }> {
      try {
         const restaurantDetails = await restaurantModel.findById(restaurantId)
         console.log(restaurantDetails)
         return { restaurants: restaurantDetails, message: "Restaurant details" }
      } catch (error) {
         console.log("Error in getApprovalRestaurant repository", error);
         throw error

      }
   }


   async confirmRestaurantApproval(restaurantId: string): Promise<{ success: boolean; message: string; }> {
      try {
         const restaurant = await restaurantModel.findByIdAndUpdate(restaurantId, { isApproved: true });
         console.log(restaurant)
         nodeMailerRestaurantApprovalMail(restaurant?.email as string)
         return { success: true, message: "Success" }
      } catch (error) {
         console.log("Error occured in restaurant approval/confirmation", error)
         throw error
      }
   }


   async confirmRestaurantRejection(restaurantId: string): Promise<{ success: boolean; message: string; }> {
      try {
         const restaurant = await restaurantModel.findByIdAndUpdate(restaurantId, { isApproved: false })
         console.log(restaurant)
         nodeMailerRestaurantRejectMail(restaurant?.email as string)
         return { success: true, message: "Success" }
      } catch (error) {
         console.log("Error occured in restaurant rejection", error)
         throw error
      }
   }

   async getUserLists(): Promise<{ users: object | null; message: string; }> {
      try {
         const users = await userModel.find({ isVerified: true })
         console.log(users)
         return { users, message: "User list successfull" }
      } catch (error) {
         console.log(error)
         throw error
      }
   }


   async blockUser(userId: string, isBlocked: boolean): Promise<{ message: string; status: boolean; }> {
      try {
         const user = await userModel.findByIdAndUpdate(userId, { isBlocked }, { new: true })
         console.log(user)
         if (user) {
            console.log(user);
            return { message: "User blocked successfully", status: true };
         } else {
            return { message: "User not found", status: false };
         }
      } catch (error) {
         console.log(error)
         throw error
      }
   }



}
