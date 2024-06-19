import { Request, Response, NextFunction } from 'express'
import configKeys  from "../../config"
import jwt,{ JwtPayload } from "jsonwebtoken"


declare global{
   namespace Express{
      interface Request{
         userId : string
      }
   }
}

const verifyToken = (req:Request, res:Response, next: NextFunction) =>{
   const token = req.cookies["auth_token"]
   if(!token){
      return res.status(401).json({ message: "unautharized"})
   }

   try{
      const decodes = jwt.verify(token, configKeys.JWT_SECRET_KEY as string)
      req.userId = (decodes as JwtPayload).userId
      next();
   } catch(error){
      return res.status(401).json({ message: "unautharized"})
   }
}

export default verifyToken;

