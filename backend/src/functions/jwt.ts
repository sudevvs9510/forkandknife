import jwt from 'jsonwebtoken';
// import configKeys   from "../config";


// JWT GENERATE TOKEN 
export const generateAccessToken = (userId:string): string =>{
   const payload = { userId: userId }
   return jwt.sign(payload, "xyZiopasf89asfaj", {expiresIn: "24h"});
}

// JWT REFRESH TOKEN 
export const generateRefreshToken = (userId: string): string =>{
   const payload = { userId : userId }
   return jwt.sign(payload,"lkgakjdo09asfka", { expiresIn: "30d" })
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

// export const jwtVerifyToken = (accessToken: string, SECRET_KEY: string): { message: string, decode: any | null } => {
//    try {
//        const decoded = jwt.verify(accessToken, SECRET_KEY);
//        return { message: "Successfully verified", decode: decoded };
//    } catch (err) {
//        return { message: "Invalid Token", decode: null };
//    }
// }
