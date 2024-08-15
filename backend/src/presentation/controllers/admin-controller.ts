import { Request, Response, NextFunction } from "express";
import { AdminInteractor } from '../../domain/interfaces/usecases/adminInteractor'



export class adminController {
   constructor(private readonly interactor: AdminInteractor) { }

   async adminLogins(req: Request, res: Response, next: NextFunction) {
      console.log("Admin login service")
      try {
         const { email, password } = req.body
         const { admin, message, token, refreshToken } = await this.interactor.adminLogin({ email, password })
         if (!admin) {
            return res.status(500).json({ message: message })
         }

         res.cookie("RefreshAuthToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
         });

         return res.status(201).json({ message, token, refreshToken })
      } catch (error) {
         console.error("Error during admin login service:", error);
         res.status(500).send("Internal server error")

      }
   }

   async getRestaurants(req: Request, res: Response, next: NextFunction) {
      console.log("Get restuarant controller")
      try {
         const { message, restaurants } = await this.interactor.getRestaurants();
         return res.status(200).json({ message, restaurants })
      } catch (error) {
         console.error("Error during admin get restaurant service", error);
         res.status(500).send("Internal server error")
      }
   }

   async blockRestaurant(req:Request, res: Response, next: NextFunction){
      console.log("Block restaurant controller")
      const { restaurantId, isBlocked } = req.body
       try{
         const { message, status} = await this.interactor.blockRestaurantInteractor(restaurantId, isBlocked)
         return res.status(200).json({ message, status})
      } catch(error){
         console.log(error)
         return res.status(500).json({ message: "Error during block / unblock restaurant"})
      }
   }

   async approveRestaurantList(req: Request, res: Response, next: NextFunction) {
      console.log("Get un approved restaurant list")
      try {
         const { message, restaurants } = await this.interactor.restaurantApprove()
         return res.status(200).json({ message, restaurants })
      } catch (error) {
         console.error(error);
         throw error
      }
   }

   async approveRestaurant(req: Request, res: Response, next: NextFunction) {
      console.log("Get approve restaurant")
      const { id } = req.params
      try {
         const restaurantId = id.split(":")
         console.log("Restaurant ID:", restaurantId[1])
         const { message, restaurants } = await this.interactor.getRestaurantDetailsInteractor(restaurantId[1])
         return res.status(200).json({ message, restaurants })
      } catch (error) {
         console.log("Error during admin get restaurant controller", error)
         res.status(500).send("Intrnal server error")
      }
   }

   async restaurantApprovalConfirmation(req: Request, res: Response, next: NextFunction) {
      console.log("Restaurant approval confirmation controller")
      const id = req.params.id
      try {
         const restaurantId = id.split(":");
         console.log(restaurantId[1])
         const { message, success } = await this.interactor.approvalRestaurantInteractor(restaurantId[1])
         return res.status(200).json({ message, success })
      } catch (error) {
         console.log("Error during admin- restaurant approval controller", error)
         res.status(500).json("Internal server error")
      }
   }

   async restaurantRejection(req: Request, res: Response, next: NextFunction) {
      console.log("Restaurant rejection controller")
      const id = req.params.id
      try {
         const restaurantId = id.split(":");
         console.log(restaurantId[1])
         const { message, success } = await this.interactor.rejectRestaurantInteractor(restaurantId[1])
         return res.status(200).json({ message, success })
      } catch (error) {
         console.log("Error during admin-restaurant rejection controller ", error)
         return res.status(500).json({ message:"interanl server error"})
      }
   }

   async getUserLists(req: Request, res: Response, next: NextFunction) {
      console.log("get users controller")
      try{
         const { users, message } = await this.interactor.getUsersListInteractor()
         return res.status(200).json({ users, message })
      } catch(error){
         console.log(error)
         return res.status(500).json({ message: "Error during fetching users"})
      }
   }


   async blockUser(req: Request, res: Response, next:NextFunction){
      console.log("block user controller")
      const {userId, isBlocked} = req.body
      console.log(userId,isBlocked)
      try{
         const { message, status } = await this.interactor.blockUserInteractor(userId, isBlocked)
         return res.status(200).json({ message, status})
      } catch(error){
         console.log(error)
         return res.status(500).json({ message: "Error during blocking user"})
      }
   }


   async adminLogout(req: Request, res: Response, next: NextFunction) {
      console.log("Logout admin")
      try {
         res.clearCookie("RefreshAuthToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
         })
         return res.status(200).json({ message: "Logout successfull" })
      } catch (error) {
         console.log(error)
         return res.status(500).send({ message: "Logout unsuccessfull" })
      }
   }


   async adminDashboard(req:Request, res:Response, next:NextFunction){
      console.log("Dashboard controller")

      try{
         const { message, status,  usersCount, restaurantsCount, bookingCount,sortedRevenueByRestaurantObject} = await this.interactor.adminDashboardInteractor()
         return res.status(200).json({ message, status, usersCount, restaurantsCount,bookingCount,sortedRevenueByRestaurantObject })
      } catch(error){
         console.log(error)
         return res.status(500).json({ message: "Error fetching admin dashbaord"})
      }
   }


   async downloadAdminReport(req:Request, res:Response, next:NextFunction){
      console.log("Download admin report controller")
      const { period } = req.query as { period: string };
      console.log(period)
      try{
         const { message, status, doc} = await this.interactor.downloadAdminReportInteractor(period)
         doc?.pipe(res)
         doc?.end()
         // return res.status(200).json({ message, status }); 

      } catch(error){
         console.log(error)
         return res.status(500).json({message:"Error during downloading admin report"})
      }
   }



}

