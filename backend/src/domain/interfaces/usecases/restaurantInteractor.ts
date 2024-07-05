import { RestaurantType } from "../../entities/restaurant"

export interface restaurantInteractor{
   restaurantRegistration(credentials: RestaurantType): Promise<{restaurant: object | null, message: string}>
   restaurantLogin(data: Partial<RestaurantType>): Promise<{restaurant: Partial<RestaurantType> | null; message: string; token: string | null, refreshtoken: string | null}>
   restaurantDetailsUpdateInteractor(credentials: RestaurantType): Promise<{ restaurant: Partial<RestaurantType>, message: string}>
   restaurantGetProfileInteractor(_id: string): Promise<{restaurant: object}>
   
}