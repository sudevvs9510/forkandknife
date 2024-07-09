import jwt, { JwtPayload } from 'jsonwebtoken';
// import configKeys   from "../config";


// JWT GENERATE TOKEN 
export const generateAccessToken = (userId:string, role: 'user' | 'restaurant' | 'admin'): string =>{
   const payload = { userId, role }
   const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_KEY || "xyZiopasf89asfaj"; 
   return jwt.sign(payload, accessTokenSecret, {expiresIn: "1h"});
}

// JWT REFRESH TOKEN 
export const generateRefreshToken = (userId: string, role: 'user' | 'restaurant' | 'admin'): string => {
   const payload = { userId, role };
   const refreshTokenSecret = process.env.JWT_RESFRESH_SECRET_KEY || "lkgakjdo09asfka";
   return jwt.sign(payload, refreshTokenSecret, { expiresIn: "2d" });
 };

// JWT VERIFICATION
export const jwtVerifyToken = (accessToken: string, SECRET_KEY: string) => {
   try {
       const decode = jwt.verify(accessToken, SECRET_KEY) as { userId: string, role: 'user' | 'restaurant' | 'admin' };
      return { message: "Successfully verified", decode: decode };
   } catch (err) {
       return { message: "Invalid Token", decode: null };
   }
}

