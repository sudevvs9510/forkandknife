import { RestaurantType, tableSlotTypes } from "../../entities/restaurant"
import { restaurantRepository } from "../../interfaces/repositories/restaurant-repository";
import { restaurantInteractor } from "../../interfaces/usecases/restaurantInteractor"


export class sellerInteractor implements restaurantInteractor{
   constructor (private readonly repository: restaurantRepository) {}
   
   
  async restaurantRegistration(credentials: RestaurantType): Promise<{ restaurant: object | null; message: string; }> {
      try{
         console.log("Inside restaurant registration usecase")
         console.log("Credentials received",credentials);
         const { message, restaurant } = await this.repository.create(credentials)
         return { message, restaurant }
      } catch (error){
         console.log("Error in Restaurant registration interactor", error);
         throw error
      }
   }

   async restaurantLogin(data: Partial<RestaurantType>): Promise<{ restaurant: Partial<RestaurantType> | null; message: string; token: string | null; refreshtoken: string | null}> {
      console.log("Seller Login Interactor")
      try{
         console.log(data);
         const { message,token, restaurant,refreshtoken } = await this.repository.findCredentials(data)
         return { message, token, restaurant, refreshtoken }   
      } catch(error){
         console.error("Error in restaurant registration interactor", error);
         throw error
      }
   }

   async restaurantDetailsUpdateInteractor(credentials: RestaurantType): Promise<{ restaurant: Partial<RestaurantType>; message: string; }> {
      console.log("Restaurant updation interactor")
      try{
         const { message, restaurant } = await this.repository.restaurantAllDetails(credentials)
         return { message, restaurant }
      } catch(error){
         console.log("Error in restaurantDetailsUpdateInteractor:", error)
         throw error
      }
   }


   async restaurantGetProfileInteractor(_id: string): Promise<{ restaurant: object; }> {
      try{
         const { restaurant } = await this.repository.getRestaurant(_id)
         return { restaurant }
      } catch(error){
         console.log(error) 
         throw error
      }
   }

   async getRestaurantTableInteractor(restaurantId: string): Promise<{ message: string; tableSlotDatas: object; }> {
      try{
         const { message, tableSlotDatas } = await this.repository.restaurantTableDatas(restaurantId)
         return { message, tableSlotDatas}
      } catch(error){
         console.log("Error in getRestaurantTableInteractor", error)
         throw error
      }
   }

   async addTableInteractor(tableSlotDatas: tableSlotTypes, restaurantId: string): Promise<{ message: string; status: boolean; }> {
      try{
         const { status, message } = await this.repository.addNewTableSlot( tableSlotDatas, restaurantId)
         return { status, message}
      } catch(error){
        console.log(error)
        throw error
      }
   }

   async getRestaurnatTableSlotInteractor(tableId: string): Promise<{ message: string; tableSlotDatas: object; }> {
      try{
         const { message, tableSlotDatas } = await this.repository.restaurantTableSlotDatas(tableId)
         return { message, tableSlotDatas }
      } catch(error){
         console.log(error)
         throw error
      }
   }

   
   
}