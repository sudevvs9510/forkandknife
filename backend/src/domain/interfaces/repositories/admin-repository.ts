import { UserType } from "../../entities/User"

export interface AdminRepositories{
   adminLoginRepo(credentials: {email: string, password: string}): Promise<{ admin: UserType | null, message: string }>
   getRestaurantLists(): Promise<{restaurants: object | null, message: string}>   
   approve(): Promise<{restaurants: object | null, message:string}>
   getApprovalRestaurant(restaurantId: string): Promise<{restaurants: object | null, message: string}>
   confirmRestaurantApproval(restaurantId: string): Promise<{ success: boolean; message: string }>
   confirmRestaurantRejection(restaurantId: string) : Promise<{ success: boolean; message: string}>
   
}