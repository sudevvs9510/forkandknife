import { UserType } from "../../entities/User";
// import { SignupData } from "../../entities/signupData";

export interface UserRepository {
   findByCredentials( email: string, password: string ): Promise<{ user:UserType | null, message: string, token: string | null }>;
   createUser(user : UserType): Promise<{user: UserType | null, message: string}>
   verifyOtp(otp: string, userId: string): Promise<{message: string, status: boolean }>
   createGoogleUser(user : UserType): Promise<{user: UserType | null, message: string}>
   findGoogleCredentials( email: string): Promise<{ userData: UserType | null , message: string, token: string | null}>
   resend(userId: string): Promise<{ message: string, status: boolean}>

}