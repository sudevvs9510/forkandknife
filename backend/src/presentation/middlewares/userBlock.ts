import { Request, Response, NextFunction } from 'express'
import userModel from "../../frameworks/database/models/userModel"


export const userBlock = async (req:Request, res:Response, next: NextFunction) =>{
  console.log("USER block middleware")
  try{
    const userId = req.userId
    console.log(userId)
    const user = await userModel.findOne({_id: userId})

    if(user && user.isBlocked){
      return res.status(403).json({ message: "User is blocked", isBlocked: true})
    }
    next()
  } catch(error){
    res.status(400).json({ message: "Internal server error", token:null})
    console.log("userBlocked middleware error", error)
  }
}