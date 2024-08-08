import { RestaurantType } from "../../entities/restaurant";
import { UserType } from "../../entities/User";
// import { SignupData } from "../../entities/signupData";

export interface UserRepository {
   findByCredentials( email: string, password: string ): Promise<{ user:UserType | null, message: string, token: string | null }>;
   createUser(user : UserType): Promise<{user: UserType | null, message: string}>
   verifyOtp(otp: string, userId: string): Promise<{message: string, status: boolean }>
   createGoogleUser(user : UserType): Promise<{user: UserType | null, message: string}>
   findGoogleCredentials( email: string): Promise<{ userData: UserType | null , message: string, token: string | null}>
   resend(userId: string): Promise<{ message: string, status: boolean}>
   resetPassword(email: string):Promise<{message: string; success: boolean}>
   confirmResetPassword(id: string, password:string): Promise<{message: string, status: boolean}>
   getApprovedRestaurants() : Promise<{approvedRestaurants: RestaurantType[]}>


   searchRestaurants(query: string, location?: { type: string, coordinates: number[]}) : Promise<{ restaurants: RestaurantType[]}>

   getProfileDetails(userId: string) : Promise<{ userDetails: UserType | null, status: boolean}>
   updateUser(_id: string, datas: UserType): Promise<{ updatedUser: UserType | null; status: boolean}>

   getBookingHistory(userId: string): Promise<{ message: string; bookingDatas: object} >
   getBookingDetails(bookingId: string): Promise<{ message:string, bookingData: object}>

   addReviews(reviewDetails: {restaurantId: string,userId: string,username: string,description: string,rating: number}): Promise<{ message:string, reviewData: object}>
   getReviews(restaurantId: string): Promise<{ message: string, reviewDatas: object}>

   getWalletDetails(userId: string): Promise<{ message: string, walletDatas: object | null}>

   cancelBooking(bookingId: string, userId: string): Promise<{ message: string, status: boolean}>



}