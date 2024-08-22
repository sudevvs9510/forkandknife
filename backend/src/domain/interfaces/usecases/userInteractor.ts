import { RestaurantType } from "../../entities/restaurant";
import { UserType } from "../../entities/User";


export interface UserInteractor{
   signup(data : UserType) : Promise<{user: UserType | null , message: string }>;
   login(credentials: { email: string, password: string }) : Promise<{ user: UserType | null, message: string, token: string | null, refreshToken: string | null}>;
   verifyotp(otp: string, userId: string ): Promise<{ message: string, status: boolean }>;
   googlelogin(credentials: { email: string, given_name: string, sub: string}): Promise<{ user: UserType | null, message: string, token: string | null, refreshToken: string | null}>
   resendOtp(userId: string): Promise <{ message: string, status: boolean }>;
   resetPasswordInteractor(email: string): Promise<{message: string; success: boolean }>
   resetPasswordUpdateItneractor(id:string, password:string): Promise<{ message: string; status: boolean }>

   getApprovedRestaurantsInteractor() : Promise<{ approvedRestaurants:RestaurantType[]}>
   // refreshAccessToken (refreshToken: string): Promise<string>;


   searchRestaurantInteractor(query: string, location?: { type: string, coordinates: number[] }): Promise<{ restaurants: RestaurantType[] }>;
   // getRestaurantsInteractor(query?: string, location?: {type: string; coordinates: number[]}): Promise<{restaurants: RestaurantType[]}>

   getProfileInteractor(userId: string): Promise <{ userDetails: UserType | null, status: boolean}>
   updateUserDetailsInteractor(userId: string, datas: UserType): Promise<{ updatedUser: UserType | null; status: boolean}>

   getBookingHistoryInteractor(userId: string): Promise<{ message: string, bookingDatas: object}>
   getBookingDetailsInteractor(bookingId: string): Promise<{message: string, bookingData: object}>

   addReviewsInteractor(reviewDetails: {restaurantId: string,userId: string,username: string,description: string,rating: number}): Promise<{ message: string, reviewData: object }>
   getReviewsInteractor(restaurantId: string): Promise<{ message: string, reviewDatas: object}>

   getWalletInteractor(userId : string): Promise<{ message: string, walletDatas: object | null }>
   cancelBookingInteractor(bookingId: string, userId: string, cancellationReason: string, tableId: string): Promise<{ message: string, status:boolean}>

   downloadInvoiceinteractor(bookingId: string): Promise<{ message: string, status: boolean, invoicePdf: string}>

}



