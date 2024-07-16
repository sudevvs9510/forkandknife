import { Request, Response, NextFunction } from 'express'
import { UserInteractor } from '../../domain/interfaces/usecases/userInteractor'
import { UserType } from '../../domain/entities/User';
import { setCookieAuthToken } from "../../functions/cookieFun"
import { stat } from 'fs';
import { NetConnectOpts } from 'net';
import { generateAccessToken, jwtVerifyToken } from '../../functions/jwt';
import restaurantModel from '../../frameworks/database/models/restaurantModel';
import restaurantTableModel from '../../frameworks/database/models/restaurantTableModel';


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

         const { email, password } = req.body
         console.log(email, password)

         if (!email || !password) {
            return res.status(400).json({ message: "Email, password & role are required" })
         }

         const { user, message, token, refreshToken } = await this.interactor.login({ email, password })

         if (!user) {
            console.log("User not found or incorrect password")
            return res.status(401).json({ message: "Failed to login user", token: null })
         }
         console.log(token)

         if (token) {
            setCookieAuthToken(res, "RefreshAuthToken", token);
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
         console.log("otp verify", otp)
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
         if (token) {
            setCookieAuthToken(res, "RefreshAuthToken", token);
         }
         if (user) {
            console.log('userController:', user, 'Token', token, 'refreshToken', refreshToken)
            setCookieAuthToken(res, "RefreshAuthToken", token as string)
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


   async resetPasswordGetUser(req: Request, res: Response, next: NextFunction) {
      console.log("Reset password controller")
      const { email } = req.body
      try {
         const { message, success } = await this.interactor.resetPasswordInteractor(email)
         if (!success) return res.status(401).json({ message, success })
         return res.status(200).json({ message: "Password reset link sent to your email", success })
      } catch (error) {
         console.error(error);
         return res.status(500).json({ message: "Internal server error" })
      }
   }

   async resetPasswordUpdate(req: Request, res: Response, next: NextFunction) {
      console.log("Reset password update controller")
      console.log(req.body)

      const { password } = req.body
      const { id } = req.params

      if (!password) {
         return res.status(400).json({ message: "Password is required", status: false });
      }

      try {
         console.log("userId:", id);
         const { message, status } = await this.interactor.resetPasswordUpdateItneractor(id, password)
         if (!status) return res.status(401).json({ message, status })
         return res.status(200).json({ message, status })
      } catch (error) {
         console.log("Error during reset password service", error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }


   async getRestaurants(req: Request, res: Response, next: NextFunction) {
      console.log("Get Restaurant controller")
      try {
         const { approvedRestaurants } = await this.interactor.getApprovedRestaurantsInteractor()
         console.log(approvedRestaurants)
         return res.status(200).json({ restaurant: approvedRestaurants, messgae: "successfull" })
      } catch (error) {
         console.log(error);
         return res.status(500).json({ message: "Internal server error" })
      }
   }

   async restaurantDetalis(req: Request, res: Response, next: NextFunction) {
      console.log("Restaurant details controller")
      const { restaurantId } = req.params
      try {
         const restaurant = await restaurantModel.findById(restaurantId)
         return res.status(200).json({ restaurant, message: "successfull" })
      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "internal server error" })
      }
   }

   async getUserProfile(req:Request, res:Response, next: NextFunction){
      console.log("Get user profile controller")
      console.log("userId from req:", req.userId);
      const userId = req.userId
      try{
         const { userDetails, status } = await this.interactor.getProfileInteractor(userId)
         console.log( userDetails) 
         if(!status){
            return res.status(404).json({ message: "Failed to fetch the data"})
         }
         return res.status(200).json({ message: "User details", userData: userDetails})
      } catch(error){
         console.log("Error occured in getProfile controller", error)
         return res.status(500).json({ message: "Internal server error" })
      }

   }


   async updateUserDetails(req:Request, res: Response, next: NextFunction){
      console.log("Update user details controller")
      const userDetails  = req.body
      console.log(req.body)
      try{
         const { userId } = req.params 
         console.log("User ID:", userId);
         const {updatedUser, status} = await this.interactor.updateUserDetailsInteractor(userId, userDetails)
         if(!status){
            return res.status(404).json({ message: "Failed to update the data", status, updatedUser})
         }
         return res.status(200).json({ message:" Updated successfully", updatedUser, status})
      } catch(error){
         console.log("Error during updating profile", error)
         return res.status(500).json({ message: "Internal server error"})
      }
   }


   async restaruantTableDetails (req:Request, res: Response, next:NextFunction){
      console.log("Restaruant table details controller")
      const { tableId } = req.params
      try{
         const restaurantTable = await restaurantTableModel.findById(tableId)
         console.log(restaurantTable)
         return res.status(200).json({ restaurantTable, message:"Successfull"})

      } catch(error){
         console.log("Error in restaurant Table Details controller",error)
         return res.status(500).json({ message: "Internal server error"})
      }
   }


   async restaurantTableSlots(req:Request, res: Response, next: NextFunction){
      console.log("Restaurant table slots controller")

   }


   async Logout(req: Request, res: Response, next: NextFunction) {
      console.log("Logout user");
      try {

         res.clearCookie("RefreshAuthToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
         })

         return res.status(200).json({ message: "Logout successfull" })
      } catch (error) {
         console.error(" OOps ! error during resend otp service:", error);
         return res.status(500).send("Internal server error");
      }
   }




   async searchRestaurants(req: Request, res: Response, next: NextFunction) {
      try {
         const { query, location } = req.body;

         // if(!query){
         //    return res.status(400).json({ message: "Query is required" })
         // }
         const parsedLocation = location ? JSON.parse(location as string) : undefined;
         const { restaurants } = await this.interactor.searchRestaurantInteractor(query, parsedLocation);
         return res.status(200).json({ restaurants, message: "Search successful" });
      } catch (error) {
         console.log("Error occured in search Restaurants controller:", error)
         return res.status(500).send(" internal server error")
      }
   }






}