import { RestaurantType } from "../../entities/restaurant";



export interface restaurantRepository {
   create(restaurant: RestaurantType) : Promise<{restaurant: RestaurantType | null, message: string}>;
   findCredentials(data: object): Promise<{ restaurant: Partial<RestaurantType> | null, message: string; token: string | null, refreshtoken: string | null}>
   restaurantAllDetails(restaurant:RestaurantType): Promise<{ restaurant: Partial<RestaurantType>, message: string}>
   getRestaurant(_id: string) : Promise<{restaurant: any, message: string}>

}