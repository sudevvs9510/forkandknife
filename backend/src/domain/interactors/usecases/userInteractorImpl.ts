
import { generateAccessToken, generateRefreshToken } from "../../../functions/jwt";
import { UserType } from "../../entities/User";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { UserInteractor } from "../../interfaces/usecases/userInteractor";
import { IMailer } from '../../../Config/mailer'
import userModel from "../../../frameworks/database/models/userModel";



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
         console.log("email:", credentials.email);
         console.log("Password:", credentials.password)

         const { user, message, token } = await this.Repository.findByCredentials(credentials.email, credentials.password)
         console.log("Usecase", user, token, message);

         let refreshToken = ""
         if (user) {
            refreshToken = generateRefreshToken(user.id as string)
         }
         console.log(token, user);
         return { user, message, token, refreshToken }
      } catch (err) {
         console.error("Error during login:", err);
         throw err
      }
   }


   async verifyotp( otp: string, userId: string ): Promise<{ message: string; status: boolean }> {
      try {
         console.log("verify otp")
         const { message,status } = await this.Repository.verifyOtp(otp, userId)
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
          const { user, message:createMessage  } = await this.Repository.createGoogleUser({ email, username: given_name, password: sub });
         //  user = { user: newUser, message: "User created and logged in", token: null };
         message = createMessage;
         if(user){
            token = await generateAccessToken(user.id as string)
         }
         return { user , message, token , refreshToken : null};
      }

  
      const refreshToken = userData ? await generateRefreshToken(userData.id as string) : null;
      return { user : userData , message, token, refreshToken };
      } catch (err) {
        console.error(err);
        throw err;
      }
    }

   async resendOtp (userId: string): Promise <{message: string; status:boolean}>{
      try{
         const { message, status } = await this.Repository.resend(userId)
         return { message, status }
       } catch(error){
         console.log(error);
         throw error
       }
   }

}
