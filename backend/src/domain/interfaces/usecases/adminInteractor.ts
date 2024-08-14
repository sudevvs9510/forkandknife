import { UserType } from '../../entities/User'

export interface AdminInteractor {
   adminLogin(credentials: {email: string, password: string}): Promise<{message: string, token: string | null, admin: UserType | null, refreshToken: string | null}>
   getRestaurants(): Promise<{restaurants: object | null, message:string}>
   blockRestaurantInteractor(restaurantId: string, isBlocked: boolean): Promise<{ message: string, status: boolean}>

   restaurantApprove(): Promise<{restaurants : object | null, message: string}>
   getRestaurantDetailsInteractor(restaurantId: string): Promise<{restaurants: object | null, message: string}>
   approvalRestaurantInteractor(restaurantId: string): Promise<{success: boolean; message: string }>
   rejectRestaurantInteractor(restaurantId: string): Promise<{ success: boolean ; message: string }>

   getUsersListInteractor(): Promise<{ users: object | null, message: string}>
   blockUserInteractor(userId: string, isBlocked: boolean): Promise<{ message: string, status: boolean }>

   adminDashboardInteractor(): Promise<{message: string, status: boolean;  usersCount: number; restaurantsCount: number, bookingCount: number, sortedRevenueByRestaurantObject: object}>

   
}