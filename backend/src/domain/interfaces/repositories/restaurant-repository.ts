import { RestaurantType, tableSlotTypes } from "../../entities/restaurant";



export interface restaurantRepository {
   create(restaurant: RestaurantType) : Promise<{restaurant: RestaurantType | null, message: string}>;
   findCredentials(data: object): Promise<{ restaurant: Partial<RestaurantType> | null, message: string; token: string | null, refreshtoken: string | null}>
   restaurantAllDetails(restaurant:RestaurantType): Promise<{ restaurant: Partial<RestaurantType>, message: string}>
   getRestaurant(restaurantId: string) : Promise<{restaurant: any, message: string}>
   restaurantTableDatas(restaurantId: string): Promise<{ message: string, tableSlotDatas: object}>
   restaurantTableSlotDatas( tableId: string): Promise<{message: string, tableSlotDatas: object}>
   addNewTableSlot( tableSlotDatas: tableSlotTypes, restaurantId: string): Promise<{message: string, status: boolean}>
   
}