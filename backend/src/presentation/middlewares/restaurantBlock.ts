import { Request, Response, NextFunction } from 'express'
import restaurantModel from "../../frameworks/database/models/restaurantModel"


export const restaurantBlock = async (req:Request, res:Response, next: NextFunction) =>{
  console.log("Restaurant block middleware")
  try{
    const restaurantId = req.userId
    console.log("blocked restaurantId:",restaurantId)
    const restaurant = await restaurantModel.findOne({_id: restaurantId})

    if(restaurant && restaurant.isBlocked){
      return res.status(403).json({ message: "Restaurant is blocked", isBlocked: true})
    }
    next()
  } catch(error){
    res.status(400).json({ message: "Internal server error", token:null})
    console.log("restaurant Blocked middleware error", error)
  }
}