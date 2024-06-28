import { Request, Response, NextFunction } from "express";
import { restaurantInteractor } from "../../domain/interfaces/usecases/restaurantInteractor"


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
         const { restaurant, token, message } = await this.interactor.restaurantLogin({ email, password })
         if (!restaurant) {
            return res.status(401).json({ message, token: null })
         }
         res.cookie("restaurant_auth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
         });
         return res.status(200).json({ message, restaurant, token })
      } catch (error) {
         console.error("Error during seller login:", error);
         res.status(500).send("Internal server error")
      }

   }


   async restaurant_updation(req: Request, res: Response, next: NextFunction) {
      const { datas } = req.body
      console.log(req.body)
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

   async restaurant_details (req: Request, res: Response, next: NextFunction){
      console.log("restaurant full Details")
      const email = req.userId
      try{
         const { restaurant } = await this.interactor.restaurantGetProfileInteractor(email)
         return res.status(200).json({ restaurantDetails: restaurant})
      } catch(error){
         console.log("Error occured during get restaurant controller",error)
         res.status(500).send("Internal server error") 
      }
   }



}


