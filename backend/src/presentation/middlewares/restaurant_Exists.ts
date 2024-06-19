import {Response, Request, NextFunction } from 'express'
import restaurantModel from '../../frameworks/database/models/restaurantModel'



const restaurant_Exists = async (req: Request, res: Response, next: NextFunction) =>{
   const { email } = req.body
   console.log("Request body in restaurant_Exists middleware:",req.body);

   if (!email) {
      return res.status(400).json({ message: "Invalid request data", token: null });
   }
   
   try{
      const restaurant = await restaurantModel.findOne({ email: email })
      console.log("Restaurant found:",restaurant)
      if(restaurant){
         return res.status(400).json({ message: "Restaurant already exists", token: null})
      }
      next()
   } catch(error){
      res.status(500).json({ message:"Internal server error", token: null })
      console.log("Error in restaurant_Exists middleware", error);
      
   }
}

export default restaurant_Exists;