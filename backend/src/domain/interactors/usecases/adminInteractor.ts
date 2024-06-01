import { UserType } from "../../entities/User";
import { AdminInteractor } from "../../interfaces/usecases/adminInteractor";
import { AdminRepositories } from "../../interfaces/repositories/admin-repository";
import { generateAccessToken } from "../../../functions/jwt"




export class AdminInteractorImpl implements AdminInteractor {
   constructor (private readonly repository : AdminRepositories) { }

   async adminLogin(credentials: { email: string; password: string; }): Promise<{ message: string; token: string | null; admin: UserType | null; }> {
      console.log(" adminLogin interactor impl")
      try{
         const { admin, message } = await this.repository.adminLoginRepo(credentials);
         let token: string = ""
         if(admin){
            token = generateAccessToken(admin.id as string);
         }
         return { admin, message, token }
      } catch(error){
         console.error("Error in amdin login interactorImpl: ",error);
         throw error
      }
   }
}
