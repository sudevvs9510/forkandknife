import { UserType } from "../../entities/User"
import { AdminRepositories } from "../../interfaces/repositories/admin-repository";
import UserModel from "../../../frameworks/database/models/userModel"
import bcrypt from "bcryptjs"

export class adminRepositoryImpl implements AdminRepositories {
   async adminLoginRepo(credentials: { email: string; password: string; }): Promise<{ admin: UserType | null; message: string; }> {
      try {
         console.log("inside interactor repo")
         const admin = await UserModel.findOne({ email: credentials.email })
         if (!admin || !admin.isAdmin) {
            return { admin, message: "Admin doesn't exist" }
         } else {
            const isPasswordMatch = await bcrypt.compare(credentials.password, admin.password)
            if (isPasswordMatch) {
               return { admin, message: "Admin Login Successfull" }
            } else {
               return { admin, message: "Incorrect password"}
            }
         }
      } catch(error: any){
         console.error("Error in admin Login Repo:", error);
         return {admin: null, message: error.message}
      }
   }




}
