import { Request, Response, NextFunction } from "express";
import { AdminInteractor } from '../../domain/interfaces/usecases/adminInteractor'



export class adminController {
   constructor(private readonly interactor: AdminInteractor) { }

   async adminLogins(req: Request, res: Response, next: NextFunction) {
      console.log("Admin login service")
      try {
         const { email, password } = req.body
         const { admin, message, token } = await this.interactor.adminLogin({ email, password })
         if (!admin) {
            return res.status(401).json({ message: message })
         }
         return res.status(201).json({ message, token })
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

   async restaurantRejection(req: Request, res:Response, next: NextFunction) {
      console.log("Restaurant rejection controller")
      const id = req.params.id
      try{
         const restaurantId = id.split(":");
         console.log(restaurantId[1])
         const { message, success } = await this.interactor.rejectRestaurantInteractor(restaurantId[1])
         return res.status(200).json({ message, success })
      } catch(error){
         console.log("Error during admin-restaurant rejection controller ",error)
      }
   } 



}