import { Request, Response, NextFunction } from 'express'
import { UserInteractor } from '../../domain/interfaces/usecases/userInteractor'
import { UserType } from '../../domain/entities/User';

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

         const { email, password, role } = req.body
         console.log(email, password, role)

         if (!email || !password || !role) {
            return res.status(400).json({ message: "Email, password & role are required" })
         }

         const { user, message, token, refreshToken } = await this.interactor.login({ email, password, role })

         if (!user) {
            console.log("User not found or incorrect password")
            return res.status(401).json({ message: message, token: null })
         }
         console.log(token)
         
         if (user.role === 'user') {
            res.cookie('auth_token', token as string, {
               // httpOnly: true,
               secure: process.env.NODE_ENV === "production",
         
            });
         } else {
            console.log('seller......')
           res.cookie('seller_auth' , token as string , {
            // httpOnly : true,
            secure : process.env.NODE_ENV === 'production'
           })
         }

      //    const cookieOptions = {
      //       httpOnly: true,
      //       secure: process.env.NODE_ENV === "production",
      //       sameSite: 'strict' as const,
      //   };

      //   if (user.role === 'user') {
      //       res.cookie('auth_token', token as string, cookieOptions);
      //   } else if (user.role === "seller") {
      //       res.cookie('seller_auth', token as string, cookieOptions);
      //   }


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