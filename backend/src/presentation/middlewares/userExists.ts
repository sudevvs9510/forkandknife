import { Request, Response, NextFunction } from "express"
import UserModel from "../../frameworks/database/models/userModel"


export const userExists = async(req: Request, res: Response, next: NextFunction) =>{
   try{
      const { email } = req.body
      console.log(email);
      
      const user = await UserModel.findOne({ email: email })
      console.log(user);
      
      if(user){
         return res.status(400).json({ messgae: "User already exists with this email", token: null})
      }
      next()
   } catch(error){
      res.status(400).json({ message: "Internal server error", token: null})
      console.log("userExists middleware error", error);
   }
}