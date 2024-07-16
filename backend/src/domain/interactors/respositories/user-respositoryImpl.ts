import bcrypt, { compareSync } from 'bcryptjs'
import { UserType } from "../../entities/User";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import userModel from "../../../frameworks/database/models/userModel";
import { generateAccessToken } from '../../../functions/jwt'
import { otpGenerator } from '../../../functions/OTP-Generator'
import { createNodemailerOtp } from '../../../functions/sendMail';
import { OTPModel } from '../../../frameworks/database/models/otpModel'
import reset_PasswordMailer from "../../../functions/sendMailResetPassword"
import { hashedPasswordFunction } from "../../../functions/bcryptFunctions"
import { RestaurantType } from '../../entities/restaurant';
import restaurantModel from '../../../frameworks/database/models/restaurantModel';
import mongoose from 'mongoose';



export class UserRepositoryImpl implements UserRepository {


   async findByCredentials(email: string, password: string): Promise<{ user: UserType | null; message: string; token: string | null }> {
      try {
         console.log("s REPOSITORY ----");
         console.log("Email:", email);
         console.log("Password provided:", password);

         const user = await userModel.findOne({ email: email });
         console.log("User found:", user);

         let message = '';
         let token = null;

         if (!user) {
            message = "Invalid User";
         } else {
            console.log("Password from user:", user.password);
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            console.log("Password match result:", isPasswordMatch);

            if (!isPasswordMatch) {
               console.log('Invalid password');
               message = "Invalid password";
            } else {
               token = generateAccessToken(user._id as string, 'user');
               console.log('Token generated:', token);
            }
         }

         if (user && !message) {
            return { user: user, message: "Login Successful", token };
         }
         console.log('Final message:', message);
         return { user: null, message, token };

      } catch (error) {
         console.error("Error in findByCredentials:", error);
         return { user: null, message: "An error occurred", token: null };
      }
   }


   async createUser(user: UserType): Promise<{ user: UserType | null; message: string }> {
      const { username, email, password, role } = user;
      console.log(password)
      const otp = otpGenerator.generateOtp()
      createNodemailerOtp(user.email as string, otp)
      const newUser = new userModel({
         username,
         email,
         password,
         otp,
         role
      })
      console.log(newUser)
      await newUser.save()
      const otpData = new OTPModel({ otp: otp, userId: newUser._id })
      await otpData.save()
      return {
         user: newUser as UserType,
         message: "User created successfully"
      }
   }

   async verifyOtp(otp: string, userId: string): Promise<{ message: string; status: boolean }> {
      console.log("verifyOTP");
      console.log(userId);

      const otpData = await OTPModel.findOne({ userId: userId })
      const userData = await userModel.findById(userId)
      console.log("user", userData, "otp", otpData);
      if (userData && otpData) {
         if (otp == otpData.otp) {
            userData.isVerified = true;
            userData.otp = ''
            await userData.save()
            return { status: true, message: "OTP verified successfully" }
         }
      }
      return { status: false, message: "Incorrect OTP" }
   }


   async createGoogleUser(user: { email: string; username: string; password: string }): Promise<{ user: UserType | null, message: string }> {
      const { username, email, password } = user
      const newUser = new userModel({ username, email, password, isVerified: true, role: "user" })
      await newUser.save()
      return {
         user: newUser as UserType,
         message: " User created successfully"
      }
   }

   async findGoogleCredentials(email: string): Promise<{ userData: UserType | null; message: string; token: string | null; }> {
      console.log("find credentials");
      const user = await userModel.findOne({ email: email })

      console.log(user);
      let message = ""
      let token = null
      if (!user) {
         message = " User not found"
      } else {
         token = generateAccessToken(user.id as string, 'user')
         console.log(token);
      }
      return { userData: user, message, token }
   }


   async resend(userId: string): Promise<{ message: string; status: boolean }> {
      console.log("resend repositoryImp", userId)
      const user = await userModel.findOne({ _id: userId })
      console.log(user);
      if (user) {
         const otp = otpGenerator.generateOtp()
         createNodemailerOtp(user.email as string, otp)
         const otpData = new OTPModel({ otp: otp, userId: user._id })
         await otpData.save()
         return { status: true, message: "OTP Resend successfully" }
      }
      return { status: false, message: "Incorrect OTP" }
   }


   async resetPassword(email: string): Promise<{ message: string; success: boolean; }> {
      console.log("Reset password repopsitory")
      try {
         const user = await userModel.findOne({ email })
         if (!user) {
            console.log("User not found");
            return { message: "User not found", success: false }
         }

         reset_PasswordMailer(user.email, user._id as string)
         return { message: "User exists", success: true }
      } catch (error) {
         console.log("Error in reset password repository", error)
         throw error
      }
   }

   async confirmResetPassword(id: string, password: string): Promise<{ message: string; status: boolean; }> {
      try {
         console.log("Confirm reset password repository", id)
         const hashedPassword = await hashedPasswordFunction(password)
         console.log("Passswordsds..", password, hashedPassword)
         const user = await userModel.findByIdAndUpdate(id, { password: hashedPassword })
         if (!user) {
            console.log("failed to update password")
            return { message: "Somethinf went wrong", status: false }
         }
         return { message: "Succesfully reseted password", status: true }
      } catch (error) {
         console.log("Error occured in reset password repository", error)
         throw error
      }
   }



   async getApprovedRestaurants(): Promise<{ approvedRestaurants: RestaurantType[]; }> {
      try {
         const approvedRestaurants: RestaurantType[] = await restaurantModel.aggregate([
            { $match: { isApproved: true } },
            { $match: { $and: [{ featuredImage: { $exists: true } }, { address: { $exists: true } }] } },
            { $sort: { createdAt: -1 } }
         ])
         return { approvedRestaurants: approvedRestaurants }
      } catch (error) {
         console.log("Error occured in get approved restaurants:", error)
         throw error
      }
   }


   async searchRestaurants(query: string, location?: { type: string; coordinates: number[]; }): Promise<{ restaurants: RestaurantType[]; }> {
      try {
         const searchCriteria: any = {
            isApproved: true,
         };

         if (query) {
            searchCriteria.$or = [
               { restaurantName: { $regex: query, $options: 'i' } },
               { place: { $regex: query, $options: 'i' } },
            ];
         }

         if (location) {
            searchCriteria.location = {
               $geoWithin: {
                  $centerSphere: [location.coordinates, 10 / 3963.2], // 10 miles radius
               }
            };
         }

         // Fetch specific fields from the database
         const restaurants: RestaurantType[] = await restaurantModel.find(searchCriteria)
            .select('restaurantName place featuredImage'); // Add other fields as needed

         return { restaurants };
      } catch (error) {
         console.log("Error occured while searching restaurants:", error)
         throw error
      }
   }

   async getProfileDetails(_id: string): Promise<{ userDetails: UserType | null; status: boolean; }> {
      try {
         if (!mongoose.Types.ObjectId.isValid(_id)) {
            return { userDetails: null, status: false };
         }
         console.log(_id)
         const userDetails = await userModel.findById(_id).select("-password")
         console.log(userDetails)

         if (!userDetails) {
            return { userDetails: null, status: false }
         }
         return { userDetails: userDetails, status: true }
      } catch (error) {
         console.log("Error in getProfile repository", error)
         throw error
      }
   }

   async updateUser(_id: string, datas: UserType): Promise<{ updatedUser: UserType | null; status: boolean; }> {
      try {
         console.log("Update data received in repository:", { _id, datas });

         const updateFields = {} as { [key: string]: any };
         if (datas.username !== undefined) {
            updateFields['username'] = datas.username;
         }
         if (datas.phone !== undefined) {
            updateFields['phone'] = datas.phone;
         }
         console.log("Update fields being set:", updateFields);

         const updatedUser = await userModel.findByIdAndUpdate(_id, updateFields, { new: true }).exec();
         console.log("Updated user from DB:", updatedUser); // Log the updated user

         if (!updatedUser) {
            return { status: false, updatedUser: null };
         }
         return { status: true, updatedUser };
      } catch (error) {
         console.log("Error in updateUser repository", error)
         throw error
      }
   }

}



