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
   
   
}



