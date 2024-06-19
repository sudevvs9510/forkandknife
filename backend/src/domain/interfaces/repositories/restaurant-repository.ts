import { RestaurantType } from "../../entities/restaurant";



export interface restaurantRepository {
   create(restaurant: RestaurantType) : Promise<{restaurant: RestaurantType | null, message: string}>;
   findCredentials(data: object): Promise<{ restaurant: Partial<RestaurantType> | null, message: string; token: string | null}>
   restaurantAllDetails(restaurant:RestaurantType): Promise<{ restaurant: Partial<RestaurantType>, message: string}>

}