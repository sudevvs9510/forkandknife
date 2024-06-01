import jwt from 'jsonwebtoken';
import configKeys from "../config";


// JWT GENERATE TOKEN 
export const generateAccessToken = (userID:string): string =>{
   const payload = {
      userId: userID,
   }
   return jwt.sign(payload, 'ggfghffh', {expiresIn: "20h"});
}

// JWT REFRESH TOKEN 
export const generateRefreshToken = (userId: string): string =>{
   const payload = {
      userId : userId
   }
   return jwt.sign(payload,"fgvghfgh", { expiresIn: "1d" })
}


// JWT VERIFICATION
export const jwtVerifyToken = (accessToken : string) =>{
   jwt.verify(accessToken, "fgvghfgh",(err: any, decode: any) =>{
      if(err){
         return  { message: "Invalid Token", decode: null };
      } else {
         return { message: "Successfully verified", decode };
      }
   })
}
