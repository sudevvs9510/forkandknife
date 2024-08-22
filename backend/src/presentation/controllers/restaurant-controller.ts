import { Request, Response, NextFunction } from "express";
import { restaurantInteractor } from "../../domain/interfaces/usecases/restaurantInteractor"
// import cloudinary from "../../Config/cloudinaryConfig";
import axios from "axios";
import { setCookieAuthToken } from "../../functions/cookieFun";
import restaurantTableModel from "../../frameworks/database/models/restaurantTableModel";
import userModel from "../../frameworks/database/models/userModel";
import path from 'path';
import fs from "fs"

export class restaurantController {
   constructor(private readonly interactor: restaurantInteractor) { }

   async restaurantResgistration(req: Request, res: Response, next: NextFunction) {
      // const { email, } = req.body
      console.log("Req body:", req.body)
      try {

         const { message, restaurant } = await this.interactor.restaurantRegistration(req.body);
         if (!restaurant) {
            return res.status(401).json({ message })
         }
         return res.status(201).json({ message: "Registration successfull" })
      } catch (error) {
         console.error("Error in restaurant registration service", error);
         res.status(500).send({ message: "Internal server error" })
      }
   }

   async restaurantLogin(req: Request, res: Response, next: NextFunction) {
      console.log("inside restaurantlogin controller");
      try {
         const { email, password } = req.body
         const { restaurant, token, message, refreshtoken } = await this.interactor.restaurantLogin({ email, password })
         if (!restaurant) {
            return res.status(500).json({ message, token: null })
         }

         res.cookie("RefreshAuthToken", refreshtoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
         });

         // setCookieAuthToken(res, "RefreshAuthToken", token);
         console.log("restaurnatLogin:", restaurant, token)
         return res.status(200).json({ message, restaurant, token, refreshtoken })
      } catch (error) {
         console.error("Error during seller login:", error);
         res.status(500).send("Internal server error")
      }

   }



   async restaurant_details(req: Request, res: Response, next: NextFunction) {
      console.log("restaurant full Details")
      console.log(req.cookies)
      const restaurantId = req.userId
      try {
         const { restaurant } = await this.interactor.restaurantGetProfileInteractor(restaurantId)
         return res.status(200).json({ restaurantDetails: restaurant })
      } catch (error) {
         console.log("Error occured during get restaurant controller", error)
         res.status(500).send("Internal server error")
      }
   }

   async restaurant_updation(req: Request, res: Response, next: NextFunction) {
      const { datas } = req.body
      console.log("Restaurant updation details req.body ........................")
      console.log(req.body)
      console.log("Restaurant updation details........................")
      console.log(datas)
      try {
         const { message, restaurant } = await this.interactor.restaurantDetailsUpdateInteractor(datas);
         if (!restaurant) {
            return res.status(401).json({ message: "Restaurant Registration failed" })
         }
         return res.status(201).json({ message })
      } catch (error) {
         console.log("Error in restaurant registration service")
         res.status(500).json({ message: "Internal server error" })
      }
   }


   //Restaurant table view 
   async getRestaurantTable(req: Request, res: Response, next: NextFunction) {
      console.log("get RestaurantTable controller")
      const { restaurantId } = req.params
      console.log(restaurantId)
      try {
         const { tableSlotDatas, message } = await this.interactor.getRestaurantTableInteractor(restaurantId)
         return res.status(200).json({ tableSlotDatas, message })
      } catch (error) {
         console.log("Error during get restaurant table controller", error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }

   //restaurant table add modal
   async addRestaurantTable(req: Request, res: Response, next: NextFunction) {
      console.log("Addding table component")
      const { tableAddingDatas } = req.body
      const restaurantId = req.userId
      console.log(req.body)
      try {
         const { message, status } = await this.interactor.addTableInteractor(tableAddingDatas, restaurantId)
         if (!status) {
            return res.status(400).json({ message, status:false })
         }
         return res.status(201).json({ message, status:true })

      } catch (error) {
         console.log("Error during add table", error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }

   //restaurant table delete 
   async deleteRestaurantTable(req: Request, res: Response, next: NextFunction) {
      console.log("Delete table component")
      try {
         const { restaurantId, tableId } = req.body
         const { message, status } = await this.interactor.deleteTableInteractor(tableId, restaurantId)
         return res.status(200).json({ message, status })

      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }

   //Restaurant table slot view
   async getRestaurantTableSlot(req: Request, res: Response, next: NextFunction) {
      console.log("get RestaurantTableSlot controller")
      const { tableId } = req.params
      console.log(tableId)
      try {
         const { tableSlotDatas, message } = await this.interactor.getRestaurnatTableSlotInteractor(tableId)
         return res.status(200).json({ message, tableSlotDatas })
      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }

   //Restaurant slot add modal
   async addRestaurantTableSlot(req: Request, res: Response, next: NextFunction) {
      console.log("Add table slot controller")
      const { tableId, tableSlotTimeData } = req.body
      console.log("Request body:", req.body);
      console.log("Table ID:", tableId);
      console.log("Table Slot Time Data:", tableSlotTimeData);

      try {
         const { message, status } = await this.interactor.addTableSlotInteractor(tableSlotTimeData, tableId)
         if (!status) {
            return res.status(201).json({ message, status:false })
         }
         return res.status(201).json({ message, status })
      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }

   //restaurant delete table slot
   async deleteRestaurantTableSlot(req: Request, res: Response, next: NextFunction) {
      console.log("Delete table slot component")
      try {
         const { tableId, tableSlotId } = req.body
         console.log('Deleting table slot:', { tableId, tableSlotId });


         const table = await restaurantTableModel.findById(tableId)
         if (!table) {
            return res.status(404).json({ message: "Table not found" })
         }
         const restaruantId = table.restaurantId.toString()

         const { message, status } = await this.interactor.deleteTableSlotInteractor(restaruantId, tableSlotId)
         if (!status) {
            return res.status(500).json({ message: "Failed to delete table slot", status })
         }
         return res.status(200).json({ message: 'Table slot deleted successfully', status })
      } catch (error) {
         console.log('Error deleting table slot', error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }

   //restaurnat time slot management slot time get
   async getTimeSlot(req: Request, res: Response, next: NextFunction) {
      console.log("Get time slot controller")
      const restaurantId = req.userId
      console.log("Restaurant ID in controller:", restaurantId);
      try {
         const { timeSlotDatas, message } = await this.interactor.getTimeSlotInteractor(restaurantId)
         return res.status(200).json({ message, timeSlotDatas })
      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }



   async addRestaurantTimeSlot(req: Request, res: Response, next: NextFunction) {
      console.log("Add time slot controller")
      const { slotStartTime, slotEndTime } = req.body;
      const restaurantId = req.userId
      console.log("Request body:", req.body);
      console.log("Restaurant ID:", restaurantId);
      try {
         const { message, status } = await this.interactor.addTimeSlotInteractor({ slotStartTime, slotEndTime, restaurantId, timeSlotId: "" })
         return res.status(200).json({ message, status })
      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }

   async deleteRestaurantTimeSlot(req: Request, res: Response, next: NextFunction) {
      console.log("delete time slot controller")
      try {
         const { timeSlotId, restaurantId } = req.body
         console.log("Restaurant ID:", restaurantId);
         console.log("Time slot ID:", timeSlotId);
         const { message, status } = await this.interactor.deleteTimeSlotInteractor(timeSlotId, restaurantId)
         return res.status(200).json({ message, status })

      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }


   async getUserDetails(req: Request, res: Response, next: NextFunction) {
      console.log("Get user details controller")
      try {
         const { userId } = req.params
         console.log("User ID:", userId);
         const userDetails = await userModel.findById(userId)
         console.log(userDetails)
         return res.status(200).json({ userDetails })
      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }



   async tableReservation(req: Request, res: Response, next: NextFunction) {
      console.log("Table reservation controller")
      const restaurantId = req.params.restaurantId
      console.log("restaurantId :", restaurantId)
      try {
         const { bookingDatas, message } = await this.interactor.getBookingDetailsInteractor(restaurantId)
         return res.status(200).json({ bookingDatas, message })
      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "Internal server error" })
      }
   }



   async restaurantLogout(req: Request, res: Response, next: NextFunction) {
      console.log("Logout restaurant")
      try {
         res.clearCookie("RefreshAuthToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
         })
         return res.status(200).json({ message: "Logout successfull" })
      } catch (error) {
         console.log(error)
         return res.status(500).send({ message: "Logout successfull" })
      }
   }


   async getBookingDetails(req: Request, res: Response, next: NextFunction) {
      console.log("Get booking details controller")
      const { bookingId } = req.params
      console.log(bookingId)
      try {
         const { reservationDatas, message } = await this.interactor.getReservationDetailsInteractor(bookingId)
         return res.status(200).json({ reservationDatas, message })
      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "error while fetching booking details controller" })
      }
   }

   async editBookingStatus(req: Request, res: Response, next: NextFunction) {
      console.log("Edit booking status controller")
      const { bookingId } = req.params
      console.log(bookingId)

      const { bookingStatus } = req.body
      console.log(bookingStatus)
      try {
         const { message, status } = await this.interactor.updateBookingStatusInteractor(bookingId, bookingStatus)
         if (!status) {
            return res.status(400).json({ message: "Invalid booking status" })
         }
         return res.status(200).json({ message: "Booking status updated", status: true })
      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "Error during updating booking status controller" })
      }
   }


   async dashboard(req: Request, res: Response, next: NextFunction) {
      console.log("Dashboard controller")
      const { restaurantId } = req.params
      const month = Number(req.query.month ?? new Date().getMonth() + 1)
      console.log(restaurantId, month)
      try {
         const { message, status, totalRevenue, totalBookingCount, totalBookingPaidCount, totalCompletedBookingCount, totalConfirmedBookingCount, totalPendingBookingCount, totalCancelledBookingCount, reviewCount, dailyRevenue } = await this.interactor.dashboardInteractor(restaurantId, month)
         console.log({ data: { totalRevenue, totalBookingCount, totalBookingPaidCount, totalCompletedBookingCount, totalConfirmedBookingCount, totalPendingBookingCount, totalCancelledBookingCount, reviewCount, dailyRevenue } })
         // res.setHeader('Content-Type',"application/json")
         return res.status(200).json({
            message, status, data: {
               totalRevenue,
               totalBookingCount,
               totalBookingPaidCount,
               totalCompletedBookingCount,
               totalConfirmedBookingCount,
               totalPendingBookingCount,
               totalCancelledBookingCount,
               reviewCount,
               dailyRevenue,
            }
         })



      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "Error in dashboard controller" })
      }
   }


   async downloadReport(req: Request, res: Response, next: NextFunction) {
      console.log("Download report controller")
      const { restaurantId } = req.params
      const { period } = req.query as { period: string };
      try {

         const { message, status, doc } = await this.interactor.downloadReportInteractor(restaurantId, period);
         doc?.pipe(res)
         doc?.end()
         // return res.status(200).json({ message, status }); 
      } catch (error) {
         console.log(error)
         return res.status(500).json({ message: "Error during report downloading", error })
      }
   }



}