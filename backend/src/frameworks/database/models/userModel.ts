import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs"

interface UserDocument extends Document {
   username : string;
   email : string;
   password: string;
   phone : string;
   otp: string;
   isBlocked : boolean;
   isVerified : boolean;
   updatedAt: Date;
   createdAt: Date;
   role: string;
   profile: string;
   isAdmin: Boolean;
}

const userSchema = new Schema<UserDocument> ({
   username: {
      type: String,
      required: true
   } ,
   email: {
      type: String,
      required : true,
        unique : true
   },
   phone: {
      type: String
   },
   password: {
      type: String,
      required: true,
      default: ""
   },
   otp :{
      type: String
   },
   role:{
      type:String,
      enum:["user", "seller"],
      default: "user"
   },
   isBlocked:{
      type: Boolean,
      default: false
   },
   isVerified:{
      type: Boolean,
      default: false
   },
   createdAt:{
      type:Date,
      default:Date.now,
   },
   isAdmin:{
      type: Boolean,
      default: false
   },
   profile:{
      type: String
   }
})

userSchema.pre<UserDocument>("save", async function(next){
   this.updatedAt = new Date()
   if (this.isModified('password') || this.isNew) {
      const hashedPassword = await bcrypt.hash(this.password, 8);
      this.password = hashedPassword;
  }
  next();
})


const userModel = mongoose.model<UserDocument>("users",userSchema)
export default userModel
