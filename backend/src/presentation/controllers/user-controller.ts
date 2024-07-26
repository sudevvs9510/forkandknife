import { Request, Response, NextFunction } from 'express'
import { UserInteractor } from '../../domain/interfaces/usecases/userInteractor'
import { UserType } from '../../domain/entities/User';
import { setCookieAuthToken } from "../../functions/cookieFun"
import restaurantModel from '../../frameworks/database/models/restaurantModel';
import restaurantTableModel from '../../frameworks/database/models/restaurantTableModel';
import tableSlotsModel from '../../frameworks/database/models/restaurantTableSlotsModel';
import { paymentDataRetrieval } from "../../functions/Booking/paymentDataRetrieval"
import { createPayment } from "../../functions/Booking/paymentIntegration"
import bookingModel from "../../frameworks/database/models/bookingModel"
import mongoose from 'mongoose';

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

   async getUserProfile(req: Request, res: Response, next: NextFunction) {
      console.log("Get user profile controller")
      console.log("userId from req:", req.userId);
      const userId = req.userId
      try {
         const { userDetails, status } = await this.interactor.getProfileInteractor(userId)
         console.log(userDetails)
         if (!status) {
            return res.status(404).json({ message: "Failed to fetch the data" })
         }
         return res.status(200).json({ message: "User details", userData: userDetails })
      } catch (error) {
         console.log("Error occured in getProfile controller", error)
         return res.status(500).json({ message: "Internal server error" })
      }

   }


   async updateUserDetails(req: Request, res: Response, next: NextFunction) {
      console.log("Update user details controller")
      const userDetails = req.body
      console.log(req.body)
      try {
         const { userId } = req.params
         console.log("User ID:", userId);
         const { updatedUser, status } = await this.interactor.updateUserDetailsInteractor(userId, userDetails)
         if (!status) {
            return res.status(404).json({ message: "Failed to update the data", status, updatedUser })
         }
         return res.status(200).json({ message: " Updated successfully", updatedUser, status })
      } catch (error) {
         console.log("Error during updating profile", error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }


   async restaruantTableDetails(req: Request, res: Response, next: NextFunction) {
      console.log("Restaruant table details controller")
      const { tableId } = req.params
      try {
         const restaurantTable = await restaurantTableModel.findById(tableId)
         console.log(restaurantTable)
         return res.status(200).json({ restaurantTable, message: "Successfull" })

      } catch (error) {
         console.log("Error in restaurant Table Details controller", error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }




   async restaurantTableSlots(req: Request, res: Response, next: NextFunction) {
      console.log("Restaurant table slots controller");
      const { restaurantId, date, selectedGuests } = req.body;
      console.log("body :", req.body);
      try {
         if (!restaurantId || !date || !selectedGuests) {
            return res.status(400).json({ message: 'All parameters are required' });
         }

         const restId = restaurantId.split(":");
         console.log("tableslotdatas:", restId, date, selectedGuests);

         const restaurantTables = await restaurantTableModel.find({
            restaurantId: restId
         }).exec();

         console.log("restaurantTables:", restaurantTables);

         let allTimeSlots: any[] = [];

         const dateObj = new Date(date);
         console.log("Parsed Date Object:", dateObj);

         for (const table of restaurantTables) {
            console.log(`Fetching time slots for table ID: ${table._id}, Date: ${date}`);

            const timeSlots = await tableSlotsModel.find({
               tableId: table._id,
               isAvailable: true,
               slotDate: dateObj,
            }).exec();

            console.log(`Time slots for table ID: ${table._id}:`, timeSlots);

            if (table.tableCapacity >= Number(selectedGuests)) {
               // Include table details in the time slots
               const timeSlotsWithTableDetails = timeSlots.map(slot => ({
                  ...slot.toObject(),
                  tableDetails: table
               }));
               allTimeSlots.push(...timeSlotsWithTableDetails);
            }
         }
         console.log("allTimeSlots:", allTimeSlots);

         if (allTimeSlots.length > 0) {
            return res.status(200).json({ timeSlots: allTimeSlots, message: "Success" });
         } else {
            return res.status(400).json({ timeSlots: [], message: "No available time slots" });
         }
      } catch (error) {
         console.log("Error in restaurant table slot controller", error);
         res.status(500).json({ message: "Internal server error" });
      }
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
         res.status(500).json({ message: "Internal server error" });
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
         res.status(500).json({ message: "Internal server error" });
      }
   }


   async makePayment(req: Request, res: Response, next: NextFunction) {
      console.log("make payements")

      const { restaurantDatas, userEmail, userUsername, restaurantId, tableSlotId, userId, bookingTime } = req.body

      console.log(restaurantDatas, userEmail, userUsername, restaurantId, tableSlotId, userId, bookingTime)
      try {
         const totalAmount = restaurantDatas.tableRate * restaurantDatas.guests
         const bookingId = new mongoose.Types.ObjectId().toString()
         const session = await createPayment({ userEmail, userUsername }, totalAmount, bookingId, tableSlotId);
         console.log(session)

         const newBooking = new bookingModel({
            bookingId: bookingId,
            userId,
            tableId: tableSlotId,
            restaurantId: restaurantId,
            bookingDate: new Date(),
            bookingTime,
            paymentMethod: "Online",
            paymentStatus: "PENDING",
            bookingStatus: "PENDING",
            totalAmount,
         })

         await newBooking.save()

         console.log("Booking saved:", newBooking)

         return res.status(200).json({ sessionId: session.id, bookingId: newBooking.bookingId })
      } catch (error) {
         console.log(error)
         res.status(500).json({ message: "Internal server error" });
      }
   }


   async booking(req: Request, res: Response, next: NextFunction) {
      try {
         const paymentId = req.body.paymentId
         const paymentIntent = await paymentDataRetrieval(paymentId)
         if (!paymentIntent) {
            return res.status(400).json({ message: "Payment intent not found" })
         }
      } catch (error) {
         console.log(error)
         res.status(500).json({ message: "Internal server error" });
      }
   }

   //to update booking status and isAvailable after payment
   // async updateSlotAndBookingStatus(req: Request, res: Response, next: NextFunction) {
   //    console.log("update slot and booking status controller")
   //    const { bookingId, tableSlotId } = req.body

   //    console.log(bookingId, tableSlotId)

   //    if (!bookingId || !tableSlotId) {
   //       return res.status(400).json({ error: 'Booking ID and TableSlot ID are required' });
   //    }

   //    try {
   //       await bookingModel.findOneAndUpdate(
   //          { bookingId: bookingId },
   //          {
   //             paymentStatus: "PAID",
   //             bookingStatus: "CONFIRMED"
   //          }, { new: true });
   //       await tableSlotsModel.findByIdAndUpdate(tableSlotId, { isAvailable: false });

   //    } catch (error) {
   //       res.status(500).json({ message: 'Failed to update booking and table slot', error });
   //    }
   // }




   async updateSlotAndBookingStatus(req: Request, res: Response, next: NextFunction) {
      console.log("update slot and booking status controller");
      const { bookingId, tableSlotId, status } = req.body;
    
      if (!bookingId || !tableSlotId) {
        return res.status(400).json({ error: 'Booking ID and TableSlot ID are required' });
      }
    
      try {
        const bookingStatus = status === 'true' ? 'CONFIRMED' : 'CANCELLED';
        const paymentStatus = status === 'true' ? 'PAID' : 'FAILED';
    
        await bookingModel.findOneAndUpdate(
          { bookingId: bookingId },
          {
            paymentStatus,
            bookingStatus,
          },
          { new: true }
        );
    
        if (status === 'true') {
          await tableSlotsModel.findByIdAndUpdate(tableSlotId, { isAvailable: false });
        }
    
        res.status(200).json({ message: 'Booking and table slot updated successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to update booking and table slot', error });
      }
    }
    




}