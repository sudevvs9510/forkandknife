import { UserType } from '../../entities/User'

export interface AdminInteractor {
   adminLogin(credentials: {email: string, password: string}): Promise<{message: string, token: string | null, admin: UserType | null, refreshToken: string | null}>
   getRestaurants(): Promise<{restaurants: object | null, message:string}>
   restaurantApprove(): Promise<{restaurants : object | null, message: string}>
   getRestaurantDetailsInteractor(restaurantId: string): Promise<{restaurants: object | null, message: string}>
   approvalRestaurantInteractor(restaurantId: string): Promise<{success: boolean; message: string }>
   rejectRestaurantInteractor(restaurantId: string): Promise<{ success: boolean ; message: string }>

   
}