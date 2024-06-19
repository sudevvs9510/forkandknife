import { Request, Response, NextFunction } from 'express'
import { UserInteractor } from '../../domain/interfaces/usecases/userInteractor'
import { UserType } from '../../domain/entities/User';
import { setCookieAuthToken } from "../../functions/cookieFun"
import { stat } from 'fs';
import { NetConnectOpts } from 'net';

export class userController {

   constructor(private readonly interactor: UserInteractor) { }


   async signup(req: Request, res: Response, next: NextFunction) {
      try {
         const { username, email, phone, password, role } = req.body
         console.log('Signup', req.body);
         let credentials: UserType = { email, username, phone, password, role }

         const { user, message } = await this.interactor.signup(credentials)
         if (!user) {
            res.status(400).json({ message })
         } else {
            console.log(user);
            res.status(201).json({ message, user })
         }
      } catch (error) {
         console.error('Error during signup', error);
         res.status(500).send('Internal server error')
      }
   }


   async login(req: Request, res: Response, next: NextFunction) {
      try {

         console.log('Login Controller');
         console.log('loginData ', req.body);

         const { email, password} = req.body
         console.log(email, password)

         if (!email || !password ) {
            return res.status(400).json({ message: "Email, password & role are required" })
         }

         const { user, message, token, refreshToken } = await this.interactor.login({ email, password })

         if (!user) {
            console.log("User not found or incorrect password")
            return res.status(401).json({ message: "Failed to login user", token: null })
         }
         console.log(token)
         
         if(token){
            setCookieAuthToken(res,"UserAuth_token",token);
         }
 
         console.log('userController:', user, 'Token', token, 'refreshToken', refreshToken)
         return res.status(200).json({ message: 'Login Successful', user, token, refreshToken });

      } catch (err) {
         console.error('Error login:', err);
         res.status(500).send("Internal server error")
      }
   }

   async verifyOTP(req: Request, res: Response, next: NextFunction) {
      console.log("OTP- controller verification")
      try {
         const { otp: { otp }, userId } = req.body
         console.log("otp verify",otp)
         const { message, status } = await this.interactor.verifyotp(otp, userId)

         if (!status) {
            res.status(401).json({ message, status })
         } else {
            res.status(200).json({ message, status })
         }
      } catch (error) {
         console.error('Error verifying OTP:', error);
         res.status(500).json({ success: false, message: 'Internal server error.' })
         throw error

      }
   }

   async googleLogin(req: Request, res: Response, next: NextFunction) {
      try {
         console.log("google login controller");
         const { email, given_name, sub } = req.body
         console.log(email, given_name, sub);
         const { user, message, token, refreshToken } = await this.interactor.googlelogin({ email, given_name, sub })
         if (user) {
            console.log('userController:', user, 'Token', token, 'refreshToken', refreshToken)
            setCookieAuthToken(res, "google_auth", token as string)
            res.status(200).json({ user, message, token, refreshToken })
         } else {
            console.log(message)
            res.status(401).json({ message })
         }
      } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Internal Server Error' });
         throw err

      }
   }


   async ResendOtp(req: Request, res: Response, next: NextFunction) {
      console.log('Resend OTP')
      try {
         const { userId } = req.body
         console.log("userId", userId)
         const { message, status } = await this.interactor.resendOtp(userId)
         if (!status) {
            return res.status(401).json({ message, status })
         }
         return res.status(201).json({ message, status })
      } catch (error) {
         console.error("Error during resend otp service", error);
         res.status(500).send("Internal server error")
      }
   }


   async home(req: Request, res: Response, next: NextFunction) {
      try {

      } catch (err) {
         console.error(err);

      }
   }


   async resetPasswordGetUser (req: Request, res: Response, next: NextFunction){
      console.log("Reset password controller")
      const { email } = req.body
      try{
         const { message, success } = await this.interactor.resetPasswordInteractor(email)
         if(!success) return res.status(401).json({ message , success })
         return res.status(200).json({ message: "Password reset link sent to your email", success })
      }catch(error){
         console.error(error);
         return res.status(500).json({message: "Internal server error"})
      }
   }

   async resetPasswordUpdate(req:Request, res:Response, next: NextFunction){
      console.log("Reset password update controller")
      console.log(req.body)

      const  { password } = req.body
      const { id } = req.params

      if (!password) {
         return res.status(400).json({ message: "Password is required", status: false });
     }

      try {
         console.log("userId:",id);
         const { message, status} = await this.interactor.resetPasswordUpdateItneractor(id, password)
         if(!status) return res.status(401).json({ message, status })
            return res.status(200).json({ message,status })
      } catch (error) {
         console.log("Error during reset password service",error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }


   async getRestaurants (req:Request, res: Response, next: NextFunction){
      console.log("Get Restaurant controller")
      try{
         const { approvedRestaurants } = await this.interactor.getApprovedRestaurantsInteractor()
         console.log("")
         return res.status(200).json({ restaurant : approvedRestaurants, messgae: "successfull"})
      } catch(error){
         console.log(error);
         return res.status(500).json({ message: "Internal server error"})
      }
   }

   async Logout(req: Request, res: Response, next: NextFunction) {
      console.log("Logout user");
      try {
         res.cookie("auth_token","",{
          expires: new Date(0),
         })
         res.send()
      } catch (error) {
        console.error(" OOps ! error during resend otp service:", error);
        res.status(500).send("Internal server error");
      }
    }


}