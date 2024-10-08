import { UserType } from "../../entities/User";
import { AdminInteractor } from "../../interfaces/usecases/adminInteractor";
import { AdminRepositories } from "../../interfaces/repositories/admin-repository";
import { generateAccessToken } from "../../../functions/jwt"




export class AdminInteractorImpl implements AdminInteractor {
   constructor (private readonly repository : AdminRepositories) { }
   
   
   async adminLogin(credentials: { email: string; password: string; }): Promise<{ message: string; token: string | null; admin: UserType | null; refreshToken: string| null }> {
      console.log(" adminLogin interactor impl")
      try{
         const { admin, message, token, refreshToken } = await this.repository.adminLoginRepo(credentials);
         // let token: string = ""
         // if(admin){
         //    token = generateAccessToken(admin.id as string, 'admin');
         // }
         return { admin, message, token, refreshToken }
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

   async blockRestaurantInteractor(restaurantId: string, isBlocked: boolean): Promise<{ message: string; status: boolean; }> {
      try{
         const { message, status } = await this.repository.blockRestaurant(restaurantId, isBlocked)
         return { message, status}
      } catch(error){
         console.log(error)
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
   

   async approvalRestaurantInteractor(restaurantId: string): Promise<{ success: boolean; message: string }> {
      try {
         const { message, success } = await this.repository.confirmRestaurantApproval(restaurantId)
         return { message, success }
      } catch (error) {
         console.log("Error in confirm restaurant interactorimpl:",error)
         throw error
      }
   }

   async rejectRestaurantInteractor(restaurantId: string): Promise<{ success: boolean; message: string; }> {
      try{
         const { message, success} = await this.repository.confirmRestaurantRejection(restaurantId)
         return { message, success }
      } catch(error){
         console.log("Error in reject restaurant interactorImpl",error)
         throw error
      }
   }

   async getUsersListInteractor(): Promise<{ users: object | null; message: string; }> {
      try{
         const { users, message} = await this.repository.getUserLists()
         return { users, message }
      } catch(error){
         console.log(error)
         throw error
      }
   }

   async blockUserInteractor(userId: string, isBlocked: boolean): Promise<{ message: string; status: boolean; }> {
      try{
         const { message, status } = await this.repository.blockUser(userId, isBlocked)
         return { message, status}

      } catch(error){
         console.log(error)
         throw error
      }
   }

   async adminDashboardInteractor(): Promise<{ message: string; status: boolean;usersCount: number;restaurantsCount: number, bookingCount: number,sortedRevenueByRestaurantObject: object, bookingCountCompleted: number, bookingCountCancelled: number, bookingCountConfirmed: number, }> {
      try{
         const { message, status, usersCount, restaurantsCount ,bookingCount,sortedRevenueByRestaurantObject,bookingCountCancelled,bookingCountCompleted, bookingCountConfirmed } =await this.repository.adminDashboard()
         return { message, status, usersCount, restaurantsCount, bookingCount, sortedRevenueByRestaurantObject,bookingCountCancelled,bookingCountCompleted, bookingCountConfirmed }

      } catch(error){
         console.log(error)
         throw error
      }
   }
   

   async downloadAdminReportInteractor(period: string): Promise<{ message: string; status: boolean; doc?: PDFKit.PDFDocument; }> {
      try{
         const { message, status, doc } = await this.repository.downloadAdminReport(period)
         return {message, status, doc}

      } catch(error){
         console.log(error)
         throw error
      }
   }


}
