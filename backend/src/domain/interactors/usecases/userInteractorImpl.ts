
import { generateAccessToken, generateRefreshToken, jwtVerifyToken } from "../../../functions/jwt";
import { UserType } from "../../entities/User";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { UserInteractor } from "../../interfaces/usecases/userInteractor";
import { IMailer } from '../../../Config/mailer'
import userModel from "../../../frameworks/database/models/userModel";
import { RestaurantType } from "../../entities/restaurant";
import { Error } from "mongoose";



export class UserInteractorImpl implements UserInteractor {

   constructor(private readonly Repository: UserRepository, mailer: IMailer) { }
   
   async signup(credentials: UserType): Promise<{ user: UserType | null, message: string }> {
      try {
         console.log("Signup ----");

         const { user, message } = await this.Repository.createUser(credentials)
         console.log('Usercase returned', user, message);
         return { user, message }
      } catch (error) {
         console.error("Error during signup", error);
         throw error
      }
   }

   async login(credentials: { email: string, password: string }): Promise<{ user: UserType | null, message: string, token: string | null, refreshToken: string | null }> {
      try {
         console.log("userInteractor: LOGIN")
         const { user, message, token } = await this.Repository.findByCredentials(credentials.email, credentials.password)
         console.log("Usecase", user, token, message);

         let refreshToken = ""
         if (user) {
            refreshToken = generateRefreshToken(user.id as string, 'user')
         }
         console.log(token, user);
         return { user, message, token, refreshToken }
      } catch (err) {
         console.error("Error during login:", err);
         throw err
      }
   }


   async verifyotp(otp: string, userId: string): Promise<{ message: string; status: boolean }> {
      try {
         console.log("verify otp")
         const { message, status } = await this.Repository.verifyOtp(otp, userId)
         console.log("interactor verify otp:",message, status)
         return { message, status }
      }
      catch (err) {
         console.error('Error verifying OTP:', err);
         throw err
      }
   }

   async googlelogin(credentials: { email: string; given_name: string; sub: string }): Promise<{ user: UserType | null; message: string; token: string | null; refreshToken: string | null }> {
      try {

         const { email, given_name, sub } = credentials;
         console.log("Googel Login usecaseimpl", email, given_name, sub)
         let { userData, message, token } = await this.Repository.findGoogleCredentials(email);

         if (!userData) {
            // User does not exist, create a new one using createGoogleUser
            const { user, message: createMessage } = await this.Repository.createGoogleUser({ email, username: given_name, password: sub });
            //  user = { user: newUser, message: "User created and logged in", token: null };
            message = createMessage;
            if (user) {
               token = generateAccessToken(user.id as string, 'user')
            }
            return { user, message, token, refreshToken: null };
         }


         const refreshToken = userData ? generateRefreshToken(userData.id as string, 'user') : null;
         return { user: userData, message, token, refreshToken };
      } catch (err) {
         console.error(err);
         throw err;
      }
   }

   async resendOtp(userId: string): Promise<{ message: string; status: boolean }> {
      try {
         const { message, status } = await this.Repository.resend(userId)
         return { message, status }
      } catch (error) {
         console.log(error);
         throw error
      }
   }

   async resetPasswordInteractor(email: string): Promise<{ message: string; success: boolean; }> {
      try {
         const { message, success } = await this.Repository.resetPassword(email)
         return { message, success }
      } catch (error) {
         console.log(error)
         throw error
      }
   }


   async resetPasswordUpdateItneractor(id: string, password: string): Promise<{ message: string; status: boolean; }> {
      try {
         const { message, status } = await this.Repository.confirmResetPassword(id, password)
         return { message, status }
      } catch (error) {
         console.log(error)
         throw error
      }
   }

   async getApprovedRestaurantsInteractor(): Promise<{ approvedRestaurants: RestaurantType[]; }> {
      try {
         const { approvedRestaurants } = await this.Repository.getApprovedRestaurants()
         return { approvedRestaurants }
      } catch (error) {
         console.log(error)
         throw error
      }
   }



   async searchRestaurantInteractor(query: string, location?: { type: string; coordinates: number[]; }): Promise<{ restaurants: RestaurantType[]; }> {
      try {
         return this.Repository.searchRestaurants(query, location)
      } catch (error) {
         console.error(error);
         throw error
      }
   }

   async getProfileInteractor(userId: string): Promise<{ userDetails: UserType | null; status: boolean; }> {
      try {
         const { userDetails, status } = await this.Repository.getProfileDetails(userId)
         return { userDetails, status }
      } catch (error) {
         console.log("Error in get profile Interactor", error)
         throw error
      }
   }


   async updateUserDetailsInteractor(userId: string, datas: UserType): Promise<{ updatedUser: UserType | null; status: boolean; }> {
      try {
         console.log("User ID and datas in interactor:", { userId, datas });
         const { updatedUser, status } = await this.Repository.updateUser(userId, datas)
         return { updatedUser, status }
      } catch (error) {
         console.log(error)
         throw error
      }
   }


   async getBookingHistoryInteractor(userId: string): Promise<{ message: string; bookingDatas: object; }> {
      try {
         const { message, bookingDatas } = await this.Repository.getBookingHistory(userId)
         return { message, bookingDatas }
      } catch (error) {
         console.error(error);
         throw error
      }
   }


   async getBookingDetailsInteractor(bookingId: string): Promise<{ message: string; bookingData: object; }> {
      try {
         console.log(`Interactor querying for bookingId: ${bookingId}`);
         const { bookingData, message } = await this.Repository.getBookingDetails(bookingId);
         return { bookingData, message };
      } catch (error) {
         console.error(error);
         throw error;
      }
   }

   // In userInteractorImpl.ts

   async addReviewsInteractor(reviewDetails: {
      restaurantId: string,
      userId: string,
      username: string,
      description: string,
      rating: number
   }): Promise<{ message: string; reviewData: object; }> {
      try {
         const { reviewData, message } = await this.Repository.addReviews(reviewDetails);
         return { reviewData, message };
      } catch (error) {
         console.log(error);
         throw error;
      }
   }


   async getReviewsInteractor(restaurantId: string): Promise<{ message: string; reviewDatas: object; }> {
      try{
         console.log(restaurantId)
         const { reviewDatas, message } = await this.Repository.getReviews(restaurantId)
         return { reviewDatas , message}
      } catch(error){
         console.log(error)
         throw error
      }
   }


   async getWalletInteractor(userId: string): Promise<{ message: string; walletDatas: object | null; }> {
      try{
         const { message, walletDatas} = await this.Repository.getWalletDetails(userId)
         return { message, walletDatas}
      } catch(error){
         console.log(error)
         throw error
      }
   }


   async cancelBookingInteractor(bookingId: string, userId: string, cancellationReason: string, tableId: string): Promise<{ message: string; status: boolean; }> {
      try{
         const { status, message } = await this.Repository.cancelBooking(bookingId, userId,cancellationReason, tableId)
         return { status, message }
      } catch(error){
         console.log(error)
         throw error
      }
   }

   async downloadInvoiceinteractor(bookingId: string): Promise<{ message: string; status: boolean;invoicePdf:string}> {
      try{
         const { message, status, invoicePdf } = await this.Repository.downloadInvoice(bookingId)
         return { message, status, invoicePdf }
      } catch(error){
         console.log(error)
         throw error
      }
   }


}