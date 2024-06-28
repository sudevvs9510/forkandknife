import { RestaurantType } from "../../entities/restaurant"

export interface restaurantInteractor{
   restaurantRegistration(credentials: RestaurantType): Promise<{restaurant: object | null, message: string}>
   restaurantLogin(data: Partial<RestaurantType>): Promise<{restaurant: Partial<RestaurantType> | null; message: string; token: string | null}>
   restaurantDetailsUpdateInteractor(credentials: RestaurantType): Promise<{ restaurant: Partial<RestaurantType>, message: string}>
   restaurantGetProfileInteractor(email: string): Promise<{restaurant: object}>
   
}