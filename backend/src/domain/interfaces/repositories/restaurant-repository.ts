import { RestaurantType, tableSlotTypes, timeSlotTypes } from "../../entities/restaurant";



export interface restaurantRepository {
   create(restaurant: RestaurantType): Promise<{ restaurant: RestaurantType | null, message: string }>;
   findCredentials(data: object): Promise<{ restaurant: Partial<RestaurantType> | null, message: string; token: string | null, refreshtoken: string | null }>
   restaurantAllDetails(restaurant: RestaurantType): Promise<{ restaurant: Partial<RestaurantType>, message: string }>
   getRestaurant(restaurantId: string): Promise<{ restaurant: any, message: string }>
   //Restaurant table view
   restaurantTableDatas(restaurantId: string): Promise<{ message: string, tableSlotDatas: object }>

   getBookingDetails(restaurantId: string) : Promise<{ message: string, bookingDatas: object}>
   // restaurant table add modal
   addNewTableSlot(tableSlotDatas: tableSlotTypes, restaurantId: string): Promise<{ message: string, status: boolean }>
   //restaruant table deletion
   deleteTableSlot(tableId: string, restaurantId: string): Promise<{message: string, status: boolean}>
   //restaurant table slot view
   restaurantTableSlotDatas(tableId: string): Promise<{ message: string, tableSlotDatas: object }>
   //restaurant table slot add modal
   addTableSlot(tableSlotTimeData: object, tableId: string): Promise<{ message: string; status: boolean}>
   //restaurant table slot delete 
   deleteTableTimeSlot(restaurantId: string, tableSlotId: string): Promise<{ message: string, status: boolean}>
   //timeslotDatas get
   restaurantTimeslotDatas(restaurantId: string): Promise<{ message: string, timeSlotDatas: object}>
   //timeSlotDatas post
   addTimeSlot(timeSlotDatas: timeSlotTypes) : Promise<{ message: string, status: boolean }>

   deleteTimeSlot(timeSlotId: string): Promise<{ message:string, status: boolean }>

   getReservationDetails(bookingId: string) : Promise<{ message: string, reservationDatas: object | null}>
   updateBookingStatus(bookingId: string, bookingStatus: string): Promise<{ message: string, status:boolean}>
   


}