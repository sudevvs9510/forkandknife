import jwt from 'jsonwebtoken';
// import configKeys   from "../config";


// JWT GENERATE TOKEN 
export const generateAccessToken = (userId:string): string =>{
   const payload = {
      userId: userId,
   }
   return jwt.sign(payload, "xyZiopasf89asfaj", {expiresIn: "20h"});
}

// JWT REFRESH TOKEN 
export const generateRefreshToken = (userId: string): string =>{
   const payload = {
      userId : userId
   }
   return jwt.sign(payload,"lkgakjdo09asfka", { expiresIn: "1d" })
}


// JWT VERIFICATION
export const jwtVerifyToken = (accessToken : string, SECRET_KEY :string) =>{
   jwt.verify(accessToken, SECRET_KEY ,(err: any, decode: any) =>{
      if(err){
         return  { message: "Invalid Token", decode: null };
      } else {
         return { message: "Successfully verified", decode };
      }
   })
}
