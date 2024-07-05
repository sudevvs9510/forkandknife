import { Request, Response } from "express"
import { generateAccessToken } from  "../../functions/jwt"
import jwt, { JwtPayload } from "jsonwebtoken"
const  JWT_RESFRESH_SECRET_KEY = process.env.JWT_RESFRESH_SECRET_KEY as string


export async function refreshAccessToken(req: Request, res: Response){
  const refreshToken = req.cookies.refreshToken
  console.log("refreshToken:", refreshToken)
  if(!refreshToken){
    return res.status(402).json({ message: 'No refresh token provided'})
  }

  const decoded = verifyRefreshToken(refreshToken)
  if(!decoded){
    return res.status(401).json({ message: "Invalid refresh token"})
  }

  try{
    const accessToken =generateAccessToken(decoded.userId, decoded.role)
    return res.status(200).json({ accessToken })
  } catch(error){
    console.log('Error generating new access token', error)
    return res.status(500).json({ message: "failed to generate new access token" })
  }
}



const verifyRefreshToken = (token: string): JwtPayload | null =>{
  try{
    return jwt.verify(token, JWT_RESFRESH_SECRET_KEY ) as JwtPayload

  }catch(error){
    console.log("Error, verifying refresh token", error)
    return null 
  }
}