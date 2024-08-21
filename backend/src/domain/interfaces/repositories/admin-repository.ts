import { UserType } from "../../entities/User"

export interface AdminRepositories{
   adminLoginRepo(credentials: {email: string, password: string}): Promise<{ admin: UserType | null, message: string; token: string | null; refreshToken: string | null }>
   getRestaurantLists(): Promise<{restaurants: object | null, message: string}>   
   blockRestaurant(restaurantId: string, isBlocked: boolean): Promise<{ message: string, status: boolean}>
   approve(): Promise<{restaurants: object | null, message:string}>
   getApprovalRestaurant(restaurantId: string): Promise<{restaurants: object | null, message: string}>
   confirmRestaurantApproval(restaurantId: string): Promise<{ success: boolean; message: string }>
   confirmRestaurantRejection(restaurantId: string) : Promise<{ success: boolean; message: string}>

   getUserLists(): Promise<{ users:object | null, message: string}>
   blockUser(userId: string, isBlocked: boolean): Promise<{ message: string, status: boolean}>
   adminDashboard() : Promise<{ message: string, status: boolean,usersCount: number;restaurantsCount: number, bookingCount: number, sortedRevenueByRestaurantObject: object, bookingCountCompleted: number, bookingCountCancelled: number, bookingCountConfirmed: number}>

   downloadAdminReport(period: string): Promise<{ message: string, status: boolean, doc?:PDFKit.PDFDocument}>
}