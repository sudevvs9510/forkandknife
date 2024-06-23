import jwt from 'jsonwebtoken';
// import configKeys   from "../config";


// JWT GENERATE TOKEN 
export const generateAccessToken = (userId:string): string =>{
   const payload = { userId: userId }
   const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "xyZiopasf89asfaj"; // Use environment variable
   return jwt.sign(payload, accessTokenSecret, {expiresIn: "24h"});
}

// JWT REFRESH TOKEN 
export const generateRefreshToken = (userId: string): string =>{
   const payload = { userId : userId }
   const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "lkgakjdo09asfka" ;
   return jwt.sign(payload, refreshTokenSecret , { expiresIn: "30d" })
}


// JWT VERIFICATION
// export const jwtVerifyToken = (token : string, SECRET_KEY :string) =>{
//    jwt.verify(token, SECRET_KEY ,(err: any, decode: any) =>{
//       if(err){
//          return  { message: "Invalid Token", decode: null };
//       } else {
//          return { message: "Successfully verified", decode };
//       }
//    })
// }

export const jwtVerifyToken = (token: string, secretKey: string): { message: string, decode: any | null } => {
   try {
      const decoded = jwt.verify(token, secretKey);
      return { message: "Successfully verified", decode: decoded };
   } catch (err) {
      return { message: "Invalid Token", decode: null };
   }
}

// export const jwtVerifyToken = (accessToken: string, SECRET_KEY: string): { message: string, decode: any | null } => {
//    try {
//        const decoded = jwt.verify(accessToken, SECRET_KEY);
//        return { message: "Successfully verified", decode: decoded };
//    } catch (err) {
//        return { message: "Invalid Token", decode: null };
//    }
// }
