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


   async getRestaurants(): Promise<{ restaurants: object | null; message: string; }> {
      console.log("Get restaurant interactor service usecase")
      try{
         const { restaurants, message } = await this.repository.getRestaurantLists()
         return { restaurants, message}
      } catch(error){
         console.error("Error in getusers interactor impl:",error);
         throw error
      }
   }

   async restaurantApprove(): Promise<{ restaurants: object | null; message: string; }> {
      try{
         const { restaurants, message } = await this.repository.approve()
         return { restaurants, message }
      } catch(error){
         console.error("Error in resapprove interactor impl",error);
         throw error
      }
   }

   async getRestaurantDetailsInteractor(restaurantId: string): Promise<{ restaurants: object | null; message: string; }> {
      try {
         const {restaurants, message } = await this.repository.getApprovalRestaurant(restaurantId)
         return { restaurants, message }
      } catch (error) {
         console.log("Error in get approval interactorimpl",error)
         throw error 
      }
   }
   

   async confirmRestaurantInteractor(restaurantId: string): Promise<{ success: boolean; message: string }> {
      try {
         const { message, success } = await this.repository.confirmRestaurantApproval(restaurantId)
         return { message, success }
      } catch (error) {
         console.log("Error in confirm restaurant interactorimpl:",error)
         throw error
      }
   }
   


}
