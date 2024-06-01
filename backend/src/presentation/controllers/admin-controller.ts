import { Request, Response, NextFunction } from "express";
import { AdminInteractor } from '../../domain/interfaces/usecases/adminInteractor'



export class adminController {
   constructor(private readonly interactor: AdminInteractor) {}

   async adminLogins(req: Request, res: Response, next: NextFunction){
      console.log("Admin login service")
      try{
         const { email, password} = req.body
         const { admin, message, token} = await this.interactor.adminLogin({email, password})
         if(!admin){
            return res.status(401).json({ message: message})
         }
         return res.status(201).json({ message, token })
      } catch(error){
         console.error("Error during admin login service:",error);
         res.status(500).send("Internal server error")
         
      }
   }
}