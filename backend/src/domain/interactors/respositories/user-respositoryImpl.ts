import bcrypt, { compareSync } from 'bcryptjs'
import { UserType } from "../../entities/User";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import userModel from "../../../frameworks/database/models/userModel";
import { generateAccessToken } from '../../../functions/jwt'
import { otpGenerator } from '../../../functions/OTP-Generator'
import { createNodemailerOtp } from '../../../functions/sendMail';
import { OTPModel } from '../../../frameworks/database/models/otpModel'

export class UserRepositoryImpl implements UserRepository {
   async findByCredentials(email: string, password: string): Promise<{ user: UserType | null; message: string; token: string | null }> {
      try {
          console.log("s REPOSITORY ----");
          console.log("Email:", email);
          console.log("Password provided:", password);
  
          const user = await userModel.findOne({ email: email });
          console.log("User found:", user);
  
          let message = '';
          let token = null;
  
          if (!user) {
              message = "Invalid User";
          } else {
              console.log("Password from user:", user.password);
              const isPasswordMatch = await bcrypt.compare(password, user.password);
              console.log("Password match result:", isPasswordMatch);
  
              if (!isPasswordMatch) {
                  console.log('Invalid password');
                  message = "Invalid password";
              } else {
                  token = generateAccessToken(user._id as string);
                  console.log('Token generated:', token);
              }
          }
  
          if (user && !message) {
              return { user: user, message: "Login Successful", token };
          }
          console.log('Final message:', message);
          return { user: null, message, token };
  
      } catch (error) {
          console.error("Error in findByCredentials:", error);
          return { user: null, message: "An error occurred", token: null };
      }
  }
  

   async createUser(user: UserType): Promise<{ user: UserType | null; message: string }> {
      const { username, email, password, role } = user;
      console.log(password)
      const otp = otpGenerator.generateOtp()
      createNodemailerOtp(user.email as string, otp)
      const newUser = new userModel({
         username,
         email,
         password,
         otp,
         role
      })
      console.log(newUser)
      await newUser.save()
      const otpData = new OTPModel({ otp: otp, userId: newUser._id})
      await otpData.save()
      return {
         user: newUser as UserType,
         message: "User created successfully"
      }
   }
   
   async verifyOtp(otp: string, userId: string): Promise<{ message: string; status: boolean }> {
      console.log("verifyOTP");
      console.log(userId);
      
      const otpData = await OTPModel.findOne({userId: userId})
      const userData = await userModel.findById(userId)
      console.log("user", userData, "otp", otpData);
      if (userData && otpData){
         if(otp == otpData.otp){
            userData.isVerified = true;
            userData.otp = ''
            await userData.save()
            return { status: true, message: "OTP verified successfully"}
         }
      }
      return { status: false, message: "Incorrect OTP" }
   }


   async createGoogleUser(user: {email: string; username: string; password: string}):Promise<{ user: UserType | null, message: string}> {
      const { username, email, password} = user
      const newUser = new userModel({username, email, password, isVerified: true, role: "user"})
      await newUser.save()
      return {
         user: newUser as UserType,
         message: " User created successfully"
      }
   }

   async findGoogleCredentials(email: string): Promise<{ userData: UserType | null; message: string; token: string | null; }> {
      console.log("find credentials");
      const user = await userModel.findOne({ email: email })

      console.log(user);
      let message = ""
      let token = null
      if (!user) {
         message = " User not found"
      } else {
         token = await generateAccessToken(user.id as string)
         console.log(token);
      }
      return { userData: user, message, token }
   }


   async resend( userId: string ): Promise<{ message: string; status: boolean }>{
      console.log("resend repositoryImp",userId)
      const user = await userModel.findOne({_id: userId})
      console.log(user);
      if(user){
         const otp = otpGenerator.generateOtp()
         createNodemailerOtp(user.email as string, otp)
         const otpData = new OTPModel({ otp: otp, userId : user._id })
         await otpData.save()
         return { status: true, message: "OTP Resend successfully" }
      }      
      return { status: false, message: "Incorrect OTP"}
   }
}



