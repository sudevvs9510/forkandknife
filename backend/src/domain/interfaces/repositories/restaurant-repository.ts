import { RestaurantType, tableSlotTypes, timeSlotTypes } from "../../entities/restaurant";



export interface restaurantRepository {
   create(restaurant: RestaurantType): Promise<{ restaurant: RestaurantType | null, message: string }>;
   findCredentials(data: object): Promise<{ restaurant: Partial<RestaurantType> | null, message: string; token: string | null, refreshtoken: string | null }>
   restaurantAllDetails(restaurant: RestaurantType): Promise<{ restaurant: Partial<RestaurantType>, message: string }>
   getRestaurant(restaurantId: string): Promise<{ restaurant: any, message: string }>
   //Restaurant table view
   restaurantTableDatas(restaurantId: string): Promise<{ message: string, tableSlotDatas: object }>
   // restaurant table add modal
   addNewTableSlot(tableSlotDatas: tableSlotTypes, restaurantId: string): Promise<{ message: string, status: boolean }>
   //restaurant table slot view
   restaurantTableSlotDatas(tableId: string): Promise<{ message: string, tableSlotDatas: object }>
   //restaurant table slot add modal
   addTableSlot(tableSlotTimeData: object, tableId: string): Promise<{ message: string; status: boolean}>

   //timeslotDatas get
   restaurantTimeslotDatas(restaurantId: string): Promise<{ message: string, timeSlotDatas: object}>
   //timeSlotDatas post
   addTimeSlot(timeSlotDatas: timeSlotTypes) : Promise<{ message: string, status: boolean }>


}