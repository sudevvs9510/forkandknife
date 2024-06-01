import mongoose, { Schema } from "mongoose"

interface OTPDoc extends Document {
   userId: string;
   otp: string;
   createdAt : Date
}

const OtpSchema = new Schema<OTPDoc>({
   userId: {
      type: String,
      required: true 
   },
   otp:{
      type: String,
      required: true 
   },
   createdAt : {
      type: Date,
      default: Date.now()
   }

})

export const OTPModel = mongoose.model<OTPDoc>('OTP', OtpSchema)